import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Home, QrCode, Radio } from "lucide-react";
import { getModule } from "@/lib/content/modules";
import { displayCode } from "@/lib/live/codes";
import { useLiveClass } from "@/components/live/provider";
import { Button } from "@/components/ui/button";

export function LiveBanner() {
  const live = useLiveClass();
  const { view, isHost } = live;
  const navigate = useNavigate();
  if (!view) return null;

  const mod = view.session.currentModuleId
    ? getModule(view.session.currentModuleId)
    : undefined;

  function goToLesson() {
    if (!mod) {
      void navigate({ to: "/desk" });
      return;
    }
    if (!isHost) live.setFollow(true);
    void navigate({
      to: "/modules/$moduleId",
      params: { moduleId: mod.slug },
    });
  }

  return (
    <div className={isHost ? "border-b border-line bg-accent text-accent-fg" : "border-b border-line bg-amber text-paper"}>
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="min-w-0">
          <p className={isHost ? "flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-accent-fg/70" : "flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-paper/80"}>
            {isHost ? <Radio className="size-3.5" strokeWidth={2} /> : <span className="live-dot" />}
            {isHost ? "You are presenting" : "You are in the room"}
            <span className="font-mono tracking-[0.12em]">
              {displayCode(view.session.id)}
            </span>
          </p>
          <p className="mt-1 truncate font-display text-lg leading-tight">
            {mod ? `Module ${mod.id} · ${mod.title}` : view.session.title}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isHost && (
            <Button asChild size="sm" variant="secondary">
              <Link to="/class">
                <Home className="size-3.5" />
                Home
              </Link>
            </Button>
          )}
          {isHost && (
            <Button size="sm" variant="secondary" onClick={() => live.setShowJoinScreen(true)}>
              <QrCode className="size-3.5" />
              Room QR
            </Button>
          )}
          <Button size="sm" variant="secondary" onClick={goToLesson}>
            {isHost ? "Open the lesson" : "Back to the lesson"}
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
