import { normalizeCode } from "./codes";

const PREFIX = "cft-room-key-v1:";

function base64url(bytes: Uint8Array): string {
  let raw = "";
  for (const b of bytes) raw += String.fromCharCode(b);
  return btoa(raw).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function validRoomSecret(value: string | null | undefined): string {
  const v = String(value ?? "").trim().replace(/[^A-Za-z0-9_-]/g, "");
  return v.length >= 20 ? v.slice(0, 96) : "";
}

export function getOrCreateRoomSecret(code: string): string {
  if (typeof window === "undefined") return "";
  const c = normalizeCode(code);
  if (c.length !== 6) return "";
  const key = `${PREFIX}${c}`;
  const existing = validRoomSecret(window.sessionStorage.getItem(key));
  if (existing) return existing;
  const bytes = new Uint8Array(24);
  window.crypto.getRandomValues(bytes);
  const secret = base64url(bytes);
  window.sessionStorage.setItem(key, secret);
  return secret;
}

export function roomSecretFor(code: string): string {
  if (typeof window === "undefined") return "";
  const c = normalizeCode(code);
  return validRoomSecret(window.sessionStorage.getItem(`${PREFIX}${c}`));
}

export function clearRoomSecret(code: string): void {
  if (typeof window === "undefined") return;
  const c = normalizeCode(code);
  window.sessionStorage.removeItem(`${PREFIX}${c}`);
}
