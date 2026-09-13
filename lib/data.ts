export type Project = {
  slug: string;
  name: string;
  tag: string;
  description: string;
  url: string;
  accent: string; // tailwind gradient classes
  featured?: boolean;
  note?: string; // honesty flag shown only in code comments / not public-facing spin
};

export const PROJECTS: Project[] = [
  {
    slug: "marea",
    name: "MAREA",
    tag: "Hospitality / Design concept",
    description:
      "A coastal resort concept exploring cinematic imagery, editorial typography and a visitor-controlled scroll journey.",
    url: "https://marea-kohl.vercel.app",
    accent: "from-amber-500/20 via-neutral-900 to-neutral-950",
    featured: true,
  },
  {
    slug: "funnel-3d",
    name: "Taken Apart",
    tag: "Product Storytelling / Concept",
    description:
      "An Apple-style scroll-driven product page for a flagship camera — hero, then an exploded-parts reveal as the visitor scrolls through the story of the machine.",
    url: "https://funnel3dpractice.vercel.app",
    accent: "from-neutral-400/10 via-neutral-900 to-neutral-950",
    featured: true,
  },
  {
    slug: "opervia",
    name: "Opervia",
    tag: "B2B SaaS / GHL Development",
    description:
      "An agency website presenting technical implementation, client portals and GoHighLevel services in a structured, business-focused layout.",
    url: "https://opervia-three.vercel.app",
    accent: "from-blue-500/15 via-neutral-900 to-neutral-950",
    featured: true,
  },
  {
    slug: "verifiedhomeowner",
    name: "Verified Homeowner",
    tag: "SaaS / Real Estate Lead Platform",
    description:
      "A real estate lead-platform project presenting subscription options and a focused path from service information to enquiry.",
    url: "https://www.verifiedhomeowner.com",
    accent: "from-orange-500/15 via-neutral-900 to-neutral-950",
  },
  {
    slug: "tasheel",
    name: "Tasheel",
    tag: "B2B SaaS / Bilingual Platform",
    description:
      "A safety-management platform for contractors — work orders, certificate tracking, equipment logs, and billing — fully bilingual with a clean Arabic/English toggle across the entire site.",
    url: "https://www.tasheel.live",
    accent: "from-emerald-500/15 via-neutral-900 to-neutral-950",
  },
  {
    slug: "codex-legends",
    name: "Codex Legends",
    tag: "Game / Interactive Build",
    description:
      "An original trading card game rooted in Philippine history and regions, with a genuinely playable in-browser prototype — deck selection, real card art, and working game mechanics, open for playtester feedback.",
    url: "https://codexlegendtcgsite.vercel.app",
    accent: "from-yellow-600/15 via-neutral-900 to-neutral-950",
    featured: true,
  },
  {
    slug: "myblooddonorph",
    name: "MyBloodDonorPH",
    tag: "Directory / Community Tool",
    description:
      "A Philippine blood-donor directory project organized around blood type and location, with a clear search-focused interface.",
    url: "https://myblooddonorph.vercel.app",
    accent: "from-red-600/15 via-neutral-900 to-neutral-950",
  },
  {
    slug: "kingvet",
    name: "KingVet",
    tag: "Local Service / Concept",
    description:
      "A marketing concept for a 24-hour veterinary clinic — service grid, trust indicators, and an appointment request flow, built to show what a warm, approachable local-service site can look like.",
    url: "https://kingvet.vercel.app",
    accent: "from-lime-500/10 via-neutral-900 to-neutral-950",
  },
  {
    slug: "rei-data-tools",
    name: "REI Data Tools",
    tag: "Internal Tooling / Dashboard",
    description:
      "A real estate data-tool interface for organizing property research and extraction tasks into a more structured workflow.",
    url: "https://reidatatools.vercel.app/data-extractor",
    accent: "from-cyan-500/10 via-neutral-900 to-neutral-950",
  },
];
