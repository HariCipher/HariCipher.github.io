/**
 * Paper Instrument visual system: projects behave as tactile archival objects, not dashboard tiles.
 * Component remains reusable for real content and later shelf/Three.js integrations.
 */
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  tilt: string;
};

export function ProjectCard({ project, tilt }: ProjectCardProps) {
  return (
    <a
      className={`project-card project-card-${project.shade}`}
      href={project.href}
      style={{ "--tilt": tilt } as React.CSSProperties}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open the ${project.title} GitHub project`}
    >
      <div className="project-card-topline">
        <span>{project.index}</span>
        <ArrowUpRight size={18} strokeWidth={1.65} />
      </div>
      <div className="project-card-copy">
        <p className="project-card-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-card-description">{project.description}</p>
      </div>
      <div className="project-tag-row">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <span className="project-card-mark" aria-hidden="true" />
    </a>
  );
}

/**
 * The shelf's closing card. Not a project — an exit to the full GitHub record,
 * so the collection reads as a selection rather than as everything that exists.
 */
export function ExploreMoreCard() {
  return (
    <a
      className="project-card project-card-more"
      href="https://github.com/HariCipher"
      style={{ "--tilt": "0deg" } as React.CSSProperties}
      target="_blank"
      rel="noreferrer"
      aria-label="Open the full project record on GitHub"
    >
      <div className="project-card-topline">
        <span>/ MORE</span>
        <ArrowUpRight size={18} strokeWidth={1.65} />
      </div>
      <div className="project-card-copy">
        <p className="project-card-category">GITHUB / HARICIPHER</p>
        <h3>Explore more work</h3>
        <p className="project-card-description">
          Further detection tooling, lab notes, and work in progress live on the full record.
        </p>
      </div>
      <div className="project-tag-row">
        <span>ALL REPOS</span>
      </div>
      <span className="project-card-mark" aria-hidden="true" />
    </a>
  );
}
