// Pulls published-post performance for both connected channels out of GHL and
// prints a single report. GHL's post objects carry an `insights` object
// (like/share/comment) that does populate, so this is real data rather than an
// estimate - but it is only what GHL exposes. Impressions and reach are not
// available through this endpoint; for those, use the native LinkedIn and
// Facebook page dashboards.
//
// Usage: node scripts/social-report.mjs [days]

import fs from "node:fs";
import path from "node:path";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_TOKEN = process.env.GHL_PRIVATE_TOKEN;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const DAYS = Number(process.argv[2] || 30);

if (!GHL_TOKEN || !GHL_LOCATION_ID) {
  console.error("GHL_PRIVATE_TOKEN and GHL_LOCATION_ID must be set.");
  process.exit(1);
}

const ACCOUNTS = {
  "66d636558cd0c2fdd69d7d70_xzA6eU8kOYmBuwFdr3CF_313238408535731_page": "Facebook - El Martinez",
  "692e47db203d655e3f1db9e8_xzA6eU8kOYmBuwFdr3CF__x_EbJhkhg_profile": "LinkedIn - Raphael Martinez",
  "66d636558cd0c2fdd69d7d70_xzA6eU8kOYmBuwFdr3CF_106289882129994_page": "Facebook - Codex Legend",
};

async function fetchPosts() {
  const all = [];
  for (let skip = 0; skip < 200; skip += 50) {
    const res = await fetch(`${GHL_BASE}/social-media-posting/${GHL_LOCATION_ID}/posts/list`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_TOKEN}`,
        Version: "v3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit: "50", skip: String(skip) }),
    });
    if (!res.ok) throw new Error(`GHL list failed: ${res.status} ${await res.text()}`);
    const data = await res.json();
    const posts = data.results?.posts || [];
    all.push(...posts);
    if (posts.length < 50) break;
  }
  return all;
}

function loadLog(file) {
  const p = path.join(process.cwd(), "content", file);
  if (!fs.existsSync(p)) return [];
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return []; }
}

function main(posts) {
  const cutoff = Date.now() - DAYS * 86400000;
  const logs = [...loadLog("business-story-log.json"), ...loadLog("linkedin-carousel-log.json")];
  const byId = new Map(logs.filter((l) => l.ghlPostId).map((l) => [l.ghlPostId, l]));

  const live = posts.filter(
    (p) => p.status === "published" && !p.deleted && new Date(p.createdAt).getTime() >= cutoff
  );

  const groups = new Map();
  for (const p of live) {
    const account = p.accountId || (p.accountIds || [])[0];
    const label = ACCOUNTS[account] || p.platform || "unknown";
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(p);
  }

  console.log(`\nSocial performance — last ${DAYS} days\n${"=".repeat(52)}`);

  let grand = { like: 0, share: 0, comment: 0, posts: 0 };

  for (const [label, items] of [...groups].sort()) {
    const totals = items.reduce(
      (acc, p) => ({
        like: acc.like + (p.insights?.like || 0),
        share: acc.share + (p.insights?.share || 0),
        comment: acc.comment + (p.insights?.comment || 0),
      }),
      { like: 0, share: 0, comment: 0 }
    );
    grand.like += totals.like;
    grand.share += totals.share;
    grand.comment += totals.comment;
    grand.posts += items.length;

    const engaged = totals.like + totals.share + totals.comment;
    console.log(`\n${label}`);
    console.log(`  posts: ${items.length}   likes: ${totals.like}   shares: ${totals.share}   comments: ${totals.comment}`);
    console.log(`  engagement per post: ${(engaged / Math.max(items.length, 1)).toFixed(2)}`);

    const ranked = items
      .map((p) => ({
        date: (p.createdAt || "").slice(0, 10),
        score: (p.insights?.like || 0) + (p.insights?.share || 0) + (p.insights?.comment || 0),
        topic: byId.get(p._id)?.title || byId.get(p._id)?.businessType || (p.summary || "").split("\n")[0].slice(0, 58),
      }))
      .sort((a, b) => b.score - a.score);

    const best = ranked.filter((r) => r.score > 0).slice(0, 3);
    if (best.length) {
      console.log("  top posts:");
      for (const r of best) console.log(`    ${r.date}  ${String(r.score).padStart(2)}  ${r.topic}`);
    } else {
      console.log("  top posts: no recorded engagement yet");
    }
  }

  const total = grand.like + grand.share + grand.comment;
  console.log(`\n${"=".repeat(52)}`);
  console.log(`TOTAL: ${grand.posts} posts, ${total} interactions (${(total / Math.max(grand.posts, 1)).toFixed(2)} per post)`);
  console.log(`\nNote: GHL exposes likes/shares/comments only. Impressions, reach and`);
  console.log(`click-throughs live in the native LinkedIn and Facebook dashboards,`);
  console.log(`and site-side traffic is in Vercel Analytics / Search Console.\n`);
}

fetchPosts().then(main).catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
