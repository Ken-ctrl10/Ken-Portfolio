import internSelfie from "../../assets/images/internship/intern-selfie.webp";
import aboutMePhoto from "../../assets/images/internship/aboutme.webp";
import { snapshot } from "../../data/about-data";

/**
 * The story and the career snapshot answer the same question -- who this person
 * is -- so they live in one block rather than two identically-weighted cards.
 * The snapshot facts sit as a strip beneath the prose.
 */
function ProfileSection() {
  return (
    <section className="about-profile" aria-labelledby="profile-title">
      <h3 className="visually-hidden" id="profile-title">
        Profile
      </h3>

      <div className="about-profile-main">
        <div className="about-photo-flip" aria-label="Internship photo highlights">
          <div className="about-photo-flip-inner">
            <div className="about-photo-front">
              <img
                src={aboutMePhoto}
                alt="Ken working on a laptop during his internship"
                className="about-profile-image"
                width="840"
                height="630"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="about-photo-back">
              <img
                src={internSelfie}
                alt="Ken with his co-interns"
                className="about-profile-image"
                width="840"
                height="630"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="about-story">
          <p>
            Hello! I&rsquo;m Prince Kenneth, a Computer Science graduate with hands-on IT
            Operations experience from my internship at Nexus Technologies.
          </p>
          <p>
            My background combines software development with operations discipline &mdash;
            Linux fundamentals, monitoring workflows, and practical troubleshooting. I also
            contributed to FILWA, a machine learning-based Filipino writing assistant, which
            strengthened my collaboration and applied research skills.
          </p>
          <p>
            I&rsquo;m currently focused on frontend growth with React and looking for roles
            where I can contribute, learn fast, and build real user value.
          </p>
        </div>
      </div>

      <dl className="about-snapshot-strip">
        {snapshot.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default ProfileSection;
