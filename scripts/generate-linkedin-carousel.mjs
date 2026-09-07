// Auto LinkedIn document-post generator. Picks an unused composite client
// scenario (see lib/scenarios.mjs, shared with the Facebook business-story
// poster but tracked in its own log so the two channels don't repeat each
// other), has Claude (with web_search, so the underlying facts are real)
// write a structured 8-page case-study, renders each page as its own JPEG
// (see lib/render-carousel.mjs), uploads all of them to GHL's media
// library, and publishes through GHL's Social Planner with
// linkedinPostDetails.postAsPdf: true - GHL assembles the images into the
// swipeable PDF/document carousel itself. A raw pre-built PDF is only
// accepted for drafts in the composer UI, not at publish time via this API.
//
// Same honesty rule as the Facebook version: composite/illustrative
// scenario based on a real recurring pattern, not a specific named,
// verifiable client, and no invented outcome numbers.

import fs from "node:fs";
import path from "node:path";
import { pickScenario, scenarioKey } from "./lib/scenarios.mjs";
import { confirmPost } from "./lib/ghl.mjs";
import { renderCoverPage, renderBodyPage, renderClosingPage } from "./lib/render-carousel.mjs";

const ROOT = process.cwd();
const LOG_FILE = path.join(ROOT, "content", "linkedin-carousel-log.json");
const MODEL = "claude-sonnet-5";
const SITE_URL = "https://www.raphaelmartinez.dev";
const SITE_NAME = "Raphael Martinez";

const GHL_BASE = "https://services.leadconnectorhq.com";
// "Raphael Martinez" LinkedIn profile, already connected in GHL's Social Planner.
const GHL_ACCOUNT_ID = "692e47db203d655e3f1db9e8_xzA6eU8kOYmBuwFdr3CF__x_EbJhkhg_profile";
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
  return `You are writing the content for an 8-page LinkedIn document post (a PDF that LinkedIn renders as a swipeable carousel), in the voice of Raphael Martinez, a web designer + SEO specialist.

Scenario seed (a COMPOSITE, illustrative situation based on a common real pattern - not one specific named real client): ${scenario.businessType}, dealing with ${scenario.problem}.

Already used, pick a different angle than these: ${usedScenarioKeys.length ? usedScenarioKeys.join(" / ") : "(none yet)"}

Task:
1. Use the web_search tool to find at least one real, current statistic or fact that supports why this problem matters (mobile traffic share, page speed / bounce rate, local search behavior, Google Business Profile impact, or whatever is genuinely relevant). Ground the informative content in what you actually find - never invent a statistic.
2. Structure this as a professional case-study story in exactly 6 body pages plus a title and a closing page (8 total), telling the story while teaching the reader something real about web design/SEO. Each body page should be short enough to read in a few seconds - this is a swiped carousel, not a report.
3. Stay honest about the framing: describe this as a kind of situation Raphael sees ("a dentist I worked with," "a small agency that came to me"), generic and composite, not naming a specific business, person, or fabricated exact result number for this one story. Realistic, general outcome language only (e.g. "started ranking again for their own city," not an invented specific percentage).
4. No hashtags. No hard sell. The closing page should be a genuine, low-pressure note, not a pitch.

Output ONLY a single JSON object between the literal markers <<<JSON>>> and <<<END>>>, matching this exact shape, nothing else outside those markers:
{
  "title": "Short punchy title for page 1 (under 8 words)",
  "hook": "One sentence sub-line for page 1",
  "pages": [
    { "heading": "Short heading (under 6 words)", "body": "2-4 short sentences for this page" }
  ],
  "closingHeading": "Short heading for the closing page",
  "closingBody": "2-3 sentences, warm and low-pressure, no hard call-to-action"
}
The "pages" array must have exactly 6 entries.`;
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

