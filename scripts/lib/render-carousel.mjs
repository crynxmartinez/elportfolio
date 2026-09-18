// Renders each LinkedIn carousel page as a single JPEG via an SVG template
// (rasterized by sharp). GHL's LinkedIn document-post mechanic wants a plain
// array of images plus linkedinPostDetails.postAsPdf: true - it assembles
// the PDF/carousel itself; it does NOT accept an already-built PDF at
// publish time (only for drafts saved in the composer UI).
//
// Layout: the heading+body block is vertically centered within the page's
// content zone (below the index mark, above the bottom margin) rather than
// pinned to a fixed offset. A short body no longer leaves a huge dead zone
// below it, and a long body no longer risks crowding the bottom edge -
// both were happening before because every page used the same fixed Y
// regardless of how much text it actually held.

import sharp from "sharp";

const PAGE_W = 1080;
const PAGE_H = 1350; // 4:5, LinkedIn document-post friendly
const MARGIN_X = 90;
const CONTENT_W = PAGE_W - MARGIN_X * 2; // ~900px - actually used now, not ~450
const BG = "#05080a";
const ACCENT = "#f4c95d";
const TEXT = "#dcdcdc";
const WHITE = "#ffffff";
const FONT = "Arial, Helvetica, sans-serif";

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text, maxCharsPerLine) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function textBlock(lines, x, startY, lineHeight, fontSize, fill, weight = "normal") {
  return lines
    .map(
      (line, i) =>
        `<text x="${x}" y="${startY + i * lineHeight}" font-family="${FONT}" font-size="${fontSize}" font-weight="${weight}" fill="${fill}">${escapeXml(line)}</text>`
    )
    .join("\n");
}

async function toJpeg(svg) {
  return sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer();
}

// Centers a heading+rule+body block inside [zoneTop, zoneBottom]. Falls back
// to top-aligned only if the content is actually taller than the zone.
function layoutCenteredBlock({ zoneTop, zoneBottom, headingLines, headingLineH, gapAfterHeading, ruleH, gapAfterRule, bodyLines, bodyLineH }) {
  const headingH = headingLines.length * headingLineH;
  const bodyH = bodyLines.length * bodyLineH;
  const totalH = headingH + gapAfterHeading + ruleH + gapAfterRule + bodyH;
  const zoneH = zoneBottom - zoneTop;
  const blockTop = zoneTop + Math.max(0, (zoneH - totalH) / 2);

  const headingStartY = blockTop + headingLineH * 0.8;
  const ruleY = blockTop + headingH + gapAfterHeading / 2;
  const bodyStartY = blockTop + headingH + gapAfterHeading + ruleH + gapAfterRule + bodyLineH * 0.8;
  return { headingStartY, ruleY, bodyStartY };
}

export async function renderCoverPage({ title, hook, imageBuffer, brandName }) {
  const coverH = Math.round(PAGE_H * 0.5);
  const resizedImage = await sharp(imageBuffer).resize(PAGE_W, coverH, { fit: "cover" }).jpeg().toBuffer();
  const imgB64 = resizedImage.toString("base64");
  const titleLines = wrapText(title, 24);
  const hookLines = wrapText(hook, 52);

  const zoneTop = coverH + 70;
  const zoneBottom = PAGE_H - 70;
  const { headingStartY: titleStartY, bodyStartY: hookStartY } = layoutCenteredBlock({
    zoneTop,
    zoneBottom,
    headingLines: titleLines,
    headingLineH: 62,
    gapAfterHeading: 20,
    ruleH: 0,
    gapAfterRule: 26,
    bodyLines: hookLines,
    bodyLineH: 38,
  });

  const svg = `<svg width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${PAGE_W}" height="${PAGE_H}" fill="${BG}"/>
    <image href="data:image/jpeg;base64,${imgB64}" x="0" y="0" width="${PAGE_W}" height="${coverH}"/>
    <rect x="0" y="0" width="${PAGE_W}" height="${coverH}" fill="${BG}" opacity="0.3"/>
    <text x="${MARGIN_X}" y="${coverH + 42}" font-family="${FONT}" font-size="28" font-weight="bold" letter-spacing="2" fill="${ACCENT}">${escapeXml(brandName.toUpperCase())}</text>
    ${textBlock(titleLines, MARGIN_X, titleStartY, 62, 54, WHITE, "bold")}
    ${textBlock(hookLines, MARGIN_X, hookStartY, 38, 30, TEXT)}
  </svg>`;
  return toJpeg(svg);
}

export async function renderBodyPage({ index, heading, body }) {
  const headingLines = wrapText(heading, 22);
  const bodyLines = wrapText(body, 50);

  const zoneTop = 210;
  const zoneBottom = PAGE_H - 110;
  const { headingStartY, ruleY, bodyStartY } = layoutCenteredBlock({
    zoneTop,
    zoneBottom,
    headingLines,
    headingLineH: 58,
    gapAfterHeading: 34,
    ruleH: 4,
    gapAfterRule: 40,
    bodyLines,
    bodyLineH: 44,
  });

  const svg = `<svg width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${PAGE_W}" height="${PAGE_H}" fill="${BG}"/>
    <text x="${MARGIN_X}" y="130" font-family="${FONT}" font-size="24" font-weight="bold" fill="${ACCENT}">0${index}</text>
    ${textBlock(headingLines, MARGIN_X, headingStartY, 58, 46, WHITE, "bold")}
    <rect x="${MARGIN_X}" y="${ruleY}" width="64" height="4" fill="${ACCENT}"/>
    ${textBlock(bodyLines, MARGIN_X, bodyStartY, 44, 30, TEXT)}
  </svg>`;
  return toJpeg(svg);
}

export async function renderClosingPage({ heading, body, siteName, siteUrl }) {
  const headingLines = wrapText(heading, 22);
  const bodyLines = wrapText(body, 52);

  const zoneTop = 160;
  const zoneBottom = PAGE_H - 260; // leave room for the contact block below
  const { headingStartY, bodyStartY } = layoutCenteredBlock({
    zoneTop,
    zoneBottom,
    headingLines,
    headingLineH: 52,
    gapAfterHeading: 28,
    ruleH: 0,
    gapAfterRule: 28,
    bodyLines,
    bodyLineH: 40,
  });

  const svg = `<svg width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${PAGE_W}" height="${PAGE_H}" fill="${BG}"/>
    ${textBlock(headingLines, MARGIN_X, headingStartY, 52, 42, ACCENT, "bold")}
    ${textBlock(bodyLines, MARGIN_X, bodyStartY, 40, 29, TEXT)}
    <rect x="${MARGIN_X}" y="${PAGE_H - 200}" width="${CONTENT_W}" height="2" fill="#2a2f35"/>
    <text x="${MARGIN_X}" y="${PAGE_H - 155}" font-family="${FONT}" font-size="27" font-weight="bold" fill="${WHITE}">${escapeXml(siteName)}</text>
    <text x="${MARGIN_X}" y="${PAGE_H - 115}" font-family="${FONT}" font-size="23" fill="${ACCENT}">${escapeXml(siteUrl)}</text>
  </svg>`;
  return toJpeg(svg);
}
