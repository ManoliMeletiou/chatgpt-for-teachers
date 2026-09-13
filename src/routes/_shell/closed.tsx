import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/layout/app-shell";
import { SubmitPack } from "@/components/stage/submit-pack";
import { useLiveClass } from "@/components/live/provider";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/lib/content/courses";
import { formatClassDay, formatElapsed } from "@/components/live/session-records";

export const Route = createFileRoute("/_shell/closed")({
  component: ClosedClassPage,
});

function ClosedClassPage() {
  const live = useLiveClass();
  const closed = live.closed;
  const course = closed ? getCourse(closed.courseId) : undefined;

  if (!closed) {
    return (
      <Page
        kicker="Class closed"
        title="No closed class on this account."
        lead="When the presenter ends the course, you land here instead of the slides."
      >
        <Button asChild>
          <Link to="/desk">Back to the desk</Link>
        </Button>
      </Page>
    );
  }

  const day = formatClassDay(closed.endedAt || closed.createdAt);
  const lasted = formatElapsed(closed.createdAt, closed.endedAt);

  return (
    <Page
      kicker="Class closed"
      title="This class has ended."
      lead={`${course?.title ?? closed.title} is locked. You cannot reopen the slides.`}
    >
      <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          {course?.kicker ?? "Course"}
        </p>
        <h2 className="mt-2 font-display text-3xl">{course?.title ?? closed.title}</h2>
        <p className="mt-3 text-ink-soft">
          {day}
          {lasted ? ` · ${lasted}` : ""}
          {course?.duration ? ` · planned ${course.duration}` : ""}
        </p>
        <p className="mt-4 text-sm text-ink-soft">
          {closed.hasBooklet
            ? "Your booklet was received. Your certificate is ready."
            : "The presenter closed the room. You can still send your booklet from here, then open your certificate."}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/certificate">Open your certificate</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/desk">Desk</Link>
          </Button>
        </div>
      </div>
      {!closed.hasBooklet && (
        <div className="mt-6">
          <SubmitPack />
        </div>
      )}
    </Page>
  );
}
