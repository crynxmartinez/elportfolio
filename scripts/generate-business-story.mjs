// Auto business-story poster for the "El Martinez" Facebook Page.
//
// Source: the site's own blog. Each run mines ONE argument ("angle") out of one
// article rather than summarising the whole thing, so a single 3,000-word
// researched post yields several distinct posts and the claims stay backed by
// the citations already in that article.
//
// Format: short-line vertical, not prose paragraphs.
//
// The article link goes in followUpComment rather than the post body, because
// Facebook suppresses reach on posts carrying external links.

import fs from "node:fs";
import path from "node:path";
import {
  listArticles,
  loadLog,
  pickArticle,
  anglesUsedFor,
  articleForPrompt,
} from "./lib/blog-angles.mjs";
import { pickMode, modeContext } from "./lib/post-modes.mjs";
import { confirmPost } from "./lib/ghl.mjs";

const ROOT = process.cwd();
const LOG_FILE = path.join(ROOT, "content", "business-story-log.json");
const MODEL = "claude-sonnet-5";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_ACCOUNT_ID = "66d636558cd0c2fdd69d7d70_xzA6eU8kOYmBuwFdr3CF_313238408535731_page";
const GHL_USER_ID = "xJD4JpMksaufg8BzC2w8";

const API_KEY = process.env.ANTHROPIC_API_KEY;
const GHL_TOKEN = process.env.GHL_PRIVATE_TOKEN;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

if (!API_KEY) { console.error("ANTHROPIC_API_KEY is not set."); process.exit(1); }
if (!GHL_TOKEN) { console.error("GHL_PRIVATE_TOKEN is not set."); process.exit(1); }
if (!GHL_LOCATION_ID) { console.error("GHL_LOCATION_ID is not set."); process.exit(1); }

