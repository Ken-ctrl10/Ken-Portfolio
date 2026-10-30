import { ISSUERS } from "../../data/certificates-data";
import { formatCertificateDate, formatDuration } from "../../utils/format";

/**
 * One certificate in the gallery grid. A button rather than a div, so it is
 * reachable and activatable from the keyboard -- opening the lightbox is a real
 * action, not decoration.
 */
function CertificateCard({ certificate, onOpen, eager = false }) {
  const issuer = ISSUERS[certificate.issuer];
  const duration = formatDuration(certificate.hours);

  return (
    <button
      type="button"
      className={`certificate-card${certificate.featured ? " certificate-card-featured" : ""}`}
      onClick={() => onOpen(certificate)}
      aria-label={`View certificate: ${certificate.title}, ${issuer.label}`}
    >
      <span className="certificate-thumb">
        <img
          src={certificate.image}
          alt=""
          width="400"
          height="300"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
        {certificate.type === "award" && <span className="certificate-ribbon">Award</span>}
      </span>

      <span className="certificate-meta">
        <span className="certificate-issuer">{issuer.label}</span>
        <span className="certificate-title">{certificate.title}</span>
        <span className="certificate-sub">
          {formatCertificateDate(certificate.date)}
          {duration && <> &middot; {duration}</>}
        </span>
      </span>
    </button>
  );
}

export default CertificateCard;
