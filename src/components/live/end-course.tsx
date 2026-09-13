import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useLiveClass } from "@/components/live/provider";
import { Button } from "@/components/ui/button";

export function EndCourseButton({
  bookletCount,
  participantCount,
  variant = "primary",
}: {
  bookletCount: number;
  participantCount: number;
  variant?: "primary" | "header";
}) {
  const live = useLiveClass();
  const navigate = useNavigate();
  const [ask, setAsk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    const code = live.view?.session.id;
    setBusy(true);
    setError(null);
    try {
      await live.endClass();
      if (code) {
        await navigate({ to: "/log/$code", params: { code } });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not end the course.");
      setBusy(false);
    }
  }

  if (!ask) {
    return (
      <Button
        type="button"
        variant={variant === "header" ? "outline" : "danger"}
        onClick={() => setAsk(true)}
      >
        End of course
      </Button>
    );
  }

  return (
    <div className="rounded-xl bg-red-bg p-4 text-ink">
      <p className="font-medium">End this class and lock the slides?</p>
      <p className="mt-1 text-sm text-ink-soft">
        {bookletCount === 0
          ? "No booklets yet. You can still close — teachers will be locked out of the lesson."
          : `${bookletCount} booklet${bookletCount === 1 ? "" : "s"} received${
              participantCount
                ? ` from ${participantCount} teacher${participantCount === 1 ? "" : "s"}`
                : ""
            }. After this they cannot reopen the lesson.`}
      </p>
      {error && <p className="mt-2 text-sm text-red">{error}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" variant="danger" disabled={busy} onClick={() => void confirm()}>
          {busy ? "Closing…" : "End and lock the room"}
        </Button>
        <Button type="button" variant="secondary" disabled={busy} onClick={() => setAsk(false)}>
          Not yet
        </Button>
      </div>
    </div>
  );
}
