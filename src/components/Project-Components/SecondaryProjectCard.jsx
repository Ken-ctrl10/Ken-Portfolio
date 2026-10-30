import Chip from "@mui/material/Chip";
import { secondaryProjects } from "../../data/project-data";

function SecondaryProjectCard() {
  return <div className="secondary-projects-grid" aria-label="More projects">
        {secondaryProjects.map((project) => (
          <article className="secondary-project-card" key={project.id}>
            <div className="secondary-project-media">
              <img
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                width="900"
                height="405"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="secondary-project-content">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>

              <div className="project-tech-tags">
                {project.tech.map((techItem) => (
                  <Chip key={techItem} label={techItem} size="small" />
                ))}
              </div>

              <div className="project-actions">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-primary"
                  >
                    {project.demoLabel ?? "Live Demo"}
                  </a>
                ) : (
                  <button type="button" className="project-btn project-btn-disabled" disabled>
                    Demo Soon
                  </button>
                )}

                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-secondary"
                  >
                    Repository
                  </a>
                ) : (
                  <button type="button" className="project-btn project-btn-disabled" disabled>
                    Repo Soon
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
};

export default SecondaryProjectCard;