import { extraForSlide } from "@/lib/content/slide-enrichment";
import { visualForSlide } from "@/lib/content/slide-visuals";
import type { Slide } from "@/lib/content/modules";
import { viewOf } from "@/lib/content/slide-view";
import { SlideDiagram, itemIconName } from "@/components/stage/slide-diagrams";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Check,
  Clock,
  Lightbulb,
  MessageCircle,
  MessagesSquare,
  Pause,
  PenLine,
  Play,
  Scale,
  Shield,
  ShieldAlert,
} from "lucide-react";

export function SlideCanvas({ slide }: { slide: Slide }) {
  const view = viewOf(slide);
  const visual = visualForSlide(slide.title);
  const extra = extraForSlide(slide.title);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggle(key: string) {
    setChecked((c) => ({ ...c, [key]: !c[key] }));
  }

  const kindBar =
    view.kind === "hands-on"
      ? "bg-amber"
      : view.kind === "avoid-aim"
        ? "bg-red"
        : view.kind === "lens"
          ? "bg-green"
          : "bg-accent";

  const dense = view.items.length >= 6 || Boolean(view.journey) || Boolean(extra?.diagram);
  const itemCols =
    view.items.length === 3
      ? "sm:grid-cols-3"
      : view.items.length > 2 && view.items.some((it) => it.body)
        ? "lg:grid-cols-2"
        : "grid-cols-1";

  return (
    <article
      key={slide.title}
      className="stage-slide relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl bg-elevated shadow-[var(--shadow-border)]"
    >
      <div className={cn("flex flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-10", kindBar)}>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-paper">
          {view.kicker}
          {view.duration ? ` · ${view.duration}` : ""}
        </p>
        {view.kind === "hands-on" && view.minutes > 0 && <SlideTimer minutes={view.minutes} onColor />}
      </div>
      <div className={cn("px-5 py-6 sm:px-10", dense ? "sm:py-7" : "sm:py-9")}>

        <h2
          className={cn(
            "max-w-[22ch] font-display leading-[1.12]",
            dense ? "text-2xl sm:text-4xl" : "text-[1.85rem] sm:text-5xl",
          )}
        >
          {view.title}
        </h2>

        <p className="mt-3 max-w-2xl text-sm text-muted">{view.activity}</p>

        {view.lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {view.lead}
          </p>
        )}

        {extra?.plain && extra.plain !== view.lead && !extra.diagram && (
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink">{extra.plain}</p>
        )}

        {extra?.diagram && !visual && <SlideDiagram id={extra.diagram} />}

        {visual && (
          <figure className="mt-6 overflow-hidden rounded-lg bg-elevated shadow-[var(--shadow-border)]">
            <img
              src={visual.src}
              alt={visual.alt}
              className="mx-auto max-h-[min(28rem,55vh)] w-full object-contain object-top bg-elevated outline outline-1 -outline-offset-1 outline-ink/10"
            />
            <figcaption className="border-t border-line px-4 py-3 text-sm leading-relaxed text-ink-soft">
              {visual.caption}
            </figcaption>
          </figure>
        )}

        {view.path.length > 1 && <PathSteps steps={view.path} />}

        {view.paras.map((p) => (
          <p key={p} className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
            {p}
          </p>
        ))}

        {view.prompt && (
          <blockquote className="mt-8 rounded-lg bg-accent px-5 py-5 text-accent-fg sm:px-7 sm:py-7">
            <p className="text-[11px] uppercase tracking-[0.16em] text-accent-fg/70">
              Talk with the person next to you
            </p>
            <p className="mt-3 flex items-start gap-3 font-display text-2xl leading-snug sm:text-4xl">
              <MessageCircle className="mt-1 size-6 shrink-0 sm:size-7" strokeWidth={1.75} />
              {view.prompt}
            </p>
          </blockquote>
        )}

        {view.steps.length > 0 && (
          <ol className="mt-8 space-y-3">
            {view.steps.map((step, i) => {
              const key = `step-${i}`;
              const on = Boolean(checked[key]);
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg px-4 py-4 text-left transition-colors duration-150",
                      on ? "bg-green-bg" : "bg-elevated shadow-[var(--shadow-border)]",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md font-display text-sm",
                        on ? "bg-green text-paper" : "bg-amber-bg text-amber",
                      )}
                    >
                      {on ? <Check className="size-4" /> : i + 1}
                    </span>
                    <span className={cn("pt-1.5 text-[16px] leading-snug sm:text-lg", on && "text-green")}>
                      {step}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        )}

        {view.journey && view.items.length > 0 && (
          <JourneyPath items={view.items} checked={checked} onToggle={toggle} />
        )}

        {!view.journey && view.items.length > 0 && (
          <ul className={cn("mt-8 grid gap-3", itemCols)}>
            {view.items.map((item, i) => {
              const key = `item-${i}`;
              const on = Boolean(checked[key]);
              const n = item.n === "check" ? String(i + 1) : item.n;
              const warn = /wrong|fail|hallucin|never|red|bias/i.test(item.title);
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className={cn(
                      "flex h-full w-full items-start gap-3 rounded-lg border-l-4 px-4 py-4 text-left transition-colors duration-150",
                      warn
                        ? "border-red bg-red-bg"
                        : view.kind === "hands-on"
                          ? "border-amber bg-amber-bg"
                          : view.kind === "lens"
                            ? "border-green bg-green-bg"
                            : "border-accent bg-accent-soft",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md",
                        on
                          ? warn
                            ? "bg-red text-paper"
                            : "bg-accent text-accent-fg"
                          : warn
                            ? "bg-red-bg text-red"
                            : "bg-accent-soft text-accent",
                      )}
                    >
                      {on ? <Check className="size-4" /> : <ItemGlyph name={itemIconName(item.title)} fallback={n} />}
                    </span>
                    <span>
                      <span className="block font-medium leading-snug text-ink">{item.title}</span>
                      {item.body && (
                        <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                          {item.body}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {(view.avoidBody || view.aimBody) && (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {view.avoidBody && (
              <Side tone="avoid" label={view.avoidLabel} bullets={view.avoidBullets} body={view.avoidBody} />
            )}
            {view.aimBody && (
              <Side tone="aim" label={view.aimLabel} bullets={view.aimBullets} body={view.aimBody} />
            )}
          </div>
        )}

        {extra?.example && (
          <div className="mt-6 rounded-lg bg-accent-soft px-5 py-4">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-accent">
              <Lightbulb className="size-3.5" />
              In the classroom
            </p>
            <p className="mt-2 text-[16px] leading-relaxed text-ink">{extra.example}</p>
          </div>
        )}

        {extra?.remember && (
          <p className="mt-6 rounded-lg bg-ink px-4 py-3 text-sm leading-relaxed text-accent-fg">
            <span className="mr-2 text-[11px] uppercase tracking-[0.16em] text-accent-fg/60">
              Hold this
            </span>
            {extra.remember}
          </p>
        )}

        {view.warning && (
          <p className="mt-6 flex items-start gap-2 rounded-lg bg-amber-bg px-4 py-3 text-sm text-amber">
            <ShieldAlert className="mt-0.5 size-4 shrink-0" />
            {view.warning}
          </p>
        )}
      </div>
    </article>
  );
}

function ItemGlyph({ name, fallback }: { name: string; fallback: string }) {
  const cls = "size-4";
  switch (name) {
    case "pen":
      return <PenLine className={cls} />;
    case "chat":
      return <MessagesSquare className={cls} />;
    case "alert":
      return <AlertTriangle className={cls} />;
    case "book":
      return <BookOpen className={cls} />;
    case "scale":
      return <Scale className={cls} />;
    case "shield":
      return <Shield className={cls} />;
    case "check":
      return <Check className={cls} />;
    default:
      return <span className="font-display text-sm">{fallback}</span>;
  }
}

function PathSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-8 grid gap-2 sm:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step} className="rounded-lg bg-accent-soft px-4 py-4">
          <p className="flex size-8 items-center justify-center rounded-md bg-accent font-display text-sm text-accent-fg">
            {String(i + 1).padStart(2, "0")}
          </p>
          <p className="mt-2 font-medium leading-snug">{step}</p>
        </li>
      ))}
    </ol>
  );
}

function JourneyPath({
  items,
  checked,
  onToggle,
}: {
  items: { n: string; title: string; body: string }[];
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  const hasBodies = items.some((it) => it.body);
  return (
    <ol className={cn("mt-6 grid gap-2", hasBodies ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2")}>
      {items.map((item, i) => {
        const key = `item-${i}`;
        const on = Boolean(checked[key]);
        const hint = !item.body ? JOURNEY_HINTS[item.title] || "" : "";
        const n = item.n || String(i + 1);
        return (
          <li key={key}>
            <button
              type="button"
              onClick={() => onToggle(key)}
              className={cn(
                "flex h-full w-full items-start gap-2 rounded-lg border-l-4 px-2.5 py-2.5 text-left sm:gap-3 sm:px-3 sm:py-3",
                on ? "border-accent bg-accent-soft" : "border-accent bg-elevated shadow-[var(--shadow-border)]",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md font-display text-xs sm:size-8 sm:text-sm",
                  on ? "bg-accent text-accent-fg" : "bg-accent-soft text-accent",
                )}
              >
                {on ? <Check className="size-3.5" /> : n}
              </span>
              <span className="min-w-0">
                <span className={cn("block text-sm font-medium leading-snug sm:text-base", on && "text-accent")}>
                  {item.title}
                </span>
                {item.body ? (
                  <span className="mt-0.5 block text-xs leading-snug text-ink-soft sm:text-sm">{item.body}</span>
                ) : hint ? (
                  <span className="mt-0.5 hidden text-xs leading-snug text-ink-soft sm:block">{hint}</span>
                ) : null}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

const JOURNEY_HINTS: Record<string, string> = {
  "What is ChatGPT?": "What it can draft — and what it must never decide.",
  "Set it up": "Account, school policy, Memory, data you never enter.",
  "Personalise it": "Stable professional preferences only.",
  "Organise it": "Named Projects instead of one endless chat.",
  "Build Projects": "One real teaching Project, within Free limits.",
  "Engineer project instructions": "Identity, sources, quality, never-rules.",
  "Add knowledge": "Approved files only. Say what each source controls.",
  "Prompt properly": "SCOPE-V: brief it like a colleague.",
  "Create teaching resources": "Generate, adapt, verify, then you own it.",
  "Use Free-tier tools & limits": "Search, files, images, tasks — with a human check.",
};

function Side({
  tone,
  label,
  bullets,
  body,
}: {
  tone: "avoid" | "aim";
  label: string;
  bullets: string[];
  body: string;
}) {
  const many = bullets.length > 1;
  return (
    <div
      className={cn(
        "rounded-lg p-5",
        tone === "avoid" ? "bg-red-bg text-red" : "bg-green-bg text-green",
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.16em]">{label}</p>
      {many ? (
        <ul className="mt-3 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm leading-snug">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm leading-relaxed sm:text-[15px]">{body}</p>
      )}
    </div>
  );
}

function SlideTimer({ minutes, onColor = false }: { minutes: number; onColor?: boolean }) {
  const total = minutes * 60;
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const m = Math.floor(left / 60);
  const s = left % 60;

  return (
    <div className={cn("flex items-center gap-2 rounded-md px-3 py-1.5", onColor ? "bg-paper/20 text-paper" : "bg-amber-bg text-amber")}>
      <Clock className="size-3.5" />
      <span className="font-mono text-sm tabular-nums">
        {m}:{String(s).padStart(2, "0")}
      </span>
      <button
        type="button"
        className="ml-1 rounded p-1 hover:bg-paper/60"
        onClick={() => {
          if (left === 0) setLeft(total);
          setRunning((v) => !v);
        }}
        aria-label={running ? "Pause timer" : "Start timer"}
      >
        {running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
      </button>
    </div>
  );
}
