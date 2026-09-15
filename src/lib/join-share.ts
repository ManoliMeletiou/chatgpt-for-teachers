import { isSandboxPreviewGuestHost } from "@/lib/preview-embedder-origin";
import { normalizeCode } from "@/lib/live/codes";

/**
 * Public join page phones actually open. Never the private Grok draft
 * (*.grok-sandbox.com) — that host always answers “you don’t have access
 * to this preview”.
 *
 * The dedicated cft-nl-join.vercel.app alias still serves a stale dump
 * (overlapping “check”, no booklet). The live v2 page is the static
 * `join.html` on the public workshop host.
 */
export const PUBLIC_JOIN_PAGE = "https://chatgpt-for-teachers.vercel.app/join.html";

export function publicJoinOrigin(): string {
  return new URL(PUBLIC_JOIN_PAGE).origin;
}

export function isPrivatePreview(
  hostname = typeof window === "undefined" ? "" : window.location.hostname,
): boolean {
  return isSandboxPreviewGuestHost(hostname);
}

export function joinUrlLooksGated(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (isSandboxPreviewGuestHost(host)) return true;
    if (host === "grok.me" || host.endsWith(".grok.me")) return true;
    if (host.includes("jsdelivr.net")) return true;
    return false;
  } catch {
    return false;
  }
}

export function resolveJoinOrigin(): string {
  return publicJoinOrigin();
}

/** Join URL to put on the QR. Always the public page when a class code exists. */
export function joinUrlFor(code: string, roomSecret?: string): string | null {
  const c = normalizeCode(code);
  if (c.length !== 6) return null;
  const k = String(roomSecret ?? "").trim().replace(/[^A-Za-z0-9_-]/g, "");
  const url = new URL(PUBLIC_JOIN_PAGE);
  url.searchParams.set("c", c);
  if (k.length >= 20) url.searchParams.set("k", k);
  return url.toString();
}
