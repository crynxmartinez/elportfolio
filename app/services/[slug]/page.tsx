import Link from "next/link";
import { notFound } from "next/navigation";
import ContactCTA from "@/components/ContactCTA";
import { SERVICES, getService } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <div className="wide editorial">
        <p className="eyebrow">{service.eyebrow}</p>
        <h1>{service.heading}</h1>
        <p className="editorial-intro">{service.intro}</p>

        <section className="mt-20">
          <h2>This is probably you if…</h2>
          <ul className="mt-6 grid gap-3 text-neutral-400">
            {service.who.map((w) => (
              <li key={w} className="flex gap-3">
                <span aria-hidden="true" className="text-teal-300/70">
                  —
                </span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <h2>What the work includes</h2>
          <ul className="mt-6 grid gap-3 text-neutral-400 sm:grid-cols-2">
            {service.scope.map((s) => (
              <li key={s} className="flex gap-3">
                <span aria-hidden="true" className="text-teal-300/70">
                  —
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <h2>How it runs</h2>
          <ol className="process-list mt-6">
            {service.process.map((step, i) => (
              <li key={step.h}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{step.h}</h3>
                  <p>{step.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <h2 className="font-display text-2xl">Worth saying plainly</h2>
          <p className="mt-3 max-w-2xl text-neutral-400">{service.honesty}</p>
          <Link href="/contact" className="text-link mt-8 inline-block">
            Talk through your requirements ↗
          </Link>
        </section>

        <section className="mt-20 border-t border-white/10 pt-10">
          <h2 className="font-display text-xl">Related</h2>
          <div className="mt-5 flex flex-wrap gap-6">
            {service.related.map((r) => (
              <Link key={r.href} href={r.href} className="text-link">
                {r.label} ↗
              </Link>
            ))}
          </div>
        </section>
      </div>
      <ContactCTA />
    </>
  );
}
