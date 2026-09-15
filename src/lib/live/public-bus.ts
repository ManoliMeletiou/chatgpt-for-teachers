import { getCourse, type CourseId } from "@/lib/content/courses";
import { normalizeCode } from "@/lib/live/codes";
import { validRoomSecret } from "@/lib/live/room-secret";

export type LiveBusPayload = {
  v: 1;
  code: string;
  courseId: CourseId;
  title: string;
  moduleId: string | null;
  slide: number;
  status: "live" | "ended";
  hostName: string;
  at: number;
};

export type GuestBusEvent = {
  v: 2;
  kind: "hello" | "booklet";
  code: string;
  name: string;
  answers?: Record<string, string>;
  feeling?: string;
  takeaway?: string;
  at: number;
};

type GuestBusEnvelope = {
  v: 3;
  code: string;
  iv: string;
  data: string;
  at: number;
};

export type GuestRow = {
  name: string;
  online: boolean;
  lastSeen: number;
  bookletAt: number | null;
  answers: Record<string, string>;
  feeling: string;
  takeaway: string;
};

export const LIVE_BUS_PREFIX = "cftnl";

/**
 * Anonymous ntfy is retained only as a transient transport. Guest names and
 * booklet content are AES-GCM encrypted in v2.0 before leaving the browser.
 * A long room secret is embedded in the QR/link and is not derivable from the
 * six-character class code.
 */
export const LIVE_BUS_HOSTS = [
  "https://ntfy.adminforge.de",
  "https://ntfy.envs.net",
  "https://ntfy.mzte.de",
] as const;

export function liveBusTopic(code: string): string {
  return `${LIVE_BUS_PREFIX}${normalizeCode(code).toLowerCase()}`;
}

export function liveGuestTopic(code: string, roomSecret = ""): string {
  const suffix = validRoomSecret(roomSecret).slice(0, 12).toLowerCase();
  return `${LIVE_BUS_PREFIX}g${normalizeCode(code).toLowerCase()}${suffix}`;
}

export function liveBusUrl(code: string, host: string = LIVE_BUS_HOSTS[0]): string {
  return `${host}/${liveBusTopic(code)}`;
}

export function parseLiveBusPayload(raw: unknown): LiveBusPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const code = typeof row.code === "string" ? normalizeCode(row.code) : "";
  if (code.length !== 6) return null;
  const courseId = typeof row.courseId === "string" ? row.courseId : "";
  const course = getCourse(courseId);
  if (!course) return null;
  const status = row.status === "ended" ? "ended" : "live";
  const moduleId = typeof row.moduleId === "string" && row.moduleId ? row.moduleId : null;
  const slide = Number(row.slide);
  return {
    v: 1,
    code,
    courseId: course.id,
    title: typeof row.title === "string" && row.title.trim() ? row.title : course.title,
    moduleId,
    slide: Number.isFinite(slide) ? Math.max(0, slide) : 0,
    status,
    // Do not broadcast the presenter's name on a public topic.
    hostName: "Presenter",
    at: Number(row.at) || Date.now(),
  };
}

export function parseGuestBusEvent(raw: unknown): GuestBusEvent | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  if (row.v !== 2) return null;
  const kind = row.kind === "booklet" ? "booklet" : row.kind === "hello" ? "hello" : null;
  if (!kind) return null;
  const code = typeof row.code === "string" ? normalizeCode(row.code) : "";
  const name = typeof row.name === "string" ? row.name.trim().slice(0, 60) : "";
  if (code.length !== 6 || name.length < 2) return null;
  const answers =
    row.answers && typeof row.answers === "object" && !Array.isArray(row.answers)
      ? Object.fromEntries(
          Object.entries(row.answers as Record<string, unknown>)
            .slice(0, 64)
            .map(([k, v]) => [String(k).slice(0, 80), String(v ?? "").slice(0, 4000)]),
        )
      : {};
  return {
    v: 2,
    kind,
    code,
    name,
    answers,
    feeling: typeof row.feeling === "string" ? row.feeling.slice(0, 400) : "",
    takeaway: typeof row.takeaway === "string" ? row.takeaway.slice(0, 400) : "",
    at: Number(row.at) || Date.now(),
  };
}

function messageJson(event: unknown): unknown {
  if (!event || typeof event !== "object") return null;
  const row = event as Record<string, unknown>;
  if (row.event && row.event !== "message") return null;
  if (typeof row.message !== "string" || !row.message.trim()) return null;
  try {
    return JSON.parse(row.message);
  } catch {
    return null;
  }
}

function ntfyMessages(text: string): unknown[] {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const out: unknown[] = [];
  for (const line of lines) {
    try {
      const inner = messageJson(JSON.parse(line));
      if (inner) out.push(inner);
    } catch {
      // skip malformed relay rows
    }
  }
  if (out.length === 0) {
    try {
      const inner = messageJson(JSON.parse(text));
      if (inner) out.push(inner);
    } catch {
      // skip
    }
  }
  return out;
}

function payloadFromNtfyEvent(event: unknown): LiveBusPayload | null {
  return parseLiveBusPayload(messageJson(event));
}

