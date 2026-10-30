import { timeline } from "../../data/about-data";

/**
 * Rendered as a real timeline -- a vertical rail with a marker per entry --
 * rather than a numbered list, so the progression reads at a glance.
 * Still an <ol>, because the order carries meaning.
 */
function TimelineSection() {
  return (
    <section className="about-timeline" aria-labelledby="timeline-title">
      <h3 id="timeline-title">Journey Timeline</h3>

      <ol className="timeline-rail">
        {timeline.map((item) => (
          <li key={item.year}>
            {/* Decorative: the year beside it already conveys the position. */}
            <span className="timeline-marker" aria-hidden="true" />

            <div className="timeline-entry">
              <p className="timeline-year">{item.year}</p>
              <h4>{item.title}</h4>
              <p className="timeline-detail">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default TimelineSection;
