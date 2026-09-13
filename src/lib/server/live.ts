import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getCourse, type CourseId } from "@/lib/content/courses";
import { getModule } from "@/lib/content/modules";
import { courseModuleIds } from "@/lib/content/path";
import { normalizeCode, randomCode } from "@/lib/live/codes";
import type { ClosedClass, LiveClassPeek, LiveClassView, LiveMember, LiveSession, RosterRow } from "@/lib/live/types";

type SessionRow = {
  id: string;
  host_user_id: string;
  course_id: string;
  title: string;
  status: string;
  current_module_id: string | null;
  current_slide: number | string;
  created_at: string;
  ended_at?: string | null;
};

type MemberRow = {
  user_id: string;
  display_name: string;
  role: string;
  joined_at: string;
  last_seen_at: string;
};

function asCourseId(id: string): CourseId {
  const course = getCourse(id);
  if (!course) throw new Error("Unknown course route.");
  return course.id;
}

function cleanName(raw: string | undefined): string {
  const n = (raw ?? "").trim().slice(0, 80);
  if (!n || n.includes("@")) return "Participant";
  return n;
}

function mapSession(row: SessionRow): LiveSession {
  const course = getCourse(row.course_id);
  return {
    id: row.id,
    courseId: asCourseId(row.course_id),
    title: row.title || course?.title || "Live class",
    status: row.status === "ended" ? "ended" : "live",
    currentModuleId: row.current_module_id,
    currentSlide: Number(row.current_slide) || 0,
    createdAt: String(row.created_at),
    endedAt: row.ended_at ? String(row.ended_at) : null,
  };
}

function mapMember(row: MemberRow): LiveMember {
  const seen = new Date(row.last_seen_at).getTime();
  return {
    userId: row.user_id,
    displayName: row.display_name || "Participant",
    role: row.role === "host" ? "host" : "participant",
    joinedAt: String(row.joined_at),
    lastSeenAt: String(row.last_seen_at),
    online: Number.isFinite(seen) && Date.now() - seen < 45_000,
  };
}

async function db() {
  const { getSql } = await import("@/lib/db");
  return getSql();
}

async function enrollUser(userId: string, courseId: CourseId) {
  const sql = await db();
  await sql`
    insert into user_progress (user_id, enrolled_course_id, updated_at)
    values (${userId}, ${courseId}, now())
    on conflict (user_id) do update set
      enrolled_course_id = excluded.enrolled_course_id,
      updated_at = now()
  `;
}

async function loadView(sessionId: string, userId: string): Promise<LiveClassView | null> {
  const sql = await db();
  const sessions = await sql<SessionRow>`
    select id, host_user_id, course_id, title, status, current_module_id, current_slide, created_at
    from live_sessions
    where id = ${sessionId}
    limit 1
  `;
  const row = sessions[0];
  if (!row || row.status !== "live") return null;

  const members = await sql<MemberRow>`
    select user_id, display_name, role, joined_at, last_seen_at
    from session_members
    where session_id = ${sessionId}
    order by case when role = 'host' then 0 else 1 end, joined_at asc
  `;
  const me = members.find((m) => m.user_id === userId);
  if (!me) return null;

  return {
    session: mapSession(row),
    role: me.role === "host" ? "host" : "participant",
    members: members.map(mapMember),
    memberCount: members.length,
  };
}

async function allocateCode(): Promise<string> {
  const sql = await db();
  for (let i = 0; i < 8; i += 1) {
    const id = randomCode();
    const existing = await sql<{ id: string }>`select id from live_sessions where id = ${id} limit 1`;
    if (existing.length === 0) return id;
  }
  throw new Error("Could not allocate a class code.");
}

export const peekLiveClass = createServerFn({ method: "POST" })
  .validator((input: { code: string }) => normalizeCode(input.code))
  .handler(async ({ data: code }): Promise<LiveClassPeek | null> => {
    if (code.length !== 6) return null;
    const sql = await db();
    const sessions = await sql<SessionRow>`
      select id, host_user_id, course_id, title, status, current_module_id, current_slide, created_at
      from live_sessions
      where id = ${code}
      limit 1
    `;
    const row = sessions[0];
    if (!row) return null;
    const counts = await sql<{ n: number }>`
      select count(*)::int as n from session_members where session_id = ${row.id}
    `;
    return {
      id: row.id,
      courseId: asCourseId(row.course_id),
      title: row.title || getCourse(row.course_id)?.title || "Live class",
      status: row.status === "ended" ? "ended" : "live",
      currentModuleId: row.current_module_id,
      currentSlide: Number(row.current_slide) || 0,
      memberCount: Number(counts[0]?.n ?? 0),
    };
  });