export function parseNtfyPollBody(text: string): LiveBusPayload | null {
  const rows = ntfyMessages(text).map(parseLiveBusPayload).filter((row): row is LiveBusPayload => Boolean(row));
  let best: LiveBusPayload | null = null;
  for (const row of rows) if (!best || row.at >= best.at) best = row;
  if (best) return best;
  try {
    return payloadFromNtfyEvent(JSON.parse(text));
  } catch {
    return null;
  }
}

async function postTopic(topic: string, body: string, title: string): Promise<boolean> {
  const results = await Promise.allSettled(
    LIVE_BUS_HOSTS.map(async (host) => {
      const res = await fetch(`${host}/${topic}`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Title: title,
          Cache: "yes",
        },
        body,
      });
      if (!res.ok) throw new Error(String(res.status));
    }),
  );
  return results.some((row) => row.status === "fulfilled");
}

async function pollTopic(topic: string): Promise<string | null> {
  const results = await Promise.allSettled(
    LIVE_BUS_HOSTS.map(async (host) => {
      const res = await fetch(`${host}/${topic}/json?poll=1`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      return res.text();
    }),
  );
  for (const row of results) if (row.status === "fulfilled" && row.value) return row.value;
  return null;
}

export async function pullLiveBusBrowser(code: string): Promise<LiveBusPayload | null> {
  const topic = liveBusTopic(code);
  if (topic.length < 8) return null;
  const text = await pollTopic(topic);
  return text ? parseNtfyPollBody(text) : null;
}

export async function publishLiveBusBrowser(payload: LiveBusPayload): Promise<boolean> {
  const parsed = parseLiveBusPayload(payload);
  if (!parsed) return false;
  return postTopic(liveBusTopic(parsed.code), JSON.stringify(parsed), "cft-live");
}

function bytesToB64url(bytes: Uint8Array): string {
  let raw = "";
  for (const b of bytes) raw += String.fromCharCode(b);
  return btoa(raw).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function b64urlToBytes(text: string): Uint8Array {
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((text.length + 3) % 4);
  const raw = atob(base64);
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

async function guestKey(secret: string): Promise<CryptoKey> {
  const clean = validRoomSecret(secret);
  if (!clean) throw new Error("missing room secret");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`cft-guest-v3:${clean}`));
  return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

async function encryptGuest(event: GuestBusEvent, secret: string): Promise<GuestBusEnvelope> {
  const key = await guestKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plain = new TextEncoder().encode(JSON.stringify(event));
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain);
  return { v: 3, code: event.code, iv: bytesToB64url(iv), data: bytesToB64url(new Uint8Array(cipher)), at: event.at };
}

async function decryptGuest(raw: unknown, secret: string): Promise<GuestBusEvent | null> {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  if (row.v !== 3 || typeof row.iv !== "string" || typeof row.data !== "string") return null;
  try {
    const key = await guestKey(secret);
    const ivBytes = b64urlToBytes(row.iv);
    const dataBytes = b64urlToBytes(row.data);
    const iv = new Uint8Array(ivBytes);
    const data = new Uint8Array(dataBytes);
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data,
    );
    return parseGuestBusEvent(JSON.parse(new TextDecoder().decode(plain)));
  } catch {
    return null;
  }
}

export async function publishGuestEventBrowser(event: GuestBusEvent, roomSecret: string): Promise<boolean> {
  const parsed = parseGuestBusEvent(event);
  const secret = validRoomSecret(roomSecret);
  if (!parsed || !secret) return false;
  const envelope = await encryptGuest(parsed, secret);
  return postTopic(liveGuestTopic(parsed.code, secret), JSON.stringify(envelope), "cft-guest-v3");
}

function guestsFromEvents(events: GuestBusEvent[]): GuestRow[] {
  const byName = new Map<string, GuestRow>();
  for (const ev of events) {
    const key = ev.name.toLowerCase();
    const prev = byName.get(key) ?? { name: ev.name, online: false, lastSeen: 0, bookletAt: null, answers: {}, feeling: "", takeaway: "" };
    if (ev.kind === "hello" && ev.at >= prev.lastSeen) {
      prev.lastSeen = ev.at;
      prev.name = ev.name;
    }
    if (ev.kind === "booklet" && (prev.bookletAt == null || ev.at >= prev.bookletAt)) {
      prev.bookletAt = ev.at;
      prev.answers = ev.answers ?? {};
      prev.feeling = ev.feeling ?? "";
      prev.takeaway = ev.takeaway ?? "";
      prev.name = ev.name;
      if (ev.at > prev.lastSeen) prev.lastSeen = ev.at;
    }
    byName.set(key, prev);
  }
  const now = Date.now();
  return [...byName.values()]
    .map((row) => ({ ...row, online: now - row.lastSeen < 20000 }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Legacy plaintext parser kept only so old rooms can finish during deployment. */
export function guestsFromPoll(text: string): GuestRow[] {
  const events = ntfyMessages(text).map(parseGuestBusEvent).filter((row): row is GuestBusEvent => Boolean(row));
  return guestsFromEvents(events);
}

export async function pullGuestRoomBrowser(code: string, roomSecret: string): Promise<GuestRow[]> {
  const secret = validRoomSecret(roomSecret);
  if (!secret) return [];
  const text = await pollTopic(liveGuestTopic(code, secret));
  if (!text) return [];
  const decoded = await Promise.all(ntfyMessages(text).map((row) => decryptGuest(row, secret)));
  return guestsFromEvents(decoded.filter((row): row is GuestBusEvent => Boolean(row)));
}
