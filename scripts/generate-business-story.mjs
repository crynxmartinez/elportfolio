// Auto business-story poster for the "El Martinez" Facebook Page. Picks an
// unused composite client scenario (see lib/scenarios.mjs), has Claude (with
// the native web_search tool, so the underlying facts are grounded, not
// invented) write a long-form storytelling post about that kind of problem
// and how it gets solved, pulls a matching photo from Pexels, uploads it to
// GHL's media library, and publishes through GHL's Social Planner API.
//
// These are composite/illustrative scenarios based on real patterns Raphael
// sees in web design + SEO work - not a specific named, verifiable client.
// The prompt requires that framing to stay honest; nothing here should read
// as a claim about one identifiable real business.

import fs from "node:fs";
import path from "node:path";
import { SCENARIOS, pickScenario, scenarioKey } from "./lib/scenarios.mjs";

const ROOT = process.cwd();
const LOG_FILE = path.join(ROOT, "content", "business-story-log.json");
const MODEL = "claude-sonnet-5";

const GHL_BASE = "https://services.leadconnectorhq.com";
// "El Martinez" Facebook Page, already connected in GHL's Social Planner.
const GHL_ACCOUNT_ID = "66d636558cd0c2fdd69d7d70_xzA6eU8kOYmBuwFdr3CF_313238408535731_page";
// Admin user on this GHL location - the API requires a userId even for
// automated posts; this isn't a credential, just an internal reference id.
const GHL_USER_ID = "xJD4JpMksaufg8BzC2w8";

const API_KEY = process.env.ANTHROPIC_API_KEY;
const GHL_TOKEN = process.env.GHL_PRIVATE_TOKEN;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const PEXELS_KEY = process.env.PEXELS_API_KEY;

if (!API_KEY) { console.error("ANTHROPIC_API_KEY is not set."); process.exit(1); }
if (!GHL_TOKEN) { console.error("GHL_PRIVATE_TOKEN is not set."); process.exit(1); }
if (!GHL_LOCATION_ID) { console.error("GHL_LOCATION_ID is not set."); process.exit(1); }
if (!PEXELS_KEY) { console.error("PEXELS_API_KEY is not set."); process.exit(1); }

function loadLog() {
  if (!fs.existsSync(LOG_FILE)) return [];
  return JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
}

