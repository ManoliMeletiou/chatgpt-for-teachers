import type { SlideDiagramId } from "@/lib/content/slide-enrichment";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  LineChart,
  Scale,
  Shield,
  Triangle,
  Upload,
} from "lucide-react";

export function SlideDiagram({ id }: { id: SlideDiagramId }) {
  switch (id) {
    case "chatgpt-model":
      return <ChatGptModel />;
    case "not-a-person":
      return <ChatGptModel />;
    case "human-decide":
      return <HumanDecide />;
    case "fluency":
      return <Fluency />;
    case "literacy":
      return <Literacy />;
    case "scopev":
      return <ScopeV />;
    case "traffic":
      return <Traffic />;
    case "habit":
      return <Habit />;
    case "goal":
      return <Goal />;
    case "maths-for":
      return <MathsFor />;
    case "maths-files":
      return <MathsFiles />;
    case "maths-figure":
      return <MathsFigure />;
    default:
      return null;
  }
}

function ChatGptModel() {
  return (
    <div className="mt-6 overflow-hidden rounded-lg bg-elevated shadow-[var(--shadow-border)]">
      <div className="grid sm:grid-cols-[1fr_auto_1fr]">
        <div className="bg-red-bg px-5 py-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-red">Not this</p>
          <p className="mt-2 font-display text-2xl leading-tight text-red">A person who knows.</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            It does not understand your class, remember your students, or stand behind a grade.
          </p>
        </div>
        <div className="hidden items-center justify-center bg-line px-2 sm:flex" aria-hidden>
          <ArrowRight className="size-5 text-muted" />
        </div>
        <div className="bg-green-bg px-5 py-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-green">This</p>
          <p className="mt-2 font-display text-2xl leading-tight text-green">A pattern machine.</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            It predicts a useful next response from your brief, the files you gave it, and patterns
            in its training.
          </p>
        </div>
      </div>
    </div>
  );
}

function HumanDecide() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg bg-accent-soft px-5 py-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-accent">ChatGPT may draft</p>
        <ul className="mt-3 space-y-2 text-sm leading-snug text-ink">
          {[
            "First drafts and variations",
            "Practice questions and explanations",
            "Formatting and admin wording",
            "A second pair of eyes on a plan",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg bg-green-bg px-5 py-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-green">You still decide</p>
        <ul className="mt-3 space-y-2 text-sm leading-snug text-ink">
          {[
            "What this class actually needs",
            "Whether it is correct and fair",
            "Grades, safeguarding, discipline",
            "Anything that carries a name",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green" />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Fluency() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg bg-amber-bg px-5 py-6">
        <p className="font-display text-4xl leading-none text-amber">Fluent</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Complete sentences. Confident tone. Looks like a finished teaching resource.
        </p>
      </div>
      <div className="rounded-lg bg-red-bg px-5 py-6">
        <p className="font-display text-4xl leading-none text-red">≠ true</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Sources can be invented. Science can be slightly wrong. Bias can sit in the examples.
        </p>
      </div>
    </div>
  );
}

function Literacy() {
  const steps = [
    { icon: BookOpen, t: "Understand", d: "What it is, what it can do, where it fails." },
    { icon: Scale, t: "Judge risk", d: "Privacy, fairness, assessment, safeguarding." },
    { icon: Shield, t: "Act with oversight", d: "Verify, follow policy, keep the human decision." },
  ];
  return (
    <ol className="mt-6 grid gap-3 sm:grid-cols-3">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.t} className="rounded-lg bg-elevated px-4 py-5 shadow-[var(--shadow-border)]">
            <p className="text-[11px] uppercase tracking-[0.14em] text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <Icon className="mt-3 size-6 text-accent" strokeWidth={1.6} />
            <p className="mt-3 font-display text-xl">{s.t}</p>
            <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
          </li>
        );
      })}
    </ol>
  );
}

function ScopeV() {
  const letters = [
    ["S", "Situation"],
    ["C", "Constraints"],
    ["O", "Output"],
    ["P", "Persona"],
    ["E", "Examples"],
    ["V", "Verify"],
  ];
  return (
    <ol className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
      {letters.map(([l, name]) => (
        <li
          key={l}
          className="rounded-lg bg-accent px-2 py-3 text-center text-accent-fg sm:py-4"
        >
          <p className="font-display text-2xl sm:text-3xl">{l}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-accent-fg/80">{name}</p>
        </li>
      ))}
    </ol>
  );
}

