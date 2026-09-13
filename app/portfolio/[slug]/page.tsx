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
        <p className="text-sm text-neutral-400 my-8">
          {p.tag.toLowerCase().includes("concept")
            ? "Independent design concept, not a commissioned client case study."
            : "Portfolio project overview. No revenue, ranking or conversion results are claimed."}{" "}
          Screenshot captured September 2026.
        </p>
        <a
          className="button button-dark"
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore the live preview ↗
        </a>
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