function saveLog(log) {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

function buildPrompt(scenario, usedScenarioKeys) {
  return `You are writing ONE long-form Facebook post for "El Martinez", a web design + SEO business, in the voice of its owner, Raphael.

Scenario seed (a COMPOSITE, illustrative situation based on a common real pattern - not one specific named real client): ${scenario.businessType}, dealing with ${scenario.problem}.

Already used, pick a different angle than these: ${usedScenarioKeys.length ? usedScenarioKeys.join(" / ") : "(none yet)"}

Task:
1. Use the web_search tool to find at least one real, current statistic or fact that supports why this problem actually matters (e.g. real data on mobile traffic share, page speed and bounce rate, local search / "near me" behavior, Google Business Profile impact, or similar - whatever is genuinely relevant to this scenario). Ground the informative part of the post in what you actually find. Never invent a statistic.
2. Write it as a story: open with the business owner's situation and the problem, walk through what was actually going on (using the real fact/data point naturally, not as a dry citation), then how a problem like this typically gets fixed and why that approach works. End with a short, honest takeaway - not a hard sales pitch.
3. Write in first person as Raphael, describing this as a kind of client situation he sees ("a dentist I worked with," "a real estate agency that came to me," etc.) - generic and honest about being a common/composite type of situation, not naming a specific business, address, or exact quoted testimonial as if it were one verified real client. Do not invent a company name, a person's name, or fabricated exact numbers/results for this specific "client" - keep outcome language realistic and general (e.g. "started showing up in local searches again," not an invented exact percentage tied to this one story).
4. Length: this can run long - aim for 180-350 words. Real paragraphs, a storytelling voice, no headers, no bullet points, no hashtags, at most one emoji.
5. No hard call-to-action like "book now" or "click the link" - end on the insight/story, not a pitch. No mention of "GHL" or any internal tool.
6. Output ONLY the final post text between the literal markers <<<POST>>> and <<<END>>>, nothing else outside those markers.`;
}

async function callClaude(messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000,
      messages,
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 6 }],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Anthropic API error ${res.status}: ${JSON.stringify(data.error || data)}`);
  const usedSearch = (data.content || []).some((b) => b.type === "server_tool_use");
  return { text: extractText(data.content || []), usedSearch };
}

function extractText(contentBlocks) {
  let out = "";
  for (const block of contentBlocks) {
    if (block.type === "text") out += block.text;
  }
  return out.trim();
}

function extractPost(text) {
  const match = text.match(/<<<POST>>>([\s\S]*?)<<<END>>>/);
  return match ? match[1].trim() : null;
}

function validate(text) {
  const errors = [];
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 120) errors.push(`too short (${wordCount} words, want 180-350)`);
  if (wordCount > 450) errors.push(`too long (${wordCount} words, want 180-350)`);
  const banned = /\b(click here|book now|link in bio|sign up today|limited time|shop now|visit our website|call now|dm us)\b/i;
  if (banned.test(text)) errors.push("contains hard-sell marketing language, not allowed");
  const hashtags = (text.match(/#\w+/g) || []).length;
  if (hashtags > 0) errors.push("contains hashtags, not allowed");
  return errors;
}

async function fetchPexelsImage(query) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`,
    { headers: { Authorization: PEXELS_KEY } }
  );
  if (!res.ok) throw new Error(`Pexels API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const photos = data.photos || [];
  if (!photos.length) throw new Error(`No Pexels results for query "${query}"`);
  const photo = photos[Math.floor(Math.random() * photos.length)];
  const imgRes = await fetch(photo.src.large2x || photo.src.large);
  if (!imgRes.ok) throw new Error(`Failed to download Pexels image: ${imgRes.status}`);
  return Buffer.from(await imgRes.arrayBuffer());
}

const EXPIRY_WARNING_DAYS = 7;

async function checkConnectionHealth() {
  const res = await fetch(`${GHL_BASE}/social-media-posting/${GHL_LOCATION_ID}/accounts`, {
    headers: { Authorization: `Bearer ${GHL_TOKEN}`, Version: "v3", Accept: "application/json" },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Could not check GHL connection status: ${JSON.stringify(data)}`);

  const account = (data.results?.accounts || []).find((a) => a.id === GHL_ACCOUNT_ID);
  if (!account) {
    throw new Error(
      "The El Martinez Facebook page is no longer connected in GHL's Social Planner at all. Reconnect: GHL dashboard -> Settings -> Social Planner -> Connect Account -> Facebook -> \"El Martinez\" page."
    );
  }
  if (account.isExpired) {
    throw new Error(
      `The El Martinez Facebook <-> GHL connection EXPIRED on ${account.expire}. No post was attempted. Reconnect: GHL dashboard -> Settings -> Social Planner -> reconnect the Facebook page.`
    );
  }
  const daysLeft = Math.floor((new Date(account.expire).getTime() - Date.now()) / 86400000);
  if (daysLeft <= EXPIRY_WARNING_DAYS) {
    console.log(`::warning::El Martinez Facebook <-> GHL connection expires in ${daysLeft} day(s) (${account.expire}). Reconnect soon in GHL.`);
  } else {
    console.log(`Connection healthy - expires ${account.expire} (${daysLeft} days left).`);
  }
}