function Traffic() {
  const lights = [
    { c: "bg-green", t: "Green", d: "Public, synthetic, or truly anonymous." },
    { c: "bg-amber", t: "Amber", d: "Pause. Internal or maybe identifiable." },
    { c: "bg-red", t: "Red", d: "Names, grades, SEN, safeguarding — stop." },
  ];
  return (
    <ol className="mt-6 grid gap-3 sm:grid-cols-3">
      {lights.map((l) => (
        <li key={l.t} className="flex items-start gap-3 rounded-lg bg-elevated px-4 py-4 shadow-[var(--shadow-border)]">
          <span className={cn("mt-1 size-4 shrink-0 rounded-full", l.c)} />
          <span>
            <span className="block font-medium">{l.t}</span>
            <span className="mt-1 block text-sm text-ink-soft">{l.d}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function Habit() {
  const steps = ["Build the habit", "Practise it live", "Use it safely"];
  return (
    <ol className="mt-6 grid gap-2 sm:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s} className="rounded-lg bg-accent-soft px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-accent">
            {String(i + 1).padStart(2, "0")}
          </p>
          <p className="mt-1 font-medium leading-snug">{s}</p>
        </li>
      ))}
    </ol>
  );
}

function Goal() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <div className="flex items-start gap-3 rounded-lg bg-red-bg px-4 py-4">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red" />
        <div>
          <p className="font-medium text-red">Not the goal</p>
          <p className="mt-1 text-sm text-ink-soft">Using more AI. Collecting prompts. Sounding technical.</p>
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-lg bg-green-bg px-4 py-4">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green" />
        <div>
          <p className="font-medium text-green">The goal</p>
          <p className="mt-1 text-sm text-ink-soft">
            Better decisions, less grind, safer workflows, teacher still in charge.
          </p>
        </div>
      </div>
    </div>
  );
}

function MathsFor() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg bg-green-bg px-5 py-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-green">For</p>
        <p className="mt-2 font-display text-2xl leading-tight text-green">Drafts you will check.</p>
        <ul className="mt-3 space-y-2 text-sm leading-snug text-ink">
          {[
            "Retrieval, exit tickets, worked-example fading",
            "Same objective, scaffold and extension",
            "Parent-friendly explanation of a method",
            "A first answer key — then you work every item",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green" />
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg bg-red-bg px-5 py-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-red">Not for</p>
        <p className="mt-2 font-display text-2xl leading-tight text-red">Anything that counts as a person.</p>
        <ul className="mt-3 space-y-2 text-sm leading-snug text-ink">
          {[
            "Unpublished tests and live exam papers",
            "Marks, ManageBac comments, named work",
            "Graphs and labelled geometry",
            "Doing a student’s homework or Criterion B",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red" />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MathsFiles() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg bg-accent-soft px-5 py-5">
        <Upload className="size-5 text-accent" strokeWidth={1.6} />
        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-accent">Upload</p>
        <ul className="mt-3 space-y-2 text-sm leading-snug">
          {[
            "Public IB excerpt — controls criterion language",
            "Your planner — controls sequence (no names)",
            "Your own worksheet — controls pitch",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg bg-red-bg px-5 py-5">
        <AlertTriangle className="size-5 text-red" strokeWidth={1.6} />
        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-red">Never store</p>
        <ul className="mt-3 space-y-2 text-sm leading-snug">
          {[
            "Class lists and photographed scripts",
            "Unpublished tests and markbook exports",
            "Anything with a child’s name, photo or mark",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red" />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MathsFigure() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg bg-red-bg px-5 py-5">
        <Triangle className="size-5 text-red" strokeWidth={1.6} />
        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-red">Generated picture</p>
        <p className="mt-2 font-display text-2xl leading-tight">Looks like maths. Is not maths.</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Right angle on the wrong vertex. Axes without scale. A parabola that misses the intercept.
        </p>
      </div>
      <div className="rounded-lg bg-green-bg px-5 py-5">
        <LineChart className="size-5 text-green" strokeWidth={1.6} />
        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-green">Figure</p>
        <p className="mt-2 font-display text-2xl leading-tight">Desmos, GeoGebra, GDC.</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Plot it. Screenshot it. Then ChatGPT may write questions about that graph — you still check the intercepts.
        </p>
      </div>
    </div>
  );
}

export function itemIconName(title: string) {
  const t = title.toLowerCase();
  if (t.includes("generat")) return "pen";
  if (t.includes("reason") || t.includes("context")) return "chat";
  if (t.includes("wrong") || t.includes("fail") || t.includes("hallucin")) return "alert";
  if (t.includes("understand")) return "book";
  if (t.includes("judge") || t.includes("risk")) return "scale";
  if (t.includes("act") || t.includes("responsib")) return "shield";
  if (t.includes("verif")) return "check";
  return "dot";
}
