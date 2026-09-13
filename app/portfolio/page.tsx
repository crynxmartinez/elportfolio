import { PROJECTS } from "@/lib/data";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import ProjectCard from "@/components/ProjectCard";
import ContactCTA from "@/components/ContactCTA";
import FAQ from "@/components/FAQ";
export const metadata = pageMetadata({
  title: "Selected Work — Raphael Martinez",
  description:
    "Explore website concepts, platforms and tools by Raphael Martinez. Visual project studies across hospitality, local services, SaaS and games.",
  path: "/portfolio",
});
export default function Portfolio() {
  return (
    <>
      <div className="editorial wide">
        <p className="eyebrow">Selected work / Design & development</p>
        <h1>
          Ideas made <em>tangible.</em>
        </h1>
        <p className="editorial-intro">
          Websites to explore. Systems to use. A selection of my design
          concepts, tools and platform projects, with a closer look at the
          thinking behind each.
        </p>
        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <div className="mt-24">
          <h2>About the work.</h2>
          <FAQ
            items={[
              {
                q: "Are these client projects or concepts?",
                a: "This is a mixed portfolio. MAREA, Taken Apart and KingVet are design concepts. Other entries showcase platform and tool projects. A live preview alone does not establish client results; each study explains its scope.",
              },
              {
                q: "Can I explore the websites?",
                a: "Yes. Each project study links to the external preview. Some projects are experiments or works in progress, so their availability and functionality can change.",
              },
              {
                q: "Do you build with GoHighLevel?",
                a: "Yes. I work with GHL alongside custom development for forms, booking and follow-up workflows. Integrations are scoped around the process you need.",
              },
              {
                q: "Can you build something simpler?",
                a: "Absolutely. The right amount of design and motion depends on your audience, content and goals. A straightforward website can be the best choice.",
              },
              {
                q: "Do these studies include measured business results?",
                a: "These studies focus on design and implementation. I do not claim conversion, revenue or ranking improvements without supporting evidence.",
              },
            ]}
          />
          <p className="mt-10 text-sm text-neutral-400">
            Want to explore the original scroll journey?{" "}
            <Link
              href="/experiments/cinematic"
              prefetch={false}
              className="text-teal-200 underline"
            >
              Open the cinematic experiment
            </Link>
            . This optional study loads a large image sequence and is best
            explored on a desktop connection.
          </p>
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
