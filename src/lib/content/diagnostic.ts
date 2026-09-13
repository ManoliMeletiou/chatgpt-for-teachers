export type DiagnosticKind = "pre" | "post";

export type DiagnosticItem = {
  id: string;
  prompt: string;
  kind: "scale" | "choice";
  options?: string[];
};

export const diagnosticItems: DiagnosticItem[] = [
  {
    id: "confidence",
    prompt: "How confident are you using ChatGPT professionally as a teacher?",
    kind: "scale",
  },
  {
    id: "authority",
    prompt: "I can explain why fluent AI output is not the same as professional authority.",
    kind: "scale",
  },
  {
    id: "traffic",
    prompt: "I can classify a planned use as Green, Amber or Red before I prompt.",
    kind: "scale",
  },
  {
    id: "approval",
    prompt: "I can distinguish a personal account, a managed workspace, and school approval.",
    kind: "scale",
  },
  {
    id: "scopev",
    prompt: "I can write a SCOPE-V brief instead of a one-line “make me a lesson” prompt.",
    kind: "scale",
  },
  {
    id: "verify",
    prompt: "I treat every AI output as a draft and know what I must verify before classroom use.",
    kind: "scale",
  },
  {
    id: "human",
    prompt: "I can name the decisions that must stay meaningfully human-controlled.",
    kind: "scale",
  },
  {
    id: "avg",
    prompt: "I know when to stop and escalate under AVG / GDPR rather than experiment with real data.",
    kind: "scale",
  },
  {
    id: "aiact",
    prompt: "I understand that this course supports AI-literacy duties but does not certify AI Act compliance.",
    kind: "scale",
  },
  {
    id: "safeguarding",
    prompt: "I would never use a general AI tool as a safeguarding record or triage authority.",
    kind: "scale",
  },
  {
    id: "detectors",
    prompt: "I would not treat an AI-detector score as sole proof of academic misconduct.",
    kind: "scale",
  },
  {
    id: "students",
    prompt: "I would not instruct students to create personal AI accounts unless the school has approved that model.",
    kind: "scale",
  },
];

export const scaleLabels = ["1 — not yet", "2", "3 — developing", "4", "5 — secure"];
