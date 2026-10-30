import { useMemo, useState } from "react";
import Chip from "@mui/material/Chip";

import {
  certificates,
  issuerFilters,
  totalHours,
} from "../../data/certificates-data";
import CertificateCard from "./CertificateCard";
import CertificateDialog from "./CertificateDialog";

const ALL = "all";

// Showing all 41 at once made this section ~16,000px tall on a phone -- roughly
// two thirds of the entire page. The rest is behind a "Show all" button.
const INITIAL_COUNT = 12;

// Newest first -- the most recent work is the most relevant.
const byNewest = (a, b) => b.date.localeCompare(a.date);

const featured = certificates.filter((c) => c.featured).sort(byNewest);

function CertificatesSection() {
  const [activeIssuer, setActiveIssuer] = useState(ALL);
  const [openCertificate, setOpenCertificate] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const showingAll = activeIssuer === ALL;

  const matching = useMemo(() => {
    const pool = showingAll
      ? // The highlights row already covers the featured ones, so exclude them
        // here rather than showing each twice.
        certificates.filter((c) => !c.featured)
      : certificates.filter((c) => c.issuer === activeIssuer);

    return [...pool].sort(byNewest);
  }, [activeIssuer, showingAll]);

  const visible = expanded ? matching : matching.slice(0, INITIAL_COUNT);
  const hiddenCount = matching.length - visible.length;

  function selectIssuer(issuer) {
    setActiveIssuer(issuer);
    // Collapse again on filter change, otherwise switching to a large issuer
    // silently dumps its whole list on the page.
    setExpanded(false);
  }

  return (
    <section className="about-proof" aria-labelledby="proof-title">
      <h3 id="proof-title">Proof of My Continuous Learning</h3>

      <dl className="certificate-stats">
        <div>
          <dt>Certificates</dt>
          <dd>{certificates.length}</dd>
        </div>
        <div>
          <dt>Documented hours</dt>
          <dd>{Math.round(totalHours)}</dd>
        </div>
        <div>
          <dt>Issuers</dt>
          <dd>{issuerFilters.length}</dd>
        </div>
      </dl>

      {showingAll && (
        <div className="certificate-highlights">
          <h4>Highlights</h4>
          <div className="certificate-grid certificate-grid-featured">
            {featured.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onOpen={setOpenCertificate}
                eager={index < 2}
              />
            ))}
          </div>
        </div>
      )}

      <div
        className="certificate-filters"
        role="group"
        aria-label="Filter certificates by issuer"
      >
        <Chip
          label={`All ${certificates.length}`}
          onClick={() => selectIssuer(ALL)}
          aria-pressed={showingAll}
          className={showingAll ? "certificate-filter-active" : undefined}
        />
        {issuerFilters.map((issuer) => (
          <Chip
            key={issuer.id}
            label={`${issuer.label} ${issuer.count}`}
            onClick={() => selectIssuer(issuer.id)}
            aria-pressed={activeIssuer === issuer.id}
            className={activeIssuer === issuer.id ? "certificate-filter-active" : undefined}
          />
        ))}
      </div>

      {/* Announced so keyboard and screen-reader users know the grid changed. */}
      <p className="visually-hidden" role="status">
        Showing {visible.length} of {matching.length} certificate
        {matching.length === 1 ? "" : "s"}
      </p>

      <div className="certificate-grid">
        {visible.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
            onOpen={setOpenCertificate}
          />
        ))}
      </div>

      {matching.length > INITIAL_COUNT && (
        <button
          type="button"
          className="certificate-toggle"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show fewer" : `Show all ${matching.length}`}
          {!expanded && hiddenCount > 0 && (
            <span className="visually-hidden"> certificates, {hiddenCount} more</span>
          )}
        </button>
      )}

      <CertificateDialog
        certificate={openCertificate}
        onClose={() => setOpenCertificate(null)}
      />
    </section>
  );
}

export default CertificatesSection;
