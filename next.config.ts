import type { NextConfig } from "next";

// The auto-blog writer used to truncate slugs at exactly 60 characters, which
// cut them mid-word. Those URLs are already indexed, so each one gets a 308 to
// its cleaned-up replacement rather than being left to 404.
const BLOG_SLUG_REDIRECTS: Array<[string, string]> = [
  [
    "a-beautiful-website-isn-t-a-marketing-plan-how-local-seo-act",
    "beautiful-website-local-seo",
  ],
  [
    "seo-isn-t-dead-but-rank-1-stopped-being-the-win-what-actuall",
    "seo-beyond-rank-one",
  ],
  [
    "the-accessibility-problem-nobody-budgets-for-until-a-letter-",
    "website-accessibility-compliance",
  ],
  [
    "the-click-you-re-not-getting-anymore-how-businesses-actually",
    "earning-a-place-in-ai-search",
  ],
  [
    "the-conversion-gap-why-your-website-can-rank-get-traffic-and",
    "conversion-gap-traffic-without-clients",
  ],
  [
    "the-handoff-nobody-designs-for-where-websites-and-seo-actual",
    "website-design-and-seo-handoff",
  ],
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
  async redirects() {
    return BLOG_SLUG_REDIRECTS.map(([from, to]) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
