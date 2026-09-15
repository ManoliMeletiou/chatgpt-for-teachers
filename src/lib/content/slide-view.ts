import type { Slide, SlideKind } from "./modules.ts";

export type ViewItem = {
  n: string;
  title: string;
  body: string;
};

export type SlideViewModel = {
  kind: SlideKind;
  title: string;
  kicker: string;
  activity: string;
  lead: string;
  duration: string;
  minutes: number;
  paras: string[];
  items: ViewItem[];
  sources: string[];
  steps: string[];
  path: string[];
  journey: boolean;
  avoidLabel: string;
  avoidBody: string;
  avoidBullets: string[];
  aimLabel: string;
  aimBody: string;
  aimBullets: string[];
  lens: string;
  notes: string;
  prompt: string;
  warning: string;
};

const KIND_KICKER: Record<SlideKind, string> = {
  teach: "Together",
  "hands-on": "Your turn",
  "avoid-aim": "Draw the line",
  step: "The move",
  lens: "Talk this through",
};

const KIND_ACTIVITY: Record<SlideKind, string> = {
  teach: "Listen with the room — tick a point as you take it in.",
  "hands-on": "Do this on your device. Write the answers in your booklet.",
  "avoid-aim": "Name the boundary. What stays with the teacher?",
  step: "Follow the sequence. This is the move you will reuse.",
  lens: "Talk with the person next to you. Then tick what you checked.",
};

const DURATION_RE = /^(\d+)\s*(min|minutes?)\.?$/i;
const NUM_PARA_RE = /^\d+\.$/;
const DECK_PAGE_RE = /\s+\d{1,3}$/;

