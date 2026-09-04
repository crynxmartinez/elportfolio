// Auto blog writer. Reads existing posts for topic dedupe + voice reference,
// asks Claude (with the native web_search tool, so citations are real) to
// write one ~3000-word post, validates it, writes content/blog/<slug>.md,
// then runs `npm run build` as a hard gate - nothing gets committed unless
// the whole site still builds clean with the new post included.

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "blog");
const REFERENCE_SLUG = "premium-website";
const MODEL = "claude-sonnet-5";
const API_KEY = process.env.ANTHROPIC_API_KEY;
const PEXELS_KEY = process.env.PEXELS_API_KEY;

if (!API_KEY) {
  console.error("ANTHROPIC_API_KEY is not set.");
  process.exit(1);
}
if (!PEXELS_KEY) {
  console.error("PEXELS_API_KEY is not set.");
  process.exit(1);
}

async function fetchCoverImage(query) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
    { headers: { Authorization: PEXELS_KEY } }
  );
  if (!res.ok) throw new Error(`Pexels API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const photo = data.photos && data.photos[0];
  if (!photo) throw new Error(`No Pexels results for query "${query}"`);
  return {
    coverImage: photo.src.large2x || photo.src.large,
    coverImageAlt: photo.alt || query,
    coverCredit: { name: photo.photographer, url: photo.photographer_url },
  };
}

function readExistingPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files.map((f) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
    const { data } = matter(raw);
    return { slug: f.replace(/\.md$/, ""), title: data.title, date: data.date };
  });
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function uniqueSlug(base, existingSlugs) {
  if (!existingSlugs.includes(base)) return base;
  let i = 2;
  while (existingSlugs.includes(`${base}-${i}`)) i++;
  return `${base}-${i}`;
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
      max_tokens: 16000,
      messages,
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 10 }],
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Anthropic API error ${res.status}: ${JSON.stringify(data.error || data)}`);
  }
  return { text: extractText(data.content || []), stopReason: data.stop_reason, raw: data };
}

/* The web_search tool returns grounded claims as separate text blocks each
   carrying a `citations` array (url/title), rather than the model writing
   [text](url) markdown itself - and those blocks are meant to concatenate
   into continuous prose, not one-per-line. This turns each cited span into
   a real markdown link (merging consecutive spans citing the same URL into
   one link) and joins everything with no extra whitespace. */
function extractText(contentBlocks) {
  let out = "";
  let openUrl = null;
  let openBuf = "";

  function closeLink() {
    if (openUrl) {
      out += `[${openBuf}](${openUrl})`;
      openUrl = null;
      openBuf = "";
    }
  }

  for (const block of contentBlocks) {
    if (block.type !== "text") continue;
    const url = block.citations && block.citations.length ? block.citations[0].url : null;
    if (url) {
      if (openUrl === url) {
        openBuf += block.text;
      } else {
        closeLink();
        openUrl = url;
        openBuf = block.text;
      }
    } else {
      closeLink();
      out += block.text;
    }
  }
  closeLink();
  return out;
}

function extractFile(text) {
  const match = text.match(/<<<FILE>>>([\s\S]*?)<<<END>>>/);
  if (!match) return null;
  return match[1].trim();
}

function validate(fileContent) {
  const { data, content } = matter(fileContent);
  const errors = [];
  if (!data.title || typeof data.title !== "string") errors.push("missing title");
  if (!data.excerpt || typeof data.excerpt !== "string") errors.push("missing excerpt");
  if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) errors.push("missing/invalid date (YYYY-MM-DD)");
  if (!data.readTime || typeof data.readTime !== "string") errors.push("missing readTime");
  if (!data.imageQuery || typeof data.imageQuery !== "string") errors.push("missing imageQuery");
  if (!Array.isArray(data.faqs) || data.faqs.length !== 5) errors.push("faqs must be an array of exactly 5 items");
  else {
    data.faqs.forEach((f, i) => {
      if (!f.q || !f.a) errors.push(`faq[${i}] missing q or a`);
    });
  }
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 2500) errors.push(`body too short (${wordCount} words, want ~3000)`);

  const links = content.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) || [];
  if (links.length < 5) {
    errors.push(
      `only ${links.length} real markdown links [text](https://...) found in the body - citations must be actual clickable links, not just named sources. Want at least 5-8.`
    );
  }

  return { errors, data, wordCount, linkCount: links.length };
}