function extractJson(text) {
  const match = text.match(/<<<JSON>>>([\s\S]*?)<<<END>>>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch {
    return null;
  }
}

function validate(doc) {
  const errors = [];
  if (!doc) return ["no valid JSON found between markers"];
  if (!doc.title || doc.title.length > 80) errors.push("missing or too-long title");
  if (!doc.hook) errors.push("missing hook");
  if (!Array.isArray(doc.pages) || doc.pages.length !== 6) errors.push(`pages must be an array of exactly 6 (got ${doc.pages?.length})`);
  if (doc.pages) {
    doc.pages.forEach((p, i) => {
      if (!p.heading || !p.body) errors.push(`page ${i + 1} missing heading or body`);
    });
  }
  if (!doc.closingHeading || !doc.closingBody) errors.push("missing closing page content");
  const banned = /\b(click here|book now|link in bio|sign up today|limited time|shop now|dm me now)\b/i;
  const allText = JSON.stringify(doc);
  if (banned.test(allText)) errors.push("contains hard-sell marketing language, not allowed");
  if (/#\w+/.test(allText)) errors.push("contains hashtags, not allowed");
  return errors;
}

async function fetchPexelsImage(query) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=portrait`,
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

async function renderPages(content, coverImage) {
  const pages = [];
  pages.push(await renderCoverPage({ title: content.title, hook: content.hook, imageBuffer: coverImage, brandName: SITE_NAME }));
  for (let i = 0; i < content.pages.length; i++) {
    pages.push(await renderBodyPage({ index: i + 1, heading: content.pages[i].heading, body: content.pages[i].body }));
  }
  pages.push(await renderClosingPage({ heading: content.closingHeading, body: content.closingBody, siteName: SITE_NAME, siteUrl: SITE_URL }));
  return pages;
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
      "The LinkedIn profile is no longer connected in GHL's Social Planner at all. Reconnect: GHL dashboard -> Settings -> Social Planner -> Connect Account -> LinkedIn -> \"Raphael Martinez\"."
    );
  }
  if (account.isExpired) {
    throw new Error(
      `The LinkedIn <-> GHL connection EXPIRED on ${account.expire}. No post was attempted. Reconnect: GHL dashboard -> Settings -> Social Planner -> reconnect LinkedIn.`
    );
  }
  const daysLeft = Math.floor((new Date(account.expire).getTime() - Date.now()) / 86400000);
  if (daysLeft <= EXPIRY_WARNING_DAYS) {
    console.log(`::warning::LinkedIn <-> GHL connection expires in ${daysLeft} day(s) (${account.expire}). Reconnect soon in GHL.`);
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
  let content = extractJson(text);
  let errors = validate(content);
  if (!usedSearch) errors.push("model did not use web_search - can't confirm this is grounded in real research");

  if (errors.length) {
    console.log("Validation failed, requesting one correction pass:", errors.join("; "));
    messages.push({ role: "assistant", content: text });
    messages.push({
      role: "user",
      content: `That attempt had problems: ${errors.join("; ")}. Fix them. Output the corrected JSON again between <<<JSON>>> and <<<END>>>, nothing else.`,
    });
    ({ text, usedSearch } = await callClaude(messages));
    content = extractJson(text);
    errors = validate(content);
    if (!usedSearch) errors.push("model still did not use web_search");
    if (errors.length) throw new Error(`Validation failed after correction pass: ${errors.join("; ")}`);
  }

  console.log(`Content ready: "${content.title}". Fetching cover image and rendering pages...`);

  const imageQuery = scenario.businessType.replace(/^an? /, "");
  const coverImage = await fetchPexelsImage(imageQuery);
  const pageImages = await renderPages(content, coverImage);

  console.log(`Rendered ${pageImages.length} pages. Uploading each to GHL media library...`);
  const media = [];
  for (let i = 0; i < pageImages.length; i++) {
    const uploadForm = new FormData();
    uploadForm.append("file", new Blob([pageImages[i]], { type: "image/jpeg" }), `page-${i + 1}.jpg`);
    const uploadRes = await fetch(`${GHL_BASE}/medias/upload-file`, {
      method: "POST",
      headers: { Authorization: `Bearer ${GHL_TOKEN}`, Version: "v3" },
      body: uploadForm,
    });
    const uploadResult = await uploadRes.json();
    if (!uploadRes.ok || !uploadResult.url) {
      throw new Error(`GHL media upload failed for page ${i + 1}: ${JSON.stringify(uploadResult)}`);
    }
    media.push({ url: uploadResult.url, type: "image/jpeg" });
  }

  const summary = `${content.title}\n\n${content.hook}`;

  console.log("Publishing through GHL Social Planner to LinkedIn as a document carousel...");
  const postRes = await fetch(`${GHL_BASE}/social-media-posting/${GHL_LOCATION_ID}/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${GHL_TOKEN}`, Version: "v3", "Content-Type": "application/json" },
    body: JSON.stringify({
      accountIds: [GHL_ACCOUNT_ID],
      summary,
      media,
      status: "published",
      type: "post",
      userId: GHL_USER_ID,
      linkedinPostDetails: { postAsPdf: true, pdfTitle: content.title.slice(0, 100) },
    }),
  });
  const postResult = await postRes.json();
  if (!postRes.ok) throw new Error(`GHL post creation failed: ${JSON.stringify(postResult)}`);

  const { ghlPostId, previewLink } = await confirmPost(summary, postResult, { token: GHL_TOKEN, locationId: GHL_LOCATION_ID });

  log.push({
    key: scenarioKey(scenario),
    businessType: scenario.businessType,
    problem: scenario.problem,
    title: content.title,
    date: new Date().toISOString().slice(0, 10),
    ghlPostId,
    previewLink,
  });
  saveLog(log);

  console.log(`SUCCESS: posted "${content.title}" to LinkedIn. GHL post id: ${ghlPostId || "(unknown - check logs)"}${previewLink ? `, link: ${previewLink}` : ""}`);
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
