import { Link } from "@tanstack/react-router";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { workbookStepForModule } from "@/lib/content/path";
import { useAppStore } from "@/lib/store";

export function BookletRail({ moduleId }: { moduleId: string }) {
  const step = workbookStepForModule(moduleId);
  const values = useAppStore((s) => s.workbook);
  const set = useAppStore((s) => s.setWorkbook);
  const goal = (values.workflow ?? "").trim();
  if (!step) return null;

  const fields = step.fields.slice(0, 2);

  return (
    <aside className="mt-6 rounded-xl border border-line bg-elevated p-5 sm:p-6">
      <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted">
        <PenLine className="size-3.5" />
        This block’s booklet
      </p>
      <h2 className="mt-1 font-display text-xl">
        Step {step.n} · {step.title}
      </h2>
      <p className="mt-1 text-sm text-ink-soft">{step.lead}</p>
      {goal && step.id !== "open" && (
        <p className="mt-3 rounded-md bg-accent-soft px-3 py-2 text-sm text-ink">
          Your goal: {goal}
        </p>
      )}
      <div className="mt-4 space-y-4">
        {fields.map((f) => (
          <div key={f.id} className="space-y-1.5">
            <Label htmlFor={`rail-${f.id}`}>{f.label}</Label>
            {f.multiline ? (
              <Textarea
                id={`rail-${f.id}`}
                rows={3}
                placeholder={f.placeholder}
                value={values[f.id] ?? ""}
                onChange={(e) => set(f.id, e.target.value)}
              />
            ) : (
              <Input
                id={`rail-${f.id}`}
                placeholder={f.placeholder}
                value={values[f.id] ?? ""}
                onChange={(e) => set(f.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      <Button asChild variant="secondary" className="mt-4">
        <Link to="/workbook" hash={`step-${step.id}`}>
          Open the full booklet
        </Link>
      </Button>
    </aside>
  );
}
