import { Link, createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { diagnosticItems, scaleLabels, type DiagnosticKind } from "@/lib/content/diagnostic";
import { getCourse } from "@/lib/content/courses";
import { getModule } from "@/lib/content/modules";
import { focusAreasFromDiagnostic } from "@/lib/content/path";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/_shell/diagnostic")({ component: DiagnosticPage });

function DiagnosticPage() {
  const [kind, setKind] = useState<DiagnosticKind>("pre");
  const answers = useAppStore((s) => s.diagnostic[kind]);
  const submitted = useAppStore((s) => s.diagnosticSubmitted[kind]);
  const set = useAppStore((s) => s.setDiagnostic);
  const submit = useAppStore((s) => s.submitDiagnostic);
  const pre = useAppStore((s) => s.diagnostic.pre);
  const post = useAppStore((s) => s.diagnostic.post);
  const preSubmitted = useAppStore((s) => s.diagnosticSubmitted.pre);
  const postSubmitted = useAppStore((s) => s.diagnosticSubmitted.post);
  const enrolled = useAppStore((s) => s.enrolledCourseId);
  const course = enrolled ? getCourse(enrolled) : undefined;
  const complete = diagnosticItems.every((i) => typeof answers[i.id] === "number");
  const avg = (obj: Record<string, number>) => {
    const vals = Object.values(obj);
    if (!vals.length) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };
  const focus = preSubmitted ? focusAreasFromDiagnostic(pre, course) : [];

  return (
    <Page
      kicker="PRE / POST diagnostic"
      title="Where are you now — and what moved?"
      lead="Twelve professional judgements on a 1–5 scale. Ratings of 1–3 become recommended booklet steps on the course you joined. This is not a high-stakes test and not a compliance certificate."
    >
      <div className="mb-6 flex gap-2">
        {(["pre", "post"] as DiagnosticKind[]).map((k) => (
          <Button
            key={k}
            variant={kind === k ? "default" : "secondary"}
            onClick={() => setKind(k)}
          >
            {k === "pre" ? "PRE" : "POST"}
          </Button>
        ))}
      </div>

      <ol className="space-y-4">
        {diagnosticItems.map((item, n) => (
          <li key={item.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="text-sm font-medium">
              <span className="mr-2 text-muted tabular-nums">{String(n + 1).padStart(2, "0")}</span>
              {item.prompt}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => set(kind, item.id, v)}
                  className={cn(
                    "h-11 min-w-11 rounded-md px-3 text-sm tabular-nums",
                    answers[item.id] === v
                      ? "bg-accent text-accent-fg"
                      : "bg-elevated text-ink-soft shadow-[var(--shadow-border)]",
                  )}
                  aria-label={scaleLabels[v - 1]}
                >
                  {v}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[12px] text-muted">
              {typeof answers[item.id] === "number" ? scaleLabels[answers[item.id] - 1] : "Select a rating"}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button disabled={!complete} onClick={() => submit(kind)}>
          {submitted ? "Update submission" : "Submit diagnostic"}
        </Button>
        {!complete && <p className="text-sm text-muted">Rate every item to submit.</p>}
      </div>

      {(preSubmitted || postSubmitted) && (
        <div className="mt-10 rounded-xl border border-line bg-elevated p-6">
          <h2 className="font-display text-2xl">Movement</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Average PRE {avg(pre).toFixed(1)} · POST {avg(post).toFixed(1)} on a 5-point scale.
            Use this to choose which modules to revisit — not as a grade.
          </p>
          {focus.length > 0 && (
            <ul className="mt-5 space-y-3">
              {focus.map((a) => {
                const mod = getModule(a.moduleIds[0] ?? "");
                return (
                  <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span>
                      {a.label}
                      <span className="text-muted"> · rated {a.score}/5</span>
                    </span>
                    {mod && (
                      <Link
                        to="/modules/$moduleId"
                        params={{ moduleId: mod.slug }}
                        className="text-accent underline-offset-4 hover:underline"
                      >
                        Module {mod.id}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </Page>
  );
}
