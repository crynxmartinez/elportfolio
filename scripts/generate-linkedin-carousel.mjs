// Auto LinkedIn document-post generator.
//
// Keeps the case-study narrative (situation -> what was wrong -> what fixed
// it) because that reads as first-hand experience rather than generic how-to,
// which is what LinkedIn currently rewards. What changed is the source: the
// argument and every statistic now come from one article on Raphael's own
// site, so the claims are backed by research he published rather than
// generated fresh each run.
//
// Each page is rendered as a JPEG and published with
// linkedinPostDetails.postAsPdf, which GHL assembles into the swipeable
// document carousel. Carousels cannot contain clickable links - LinkedIn
// rasterises the pages - so the article URL goes in followUpComment.

import fs from "node:fs";
import path from "node:path";
import {
  listArticles,
  loadLog,
  pickArticle,
  anglesUsedFor,
  articleForPrompt,
} from "./lib/blog-angles.mjs";
import { confirmPost } from "./lib/ghl.mjs";
import { renderCoverPage, renderBodyPage, renderClosingPage } from "./lib/render-carousel.mjs";

const ROOT = process.cwd();
const LOG_FILE = path.join(ROOT, "content", "linkedin-carousel-log.json");
const MODEL = "claude-sonnet-5";
const SITE_URL = "https://www.raphaelmartinez.dev";
const SITE_NAME = "Raphael Martinez";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_ACCOUNT_ID = "692e47db203d655e3f1db9e8_xzA6eU8kOYmBuwFdr3CF__x_EbJhkhg_profile";
const GHL_USER_ID = "xJD4JpMksaufg8BzC2w8";

const API_KEY = process.env.ANTHROPIC_API_KEY;
const GHL_TOKEN = process.env.GHL_PRIVATE_TOKEN;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const PEXELS_KEY = process.env.PEXELS_API_KEY;

if (!API_KEY) { console.error("ANTHROPIC_API_KEY is not set."); process.exit(1); }
if (!GHL_TOKEN) { console.error("GHL_PRIVATE_TOKEN is not set."); process.exit(1); }
if (!GHL_LOCATION_ID) { console.error("GHL_LOCATION_ID is not set."); process.exit(1); }

function saveLog(log) {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

function buildPrompt(article, usedAngles) {
  return `You are writing an 8-page LinkedIn document carousel in the voice of Raphael Martinez, a web designer and systems builder.

It is built on one argument from an article on his own site. Here is the article.

TITLE: ${article.title}

ARTICLE:
${articleForPrompt(article)}

Angles already used from this article, pick a different one: ${usedAngles.length ? usedAngles.join(" / ") : "(none yet)"}

Task:
1. Pick ONE specific argument from the article - not a summary of it. Name it in a few words for the log.
2. Tell it as a case study: a situation, what was actually wrong underneath, and what resolved it. The business in the situation is a COMPOSITE - a realistic pattern, not a named real client - so do not invent a company name, a person, or a specific result figure for it. Give it one concrete, plausible, slightly odd detail so it reads as a real situation rather than a template.
3. Every statistic or factual claim must already appear in the article above. That research is the evidence; never add a number from memory and never invent one.
4. Lead with the observation, not the research. What Raphael keeps running into first; the supporting data after. Opening with a citation reads like a content mill.

The caption matters as much as the pages:
- The first line must work as a hook inside 140 characters, because LinkedIn truncates the preview there.
- The whole caption should land between 900 and 1300 characters. Shorter than about 600 performs measurably worse.
- No hashtags, no emoji, no call to action. Do not mention the article - it is linked separately in a comment.

Page structure (8 pages total):
- Cover: the claim, stated plainly, plus one sub-line
- Pages 1-2: the situation and what was actually going wrong
- Pages 3-4: the evidence, drawn from the article's research
- Pages 5-6: what resolves it and why that works
- Closing: the takeaway, warm and low-pressure

Output ONLY this JSON between the literal markers <<<JSON>>> and <<<END>>>, nothing outside them:
{
  "angle": "a few words naming the specific argument used",
  "caption": "the LinkedIn caption, 900-1300 characters, first line under 140 chars",
  "title": "cover title, under 8 words",
  "hook": "one sub-line for the cover",
  "pages": [{ "heading": "under 6 words", "body": "2-4 short sentences" }],
  "closingHeading": "short heading",
  "closingBody": "2-3 sentences, warm, no hard call to action"
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
    body: JSON.stringify({ model: MODEL, max_tokens: 4000, messages }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Anthropic API error ${res.status}: ${JSON.stringify(data.error || data)}`);
  let out = "";
  for (const block of data.content || []) if (block.type === "text") out += block.text;
  return out.trim();
}

function extractJson(text) {
  const match = text.match(/<<<JSON>>>([\s\S]*?)<<<END>>>/);
  if (!match) return null;
  try { return JSON.parse(match[1].trim()); } catch { return null; }
}

