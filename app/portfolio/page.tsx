import { PROJECTS } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import FAQ, { faqJsonLd, type FAQItem } from "@/components/FAQ";

export const metadata = pageMetadata({
  title: "Portfolio — Raphael Martinez",
  description: "Selected work: luxury concept sites, SaaS platforms, GHL builds, and tools.",
  path: "/portfolio",
});

const FAQS: FAQItem[] = [
  {
    q: "Are these real client projects, or concept work?",
    a: "Both, labeled honestly — each project's category line above its description says which. The concept builds (like MAREA and Taken Apart) exist to demonstrate a technique with no client constraints. The rest are live, functioning products built for real use.",
  },
  {
    q: "Do you actually build with GoHighLevel, or just plain code?",
    a: "Both, depending on what the project needs. Opervia and Verified Homeowner are GHL-connected builds — portals, fulfillment logic, and lead pipelines wired into GHL's API. The cinematic/concept pieces are hand-built in Next.js, since a page builder can't do frame-sequence scroll animation.",
  },
  {
    q: "How long does a premium, scroll-driven site take to build?",
    a: "Mostly depends on whether the source material — photography, video, or a frame sequence — already exists. If it does, most of the timeline goes into pacing and performance, not visual design. The blog has a full case study on what that actually looks like frame by frame.",
  },
  {
    q: "Do you only build for real estate and luxury brands?",
    a: "No — the common thread is quality of work meeting quality of website, not industry. This portfolio includes a veterinary clinic, a blood-donor directory, a trading card game, and a bilingual safety-management platform.",
  },
  {
    q: "Can you maintain or update a site after launch?",
    a: "Yes. Every build here is plain Next.js/React (or GHL where noted) rather than a page-builder template, so you or another developer can pick it up and extend it later without being locked in.",
  },
];

export default function Portfolio() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-40 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal-300/80">Portfolio</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl sm:text-5xl">The work, as it is.</h1>
      <p className="mt-6 max-w-xl text-neutral-400">
        A mix of concept builds exploring premium/cinematic design, and real client-shaped SaaS
        and tooling work. Labeled honestly — concept work is marked as such.
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <a
            key={p.slug}
            id={p.slug}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-teal-300/30 hover:bg-white/[0.04]"
          >
            <p className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">{p.tag}</p>
            <p className="font-display mt-2 text-2xl">{p.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">{p.description}</p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-wide text-teal-300 opacity-0 transition group-hover:opacity-100">
              View live &rarr;
            </p>
          </a>
        ))}
      </div>

      <div className="mt-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal-300/80">FAQ</p>
        <h2 className="font-display mt-4 text-3xl sm:text-4xl">Questions about the work.</h2>
        <FAQ items={FAQS} />
      </div>
    </div>
  );
}
