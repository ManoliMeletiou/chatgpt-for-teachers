import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  broadcastLivePosition,
  createLiveClass,
  endLiveClass,
  getMyEndedClass,
  getMyLiveClass,
  joinLiveClass,
  leaveLiveClass,
  pullLivePosition,
} from "@/lib/server/live";
import { pullLiveBus } from "@/lib/server/live-bus-pull";
import { publishLiveBus } from "@/lib/server/live-bus-publish";
import type { ClosedClass, LiveClassView } from "@/lib/live/types";
import { publishLiveBusBrowser, pullGuestRoomBrowser, type LiveBusPayload } from "@/lib/live/public-bus";
import { getOrCreateRoomSecret } from "@/lib/live/room-secret";
import { useAppStore } from "@/lib/store";
import { prettyPersonName } from "@/lib/person-name";
import type { CourseId } from "@/lib/content/courses";
import { getCourse } from "@/lib/content/courses";

type LiveClassContextValue = {
  view: LiveClassView | null;
  closed: ClosedClass | null;
  loading: boolean;
  follow: boolean;
  setFollow: (value: boolean) => void;
  isHost: boolean;
  showJoinScreen: boolean;
  setShowJoinScreen: (value: boolean) => void;
  openClass: (courseId: CourseId) => Promise<LiveClassView>;
  joinClass: (code: string) => Promise<LiveClassView>;
  joinAsGuest: (code: string, displayName: string) => Promise<LiveClassView>;
  endClass: () => Promise<string | null>;
  leaveClass: () => Promise<void>;
  broadcast: (moduleId: string, slide: number) => void;
  refresh: () => Promise<void>;
};

const LiveClassContext = createContext<LiveClassContextValue | null>(null);

function isUnauthorized(err: unknown) {
  return err instanceof Error && err.message === "Unauthorized";
}

function displayNameOf(user: { displayName: string | null; primaryEmail: string | null } | null) {
  if (!user) return "Participant";
  return prettyPersonName(user.displayName || user.primaryEmail);
}

function viewFromBus(payload: LiveBusPayload, role: "host" | "participant"): LiveClassView {
  const course = getCourse(payload.courseId);
  return {
    session: {
      id: payload.code,
      courseId: payload.courseId,
      title: payload.title || course?.title || "Live class",
      status: payload.status,
      currentModuleId: payload.moduleId,
      currentSlide: payload.slide,
      createdAt: new Date(payload.at).toISOString(),
    },
    role,
    members: [],
    memberCount: 1,
  };
}

