import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import ViberQR from "../../assets/images/VIBER-QR.webp";

/**
 * MUI Dialog rather than a hand-rolled overlay: it traps focus while open,
 * closes on Escape, restores focus to whatever opened it, and marks the rest of
 * the page inert for screen readers. The previous version had the right ARIA
 * attributes but none of that behaviour.
 */
function ViberModal({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="viber-modal-title"
      slotProps={{ paper: { className: "contact-modal" } }}
    >
      <IconButton
        className="contact-modal-close"
        onClick={onClose}
        aria-label="Close Viber QR code"
      >
        <CloseIcon />
      </IconButton>

      <h3 id="viber-modal-title">Viber QR Code</h3>
      <p>Scan this to connect with me.</p>
      <img src={ViberQR} alt="Viber QR Code" width="600" height="609" decoding="async" />
    </Dialog>
  );
}

export default ViberModal;
