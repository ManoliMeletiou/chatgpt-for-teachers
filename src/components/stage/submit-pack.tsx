import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLiveClass } from "@/components/live/provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyBookletSubmission, submitBooklet } from "@/lib/server/submissions";
import { prettyPersonName } from "@/lib/person-name";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SubmitPack({
  compact = false,
}: {
  compact?: boolean;
}) {
  const live = useLiveClass();
  const { user } = useCurrentUserState();
  const values = useAppStore((s) => s.workbook);
  const set = useAppStore((s) => s.setWorkbook);
  const ticks = useAppStore((s) => s.capstoneTicks);
  const diagnostic = useAppStore((s) => s.diagnostic.pre);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentAt, setSentAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getMyBookletSubmission()
      .then((row) => {
        if (!cancelled && row) setSentAt(row.submittedAt);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [live.view?.session.id, user?.id]);

  const rating = Number(values["review-rating"] || 0);
  const canSend = Boolean(user) && rating >= 1 && !live.isHost;

  return (
    <section id="submit-pack" className="rounded-xl bg-accent p-5 text-accent-fg sm:p-6">
      <p className="text-[11px] uppercase tracking-[0.16em] text-accent-fg/70">Send to the presenter</p>
      <h2 className="mt-1 font-display text-2xl leading-tight">
        {sentAt ? "Booklet sent. You can update it." : "How was this course?"}
      </h2>
      {!compact && (
        <p className="mt-2 text-sm leading-relaxed text-accent-fg/85">
          One pack: your notes, how the session felt, what you will try next, and how the course
          could improve. The presenter sees this against your name.
        </p>
      )}
      <div className="mt-5 space-y-3">
        <Field
          id="review-feeling"
          label="How did this session feel?"
          placeholder="Useful, too fast, I needed more time on Projects…"
          value={values["review-feeling"] ?? ""}
          onChange={(v) => set("review-feeling", v)}
          rows={compact ? 2 : 3}
        />
        <Field
          id="review-takeaway"
          label="One thing I will try in the next 7 days"
          placeholder="A low-risk workflow you will actually run."
          value={values["review-takeaway"] ?? ""}
          onChange={(v) => set("review-takeaway", v)}
          rows={compact ? 2 : 3}
        />
        <Field
          id="review-improvement"
          label="How could this course improve?"
          placeholder="Pace, examples, time for the booklet, something missing…"
          value={values["review-improvement"] ?? ""}
          onChange={(v) => set("review-improvement", v)}
          rows={compact ? 2 : 3}
        />
        <div>
          <p className="text-sm">Overall, this session was useful. Tap a score to send.</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set("review-rating", String(n))}
                className={cn(
                  "h-12 min-w-12 rounded-md px-3 text-sm tabular-nums",
                  rating === n ? "bg-paper text-accent" : "bg-accent-fg/15 text-accent-fg",
                )}
              >
                {n}
              </button>
            ))}
          </div>
          {rating < 1 && (
            <p className="mt-2 text-sm text-accent-fg/80">Choose 1–5 before sending.</p>
          )}
        </div>
      </div>
      {error && <p className="mt-4 text-sm">{error}</p>}
      {sentAt && !error && (
        <p className="mt-4 text-sm text-accent-fg/80">
          Last sent {new Date(sentAt).toLocaleString()}. Sending again replaces that copy.{" "}
          <Link to="/certificate" className="underline underline-offset-2">
            Open your certificate
          </Link>
        </p>
      )}
      {!user ? (
        <Button asChild className="mt-5 bg-paper text-accent hover:bg-paper/90">
          <Link to="/login" search={{ next: "/workbook" }}>
            Sign in to send this booklet
          </Link>
        </Button>
      ) : (
        <Button
          className="mt-5 bg-paper text-accent hover:bg-paper/90"
          disabled={busy || !canSend}
          onClick={() => {
            setBusy(true);
            setError(null);
            void submitBooklet({
              data: {
                feeling: values["review-feeling"] ?? "",
                improvement: values["review-improvement"] ?? "",
                takeaway: values["review-takeaway"] ?? "",
                rating,
                workbook: values,
                capstoneTicks: ticks,
                diagnostic,
                displayName: prettyPersonName(user.displayName || user.primaryEmail),
              },
            })
              .then((row) => setSentAt(row.submittedAt))
              .catch((err) =>
                setError(err instanceof Error ? err.message : "Could not send the booklet."),
              )
              .finally(() => setBusy(false));
          }}
        >
          {busy ? "Sending…" : sentAt ? "Send updated booklet" : "Send booklet to the presenter"}
        </Button>
      )}
      {live.isHost && (
        <p className="mt-3 text-sm text-accent-fg/75">
          You receive booklets in Room, against each participant’s name.
        </p>
      )}
      {!live.view && user && !live.isHost && (
        <p className="mt-3 text-sm text-accent-fg/75">
          If you joined with a code today, this still goes to that presenter — even after the class
          closes.
        </p>
      )}
    </section>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  rows,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-accent-fg">
        {label}
      </Label>
      <Textarea
        id={id}
        rows={rows}
        className="bg-paper text-ink"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
