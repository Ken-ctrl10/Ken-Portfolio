import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { ISSUERS } from "../../data/certificates-data";
import { formatCertificateDate, formatDuration } from "../../utils/format";

/**
 * Lightbox for a single certificate.
 *
 * The full-resolution image lives in public/certificates/full/ and is only
 * requested once this dialog opens, so the 46 large scans cost nothing on the
 * initial page load. `certificate` is null while closed, which is what keeps
 * that request from being made.
 */
function CertificateDialog({ certificate, onClose }) {
  const issuer = certificate ? ISSUERS[certificate.issuer] : null;
  const duration = certificate ? formatDuration(certificate.hours) : null;

  return (
    <Dialog
      open={Boolean(certificate)}
      onClose={onClose}
      maxWidth="lg"
      aria-labelledby="certificate-dialog-title"
      slotProps={{ paper: { className: "certificate-dialog" } }}
    >
      {certificate && (
        <>
          <IconButton
            className="certificate-dialog-close"
            onClick={onClose}
            aria-label="Close certificate"
          >
            <CloseIcon />
          </IconButton>

          <img
            className="certificate-dialog-image"
            src={certificate.image.replace("/certificates/", "/certificates/full/")}
            alt={`${certificate.title} certificate issued by ${issuer.full}`}
            decoding="async"
          />

          <div className="certificate-dialog-meta">
            <p className="certificate-dialog-issuer">{issuer.full}</p>
            <h4 id="certificate-dialog-title">{certificate.title}</h4>

            {certificate.detail && (
              <p className="certificate-dialog-detail">{certificate.detail}</p>
            )}

            <p className="certificate-dialog-sub">
              {formatCertificateDate(certificate.date)}
              {duration && <> &middot; {duration}</>}
              {certificate.instructor && <> &middot; {certificate.instructor}</>}
              {certificate.code && <> &middot; {certificate.code}</>}
            </p>
          </div>
        </>
      )}
    </Dialog>
  );
}

export default CertificateDialog;
