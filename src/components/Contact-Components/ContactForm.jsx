import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import { validateContact, LIMITS } from "../../../shared/contact-validation";

const EMPTY = { name: "", email: "", message: "" };

/**
 * Posts to /api/contact (a Vercel serverless function) so a visitor can send a
 * message without leaving the site or having a mail client configured.
 *
 * Validation runs against the same rules the server uses
 * (shared/contact-validation.js). The browser pass is only a convenience --
 * the server re-checks everything.
 *
 * `status` is one of: idle | sending | sent | error.
 */
function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // A field only shows its error once the visitor has left it, so the form does
  // not start shouting at someone who is still typing their name.
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  // Separate refs rather than an object of refs: reading them off an object
  // during render counts as accessing a ref value, which the hooks lint forbids.
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const liveErrors = validateContact(values).errors;
  const errorFor = (field) =>
    touched[field] ? (errors[field] ?? liveErrors[field]) : undefined;

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    // Clear a server-supplied error as soon as the field is edited.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    if (status === "error") setFormError("");
  };

  const markTouched = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));

  async function handleSubmit(event) {
    event.preventDefault();

    const result = validateContact(values);
    if (!result.isValid) {
      setTouched({ name: true, email: true, message: true });
      setErrors(result.errors);
      setStatus("idle");
      setFormError("");
      // Send focus to the first problem so keyboard users are not left guessing.
      // Built here, not during render, so no ref is read while rendering.
      const refs = { name: nameRef, email: emailRef, message: messageRef };
      const firstBad = ["name", "email", "message"].find((f) => result.errors[f]);
      refs[firstBad]?.current?.focus();
      return;
    }

    setStatus("sending");
    setFormError("");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.values),
      });

      // The endpoint answers with JSON, but a proxy or a 404 can return HTML --
      // so don't assume the body parses.
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (payload.fields) setErrors(payload.fields);
        setFormError(payload.error || "Could not send your message. Please try again.");
        setStatus("error");
        return;
      }

      setValues(EMPTY);
      setTouched({});
      setStatus("sent");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const sending = status === "sending";
  const remaining = LIMITS.message.max - values.message.length;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <h3>Send me a message</h3>
      <p className="contact-form-intro">
        I&rsquo;ll reply to the address you provide, usually within a day.
      </p>

      <div className="contact-form-row">
        <TextField
          inputRef={nameRef}
          label="Your name"
          value={values.name}
          onChange={update("name")}
          onBlur={markTouched("name")}
          error={Boolean(errorFor("name"))}
          helperText={errorFor("name") ?? " "}
          required
          fullWidth
          size="small"
          disabled={sending}
          autoComplete="name"
          slotProps={{ htmlInput: { maxLength: LIMITS.name.max } }}
        />
        <TextField
          inputRef={emailRef}
          label="Your email"
          type="email"
          value={values.email}
          onChange={update("email")}
          onBlur={markTouched("email")}
          error={Boolean(errorFor("email"))}
          helperText={errorFor("email") ?? " "}
          required
          fullWidth
          size="small"
          disabled={sending}
          autoComplete="email"
          slotProps={{ htmlInput: { maxLength: LIMITS.email.max } }}
        />
      </div>

      <TextField
        inputRef={messageRef}
        label="Message"
        value={values.message}
        onChange={update("message")}
        onBlur={markTouched("message")}
        error={Boolean(errorFor("message"))}
        helperText={
          errorFor("message") ??
          (remaining < 200 ? `${remaining} characters left` : " ")
        }
        required
        fullWidth
        multiline
        minRows={4}
        size="small"
        disabled={sending}
        slotProps={{ htmlInput: { maxLength: LIMITS.message.max } }}
      />

      <div className="contact-form-actions">
        <Button
          type="submit"
          variant="contained"
          disabled={sending}
          endIcon={<SendIcon />}
          className="contact-form-submit"
        >
          {sending ? "Sending..." : "Send message"}
        </Button>

        {/* role="status" so the outcome is announced without stealing focus. */}
        <p
          className={`contact-form-status${status === "error" ? " contact-form-status-error" : ""}`}
          role="status"
        >
          {status === "sent" && "Thanks — your message is on its way."}
          {status === "error" && formError}
        </p>
      </div>
    </form>
  );
}

export default ContactForm;
