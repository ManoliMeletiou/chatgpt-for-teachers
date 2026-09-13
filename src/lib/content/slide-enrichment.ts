export type SlideDiagramId =
  | "chatgpt-model"
  | "not-a-person"
  | "human-decide"
  | "fluency"
  | "literacy"
  | "scopev"
  | "traffic"
  | "habit"
  | "goal"
  | "maths-for"
  | "maths-files"
  | "maths-figure";

export type SlideEnrichment = {
  diagram?: SlideDiagramId;
  plain?: string;
  example?: string;
  remember?: string;
};

const ROWS: { test: (t: string) => boolean; extra: SlideEnrichment }[] = [
  {
    test: (t) => t.includes("pattern machine") || t.includes("not a mathematician"),
    extra: {
      diagram: "chatgpt-model",
      remember: "It does not prove Pythagoras. You still stand behind every line.",
    },
  },
  {
    test: (t) => t.includes("fluent maths") || t.includes("still be wrong"),
    extra: {
      diagram: "fluency",
      example:
        "A worked solution can invent a method, mark the right angle on the wrong vertex, or cite a page of the IB guide that does not exist.",
      remember: "If you cannot check it, it does not go to students.",
    },
  },
  {
    test: (t) => t.includes("actually for in maths"),
    extra: {
      diagram: "maths-for",
    },
  },
  {
    test: (t) => t.includes("why files beat"),
    extra: {
      diagram: "maths-files",
    },
  },
  {
    test: (t) => t.includes("brief it with scope-v"),
    extra: {
      diagram: "scopev",
      example:
        "Year 9 Pythagoras, 8 minutes, four questions increasing in demand, one misconception, answers on a separate key you will work. That is a brief.",
    },
  },
  {
    test: (t) => t.includes("generated images versus"),
    extra: {
      diagram: "maths-figure",
      remember: "If students will measure it, count on it, or copy it, it was not generated.",
    },
  },
  {
    test: (t) => t.includes("what we agree as a department") || t.includes("first 30 days at the maths"),
    extra: {
      diagram: "habit",
    },
  },
  {
    test: (t) => t.includes("teacher-friendly language") || t === "what is chatgpt?",
    extra: {
      diagram: "chatgpt-model",
      plain:
        "Treat it as a fluent drafting assistant. It is not a colleague, not a library of facts, and not allowed to take a teacher decision.",
      example:
        "Ask it for a Year 8 retrieval starter on photosynthesis. It will sound classroom-ready. You still check the science before anything is printed or shown.",
      remember: "Fluent is not the same as true.",
    },
  },
  {
    test: (t) => t.includes("professional authority") || t.includes("ai assistant"),
    extra: {
      diagram: "human-decide",
      plain:
        "ChatGPT can multiply options. It cannot decide what this class needs, what is fair, or what is safe.",
      example:
        "It may draft three versions of a quiz. You decide which items match the objective, the mark scheme, and the students in front of you.",
      remember: "Support is allowed. Authority stays with the teacher.",
    },
  },
  {
    test: (t) => t.includes("sound certain") || t.includes("hallucination"),
    extra: {
      diagram: "fluency",
      plain:
        "The model is trained to continue a useful-sounding answer. Confidence in the tone is not evidence.",
      example:
        "A paragraph that cites “OECD 2024” can still invent the page, the finding, or the document. Open the source before it reaches students.",
      remember: "If you cannot check it, you cannot use it yet.",
    },
  },
  {
    test: (t) => t.includes("professional competence") || t.includes("ai literacy is now"),
    extra: {
      diagram: "literacy",
      plain:
        "Prompt tricks are not literacy. Literacy is knowing what the tool is, where it fails, and which decisions stay human.",
      remember: "Understand. Judge the risk. Then act with oversight.",
    },
  },
  {
    test: (t) => t.includes("scope-v") || t === "prompt properly",
    extra: {
      diagram: "scopev",
      plain:
        "Brief it the way you would brief a colleague covering your class: situation, limits, the exact thing you want back, and how you will check it.",
      example:
        "“Year 7 fractions, 50 minutes, MYP Criterion A, no student names, one retrieval starter plus three misconceptions.” That is a brief. “Make a fractions lesson” is not.",
    },
  },
  {
    test: (t) =>
      (t.includes("green") || t.includes("traffic") || t.includes("pre-prompt check")) &&
      !t.includes("maths desk"),
    extra: {
      diagram: "traffic",
      remember: "If you would not pin it on a classroom wall, do not paste it into ChatGPT.",
    },
  },
  {
    test: (t) => t.includes("use more ai") || t.includes("the goal is not"),
    extra: {
      diagram: "goal",
      plain:
        "The win is a better teaching decision, less low-value workload, and a safer workflow — not more AI for its own sake.",
    },
  },
  {
    test: (t) => t.includes("build the habit") || t.includes("the move you will reuse") || t.startsWith("what is chatgpt"),
    extra: {
      diagram: "habit",
    },
  },
  {
    test: (t) => t.includes("workshop assumption") || t.includes("may not yet be school-approved"),
    extra: {
      diagram: "traffic",
      plain:
        "This room does not approve ChatGPT for your school. If approval is unknown, stay on public, synthetic or truly anonymous material.",
      remember: "Training is not permission.",
    },
  },
];

export function extraForSlide(title: string): SlideEnrichment | undefined {
  const t = title.toLowerCase();
  return ROWS.find((row) => row.test(t))?.extra;
}
