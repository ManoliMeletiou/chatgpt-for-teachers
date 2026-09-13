import { isSandboxPreviewGuestHost } from "@/lib/preview-embedder-origin";
import { normalizeCode } from "@/lib/live/codes";

const PLATFORM_GROK_ME = new Set([
  "og",
  "auth",
  "gate",
  "connectors",
  "www",
  "api",
]);

/** Public site phones actually open. Never a private draft. */
const FALLBACK_PUBLIC_ORIGIN = "https://manolimeletiou.github.io/chatgpt-for-teachers";

function envPublicOrigin(): string {
  try {
    const raw = (import.meta as ImportMeta & { env?: Record<string, string> }).env
      ?.VITE_PUBLIC_JOIN_ORIGIN;
    if (typeof raw === "string" && raw.startsWith("https://")) {
      return raw.replace(/\/$/, "");
    }
  } catch {
    // no import.meta.env
  }
  return "";
}

export function publicJoinOrigin(): string {
  return envPublicOrigin() || FALLBACK_PUBLIC_ORIGIN;
}

export function isPrivatePreview(
  hostname = typeof window === "undefined" ? "" : window.location.hostname,
): boolean {
  return isSandboxPreviewGuestHost(hostname);
}

export function isPublishedAppHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === "grok.me" || !host.endsWith(".grok.me")) return false;
  const label = host.slice(0, -".grok.me".length);
  if (!label || label.includes(".")) return false;
  return !PLATFORM_GROK_ME.has(label);
}

function originIfPublicJoinHost(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (isSandboxPreviewGuestHost(url.hostname)) return null;
    if (isPublishedAppHost(url.hostname)) return url.origin;
    if (url.hostname.endsWith(".github.io")) return url.origin;
    if (url.hostname.endsWith(".vercel.app")) return url.origin;
    return null;
  } catch {
    return null;
  }
}

export function resolveJoinOrigin(): string {
  if (typeof window !== "undefined") {
    const here = originIfPublicJoinHost(window.location.origin);
    if (here) return here;
  }
  return publicJoinOrigin();
}

export function joinUrlLooksGated(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    return isSandboxPreviewGuestHost(new URL(url).hostname);
  } catch {
    return false;
  }
}

function joinPath(origin: string, code: string): string {
  const base = origin.replace(/\/$/, "");
  const c = normalizeCode(code);
  if (base.includes("github.io")) return `${base}/?c=${c}`;
  return `${base}/join/${c}`;
}

/** Join URL to put on the QR. Always a public URL when a class code exists. */
export function joinUrlFor(code: string, _origin?: string): string | null {
  if (!code) return null;
  const resolved = resolveJoinOrigin();
  if (!resolved) return null;
  return joinPath(resolved, code);
}
