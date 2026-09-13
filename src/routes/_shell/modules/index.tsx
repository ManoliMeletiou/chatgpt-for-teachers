import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { getCourse } from "@/lib/content/courses";
import { getModule, modules, strandLabel, type Strand } from "@/lib/content/modules";
import { courseModuleIds, workbookStepForModule } from "@/lib/content/path";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/modules/")({ component: ModulesPage });

const order: Strand[] = ["foundations", "practice", "legal", "capstone"];

function ModulesPage() {
  const completed = useAppStore((s) => s.completedModules);
  const enrolled = useAppStore((s) => s.enrolledCourseId);
  const course = enrolled ? getCourse(enrolled) : undefined;
  const onRoute = course ? new Set(courseModuleIds(course)) : null;

  return (
    <Page
      kicker={course ? course.title : `${modules.length} modules`}
      title={course ? "Your course materials." : "The full professional curriculum."}
      lead={
        course
          ? "The live route you joined. Follow the presenter through these blocks; the rest of the set stays below as reference."
          : "Targeted CPD or follow-up after a course route. Each module is a short, self-contained lesson with the Netherlands safe-and-legal core running through it."
      }
    >
      {course && (
        <section className="mb-12">
          <ol className="space-y-3">
            {course.sessions.map((s, i) => (
              <li key={s.title} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl">
                    <span className="mr-2 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <Badge variant="muted">{s.duration}</Badge>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{s.summary}</p>
                <ul className="mt-4 grid gap-2">
                  {s.moduleIds.map((id) => {
                    const m = getModule(id);
                    if (!m) return null;
                    const done = completed.includes(m.id);
                    const step = workbookStepForModule(m.id);
                    return (
                      <li key={id}>
                        <Link
                          to="/modules/$moduleId"
                          params={{ moduleId: m.slug }}
                          className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-line/60"
                        >
                          <span
                            className={cn(
                              "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md font-display text-sm tabular-nums",
                              done ? "bg-green-bg text-green" : "bg-accent-soft text-accent",
                            )}
                          >
                            {m.id}
                          </span>
                          <span className="min-w-0">
                            <span className="font-medium">{m.title}</span>
                            <span className="mt-0.5 block text-sm text-ink-soft">
                              {m.blurb}
                              {step ? ` · Booklet: ${step.title}` : ""}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section>
        <h2 className="mb-1 font-display text-2xl">
          {course ? `Full ${modules.length}-module reference` : "All modules"}
        </h2>
        {course && (
          <p className="mb-6 max-w-2xl text-sm text-ink-soft">
            Always available on this account. Shorter live routes compress examples — they never drop
            the mandatory safety core.
          </p>
        )}
        {order.map((strand) => (
          <section key={strand} className="mb-10">
            <h3 className="mb-3 font-display text-xl">{strandLabel[strand]}</h3>
            <div className="grid gap-3">
              {modules
                .filter((m) => m.strand === strand)
                .map((m) => {
                  const done = completed.includes(m.id);
                  const live = onRoute?.has(m.id);
                  return (
                    <Link
                      key={m.id}
                      to="/modules/$moduleId"
                      params={{ moduleId: m.slug }}
                      className="flex items-start gap-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-border-hover)] sm:p-5"
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md font-display text-sm tabular-nums",
                          done ? "bg-green-bg text-green" : "bg-accent-soft text-accent",
                        )}
                      >
                        {m.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{m.title}</h3>
                          <Badge variant="muted">{m.duration}</Badge>
                          {done && <Badge variant="green">Complete</Badge>}
                          {live && <Badge>On your route</Badge>}
                        </div>
                        <p className="mt-1 text-sm text-ink-soft">{m.blurb}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </section>
        ))}
      </section>
    </Page>
  );
}