async function main() {
  await checkConnectionHealth();

  const log = loadLog();
  const scenario = pickScenario(log);
  const usedScenarioKeys = log.map((e) => `${e.businessType} / ${e.problem}`);

  console.log(`Picked scenario: ${scenario.businessType} - ${scenario.problem}`);

  let messages = [{ role: "user", content: buildPrompt(scenario, usedScenarioKeys) }];
  let { text, usedSearch } = await callClaude(messages);
  let post = extractPost(text);
  if (!post) throw new Error("No <<<POST>>> markers in the model's response.");

  let errors = validate(post);
  if (!usedSearch) errors.push("model did not use web_search - can't confirm this is grounded in real research");

  if (errors.length) {
    console.log("Validation failed, requesting one correction pass:", errors.join("; "));
    messages.push({ role: "assistant", content: text });
    messages.push({
      role: "user",
      content: `That attempt had problems: ${errors.join("; ")}. Fix them. Output the corrected post again between <<<POST>>> and <<<END>>>, nothing else.`,
    });
    ({ text, usedSearch } = await callClaude(messages));
    post = extractPost(text);
    if (!post) throw new Error("Correction pass had no <<<POST>>> markers either.");
    errors = validate(post);
    if (!usedSearch) errors.push("model still did not use web_search");
    if (errors.length) throw new Error(`Validation failed after correction pass: ${errors.join("; ")}`);
  }

  console.log(`Post ready (${post.trim().split(/\s+/).length} words). Fetching image...`);

  const imageQuery = scenario.businessType.replace(/^an? /, "");
  const imageBuffer = await fetchPexelsImage(imageQuery);

  console.log("Uploading image to GHL media library...");
  const uploadForm = new FormData();
  uploadForm.append("file", new Blob([imageBuffer], { type: "image/jpeg" }), "story.jpg");
  const uploadRes = await fetch(`${GHL_BASE}/medias/upload-file`, {
    method: "POST",
    headers: { Authorization: `Bearer ${GHL_TOKEN}`, Version: "v3" },
    body: uploadForm,
  });
  const uploadResult = await uploadRes.json();
  if (!uploadRes.ok || !uploadResult.url) {
    throw new Error(`GHL media upload failed: ${JSON.stringify(uploadResult)}`);
  }

  console.log("Publishing through GHL Social Planner...");
  const postRes = await fetch(`${GHL_BASE}/social-media-posting/${GHL_LOCATION_ID}/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${GHL_TOKEN}`, Version: "v3", "Content-Type": "application/json" },
    body: JSON.stringify({
      accountIds: [GHL_ACCOUNT_ID],
      summary: post,
      media: [{ url: uploadResult.url, type: "image/jpeg" }],
      status: "published",
      type: "post",
      userId: GHL_USER_ID,
    }),
  });
  const postResult = await postRes.json();
  if (!postRes.ok) throw new Error(`GHL post creation failed: ${JSON.stringify(postResult)}`);

  let ghlPostId = null;
  let previewLink = null;
  try {
    const listRes = await fetch(`${GHL_BASE}/social-media-posting/${GHL_LOCATION_ID}/posts/list`, {
      method: "POST",
      headers: { Authorization: `Bearer ${GHL_TOKEN}`, Version: "v3", "Content-Type": "application/json" },
      body: JSON.stringify({ limit: "5", skip: "0" }),
    });
    const listData = await listRes.json();
    const match = (listData.results?.posts || []).find((p) => p.summary === post);
    if (match) {
      ghlPostId = match._id ?? null;
      previewLink = match.previewLink ?? null;
    }
  } catch (e) {
    console.log("Could not confirm post id/link via list lookup:", e.message);
  }
  if (!ghlPostId) {
    console.log("Raw create response (for debugging):", JSON.stringify(postResult));
  }

  log.push({
    key: scenarioKey(scenario),
    businessType: scenario.businessType,
    problem: scenario.problem,
    date: new Date().toISOString().slice(0, 10),
    ghlPostId,
    previewLink,
  });
  saveLog(log);

  console.log(`SUCCESS: posted the "${scenario.businessType}" story. GHL post id: ${ghlPostId || "(unknown - check logs)"}${previewLink ? `, link: ${previewLink}` : ""}`);
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
