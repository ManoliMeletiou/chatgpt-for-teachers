import { useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useLiveClass } from "@/components/live/provider";
import { getModule } from "@/lib/content/modules";
import { useAppStore } from "@/lib/store";

/** Participants always sit on the presenter's module and slide. */
export function FollowSync() {
  const live = useLiveClass();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const setSlide = useAppStore((s) => s.setModuleSlide);

  const moduleId = live.view?.session.currentModuleId ?? null;
  const slide = live.view?.session.currentSlide ?? 0;
  const locked = Boolean(live.view && !live.isHost);

  useEffect(() => {
    if (!locked || !moduleId) return;
    const mod = getModule(moduleId);
    if (!mod) return;
    setSlide(mod.id, slide);
    const dest = `/modules/${mod.slug}`;
    const onDest = pathname === dest || pathname.endsWith(`/${mod.slug}`);
    if (onDest) return;
    void navigate({ to: "/modules/$moduleId", params: { moduleId: mod.slug } });
  }, [locked, moduleId, slide, pathname, navigate, setSlide]);

  return null;
}
