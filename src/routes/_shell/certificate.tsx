import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/layout/app-shell";
import { CertificateDocument } from "@/components/live/certificate-document";
import { formatClassDay } from "@/components/live/session-records";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCourse } from "@/lib/content/courses";
import { prettyPersonName } from "@/lib/person-name";
import { getMyBookletSubmission, type BookletSubmission } from "@/lib/server/submissions";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/certificate")({
  component: CertificatePage,
});

function CertificatePage() {
  const storedName = useAppStore((s) => s.certificateName);
  const role = useAppStore((s) => s.certificateRole);
  const school = useAppStore((s) => s.certificateSchool);
  const setCert = useAppStore((s) => s.setCertificate);
  const enrolled = useAppStore((s) => s.enrolledCourseId);
  const { user } = useCurrentUserState();
  const [pack, setPack] = useState<BookletSubmission | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void getMyBookletSubmission()
      .then((row) => {
        setPack(row);
        const current = useAppStore.getState();
        if (current.certificateName.trim()) return;
        const fromPack = row?.displayName;
        const fromUser = user?.displayName || user?.primaryEmail;
        const next = prettyPersonName(fromPack || fromUser);
        if (next && next !== "Participant") {
          current.setCertificate(next, current.certificateRole, current.certificateSchool);
        }
      })
      .catch(() => undefined)
      .finally(() => setLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const course = pack ? getCourse(pack.courseId) : enrolled ? getCourse(enrolled) : undefined;
  const issued = Boolean(pack);
  const day = formatClassDay(pack?.submittedAt ?? new Date().toISOString());
  const name = prettyPersonName(
    storedName || pack?.displayName || user?.displayName || user?.primaryEmail,
  );

  const data = useMemo(
    () =>
      course && name
        ? {
            name,
            courseTitle: course.title,
            courseKicker: course.kicker,
            duration: course.duration,
            day,
            school,
            role,
          }
        : null,
    [course, name, day, school, role],
  );

  return (
    <Page
      kicker="Certificate of completion"
      title="A named record of the course you finished."
      lead="Your name is taken from how you joined. Print or save as PDF. This is independent professional development — not OpenAI certification."
    >
      <div className="no-print mb-8 space-y-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        {!loaded ? (
          <div className="h-16 animate-pulse rounded-md bg-line/70" />
        ) : issued && course ? (
          <>
            <p className="text-[11px] uppercase tracking-[0.16em] text-accent">Ready to print</p>
            <p className="font-display text-2xl leading-tight">
              {name} · {course.title}
            </p>
            <p className="text-sm text-ink-soft">
              Completed {day}. Each person who sent their booklet gets their own certificate with
              their name already on it. The presenter can print the same sheet from the date log.
            </p>
          </>
        ) : (
          <p className="text-sm text-ink-soft">
            Send the workshop booklet at the end of the live class and this certificate is issued
            in your name for that course. You can check the spelling below first.
          </p>
        )}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="cert-name">Name on the certificate</Label>
            <Input
              id="cert-name"
              value={storedName}
              onChange={(e) => setCert(e.target.value, role, school)}
              placeholder="As it should appear"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cert-role">Role</Label>
            <Input
              id="cert-role"
              value={role}
              onChange={(e) => setCert(storedName, e.target.value, school)}
              placeholder="Teacher"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cert-school">School</Label>
            <Input
              id="cert-school"
              value={school}
              onChange={(e) => setCert(storedName, role, e.target.value)}
              placeholder="Optional"
            />
          </div>
        </div>
        <Button type="button" disabled={!data} onClick={() => window.print()}>
          Print or save as PDF
        </Button>
      </div>

      {data ? (
        <CertificateDocument data={data} />
      ) : (
        <div className="no-print rounded-xl border border-dashed border-line-strong px-6 py-16 text-center text-sm text-muted">
          Join a course, then send the booklet. Your named certificate is prepared from that.
        </div>
      )}
    </Page>
  );
}