export const createLiveClass = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { courseId: string; displayName?: string }) => ({
    courseId: asCourseId(input.courseId),
    displayName: cleanName(input.displayName),
  }))
  .handler(async ({ context, data }): Promise<LiveClassView> => {
    const sql = await db();
    const course = getCourse(data.courseId)!;
    const first = course.sessions[0]?.moduleIds[0] ?? null;

    const existing = await sql<SessionRow>`
      select id, host_user_id, course_id, title, status, current_module_id, current_slide, created_at
      from live_sessions
      where host_user_id = ${context.userId} and status = 'live'
      order by created_at desc
      limit 1
    `;
    const open = existing[0];
    if (open && open.course_id === data.courseId) {
      await sql`
        insert into session_members (session_id, user_id, display_name, role, last_seen_at)
        values (${open.id}, ${context.userId}, ${data.displayName}, 'host', now())
        on conflict (session_id, user_id) do update
          set display_name = excluded.display_name,
              role = 'host',
              last_seen_at = now()
      `;
      await enrollUser(context.userId, data.courseId);
      const view = await loadView(open.id, context.userId);
      if (!view) throw new Error("Could not reopen the live class.");
      return view;
    }

    if (open) {
      await sql`
        update live_sessions
        set status = 'ended', ended_at = now()
        where id = ${open.id} and host_user_id = ${context.userId}
      `;
    }

    const id = await allocateCode();
    const title = `${course.title} · live`;
    await sql`
      insert into live_sessions (id, host_user_id, course_id, title, status, current_module_id, current_slide)
      values (${id}, ${context.userId}, ${data.courseId}, ${title}, 'live', ${first}, 0)
    `;
    await sql`
      insert into session_members (session_id, user_id, display_name, role)
      values (${id}, ${context.userId}, ${data.displayName}, 'host')
    `;
    await enrollUser(context.userId, data.courseId);
    const view = await loadView(id, context.userId);
    if (!view) throw new Error("Class was created but could not be loaded.");
    return view;
  });

export const joinLiveClass = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { code: string; displayName?: string }) => ({
    code: normalizeCode(input.code),
    displayName: cleanName(input.displayName),
  }))
  .handler(async ({ context, data }): Promise<LiveClassView> => {
    if (data.code.length !== 6) throw new Error("Enter the 6-character class code.");
    const sql = await db();
    const sessions = await sql<SessionRow>`
      select id, host_user_id, course_id, title, status, current_module_id, current_slide, created_at
      from live_sessions
      where id = ${data.code}
      limit 1
    `;
    const row = sessions[0];
    if (!row) throw new Error("No class found for that code.");
    if (row.status !== "live") throw new Error("This class has already closed.");

    const role = row.host_user_id === context.userId ? "host" : "participant";
    await sql`
      insert into session_members (session_id, user_id, display_name, role, last_seen_at)
      values (${row.id}, ${context.userId}, ${data.displayName}, ${role}, now())
      on conflict (session_id, user_id) do update
        set display_name = excluded.display_name,
            last_seen_at = now()
    `;
    await enrollUser(context.userId, asCourseId(row.course_id));
    const view = await loadView(row.id, context.userId);
    if (!view) throw new Error("Could not join this class.");
    return view;
  });

export const getMyEndedClass = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<ClosedClass | null> => {
    const sql = await db();
    const rows = await sql<{
      id: string;
      course_id: string;
      title: string;
      created_at: string;
      ended_at: string | null;
      has_booklet: boolean | number | string;
    }>`
      select s.id, s.course_id, s.title, s.created_at, s.ended_at,
        exists(
          select 1 from booklet_submissions b
          where b.session_id = s.id and b.user_id = ${context.userId}
        ) as has_booklet
      from live_sessions s
      join session_members m on m.session_id = s.id
      where m.user_id = ${context.userId}
        and m.role = 'participant'
        and s.status = 'ended'
      order by s.ended_at desc nulls last, s.created_at desc
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    const course = getCourse(row.course_id);
    if (!course) return null;
    return {
      id: row.id,
      courseId: course.id,
      title: row.title || course.title,
      createdAt: String(row.created_at),
      endedAt: row.ended_at ? String(row.ended_at) : String(row.created_at),
      hasBooklet: Boolean(row.has_booklet) && row.has_booklet !== "0" && row.has_booklet !== 0,
    };
  });

export const getMyLiveClass = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<LiveClassView | null> => {
    const sql = await db();
    const rows = await sql<SessionRow>`
      select s.id, s.host_user_id, s.course_id, s.title, s.status, s.current_module_id, s.current_slide, s.created_at
      from live_sessions s
      join session_members m on m.session_id = s.id
      where m.user_id = ${context.userId} and s.status = 'live'
      order by m.joined_at desc
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    await sql`
      update session_members
      set last_seen_at = now()
      where session_id = ${row.id} and user_id = ${context.userId}
    `;
    return loadView(row.id, context.userId);
  });

