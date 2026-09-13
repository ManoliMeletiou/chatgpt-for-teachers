import { useEffect, useRef } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { loadProgress, saveProgress } from "@/lib/server/progress";
import { useAppStore } from "@/lib/store";

function isUnauthorized(err: unknown) {
  return err instanceof Error && err.message === "Unauthorized";
}

export function ProgressSync() {
  const { user, isPending } = useCurrentUserState();
  const loadedFor = useRef<string | null>(null);
  const lastSaved = useRef("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isPending || !user) {
      loadedFor.current = null;
      return;
    }
    let cancelled = false;
    void (async () => {
      await useAppStore.persist.rehydrate();
      if (cancelled) return;
      try {
        const remote = await loadProgress();
        if (cancelled) return;
        const local = useAppStore.getState().exportProgress();
        if (!remote) {
          await saveProgress({ data: local });
          lastSaved.current = JSON.stringify(local);
        } else {
          const hasLocalWork =
            local.completedModules.length > 0 ||
            Object.values(local.workbook).some((v) => v.trim()) ||
            local.certificateIssuedAt;
          const remoteEmpty =
            remote.completedModules.length === 0 &&
            !Object.values(remote.workbook).some((v) => v.trim()) &&
            !remote.certificateIssuedAt;
          if (remoteEmpty && hasLocalWork) {
            await saveProgress({ data: local });
            lastSaved.current = JSON.stringify(local);
          } else {
            useAppStore.getState().importProgress(remote);
            if (!remote.certificateName && user.displayName) {
              useAppStore.getState().setCertificate(
                user.displayName,
                remote.certificateRole,
                remote.certificateSchool,
              );
            }
            lastSaved.current = JSON.stringify(useAppStore.getState().exportProgress());
          }
        }
        loadedFor.current = user.id;
      } catch (err) {
        if (!isUnauthorized(err)) console.warn("progress load failed", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  useEffect(() => {
    if (!user) return;
    const persist = () => {
      if (loadedFor.current !== user.id) return;
      const snap = useAppStore.getState().exportProgress();
      const json = JSON.stringify(snap);
      if (json === lastSaved.current) return;
      lastSaved.current = json;
      void saveProgress({ data: snap }).catch((err) => {
        if (!isUnauthorized(err)) console.warn("progress save failed", err);
      });
    };
    const unsub = useAppStore.subscribe(() => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(persist, 700);
    });
    const onHide = () => persist();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    return () => {
      unsub();
      window.clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
    };
  }, [user]);

  return null;
}
