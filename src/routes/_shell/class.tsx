import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { Check, Copy, Presentation, Radio } from "lucide-react";
import { Page } from "@/components/layout/app-shell";
import { QrCode as QrMark } from "@/components/qr-code";
import { useLiveClass } from "@/components/live/provider";
import { PresenterInbox } from "@/components/live/presenter-inbox";
import { PresenterAccount } from "@/components/presenter-account";
import { EndCourseButton } from "@/components/live/end-course";
import { PrivatePreviewNotice } from "@/components/live/private-preview-notice";
import { joinUrlFor } from "@/lib/join-share";
import {
  BookletBody,
  formatElapsed,
} from "@/components/live/session-records";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePreviewAuth } from "@/lib/use-preview-auth";
import { courses, getCourse, type CourseId } from "@/lib/content/courses";
import { getModule } from "@/lib/content/modules";
import { displayCode } from "@/lib/live/codes";
import type { RosterRow } from "@/lib/live/types";
import { getClassRoster } from "@/lib/server/live";
import {
  listBookletSubmissions,
  type BookletSubmission,
} from "@/lib/server/submissions";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function isCourseId(value: unknown): value is CourseId {
  return typeof value === "string" && Boolean(getCourse(value));
}

function classSearch(s: Record<string, unknown>): { courseId?: CourseId } {
  const next: { courseId?: CourseId } = {};
  if (isCourseId(s.courseId)) next.courseId = s.courseId;
  return next;
}

function formatClassDay(iso: string) {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return "Today";
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const Route = createFileRoute("/_shell/class")({
  validateSearch: classSearch,
  component: ClassPage,
});

function ClassPage() {
  const { resolving, signedIn } = usePreviewAuth();
  const { courseId: preselect } = Route.useSearch();
  const live = useLiveClass();
  const navigate = useNavigate();
  const enrolled = useAppStore((s) => s.enrolledCourseId);
  const [picked, setPicked] = useState<CourseId>(preselect ?? enrolled ?? "math-hour");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (preselect) setPicked(preselect);
  }, [preselect]);

  if (resolving) {
    return (
      <Page kicker="Live class" title="Opening the room.">
        <div className="h-40 animate-pulse rounded-xl bg-line/70" />
      </Page>
    );
  }

  if (!signedIn) return <Navigate to="/login" search={{ next: "/class" }} />;

  if (live.view && live.isHost) {
    return <HostRoom />;
  }

  if (live.view && !live.isHost) {
    const mod = live.view.session.currentModuleId
      ? getModule(live.view.session.currentModuleId)
      : undefined;
    if (mod) {
      return (
        <Navigate
          to="/modules/$moduleId"
          params={{ moduleId: mod.slug }}
        />
      );
    }
    return <Navigate to="/desk" />;
  }

  return (
    <Page
      kicker="Presenter desk"
      title="Pick the course. Open the room."
      lead="This login is yours as presenter. This laptop remembers you. Open a room, or open Past classes to see who joined, which course it was, and how long it took."
      actions={<PresenterAccount loginLabel="Presenter login" />}
    >
      <ol className="mb-8 grid gap-3 sm:grid-cols-3">
        {[
          { n: "1", t: "Choose the course", d: "1-hour maths, 2-hour, half-day, full day or multi-session." },
          { n: "2", t: "Open the room", d: "QR and a six-character code. You stay the presenter." },
          { n: "3", t: "Run the lesson", d: "Your screen is the console. Theirs follows the slide and the booklet." },
        ].map((s) => (
          <li key={s.n} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-display text-2xl text-accent">{s.n}</p>
            <p className="mt-1 font-medium">{s.t}</p>
            <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
          </li>
        ))}
      </ol>
      <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted">Course to present</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {courses.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setPicked(c.id)}
            className={cn(
              "rounded-xl p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-150",
              picked === c.id ? "bg-accent text-accent-fg" : "bg-surface hover:shadow-[var(--shadow-border-hover)]",
            )}
          >
            <p
              className={cn(
                "text-[11px] uppercase tracking-[0.16em]",
                picked === c.id ? "text-accent-fg/70" : "text-muted",
              )}
            >
              {c.kicker}
            </p>
            <p className="mt-1 font-display text-xl">{c.title}</p>
            <p className={cn("mt-2 text-sm", picked === c.id ? "text-accent-fg/80" : "text-ink-soft")}>
              {c.duration}
            </p>
          </button>
        ))}
      </div>
      {error && <p className="mt-4 text-sm text-red">{error}</p>}
      <Button
        className="mt-6"
        size="lg"
        disabled={busy}
        onClick={() => {
          setBusy(true);
          setError(null);
          void live
            .openClass(picked)
            .then(async (view) => {
              const mod = view.session.currentModuleId
                ? getModule(view.session.currentModuleId)
                : undefined;
              if (mod) {
                await navigate({
                  to: "/modules/$moduleId",
                  params: { moduleId: mod.slug },
                });
                live.setShowJoinScreen(true);
              }
            })
            .catch((err) => setError(err instanceof Error ? err.message : "Could not open the class."))
            .finally(() => setBusy(false));
        }}
      >
        <Presentation className="size-4" />
        {busy ? "Opening…" : "Open the room"}
      </Button>
      <Link
        to="/log"
        className="mt-8 flex items-start gap-4 rounded-xl bg-accent p-6 text-accent-fg sm:p-8"
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-accent-fg/70">After the class</p>
          <h2 className="mt-1 font-display text-3xl">Past classes</h2>
          <p className="mt-3 max-w-xl text-accent-fg/85">
            Open a class to see who participated, the exact course, how long it took, print booklets,
            and print certificates.
          </p>
          <p className="mt-4 text-sm font-medium">Open past classes</p>
        </div>
      </Link>
      <PresenterInbox empty="message" />
    </Page>
  );
}

