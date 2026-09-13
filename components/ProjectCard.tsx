import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/lib/data";
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className="project-card" id={project.slug}>
      <Link
        href={`/portfolio/${project.slug}`}
        className="project-image"
        aria-label={`Explore ${project.name}`}
      >
        <Image
          src={`/projects/${project.slug}.webp`}
          alt={`${project.name} website preview`}
          width={1440}
          height={960}
          sizes="(max-width: 760px) 100vw, 50vw"
        />
        <span className="project-open" aria-hidden="true">
          ↗
        </span>
      </Link>
      <div className="project-caption">
        <div>
          <p className="eyebrow">{project.tag}</p>
          <h3>
            <Link href={`/portfolio/${project.slug}`}>{project.name}</Link>
          </h3>
        </div>
        <span className="project-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="project-description">{project.description}</p>
    </article>
  );
}
