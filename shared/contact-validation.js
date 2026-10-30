/**
 * Validation rules for the contact form, shared by the browser and the
 * serverless function.
 *
 * Kept in one file on purpose: client-side rules are a convenience that a
 * visitor can bypass, so the server has to re-check anyway. Duplicating the
 * rules in two places is how they drift apart.
 */

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  message: { min: 10, max: 5000 },
};

// Deliberately permissive: the goal is catching typos, not policing the RFC.
// Stricter patterns reject real addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Returns { values, errors, isValid }.
 * `errors` is keyed by field name and only contains fields that failed, so
 * `Object.keys(errors).length === 0` means the submission is good.
 */
export function validateContact(input) {
  const values = {
    name: String(input?.name ?? "").trim(),
    email: String(input?.email ?? "").trim(),
    message: String(input?.message ?? "").trim(),
  };

  const errors = {};

  if (!values.name) {
    errors.name = "Please enter your name.";
  } else if (values.name.length < LIMITS.name.min) {
    errors.name = "That name looks too short.";
  } else if (values.name.length > LIMITS.name.max) {
    errors.name = `Please keep this under ${LIMITS.name.max} characters.`;
  }

  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (values.email.length > LIMITS.email.max) {
    errors.email = "That email address is too long.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "That doesn't look like a valid email address.";
  }

  if (!values.message) {
    errors.message = "Please write a message.";
  } else if (values.message.length < LIMITS.message.min) {
    errors.message = `Please write at least ${LIMITS.message.min} characters.`;
  } else if (values.message.length > LIMITS.message.max) {
    errors.message = `Please keep this under ${LIMITS.message.max} characters.`;
  }

  return { values, errors, isValid: Object.keys(errors).length === 0 };
}
