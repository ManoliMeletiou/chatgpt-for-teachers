import { useEffect, useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { AuthPanel } from "@/components/auth-panel";
import { BrandMark } from "@/components/brand-mark";
import { usePreviewAuth } from "@/lib/use-preview-auth";

function safeNext(raw: unknown): string {
  if (typeof raw !== "string") return "/class";
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("://")) return "/class";
  return raw;
}

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): { next?: string } =>
    typeof s.next === "string" ? { next: s.next } : {},
  component: Login,
});

function ContinueTo({ next }: { next: string }) {
  const path = next.split("?")[0] || "/desk";
  if (path === "/class") return <Navigate to="/class" replace />;
  if (path === "/log") return <Navigate to="/log" replace />;
  const log = path.match(/^\/log\/([^/]+)$/);
  if (log?.[1]) return <Navigate to="/log/$code" params={{ code: log[1] }} replace />;
  if (path === "/workbook") return <Navigate to="/workbook" replace />;
  const join = path.match(/^\/join\/([^/]+)$/);
  if (join?.[1]) return <Navigate to="/join/$code" params={{ code: join[1] }} replace />;
  const mod = path.match(/^\/modules\/([^/]+)$/);
  if (mod?.[1]) {
    return <Navigate to="/modules/$moduleId" params={{ moduleId: mod[1] }} replace />;
  }
  return <Navigate to="/desk" replace />;
}

function isPresenterNext(next: string) {
  return (
    next === "/class" ||
    next.startsWith("/class?") ||
    next === "/log" ||
    next.startsWith("/log/")
  );
}

function Login() {
  const { next: rawNext } = Route.useSearch();
  const next = safeNext(rawNext);
  const { signedIn, resolving } = usePreviewAuth();
  const presenter = isPresenterNext(next);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 1600);
    return () => window.clearTimeout(t);
  }, []);

  if (signedIn) return <ContinueTo next={next} />;

  return (
    <main className="min-h-dvh bg-paper text-ink">
      {presenter ? (
        <div className="bg-accent px-5 py-3 text-center text-sm text-accent-fg">
          Presenter login · use this account only on the presenting laptop
        </div>
      ) : (
        <div className="bg-amber px-5 py-3 text-center text-sm text-paper">
          Participant sign-in · keep this account off the presenting laptop
        </div>
      )}
      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] max-w-md flex-col justify-center px-5 py-12">
        <Link to="/" className="mb-8 flex items-center gap-2.5">
          <BrandMark />
          <span className="font-display text-[15px] tracking-tight">ChatGPT for Teachers</span>
        </Link>
        {presenter ? (
          <>
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent">Presenter login</p>
            <h1 className="mt-2 font-display text-3xl">Sign in as presenter.</h1>
            <p className="mt-3 text-ink-soft leading-relaxed">
              This laptop will remember you until you log out. Then pick a course, open the room,
              or open Past classes to see who joined, which course it was, and how long it took.
            </p>
          </>
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-[0.18em] text-amber">Your place in the room</p>
            <h1 className="mt-2 font-display text-3xl">Sign in to save your work.</h1>
            <p className="mt-3 text-ink-soft leading-relaxed">
              Join a live class, keep your workbook, and pick up the same notes on another device.
            </p>
          </>
        )}
        {resolving && hint ? (
          <p className="mt-4 text-sm text-muted">Checking if you’re already signed in…</p>
        ) : null}
        <div className="mt-8 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <AuthPanel
            callbackURL={next}
            lead={
              presenter
                ? "Use the account you present with. Stay signed in on this laptop. Teachers in the seats sign in separately."
                : undefined
            }
            staySignedIn
          />
        </div>
        <p className="mt-6 text-sm text-muted">
          {presenter ? (
            <>
              Joining a class today?{" "}
              <Link to="/join" className="text-accent underline-offset-4 hover:underline">
                Enter a code instead
              </Link>
              .
            </>
          ) : (
            "Use only public, synthetic or school-approved non-confidential material in this programme."
          )}
        </p>
      </div>
    </main>
  );
}