function buildPrompt(existingPosts, referenceMd) {
  const existingList = existingPosts.map((p) => `- "${p.title}" (${p.date})`).join("\n") || "(none yet)";
  const today = new Date().toISOString().slice(0, 10);

  return `You are writing one new blog post for the Next.js site at github.com/crynxmartinez/elportfolio - a premium web-design portfolio for Raphael Martinez.

Existing posts (do not repeat these topics):
${existingList}

Reference post for voice, structure, and quality bar (content/blog/${REFERENCE_SLUG}.md):
"""
${referenceMd}
"""

Task:
1. Pick ONE topic, rotating across three buckets so the blog stays varied: (a) website design / premium web design, (b) SEO, (c) how businesses combine a website with SEO to actually grow (lead generation, conversion, local search, etc). Pick whichever bucket is least recently covered by the existing posts above.
2. Research it for REAL using the web_search tool. Every factual claim, statistic, or named study must come from a real source you actually found via search, cited inline as an ACTUAL CLICKABLE MARKDOWN LINK - not just naming the source in prose. Wrong: "Whitespark's report found X." Right: "[Whitespark's report](https://actual-url-you-found) found X." Use the real URL of the page you searched and read - never a placeholder or invented URL. Aim for 5-8 such links spread through the piece, the same density as the reference post. Never invent a statistic, study, or source. If you can't verify something, phrase it as reasoned opinion, not a cited fact.
3. Write AT LEAST 3000 words (aim for 3200-3500 to be safe - err long, not short) in that same direct, no-hype voice, with clear H2 (##) / H3 (###) section headings. That means covering enough distinct sub-topics: expect 7-9 H2 sections, not 4-5. Write in normal flowing paragraphs - do not break sentences across lines with stray line breaks.
4. Write exactly 5 FAQs - the most genuinely common real-world questions on this topic - matching the tone/depth of the reference post's FAQs.
5. Also write an \`imageQuery\` field: a 2-4 word English search phrase for a real stock photo on Pexels that would work well as this post's cover image (concrete and visual, e.g. "laptop coding desk" or "small business storefront" - not abstract like "success" or "growth").
6. Output ONLY the complete file content (frontmatter + Markdown body) between the literal markers <<<FILE>>> and <<<END>>>, with nothing else outside those markers - no preamble, no commentary. The frontmatter must be exactly this shape:

---
title: "..."
excerpt: "1-2 sentence summary"
date: "${today}"
readTime: "NN min read"
imageQuery: "..."
faqs:
  - q: "..."
    a: "..."
  - q: "..."
    a: "..."
  - q: "..."
    a: "..."
  - q: "..."
    a: "..."
  - q: "..."
    a: "..."
---

followed by the Markdown body.`;
}

