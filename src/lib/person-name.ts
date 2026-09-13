/** Turn an account name or email local-part into a certificate name. */
export function prettyPersonName(
  raw: string | null | undefined,
  fallback = "Participant",
): string {
  let value = (raw ?? "").trim();
  if (!value) return fallback;
  if (value.includes("@")) {
    value = (value.split("@")[0] ?? value).replace(/[._+-]+/g, " ").trim();
  }
  if (!value || /^participant$/i.test(value)) return fallback;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) return value;
  return value
    .split(/[\s._+-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
