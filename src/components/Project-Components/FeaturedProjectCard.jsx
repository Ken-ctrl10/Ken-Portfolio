import Chip from "@mui/material/Chip";
import { featuredProject } from "../../data/project-data";

function FeaturedProjectCard(){
  return (
    featuredProject && (
      <article className="featured-project-card" aria-labelledby="featured-project-title">
        <div className="featured-project-media">
          <img
            src={featuredProject.image}
            alt={`Screenshot of ${featuredProject.title}`}
            width="900"
            height="409"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="featured-project-content">
          <p className="project-badge">Featured</p>
          <h3 id="featured-project-title">{featuredProject.title}</h3>
          <p>{featuredProject.summary}</p>

          <div className="project-tech-tags">
            {featuredProject.tech.map((techItem) => (
              <Chip key={techItem} label={techItem} size="small" />
            ))}
          </div>

          <div className="project-actions">
            {featuredProject.demoUrl ? (
              <a
                href={featuredProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn-primary"
              >
                {featuredProject.demoLabel ?? "Live Demo"}
              </a>
            ) : (
              <button type="button" className="project-btn project-btn-disabled" disabled>
                Demo Soon
              </button>
            )}

            {featuredProject.repoUrl && (
              <a
                href={featuredProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn-secondary"
              >
                View Repository
              </a>
            )}
          </div>
        </div>
      </article>
)
  );
}

export default FeaturedProjectCard;