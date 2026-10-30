import SectionHeader from "./common/SectionHeader";
import Reveal from "./common/Reveal";
import ProfileSection from "./About-Components/ProfileSection";
import FocusSection from "./About-Components/FocusSection";
import TimelineSection from "./About-Components/TimelineSection";
import CertificatesSection from "./About-Components/CertificatesSection";

import "../assets/css/about-page.css";

/**
 * Four blocks, each answering a different question: who I am (Profile),
 * what I can do (Focus), how I got here (Timeline), and the evidence
 * (Certificates). Previously six same-weight cards, which read as a wall.
 */
function AboutPage() {
  return (
    <section className="about about-section" id="aboutme" aria-labelledby="about-title">
      <SectionHeader
        containerClassName="about-hero"
        kickerClassName="about-kicker"
        subtitleClassName="about-subtitle"
        kicker="About Me"
        title="I'm learning to build software that actually works"
        titleId="about-title"
        subtitle="Working with React, Node.js, Express, and PostgreSQL to turn ideas into simple, usable applications while improving every step of the way."
      />

      <Reveal>
        <ProfileSection />
      </Reveal>
      <Reveal>
        <FocusSection />
      </Reveal>
      <Reveal>
        <TimelineSection />
      </Reveal>
      <Reveal>
        <CertificatesSection />
      </Reveal>
    </section>
  );
}

export default AboutPage;