function tidy(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function stripDeckPage(value: string): string {
  const trimmed = tidy(value);
  if (trimmed.length < 8) return trimmed;
  return trimmed.replace(DECK_PAGE_RE, "").trim();
}

function splitEvidence(value: string): { text: string; source: string } {
  const clean = stripDeckPage(value);
  // Some imported slide copy had its citation register glued onto an aim/lens
  // sentence. Keep the teaching sentence in the card and move the citation to
  // the compact evidence footer instead of displaying a wall of source text.
  const match = clean.match(/^(.*?)(?:\s+\d{1,3})?\s+(Sources?:\s+.+)$/i);
  if (!match?.[1] || !match[2]) return { text: clean, source: "" };
  return { text: tidy(match[1]), source: tidy(match[2]) };
}

function splitBullets(value: string): string[] {
  const text = tidy(value);
  if (!text) return [];
  if (text.includes(" • ")) return text.split(" • ").map(tidy).filter(Boolean);
  if (text.includes("•")) return text.split("•").map(tidy).filter(Boolean);
  return [text];
}

function extractPrompt(paras: string[], lens: string): string {
  for (const p of [...paras, lens]) {
    const m = p.match(/[“"]([^”"]+)[”"]/);
    if (m?.[1] && m[1].length > 12) return m[1];
  }
  return "";
}

function parseDuration(slide: Slide, paras: string[]): { duration: string; minutes: number; rest: string[] } {
  const fromSlide = slide.duration && DURATION_RE.test(slide.duration.trim()) ? slide.duration.trim() : "";
  const rest: string[] = [];
  let duration = fromSlide;
  for (const p of paras) {
    if (!duration && DURATION_RE.test(p.trim())) duration = p.trim();
    else if (fromSlide && DURATION_RE.test(p.trim())) continue;
    else rest.push(p);
  }
  const m = duration.match(DURATION_RE);
  return { duration, minutes: m ? Number(m[1]) : 0, rest };
}

function parseNumberedSteps(paras: string[]): { lead: string; steps: string[]; leftover: string[] } {
  const steps: string[] = [];
  const leftover: string[] = [];
  let lead = "";
  for (let i = 0; i < paras.length; i += 1) {
    const p = paras[i]!.trim();
    if (NUM_PARA_RE.test(p) && paras[i + 1]) {
      steps.push(tidy(paras[i + 1]!));
      i += 1;
      continue;
    }
    const numbered = p.match(/^(\d+)\.\s+(.+)$/);
    if (numbered?.[2]) {
      steps.push(tidy(numbered[2]));
      continue;
    }
    if (/^no real student/i.test(p)) {
      leftover.push(p);
      continue;
    }
    if (!lead) lead = p;
    else leftover.push(p);
  }
  return { lead, steps, leftover };
}

function parseAvoidAim(slide: Slide, paras: string[]) {
  const cleaned = paras.map(tidy).filter(Boolean);
  if (cleaned.length >= 5) {
    return {
      lead: cleaned[0] ?? "",
      avoidLabel: cleaned[1] ?? "Avoid",
      avoidBody: cleaned[2] ?? "",
      aimLabel: cleaned[3] ?? "Aim for",
      aimBody: cleaned[4] ?? "",
    };
  }
  if (cleaned.length === 4) {
    return {
      lead: "",
      avoidLabel: cleaned[0] ?? "Avoid",
      avoidBody: cleaned[1] ?? "",
      aimLabel: cleaned[2] ?? "Aim for",
      aimBody: cleaned[3] ?? "",
    };
  }
  const avoidRaw = splitEvidence(slide.avoid).text;
  const aimRaw = splitEvidence(slide.aim).text;
  return {
    lead: cleaned[0] ?? "",
    avoidLabel: "Avoid",
    avoidBody: avoidRaw,
    aimLabel: "Aim for",
    aimBody: aimRaw,
  };
}

export function viewOf(slide: Slide): SlideViewModel {
  const { duration, minutes, rest } = parseDuration(slide, slide.paras);
  const numbered = parseNumberedSteps(rest);
  const pair =
    slide.kind === "avoid-aim"
      ? parseAvoidAim(slide, numbered.lead ? [numbered.lead, ...numbered.leftover] : numbered.leftover)
      : {
          lead: numbered.lead,
          avoidLabel: "Avoid",
          avoidBody: splitEvidence(slide.avoid).text,
          aimLabel: "Aim for",
          aimBody: splitEvidence(slide.aim).text,
        };

  const mappedItems = slide.items
    .map((item) => ({
      n: item.n,
      title: tidy(item.title),
      body: tidy(item.body),
    }))
    .filter((item) => item.title || item.body);
  // Source-register lines belong in a compact evidence footer, not as giant
  // interactive checklist cards. This was one of the biggest visual problems
  // in the v1.2 renderer.
  const sources = mappedItems
    .filter((item) => /^sources?(?: checked)?\b/i.test(item.title))
    .map((item) => [item.title, item.body].filter(Boolean).join(" — "));
  for (const raw of [slide.avoid, slide.aim, slide.lens]) {
    const evidence = splitEvidence(raw).source;
    if (evidence && !sources.includes(evidence)) sources.push(evidence);
  }
  const items = mappedItems.filter((item) => !/^sources?(?: checked)?\b/i.test(item.title));

  const warning =
    [...rest, ...numbered.leftover].find((p) => /^no real student/i.test(p.trim())) ?? "";

  const pathSource = rest.find((p) => p.includes("→")) ?? "";
  const path = pathSource ? pathSource.split("→").map(tidy).filter(Boolean) : [];

  const lens = splitEvidence(slide.lens).text;
  const prompt = extractPrompt(rest, lens);

  let lead = numbered.lead || rest[0] || "";
  if (pathSource && lead === pathSource) lead = rest.find((p) => p !== pathSource) ?? "";
  if (DURATION_RE.test(lead)) lead = "";

  const paras = rest
    .filter((p) => p !== numbered.lead)
    .filter((p) => p !== pathSource)
    .filter((p) => !DURATION_RE.test(p.trim()))
    .filter((p) => !NUM_PARA_RE.test(p.trim()))
    .filter((p) => !/^no real student/i.test(p.trim()))
    .filter((p) => !items.some((it) => it.title === p));

  const displayParas =
    slide.kind === "avoid-aim"
      ? []
      : items.length > 0 || numbered.steps.length > 0
        ? paras.filter((p) => p !== lead).slice(0, 2)
        : paras.filter((p) => p !== lead);

  if (slide.kind === "avoid-aim" && pair.lead) {
    lead = pair.lead;
  }

  const journey = items.length >= 6;

  return {
    kind: slide.kind,
    title: tidy(slide.title),
    kicker: KIND_KICKER[slide.kind],
    activity: KIND_ACTIVITY[slide.kind],
    lead: tidy(lead),
    duration,
    minutes,
    paras: displayParas.map(tidy).filter(Boolean),
    items,
    sources,
    steps: numbered.steps,
    path,
    journey,
    avoidLabel: pair.avoidLabel,
    avoidBody: pair.avoidBody,
    avoidBullets: splitBullets(pair.avoidBody).filter((b) => b !== pair.avoidLabel),
    aimLabel: pair.aimLabel,
    aimBody: pair.aimBody,
    aimBullets: splitBullets(pair.aimBody).filter((b) => b !== pair.aimLabel),
    lens,
    notes: tidy(slide.notes),
    prompt,
    warning,
  };
}
