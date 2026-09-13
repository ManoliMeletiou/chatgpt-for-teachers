import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLiveClass } from "@/components/live/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCourse, type Course } from "@/lib/content/courses";
import { getModule } from "@/lib/content/modules";
import {
  courseModuleIds,
  focusAreasFromDiagnostic,
  sessionForModule,
  stepFilledCount,
  workbookStepForModule,
  workbookStepsForCourse,
} from "@/lib/content/path";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CourseToday({ variant = "desk" }: { variant?: "desk" | "room" }) {
  const live = useLiveClass();
  const enrolled = useAppStore((s) => s.enrolledCourseId);
  const completed = useAppStore((s) => s.completedModules);
  const workbook = useAppStore((s) => s.workbook);
  const setWorkbook = useAppStore((s) => s.setWorkbook);
  const pre = useAppStore((s) => s.diagnostic.pre);
  const preDone = useAppStore((s) => s.diagnosticSubmitted.pre);
  const courseId = live.view?.session.courseId ?? enrolled;
  const course = courseId ? getCourse(courseId) : undefined;
  const liveModuleId = live.view?.session.currentModuleId ?? null;
  const liveMod = liveModuleId ? getModule(liveModuleId) : undefined;
  const goal = (workbook.workflow ?? "").trim();
  const steps = workbookStepsForCourse(course);
  const filled = steps.reduce((n, s) => n + stepFilledCount(s, workbook), 0);
  const totalFields = steps.reduce((n, s) => n + s.fields.length, 0);
  const ids = course ? courseModuleIds(course) : [];
  const doneInCourse = ids.filter((id) => completed.includes(id)).length;
  const focus = preDone ? focusAreasFromDiagnostic(pre, course) : [];
  const currentSession = course && liveModuleId ? sessionForModule(course, liveModuleId) : course?.sessions[0];

  if (!course) return null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          {variant === "room" ? "In the room with the presenter" : course.kicker}
        </p>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl">{course.title}</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          {live.view && !live.isHost
            ? "Follow the slides. The booklet is one tap away and saves as you write."
            : "Materials and booklet for this route. Saved to your signed-in account."}
        </p>

        {liveMod && (
          <div className="mt-6 rounded-lg bg-accent-soft p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-accent">Now</p>
            <p className="mt-1 font-display text-xl text-ink">
              Module {liveMod.id} · {liveMod.title}
            </p>
            {currentSession && (
              <p className="mt-1 text-sm text-ink-soft">{currentSession.title}</p>
            )}
            <Button asChild className="mt-4">
              <Link to="/modules/$moduleId" params={{ moduleId: liveMod.slug }}>
                Open the lesson
                <ArrowRight />
              </Link>
            </Button>
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Modules on this route" value={`${doneInCourse} / ${ids.length}`} />
          <Stat label="Booklet fields" value={`${filled} / ${totalFields}`} />
          <Stat label="PRE diagnostic" value={preDone ? "Submitted" : "Not yet"} />
        </div>
      </div>

      <GoalEditor goal={goal} onChange={(v) => setWorkbook("workflow", v)} />

      {preDone && focus.length > 0 && <FocusList course={course} areas={focus} />}

      {!preDone && (
        <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Start here</p>
          <h3 className="mt-1 font-display text-xl">Opening diagnostic</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Twelve professional judgements. Weaker ratings become the booklet steps we recommend
            — not a grade.
          </p>
          <Button asChild className="mt-4">
            <Link to="/diagnostic">Take the PRE diagnostic</Link>
          </Button>
        </div>
      )}

      <CourseTimeline course={course} liveModuleId={liveModuleId} completed={completed} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-elevated p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 font-display text-xl tabular-nums">{value}</p>
    </div>
  );
}

function GoalEditor({ goal, onChange }: { goal: string; onChange: (v: string) => void }) {
  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <Label htmlFor="teaching-goal">Your teaching goal for this course</Label>
      <p className="mt-1 text-sm text-ink-soft">
        One workflow you want ChatGPT to improve. The booklet stays pointed at this.
      </p>
      <Input
        id="teaching-goal"
        className="mt-3"
        value={goal}
        placeholder="e.g. retrieval starters for Year 9 science, without real student names"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function FocusList({
  course,
  areas,
}: {
  course: Course;
  areas: ReturnType<typeof focusAreasFromDiagnostic>;
}) {
  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">From your diagnostic</p>
      <h3 className="mt-1 font-display text-xl">Practise these on this route</h3>
      <ul className="mt-4 space-y-3">
        {areas.map((a) => {
          const mod = getModule(a.moduleIds[0] ?? "");
          return (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{a.label}</p>
                <p className="text-sm text-muted">Rated {a.score} / 5 · still developing</p>
              </div>
              {mod && (
                <Button asChild size="sm" variant="secondary">
                  <Link to="/modules/$moduleId" params={{ moduleId: mod.slug }}>
                    Module {mod.id}
                  </Link>
                </Button>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-sm text-muted">
        During a live class the presenter still leads. {course.title} does not skip the mandatory
        safety core.
      </p>
    </div>
  );
}

function CourseTimeline({
  course,
  liveModuleId,
  completed,
}: {
  course: Course;
  liveModuleId: string | null;
  completed: string[];
}) {
  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <h3 className="font-display text-xl">Today’s programme</h3>
      <p className="mt-1 text-sm text-ink-soft">
        {course.coverage === "selective"
          ? "Selected live blocks. The rest of the curriculum stays as reference."
          : "Full route. Work through each block with the presenter, or later at your own pace."}
      </p>
      <ol className="mt-4 space-y-2">
        {course.sessions.map((s, i) => {
          const active = liveModuleId ? s.moduleIds.includes(liveModuleId) : i === 0;
          const allDone = s.moduleIds.every((id) => completed.includes(id));
          const first = s.moduleIds[0] ? getModule(s.moduleIds[0]) : undefined;
          const step = s.moduleIds.map((id) => workbookStepForModule(id)).find(Boolean);
          return (
            <li key={s.title}>
              <div className={cn("rounded-lg px-3 py-3", active ? "bg-accent-soft" : "hover:bg-line/50")}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium">
                    <span className="mr-2 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                    {allDone ? <span className="ml-2 text-green">Done</span> : null}
                    {active && liveModuleId ? <span className="ml-2 text-accent">Now</span> : null}
                  </p>
                  <p className="text-sm text-muted">{s.duration}</p>
                </div>
                <p className="mt-1 text-sm text-ink-soft">{s.summary}</p>
                {first && (
                  <Link
                    to="/modules/$moduleId"
                    params={{ moduleId: first.slug }}
                    className="mt-3 inline-flex h-9 items-center rounded-md border border-line bg-elevated px-3 text-sm hover:border-line-strong"
                  >
                    Open this block
                    {step ? ` · ${step.title}` : ""}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
