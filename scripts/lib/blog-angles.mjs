// Shared source for both social channels: the blog.
//
// Each article is mined for one ANGLE at a time - a single argument inside it -
// rather than summarised whole. A 3,000-word researched post holds five or six
// distinct arguments, so seven articles sustain months of posting without
// repeating, and each post lands sharper than a whole-article summary would.
//
// Selection reads BOTH channel logs, so Facebook and LinkedIn never run the
// same angle from the same article in the same stretch.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "blog");
export const SITE_URL = "https://www.raphaelmartinez.dev";

export function listArticles() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || "",
        date: data.date || "",
        coverImage: data.coverImage || null,
        body: content,
        url: `${SITE_URL}/blog/${slug}`,
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export function loadLog(file) {
  const p = path.join(ROOT, "content", file);
  if (!fs.existsSync(p)) return [];
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return [];
  }
}

/* Picks the article that has been mined least, breaking ties toward whatever
   has not been posted recently on either channel. `otherLog` is the opposite
   channel's history, used only to avoid collisions - not to block an article
   outright, since the two audiences barely overlap. */
export function pickArticle(articles, ownLog, otherLog = []) {
  const usageBySlug = new Map();
  for (const entry of [...ownLog, ...otherLog]) {
    if (!entry.slug) continue;
    usageBySlug.set(entry.slug, (usageBySlug.get(entry.slug) || 0) + 1);
  }

  const recent = new Set(
    [...ownLog, ...otherLog].slice(-4).map((e) => e.slug).filter(Boolean)
  );

  const ranked = [...articles].sort((a, b) => {
    const ua = usageBySlug.get(a.slug) || 0;
    const ub = usageBySlug.get(b.slug) || 0;
    if (ua !== ub) return ua - ub;
    return Math.random() - 0.5;
  });

  return ranked.find((a) => !recent.has(a.slug)) || ranked[0];
}

export function anglesUsedFor(slug, ...logs) {
  return logs
    .flat()
    .filter((e) => e.slug === slug && e.angle)
    .map((e) => e.angle);
}

/* The article body is markdown with inline citation links. Keeping the links
   in matters: the generator is told to reuse the article's real sources rather
   than inventing statistics, so it needs to see them. */
export function articleForPrompt(article, maxChars = 9000) {
  return article.body.replace(/\n{3,}/g, "\n\n").slice(0, maxChars);
}
