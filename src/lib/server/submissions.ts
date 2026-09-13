import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getCourse, type CourseId } from "@/lib/content/courses";
import type { Sql } from "@/lib/db";
import { normalizeCode } from "@/lib/live/codes";
import type { LiveMember } from "@/lib/live/types";

export type BookletSubmission = {
  id: string;
  sessionId: string;
  courseId: CourseId;
  userId: string;
  displayName: string;
  workbook: Record<string, string>;
  capstoneTicks: Record<string, boolean>;
  diagnostic: Record<string, number>;
  feeling: string;
  improvement: string;
  takeaway: string;
  rating: number | null;
  submittedAt: string;
};

export type PresenterRoom = {
  id: string;
  title: string;
  courseId: CourseId;
  status: "live" | "ended";
  createdAt: string;
  endedAt: string | null;
  members: LiveMember[];
  submissions: BookletSubmission[];
};

function clip(value: unknown, max: number): string {
  return String(value ?? "").slice(0, max);
}

function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function mapRow(row: {
  id: string;
  session_id: string;
  course_id: string;
  user_id: string;
  display_name: string;
  workbook: string;
  capstone_ticks: string;
  diagnostic: string;
  feeling: string;
  improvement: string;
  takeaway: string;
  rating: number | string | null;
  submitted_at: string;
}): BookletSubmission | null {
  const course = getCourse(row.course_id);
  if (!course) return null;
  const ratingNum = row.rating == null ? null : Number(row.rating);
  return {
    id: row.id,
    sessionId: row.session_id,
    courseId: course.id,
    userId: row.user_id,
    displayName: row.display_name || "Participant",
    workbook: parseJson(row.workbook, {}),
    capstoneTicks: parseJson(row.capstone_ticks, {}),
    diagnostic: parseJson(row.diagnostic, {}),
    feeling: row.feeling ?? "",
    improvement: row.improvement ?? "",
    takeaway: row.takeaway ?? "",
    rating: Number.isFinite(ratingNum) ? ratingNum : null,
    submittedAt: String(row.submitted_at),
  };
}

type SessionHead = {
  id: string;
  course_id: string;
  title: string;
  status: string;
  created_at: string;
  ended_at: string | null;
};

async function assembleRoom(sql: Sql, s: SessionHead): Promise<PresenterRoom | null> {
  const course = getCourse(s.course_id);
  if (!course) return null;
  const members = await sql<{
    user_id: string;
    display_name: string;
    role: string;
    joined_at: string;
    last_seen_at: string;
  }>`
    select user_id, display_name, role, joined_at, last_seen_at
    from session_members
    where session_id = ${s.id}
    order by case when role = 'host' then 0 else 1 end, joined_at asc
  `;
  const subs = await sql<Parameters<typeof mapRow>[0]>`
    select id, session_id, course_id, user_id, display_name, workbook, capstone_ticks, diagnostic,
           feeling, improvement, takeaway, rating, submitted_at
    from booklet_submissions
    where session_id = ${s.id}
    order by submitted_at desc
  `;
  return {
    id: s.id,
    title: s.title || course.title,
    courseId: course.id,
    status: s.status === "ended" ? "ended" : "live",
    createdAt: String(s.created_at),
    endedAt: s.ended_at ? String(s.ended_at) : s.status === "ended" ? String(s.created_at) : null,
    members: members.map((m) => {
      const seen = new Date(m.last_seen_at).getTime();
      return {
        userId: m.user_id,
        displayName: m.display_name || "Participant",
        role: m.role === "host" ? "host" : "participant",
        joinedAt: String(m.joined_at),
        lastSeenAt: String(m.last_seen_at),
        online: Number.isFinite(seen) && Date.now() - seen < 45_000,
      };
    }),
    submissions: subs.map(mapRow).filter((row): row is BookletSubmission => Boolean(row)),
  };
}

