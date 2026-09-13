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

export function liveBusTopic(code: string): string {
  return `${LIVE_BUS_PREFIX}${normalizeCode(code).toLowerCase()}`;
}

export function liveBusUrl(code: string): string {
  return `https://ntfy.sh/${liveBusTopic(code)}`;
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

export function parseNtfyPollBody(text: string): LiveBusPayload | null {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    try {
      const event = JSON.parse(lines[i]!) as { message?: string; event?: string };
      if (event.event && event.event !== "message") continue;
      if (!event.message) continue;
      const inner = JSON.parse(event.message) as unknown;
      const parsed = parseLiveBusPayload(inner);
      if (parsed) return parsed;
    } catch {
      // try previous line
    }
  }
  return null;
}
