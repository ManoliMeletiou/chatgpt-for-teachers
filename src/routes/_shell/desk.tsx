import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PenLine, Presentation, QrCode } from "lucide-react";
import { CourseToday } from "@/components/course/today";
import { Page } from "@/components/layout/app-shell";
import { ClosedNotice } from "@/components/live/course-lock";
import { useLiveClass } from "@/components/live/provider";
import { PresenterInbox } from "@/components/live/presenter-inbox";
import { PresenterAccount } from "@/components/presenter-account";
import { Button } from "@/components/ui/button";
import { usePreviewAuth } from "@/lib/use-preview-auth";
import { getModule } from "@/lib/content/modules";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/desk")({ component: DeskPage });

function DeskPage() {
  const live = useLiveClass();
  const { signedIn } = usePreviewAuth();
  const enrolled = useAppStore((s) => s.enrolledCourseId);
  const current = live.view?.session.currentModuleId
    ? getModule(live.view.session.currentModuleId)
    : undefined;

  if (live.view && current) {
    return (
      <Page
        kicker={live.isHost ? "You are presenting" : "You are in the room"}
        title={live.isHost ? "Stay on the lesson." : "Follow the lesson. Write in the booklet."}
        lead={
          live.isHost
            ? "Next slide moves everyone who is following. The QR lives on Room. Booklets arrive at the end."
            : "You do not need another page. The slides and your booklet sit together."
        }
        actions={<PresenterAccount />}
      >
        <div className="rounded-xl bg-accent p-6 text-accent-fg sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-accent-fg/70">Now</p>
          <h2 className="mt-2 font-display text-3xl">
            Module {current.id} · {current.title}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild className="bg-paper text-accent hover:bg-paper/90">
              <Link to="/modules/$moduleId" params={{ moduleId: current.slug }}>
                {live.isHost ? "Continue presenting" : "Back to the lesson"}
                <ArrowRight />
              </Link>
            </Button>
            {live.isHost && (
              <>
                <Button asChild variant="secondary">
                  <Link to="/class">Room · QR and booklets</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link to="/log">Past classes</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page
      kicker="Home"
      title="Pick your door."
      lead="One path if you are presenting. One path if you are in the room. Everything else can wait."
      actions={<PresenterAccount loginLabel="Presenter login" />}
    >
      {live.closed && !live.view ? <ClosedNotice /> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Link
          {...(signedIn
            ? { to: "/class" as const }
            : { to: "/login" as const, search: { next: "/class" as const } })}
          className="door-lift group rounded-xl bg-accent p-6 text-accent-fg sm:p-8"
        >
          <Presentation className="size-6" strokeWidth={1.6} />
          <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-accent-fg/70">
            {signedIn ? "Presenter desk" : "Presenter login"}
          </p>
          <h2 className="mt-1 font-display text-3xl">I’m presenting today</h2>
          <p className="mt-3 max-w-md text-accent-fg/85">
            {signedIn
              ? "Pick the course and open the room. After they send booklets, open Past classes to see who took part, which course it was, how long it took, and print certificates."
              : "Log in as presenter — this laptop remembers you. Pick the course, open the room. Who joined sits under Past classes. Use this account only on the presenting laptop."}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
            {signedIn ? "Open presenter desk" : "Log in as presenter"}
            <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </p>
        </Link>

        <Link
          to="/join"
          className="door-lift group rounded-xl bg-amber p-6 text-paper sm:p-8"
        >
          <QrCode className="size-6" strokeWidth={1.6} />
          <p className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-paper/80">
            <span className="live-dot" />
            Participant
          </p>
          <h2 className="mt-1 font-display text-3xl">I’m in this session</h2>
          <p className="mt-3 max-w-md text-paper/90">
            Enter the code on the screen (or scan the QR). You land on the current slide. Your
            booklet sits beside it. At the end you send the whole pack to the presenter.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
            Join with a code
            <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </p>
        </Link>
      </div>

      {signedIn ? (
        <Link
          to="/log"
          className="mt-4 flex items-start gap-4 rounded-xl bg-accent p-6 text-accent-fg sm:p-8"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-accent-fg/70">Presenter</p>
            <h2 className="mt-1 font-display text-3xl">Past classes</h2>
            <p className="mt-3 max-w-xl text-accent-fg/85">
              Who participated, which exact course, how long it took. Open one to print booklets
              and certificates.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
              Open past classes
              <ArrowRight className="size-4" />
            </p>
          </div>
        </Link>
      ) : null}

      {enrolled && !(live.closed && !live.view) && (
        <div className="mt-8">
          <CourseToday />
        </div>
      )}

      {!enrolled && (
        <div className="mt-8 rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">On your own</p>
          <h2 className="mt-1 font-display text-xl">Not in a live class?</h2>
          <p className="mt-2 max-w-xl text-sm text-ink-soft">
            Pick a course route, work the materials, and keep a booklet on this account. Join a
            live class later and that work comes with you.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <Link to="/courses">Choose a course</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/workbook">
                <PenLine className="size-4" />
                Open the booklet
              </Link>
            </Button>
          </div>
        </div>
      )}
      <PresenterInbox />
    </Page>
  );
}
