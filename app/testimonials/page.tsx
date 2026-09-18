import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Working Together — Raphael Martinez",
  description:
    "How a project actually runs: who you work with, what you own, what is agreed before anything is built, and how progress is reviewed.",
  path: "/testimonials",
});

/* Real client quotes only. This stays empty until there are genuine,
   permissioned ones to publish - the section below simply doesn't render
   while it is. Do not populate with illustrative or composite quotes: an
   earlier version of this page did exactly that (invented quotes over stock
   photos), which is the specific thing that makes a trust page untrustworthy. */
type Testimonial = { quote: string; name: string; role: string; project: string };
const TESTIMONIALS: Testimonial[] = [];

const COMMITMENTS = [
  {
    n: "01",
    h: "You work with the person building it.",
    p: "There is no account manager relaying messages to a developer you never meet. The person who designs the site is the person who builds it and the person who answers your questions.",
  },
  {
    n: "02",
    h: "Scope is agreed in writing before work starts.",
    p: "Pages, content, integrations and what counts as finished are settled up front. If something falls outside that, it gets discussed and quoted rather than quietly absorbed or quietly dropped.",
  },
  {
    n: "03",
    h: "You own what you paid for.",
    p: "The domain, the hosting account and the content are yours. Nothing is held hostage on an account you cannot access, and moving away later does not require permission.",
  },
  {
    n: "04",
    h: "Claims stay honest.",
    p: "Rankings and lead volumes are not guaranteed, because nobody can guarantee them. What is committed to is the work itself: the build, the technical foundations, and a clear explanation of what was done and why.",
  },
];

export default function WorkingTogether() {
  return (
    <div className="editorial mx-auto max-w-5xl px-6">
      <p className="eyebrow">Working together / What to expect</p>
      <h1>
        Judge the work,
        <br />
        not the <em>promises.</em>
      </h1>
      <p className="mt-6 max-w-xl text-neutral-400">
        I am building this practice independently, and I would rather show you
        how a project actually runs than fill this page with quotes. Everything
        below is something you can hold me to.
      </p>

      <section className="mt-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {COMMITMENTS.map((c) => (
            <article key={c.n}>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-teal-300/80">
                {c.n} /
              </span>
              <h2 className="font-display mt-3 text-2xl">{c.h}</h2>
              <p className="mt-3 text-neutral-400">{c.p}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-white/10 pt-12">
        <h2 className="font-display text-2xl">See the work instead.</h2>
        <p className="mt-3 max-w-xl text-neutral-400">
          Rather than take my word for it, the projects are open to explore —
          including the ones built as design concepts, which are labelled as
          concepts rather than presented as client work.
        </p>
        <div className="mt-6 flex flex-wrap gap-6">
          <Link className="button button-dark" href="/portfolio">
            Explore the work ↗
          </Link>
          <Link className="text-link" href="/contact">
            Ask me anything about a project ↗
          </Link>
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="mt-20 border-t border-white/10 pt-12">
          <h2 className="font-display text-2xl">In their words.</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <blockquote className="text-neutral-200">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-neutral-400">
                  <span className="text-neutral-200">{t.name}</span> — {t.role}
                  <span className="block text-xs text-neutral-500">
                    {t.project}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
