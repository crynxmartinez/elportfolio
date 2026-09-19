import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/data";
import { CASE_STUDIES } from "@/lib/case-studies";
import { pageMetadata } from "@/lib/seo";
import ContactCTA from "@/components/ContactCTA";
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PROJECTS.find((p) => p.slug === slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} — Project Study | Raphael Martinez`,
    description: p.description,
    path: `/portfolio/${slug}`,
  });
}
export default async function Study({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PROJECTS.find((p) => p.slug === slug);
  if (!p) notFound();
  const study = CASE_STUDIES[slug];
  return (
    <>
      <div className="wide editorial">
        <Link href="/portfolio" className="text-link">
          ← All work
        </Link>
        <p className="eyebrow mt-12">{p.tag}</p>
        <h1>
          {p.name}
          <em> / Project study</em>
        </h1>
        <p className="editorial-intro">{p.description}</p>
        <Image
          className="case-image"
          src={`/projects/${p.slug}.webp`}
          width={1440}
          height={960}
          alt={`${p.name} website screenshot`}
          sizes="(max-width: 800px) 95vw, 1200px"
        />
        <div className="case-content">
          <div>
            <p className="eyebrow">The brief</p>
            <h2>
              {study ? "What the project explores." : "The project direction."}
            </h2>
            <p>{study?.challenge || p.description}</p>
          </div>
          <div>
            <p className="eyebrow">The approach</p>
            <h2>From idea to interface.</h2>
            <p>
              {study?.approach ||
                "This portfolio entry presents the interface and product direction. Explore the external preview to see the project in context. This page does not claim independently verified business outcomes."}
            </p>
          </div>
        </div>
        {study && (
          <div className="capability-line">
            {study.details.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        )}

        {study?.constraints && (
          <section className="mt-16">
            <p className="eyebrow">Constraints</p>
            <h2>What made it harder.</h2>
            <ul className="mt-6 grid gap-3 text-neutral-400">
              {study.constraints.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden="true" className="text-teal-300/70">
                    —
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {study?.decisions && (
          <section className="mt-16">
            <p className="eyebrow">Decisions</p>
            <h2>Choices worth explaining.</h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {study.decisions.map((d) => (
                <article key={d.h}>
                  <h3 className="font-display text-xl">{d.h}</h3>
                  <p className="mt-2 text-neutral-400">{d.p}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {(study?.stack || study?.performance) && (
          <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <p className="eyebrow">Build &amp; performance</p>
            {study.stack && (
              <p className="mt-3 text-neutral-300">{study.stack.join(" · ")}</p>
            )}
            {study.performance && (
              <p className="mt-3 text-sm text-neutral-400">
                {study.performance}
              </p>
            )}
          </section>
        )}

        {(study?.role || study?.duration) && (
          <section className="mt-16">
            <p className="eyebrow">Scope</p>
            <div className="mt-4 grid gap-4 text-neutral-400 sm:grid-cols-2">
              {study.role && (
                <p>
                  <span className="text-neutral-200">Role:</span> {study.role}
                </p>
              )}
              {study.duration && (
                <p>
                  <span className="text-neutral-200">Duration:</span>{" "}
                  {study.duration}
                </p>
              )}
            </div>
          </section>
        )}

        {(study?.whatWorked || study?.whatIdChange || study?.results) && (
          <section className="mt-16">
            <p className="eyebrow">Looking back</p>
            <div className="mt-6 grid gap-8">
              {study.whatWorked && (
                <div>
                  <h3 className="font-display text-xl">What worked</h3>
                  <p className="mt-2 text-neutral-400">{study.whatWorked}</p>
                </div>
              )}
              {study.whatIdChange && (
                <div>
                  <h3 className="font-display text-xl">
                    What I would change
                  </h3>
                  <p className="mt-2 text-neutral-400">{study.whatIdChange}</p>
                </div>
              )}
              {study.results && (
                <div>
                  <h3 className="font-display text-xl">Results</h3>
                  <p className="mt-2 text-neutral-400">{study.results}</p>
                </div>
              )}
            </div>
          </section>
        )}
        <p className="text-sm text-neutral-400 my-8">
          {p.tag.toLowerCase().includes("prior agency")
            ? "Delivered for an agency's clients as part of a team. Client identities and data are withheld under NDA, and no specific results are claimed here."
            : p.tag.toLowerCase().includes("concept")
              ? "Independent design concept, not a commissioned client case study. Screenshot captured September 2026."
              : "Portfolio project overview. No revenue, ranking or conversion results are claimed. Screenshot captured September 2026."}
        </p>
        {p.url ? (
          <a
            className="button button-dark"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the live preview ↗
          </a>
        ) : (
          <Link className="button button-dark" href="/contact">
            Ask me about this work ↗
          </Link>
        )}
        {slug === "marea" && (
          <Link
            href="/blog/premium-website"
            className="text-link ml-6 inline-block mt-4"
          >
            Read the design article →
          </Link>
        )}
      </div>
      <ContactCTA />
    </>
  );
}
