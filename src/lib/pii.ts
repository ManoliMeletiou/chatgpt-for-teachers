const email = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const phone = /(\+31|0)(\s|-)?\d{1,3}(\s|-)?\d{6,8}/;
const sensitive =
  /\b(safeguarding|sen\b|iep\b|diagnosis|dyslexia|adhd|autism|suicidal|abuse|allegation|grade[sd]?|cijfer|bsn|passport)\b/i;

export function scanPromptRisk(text: string): string[] {
  const flags: string[] = [];
  if (email.test(text)) flags.push("Looks like an email address.");
  if (phone.test(text)) flags.push("Looks like a telephone number.");
  if (sensitive.test(text)) flags.push("Contains words often tied to sensitive or special-category data.");
  if (/\b(year|klas|groep)\s*\d+[A-Z]?\b/i.test(text) && /\b[A-Z][a-z]{2,}\b/.test(text)) {
    flags.push("A given name plus a class group can still identify someone.");
  }
  return flags;
}