export type LivePosition = {
  sessionId: string;
  moduleId: string | null;
  slide: number;
  role: "host" | "participant";
};

/** Lightweight, uncacheable position read so participant slides move with the presenter. */
export const pullLivePosition = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<LivePosition | null> => {
    const sql = await db();
    const rows = await sql<{
      id: string;
      current_module_id: string | null;
      current_slide: number | string;
      role: string;
    }>`
      select s.id, s.current_module_id, s.current_slide, m.role
      from live_sessions s
      join session_members m on m.session_id = s.id
      where m.user_id = ${context.userId} and s.status = 'live'
      order by m.joined_at desc
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    await sql`
      update session_members
      set last_seen_at = now()
      where session_id = ${row.id} and user_id = ${context.userId}
    `;
    return {
      sessionId: row.id,
      moduleId: row.current_module_id,
      slide: Number(row.current_slide) || 0,
      role: row.role === "host" ? "host" : "participant",
    };
  });

export const broadcastLivePosition = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { code: string; moduleId: string; slide: number }) => {
    const moduleId = input.moduleId.trim();
    if (!getModule(moduleId)) throw new Error("Unknown module.");
    return {
      code: normalizeCode(input.code),
      moduleId,
      slide: Math.max(0, Math.min(80, Math.floor(Number(input.slide) || 0))),
    };
  })
  .handler(async ({ context, data }) => {
    const sql = await db();
    const updated = await sql<{ id: string }>`
      update live_sessions
      set current_module_id = ${data.moduleId}, current_slide = ${data.slide}
      where id = ${data.code} and host_user_id = ${context.userId} and status = 'live'
      returning id
    `;
    if (updated.length === 0) throw new Error("Only the presenter can move the class.");
    return { ok: true as const };
  });

export const endLiveClass = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((code: string) => normalizeCode(code))
  .handler(async ({ context, data: code }) => {
    const sql = await db();
    const updated = await sql<{ id: string }>`
      update live_sessions
      set status = 'ended', ended_at = now()
      where id = ${code} and host_user_id = ${context.userId} and status = 'live'
      returning id
    `;
    if (updated.length === 0) throw new Error("Only the presenter can close this class.");
    return { ok: true as const };
  });

export const leaveLiveClass = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((code: string) => normalizeCode(code))
  .handler(async ({ context, data: code }) => {
    const sql = await db();
    const rows = await sql<{ role: string }>`
      select role from session_members
      where session_id = ${code} and user_id = ${context.userId}
      limit 1
    `;
    const me = rows[0];
    if (!me) return { ok: true as const };
    if (me.role === "host") {
      throw new Error("The presenter closes the class rather than leaving it.");
    }
    await sql`
      delete from session_members
      where session_id = ${code} and user_id = ${context.userId}
    `;
    return { ok: true as const };
  });

type ProgressLite = {
  diagnostic_submitted: string | null;
  workbook: string | null;
  completed_modules: string | null;
};

function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const getClassRoster = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { code: string }) => normalizeCode(input.code))
  .handler(async ({ context, data: code }): Promise<RosterRow[]> => {
    const sql = await db();
    const sessions = await sql<SessionRow>`
      select id, host_user_id, course_id, title, status, current_module_id, current_slide, created_at
      from live_sessions
      where id = ${code}
      limit 1
    `;
    const row = sessions[0];
    if (!row || row.host_user_id !== context.userId) {
      throw new Error("Only the presenter can see the class roster.");
    }
    const course = getCourse(row.course_id);
    const courseIds = course ? courseModuleIds(course) : [];
    const members = await sql<MemberRow & ProgressLite>`
      select
        m.user_id,
        m.display_name,
        m.role,
        m.joined_at,
        m.last_seen_at,
        p.diagnostic_submitted,
        p.workbook,
        p.completed_modules
      from session_members m
      left join user_progress p on p.user_id = m.user_id
      where m.session_id = ${code}
      order by case when m.role = 'host' then 0 else 1 end, m.joined_at asc
    `;
    return members.map((m) => {
      const submitted = parseJson<Record<string, boolean>>(m.diagnostic_submitted, {});
      const workbook = parseJson<Record<string, string>>(m.workbook, {});
      const completed = parseJson<string[]>(m.completed_modules, []);
      const filled = Object.values(workbook).filter((v) => String(v).trim()).length;
      const completedInCourse = courseIds.length
        ? completed.filter((id) => courseIds.includes(id)).length
        : completed.length;
      const seen = new Date(m.last_seen_at).getTime();
      return {
        userId: m.user_id,
        displayName: m.display_name || "Participant",
        role: m.role === "host" ? "host" : "participant",
        online: Number.isFinite(seen) && Date.now() - seen < 45_000,
        diagnosticPre: Boolean(submitted.pre),
        workbookFilled: filled,
        completedInCourse,
        courseModuleCount: courseIds.length || 23,
      };
    });
  });

