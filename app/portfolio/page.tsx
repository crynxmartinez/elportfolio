import type { Metadata } from "next";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio — Raphael Martinez",
  description: "Selected work: luxury concept sites, SaaS platforms, GHL builds, and tools.",
};

export default function Portfolio() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-40 pb-24">
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
    </div>
  );
}
