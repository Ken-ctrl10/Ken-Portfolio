import Chip from "@mui/material/Chip";

import { skillsByIntent } from "../../data/about-data";

// Grouped by intent rather than by technology, so the list says what he does
// with each skill instead of just naming it.
const GROUPS = [
  { key: "build", title: "Build", blurb: "What I reach for when writing software" },
  { key: "operate", title: "Operate", blurb: "Tooling from my IT Operations internship" },
  { key: "learn", title: "Learn", blurb: "What I'm actively working on now" },
];

function FocusSection() {
  return (
    <section className="about-focus" aria-labelledby="focus-title">
      <h3 id="focus-title">What I Focus On</h3>

      <div className="about-focus-grid">
        {GROUPS.map((group) => (
          <article className="focus-card" key={group.key}>
            <h4>{group.title}</h4>
            <p className="focus-blurb">{group.blurb}</p>

            {/* Chips rather than a bulleted list, matching the project cards. */}
            <div className="focus-chips">
              {skillsByIntent[group.key].map((skill) => (
                <Chip key={skill} label={skill} size="small" />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FocusSection;
