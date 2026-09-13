import { useEffect, useState } from "react";
import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { useLiveClass } from "@/components/live/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCourse } from "@/lib/content/courses";
import { getModule } from "@/lib/content/modules";
import { displayCode, normalizeCode } from "@/lib/live/codes";
import type { LiveClassPeek } from "@/lib/live/types";
import { pullLiveBus } from "@/lib/server/live-bus-pull";

export const Route = createFileRoute("/join/$code")({
  component: JoinCodePage,
});

function JoinCodePage() {
  const { code: raw } = Route.useParams();
  const code = normalizeCode(raw);
  const navigate = useNavigate();
  const live = useLiveClass();
  const [peek, setPeek] = useState<LiveClassPeek | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    try {
      const remembered = sessionStorage.getItem("cft-guest-name");
      if (remembered) setDisplayName(remembered);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void pullLiveBus({ data: { code } })
      .then((row) => {
        if (cancelled) return;
        if (!row) {
          setPeek(null);
          return;
        }
        setPeek({
          id: row.code,
          courseId: row.courseId,
          title: row.title,
          status: row.status,
          currentModuleId: row.moduleId,
          currentSlide: row.slide,
          memberCount: 1,
        });
      })
      .catch(() => {
        if (!cancelled) setPeek(null);
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  const course = peek ? getCourse(peek.courseId) : undefined;
  const current = peek?.currentModuleId ? getModule(peek.currentModuleId) : undefined;

  async function enter() {
    const name = displayName.trim();
    if (name.length < 2) {
      setError("Type the name the presenter should see.");
      return;
    }
    setJoining(true);
    setError(null);
    try {
      const view = await live.joinAsGuest(code, name);
      const mod = view.session.currentModuleId
        ? getModule(view.session.currentModuleId)
        : undefined;
      if (mod) {
        await navigate({ to: "/modules/$moduleId", params: { moduleId: mod.slug } });
      } else {
        await navigate({ to: "/desk" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not join this class.");
      setJoining(false);
    }
  }

  if (peek === undefined) {
    return (
      <main className="grid min-h-dvh place-items-center bg-amber">
        <div className="h-10 w-48 animate-pulse rounded-md bg-paper/30" />
      </main>
    );
  }

  if (!peek) {
    return (
      <Shell>
        <p className="text-[11px] uppercase tracking-[0.18em] text-paper/80">Join a live class</p>
        <h1 className="mt-2 font-display text-3xl">That code is not live.</h1>
        <p className="mt-3 text-paper/90">
          Check the six characters on the presenter’s screen, then try again. The presenter must
          have opened the room.
        </p>
        <Button asChild className="mt-8 bg-paper text-amber hover:bg-paper/90">
          <Link to="/join">Enter a different code</Link>
        </Button>
      </Shell>
    );
  }

  if (peek.status !== "live") {
    if (live.closed?.id === peek.id) return <Navigate to="/closed" />;
    return (
      <Shell>
        <p className="text-[11px] uppercase tracking-[0.18em] text-paper/80">
          {displayCode(peek.id)}
        </p>
        <h1 className="mt-2 font-display text-3xl">This class has closed.</h1>
        <p className="mt-3 text-paper/90">
          The presenter ended the course. The slides are locked.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button asChild className="bg-paper text-amber hover:bg-paper/90">
            <Link to="/join">Join another class</Link>
          </Button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-paper/80">
        <span className="live-dot" />
        Joining {displayCode(peek.id)}
      </p>
      <h1 className="mt-2 font-display text-3xl">{course?.title ?? peek.title}</h1>
      <p className="mt-3 text-paper/90 leading-relaxed">
        {current
          ? `The presenter is on Module ${current.id} · ${current.title}. You land on that slide. Write in the booklet under it.`
          : `You’ll follow the presenter on ${course?.title ?? "this course"} and keep notes in your booklet.`}
      </p>

      {live.view?.session.id === peek.id && live.isHost ? (
        <div className="mt-6 rounded-xl bg-paper px-5 py-4 text-sm text-ink">
          <p className="font-medium">This is the presenting laptop.</p>
          <p className="mt-1 leading-relaxed text-ink-soft">
            Teachers in the seats type their own name on their own phone.
          </p>
          <Button asChild className="mt-4">
            <Link to="/class">Back to the room</Link>
          </Button>
        </div>
      ) : (
        <form
          className="mt-8 space-y-4 rounded-xl bg-paper p-5 text-ink shadow-[var(--shadow-border)] sm:p-6"
          onSubmit={(e) => {
            e.preventDefault();
            void enter();
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="guest-name">Your name</Label>
            <Input
              id="guest-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="name"
              placeholder="First name"
              className="h-12"
            />
          </div>
          {error && <p className="text-sm text-red">{error}</p>}
          <Button type="submit" className="w-full" disabled={joining}>
            {joining ? "Entering…" : "Enter the class"}
          </Button>
          <p className="text-sm text-ink-soft">
            Use your own phone. Do not sign in on the presenting laptop.
          </p>
        </form>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="join-field min-h-dvh text-paper">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-12">
        <Link to="/" className="mb-8 flex items-center gap-2.5">
          <BrandMark inverse />
          <span className="font-display text-[15px] tracking-tight">ChatGPT for Teachers</span>
        </Link>
        {children}
      </div>
    </main>
  );
}
