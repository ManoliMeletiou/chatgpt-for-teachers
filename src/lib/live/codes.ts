const ALPH = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function normalizeCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function displayCode(code: string): string {
  const c = normalizeCode(code);
  if (c.length === 6) return `${c.slice(0, 3)} ${c.slice(3)}`;
  return c;
}

export function randomCode(len = 6): string {
  const buf = new Uint8Array(len);
  crypto.getRandomValues(buf);
  let out = "";
  for (const b of buf) out += ALPH[b % ALPH.length]!;
  return out;
}

export function isValidCode(raw: string): boolean {
  return normalizeCode(raw).length === 6;
}