function validate(doc) {
  const errors = [];
  if (!doc) return ["no valid JSON found between markers"];
  if (!doc.angle) errors.push("missing angle");
  if (!doc.title || doc.title.length > 80) errors.push("missing or too-long title");
  if (!doc.hook) errors.push("missing hook");

  const caption = doc.caption || "";
  if (!caption) errors.push("missing caption");
  else {
    // LinkedIn truncates the feed preview around 140 characters, and the
    // 900-1300 band is where engagement measurably concentrates.
    const firstLine = caption.split("\n")[0];
    if (firstLine.length > 140) errors.push(`first caption line is ${firstLine.length} chars, must hook within 140`);
    if (caption.length < 700) errors.push(`caption is ${caption.length} chars, want 900-1300`);
    if (caption.length > 1600) errors.push(`caption is ${caption.length} chars, want 900-1300`);
    if (/(^|\s)#[a-zA-Z]\w*/.test(caption)) errors.push("caption contains hashtags, not allowed");
  }

  if (!Array.isArray(doc.pages) || doc.pages.length !== 6) {
    errors.push(`pages must be an array of exactly 6 (got ${doc.pages?.length})`);
  } else {
    doc.pages.forEach((p, i) => {
      if (!p.heading || !p.body) errors.push(`page ${i + 1} missing heading or body`);
    });
  }
  if (!doc.closingHeading || !doc.closingBody) errors.push("missing closing page content");

  const all = JSON.stringify(doc);
  if (/\b(click here|book now|link in bio|sign up today|limited time)\b/i.test(all)) errors.push("contains hard-sell language");
  return errors;
}

async function fetchCoverImage(article) {
  // Prefer the article's own cover so the carousel and the linked piece match.
  if (article.coverImage) {
    const res = await fetch(article.coverImage);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    console.log(`Article cover fetch failed (${res.status}); falling back to Pexels.`);
  }
  if (!PEXELS_KEY) throw new Error("No article cover image and PEXELS_API_KEY is not set.");
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent("modern office workspace")}&per_page=5&orientation=portrait`,
    { headers: { Authorization: PEXELS_KEY } }
  );
  if (!res.ok) throw new Error(`Pexels API error ${res.status}`);
  const data = await res.json();
  const photo = (data.photos || [])[Math.floor(Math.random() * (data.photos || []).length)];
  if (!photo) throw new Error("No Pexels fallback results");
  const img = await fetch(photo.src.large2x || photo.src.large);
  return Buffer.from(await img.arrayBuffer());
}

async function renderPages(content, coverImage) {
  const pages = [];
  pages.push(await renderCoverPage({ title: content.title, hook: content.hook, imageBuffer: coverImage, brandName: SITE_NAME }));
  for (let i = 0; i < content.pages.length; i++) {
    pages.push(await renderBodyPage({ index: i + 1, heading: content.pages[i].heading, body: content.pages[i].body }));
  }
  pages.push(await renderClosingPage({ heading: content.closingHeading, body: content.closingBody, siteName: SITE_NAME, siteUrl: "raphaelmartinez.dev" }));
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
    throw new Error("The LinkedIn profile is no longer connected in GHL's Social Planner. Reconnect: GHL dashboard -> Settings -> Social Planner.");
  }
  if (account.isExpired) {
    throw new Error(`The LinkedIn <-> GHL connection EXPIRED on ${account.expire}. No post was attempted.`);
  }
  const daysLeft = Math.floor((new Date(account.expire).getTime() - Date.now()) / 86400000);
  if (daysLeft <= EXPIRY_WARNING_DAYS) {
    console.log(`::warning::LinkedIn <-> GHL connection expires in ${daysLeft} day(s) (${account.expire}).`);
  } else {
    console.log(`Connection healthy - expires ${account.expire} (${daysLeft} days left).`);
  }
}

async function main() {
  await checkConnectionHealth();

  const log = loadLog("linkedin-carousel-log.json");
  const otherLog = loadLog("business-story-log.json");
  const articles = listArticles();
  if (!articles.length) throw new Error("No blog articles found in content/blog.");

  const article = pickArticle(articles, log, otherLog);
  const usedAngles = anglesUsedFor(article.slug, log, otherLog);
  console.log(`Picked article: ${article.slug} (${usedAngles.length} angle(s) already used)`);

  let messages = [{ role: "user", content: buildPrompt(article, usedAngles) }];
  let text = await callClaude(messages);
  let content = extractJson(text);
  let errors = validate(content);

  if (errors.length) {
    console.log("Validation failed, requesting one correction pass:", errors.join("; "));
    messages.push({ role: "assistant", content: text });
    messages.push({
      role: "user",
      content: `That attempt had problems: ${errors.join("; ")}. Fix them and output the corrected JSON again between <<<JSON>>> and <<<END>>>, nothing else.`,
    });
    text = await callClaude(messages);
    content = extractJson(text);
    errors = validate(content);
    if (errors.length) throw new Error(`Validation failed after correction pass: ${errors.join("; ")}`);
  }

  console.log(`Content ready: "${content.title}" - angle: "${content.angle}" (caption ${content.caption.length} chars)`);

  const coverImage = await fetchCoverImage(article);
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

  console.log("Publishing through GHL Social Planner to LinkedIn...");
  const postRes = await fetch(`${GHL_BASE}/social-media-posting/${GHL_LOCATION_ID}/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${GHL_TOKEN}`, Version: "v3", "Content-Type": "application/json" },
    body: JSON.stringify({
      accountIds: [GHL_ACCOUNT_ID],
      summary: content.caption,
      media,
      status: "published",
      type: "post",
      userId: GHL_USER_ID,
      linkedinPostDetails: { postAsPdf: true, pdfTitle: content.title.slice(0, 100) },
      followUpComment: `The full article, with the research behind this: ${article.url}`,
    }),
  });
  const postResult = await postRes.json();
  if (!postRes.ok) throw new Error(`GHL post creation failed: ${JSON.stringify(postResult)}`);

  const { ghlPostId, previewLink } = await confirmPost(content.caption, postResult, {
    token: GHL_TOKEN,
    locationId: GHL_LOCATION_ID,
  });

  log.push({
    slug: article.slug,
    angle: content.angle,
    articleTitle: article.title,
    title: content.title,
    date: new Date().toISOString().slice(0, 10),
    ghlPostId,
    previewLink,
  });
  saveLog(log);

  console.log(`SUCCESS: posted "${content.title}" from ${article.slug}. ${previewLink || ""}`);
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
