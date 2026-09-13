import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import {
  fiveQuestions,
  stopSubstituteEscalate,
  trafficLights,
  type TrafficLight,
} from "@/lib/content/legal";
import { clinicScenarios } from "@/lib/content/scenarios";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/data-card")({ component: DataCardPage });

const tone: Record<TrafficLight, string> = {
  green: "bg-green text-paper",
  amber: "bg-amber text-paper",
  red: "bg-red text-paper",
};

function DataCardPage() {
  const [cursor, setCursor] = useState(0);
  const [picked, setPicked] = useState<TrafficLight | null>(null);
  const add = useAppStore((s) => s.addClinic);
  const clinic = useAppStore((s) => s.clinic);
  const scene = clinicScenarios[cursor];
  const revealed = picked !== null;

  function choose(value: TrafficLight) {
    setPicked(value);
    add({ id: scene.id, picked: value, correct: value === scene.answer });
  }

  function next() {
    setPicked(null);
    setCursor((c) => (c + 1) % clinicScenarios.length);
  }

  const score = clinic.filter((c) => c.correct).length;

  return (
    <Page
      kicker="Teacher AI Data Decision Card"
      title="Print it. Keep it beside the laptop. Use it before every school-related prompt."
      lead="Version 1.2 · 10 September 2026. Default when ChatGPT is not school-approved: public, synthetic, fictional or truly anonymous non-confidential information only."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {trafficLights.map((t) => (
          <div key={t.id} className={cn("rounded-xl p-5", tone[t.id])}>
            <p className="text-[11px] uppercase tracking-[0.16em]">{t.label}</p>
            <p className="mt-3 text-sm leading-relaxed">{t.meaning}</p>
            <p className="mt-3 text-sm opacity-90">{t.examples}</p>
            <p className="mt-3 font-medium">{t.action}</p>
          </div>
        ))}
      </div>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Five questions</p>
          <ol className="mt-4 space-y-3">
            {fiveQuestions.map((q, i) => (
              <li key={q} className="flex gap-3 text-sm leading-relaxed">
                <span className="font-display text-accent">{i + 1}</span>
                {q}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl bg-accent p-6 text-accent-fg">
          <p className="text-[11px] uppercase tracking-[0.16em] text-accent-fg/70">
            If the answer is unclear
          </p>
          <div className="mt-4 grid gap-4">
            {stopSubstituteEscalate.map((s) => (
              <div key={s.title}>
                <p className="font-display text-xl">{s.title}</p>
                <p className="mt-1 text-sm text-accent-fg/85">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Scenario clinic</p>
            <h2 className="font-display text-2xl">Classify the use.</h2>
          </div>
          <p className="text-sm tabular-nums text-muted">
            {score} correct · {clinic.length} attempted
          </p>
        </div>
        <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
          <p className="text-sm text-muted tabular-nums">
            {cursor + 1} / {clinicScenarios.length}
          </p>
          <p className="mt-3 font-display text-xl leading-snug sm:text-2xl">{scene.prompt}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {(["green", "amber", "red"] as TrafficLight[]).map((t) => (
              <Button
                key={t}
                className={
                  t === "green"
                    ? "bg-green text-paper hover:opacity-90"
                    : t === "amber"
                      ? "bg-amber text-paper hover:opacity-90"
                      : "bg-red text-paper hover:opacity-90"
                }
                onClick={() => choose(t)}
                disabled={revealed}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </Button>
            ))}
          </div>
          {revealed && (
            <div className={cn("mt-6 rounded-lg border p-4", tone[scene.answer])}>
              <p className="font-medium">
                {picked === scene.answer ? "Correct." : `This is ${scene.answer}.`}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{scene.why}</p>
              <Button className="mt-4" variant="secondary" onClick={next}>
                Next scenario
              </Button>
            </div>
          )}
        </div>
      </section>
    </Page>
  );
}