export function LiveClassProvider({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  const userId = user?.id ?? null;
  const name = displayNameOf(user);
  const [view, setView] = useState<LiveClassView | null>(null);
  const [closed, setClosed] = useState<ClosedClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [showJoinScreen, setShowJoinScreen] = useState(false);
  const follow = useAppStore((s) => s.followPresenter);
  const setFollowPresenter = useAppStore((s) => s.setFollowPresenter);
  const setLiveSession = useAppStore((s) => s.setLiveSession);
  const enroll = useAppStore((s) => s.enroll);
  const [guest, setGuest] = useState(false);
  const lastBroadcast = useRef("");
  const viewRef = useRef(view);
  viewRef.current = view;
  const refreshInflight = useRef(false);
  const pullInflight = useRef(false);
  const guestRef = useRef(false);
  guestRef.current = guest;

  const publishBus = useCallback((next: LiveClassView, status: "live" | "ended" = next.session.status) => {
    if (next.role !== "host") return;
    const payload: LiveBusPayload = {
      v: 1,
      code: next.session.id,
      courseId: next.session.courseId,
      title: next.session.title,
      moduleId: next.session.currentModuleId,
      slide: next.session.currentSlide,
      status,
      hostName: "Presenter",
      at: Date.now(),
    };
    void publishLiveBusBrowser(payload);
    void publishLiveBus({ data: payload }).catch(() => undefined);
  }, []);

  const refresh = useCallback(async () => {
    if (guestRef.current) {
      setLoading(false);
      return;
    }
    if (!userId) {
      setView(null);
      setClosed(null);
      setLoading(false);
      return;
    }
    if (refreshInflight.current) return;
    refreshInflight.current = true;
    try {
      const mine = await getMyLiveClass();
      if (mine) {
        setClosed(null);
        setLiveSession(mine.session.id);
        enroll(mine.session.courseId);
        setView((prev) => {
          if (
            prev &&
            prev.role === "host" &&
            prev.session.id === mine.session.id &&
            lastBroadcast.current.startsWith(`${mine.session.id}:`)
          ) {
            const parts = lastBroadcast.current.split(":");
            const optimisticModule = parts[1];
            const optimisticSlide = Number(parts[2]);
            if (
              optimisticModule &&
              (mine.session.currentModuleId !== optimisticModule ||
                mine.session.currentSlide !== optimisticSlide)
            ) {
              return {
                ...mine,
                session: {
                  ...mine.session,
                  currentModuleId: optimisticModule,
                  currentSlide: Number.isFinite(optimisticSlide)
                    ? optimisticSlide
                    : mine.session.currentSlide,
                },
              };
            }
          }
          if (
            prev &&
            prev.role === "participant" &&
            prev.session.id === mine.session.id
          ) {
            return {
              ...mine,
              session: {
                ...mine.session,
                currentModuleId: prev.session.currentModuleId,
                currentSlide: prev.session.currentSlide,
              },
            };
          }
          return mine;
        });
      } else {
        setLiveSession(null);
        setView(null);
        const ended = await getMyEndedClass().catch(() => null);
        setClosed(ended);
      }
    } catch (err) {
      if (!isUnauthorized(err)) console.warn("live class refresh failed", err);
      setView(null);
    } finally {
      refreshInflight.current = false;
      setLoading(false);
    }
  }, [userId, setLiveSession, enroll]);

  const pullPosition = useCallback(async () => {
    if (pullInflight.current) return;
    if (guestRef.current) {
      const code = viewRef.current?.session.id;
      if (!code) return;
      pullInflight.current = true;
      try {
        const snap = await pullLiveBus({ data: { code } });
        if (!snap || snap.status === "ended") {
          const prev = viewRef.current;
          if (prev) {
            setView(null);
            setClosed({
              id: prev.session.id,
              courseId: prev.session.courseId,
              title: prev.session.title,
              createdAt: prev.session.createdAt,
              endedAt: new Date().toISOString(),
              hasBooklet: false,
            });
          }
          return;
        }
        setView((prev) => {
          if (!prev) return viewFromBus(snap, "participant");
          if (prev.session.id !== snap.code) return prev;
          if (
            prev.session.currentModuleId === snap.moduleId &&
            prev.session.currentSlide === snap.slide
          ) {
            return prev;
          }
          return {
            ...prev,
            session: {
              ...prev.session,
              currentModuleId: snap.moduleId,
              currentSlide: snap.slide,
              status: snap.status,
            },
          };
        });
      } catch {
        // keep last known slide
      } finally {
        pullInflight.current = false;
      }
      return;
    }
    if (!userId) return;
    pullInflight.current = true;
    try {
      const pos = await pullLivePosition();
      if (!pos) {
        if (viewRef.current && viewRef.current.role === "participant") {
          const prev = viewRef.current;
          setView(null);
          const ended = await getMyEndedClass().catch(() => null);
          setClosed(
            ended ?? {
              id: prev.session.id,
              courseId: prev.session.courseId,
              title: prev.session.title,
              createdAt: prev.session.createdAt,
              endedAt: new Date().toISOString(),
              hasBooklet: false,
            },
          );
        }
        return;
      }
      setView((prev) => {
        if (!prev) {
          void refresh();
          return prev;
        }
        if (prev.session.id !== pos.sessionId) return prev;
        if (prev.role === "host" && lastBroadcast.current.startsWith(`${pos.sessionId}:`)) {
          const parts = lastBroadcast.current.split(":");
          const optimisticModule = parts[1];
          const optimisticSlide = Number(parts[2]);
          if (
            optimisticModule &&
            (pos.moduleId !== optimisticModule || pos.slide !== optimisticSlide)
          ) {
            return prev;
          }
        }
        if (
          prev.session.currentModuleId === pos.moduleId &&
          prev.session.currentSlide === pos.slide &&
          prev.role === pos.role
        ) {
          return prev;
        }
        return {
          ...prev,
          role: pos.role,
          session: {
            ...prev.session,
            currentModuleId: pos.moduleId,
            currentSlide: pos.slide,
          },
        };
      });
    } catch (err) {
      if (!isUnauthorized(err)) console.warn("live position pull failed", err);
    } finally {
      pullInflight.current = false;
    }
  }, [userId, refresh]);

  useEffect(() => {
    if (isPending) {
      const t = window.setTimeout(() => setLoading(false), 1800);
      return () => window.clearTimeout(t);
    }
    void refresh();
    void pullPosition();
    const presence = window.setInterval(() => void refresh(), 2500);
    const position = window.setInterval(() => void pullPosition(), guest ? 1200 : 300);
    const onVis = () => {
      if (document.visibilityState === "visible") {
        void pullPosition();
        void refresh();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(presence);
      window.clearInterval(position);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [isPending, refresh, pullPosition, guest]);

  useEffect(() => {
    if (!view || view.role !== "host" || view.session.status !== "live") return;
    publishBus(view);
    let cancelled = false;
    const mergeGuests = () => {
      const current = viewRef.current;
      if (!current || current.role !== "host") return;
      const secret = getOrCreateRoomSecret(current.session.id);
      void pullGuestRoomBrowser(current.session.id, secret).then((guests) => {
        if (cancelled) return;
        setView((prev) => {
          if (!prev || prev.role !== "host") return prev;
          const phones = guests.map((g) => ({
            userId: `phone:${g.name.toLowerCase()}`,
            displayName: g.name,
            role: "participant" as const,
            joinedAt: new Date(g.lastSeen || Date.now()).toISOString(),
            lastSeenAt: new Date(g.lastSeen || Date.now()).toISOString(),
            online: g.online,
          }));
          const hosts = prev.members.filter((m) => m.role === "host");
          const others = prev.members.filter(
            (m) => m.role !== "host" && !String(m.userId).startsWith("phone:"),
          );
          const members = [...hosts, ...phones, ...others];
          return { ...prev, members, memberCount: members.length };
        });
      });
    };
    mergeGuests();
    const beat = window.setInterval(() => {
      const current = viewRef.current;
      if (!current || current.role !== "host") return;
      publishBus(current);
      mergeGuests();
    }, 2500);
    return () => {
      cancelled = true;
      window.clearInterval(beat);
    };
  }, [view?.session.id, view?.role, publishBus]);

  const openClass = useCallback(
    async (courseId: CourseId) => {
      const created = await createLiveClass({
        data: { courseId, displayName: name },
      });
      guestRef.current = false;
      setGuest(false);
      setView(created);
      setClosed(null);
      setLiveSession(created.session.id);
      enroll(created.session.courseId);
      setFollowPresenter(true);
      setShowJoinScreen(true);
      publishBus(created);
      return created;
    },
    [name, setLiveSession, enroll, setFollowPresenter, publishBus],
  );

  const joinClass = useCallback(
    async (code: string) => {
      const joined = await joinLiveClass({
        data: { code, displayName: name },
      });
      guestRef.current = false;
      setGuest(false);
      setView(joined);
      setClosed(null);
      setLiveSession(joined.session.id);
      enroll(joined.session.courseId);
      setFollowPresenter(true);
      if (joined.session.currentModuleId) {
        useAppStore.getState().setModuleSlide(
          joined.session.currentModuleId,
          joined.session.currentSlide,
        );
      }
      return joined;
    },
    [name, setLiveSession, enroll, setFollowPresenter],
  );

  const joinAsGuest = useCallback(
    async (code: string, displayName: string) => {
      const snap = await pullLiveBus({ data: { code } });
      if (!snap || snap.status !== "live") {
        throw new Error("That code is not live.");
      }
      guestRef.current = true;
      setGuest(true);
      const joined = viewFromBus(snap, "participant");
      if (displayName.trim()) {
        joined.members = [
          {
            userId: "guest",
            displayName: displayName.trim().slice(0, 80),
            role: "participant",
            joinedAt: new Date().toISOString(),
            lastSeenAt: new Date().toISOString(),
            online: true,
          },
        ];
      }
      setView(joined);
      setClosed(null);
      setLiveSession(joined.session.id);
      enroll(joined.session.courseId);
      setFollowPresenter(true);
      setLoading(false);
      if (joined.session.currentModuleId) {
        useAppStore.getState().setModuleSlide(
          joined.session.currentModuleId,
          joined.session.currentSlide,
        );
      }
      try {
        sessionStorage.setItem("cft-guest-name", displayName.trim().slice(0, 80));
      } catch {
        // ignore
      }
      return joined;
    },
    [setLiveSession, enroll, setFollowPresenter],
  );

  const endClass = useCallback(async () => {
    if (!view) return null;
    const code = view.session.id;
    publishBus(view, "ended");
    await endLiveClass({ data: code });
    setView(null);
    setLiveSession(null);
    setShowJoinScreen(false);
    lastBroadcast.current = "";
    guestRef.current = false;
    setGuest(false);
    return code;
  }, [view, setLiveSession, publishBus]);

  const leaveClass = useCallback(async () => {
    if (!view) return;
    if (guestRef.current) {
      guestRef.current = false;
      setGuest(false);
      setView(null);
      setLiveSession(null);
      return;
    }
    await leaveLiveClass({ data: view.session.id });
    setView(null);
    setLiveSession(null);
  }, [view, setLiveSession]);

  const broadcast = useCallback((moduleId: string, slide: number) => {
    const current = viewRef.current;
    if (!current || current.role !== "host") return;
    const key = `${current.session.id}:${moduleId}:${slide}`;
    if (key === lastBroadcast.current) return;
    lastBroadcast.current = key;
    const next: LiveClassView = {
      ...current,
      session: {
        ...current.session,
        currentModuleId: moduleId,
        currentSlide: slide,
      },
    };
    setView(next);
    publishBus(next);
    void broadcastLivePosition({
      data: { code: current.session.id, moduleId, slide },
    }).catch(() => {
      lastBroadcast.current = "";
    });
  }, [publishBus]);

  const value = useMemo<LiveClassContextValue>(
    () => ({
      view,
      closed,
      loading,
      follow,
      setFollow: setFollowPresenter,
      isHost: view?.role === "host",
      showJoinScreen,
      setShowJoinScreen,
      openClass,
      joinClass,
      joinAsGuest,
      endClass,
      leaveClass,
      broadcast,
      refresh,
    }),
    [
      view,
      closed,
      loading,
      follow,
      setFollowPresenter,
      showJoinScreen,
      openClass,
      joinClass,
      joinAsGuest,
      endClass,
      leaveClass,
      broadcast,
      refresh,
    ],
  );

  return <LiveClassContext.Provider value={value}>{children}</LiveClassContext.Provider>;
}

export function useLiveClass() {
  const ctx = useContext(LiveClassContext);
  if (!ctx) throw new Error("useLiveClass must be used inside LiveClassProvider");
  return ctx;
}
