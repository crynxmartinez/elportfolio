// Renders each LinkedIn carousel page as a single JPEG via an SVG template
// (rasterized by sharp). GHL's LinkedIn document-post mechanic wants a plain
// array of images plus linkedinPostDetails.postAsPdf: true - it assembles
// the PDF/carousel itself; it does NOT accept an already-built PDF at
// publish time (only for drafts saved in the composer UI).

import sharp from "sharp";

const PAGE_W = 1080;
const PAGE_H = 1350; // 4:5, LinkedIn document-post friendly
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

export async function renderCoverPage({ title, hook, imageBuffer, brandName }) {
  const coverH = Math.round(PAGE_H * 0.55);
  const resizedImage = await sharp(imageBuffer).resize(PAGE_W, coverH, { fit: "cover" }).jpeg().toBuffer();
  const imgB64 = resizedImage.toString("base64");
  const titleLines = wrapText(title, 18);
  const hookLines = wrapText(hook, 34);
  const titleStartY = coverH + 90;
  const hookStartY = titleStartY + titleLines.length * 62 + 40;

  const svg = `<svg width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${PAGE_W}" height="${PAGE_H}" fill="${BG}"/>
    <image href="data:image/jpeg;base64,${imgB64}" x="0" y="0" width="${PAGE_W}" height="${coverH}"/>
    <rect x="0" y="0" width="${PAGE_W}" height="${coverH}" fill="${BG}" opacity="0.3"/>
    <text x="70" y="${coverH + 40}" font-family="${FONT}" font-size="28" font-weight="bold" fill="${ACCENT}">${escapeXml(brandName.toUpperCase())}</text>
    ${textBlock(titleLines, 70, titleStartY, 62, 52, WHITE, "bold")}
    ${textBlock(hookLines, 70, hookStartY, 36, 28, TEXT)}
  </svg>`;
  return toJpeg(svg);
}

export async function renderBodyPage({ index, heading, body }) {
  const headingLines = wrapText(heading, 16);
  const bodyLines = wrapText(body, 32);
  const headingStartY = 200;
  const bodyStartY = headingStartY + headingLines.length * 54 + 60;

  const svg = `<svg width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${PAGE_W}" height="${PAGE_H}" fill="${BG}"/>
    <text x="70" y="130" font-family="${FONT}" font-size="22" font-weight="bold" fill="${ACCENT}">0${index}</text>
    ${textBlock(headingLines, 70, headingStartY, 54, 44, WHITE, "bold")}
    ${textBlock(bodyLines, 70, bodyStartY, 44, 30, TEXT)}
  </svg>`;
  return toJpeg(svg);
}

export async function renderClosingPage({ heading, body, siteName, siteUrl }) {
  const headingLines = wrapText(heading, 18);
  const bodyLines = wrapText(body, 34);
  const headingStartY = 460;
  const bodyStartY = headingStartY + headingLines.length * 48 + 50;

  const svg = `<svg width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${PAGE_W}" height="${PAGE_H}" fill="${BG}"/>
    ${textBlock(headingLines, 70, headingStartY, 48, 40, ACCENT, "bold")}
    ${textBlock(bodyLines, 70, bodyStartY, 38, 28, TEXT)}
    <text x="70" y="${PAGE_H - 160}" font-family="${FONT}" font-size="26" font-weight="bold" fill="${WHITE}">${escapeXml(siteName)}</text>
    <text x="70" y="${PAGE_H - 120}" font-family="${FONT}" font-size="22" fill="${ACCENT}">${escapeXml(siteUrl)}</text>
  </svg>`;
  return toJpeg(svg);
}
