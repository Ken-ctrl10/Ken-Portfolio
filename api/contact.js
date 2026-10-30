/**
 * POST /api/contact — Vercel serverless function.
 *
 * Sends the contact form through Resend's REST API. Called with fetch rather
 * than the `resend` SDK so this adds no dependency to the project.
 *
 * Required environment variables (set in the Vercel dashboard):
 *   RESEND_API_KEY      Resend API key
 *   CONTACT_TO_EMAIL    where messages are delivered
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Portfolio <onboarding@resend.dev>"
 *
 * The recipient address lives here, server-side, and is never sent to the browser.
 */

import { validateContact } from "../shared/contact-validation.js";

/** Text-only body, so nothing a sender types can be interpreted as markup. */
function buildEmail({ name, email, message }) {
  return [
    `From: ${name} <${email}>`,
    "",
    message,
    "",
    "--",
    "Sent from the contact form on your portfolio.",
  ].join("\n");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // Re-validated server-side: the browser checks are a convenience a visitor can
  // trivially bypass, so this is the check that actually counts.
  const { values: data, errors, isValid } = validateContact(req.body);
  if (!isValid) {
    return res.status(400).json({
      error: "Please check the highlighted fields.",
      fields: errors,
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Configuration problem, not the visitor's fault -- log it and stay vague.
    console.error("Contact form is missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL");
    return res.status(500).json({ error: "The form is not configured yet. Please email me directly." });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // reply_to makes hitting "Reply" answer the sender, not the Resend domain.
        reply_to: data.email,
        subject: `Portfolio message from ${data.name}`,
        text: buildEmail(data),
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the message:", response.status, await response.text());
      return res.status(502).json({ error: "Could not send right now. Please try again shortly." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact form failed:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again shortly." });
  }
}
