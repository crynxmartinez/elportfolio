export type FAQItem = { q: string; a: string };

/**
 * Native <details>/<summary> accordion - no client JS, fully crawlable.
 * Pass the same items to faqJsonLd() for the matching FAQPage schema.
 */
export default function FAQ({ items, title = "Frequently asked questions" }: { items: FAQItem[]; title?: string }) {
  return (
    <div className="mt-8 divide-y divide-white/10 border-t border-white/10">
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-neutral-100 marker:content-none">
            {item.q}
            <span className="shrink-0 font-mono text-neutral-500 transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
