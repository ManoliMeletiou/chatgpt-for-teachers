import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { ChevronDown, BookMarked } from "lucide-react";
import { Page } from "@/components/layout/app-shell";
import { SubmitPack } from "@/components/stage/submit-pack";
import { useLiveClass } from "@/components/live/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCourse } from "@/lib/content/courses";
import { workbookStepForModule, workbookStepsForCourse, stepFilledCount } from "@/lib/content/path";
import { capstoneChecks, thirtyDays, workbookSteps } from "@/lib/content/workbook";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/workbook")({ component: WorkbookPage });

function WorkbookPage() {
  const values = useAppStore((s) => s.workbook);
  const set = useAppStore((s) => s.setWorkbook);
  const ticks = useAppStore((s) => s.capstoneTicks);
  const toggle = useAppStore((s) => s.toggleCapstone);
  const enrolled = useAppStore((s) => s.enrolledCourseId);
  const live = useLiveClass();
  const course = getCourse(live.view?.session.courseId ?? enrolled ?? "");
  const steps = workbookStepsForCourse(course);
  const currentId = live.view?.session.currentModuleId
    ? workbookStepForModule(live.view.session.currentModuleId)?.id
    : undefined;
  const hash = useRouterState({ select: (s) => s.location.hash });
  const firstOpen =
    currentId ??
    steps.find((s) => stepFilledCount(s, values) < s.fields.length)?.id ??
    steps[0]?.id ??
    null;
  const [openId, setOpenId] = useState<string | null>(firstOpen);

  useEffect(() => {
    const id = (hash || "").replace(/^#/, "");
    if (!id) return;
    const stepId = id.replace(/^step-/, "");
    setOpenId(stepId);
    const el = document.getElementById(id.startsWith("step-") ? id : `step-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  useEffect(() => {
    if (currentId) setOpenId(currentId);
  }, [currentId]);

  const goal = (values.workflow ?? "").trim();
  const progress = useMemo(() => {
    const filledSteps = steps.filter((s) => stepFilledCount(s, values) > 0).length;
    const filledFields = steps.reduce((n, s) => n + stepFilledCount(s, values), 0);
    const totalFields = steps.reduce((n, s) => n + s.fields.length, 0);
    return { filledSteps, filledFields, totalFields };
  }, [steps, values]);

  return (
    <Page
      kicker="Your booklet"
      title={course ? `Booklet · ${course.title}` : "Write here. Send it at the end."}
      lead="One step at a time. Each prompt is numbered. During a live class the yellow box on the slide is the same booklet. Send the whole pack to the presenter when you finish."
    >
      {goal && (
        <p className="mb-6 rounded-lg bg-accent-soft px-4 py-3 text-sm text-ink">
          Your teaching goal: {goal}
        </p>
      )}

      <div className="booklet-page mb-6 pl-8 pr-5 py-5">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-amber">
          <BookMarked className="size-3.5" />
          Workshop booklet
        </p>
        <p className="mt-1 font-display text-2xl tabular-nums">
          {progress.filledSteps} / {steps.length}
          <span className="ml-2 font-sans text-sm text-muted">steps started</span>
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-amber/25">
          <div
            className="h-full bg-amber transition-[width] duration-300"
            style={{
              width: `${progress.totalFields ? Math.round((progress.filledFields / progress.totalFields) * 100) : 0}%`,
            }}
          />
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Open a step. Write on the numbered lines. During a live class the yellow page under the
          slide is this same booklet.
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((step) => {
          const now = step.id === currentId;
          const filled = stepFilledCount(step, values);
          const open = openId === step.id;
          return (
            <section
              key={step.id}
              id={`step-${step.id}`}
              className={cn(
                "scroll-mt-24 overflow-hidden rounded-xl shadow-[var(--shadow-border)]",
                now ? "bg-accent-soft" : "bg-surface",
              )}
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left sm:px-6"
                onClick={() => setOpenId(open ? null : step.id)}
                aria-expanded={open}
              >
                <span className="min-w-0">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-muted">
                    Step {step.n}
                    {now ? " · Write this now with the presenter" : ""}
                    {!now && filled > 0 ? ` · ${filled} / ${step.fields.length} filled` : ""}
                  </span>
                  <span className="mt-1 block font-display text-xl sm:text-2xl">{step.title}</span>
                  {!open && (
                    <span className="mt-1 block text-sm text-ink-soft">{step.lead}</span>
                  )}
                </span>
                <ChevronDown
                  className={cn(
                    "mt-1 size-5 shrink-0 text-muted transition-transform duration-150",
                    open && "rotate-180",
                  )}
                />
              </button>
              {open && (
                <div className="space-y-4 border-t border-line px-5 py-5 sm:px-6">
                  <p className="text-sm text-ink-soft">{step.lead}</p>
                  {step.fields.map((f, i) => (
                    <div key={f.id} className="space-y-1.5">
                      <Label htmlFor={f.id} className="flex gap-2">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-amber-bg text-[11px] font-medium text-amber">
                          {i + 1}
                        </span>
                        <span>{f.label}</span>
                      </Label>
                      {f.multiline ? (
                        <Textarea
                          id={f.id}
                          rows={3}
                          className="booklet-lines min-h-24"
                          placeholder={f.placeholder}
                          value={values[f.id] ?? ""}
                          onChange={(e) => set(f.id, e.target.value)}
                        />
                      ) : (
                        <Input
                          id={f.id}
                          className="h-12"
                          placeholder={f.placeholder}
                          value={values[f.id] ?? ""}
                          onChange={(e) => set(f.id, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {course && steps.length < workbookSteps.length && (
        <p className="mt-6 text-sm text-muted">
          Showing the booklet for {course.title}. Unused steps from longer routes stay in the full
          reference curriculum.
        </p>
      )}

      <section className="mt-10 rounded-xl border border-line bg-elevated p-6">
        <h2 className="font-display text-2xl">Capstone checklist</h2>
        <ul className="mt-4 space-y-2">
          {capstoneChecks.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => toggle(c)}
                className="flex w-full items-start gap-3 rounded-md px-2 py-2 text-left text-sm hover:bg-line/50"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border",
                    ticks[c] ? "border-green bg-green text-paper" : "border-line-strong",
                  )}
                >
                  {ticks[c] ? "✓" : ""}
                </span>
                {c}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl">First 30 days</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {thirtyDays.map((w) => (
            <div key={w.week} className="rounded-lg border border-line bg-surface p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{w.week}</p>
              <p className="mt-1 font-medium">{w.action}</p>
              <p className="mt-1 text-sm text-ink-soft">{w.evidence}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <SubmitPack />
      </div>

      <Button
        className="mt-8"
        variant="outline"
        onClick={() => {
          const blob = new Blob(
            [
              workbookSteps
                .map((s) => {
                  const body = s.fields
                    .map((f) => `${f.label}\n${values[f.id] ?? ""}`)
                    .join("\n\n");
                  return `## ${s.n} ${s.title}\n${s.lead}\n\n${body}`;
                })
                .join("\n\n---\n\n"),
            ],
            { type: "text/plain" },
          );
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "teacher-ai-workbook.txt";
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Download my notes
      </Button>
    </Page>
  );
}
