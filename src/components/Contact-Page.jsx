import { useState } from "react";

import ContactCard from "./Contact-Components/ContactCard";
import EmailCard from "./Contact-Components/EmailCard";
import ContactForm from "./Contact-Components/ContactForm";
import ViberCard from "./Contact-Components/ViberCard";
import ViberModal from "./Contact-Components/ViberModal";
import SectionHeader from "./common/SectionHeader";
import Reveal from "./common/Reveal";
// Icons
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

import "../assets/css/contact-page.css";
import contactItems from "../data/contact-data";

const iconMap = {
  LinkedInIcon,
  GitHubIcon,
  BusinessCenterOutlinedIcon,
};

function ContactPage() {
  const [isViberOpen, setIsViberOpen] = useState(false);

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <SectionHeader
        containerClassName="contact-header"
        kickerClassName="contact-kicker"
        subtitleClassName="contact-subtitle"
        kicker="Let's Connect"
        title="Contact Me"
        titleId="contact-title"
        subtitle="Open to entry-level full-stack and software engineering opportunities."
      />

      {/* The form leads: it is the only channel that does not require the
          visitor to leave the site or have a mail client set up. */}
      <Reveal>
        <ContactForm />
      </Reveal>

      <Reveal delay={80}>
        <p className="contact-alt-label">Or reach me directly</p>
      </Reveal>

      <div className="contact-grid">
        <Reveal>
          <EmailCard />
        </Reveal>

        {contactItems.map((item, index) => (
          <Reveal key={item.id} delay={(index + 1) * 60}>
            <ContactCard item={item} IconComponent={iconMap[item.icon]} />
          </Reveal>
        ))}

        <Reveal delay={(contactItems.length + 1) * 60}>
          <ViberCard onOpen={() => setIsViberOpen(true)} />
        </Reveal>
      </div>

      <ViberModal open={isViberOpen} onClose={() => setIsViberOpen(false)} />
    </section>
  );
}

export default ContactPage;
