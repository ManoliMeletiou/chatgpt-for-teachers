import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Page } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/content/courses";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/courses/")({ component: CoursesPage });

function CoursesPage() {
  const enrolled = useAppStore((s) => s.enrolledCourseId);

  return (
    <Page
      kicker="Delivery routes"
      title="Choose the format that fits the diary."
      lead="All five routes teach that ChatGPT may be unapproved, that training does not approve it, and that consequential decisions stay human. The 1-hour maths hour is the department meeting."
    >
      <div className="grid gap-4">
        {courses.map((c) => (
          <Link
            key={c.id}
            to="/courses/$courseId"
            params={{ courseId: c.id }}
            className="block rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-border-hover)] sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{c.kicker}</p>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl">{c.title}</h2>
              </div>
              <div className="flex gap-2">
                {enrolled === c.id && <Badge>Enrolled</Badge>}
                <Badge variant="muted">{c.contact}</Badge>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-ink-soft">{c.summary}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Open route <ArrowRight className="size-3.5" />
            </p>
          </Link>
        ))}
      </div>
    </Page>
  );
}
