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

function payloadFromNtfyEvent(event: unknown): LiveBusPayload | null {
  if (!event || typeof event !== "object") return null;
  const row = event as Record<string, unknown>;
  if (row.event && row.event !== "message") return null;
  const message = row.message;
  if (typeof message !== "string" || !message.trim()) return null;
  try {
    return parseLiveBusPayload(JSON.parse(message));
  } catch {
    return null;
  }
}

export function parseNtfyPollBody(text: string): LiveBusPayload | null {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    try {
      const parsed = payloadFromNtfyEvent(JSON.parse(lines[i]!));
      if (parsed) return parsed;
    } catch {
      // try previous line
    }
  }
  try {
    return payloadFromNtfyEvent(JSON.parse(text));
  } catch {
    return null;
  }
}

export async function pullLiveBusBrowser(code: string): Promise<LiveBusPayload | null> {
  const topic = liveBusTopic(code);
  if (topic.length < 8) return null;
  const results = await Promise.allSettled(
    LIVE_BUS_HOSTS.map(async (host) => {
      const res = await fetch(`${host}/${topic}/json?poll=1`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const text = await res.text();
      const parsed = parseNtfyPollBody(text);
      if (!parsed) throw new Error("empty");
      return parsed;
    }),
  );
  let best: LiveBusPayload | null = null;
  for (const row of results) {
    if (row.status !== "fulfilled") continue;
    if (!best || row.value.at >= best.at) best = row.value;
  }
  return best;
}

/** Presenter laptop posts the live slide. Works from the private draft because these hosts allow any origin. */
export async function publishLiveBusBrowser(payload: LiveBusPayload): Promise<boolean> {
  const parsed = parseLiveBusPayload(payload);
  if (!parsed) return false;
  const body = JSON.stringify(parsed);
  const topic = liveBusTopic(parsed.code);
  const results = await Promise.allSettled(
    LIVE_BUS_HOSTS.map(async (host) => {
      const res = await fetch(`${host}/${topic}`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Title: "cft-live",
          Cache: "yes",
        },
        body,
      });
      if (!res.ok) throw new Error(String(res.status));
    }),
  );
  return results.some((row) => row.status === "fulfilled");
}
