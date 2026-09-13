import { useEffect } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useLiveClass } from "@/components/live/provider";
import { getCourse } from "@/lib/content/courses";
import { getModule } from "@/lib/content/modules";
import { courseHasModule } from "@/lib/content/path";

/** After the presenter ends the class, participants cannot reopen those slides. */
export function CourseLock() {
  const live = useLiveClass();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (live.view) return;
    const closed = live.closed;
    if (!closed) return;
    const course = getCourse(closed.courseId);
    if (!course) return;
    if (pathname === "/closed") return;

    const onWorkbook = pathname === "/workbook" || pathname.startsWith("/workbook/");
    const onCourse = pathname === `/courses/${closed.courseId}`;
    const moduleMatch = pathname.match(/^\/modules\/([^/]+)$/);
    const slug = moduleMatch?.[1];
    const mod = slug ? getModule(slug) : undefined;
    const onClosedCourse =
      onWorkbook || onCourse || (mod ? courseHasModule(course, mod.id) : false);

    if (!onClosedCourse) return;
    void navigate({ to: "/closed" });
  }, [live.view, live.closed, pathname, navigate]);

  return null;
}

/** Shown on the desk after the presenter has locked the room. */
export function ClosedNotice() {
  const live = useLiveClass();
  if (live.view || !live.closed) return null;
  const course = getCourse(live.closed.courseId);

  return (
    <Link
      to="/closed"
      className="mb-8 block rounded-xl bg-red-bg p-6 text-ink shadow-[var(--shadow-border)] sm:p-8"
    >
      <p className="text-[11px] uppercase tracking-[0.16em] text-red">Class ended</p>
      <h2 className="mt-1 font-display text-3xl">{course?.title ?? live.closed.title} is locked.</h2>
      <p className="mt-3 max-w-xl text-ink-soft">
        The presenter ended this course. You cannot reopen the slides. Open your certificate, or
        send the booklet if you have not yet.
      </p>
      <p className="mt-4 text-sm font-medium text-red">See what is still open</p>
    </Link>
  );
}
