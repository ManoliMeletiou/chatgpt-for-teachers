import { useEffect, useState } from "react";
import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Award, BookMarked, Printer, Trash2 } from "lucide-react";
import { Page } from "@/components/layout/app-shell";
import { PresenterAccount } from "@/components/presenter-account";
import {
  BookletBody,
  SessionPrintPack,
  bookletFor,
  finishedOf,
  formatClassDay,
  formatClassTime,
  formatElapsed,
  namesLine,
  participantsOf,
  usePrintJob,
} from "@/components/live/session-records";
import { EndCourseButton } from "@/components/live/end-course";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/lib/content/courses";
import { displayCode, normalizeCode } from "@/lib/live/codes";
import { deletePresenterRoom, getPresenterRoom, type PresenterRoom } from "@/lib/server/submissions";
import { usePreviewAuth } from "@/lib/use-preview-auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/log/$code")({
  component: SessionLogPage,
});

function SessionLogPage() {
  const { code: raw } = Route.useParams();
  const navigate = useNavigate();
  const code = normalizeCode(raw);
  const { signedIn, resolving } = usePreviewAuth();
  const [room, setRoom] = useState<PresenterRoom | null | undefined>(undefined);
  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const { job, print } = usePrintJob();

  useEffect(() => {
    if (!signedIn) return;
    let cancelled = false;
    const load = () => {
      void getPresenterRoom({ data: { code } })
        .then((row) => {
          if (!cancelled) setRoom(row);
        })
        .catch(() => {
          if (!cancelled) setRoom(null);
        });
    };
    load();
    const timer = window.setInterval(load, 4000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [code, signedIn]);

  if (resolving) {
    return (
      <Page kicker="Past classes" title="Opening this class.">
        <div className="h-40 animate-pulse rounded-xl bg-line/70" />
      </Page>
    );
  }

  if (!signedIn) {
    return <Navigate to="/login" search={{ next: `/log/${code}` }} />;
  }

  if (room === undefined) {
    return (
      <Page kicker="Past classes" title="Opening this class.">
        <div className="h-40 animate-pulse rounded-xl bg-line/70" />
      </Page>
    );
  }

  if (!room) {
    return (
      <Page
        kicker="Past classes"
        title="That class is not on this desk."
        lead="Only the presenter who opened the room can open it."
        actions={
          <Button asChild variant="secondary">
            <Link to="/log">Back to past classes</Link>
          </Button>
        }
      >
        <p className="text-sm text-muted">Check you are signed in as the presenter for that date.</p>
      </Page>
    );
  }

  const course = getCourse(room.courseId);
  const people = participantsOf(room);
  const finished = finishedOf(room);
  const day = formatClassDay(room.createdAt);
  const when = formatClassTime(room.createdAt);
  const lasted = formatElapsed(room.createdAt, room.endedAt);

  return (
    <Page
      kicker="Past classes"
      title={day}
      lead={`${when ? `${when} · ` : ""}${course?.title ?? room.title} · ${displayCode(room.id)}.`}
      actions={
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="secondary">
            <Link to="/log">
              <ArrowLeft className="size-4" />
              All past classes
            </Link>
          </Button>
          <PresenterAccount compact />
        </div>
      }
    >
      <div className="mb-6 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          {course?.kicker ?? "Course"}
        </p>
        <h2 className="mt-1 font-display text-2xl">{course?.title ?? room.title}</h2>
        <p className="mt-2 text-ink-soft">
          {room.status === "live"
            ? lasted
              ? `Running ${lasted}`
              : "Live now"
            : lasted
              ? `Lasted ${lasted}`
              : "Closed"}
          {course?.duration ? ` · planned ${course.duration}` : ""}
          {" · "}
          {people.length} took part
          {" · "}
          {finished.length} finished
        </p>
        <p className="mt-3 text-sm text-ink">{namesLine(room)}</p>
      </div>

      {room.status === "live" && (
        <div className="mb-6">
          <EndCourseButton
            bookletCount={finished.length}
            participantCount={people.length}
          />
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <Button
          disabled={finished.length === 0}
          onClick={() => print({ kind: "booklets" })}
        >
          <BookMarked className="size-4" />
          Print all booklets
        </Button>
        <Button
          disabled={finished.length === 0}
          variant="secondary"
          onClick={() => print({ kind: "certificates" })}
        >
          <Award className="size-4" />
          Print all certificates
        </Button>
        <Button
          disabled={finished.length === 0}
          variant="outline"
          onClick={() => print({ kind: "all" })}
        >
          <Printer className="size-4" />
          Print pack
        </Button>
        {room.status === "live" && (
          <Button asChild variant="outline">
            <Link to="/class">Back to the live room</Link>
          </Button>
        )}
      </div>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">
        A certificate is ready the moment they send the booklet. Print one person or the whole
        room. Use the browser print dialog — save as PDF if you do not need paper.
      </p>

      <ul className="mt-8 divide-y divide-line rounded-xl bg-surface shadow-[var(--shadow-border)]">
        {people.length === 0 && (
          <li className="px-5 py-6 text-sm text-muted">
            No one has joined this class yet. They appear here after they scan the QR and sign in.
          </li>
        )}
        {people.map((m) => {
          const sub = bookletFor(room, m.userId);
          const open = openId === m.userId;
          return (
            <li key={m.userId} className="px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-medium">
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        m.online ? "bg-green" : "bg-line-strong",
                      )}
                    />
                    {m.displayName}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {sub
                      ? `Finished · booklet sent · certificate ready${sub.rating ? ` · ${sub.rating}/5` : ""}`
                      : "Joined — booklet not sent yet"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sub ? (
                    <>
                      <Badge variant="green">Finished</Badge>
                      <Button
                        size="sm"
                        variant={open ? "secondary" : "outline"}
                        onClick={() => setOpenId(open ? null : m.userId)}
                      >
                        {open ? "Hide booklet" : "Read booklet"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => print({ kind: "booklet", userId: m.userId })}
                      >
                        <Printer className="size-3.5" />
                        Print booklet
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => print({ kind: "certificate", userId: m.userId })}
                      >
                        <Award className="size-3.5" />
                        Print certificate
                      </Button>
                    </>
                  ) : (
                    <Badge variant="muted">Waiting for booklet</Badge>
                  )}
                </div>
              </div>
              {open && sub && <BookletBody sub={sub} />}
            </li>
          );
        })}
      </ul>

      <section className="mt-8 rounded-xl border border-red/25 bg-red-bg/45 p-5 sm:p-6" aria-labelledby="retention-heading">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red">Data retention</p>
        <h2 id="retention-heading" className="mt-1 font-display text-2xl text-ink">Keep only what the workshop needs.</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
          Export anything the school genuinely needs, then remove this class when the purpose is finished. Set a documented retention period with the school; do not keep named participation and booklet data indefinitely by default.
        </p>
        {room.status === "live" ? (
          <p className="mt-4 text-sm font-semibold text-red">End this class before deleting its records.</p>
        ) : !confirmDelete ? (
          <Button className="mt-4" variant="danger" onClick={() => setConfirmDelete(true)}>
            <Trash2 className="size-4" />
            Delete this class data
          </Button>
        ) : (
          <div className="mt-4 rounded-lg border border-red/30 bg-surface p-4">
            <p className="text-sm font-semibold text-ink">Delete {displayCode(room.id)} permanently?</p>
            <p className="mt-1 text-sm text-ink-soft">This removes the class record, roster and stored signed-in booklet submissions from this desk. It cannot be undone.</p>
            {deleteError && <p className="mt-2 text-sm font-semibold text-red">{deleteError}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="danger"
                disabled={deleting}
                onClick={() => {
                  setDeleting(true);
                  setDeleteError("");
                  void deletePresenterRoom({ data: { code: room.id } })
                    .then(() => navigate({ to: "/log" }))
                    .catch((error: unknown) => {
                      setDeleteError(error instanceof Error ? error.message : "Could not delete the class.");
                      setDeleting(false);
                    });
                }}
              >
                <Trash2 className="size-4" />
                {deleting ? "Deleting…" : "Yes, delete permanently"}
              </Button>
              <Button variant="secondary" disabled={deleting} onClick={() => setConfirmDelete(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </section>

      <SessionPrintPack room={room} job={job} />
    </Page>
  );
}