export const submitBooklet = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: {
    feeling: string;
    improvement: string;
    takeaway: string;
    rating: number;
    workbook: Record<string, string>;
    capstoneTicks: Record<string, boolean>;
    diagnostic: Record<string, number>;
    displayName?: string;
  }) => ({
    feeling: clip(input.feeling, 2000),
    improvement: clip(input.improvement, 2000),
    takeaway: clip(input.takeaway, 2000),
    rating: Math.max(1, Math.min(5, Math.floor(Number(input.rating) || 0))),
    workbook: Object.fromEntries(
      Object.entries(input.workbook ?? {})
        .slice(0, 48)
        .map(([k, v]) => [clip(k, 64), clip(v, 8000)]),
    ),
    capstoneTicks: input.capstoneTicks ?? {},
    diagnostic: input.diagnostic ?? {},
    displayName: clip(input.displayName, 80) || "Participant",
  }))
  .handler(async ({ context, data }): Promise<BookletSubmission> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const sessions = await sql<{
      id: string;
      course_id: string;
      host_user_id: string;
    }>`
      select s.id, s.course_id, s.host_user_id
      from live_sessions s
      join session_members m on m.session_id = s.id
      where m.user_id = ${context.userId} and m.role = 'participant'
      order by s.created_at desc
      limit 1
    `;
    const session = sessions[0];
    if (!session) throw new Error("Join a live class before sending your booklet.");
    if (session.host_user_id === context.userId) {
      throw new Error("The presenter receives booklets rather than sending one.");
    }
    const id = `${session.id}:${context.userId}`;
    await sql`
      insert into booklet_submissions (
        id, session_id, course_id, user_id, display_name, workbook, capstone_ticks, diagnostic,
        feeling, improvement, takeaway, rating, submitted_at
      ) values (
        ${id},
        ${session.id},
        ${session.course_id},
        ${context.userId},
        ${data.displayName},
        ${JSON.stringify(data.workbook)},
        ${JSON.stringify(data.capstoneTicks)},
        ${JSON.stringify(data.diagnostic)},
        ${data.feeling},
        ${data.improvement},
        ${data.takeaway},
        ${data.rating},
        now()
      )
      on conflict (session_id, user_id) do update set
        display_name = excluded.display_name,
        workbook = excluded.workbook,
        capstone_ticks = excluded.capstone_ticks,
        diagnostic = excluded.diagnostic,
        feeling = excluded.feeling,
        improvement = excluded.improvement,
        takeaway = excluded.takeaway,
        rating = excluded.rating,
        submitted_at = now()
    `;
    const rows = await sql<Parameters<typeof mapRow>[0]>`
      select id, session_id, course_id, user_id, display_name, workbook, capstone_ticks, diagnostic,
             feeling, improvement, takeaway, rating, submitted_at
      from booklet_submissions
      where id = ${id}
      limit 1
    `;
    const mapped = rows[0] ? mapRow(rows[0]) : null;
    if (!mapped) throw new Error("Booklet was saved but could not be loaded.");
    return mapped;
  });

export const listBookletSubmissions = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { code: string }) => normalizeCode(input.code))
  .handler(async ({ context, data: code }): Promise<BookletSubmission[]> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const hosts = await sql<{ id: string }>`
      select id from live_sessions
      where id = ${code} and host_user_id = ${context.userId}
      limit 1
    `;
    if (!hosts[0]) throw new Error("Only the presenter can open the booklets.");
    const rows = await sql<Parameters<typeof mapRow>[0]>`
      select id, session_id, course_id, user_id, display_name, workbook, capstone_ticks, diagnostic,
             feeling, improvement, takeaway, rating, submitted_at
      from booklet_submissions
      where session_id = ${code}
      order by submitted_at desc
    `;
    return rows.map(mapRow).filter((row): row is BookletSubmission => Boolean(row));
  });

export const getMyBookletSubmission = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<BookletSubmission | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<Parameters<typeof mapRow>[0]>`
      select id, session_id, course_id, user_id, display_name, workbook, capstone_ticks, diagnostic,
             feeling, improvement, takeaway, rating, submitted_at
      from booklet_submissions
      where user_id = ${context.userId}
      order by submitted_at desc
      limit 1
    `;
    return rows[0] ? mapRow(rows[0]) : null;
  });

export const getPresenterInbox = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<PresenterRoom[]> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const sessions = await sql<SessionHead>`
      select id, course_id, title, status, created_at, ended_at
      from live_sessions
      where host_user_id = ${context.userId}
      order by created_at desc
      limit 40
    `;
    const rooms: PresenterRoom[] = [];
    for (const s of sessions) {
      const room = await assembleRoom(sql, s);
      if (room) rooms.push(room);
    }
    return rooms;
  });

export const getPresenterRoom = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { code: string }) => normalizeCode(input.code))
  .handler(async ({ context, data: code }): Promise<PresenterRoom | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const sessions = await sql<SessionHead>`
      select id, course_id, title, status, created_at, ended_at
      from live_sessions
      where id = ${code} and host_user_id = ${context.userId}
      limit 1
    `;
    const s = sessions[0];
    if (!s) return null;
    return assembleRoom(sql, s);
  });
