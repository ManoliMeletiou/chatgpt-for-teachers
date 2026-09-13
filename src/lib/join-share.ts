import { isSandboxPreviewGuestHost } from "@/lib/preview-embedder-origin";
import { normalizeCode } from "@/lib/live/codes";

/** Public join page. Phones never open the private draft. */
export const PUBLIC_JOIN_PAGE =
  "https://cdn.jsdelivr.net/gh/ManoliMeletiou/chatgpt-for-teachers@main/docs/index.html";

export function publicJoinOrigin(): string {
  return "https://cdn.jsdelivr.net";
}

export function isPrivatePreview(
  hostname = typeof window === "undefined" ? "" : window.location.hostname,
): boolean {
  return isSandboxPreviewGuestHost(hostname);
}

export function joinUrlLooksGated(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    return isSandboxPreviewGuestHost(new URL(url).hostname);
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
  return `${PUBLIC_JOIN_PAGE}?c=${c}`;
}
