import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import { SERVICES } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website Design, SEO & GHL Services — Raphael Martinez",
  description:
    "Three ways to work together: website design and development, SEO and competitor research, and GoHighLevel systems. Each scoped around the problem you actually have.",
  path: "/services",
});

export default function Services() {
  return (
    <>
      <div className="wide editorial">
        <p className="eyebrow">Services / Built around your next step</p>
        <h1>
          Good design.
          <br />
          <em>Connected thinking.</em>
        </h1>
        <p className="editorial-intro">
          Start with the problem you need solved. We can improve the website,
          the content, the follow-up process — or bring them together in one
          agreed project.
        </p>

        <div className="mt-16 grid gap-6">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-teal-300/30"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-teal-300/80">
                0{i + 1} /
              </span>
              <h2 className="font-display mt-3 text-2xl">{s.title}</h2>
              <p className="mt-3 max-w-2xl text-neutral-400">{s.intro}</p>
              <span className="text-link mt-6 inline-block">
                Explore the service ↗
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-16 text-sm text-neutral-400">
          Deliverables, timelines, costs, account ownership and ongoing support
          are agreed before work starts. Software subscriptions and content
          production depend on the scope.
        </p>
      </div>
      <ContactCTA />
    </>
  );
}
