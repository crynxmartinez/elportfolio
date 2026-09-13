/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node QA utility, also supports the bundled runtime. */
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const projects = {
  marea: "https://marea-kohl.vercel.app",
  "funnel-3d": "https://funnel3dpractice.vercel.app",
  kingvet: "https://kingvet.vercel.app",
  opervia: "https://opervia-three.vercel.app",
  tasheel: "https://www.tasheel.live",
  verifiedhomeowner: "https://www.verifiedhomeowner.com",
  "codex-legends": "https://codexlegendtcgsite.vercel.app",
  myblooddonorph: "https://myblooddonorph.vercel.app",
  "rei-data-tools": "https://reidatatools.vercel.app/data-extractor",
};
(async () => {
  const browser = await chromium.launch({ headless: true });
  const out = path.resolve(__dirname, "../../public/projects");
  for (const [slug, url] of Object.entries(projects).filter(
    ([slug]) => !process.env.ONLY || process.env.ONLY.split(",").includes(slug),
  )) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 960 },
      deviceScaleFactor: 1,
    });
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(
        ["marea", "kingvet"].includes(slug) ? 45000 : 6000,
      );
      const title = await page.title();
      if (/404|not found|deployment.*not|security checkpoint/i.test(title))
        throw new Error(title);
      const buffer = await page.screenshot();
      await sharp(buffer)
        .resize(1440)
        .webp({ quality: 82 })
        .toFile(path.join(out, slug + ".webp"));
      console.log(
        JSON.stringify({
          slug,
          url,
          title,
          bytes: fs.statSync(path.join(out, slug + ".webp")).size,
        }),
      );
    } catch (e) {
      console.log(JSON.stringify({ slug, error: e.message }));
    } finally {
      await page.close();
    }
  }
  await browser.close();
})();
