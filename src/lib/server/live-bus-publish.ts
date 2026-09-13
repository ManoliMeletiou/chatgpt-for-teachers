import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getCourse } from "@/lib/content/courses";
import { normalizeCode } from "@/lib/live/codes";
import {
  LIVE_BUS_HOSTS,
  liveBusTopic,
  type LiveBusPayload,
} from "@/lib/live/public-bus";

/** Presenter laptop publishes the live slide so phones on the public site can follow. */
export const publishLiveBus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: LiveBusPayload) => {
    const code = normalizeCode(input.code);
    const course = getCourse(input.courseId);
    if (code.length !== 6 || !course) {
      throw new Error("Invalid live payload.");
    }
    return {
      v: 1 as const,
      code,
      courseId: course.id,
      title: (input.title || course.title).slice(0, 120),
      moduleId: input.moduleId,
      slide: Math.max(0, Number(input.slide) || 0),
      status: input.status === "ended" ? ("ended" as const) : ("live" as const),
      hostName: (input.hostName || "Presenter").slice(0, 80),
      at: Date.now(),
    } satisfies LiveBusPayload;
  })
  .handler(async ({ data }) => {
    const body = JSON.stringify(data);
    const topic = liveBusTopic(data.code);
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
    if (!results.some((row) => row.status === "fulfilled")) {
      throw new Error("Could not publish the live class.");
    }
    return { ok: true as const };
  });