function HostRoom() {
  const live = useLiveClass();
  const view = live.view!;
  const course = getCourse(view.session.courseId);
  const [joinUrl, setJoinUrl] = useState<string | null>(() =>
    typeof window === "undefined" ? null : joinUrlFor(view.session.id),
  );
  const [copied, setCopied] = useState(false);
  const [roster, setRoster] = useState<RosterRow[] | null>(null);
  const [subs, setSubs] = useState<BookletSubmission[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setJoinUrl(joinUrlFor(view.session.id));
    live.setShowJoinScreen(false);
  }, [view.session.id]);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      void getClassRoster({ data: { code: view.session.id } })
        .then((rows) => {
          if (!cancelled) setRoster(rows);
        })
        .catch(() => {
          if (!cancelled) setRoster(null);
        });
      void listBookletSubmissions({ data: { code: view.session.id } })
        .then((rows) => {
          if (!cancelled) setSubs(rows);
        })
        .catch(() => {
          if (!cancelled) setSubs(null);
        });
    };
    load();
    const timer = window.setInterval(load, 4000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [view.session.id]);

  const current = view.session.currentModuleId
    ? getModule(view.session.currentModuleId)
    : undefined;
  const online = (roster ?? view.members).filter((m) => m.online).length;
  const people = (roster ?? view.members).filter((m) => m.role !== "host");
  const lasted = formatElapsed(view.session.createdAt, view.session.endedAt);

  return (
    <Page
      kicker="Room"
      title="The class is live."
      lead={`${formatClassDay(view.session.createdAt)}${lasted ? ` · running ${lasted}` : ""} · ${course?.title ?? "This course"}. QR, who is in, and booklets as they arrive.`}
      actions={
        <div className="flex flex-wrap gap-2">
          {current && (
            <Button asChild>
              <Link to="/modules/$moduleId" params={{ moduleId: current.slug }}>
                <Presentation className="size-4" />
                Back to the lesson
              </Link>
            </Button>
          )}
          <Button asChild variant="secondary">
            <Link to="/log/$code" params={{ code: view.session.id }}>
              Past classes
            </Link>
          </Button>
          <Button variant="secondary" onClick={() => live.setShowJoinScreen(true)}>
            Project join screen
          </Button>
          <PresenterAccount />
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
        <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          {joinUrl ? (
            <QrMark value={joinUrl} label="Join this live class" />
          ) : (
            <div className="aspect-square animate-pulse rounded-lg bg-line" />
          )}
          <p className="mt-4 text-center font-display text-3xl tracking-[0.18em]">
            {displayCode(view.session.id)}
          </p>
          {joinUrl ? (
            <a
              href={joinUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block break-all text-center font-mono text-[11px] text-ink-soft underline decoration-line-strong"
            >
              {joinUrl}
            </a>
          ) : null}
          <button
            type="button"
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-md text-sm text-ink-soft hover:bg-line/60 hover:text-ink"
            onClick={() => {
              if (!joinUrl) return;
              void navigator.clipboard.writeText(joinUrl).then(() => {
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1600);
              });
            }}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy join link"}
          </button>
          <div className="mt-3 border-t border-line pt-3">
            <PrivatePreviewNotice variant="note" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Now on screen</p>
            <h2 className="mt-1 font-display text-2xl">
              {current ? `Module ${current.id} · ${current.title}` : "Start the first block."}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
            Teachers stay locked to this slide. Write-in fields sit under it on their phones.
          </p>
            {current && (
              <Button asChild className="mt-4">
                <Link to="/modules/$moduleId" params={{ moduleId: current.slug }}>
                  Open the lesson
                </Link>
              </Button>
            )}
          </div>

          <SessionJump courseId={view.session.courseId} />

          <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl">In the room</h2>
              <Badge variant="muted">
                <Radio className="mr-1 size-3" />
                {online} live
              </Badge>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {(roster ??
                view.members.map((m) => ({
                  userId: m.userId,
                  displayName: m.displayName,
                  role: m.role,
                  online: m.online,
                  diagnosticPre: false,
                  workbookFilled: 0,
                  completedInCourse: 0,
                  courseModuleCount: 0,
                }))).map((m) => (
                <li key={m.userId} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        m.online ? "bg-green" : "bg-line-strong",
                      )}
                    />
                    <span className="truncate">{m.displayName}</span>
                  </span>
                  <span className="shrink-0 text-right text-muted">
                    {m.role === "host" ? (
                      "Presenter"
                    ) : roster ? (
                      <>
                        {m.diagnosticPre ? "PRE done" : "No PRE"}
                        {" · "}
                        {m.workbookFilled} notes
                      </>
                    ) : (
                      "Teacher"
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-xl">Booklets sent to you</h2>
            <p className="mt-1 text-sm text-ink-soft">
              When a teacher submits at the end, the full booklet, review and improvement notes
              land here.
            </p>
            {!subs?.length ? (
              <p className="mt-4 text-sm text-muted">None yet — they send from My booklet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {subs.map((s) => (
                  <li key={s.id} className="py-3">
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-3 text-left"
                      onClick={() => setOpenId(openId === s.id ? null : s.id)}
                    >
                      <span>
                        <span className="font-medium">{s.displayName}</span>
                        <span className="mt-0.5 block text-sm text-muted">
                          {s.rating ? `${s.rating}/5` : "No rating"} · {s.takeaway.slice(0, 80) || "Opens full booklet"}
                        </span>
                      </span>
                      <span className="text-sm text-accent">{openId === s.id ? "Hide" : "Read"}</span>
                    </button>
                    {openId === s.id && <BookletBody sub={s} />}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">After booklets arrive</p>
        <h2 className="mt-1 font-display text-xl">End of course</h2>
        <p className="mt-2 max-w-xl text-sm text-ink-soft">
          When teachers have sent their booklet and rating, end the course. That locks them out of
          the slides so they cannot stay and review the lesson again.
        </p>
        <div className="mt-4">
          <EndCourseButton
            bookletCount={subs?.length ?? 0}
            participantCount={people.length}
          />
        </div>
      </div>
      <PresenterInbox empty="message" />
    </Page>
  );
}

function SessionJump({ courseId }: { courseId: CourseId }) {
  const live = useLiveClass();
  const navigate = useNavigate();
  const course = useMemo(() => getCourse(courseId), [courseId]);
  if (!course) return null;

  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <h2 className="font-display text-xl">Jump the room</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Move everyone who is following to a later block.
      </p>
      <ol className="mt-4 space-y-2">
        {course.sessions.map((s, i) => {
          const first = s.moduleIds[0];
          const active = first === live.view?.session.currentModuleId;
          const dest = first ? getModule(first) : undefined;
          return (
            <li key={s.title}>
              <button
                type="button"
                disabled={!dest}
                onClick={() => {
                  if (!dest) return;
                  live.broadcast(dest.id, 0);
                  void navigate({
                    to: "/modules/$moduleId",
                    params: { moduleId: dest.slug },
                  });
                }}
                className={cn(
                  "flex min-h-11 w-full items-start justify-between gap-3 rounded-lg px-3 py-3 text-left text-sm hover:bg-line/60",
                  active && "bg-accent-soft text-accent",
                )}
              >
                <span>
                  <span className="mr-2 text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </span>
                <span className="shrink-0 text-muted">{s.duration}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
