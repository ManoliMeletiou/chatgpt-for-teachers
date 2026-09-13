import { useEffect } from "react";
import { BookMarked, Send, X } from "lucide-react";
import { SubmitPack } from "@/components/stage/submit-pack";
import { useLiveClass } from "@/components/live/provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { stepFilledCount, workbookStepForModule } from "@/lib/content/path";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function BookletSheet({
  moduleId,
  open,
  onClose,
  focusSubmit = false,
}: {
  moduleId: string;
  open: boolean;
  onClose: () => void;
  focusSubmit?: boolean;
}) {
  const step = workbookStepForModule(moduleId);
  const values = useAppStore((s) => s.workbook);
  const set = useAppStore((s) => s.setWorkbook);
  const live = useLiveClass();
  const goal = (values.workflow ?? "").trim();
  const filled = step ? stepFilledCount(step, values) : 0;

  useEffect(() => {
    if (!open || !focusSubmit) return;
    const id = window.setTimeout(() => {
      document.getElementById("submit-pack")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(id);
  }, [open, focusSubmit]);

  return (
    <aside
      className={cn(
        "booklet-page flex h-full min-h-0 flex-col",
        open ? "h-full w-full" : "hidden",
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-amber/30 pl-8 pr-5 py-4">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-amber">
            <BookMarked className="size-3.5" />
            Workshop booklet
          </p>
          <p className="truncate font-display text-xl leading-tight">
            {step ? `Step ${step.n} · ${step.title}` : "Notes for this block"}
          </p>
          {step && (
            <p className="mt-0.5 text-xs text-muted">
              {filled} / {step.fields.length} filled · numbered prompts below
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-11 shrink-0 items-center justify-center rounded-md text-ink-soft hover:bg-amber/15 hover:text-ink"
          aria-label="Close booklet"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pl-8 pr-5 py-5">
        {goal && (
          <p className="mb-5 rounded-md bg-paper/80 px-3 py-2 text-sm text-ink">
            Your goal: {goal}
          </p>
        )}
        {step ? (
          <div className="space-y-5">
            <p className="text-sm text-ink-soft">{step.lead}</p>
            {step.fields.map((f, i) => (
              <div key={f.id} className="space-y-1.5">
                <Label htmlFor={`sheet-${f.id}`} className="flex gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-amber font-display text-sm text-paper">
                    {i + 1}
                  </span>
                  <span className="pt-1">{f.label}</span>
                </Label>
                {f.multiline ? (
                  <Textarea
                    id={`sheet-${f.id}`}
                    rows={3}
                    className="booklet-lines min-h-24 bg-transparent"
                    placeholder={f.placeholder}
                    value={values[f.id] ?? ""}
                    onChange={(e) => set(f.id, e.target.value)}
                  />
                ) : (
                  <Input
                    id={`sheet-${f.id}`}
                    className="h-12 border-0 border-b border-amber/40 bg-transparent px-0 shadow-none rounded-none focus-visible:ring-0"
                    placeholder={f.placeholder}
                    value={values[f.id] ?? ""}
                    onChange={(e) => set(f.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-soft">
            This block has no dedicated booklet step. Your notes from other blocks still live here
            at the end of the session.
          </p>
        )}

        <div className="mt-8">
          <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-amber">
            Last page — send to the presenter
          </p>
          <SubmitPack compact />
        </div>
      </div>
      {live.view && !live.isHost && (
        <div className="border-t border-amber/30 pl-8 pr-5 py-3">
          <p className="flex items-center gap-2 text-xs text-muted">
            <Send className="size-3.5" />
            Saves as you type. Score 1–5, then send the pack.
          </p>
        </div>
      )}
    </aside>
  );
}
