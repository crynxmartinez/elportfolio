/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node QA utility, also supports the bundled runtime. */
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const fs = require("fs");
const path = require("path");
(async () => {
  const browser = await chromium.launch();
  const dir = path.join(__dirname, "../../.design-review");
  fs.mkdirSync(dir, { recursive: true });
  const results = [];
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(dir, `hero-${width}.png`) });
    await page.screenshot({
      path: path.join(dir, `home-${width}.png`),
      fullPage: true,
    });
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      h1: document.querySelector("h1")?.textContent,
      bodyOverflow: getComputedStyle(document.body).overflow,
      images: [...document.images].every(
        (i) => i.complete && i.naturalWidth > 0,
      ),
      sequenceRequests: performance
        .getEntriesByType("resource")
        .filter((r) => r.name.includes("journey-seq")).length,
      transfer: performance
        .getEntriesByType("resource")
        .reduce((n, r) => n + (r.transferSize || 0), 0),
    }));
    await page.locator("summary").first().click();
    state.faqOpen =
      (await page.locator("details").first().getAttribute("open")) !== null;
    if (width < 800) {
      await page.getByRole("button", { name: "Menu +" }).click();
      await page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Work", exact: true })
        .click();
      await page.waitForURL("**/portfolio");
      state.mobileNav = page.url().endsWith("/portfolio");
    }
    results.push({ width, ...state, errors });
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
  });
  const p = await context.newPage();
  for (const route of [
    "/portfolio",
    "/portfolio/marea",
    "/portfolio/kingvet",
    "/portfolio/opervia",
    "/services",
    "/about",
    "/blog",
    "/blog/premium-website",
    "/contact",
    "/privacy",
    "/testimonials",
  ]) {
    const res = await p.goto("http://localhost:3100" + route, {
      waitUntil: "domcontentloaded",
    });
    results.push({ route, status: res.status(), url: p.url() });
    if (["/portfolio", "/contact"].includes(route)) {
      await p.waitForTimeout(4000);
      await p.screenshot({
        path: path.join(dir, route.slice(1) + ".png"),
        fullPage: true,
      });
    }
  }
  await p.goto("http://localhost:3100");
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.locator(".depth-stage").hover();
  results.push({
    reducedMotionTransform: await p
      .locator(".depth-object")
      .evaluate((e) => getComputedStyle(e).transform),
  });
  const nojs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const np = await nojs.newPage();
  await np.goto("http://localhost:3100");
  results.push({
    withoutJS: {
      headline: await np.locator("h1").isVisible(),
      contactLink: await np
        .getByRole("link", { name: "Discuss my website ↗", exact: true })
        .first()
        .isVisible(),
    },
  });
  fs.writeFileSync(
    path.join(dir, "results.json"),
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
