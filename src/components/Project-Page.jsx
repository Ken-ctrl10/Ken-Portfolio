import FeaturedProjectCard from "./Project-Components/FeaturedProjectCard";
import SecondaryProjectCard from "./Project-Components/SecondaryProjectCard";
import SectionHeader from "./common/SectionHeader";
import Reveal from "./common/Reveal";
import "../assets/css/project-page.css";

function ProjectPage() {

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <SectionHeader
        containerClassName="projects-header"
        kickerClassName="projects-kicker"
        subtitleClassName="projects-subtitle"
        kicker="Portfolio Work"
        title="Featured Projects"
        titleId="projects-title"
        subtitle="A mix of academic, internship, and upskilling projects focused on practical software development."
      />

      <Reveal><FeaturedProjectCard /></Reveal>
      <Reveal delay={80}><SecondaryProjectCard /></Reveal>
    </section>
  );
}

export default ProjectPage;