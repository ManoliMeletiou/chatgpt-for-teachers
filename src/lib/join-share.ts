import { isSandboxPreviewGuestHost } from "@/lib/preview-embedder-origin";
import { normalizeCode } from "@/lib/live/codes";

/**
 * Public join page phones actually open. Never the private Grok draft
 * (*.grok-sandbox.com) — that host always answers “you don’t have access
 * to this preview”.
 */
export const PUBLIC_JOIN_PAGE = "https://cft-nl-join.vercel.app";

export function publicJoinOrigin(): string {
  return PUBLIC_JOIN_PAGE;
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
export function joinUrlFor(code: string, _origin?: string): string | null {
  const c = normalizeCode(code);
  if (c.length !== 6) return null;
  return `${PUBLIC_JOIN_PAGE}/?c=${c}`;
}
