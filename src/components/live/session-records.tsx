import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CertificateDocument } from "@/components/live/certificate-document";
import { getCourse } from "@/lib/content/courses";
import { prettyPersonName } from "@/lib/person-name";
import { workbookSteps } from "@/lib/content/workbook";
import { displayCode } from "@/lib/live/codes";
import type { BookletSubmission, PresenterRoom } from "@/lib/server/submissions";

export type PrintJob =
  | { kind: "booklet"; userId: string }
  | { kind: "certificate"; userId: string }
  | { kind: "booklets" }
  | { kind: "certificates" }
  | { kind: "all" };

export function formatClassDay(iso: string) {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return "Earlier";
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatClassTime(iso: string) {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return "";
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function formatElapsed(startIso: string, endIso?: string | null) {
  const start = new Date(startIso).getTime();
  const end = endIso ? new Date(endIso).getTime() : Date.now();
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return "";
  const mins = Math.max(0, Math.round((end - start) / 60000));
  if (mins < 1) return "under a minute";
  if (mins === 1) return "1 minute";
  if (mins < 120) return `${mins} minutes`;
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  if (rest === 0) return hours === 1 ? "1 hour" : `${hours} hours`;
  return `${hours} h ${rest} min`;
}

export function fieldLabel(id: string) {
  for (const step of workbookSteps) {
    const f = step.fields.find((x) => x.id === id);
    if (f) return f.label;
  }
  if (id === "review-feeling") return "How it felt";
  if (id === "review-takeaway") return "They’ll try";
  if (id === "review-improvement") return "Improve the course";
  if (id === "review-rating") return "Rating";
  return id;
}

export function participantsOf(room: PresenterRoom) {
  return room.members.filter((m) => m.role !== "host");
}

export function finishedOf(room: PresenterRoom) {
  const people = participantsOf(room);
  return people.filter((m) => room.submissions.some((s) => s.userId === m.userId));
}

export function bookletFor(room: PresenterRoom, userId: string) {
  return room.submissions.find((s) => s.userId === userId) ?? null;
}

export function personNameOf(room: PresenterRoom, userId: string) {
  const sub = bookletFor(room, userId);
  const member = room.members.find((m) => m.userId === userId);
  return prettyPersonName(sub?.displayName || member?.displayName);
}

export function namesLine(room: PresenterRoom) {
  const people = participantsOf(room);
  if (people.length === 0) return "No one has joined yet.";
  const names = people.map((m) => personNameOf(room, m.userId));
  if (names.length <= 8) return names.join(" · ");
  return `${names.slice(0, 8).join(" · ")} · +${names.length - 8} more`;
}

export function usePrintJob() {
  const [job, setJob] = useState<PrintJob | null>(null);

  useEffect(() => {
    if (!job) return;
    let printed = false;
    const fire = () => {
      if (printed) return;
      printed = true;
      window.print();
    };
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.setTimeout(fire, 80);
      });
    });
    const done = () => setJob(null);
    window.addEventListener("afterprint", done);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("afterprint", done);
    };
  }, [job]);

  return { job, print: setJob };
}

export function BookletBody({ sub }: { sub: BookletSubmission }) {
  const filled = Object.entries(sub.workbook).filter(
    ([k, v]) => v.trim() && !k.startsWith("review-"),
  );
  return (
    <div className="mt-3 space-y-3 rounded-lg bg-elevated p-4 text-sm">
      {sub.rating != null && (
        <p>
          <span className="text-muted">Rating. </span>
          {sub.rating}/5
        </p>
      )}
      {sub.feeling && (
        <p>
          <span className="text-muted">How it felt. </span>
          {sub.feeling}
        </p>
      )}
      {sub.takeaway && (
        <p>
          <span className="text-muted">They’ll try. </span>
          {sub.takeaway}
        </p>
      )}
      {sub.improvement && (
        <p>
          <span className="text-muted">Improve the course. </span>
          {sub.improvement}
        </p>
      )}
      {filled.map(([k, v]) => (
        <p key={k}>
          <span className="text-muted">{fieldLabel(k)}. </span>
          {v}
        </p>
      ))}
    </div>
  );
}

export function SessionPrintPack({
  room,
  job,
}: {
  room: PresenterRoom;
  job: PrintJob | null;
}) {
  const course = getCourse(room.courseId);
  const sheets = useMemo(() => {
    if (!job) return [];
    const people = participantsOf(room);
    const wanted =
      "userId" in job ? people.filter((p) => p.userId === job.userId) : people;
    const out: { type: "booklet" | "certificate"; userId: string; sub: BookletSubmission }[] = [];
    for (const person of wanted) {
      const sub = bookletFor(room, person.userId);
      if (!sub) continue;
      if (job.kind === "booklet" || job.kind === "booklets" || job.kind === "all") {
        out.push({ type: "booklet", userId: person.userId, sub });
      }
      if (job.kind === "certificate" || job.kind === "certificates" || job.kind === "all") {
        out.push({ type: "certificate", userId: person.userId, sub });
      }
    }
    return out;
  }, [job, room]);

  if (!job || sheets.length === 0 || typeof document === "undefined") return null;

  const day = formatClassDay(room.createdAt);
  const title = course?.title ?? room.title;

  return createPortal(
    <div className="print-pack">
      {sheets.map((sheet, i) =>
        sheet.type === "booklet" ? (
          <BookletPrintSheet
            key={`${sheet.sub.id}-b-${i}`}
            sub={sheet.sub}
            name={personNameOf(room, sheet.userId)}
            courseTitle={title}
            day={day}
            code={room.id}
          />
        ) : (
          <div key={`${sheet.sub.id}-c-${i}`} className="print-sheet">
            <CertificateDocument
              data={{
                name: personNameOf(room, sheet.userId),
                courseTitle: title,
                courseKicker: course?.kicker,
                duration: course?.duration,
                day,
              }}
            />
          </div>
        ),
      )}
    </div>,
    document.body,
  );
}

function BookletPrintSheet({
  sub,
  name,
  courseTitle,
  day,
  code,
}: {
  sub: BookletSubmission;
  name: string;
  courseTitle: string;
  day: string;
  code: string;
}) {
  return (
    <article className="print-sheet">
      <p className="text-[11px] uppercase tracking-[0.18em] text-amber">Workshop booklet</p>
      <h1 className="mt-2 font-display text-3xl">{name}</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {courseTitle} · {day} · {displayCode(code)}
      </p>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed">
        {sub.rating != null && (
          <p>
            <span className="font-medium">Rating. </span>
            {sub.rating}/5
          </p>
        )}
        {sub.feeling && (
          <p>
            <span className="font-medium">How it felt. </span>
            {sub.feeling}
          </p>
        )}
        {sub.takeaway && (
          <p>
            <span className="font-medium">They’ll try. </span>
            {sub.takeaway}
          </p>
        )}
        {sub.improvement && (
          <p>
            <span className="font-medium">Improve the course. </span>
            {sub.improvement}
          </p>
        )}
        {workbookSteps.map((step) => {
          const rows = step.fields
            .map((f) => ({ label: f.label, value: (sub.workbook[f.id] ?? "").trim() }))
            .filter((r) => r.value);
          if (rows.length === 0) return null;
          return (
            <section key={step.id} className="border-t border-line pt-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                Step {step.n} · {step.title}
              </p>
              {rows.map((r) => (
                <p key={r.label} className="mt-2">
                  <span className="font-medium">{r.label}. </span>
                  {r.value}
                </p>
              ))}
            </section>
          );
        })}
      </div>
    </article>
  );
}