function saveLog(log) {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

function buildPrompt(article, usedAngles, mode) {
  return `You are writing ONE Facebook post for "El Martinez", a web design + SEO business, in the voice of its owner, Raphael.

The post draws on a single article from his own site. Here it is.

TITLE: ${article.title}

ARTICLE:
${articleForPrompt(article)}

Angles already posted from this article, pick a different one: ${usedAngles.length ? usedAngles.join(" / ") : "(none yet)"}

MODE FOR THIS POST: ${mode.label}
${mode.social}

${modeContext(mode)}

Task:
1. Pick ONE specific argument from the article - not a summary of the whole thing. A good angle is a single claim a reader could disagree with, narrow enough to defend in a short post. Name it in a few words for the log.
2. Any statistic or factual claim must already appear in the article above. The article's research is your evidence; do not add numbers from memory and do not invent any.
3. Write it in the mode above. The mode decides the shape of the thinking; the article supplies the substance. A post in "How I think" mode built on this article should read completely differently from an "Education" post built on the same one.
4. Lead with something Raphael has seen or thought, not with the research. A post that opens by citing a study reads like a content mill; one that opens with an observation and then backs it up reads like a person.

FORMAT - this is not prose, it is a vertical post. Match this shape:
- One thought per line. Hard line breaks, not paragraphs.
- Open with a short plain line. No "In today's digital landscape", no rhetorical question hook.
- Use short runs of repeated sentence shapes for rhythm where it fits naturally.
- Include two clusters of bullet points, each bullet starting with a bullet character, each one line, 3-5 bullets per cluster.
- Put one or two short reflective lines between the clusters so it is not just two lists stacked.
- Close plainly and honestly. No call to action, no hashtags, no emoji.
- Never mention the article, the blog, or writing about this elsewhere - the link is posted separately as a comment.

Length: 150-300 words total.

Output ONLY this JSON between the literal markers <<<JSON>>> and <<<END>>>, nothing outside them:
{
  "angle": "a few words naming the specific argument used",
  "post": "the full post text, with real line breaks"
}`;
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

/* The previous validator counted words and penalised formatting, which the
   vertical format depends on. This one checks the shape instead. */
function validate(result) {
  const errors = [];
  if (!result) return ["no valid JSON between markers"];
  if (!result.angle) errors.push("missing angle");
  const post = result.post || "";
  if (!post) return ["missing post text"];

  const words = post.trim().split(/\s+/).filter(Boolean).length;
  if (words < 100) errors.push(`too short (${words} words, want 150-300)`);
  if (words > 400) errors.push(`too long (${words} words, want 150-300)`);

  const lines = post.split("\n").filter((l) => l.trim());
  if (lines.length < 12) errors.push(`only ${lines.length} lines - this must be a vertical post, not paragraphs`);

  const bullets = lines.filter((l) => /^\s*[•\-*]/.test(l));
  if (bullets.length < 6) errors.push(`only ${bullets.length} bullet lines - want two clusters of 3-5`);

  const longLines = lines.filter((l) => !/^\s*[•\-*]/.test(l) && l.length > 150);
  if (longLines.length) errors.push(`${longLines.length} line(s) are paragraph-length; keep one thought per line`);

  // A hashtag starts with a letter. Matching /#\w+/ also caught "rank #1",
  // which appears legitimately in article titles and quotes.
  if (/(^|\s)#[a-zA-Z]\w*/.test(post)) errors.push("contains hashtags, not allowed");
  if (/\b(dm me|click here|link in bio|sign up today|limited time)\b/i.test(post)) errors.push("contains hard-sell language");
  if (/\b(I wrote|my article|my blog|read more at)\b/i.test(post)) errors.push("references the article; the link goes in the comment instead");

  return errors;
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
    throw new Error("The El Martinez Facebook page is no longer connected in GHL's Social Planner. Reconnect: GHL dashboard -> Settings -> Social Planner.");
  }
  if (account.isExpired) {
    throw new Error(`The El Martinez Facebook <-> GHL connection EXPIRED on ${account.expire}. No post was attempted.`);
  }
  const daysLeft = Math.floor((new Date(account.expire).getTime() - Date.now()) / 86400000);
  if (daysLeft <= EXPIRY_WARNING_DAYS) {
    console.log(`::warning::Facebook <-> GHL connection expires in ${daysLeft} day(s) (${account.expire}).`);
  } else {
    console.log(`Connection healthy - expires ${account.expire} (${daysLeft} days left).`);
  }
}

async function uploadCover(article) {
  if (!article.coverImage) return [];
  const imgRes = await fetch(article.coverImage);
  if (!imgRes.ok) {
    console.log(`Could not fetch cover image (${imgRes.status}); posting without image.`);
    return [];
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const form = new FormData();
  form.append("file", new Blob([buf], { type: "image/jpeg" }), "cover.jpg");
  const up = await fetch(`${GHL_BASE}/medias/upload-file`, {
    method: "POST",
    headers: { Authorization: `Bearer ${GHL_TOKEN}`, Version: "v3" },
    body: form,
  });
  const upData = await up.json();
  if (up.ok && upData.url) return [{ url: upData.url, type: "image/jpeg" }];
  console.log("Cover image upload failed, posting without image:", JSON.stringify(upData));
  return [];
}

async function main() {
  await checkConnectionHealth();

  const log = loadLog("business-story-log.json");
  const otherLog = loadLog("linkedin-carousel-log.json");
  const articles = listArticles();
  if (!articles.length) throw new Error("No blog articles found in content/blog.");

  const article = pickArticle(articles, log, otherLog);
  const usedAngles = anglesUsedFor(article.slug, log, otherLog);
  const mode = pickMode(log);
  console.log(`Picked article: ${article.slug} (${usedAngles.length} angle(s) used) in "${mode.label}" mode`);

  let messages = [{ role: "user", content: buildPrompt(article, usedAngles, mode) }];
  let text = await callClaude(messages);
  let result = extractJson(text);
  let errors = validate(result);

  if (errors.length) {
    console.log("Validation failed, requesting one correction pass:", errors.join("; "));
    messages.push({ role: "assistant", content: text });
    messages.push({
      role: "user",
      content: `That attempt had problems: ${errors.join("; ")}. Fix them and output the corrected JSON again between <<<JSON>>> and <<<END>>>, nothing else.`,
    });
    text = await callClaude(messages);
    result = extractJson(text);
    errors = validate(result);
    if (errors.length) throw new Error(`Validation failed after correction pass: ${errors.join("; ")}`);
  }

  const post = result.post;
  console.log(`Post ready - angle: "${result.angle}" (${post.split("\n").filter(Boolean).length} lines)`);

  const media = await uploadCover(article);

  console.log("Publishing through GHL Social Planner...");
  const postRes = await fetch(`${GHL_BASE}/social-media-posting/${GHL_LOCATION_ID}/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${GHL_TOKEN}`, Version: "v3", "Content-Type": "application/json" },
    body: JSON.stringify({
      accountIds: [GHL_ACCOUNT_ID],
      summary: post,
      media,
      status: "published",
      type: "post",
      userId: GHL_USER_ID,
      followUpComment: `The full article, with the research behind this: ${article.url}`,
    }),
  });
  const postResult = await postRes.json();
  if (!postRes.ok) throw new Error(`GHL post creation failed: ${JSON.stringify(postResult)}`);

  const { ghlPostId, previewLink } = await confirmPost(post, postResult, {
    token: GHL_TOKEN,
    locationId: GHL_LOCATION_ID,
  });

  log.push({
    slug: article.slug,
    angle: result.angle,
    mode: mode.id,
    articleTitle: article.title,
    date: new Date().toISOString().slice(0, 10),
    ghlPostId,
    previewLink,
  });
  saveLog(log);

  console.log(`SUCCESS: posted "${result.angle}" (${mode.label}) from ${article.slug}. ${previewLink || ""}`);
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
