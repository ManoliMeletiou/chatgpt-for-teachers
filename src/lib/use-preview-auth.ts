import { useEffect, useState } from "react";
import { getBearerToken } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

const BEARER_KEY = "grok-auth.bearer-token";
const REMEMBER_KEY = "cft-auth.remember-token";

function writeSessionToken(token: string) {
  window.sessionStorage.setItem(BEARER_KEY, token);
}

/** Keep the preview bearer across visits — sessionStorage alone is forgotten when the tab closes. */
export function restoreRememberedToken(): void {
  if (typeof window === "undefined") return;
  try {
    const live = window.sessionStorage.getItem(BEARER_KEY);
    if (live) {
      window.localStorage.setItem(REMEMBER_KEY, live);
      return;
    }
    const remembered = window.localStorage.getItem(REMEMBER_KEY);
    if (remembered) writeSessionToken(remembered);
  } catch {
    /* storage unavailable */
  }
}

export function forgetRememberedToken(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(REMEMBER_KEY);
    window.sessionStorage.removeItem(BEARER_KEY);
  } catch {
    /* ignore */
  }
}

function rememberCurrentToken(): void {
  if (typeof window === "undefined") return;
  try {
    const live = window.sessionStorage.getItem(BEARER_KEY);
    if (live) window.localStorage.setItem(REMEMBER_KEY, live);
  } catch {
    /* ignore */
  }
}

if (typeof window !== "undefined") restoreRememberedToken();

/**
 * Live-preview email sign-in returns a session token that must ride in
 * sessionStorage (partitioned iframe cookies are not readable). Same key as
 * `src/lib/auth/client.ts`. Also copied to localStorage so the presenter stays
 * signed in on this device.
 */
export function persistPreviewToken(data: unknown): void {
  if (!data || typeof data !== "object" || typeof window === "undefined") return;
  const rec = data as Record<string, unknown>;
  const nested =
    rec.session && typeof rec.session === "object"
      ? (rec.session as Record<string, unknown>)
      : null;
  const token =
    (typeof rec.token === "string" && rec.token) ||
    (nested && typeof nested.token === "string" && nested.token) ||
    null;
  if (!token) return;
  try {
    writeSessionToken(token);
    window.localStorage.setItem(REMEMBER_KEY, token);
  } catch {
    /* storage unavailable */
  }
}

/**
 * Session that cannot hang the UI. `useSession` → `/api/auth/get-session` can
 * stay pending in the preview iframe; after `pendingMs` we stop blocking.
 * A stored preview bearer counts as signed-in so email sign-in can continue
 * even if the session store is still catching up.
 */
export function usePreviewAuth(pendingMs = 1600) {
  const { user, isPending } = useCurrentUserState();
  const [token, setToken] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    restoreRememberedToken();
    const next = getBearerToken();
    setToken(next);
    if (next) rememberCurrentToken();
  }, [user, isPending]);

  useEffect(() => {
    if (!isPending || user) return;
    const id = window.setTimeout(() => setTimedOut(true), pendingMs);
    return () => window.clearTimeout(id);
  }, [isPending, user, pendingMs]);

  const signedIn = Boolean(user || token);
  const resolving = Boolean(isPending && !timedOut && !signedIn);

  return { user, token, resolving, signedIn };
}
