import Image from "next/image";
import Link from "next/link";
import DepthPreview from "@/components/DepthPreview";
import ProjectCard from "@/components/ProjectCard";
import ContactCTA from "@/components/ContactCTA";
import FAQ, { faqJsonLd } from "@/components/FAQ";
import { PROJECTS } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "Raphael Martinez — Website Design, SEO & GHL Systems",
  description:
    "Professional websites, thoughtful interactions and connected GHL systems. Explore Raphael Martinez’s work and discuss your next website.",
  path: "/",
});
const faqs = [
  {
    q: "Can you improve my existing website?",
    a: "Yes. We can review what is useful, what is getting in the way, and whether focused improvements or a rebuild make more sense. The scope follows the problem.",
  },
  {
    q: "Does my website need 3D?",
    a: "Only when it helps explain your work or product. A clear, fast website is the foundation. Motion is optional, with a simpler experience for smaller screens and reduced-motion preferences.",
  },
  {
    q: "What can you connect with GoHighLevel?",
    a: "Depending on your setup, the project can include enquiry forms, appointment booking, pipelines and follow-up workflows. We agree on the connections and test the agreed flows before handover.",
  },
  {
    q: "Is SEO included in a website project?",
    a: "Technical foundations can be included in the build. Competitor research, service content and ongoing SEO are separately scoped so you know what will be delivered. Rankings and enquiries cannot be guaranteed.",
  },
  {
    q: "How much will my project cost?",
    a: "That depends on the pages, content and integrations you need. Send your current website and your priorities. I’ll recommend a scope and quote before work begins.",
  },
];
export default function Home() {
  return (
    <div className="redesign-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <section className="hero-light">
        <div className="wide hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> Independent design & development
            </p>
            <h1>
              Give customers a clear reason to <em>choose you.</em>
            </h1>
            <p className="hero-sub">
              I build websites for service businesses — then connect the
              enquiry, booking and follow-up behind them, so the site becomes
              part of how the business runs instead of just how it looks.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/contact">
                Discuss my website ↗
              </Link>
              <Link className="text-link" href="#selected-work">
                See selected projects ↓
              </Link>
            </div>
            <p className="hero-footnote">
              Website design <span>·</span> SEO <span>·</span> GHL systems
            </p>
          </div>
          <div className="hero-art">
            <div className="art-orbit" aria-hidden="true" />
            <DepthPreview>
              <Link
                href="/portfolio/marea"
                className="hero-browser"
                aria-label="Explore the MAREA resort concept"
              >
                <div className="browser-toolbar">
                  <span>● ● ●</span>
                  <span>marea / a coastal escape</span>
                  <span>↗</span>
                </div>
                <Image
                  src="/projects/marea.webp"
                  width={1440}
                  height={960}
                  alt="MAREA coastal resort website concept"
                  preload
                  sizes="(max-width: 900px) 90vw, 48vw"
                />
              </Link>
              <div className="floating-note">
                <span className="note-symbol" aria-hidden="true">
                  ✳
                </span>
                <div>
                  Designed to be explored.<small>MAREA · Resort concept</small>
                </div>
              </div>
            </DepthPreview>
            <div className="art-caption">
              <span>01 / SELECTED EXPLORATION</span>
              <Link href="/portfolio/marea">View project ↗</Link>
            </div>
          </div>
        </div>
        <div className="wide capability-line">
          <span>Good design is just the beginning.</span>
          <span>Clear content</span>
          <span>Thoughtful interactions</span>
          <span>Connected follow-up</span>
        </div>
      </section>
      <section id="selected-work" className="work-section">
        <div className="wide">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Selected work</p>
              <h2>
                Different challenges.
                <br />
                The same <em>attention to detail.</em>
              </h2>
            </div>
            <Link href="/portfolio" className="text-link">
              Explore all projects ↗
            </Link>
          </div>
          <div className="project-grid">
            {["marea", "kingvet", "opervia"].map((slug, i) => (
              <ProjectCard
                key={slug}
                project={PROJECTS.find((p) => p.slug === slug)!}
                index={i}
              />
            ))}
          </div>
          <p className="work-note">
            Concept projects demonstrate design and interaction. They are
            labelled separately from tools and platforms.
          </p>
        </div>
      </section>
      <section className="section light-section">
        <div className="wide">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / More than the surface</p>
              <h2>
                A website is part of
                <br />a bigger <em>conversation.</em>
              </h2>
            </div>
            <p>
              Your customer needs to understand what you offer, feel confident
              enough to enquire, and hear back. I help connect those steps.
            </p>
          </div>
          <div className="service-grid">
            {[
              [
                "01",
                "Make your work clear.",
                "Website design & development",
                "Unclear services. Buried projects. A difficult mobile experience. Let’s turn those obstacles into a website people can comfortably explore.",
                "/services/website-design",
              ],
              [
                "02",
                "Help people find answers.",
                "SEO & competitor research",
                "Use research to understand the questions customers ask, find content gaps, and decide which pages deserve attention first.",
                "/services/seo-competitor-research",
              ],
              [
                "03",
                "Keep the conversation going.",
                "GHL systems & automation",
                "Connect enquiries, booking and follow-up so the website fits the way you work. Every workflow starts with a clear process.",
                "/services/gohighlevel-development",
              ],
            ].map(([n, h, label, body, url]) => (
              <article className="service-item" key={n}>
                <span className="service-index">{n} /</span>
                <p className="eyebrow">{label}</p>
                <h3>{h}</h3>
                <p>{body}</p>
                <Link href={url} className="text-link">
                  Explore the service ↗
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section process-section">
        <div className="wide process-grid">
          <div>
            <p className="eyebrow">03 / A considered process</p>
            <h2>
              Clarity at
              <br />
              <em>every step.</em>
            </h2>
            <p>
              You work directly with the person designing and building your
              website.
            </p>
          </div>
          <ol className="process-list">
            {[
              [
                "Understand",
                "We look at your business, current website and the next step you want customers to take.",
              ],
              [
                "Define",
                "We agree on pages, content, integrations, ownership and what a finished project includes.",
              ],
              [
                "Design & build",
                "You review the direction. I build the responsive website and connect the agreed workflows.",
              ],
              [
                "Test & hand over",
                "We check devices, links and enquiry flows, then walk through how to manage your site.",
              ],
            ].map(([h, p], i) => (
              <li key={h}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section about-strip">
        <div className="wide about-grid">
          <div className="initial-art" aria-hidden="true">
            r<span>m</span>
            <i>.</i>
          </div>
          <div>
            <p className="eyebrow">04 / The person behind the work</p>
            <h2>
              A designer’s eye.
              <br />A builder’s <em>mindset.</em>
            </h2>
            <p>
              I’m Raphael Paul Martinez, a developer and systems builder based
              in the Philippines, with roots in Tawi-Tawi. I’ve built records
              systems for rural health units, a grading system for a public
              school, research tools for real estate, and websites for service
              businesses.
            </p>
            <p>
              Different industries, same job every time: find the structure
              hiding inside a messy manual process, then build something that
              solves it. A website is one form that takes.
            </p>
            <Link href="/about" className="text-link">
              A little more about me ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="section faq-section">
        <div className="wide faq-grid">
          <div>
            <p className="eyebrow">05 / Before we begin</p>
            <h2>
              A few things
              <br />
              you might <em>ask.</em>
            </h2>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>
      <ContactCTA />
    </div>
  );
}
