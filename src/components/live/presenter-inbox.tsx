import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getCourse } from "@/lib/content/courses";
import { displayCode } from "@/lib/live/codes";
import { getPresenterInbox, type PresenterRoom } from "@/lib/server/submissions";
import {
  finishedOf,
  formatClassDay,
  formatClassTime,
  formatElapsed,
  namesLine,
  participantsOf,
} from "@/components/live/session-records";
import { Badge } from "@/components/ui/badge";

export function PresenterInbox({
  empty = "hidden",
  heading = true,
}: {
  empty?: "hidden" | "message";
  heading?: boolean;
}) {
  const [rooms, setRooms] = useState<PresenterRoom[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      void getPresenterInbox()
        .then((rows) => {
          if (!cancelled) setRooms(rows);
        })
        .catch(() => {
          if (!cancelled) setRooms([]);
        });
    };
    load();
    const timer = window.setInterval(load, 4000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const groups = useMemo(() => groupByDate(rooms ?? []), [rooms]);

  if (rooms === null) {
    if (empty === "hidden") return null;
    return (
      <section className={heading ? "mt-12" : undefined}>
        {heading && (
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Past classes</p>
        )}
        <div className="mt-4 h-28 animate-pulse rounded-xl bg-line/70" />
      </section>
    );
  }

  if (rooms.length === 0) {
    if (empty === "hidden") return null;
    return (
      <section className={heading ? "mt-12" : undefined}>
        {heading && (
          <>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Past classes</p>
            <h2 className="mt-1 font-display text-2xl">No past classes yet.</h2>
          </>
        )}
        <p className="mt-2 max-w-xl text-sm text-ink-soft">
          Open a room as presenter. After teachers scan the QR and send their booklet, that class
          appears here so you can see who took part, which course it was, how long it lasted, and
          print certificates.
        </p>
      </section>
    );
  }

  return (
    <section className={heading ? "mt-12 space-y-8" : "space-y-8"}>
      {heading && (
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Past classes</p>
          <h2 className="mt-1 font-display text-2xl">Past classes.</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Open a class to see who participated, the exact course, how long it took, and to print
            booklets and certificates.
          </p>
        </div>
      )}
      {groups.map(([label, dayRooms]) => (
        <div key={label}>
          <h3 className="font-display text-xl">{label}</h3>
          <div className="mt-3 space-y-3">
            {dayRooms.map((room) => {
              const course = getCourse(room.courseId);
              const people = participantsOf(room);
              const finished = finishedOf(room);
              const when = formatClassTime(room.createdAt);
              const lasted = formatElapsed(room.createdAt, room.endedAt);
              return (
                <Link
                  key={room.id}
                  to="/log/$code"
                  params={{ code: room.id }}
                  className="block rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 hover:shadow-[var(--shadow-border-hover)] sm:p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-lg">
                      {when ? `${when} · ` : ""}
                      {course?.title ?? room.title}
                      <span className="ml-2 font-sans text-sm text-muted">
                        {displayCode(room.id)}
                      </span>
                    </h4>
                    <Badge variant={room.status === "live" ? "green" : "muted"}>
                      {room.status === "live" ? "Live now" : "Closed"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">
                    {course?.kicker ?? "Course"}
                    {lasted ? ` · ${room.status === "live" ? `running ${lasted}` : `lasted ${lasted}`}` : ""}
                    {course?.duration ? ` · planned ${course.duration}` : ""}
                  </p>
                  <p className="mt-3 text-sm text-ink">
                    {people.length} took part
                    {" · "}
                    {finished.length} booklet{finished.length === 1 ? "" : "s"}
                    {" · "}
                    {finished.length} certificate{finished.length === 1 ? "" : "s"} ready
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{namesLine(room)}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    Open this class
                    <ArrowRight className="size-3.5" />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

function groupByDate(rooms: PresenterRoom[]): [string, PresenterRoom[]][] {
  const map = new Map<string, PresenterRoom[]>();
  for (const room of rooms) {
    const key = formatClassDay(room.createdAt);
    const list = map.get(key) ?? [];
    list.push(room);
    map.set(key, list);
  }
  return [...map.entries()];
}
