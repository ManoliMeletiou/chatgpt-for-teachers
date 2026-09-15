import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { runPractice } from "@/lib/ai/practice";
import { fiveQuestions } from "@/lib/content/legal";
import { scanPromptRisk } from "@/lib/pii";
import { useAppStore } from "@/lib/store";

type Search = { q?: string };

export const Route = createFileRoute("/_shell/practice")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: PracticePage,
});

function PracticePage() {
  const { q } = Route.useSearch();
  const [prompt, setPrompt] = useState(q ?? "");
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const add = useAppStore((s) => s.addPractice);
  const history = useAppStore((s) => s.practiceHistory);
  const flags = scanPromptRisk(prompt);

  useEffect(() => {
    if (q) setPrompt(q);
  }, [q]);

  async function run() {
    setError(null);
    setReply(null);
    if (!confirmed) {
      setError("Confirm the Green-data rule before running practice.");
      return;
    }
    if (flags.length) {
      setError("Clear the risk flags, or rewrite with a fully synthetic scenario.");
      return;
    }
    setBusy(true);
    try {
      const result = await runPractice({ data: { prompt } });
      setReply(result.text);
      add({ prompt, reply: result.text, at: Date.now() });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Practice failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page
      kicker="Practice sandbox"
      title="Rehearse a brief on synthetic data only."
      lead="This sandbox is a local SCOPE-V coach for synthetic data only. It does not send your brief to another AI provider, and it is not a school-approved ChatGPT workspace."
    >
      <div className="rounded-xl border border-amber bg-amber-bg p-5 text-amber">
        <p className="font-medium">Hard rule</p>
        <p className="mt-1 text-sm leading-relaxed">
          Use public, fictional, synthetic or truly anonymous non-confidential information
          only. Do not paste names, grades, SEN or medical details, safeguarding notes,
          parent complaints or school-system exports.
        </p>
      </div>

      <ol className="mt-6 grid gap-2 sm:grid-cols-2">
        {fiveQuestions.map((qst, i) => (
          <li key={qst} className="rounded-lg border border-line bg-surface px-4 py-3 text-sm">
            <span className="mr-2 font-display text-accent">{i + 1}</span>
            {qst}
          </li>
        ))}
      </ol>

      <div className="mt-6 space-y-3">
        <Label htmlFor="brief">Your SCOPE-V brief or practice prompt</Label>
        <Textarea
          id="brief"
          rows={10}
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setConfirmed(false);
          }}
          placeholder="Situation: fictional Year 7 class, first lesson on equivalent fractions…"
        />
        {flags.length > 0 && (
          <ul className="rounded-md bg-red-bg p-3 text-sm text-red">
            {flags.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-accent"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <span>
            I confirm this prompt contains no identifiable or confidential school data
            (Green / synthetic only).
          </span>
        </label>
        <Button onClick={run} disabled={busy || !prompt.trim()}>
          {busy ? "Drafting…" : "Run practice"}
        </Button>
        {error && <p className="text-sm text-red">{error}</p>}
      </div>

      {reply && (
        <article className="mt-8 rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Draft — verify before use</p>
          <div className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-ink-soft">
            {reply}
          </div>
        </article>
      )}

      {history.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Recent practice</h2>
          <ul className="mt-4 space-y-3">
            {history.map((h) => (
              <li key={h.at} className="rounded-lg border border-line bg-elevated p-4">
                <p className="text-sm text-muted">{new Date(h.at).toLocaleString()}</p>
                <p className="mt-1 line-clamp-3 text-sm">{h.prompt}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Page>
  );
}