async function main() {
  const existingSlugs = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
  const existingPosts = readExistingPosts();
  const referenceMd = fs.readFileSync(path.join(POSTS_DIR, `${REFERENCE_SLUG}.md`), "utf8");

  const prompt = buildPrompt(existingPosts, referenceMd);
  console.log("Requesting post from Claude (with web search)...");

  let messages = [{ role: "user", content: prompt }];
  let { text } = await callClaude(messages);
  let fileContent = extractFile(text);

  if (!fileContent) {
    throw new Error("Could not find <<<FILE>>>...<<<END>>> markers in the model's response.");
  }

  let { errors, data, wordCount } = validate(fileContent);

  if (errors.length) {
    const onlyLength = errors.length === 1 && errors[0].startsWith("body too short");
    console.log("Validation failed, requesting one correction pass:", errors.join("; "));
    messages.push({ role: "assistant", content: text });
    const instruction = onlyLength
      ? `That was only ${wordCount} words - too short. Keep everything you already wrote exactly as-is, and ADD 1-2 more H2 sections covering genuinely new sub-topics to bring the total to at least 3000 words. Use the web_search tool again for real, newly-cited claims in these new sections - don't just rephrase what you already wrote without searching. Output the FULL corrected file (your existing content plus the new sections) between <<<FILE>>> and <<<END>>>, nothing else.`
      : `That output had problems: ${errors.join("; ")}. If you're re-writing any claims, use the web_search tool again so they stay real and properly cited - do not just restate facts from memory without searching. Output the corrected COMPLETE file again between <<<FILE>>> and <<<END>>>, nothing else.`;
    messages.push({ role: "user", content: instruction });
    ({ text } = await callClaude(messages));
    fileContent = extractFile(text);
    if (!fileContent) throw new Error("Correction pass had no <<<FILE>>> markers either.");
    ({ errors, data, wordCount } = validate(fileContent));
    if (errors.length) throw new Error(`Validation failed after correction pass: ${errors.join("; ")}`);
  }

  const baseSlug = slugify(data.title);
  const slug = uniqueSlug(baseSlug, existingSlugs);
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  fs.writeFileSync(filePath, fileContent, "utf8");
  console.log(`Wrote ${filePath} (${wordCount} words)`);

  function tryBuild() {
    try {
      execSync("npm run build", { cwd: ROOT, stdio: "pipe" });
      return { ok: true };
    } catch (e) {
      return { ok: false, output: (e.stdout?.toString() || "") + (e.stderr?.toString() || "") };
    }
  }

  let result = tryBuild();
  if (!result.ok) {
    console.log("Build failed, requesting one repair pass...");
    messages.push({ role: "assistant", content: text });
    messages.push({
      role: "user",
      content: `The file you wrote broke \`npm run build\`. Here is the build output:\n\n${result.output.slice(-4000)}\n\nOutput the corrected COMPLETE file again between <<<FILE>>> and <<<END>>>, nothing else. Keep the same frontmatter shape.`,
    });
    ({ text } = await callClaude(messages));
    const repaired = extractFile(text);
    if (!repaired) {
      fs.unlinkSync(filePath);
      throw new Error("Repair pass had no <<<FILE>>> markers. Aborting, no file left behind.");
    }
    const revalidated = validate(repaired);
    if (revalidated.errors.length) {
      fs.unlinkSync(filePath);
      throw new Error(`Repair pass failed validation: ${revalidated.errors.join("; ")}. Aborting.`);
    }
    fileContent = repaired;
    data = revalidated.data;
    wordCount = revalidated.wordCount;
    fs.writeFileSync(filePath, fileContent, "utf8");
    result = tryBuild();
    if (!result.ok) {
      fs.unlinkSync(filePath);
      throw new Error(`Build still failing after repair pass. Aborting, no file left behind.\n${result.output.slice(-4000)}`);
    }
  }

  // Text + build are both good now - fetch and inject the cover image last,
  // as a single final step, then rebuild once more to confirm the
  // frontmatter edit itself didn't break anything.
  console.log(`Fetching Pexels cover image for "${data.imageQuery}"...`);
  const { content: bodyOnly, data: fmData } = matter(fileContent);
  const cover = await fetchCoverImage(data.imageQuery);
  fmData.coverImage = cover.coverImage;
  fmData.coverImageAlt = cover.coverImageAlt;
  fmData.coverCredit = cover.coverCredit;
  delete fmData.imageQuery;
  fileContent = matter.stringify(bodyOnly, fmData);
  fs.writeFileSync(filePath, fileContent, "utf8");

  result = tryBuild();
  if (!result.ok) {
    fs.unlinkSync(filePath);
    throw new Error(`Build failed after adding the cover image. Aborting, no file left behind.\n${result.output.slice(-4000)}`);
  }

  console.log(`SUCCESS: "${data.title}" (${slug}), ${wordCount} words, cover by ${cover.coverCredit.name}, build passed.`);
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
