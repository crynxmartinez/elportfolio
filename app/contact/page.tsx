import Script from "next/script";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact — Raphael Martinez",
  description: "Start a premium website or GHL system build.",
  path: "/contact",
});

export default function Contact() {
  return (
    <div className="editorial mx-auto max-w-3xl px-6">
      <p className="eyebrow">Contact / A conversation first</p>
      <h1>
        What would you
        <br />
        like to <em>improve?</em>
      </h1>
      <p className="mt-6 max-w-lg text-neutral-400">
        Share your current website, what is getting in the way, and what you
        want to build next. I’ll help you work out the next step and a clear
        project scope.
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
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
      <p className="mt-5 text-xs text-neutral-400">
        Your details are used to respond to your enquiry.{" "}
        <a href="/privacy" className="underline underline-offset-4">
          Privacy information
        </a>
        .
      </p>

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
