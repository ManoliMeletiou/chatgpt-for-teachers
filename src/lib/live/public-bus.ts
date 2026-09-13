import { getCourse, type CourseId } from "@/lib/content/courses";
import { normalizeCode } from "@/lib/live/codes";

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

/** Public ntfy hosts. ntfy.sh is rate-limited; these accept anonymous class beacons. */
export const LIVE_BUS_HOSTS = [
  "https://ntfy.adminforge.de",
  "https://ntfy.envs.net",
  "https://ntfy.mzte.de",
] as const;

export function liveBusTopic(code: string): string {
  return `${LIVE_BUS_PREFIX}${normalizeCode(code).toLowerCase()}`;
}

export function liveGuestTopic(code: string): string {
  return `${LIVE_BUS_PREFIX}g${normalizeCode(code).toLowerCase()}`;
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
    hostName: typeof row.hostName === "string" ? row.hostName.slice(0, 80) : "Presenter",
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
  const name = typeof row.name === "string" ? row.name.trim().slice(0, 80) : "";
  if (code.length !== 6 || name.length < 2) return null;
  const answers =
    row.answers && typeof row.answers === "object" && !Array.isArray(row.answers)
      ? (row.answers as Record<string, string>)
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
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const out: unknown[] = [];
  for (const line of lines) {
    try {
      const inner = messageJson(JSON.parse(line));
      if (inner) out.push(inner);
    } catch {
      // skip
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
  const rows = ntfyMessages(text)
    .map(parseLiveBusPayload)
    .filter((row): row is LiveBusPayload => Boolean(row));
  let best: LiveBusPayload | null = null;
  for (const row of rows) {
    if (!best || row.at >= best.at) best = row;
  }
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
  for (const row of results) {
    if (row.status === "fulfilled" && row.value) return row.value;
  }
  return null;
}

export async function pullLiveBusBrowser(code: string): Promise<LiveBusPayload | null> {
  const topic = liveBusTopic(code);
  if (topic.length < 8) return null;
  const text = await pollTopic(topic);
  if (!text) return null;
  return parseNtfyPollBody(text);
}

export async function publishLiveBusBrowser(payload: LiveBusPayload): Promise<boolean> {
  const parsed = parseLiveBusPayload(payload);
  if (!parsed) return false;
  return postTopic(liveBusTopic(parsed.code), JSON.stringify(parsed), "cft-live");
}

export async function publishGuestEventBrowser(event: GuestBusEvent): Promise<boolean> {
  const parsed = parseGuestBusEvent(event);
  if (!parsed) return false;
  return postTopic(liveGuestTopic(parsed.code), JSON.stringify(parsed), "cft-guest");
}

export function guestsFromPoll(text: string): GuestRow[] {
  const events = ntfyMessages(text)
    .map(parseGuestBusEvent)
    .filter((row): row is GuestBusEvent => Boolean(row));
  const byName = new Map<string, GuestRow>();
  for (const ev of events) {
    const key = ev.name.toLowerCase();
    const prev = byName.get(key) ?? {
      name: ev.name,
      online: false,
      lastSeen: 0,
      bookletAt: null,
      answers: {},
      feeling: "",
      takeaway: "",
    };
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

export async function pullGuestRoomBrowser(code: string): Promise<GuestRow[]> {
  const topic = liveGuestTopic(code);
  const text = await pollTopic(topic);
  if (!text) return [];
  return guestsFromPoll(text);
}
