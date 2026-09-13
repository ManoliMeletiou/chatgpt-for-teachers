import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  CalendarDays,
  GraduationCap,
  Home,
  LayoutGrid,
  PenLine,
  Presentation,
  QrCode,
} from "lucide-react";
import { Wordmark } from "@/components/brand-mark";
import { LiveBanner } from "@/components/live/banner";
import { FollowSync } from "@/components/live/follow-sync";
import { CourseLock } from "@/components/live/course-lock";
import { JoinScreen } from "@/components/live/join-screen";
import { useLiveClass } from "@/components/live/provider";
import { PresenterAccount } from "@/components/presenter-account";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { getModule, modules } from "@/lib/content/modules";
import { getCourse } from "@/lib/content/courses";
import { courseModuleIds } from "@/lib/content/path";

function AuthSlot({ compact = false }: { compact?: boolean }) {
  return <PresenterAccount compact={compact} loginLabel="Log in" />;
}

function usePrimaryNav() {
  const live = useLiveClass();
  const current = live.view?.session.currentModuleId
    ? getModule(live.view.session.currentModuleId)
    : undefined;
  const lessonTo = current ? "/modules/$moduleId" : "/modules";
  const lessonParams = current ? { moduleId: current.slug } : undefined;

  if (live.view && live.isHost) {
    return [
      { to: "/desk", label: "Home", icon: Home },
      { to: lessonTo, params: lessonParams, label: "Lesson", icon: Presentation },
      { to: "/class", label: "Room", icon: QrCode },
      { to: "/log", label: "Past classes", icon: CalendarDays },
    ] as const;
  }
  if (live.view) {
    return [
      { to: lessonTo, params: lessonParams, label: "Lesson", icon: Presentation },
      { to: "/workbook", label: "Booklet", icon: PenLine },
    ] as const;
  }
  return [
    { to: "/desk", label: "Home", icon: LayoutGrid },
    { to: "/class", label: "Presenter", icon: Presentation },
    { to: "/join", label: "Join", icon: QrCode },
    { to: "/log", label: "Past classes", icon: CalendarDays },
  ] as const;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const completedIds = useAppStore((s) => s.completedModules);
  const enrolled = useAppStore((s) => s.enrolledCourseId);
  const course = enrolled ? getCourse(enrolled) : undefined;
  const routeIds = course ? courseModuleIds(course) : modules.map((m) => m.id);
  const completed = completedIds.filter((id) => routeIds.includes(id)).length;
  const pct = routeIds.length ? Math.round((completed / routeIds.length) * 100) : 0;
  const onStage = pathname.startsWith("/modules/") && pathname !== "/modules/";
  const nav = usePrimaryNav();

  useEffect(() => {
    void useAppStore.persist.rehydrate();
  }, []);

  if (onStage) {
    return (
      <div className="paper-grain min-h-dvh bg-paper text-ink">
        <FollowSync />
        <CourseLock />
        <JoinScreen />
        <main id="main">{children}</main>
      </div>
    );
  }

  return (
    <div className="paper-grain min-h-dvh bg-paper text-ink">
      <FollowSync />
      <CourseLock />
      <JoinScreen />
      <a
        href="#main"
        className="sr-only no-print focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 border-r border-line bg-surface/90 pt-6 backdrop-blur-sm lg:flex lg:flex-col no-print">
        <div className="px-4">
          <Link to="/" className="block">
            <Wordmark />
          </Link>
        </div>
        <nav className="mt-8 flex-1 space-y-0.5 px-2">
          {nav.map((item) => {
            const active =
              item.to === "/modules/$moduleId"
                ? pathname.startsWith("/modules/")
                : pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                params={"params" in item ? item.params : undefined}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
                  active
                    ? "bg-accent text-accent-fg"
                    : "text-ink-soft hover:bg-line/70 hover:text-ink",
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-4">
          <AuthSlot />
          <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-muted">
            {course ? course.title : "Programme"}
          </p>
          <p className="mt-1 font-display text-lg tabular-nums">
            {completed}
            <span className="text-muted"> / {routeIds.length}</span>
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-accent transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1 text-sm text-muted">
            <Link to="/courses" className="hover:text-ink">
              <GraduationCap className="mr-1 inline size-3.5" />
              Course routes
            </Link>
            <Link to="/legal" className="hover:text-ink">
              Safe & legal
            </Link>
            <Link to="/modules" className="hover:text-ink">
              Materials
            </Link>
            <Link to="/workbook" className="hover:text-ink">
              Full booklet
            </Link>
            <Link to="/certificate" className="hover:text-ink">
              Certificate
            </Link>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-line bg-paper/90 px-4 backdrop-blur-sm lg:hidden no-print">
        <Link to="/desk">
          <Wordmark compact />
        </Link>
        <AuthSlot compact />
      </header>

      <main
        id="main"
        className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pl-56 lg:pb-0"
      >
        <div className="no-print">
          <LiveBanner />
        </div>
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-stretch border-t border-line bg-surface/95 px-1 backdrop-blur-sm lg:hidden pb-[env(safe-area-inset-bottom)] no-print">
        {nav.slice(0, 4).map((item) => {
          const active =
            item.to === "/modules/$moduleId"
              ? pathname.startsWith("/modules/")
              : pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              params={"params" in item ? item.params : undefined}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px]",
                active ? "text-accent" : "text-muted",
              )}
            >
              <Icon className="size-5" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function Page({
  kicker,
  title,
  lead,
  children,
  actions,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between no-print">
        <div className="max-w-2xl">
          {kicker && (
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-accent">
              {kicker}
            </p>
          )}
          <h1 className="font-display text-3xl sm:text-4xl">{title}</h1>
          {lead && <p className="mt-3 max-w-prose text-ink-soft leading-relaxed">{lead}</p>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}
