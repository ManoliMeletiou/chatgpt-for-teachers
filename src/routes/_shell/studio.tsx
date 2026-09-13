import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Copy, Check } from "lucide-react";
import { Page } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  categoryLabel,
  promptLibrary,
  scopeVFields,
  type PromptCategory,
} from "@/lib/content/prompts";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/studio")({ component: StudioPage });

function StudioPage() {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<PromptCategory | "all">("all");
  const bookmarks = useAppStore((s) => s.bookmarkedPrompts);
  const toggle = useAppStore((s) => s.toggleBookmark);

  const brief = useMemo(() => {
    return scopeVFields
      .map((f) => {
        const v = (fields[f.key] ?? "").trim();
        return v ? `${f.label}: ${v}` : null;
      })
      .filter(Boolean)
      .join("\n");
  }, [fields]);

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  const visible =
    filter === "all" ? promptLibrary : promptLibrary.filter((p) => p.category === filter);

  return (
    <Page
      kicker="Prompt studio"
      title="Brief like a professional. Verify before you trust."
      lead="SCOPE-V is a reusable briefing frame, not a secret list of magic words. Fill only the fields that change the work. Never add confidential data just to feel specific."
      actions={
        <Button asChild>
          <Link to="/practice">Practice sandbox</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">SCOPE-V builder</p>
          <div className="mt-4 space-y-4">
            {scopeVFields.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <Label htmlFor={f.key}>
                  <span className="mr-2 font-display text-accent">{f.letter}</span>
                  <span>{f.label}</span>
                  <span className="ml-2 font-normal text-muted">— {f.hint}</span>
                </Label>
                <Textarea
                  id={f.key}
                  rows={2}
                  placeholder={f.placeholder}
                  value={fields[f.key] ?? ""}
                  onChange={(e) => setFields({ ...fields, [f.key]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              onClick={() => copy(brief || "Fill at least one SCOPE-V field.")}
              disabled={!brief}
            >
              {copied ? <Check /> : <Copy />}
              Copy brief
            </Button>
            <Button asChild variant="secondary" disabled={!brief}>
              <Link to="/practice" search={{ q: brief }}>
                Practise this brief
              </Link>
            </Button>
          </div>
        </div>

        <aside className="rounded-xl border border-line bg-elevated p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Assembled brief</p>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink-soft">
            {brief || "Your brief appears here as you type."}
          </pre>
        </aside>
      </div>

      <section className="mt-12">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl">Prompt library</h2>
          <div className="flex flex-wrap gap-1.5">
            {(["all", ...Object.keys(categoryLabel)] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key as typeof filter)}
                className={cn(
                  "h-9 rounded-full px-3 text-sm",
                  filter === key ? "bg-accent text-accent-fg" : "bg-line/70 text-ink-soft",
                )}
              >
                {key === "all" ? "All" : categoryLabel[key as PromptCategory]}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          {visible.map((p) => {
            const saved = bookmarks.includes(p.id);
            return (
              <article
                key={p.id}
                className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Badge variant={p.category === "refuse" ? "red" : "muted"}>
                      {categoryLabel[p.category]}
                    </Badge>
                    <h3 className="mt-2 font-medium">{p.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{p.summary}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={saved ? "Remove bookmark" : "Bookmark"}
                      onClick={() => toggle(p.id)}
                    >
                      {saved ? <BookmarkCheck /> : <Bookmark />}
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="Copy" onClick={() => copy(p.body)}>
                      <Copy />
                    </Button>
                  </div>
                </div>
                {p.warning && (
                  <p className="mt-3 rounded-md bg-amber-bg px-3 py-2 text-sm text-amber">{p.warning}</p>
                )}
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-md bg-elevated p-3 font-mono text-[12px] leading-relaxed text-ink-soft">
                  {p.body}
                </pre>
              </article>
            );
          })}
        </div>
      </section>
    </Page>
  );
}
