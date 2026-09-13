import { BookMarked } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { workbookStepForModule, stepFilledCount } from "@/lib/content/path";
import { useAppStore } from "@/lib/store";

export function WriteHere({
  moduleId,
  kind,
}: {
  moduleId: string;
  kind?: string;
}) {
  const step = workbookStepForModule(moduleId);
  const values = useAppStore((s) => s.workbook);
  const set = useAppStore((s) => s.setWorkbook);
  if (!step) return null;
  const filled = stepFilledCount(step, values);
  const doNow = kind === "hands-on" || kind === "lens" || kind === "step";
  const fields = doNow
    ? step.fields
    : step.fields.filter((f) => !(values[f.id] ?? "").trim()).slice(0, 3);
  const shown = fields.length > 0 ? fields : step.fields.slice(0, 2);

  return (
    <section className="booklet-page mx-auto mt-4 w-full max-w-5xl pl-8 pr-5 py-5 sm:pr-7 sm:py-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-amber">
            <BookMarked className="size-3.5" />
            Your booklet · write on this page
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight sm:text-2xl">
            Step {step.n} · {step.title}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">{step.lead}</p>
        </div>
        <p className="shrink-0 rounded-md bg-amber px-2 py-1 text-[11px] font-medium tabular-nums text-paper">
          {filled} / {step.fields.length}
        </p>
      </div>
      <div className="mt-5 space-y-5">
        {shown.map((f, i) => (
          <div key={f.id} className="space-y-1.5">
            <Label htmlFor={`now-${f.id}`} className="flex gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-amber font-display text-sm text-paper">
                {i + 1}
              </span>
              <span className="pt-1">{f.label}</span>
            </Label>
            {f.multiline ? (
              <Textarea
                id={`now-${f.id}`}
                rows={3}
                className="booklet-lines min-h-28 bg-transparent"
                placeholder={f.placeholder}
                value={values[f.id] ?? ""}
                onChange={(e) => set(f.id, e.target.value)}
              />
            ) : (
              <Input
                id={`now-${f.id}`}
                className="h-12 border-0 border-b border-amber/40 bg-transparent px-0 shadow-none rounded-none focus-visible:ring-0"
                placeholder={f.placeholder}
                value={values[f.id] ?? ""}
                onChange={(e) => set(f.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">
        Saves as you type. The presenter receives this page with the rest of the booklet at the end.
      </p>
    </section>
  );
}
