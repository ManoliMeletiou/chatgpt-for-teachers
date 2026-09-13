import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Page } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/lib/content/courses";
import { getModule } from "@/lib/content/modules";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/courses/$courseId")({
  component: CourseDetail,
});

function CourseDetail() {
  const { courseId } = Route.useParams();
  const course = getCourse(courseId);
  if (!course) throw notFound();
  const enroll = useAppStore((s) => s.enroll);
  const enrolled = useAppStore((s) => s.enrolledCourseId);
  const completed = useAppStore((s) => s.completedModules);
  const first = course.sessions[0]?.moduleIds[0];
  const firstMod = first ? getModule(first) : undefined;

  return (
    <Page
      kicker={course.kicker}
      title={course.title}
      lead={course.summary}
      actions={
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => enroll(course.id)}>
            {enrolled === course.id ? "Enrolled" : "Enrol on this route"}
          </Button>
          <Button asChild variant="secondary">
            <Link to="/class" search={{ courseId: course.id }}>
              Open a live class
            </Link>
          </Button>
          {firstMod && (
            <Button asChild variant="secondary">
              <Link to="/modules/$moduleId" params={{ moduleId: firstMod.slug }}>
                Start first module
                <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      }
    >
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <Meta label="Duration" value={course.duration} />
        <Meta label="Deck" value={course.slides} />
        <Meta label="Best for" value={course.bestFor} />
      </div>

      <p className="mb-6 max-w-3xl text-sm text-ink-soft">
        <span className="font-medium text-ink">Pace. </span>
        {course.pace}
      </p>

      <ol className="space-y-3">
        {course.sessions.map((s, i) => (
          <li key={s.title} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl">
                <span className="mr-2 text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span>{s.title}</span>
              </h2>
              <Badge variant="muted">{s.duration}</Badge>
            </div>
            <p className="mt-2 text-sm text-ink-soft">{s.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.moduleIds.map((id) => {
                const m = getModule(id);
                if (!m) return null;
                const done = completed.includes(m.id);
                return (
                  <Link
                    key={id}
                    to="/modules/$moduleId"
                    params={{ moduleId: m.slug }}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-elevated px-3 text-sm hover:border-line-strong"
                  >
                    {done && <Check className="size-3.5 text-green" />}
                    {m.id} {m.title}
                  </Link>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </Page>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 text-sm leading-snug">{value}</p>
    </div>
  );
}
