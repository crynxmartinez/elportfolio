import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "Privacy — Raphael Martinez",
  description:
    "Information about enquiries and third-party services on this portfolio.",
  path: "/privacy",
});
export default function Privacy() {
  return (
    <div className="wide editorial">
      <div className="editorial-prose">
        <p className="eyebrow">Website information</p>
        <h1>Privacy & enquiries.</h1>
        <p>
          When you submit an enquiry, the information you provide is used to
          respond and discuss your project. Please do not include passwords,
          medical records, financial account details or other sensitive
          information.
        </p>
        <h2>Contact form</h2>
        <p>
          The contact page embeds a GoHighLevel / LeadConnector form.
          Information you enter is handled through that service. The embedded
          service may use cookies or similar technology under its own policies
          and settings.
        </p>
        <h2>External services and links</h2>
        <p>
          Project previews, WhatsApp links and article sources take you to
          external websites with their own privacy practices. This portfolio is
          hosted on Vercel. Embedded services and hosting providers may process
          technical information such as IP addresses and request logs.
        </p>
        <h2>Your enquiry information</h2>
        <p>
          To ask about, correct or request deletion of information you
          submitted, contact Raphael through{" "}
          <a href="https://wa.me/639152168012" className="text-teal-200">
            WhatsApp
          </a>
          . Records may need to be retained where required for an ongoing
          project or applicable obligations.
        </p>
        <p className="text-sm">Last updated: 14 September 2026.</p>
      </div>
    </div>
  );
}
