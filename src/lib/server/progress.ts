import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getCourse, type CourseId } from "@/lib/content/courses";
import { emptyProgress, type ProgressSnapshot } from "@/lib/progress-types";

type ProgressRow = {
  enrolled_course_id: string | null;
  completed_modules: string;
  module_slide: string;
  diagnostic: string;
  diagnostic_submitted: string;
  workbook: string;
  capstone_ticks: string;
  bookmarked_prompts: string;
  practice_history: string;
  clinic: string;
  certificate_name: string;
  certificate_role: string;
  certificate_school: string;
  certificate_issued_at: string | null;
};

function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function clipText(value: unknown, max: number): string {
  return String(value ?? "").slice(0, max);
}

function sanitize(input: ProgressSnapshot): ProgressSnapshot {
  const courseId = input.enrolledCourseId;
  const enrolled =
    courseId && getCourse(courseId) ? (courseId as CourseId) : null;
  const workbook: Record<string, string> = {};
  for (const [k, v] of Object.entries(input.workbook ?? {})) {
    if (Object.keys(workbook).length >= 48) break;
    workbook[clipText(k, 64)] = clipText(v, 8000);
  }
  return {
    enrolledCourseId: enrolled,
    completedModules: (input.completedModules ?? []).map((id) => clipText(id, 8)).slice(0, 40),
    moduleSlide: Object.fromEntries(
      Object.entries(input.moduleSlide ?? {})
        .slice(0, 40)
        .map(([k, v]) => [clipText(k, 8), Math.max(0, Math.min(40, Number(v) || 0))]),
    ),
    diagnostic: {
      pre: input.diagnostic?.pre ?? {},
      post: input.diagnostic?.post ?? {},
    },
    diagnosticSubmitted: {
      pre: Boolean(input.diagnosticSubmitted?.pre),
      post: Boolean(input.diagnosticSubmitted?.post),
    },
    workbook,
    capstoneTicks: input.capstoneTicks ?? {},
    bookmarkedPrompts: (input.bookmarkedPrompts ?? []).map((id) => clipText(id, 64)).slice(0, 40),
    practiceHistory: (input.practiceHistory ?? []).slice(0, 12).map((t) => ({
      prompt: clipText(t.prompt, 4000),
      reply: clipText(t.reply, 8000),
      at: Number(t.at) || 0,
    })),
    clinic: (input.clinic ?? []).slice(0, 24).map((c) => ({
      id: clipText(c.id, 64),
      picked: c.picked,
      correct: Boolean(c.correct),
    })),
    certificateName: clipText(input.certificateName, 120),
    certificateRole: clipText(input.certificateRole, 80) || "Teacher",
    certificateSchool: clipText(input.certificateSchool, 160),
    certificateIssuedAt: input.certificateIssuedAt ? clipText(input.certificateIssuedAt, 40) : null,
  };
}

function rowToSnapshot(row: ProgressRow): ProgressSnapshot {
  const base = emptyProgress();
  const enrolled = row.enrolled_course_id && getCourse(row.enrolled_course_id)
    ? (row.enrolled_course_id as CourseId)
    : null;
  return {
    enrolledCourseId: enrolled,
    completedModules: parseJson(row.completed_modules, base.completedModules),
    moduleSlide: parseJson(row.module_slide, base.moduleSlide),
    diagnostic: parseJson(row.diagnostic, base.diagnostic),
    diagnosticSubmitted: parseJson(row.diagnostic_submitted, base.diagnosticSubmitted),
    workbook: parseJson(row.workbook, base.workbook),
    capstoneTicks: parseJson(row.capstone_ticks, base.capstoneTicks),
    bookmarkedPrompts: parseJson(row.bookmarked_prompts, base.bookmarkedPrompts),
    practiceHistory: parseJson(row.practice_history, base.practiceHistory),
    clinic: parseJson(row.clinic, base.clinic),
    certificateName: row.certificate_name ?? "",
    certificateRole: row.certificate_role || "Teacher",
    certificateSchool: row.certificate_school ?? "",
    certificateIssuedAt: row.certificate_issued_at,
  };
}

export const loadProgress = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<ProgressSnapshot | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<ProgressRow>`
      select enrolled_course_id, completed_modules, module_slide, diagnostic, diagnostic_submitted,
             workbook, capstone_ticks, bookmarked_prompts, practice_history, clinic,
             certificate_name, certificate_role, certificate_school, certificate_issued_at
      from user_progress
      where user_id = ${context.userId}
      limit 1
    `;
    const row = rows[0];
    return row ? rowToSnapshot(row) : null;
  });

export const saveProgress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: ProgressSnapshot) => sanitize(input))
  .handler(async ({ context, data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`
      insert into user_progress (
        user_id, enrolled_course_id, completed_modules, module_slide, diagnostic, diagnostic_submitted,
        workbook, capstone_ticks, bookmarked_prompts, practice_history, clinic,
        certificate_name, certificate_role, certificate_school, certificate_issued_at, updated_at
      ) values (
        ${context.userId},
        ${data.enrolledCourseId},
        ${JSON.stringify(data.completedModules)},
        ${JSON.stringify(data.moduleSlide)},
        ${JSON.stringify(data.diagnostic)},
        ${JSON.stringify(data.diagnosticSubmitted)},
        ${JSON.stringify(data.workbook)},
        ${JSON.stringify(data.capstoneTicks)},
        ${JSON.stringify(data.bookmarkedPrompts)},
        ${JSON.stringify(data.practiceHistory)},
        ${JSON.stringify(data.clinic)},
        ${data.certificateName},
        ${data.certificateRole},
        ${data.certificateSchool},
        ${data.certificateIssuedAt},
        now()
      )
      on conflict (user_id) do update set
        enrolled_course_id = excluded.enrolled_course_id,
        completed_modules = excluded.completed_modules,
        module_slide = excluded.module_slide,
        diagnostic = excluded.diagnostic,
        diagnostic_submitted = excluded.diagnostic_submitted,
        workbook = excluded.workbook,
        capstone_ticks = excluded.capstone_ticks,
        bookmarked_prompts = excluded.bookmarked_prompts,
        practice_history = excluded.practice_history,
        clinic = excluded.clinic,
        certificate_name = excluded.certificate_name,
        certificate_role = excluded.certificate_role,
        certificate_school = excluded.certificate_school,
        certificate_issued_at = excluded.certificate_issued_at,
        updated_at = now()
    `;
    return { ok: true as const };
  });
