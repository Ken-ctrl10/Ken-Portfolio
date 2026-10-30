/** "2026-06-17" -> "Jun 2026". Parsed as UTC so the month never shifts by timezone. */
export function formatCertificateDate(iso) {
  if (!iso) return "";
  const [year, month] = iso.split("-");
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** Decimal hours -> "62 hrs" / "1 hr" / "32 min". Null when undocumented. */
export function formatDuration(hours) {
  if (hours == null) return null;
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const rounded = Number.isInteger(hours) ? hours : Number(hours.toFixed(1));
  return `${rounded} ${rounded === 1 ? "hr" : "hrs"}`;
}
