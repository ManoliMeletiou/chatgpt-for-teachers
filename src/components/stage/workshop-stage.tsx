import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  EyeOff,
  Home,
  Mic,
  PenLine,
  Presentation,
  QrCode,
  Radio,
  Send,
  Users,
} from "lucide-react";
import { BookletSheet } from "@/components/stage/booklet-sheet";
import { SlideCanvas } from "@/components/stage/slide-canvas";
import { SubmitPack } from "@/components/stage/submit-pack";
import { WriteHere } from "@/components/stage/write-here";
import { useLiveClass } from "@/components/live/provider";
import { EndCourseButton } from "@/components/live/end-course";
import { PresenterAccount } from "@/components/presenter-account";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/lib/content/courses";
import { strandLabel, type CourseModule } from "@/lib/content/modules";
import {
  adjacentInCourse,
  courseModuleIds,
  sessionForModule,
  stepFilledCount,
  workbookStepForModule,
} from "@/lib/content/path";
import { displayCode } from "@/lib/live/codes";
import { listBookletSubmissions, type BookletSubmission } from "@/lib/server/submissions";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function WorkshopStage({ mod }: { mod: CourseModule }) {
  const navigate = useNavigate();
  const live = useLiveClass();
  const idx = useAppStore((s) => s.moduleSlide[mod.id] ?? 0);
  const setSlide = useAppStore((s) => s.setModuleSlide);
  const complete = useAppStore((s) => s.completeModule);
  const enrolled = useAppStore((s) => s.enrolledCourseId);
  const workbook = useAppStore((s) => s.workbook);
  const locked = Boolean(live.view && !live.isHost);
  const liveOnThis = locked && live.view?.session.currentModuleId === mod.id;
  const slideCount = mod.slides.length;
  const i = Math.min(
    liveOnThis ? live.view!.session.currentSlide : idx,
    Math.max(0, slideCount - 1),
  );
  const slide = mod.slides[i];
  const last = i === slideCount - 1;
  const course = getCourse(live.view?.session.courseId ?? enrolled ?? "");
  const { prev, next } = adjacentInCourse(course, mod.id);
  const step = workbookStepForModule(mod.id);
  const filled = step ? stepFilledCount(step, workbook) : 0;
  const session = course ? sessionForModule(course, mod.id) : undefined;
  const routeIds = course ? courseModuleIds(course) : [];
  const modulePos = routeIds.indexOf(mod.id);
  const [closing, setClosing] = useState(false);
  const [bookletOpen, setBookletOpen] = useState(false);
  const [focusSubmit, setFocusSubmit] = useState(false);
  const [cueOpen, setCueOpen] = useState(true);

  const go = useCallback(
    (n: number) => {
      if (locked) return;
      const clamped = Math.max(0, Math.min(slideCount - 1, n));
      setSlide(mod.id, clamped);
      if (live.isHost) live.broadcast(mod.id, clamped);
      if (clamped === slideCount - 1) complete(mod.id);
      setClosing(false);
    },
    [complete, live, locked, mod.id, setSlide, slideCount],
  );

  useEffect(() => {
    if (live.isHost) live.broadcast(mod.id, i);
  }, [live.isHost, live.broadcast, mod.id, i]);

  const goNext = useCallback(() => {
    if (locked) return;
    if (closing) return;
    if (!last) {
      go(i + 1);
      return;
    }
    complete(mod.id);
    if (next) {
      if (live.isHost) live.broadcast(next.id, 0);
      void navigate({ to: "/modules/$moduleId", params: { moduleId: next.slug } });
      return;
    }
    setClosing(true);
    setBookletOpen(true);
  }, [closing, complete, go, i, last, live, locked, mod.id, navigate, next]);

  const goPrev = useCallback(() => {
    if (locked) return;
    if (closing) {
      setClosing(false);
      return;
    }
    if (i > 0) {
      go(i - 1);
      return;
    }
    if (!prev) return;
    const lastSlide = Math.max(0, prev.slides.length - 1);
    if (live.isHost) live.broadcast(prev.id, lastSlide);
    setSlide(prev.id, lastSlide);
    void navigate({ to: "/modules/$moduleId", params: { moduleId: prev.slug } });
  }, [closing, go, i, live, locked, navigate, prev, setSlide]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (locked) return;
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el?.isContentEditable) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "b" || e.key === "B") {
        setBookletOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, locked]);

  const presenting = live.isHost;
  const following = locked;
  const online = live.view?.members.filter((m) => m.online).length ?? 0;
  const nextLabel = closing
    ? "Done"
    : last
      ? next
        ? "Next module"
        : presenting
          ? "Collect booklets"
          : "Finish"
      : "Next slide";

  return (
    <div className={cn("flex h-[100dvh] min-h-[100dvh] flex-col", presenting ? "stage-well" : following ? "stage-well-follow" : "paper-grain bg-paper")}>
      {presenting ? (
        <header className="flex items-center justify-between gap-3 bg-accent px-4 py-3 text-accent-fg sm:px-6">
          <div className="min-w-0">
            <Link
              to="/class"
              className="mb-0.5 block text-[11px] uppercase tracking-[0.16em] text-accent-fg/70 hover:text-accent-fg"
            >
              Home
            </Link>
            <p className="flex items-center gap-2 truncate text-[11px] uppercase tracking-[0.16em] text-accent-fg/70">
              <span className="live-dot" />
              Presenting {displayCode(live.view!.session.id)}
              {session ? ` · ${session.title}` : ""}
            </p>
            <h1 className="truncate font-display text-lg leading-tight sm:text-xl">{mod.title}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild size="sm" className="bg-paper/15 text-accent-fg hover:bg-paper/25">
              <Link to="/class">
                <Home className="size-3.5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
            <Link
              to="/class"
              className="hidden h-11 items-center gap-1.5 rounded-md px-3 text-sm text-accent-fg hover:bg-accent-fg/10 sm:flex"
            >
              <Users className="size-3.5" />
              {online}
            </Link>
            <Button
              size="sm"
              className="bg-paper text-accent hover:bg-paper/90"
              onClick={() => live.setShowJoinScreen(true)}
            >
              <QrCode className="size-3.5" />
              <span className="hidden sm:inline">Room QR</span>
            </Button>
            {slide?.notes ? (
              <button
                type="button"
                className="hidden h-9 items-center gap-1.5 rounded-sm px-3 text-[13px] text-accent-fg hover:bg-accent-fg/10 sm:inline-flex"
                onClick={() => setCueOpen((v) => !v)}
              >
                <Mic className="size-3.5" />
                {cueOpen ? "Hide cue" : "Show cue"}
              </button>
            ) : null}
            <PresenterAccount tone="accent" compact loginLabel="Log in" />
          </div>
        </header>
      ) : following ? (
        <header className="flex items-center justify-between gap-3 bg-amber px-4 py-3 text-paper sm:px-6">
          <div className="min-w-0">
            <p className="flex items-center gap-2 truncate text-[11px] uppercase tracking-[0.16em] text-paper/80">
              <span className="live-dot" />
              Following the presenter
              {session ? ` · ${session.title}` : ""}
            </p>
            <h1 className="truncate font-display text-lg leading-tight sm:text-xl">{mod.title}</h1>
          </div>
          <Button
            size="sm"
            className="bg-paper text-amber hover:bg-paper/90"
            onClick={() => {
              setFocusSubmit(false);
              setBookletOpen((v) => !v);
            }}
          >
            <PenLine className="size-3.5" />
            <span className="hidden sm:inline">Booklet</span>
            {filled > 0 ? <span className="tabular-nums">{filled}</span> : null}
          </Button>
        </header>
      ) : (
        <header className="flex items-center justify-between gap-3 border-b border-line bg-paper px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <Link to="/desk" className="mb-0.5 block text-[11px] uppercase tracking-[0.16em] text-muted hover:text-ink">
              Home
            </Link>
            <p className="truncate text-[11px] uppercase tracking-[0.16em] text-muted">
              {session ? session.title : `Module ${mod.id} · ${strandLabel[mod.strand]}`}
            </p>
            <h1 className="truncate font-display text-lg leading-tight sm:text-xl">{mod.title}</h1>
          </div>
          <Button
            size="sm"
            variant={bookletOpen ? "secondary" : "default"}
            onClick={() => {
              setFocusSubmit(false);
              setBookletOpen((v) => !v);
            }}
          >
            <PenLine className="size-3.5" />
            <span className="hidden sm:inline">Booklet</span>
            {filled > 0 ? <span className="tabular-nums">{filled}</span> : null}
          </Button>
        </header>
      )}

      {following && (
        <div className="bg-ink px-4 py-2 text-sm text-paper sm:px-6">
          <p className="flex min-w-0 items-center gap-2 truncate">
            <Radio className="size-3.5 shrink-0" />
            The presenter moves the slides. Write in the orange booklet under this slide.
          </p>
        </div>
      )}
      {presenting && (
        <div className="bg-accent-soft px-4 py-2 text-sm text-accent sm:px-6">
          <p className="flex min-w-0 items-center gap-2 truncate">
            <Presentation className="size-3.5 shrink-0" />
            Next slide moves every phone. “Say this” is under the slide — hide it if you project this window.
          </p>
        </div>
      )}

      <div className="relative flex min-h-0 flex-1">
        <SlideScroll resetKey={`${mod.id}-${i}-${closing}`}>
          {closing ? (
            <ClosingView isHost={live.isHost} />
          ) : (
            <>
              {slide && <SlideCanvas key={`${mod.id}-${i}`} slide={slide} />}
              {!presenting && <WriteHere moduleId={mod.id} kind={slide?.kind} />}
              {!presenting && last && !next && <SubmitPack />}
            </>
          )}
        </SlideScroll>

        {bookletOpen && !presenting && (
          <div className="fixed inset-0 z-40 flex bg-paper lg:static lg:z-auto lg:w-96 lg:flex-none lg:border-l lg:border-line">
            <BookletSheet
              moduleId={mod.id}
              open
              focusSubmit={focusSubmit}
              onClose={() => {
                setBookletOpen(false);
                setFocusSubmit(false);
              }}
            />
          </div>
        )}
      </div>

      {presenting && cueOpen && slide?.notes?.trim() ? (
        <div className="border-t border-ink bg-ink px-4 py-2.5 text-accent-fg sm:px-6">
          <div className="mx-auto flex max-w-5xl items-start gap-3">
            <Mic className="mt-0.5 size-4 shrink-0 text-accent-fg/70" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-accent-fg/55">
                Only on this laptop — the room’s phones do not see this
              </p>
              <p className="mt-0.5 text-sm leading-snug">{slide.notes}</p>
            </div>
            <button
              type="button"
              className="flex h-11 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs text-accent-fg/80 hover:bg-accent-fg/10 hover:text-accent-fg"
              onClick={() => setCueOpen(false)}
            >
              <EyeOff className="size-3.5" />
              Hide
            </button>
          </div>
        </div>
      ) : null}

      {following ? (
        <footer className="sticky bottom-0 z-20 bg-amber px-4 py-3 text-paper sm:px-6 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-5xl items-center gap-3">
            <p className="min-w-0 flex-1 text-sm text-paper">
              <span className="font-medium tabular-nums">
                Slide {i + 1} of {mod.slides.length}
              </span>
              {modulePos >= 0 ? (
                <span className="hidden sm:inline">
                  {" "}
                  · Block {modulePos + 1} of {routeIds.length}
                </span>
              ) : null}
            </p>
            <Button
              className="h-12 shrink-0 bg-paper text-amber hover:bg-paper/90"
              onClick={() => {
                setFocusSubmit(true);
                setBookletOpen(true);
              }}
            >
              <Send className="size-3.5" />
              Send booklet
            </Button>
          </div>
        </footer>
      ) : presenting ? (
        <footer className="sticky bottom-0 z-20 bg-accent px-4 py-3 text-accent-fg sm:px-6 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-5xl items-center gap-3">
            <Button
              className="h-12 w-24 shrink-0 bg-paper/15 text-accent-fg hover:bg-paper/25 sm:w-32"
              disabled={!closing && i === 0 && !prev}
              onClick={goPrev}
            >
              <ArrowLeft />
              Back
            </Button>
            <div className="min-w-0 flex-1 text-center">
              <p className="text-sm tabular-nums text-accent-fg">
                {closing ? "End of the course" : `${i + 1} of ${mod.slides.length}`}
              </p>
              {mod.slides.length <= 10 && (
                <div className="mt-1 hidden justify-center sm:flex">
                  {mod.slides.map((_, n) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`Slide ${n + 1}`}
                      onClick={() => go(n)}
                      className="flex size-8 items-center justify-center"
                    >
                      <span
                        className={cn(
                          "block size-2 rounded-full",
                          closing
                            ? "bg-paper/40"
                            : n === i
                              ? "bg-paper"
                              : n < i
                                ? "bg-paper/50"
                                : "bg-paper/25",
                        )}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              className="h-12 min-w-28 shrink-0 bg-paper text-accent hover:bg-paper/90 sm:min-w-40"
              onClick={goNext}
              disabled={closing}
            >
              {nextLabel}
              {!closing && <ArrowRight />}
            </Button>
          </div>
        </footer>
      ) : (
        <footer className="sticky bottom-0 z-20 border-t border-line bg-paper px-4 py-3 sm:px-6 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-5xl items-center gap-3">
            <Button
              variant="secondary"
              className="h-12 w-24 shrink-0 sm:w-32"
              disabled={!closing && i === 0 && !prev}
              onClick={goPrev}
            >
              <ArrowLeft />
              Back
            </Button>
            <div className="min-w-0 flex-1 text-center">
              <p className="text-sm tabular-nums text-ink">
                {closing ? "End of the course" : `${i + 1} of ${mod.slides.length}`}
              </p>
              {mod.slides.length <= 10 && (
                <div className="mt-1 hidden justify-center sm:flex">
                  {mod.slides.map((_, n) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`Slide ${n + 1}`}
                      onClick={() => go(n)}
                      className="flex size-8 items-center justify-center"
                    >
                      <span
                        className={cn(
                          "block size-2 rounded-full",
                          closing
                            ? "bg-accent/40"
                            : n === i
                              ? "bg-accent"
                              : n < i
                                ? "bg-accent/40"
                                : "bg-line-strong",
                        )}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button className="h-12 min-w-28 shrink-0 sm:min-w-40" onClick={goNext} disabled={closing}>
              {nextLabel}
              {!closing && <ArrowRight />}
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}

function SlideScroll({
  resetKey,
  children,
}: {
  resetKey: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 32);
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    const ro = new ResizeObserver(check);
    ro.observe(el);
    const t1 = window.setTimeout(check, 80);
    const t2 = window.setTimeout(check, 320);
    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [resetKey]);

  return (
    <div className="relative min-h-0 min-w-0 flex-1">
      <div ref={ref} className="h-full overflow-y-auto px-4 py-5 pb-16 sm:px-8 sm:py-6">
        {children}
      </div>
      {more ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-ink/50 via-ink/10 to-transparent pb-2 pt-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs text-accent-fg">
            <ChevronDown className="size-3.5" />
            More on this slide
          </span>
        </div>
      ) : null}
    </div>
  );
}

function ClosingView({ isHost }: { isHost: boolean }) {
  if (isHost) return <HostClosing />;
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl bg-surface px-6 py-8 shadow-[var(--shadow-border)] sm:px-10">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Session complete</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Send your booklet to the presenter.</h2>
        <p className="mt-3 max-w-xl text-ink-soft">
          Notes, how the session felt, what you will try next, and how the course could improve —
          one pack.
        </p>
      </div>
      <SubmitPack />
    </div>
  );
}

function HostClosing() {
  const live = useLiveClass();
  const [subs, setSubs] = useState<BookletSubmission[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const code = live.view?.session.id;

  useEffect(() => {
    if (!code) return;
    let cancelled = false;
    const load = () => {
      void listBookletSubmissions({ data: { code } })
        .then((rows) => {
          if (!cancelled) setSubs(rows);
        })
        .catch(() => undefined);
    };
    load();
    const timer = window.setInterval(load, 3000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [code]);

  const ordered = useMemo(() => subs ?? [], [subs]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div className="rounded-xl bg-surface px-6 py-8 shadow-[var(--shadow-border)] sm:px-10">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Collect booklets</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">
          {ordered.length === 0
            ? "Waiting for booklets."
            : `${ordered.length} booklet${ordered.length === 1 ? "" : "s"} on your desk.`}
        </h2>
        <p className="mt-3 text-ink-soft">
          Ask the room to tap Send booklet. Each pack includes notes, rating, how they felt, and
          course improvements. Full roster stays in Room.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/class">Open Room</Link>
          </Button>
          {code && (
            <Button asChild>
              <Link to="/log/$code" params={{ code }}>
                Past classes · print
              </Link>
            </Button>
          )}
          <Button onClick={() => live.setShowJoinScreen(true)} variant="secondary">
            <QrCode className="size-4" />
            Keep the QR up
          </Button>
        </div>
        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">When booklets are in</p>
          <p className="mt-1 text-sm text-ink-soft">
            End the course to lock the slides. Teachers cannot stay and review the lesson again.
          </p>
          <div className="mt-3">
            <EndCourseButton
              bookletCount={ordered.length}
              participantCount={ordered.length}
            />
          </div>
        </div>
      </div>
      <ul className="space-y-3">
        {ordered.map((s) => (
          <li key={s.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-3 text-left"
              onClick={() => setOpenId(openId === s.id ? null : s.id)}
            >
              <span>
                <span className="font-display text-xl">{s.displayName}</span>
                <span className="mt-1 block text-sm text-muted">
                  {s.rating ? `${s.rating}/5` : "No rating"}
                  {s.takeaway ? ` · ${s.takeaway.slice(0, 90)}` : ""}
                </span>
              </span>
              <span className="text-sm text-accent">{openId === s.id ? "Hide" : "Read"}</span>
            </button>
            {openId === s.id && (
              <div className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
                {s.feeling && (
                  <p>
                    <span className="text-muted">How it felt. </span>
                    {s.feeling}
                  </p>
                )}
                {s.takeaway && (
                  <p>
                    <span className="text-muted">They’ll try. </span>
                    {s.takeaway}
                  </p>
                )}
                {s.improvement && (
                  <p>
                    <span className="text-muted">Improve the course. </span>
                    {s.improvement}
                  </p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
