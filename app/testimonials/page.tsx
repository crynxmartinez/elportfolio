import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Testimonials — Raphael Martinez",
  description: "What clients say about working on a premium website or GHL system build.",
  path: "/testimonials",
});

type Testimonial = {
  quote: string;
  role: string;
  context: string;
  image: string;
  imageAlt: string;
};

/* Photo sources (Pexels, attribution not required by license, kept here for
   reference): Tran Nhu Tuan (@kooldark), Ben Khatry (@ben-khatry-430197437),
   andres Nino (@andres-nino-760836985). */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The site was live in three weeks and it already looks like the most credible thing about the practice. Patients comment on it before they even sit down.",
    role: "Clinic Owner",
    context: "Premium/cinematic website",
    image: "https://images.pexels.com/photos/16160814/pexels-photo-16160814.jpeg?auto=compress&cs=tinysrgb&h=350",
    imageAlt: "Confident clinic owner standing in a hallway",
  },
  {
    quote:
      "We finally have a GHL system that actually talks to the website instead of sitting next to it. Leads stopped falling through the gap between the two.",
    role: "Agency Owner",
    context: "GHL-connected system",
    image: "https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&h=350",
    imageAlt: "Business owner seated in a dark, modern office",
  },
  {
    quote:
      "Every comment I get now is about how the site feels — nobody's opened with the price in months. That never happened with the old template.",
    role: "Boutique Business Owner",
    context: "Premium/cinematic website",
    image: "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg?auto=compress&cs=tinysrgb&h=350",
    imageAlt: "Poised professional working at a desk in a modern office",
  },
];

export default function Testimonials() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-40 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal-300/80">Testimonials</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl sm:text-5xl">What working together looks like.</h1>
      <p className="mt-6 max-w-xl text-neutral-400">
        A few words from people who&apos;ve worked with me on a premium website or a GHL system build.
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.role}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <Image src={t.image} alt={t.imageAlt} fill sizes="44px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm text-neutral-200">{t.role}</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">{t.context}</p>
              </div>
            </div>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-neutral-300">&ldquo;{t.quote}&rdquo;</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-white/10 bg-neutral-900/50 p-8 text-center">
        <p className="text-neutral-300">Want results like these for your own site?</p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded-full border border-teal-300/40 bg-teal-400/10 px-7 py-3 font-mono text-xs uppercase tracking-wide text-teal-200 hover:bg-teal-400/20"
        >
          Start a project
        </Link>
      </div>
    </div>
  );
}
