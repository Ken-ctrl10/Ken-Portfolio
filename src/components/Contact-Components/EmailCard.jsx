import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

const EMAIL = "pk.castilloacc54@gmail.com";

/**
 * The email card carries a copy button because a bare mailto: link silently does
 * nothing on a desktop with no mail client configured -- a dead end for exactly
 * the visitors who matter most.
 *
 * A plain <div> rather than an <a>: a button nested inside an anchor is invalid
 * HTML, so the address itself is the link and the copy control sits beside it.
 */
function EmailCard() {
  // "idle" | "copied" | "select" -- "select" means the clipboard API refused and
  // the address has been selected for the visitor to copy by hand.
  const [state, setState] = useState("idle");

  // Reset the confirmation, and clean up if the card unmounts mid-timeout.
  useEffect(() => {
    if (state === "idle") return;
    const timeout = setTimeout(() => setState("idle"), 2500);
    return () => clearTimeout(timeout);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setState("copied");
    } catch {
      // Clipboard access can be blocked (permissions, embedded contexts).
      // Select the address so it can still be copied manually -- and say so,
      // otherwise the selection happens with no explanation.
      const node = document.getElementById("contact-email-address");
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setState("select");
    }
  }

  const copied = state === "copied";
  const tooltip =
    state === "copied"
      ? "Copied"
      : state === "select"
        ? "Selected — press Ctrl+C"
        : "Copy address";

  return (
    <div className="contact-card contact-card-primary contact-card-email">
      <span className="contact-card-icon">
        <EmailOutlinedIcon />
      </span>

      <div className="contact-card-text">
        <h3>Email</h3>
        <a id="contact-email-address" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </div>

      <Tooltip title={tooltip}>
        <IconButton
          onClick={copy}
          aria-label={copied ? "Email address copied" : "Copy email address"}
          className="contact-copy-btn"
          size="small"
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>

      {/* Announced to screen readers; the tooltip alone is not reliably read. */}
      <span className="visually-hidden" role="status">
        {state === "copied" && "Email address copied to clipboard"}
        {state === "select" && "Email address selected, press Control C to copy"}
      </span>
    </div>
  );
}

export default EmailCard;
