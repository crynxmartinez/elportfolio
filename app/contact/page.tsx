import Script from "next/script";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact — Raphael Martinez",
  description: "Start a premium website or GHL system build.",
  path: "/contact",
});

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-40 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal-300/80">Contact</p>
      <h1 className="font-display mt-4 text-4xl sm:text-5xl">Tell me about the project.</h1>
      <p className="mt-6 max-w-lg text-neutral-400">
        Whether it&apos;s a premium website for a brand that deserves better, or a GHL system your
        agency needs built and wired up correctly — send the details and I&apos;ll reply with an
        honest read, including if it&apos;s not a fit.
      </p>

      <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/hWb5eZ40ZksIZgMjyWqB"
          style={{ width: "100%", height: "465px", border: "none" }}
          id="inline-hWb5eZ40ZksIZgMjyWqB"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Raphael Paul Martinez"
          data-height="465"
          data-layout-iframe-id="inline-hWb5eZ40ZksIZgMjyWqB"
          data-form-id="hWb5eZ40ZksIZgMjyWqB"
          data-cookie-consent="true"
          data-cookie-consent-provider="auto"
          title="Contact Raphael Martinez"
        />
      </div>
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />

      <div className="mt-16 border-t border-white/10 pt-8 text-sm text-neutral-400">
        <p>Or reach out directly:</p>
        <p className="mt-2">
          WhatsApp:{" "}
          <a
            href="https://wa.me/639152168012"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-200 hover:text-teal-300"
          >
            +63 915 216 8012
          </a>
        </p>
        <p>Based in the Philippines · working with clients worldwide</p>
      </div>
    </div>
  );
}
