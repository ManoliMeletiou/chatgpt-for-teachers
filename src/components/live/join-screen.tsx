import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { QrCode as QrMark } from "@/components/qr-code";
import { PrivatePreviewNotice } from "@/components/live/private-preview-notice";
import { useLiveClass } from "@/components/live/provider";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/lib/content/courses";
import { getModule } from "@/lib/content/modules";
import { displayCode } from "@/lib/live/codes";
import { joinUrlFor } from "@/lib/join-share";

export function JoinScreen() {
  const live = useLiveClass();
  const navigate = useNavigate();
  const [joinUrl, setJoinUrl] = useState<string | null>(null);
  const code = live.view?.session.id ?? "";

  useEffect(() => {
    setJoinUrl(code ? joinUrlFor(code) : null);
  }, [code]);

  if (!live.showJoinScreen || !live.view || !live.isHost) return null;
  if (typeof document === "undefined") return null;

  const view = live.view;

  const course = getCourse(view.session.courseId);
  const current = view.session.currentModuleId
    ? getModule(view.session.currentModuleId)
    : undefined;
  const online = view.members.filter((m) => m.online).length;

  return createPortal(
    <div className="hero-field fixed inset-0 z-50 overflow-auto text-accent-fg">
      <div className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-6 py-10 sm:px-12">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent-fg/70">
          <span className="live-dot" />
          ChatGPT for Teachers · {course?.title}
        </p>
        <h1 className="mt-3 max-w-[16ch] font-display text-4xl sm:text-6xl">
          Scan to join this class.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-accent-fg/85">
          Teachers scan this code on their own phone. They land on a public class
          page, type their name, and stay on your slide. They do not sign in.
        </p>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,18rem)_1fr]">
          <div className="rounded-2xl bg-elevated p-4 shadow-[var(--shadow-border)]">
            {joinUrl ? (
              <QrMark value={joinUrl} label="Join this live class" />
            ) : (
              <div className="aspect-square animate-pulse rounded-xl bg-line" />
            )}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent-fg/70">Class code</p>
            <p className="mt-2 font-display text-5xl tracking-[0.18em] sm:text-7xl">
              {displayCode(view.session.id)}
            </p>
            <p className="mt-4 break-all font-mono text-sm text-accent-fg/70">
              {joinUrl ? (
                <a href={joinUrl} target="_blank" rel="noreferrer" className="underline decoration-accent-fg/40">
                  {joinUrl}
                </a>
              ) : (
                "Preparing link…"
              )}
            </p>
            <p className="mt-6 flex items-center gap-2 text-sm text-accent-fg/85">
              <Users className="size-4" />
              {view.memberCount} in the room · {online} active now
            </p>
            <div className="mt-4 max-w-md">
              <PrivatePreviewNotice variant="projector" />
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          <Button
            size="lg"
            className="bg-paper text-accent hover:bg-paper/90"
            onClick={() => {
              live.setShowJoinScreen(false);
              if (current) {
                void navigate({
                  to: "/modules/$moduleId",
                  params: { moduleId: current.slug },
                });
              }
            }}
          >
            Start the lesson
          </Button>
          <Button
            size="lg"
            className="border border-accent-fg/40 bg-transparent text-accent-fg hover:bg-accent-fg/10"
            onClick={() => live.setShowJoinScreen(false)}
          >
            Keep presenting
          </Button>
        </div>
        <p className="mt-4 text-sm text-accent-fg/75">
          Leave this up while people sit down. Next slide on your keyboard moves everyone who is following.
        </p>
      </div>
    </div>,
    document.body,
  );
}
