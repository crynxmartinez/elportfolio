import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "About Raphael Paul Martinez — Developer & Systems Builder",
  description:
    "Meet Raphael Martinez, a Philippines-based web developer and systems builder with roots in Tawi-Tawi.",
  path: "/about",
});
export default function About() {
  return (
    <>
      <div className="wide editorial">
        <div className="about-grid">
          <div>
            <p className="eyebrow">About / Raphael Paul Martinez</p>
            <h1>
              I like making
              <br />
              complicated things
              <br />
              <em>easier to use.</em>
            </h1>
            <p className="editorial-intro">
              I’m a web developer, researcher and systems builder based in the
              Philippines, with strong ties to Tawi-Tawi.
            </p>
          </div>
          <div className="initial-art" aria-hidden="true">
            r<span>m</span>
            <i>.</i>
          </div>
        </div>
        <div className="editorial-prose mt-16">
          <h2>The process comes first.</h2>
          <p>
            My work often begins with a manual task: matching property records,
            organizing school grades, tracking medicine, or following up on an
            enquiry. I work through the steps, then build a system that makes
            them easier to manage.
          </p>
          <p>
            That experience shapes how I approach a website. The design matters,
            but so does what happens when someone fills in a form, requests an
            appointment, or needs to find an answer.
          </p>
          <h2>Experience across different problems.</h2>
          <p>
            I have worked on a Rural Health Unit portal for Tawi-Tawi, school
            records software, classroom quiz tools, real estate research
            workflows, and web applications. Where connectivity is unreliable, I
            think about how people can continue working offline and synchronize
            later.
          </p>
          <p>
            My toolkit includes Next.js, React, Flutter, Node.js and
            GoHighLevel. I also work with SEO, data enrichment and automation. I
            choose the tools around the task rather than starting with a fixed
            stack.
          </p>
          <h2>What working together looks like.</h2>
          <p>
            You work directly with me. We define the problem, agree on the
            scope, and review the work as it takes shape. I prefer honest
            feedback, practical decisions and a finished product that people can
            use.
          </p>
          <Link href="/portfolio" className="text-link inline-block mt-8">
            Explore my work ↗
          </Link>
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
