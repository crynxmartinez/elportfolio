import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "Website Design, SEO & GHL Services — Raphael Martinez",
  description:
    "Website development, competitor-informed SEO and GHL implementation. A clear scope built around your business process.",
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
          the content, the follow-up process—or bring them together in one
          agreed project.
        </p>
        <div className="mt-16">
          {[
            {
              id: "websites",
              title: "Website design & development",
              intro:
                "A professional website that makes your services clear and your work easy to explore. Motion and 3D are used where they help, with performance and accessibility considered from the start.",
              items: [
                "Page structure and visual design",
                "Responsive development and project galleries",
                "Forms and agreed integrations",
                "Technical SEO foundations and handover",
              ],
            },
            {
              id: "seo",
              title: "SEO & competitor research",
              intro:
                "I use research, including my AIRS tool, to compare pages and identify content gaps worth investigating. Findings guide priorities; they are not proof that a competitor can be outranked or that an AI system will recommend your business.",
              items: [
                "Website and competitor content review",
                "Customer questions and service-page opportunities",
                "Prioritized recommendations and implementation scope",
                "Content and ongoing review by agreement",
              ],
            },
            {
              id: "ghl",
              title: "GHL systems & automation",
              intro:
                "Make the process clear before adding automation. I help connect your website with booking, pipelines and follow-up inside GoHighLevel, including custom development where the workflow needs it.",
              items: [
                "Enquiry forms and booking connections",
                "Pipeline structure and contact organization",
                "Agreed follow-up workflows",
                "Workflow testing, documentation and handover",
              ],
            },
          ].map((s) => (
            <section
              className="service-detail case-content"
              id={s.id}
              key={s.id}
            >
              <div>
                <p className="eyebrow">{s.id}</p>
                <h2>{s.title}</h2>
                <p>{s.intro}</p>
              </div>
              <div>
                <p className="eyebrow">Possible project scope</p>
                <ul>
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <Link href="/contact" className="text-link inline-block mt-8">
                  Talk through your requirements ↗
                </Link>
              </div>
            </section>
          ))}
        </div>
        <p className="text-sm text-neutral-400">
          Deliverables, timelines, costs, account ownership and ongoing support
          are agreed before work starts. Software subscriptions and content
          production depend on the scope.
        </p>
      </div>
      <ContactCTA />
    </>
  );
}
