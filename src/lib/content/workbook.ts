export type WorkbookField = {
  id: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
};

export type WorkbookStep = {
  id: string;
  n: string;
  title: string;
  lead: string;
  fields: WorkbookField[];
};

export const workbookSteps: WorkbookStep[] = [
  {
    id: "open",
    n: "00",
    title: "Opening diagnostic",
    lead: "Choose one teaching workflow you want ChatGPT to improve. No real student personal data.",
    fields: [
      { id: "workflow", label: "One workflow I want to improve", placeholder: "e.g. retrieval starters for Year 9 science", multiline: true },
      { id: "risk", label: "One risk or concern I want answered", placeholder: "e.g. what I may put in a personal Free account", multiline: true },
    ],
  },
  {
    id: "what",
    n: "01",
    title: "What is ChatGPT?",
    lead: "Explain the tool critically. Distinguish useful generation from professional authority.",
    fields: [
      { id: "check-before-use", label: "What would I need to check before using an AI answer with real students?", multiline: true },
      { id: "never-delegate", label: "One decision I would never delegate to AI", multiline: true },
    ],
  },
  {
    id: "setup",
    n: "02",
    title: "Set it up",
    lead: "Identify the account, school policy, data controls, Memory and connected capabilities.",
    fields: [
      { id: "account", label: "Personal or managed school workspace?" },
      { id: "school-allows", label: "What does my school allow?", multiline: true },
      { id: "never-enter", label: "What data should never enter this account?", multiline: true },
    ],
  },
  {
    id: "personalise",
    n: "03",
    title: "Personalise it",
    lead: "Stable professional preferences only. Keep confidential class details out of Memory and custom instructions.",
    fields: [
      { id: "prefs", label: "3–5 stable professional facts or preferences", multiline: true },
      { id: "uncertainty", label: "Add: “Flag uncertainty and do not invent sources.” How will you phrase it?", multiline: true },
    ],
  },
  {
    id: "organise",
    n: "04",
    title: "Organise it",
    lead: "Projects for ongoing work. Meaningful naming instead of one endless chat.",
    fields: [
      { id: "projects", label: "Name 3–5 Projects you genuinely need", multiline: true },
      { id: "naming", label: "Chat naming convention" },
    ],
  },
  {
    id: "build",
    n: "05",
    title: "Build Projects",
    lead: "Create one real teaching Project and keep it within Free limits.",
    fields: [
      { id: "project-name", label: "Project name" },
      { id: "belong", label: "What files or sources belong here?", multiline: true },
      { id: "must-not", label: "What must not be stored here?", multiline: true },
    ],
  },
  {
    id: "instructions",
    n: "06",
    title: "Engineer Project Instructions",
    lead: "Identity, purpose, source hierarchy, quality standards and never-rules.",
    fields: [
      { id: "identity", label: "Identity / scope", multiline: true },
      { id: "purpose", label: "Purpose", multiline: true },
      { id: "sources", label: "Authoritative sources", multiline: true },
      { id: "never", label: "Never rules", multiline: true },
    ],
  },
  {
    id: "knowledge",
    n: "07",
    title: "Add knowledge",
    lead: "Add only authorised evidence. State what each source controls.",
    fields: [
      { id: "planner", label: "Planner controls…" },
      { id: "reference", label: "Textbook / reference controls…" },
      { id: "policy", label: "Policy / rubric controls…" },
      { id: "conflict", label: "If sources conflict, ChatGPT must…", multiline: true },
    ],
  },
  {
    id: "prompt",
    n: "08",
    title: "Prompt properly — SCOPE-V",
    lead: "Situation, Constraints, Output, Persona, Examples, Verification.",
    fields: [
      { id: "s", label: "Situation", multiline: true },
      { id: "c", label: "Constraints", multiline: true },
      { id: "o", label: "Output", multiline: true },
      { id: "p", label: "Persona" },
      { id: "e", label: "Examples", multiline: true },
      { id: "v", label: "Verification", multiline: true },
    ],
  },
  {
    id: "resource",
    n: "09",
    title: "Create teaching resources",
    lead: "Generate, differentiate and verify a classroom-ready artifact.",
    fields: [
      { id: "created", label: "Resource created", multiline: true },
      { id: "scaffold", label: "Scaffolded adaptation", multiline: true },
      { id: "extension", label: "Extension", multiline: true },
      { id: "accuracy", label: "Accuracy check", multiline: true },
      { id: "access", label: "Accessibility check", multiline: true },
    ],
  },
  {
    id: "tools",
    n: "10",
    title: "Free-tier tools and limits",
    lead: "Search, data analysis, images, existing GPTs, plugins/apps — only when they genuinely help.",
    fields: [
      { id: "which-tool", label: "Which tool genuinely improves this task?" },
      { id: "permissions", label: "What permissions or data does it require?", multiline: true },
      { id: "fallback", label: "What is my non-tool fallback?", multiline: true },
    ],
  },
  {
    id: "tasks",
    n: "11",
    title: "Scheduled tasks, carefully",
    lead: "Low-risk recurrence only, with a human checkpoint.",
    fields: [
      { id: "task", label: "Repeatable task" },
      { id: "cadence", label: "Safe trigger / cadence" },
      { id: "checkpoint", label: "Human checkpoint", multiline: true },
      { id: "stop", label: "Stop condition" },
    ],
  },
  {
    id: "safely",
    n: "12",
    title: "Work safely",
    lead: "Apply Green / Amber / Red, minimisation, safeguarding, assessment integrity and accessibility.",
    fields: [
      { id: "classify", label: "Classify a planned use: GREEN / AMBER / RED" },
      { id: "minimise", label: "What data will I remove or minimise?", multiline: true },
      { id: "human", label: "What must a human decide?", multiline: true },
    ],
  },
  {
    id: "capstone",
    n: "13",
    title: "Complete Teacher AI Workspace",
    lead: "Demonstrate a coherent, verified system rather than a collection of clever prompts.",
    fields: [
      { id: "configured", label: "Project configured" },
      { id: "tested", label: "Instructions tested", multiline: true },
      { id: "artifact", label: "Artifact produced", multiline: true },
      { id: "evidence", label: "Verification evidence", multiline: true },
      { id: "reusable-workflow", label: "Reusable workflow", multiline: true },
      { id: "checklist", label: "Safety checklist", multiline: true },
    ],
  },
  {
    id: "hour-open",
    n: "01",
    title: "One workflow this week",
    lead: "Name the maths workflow you want to improve. No real student personal data.",
    fields: [
      {
        id: "hour-workflow",
        label: "One maths workflow I want to improve this week",
        placeholder: "e.g. Year 9 Pythagoras retrieval · Criterion B scaffold · parent explanation of a method",
        multiline: true,
      },
      {
        id: "hour-risk",
        label: "One risk I want answered before I try it",
        placeholder: "e.g. unpublished tests, named work, generated graphs",
        multiline: true,
      },
    ],
  },
  {
    id: "hour-for",
    n: "02",
    title: "For / not for at my desk",
    lead: "Draw the line for your own teaching, not for AI in general.",
    fields: [
      {
        id: "hour-for",
        label: "One use I will try — and why it is green",
        placeholder: "e.g. four retrieval questions, answers on a key I will work myself",
        multiline: true,
      },
      {
        id: "hour-not-for",
        label: "One use I will not try — even if it would be faster",
        placeholder: "e.g. photographing a student’s book to mark it",
        multiline: true,
      },
    ],
  },
  {
    id: "hour-safety",
    n: "03",
    title: "Classify a planned use",
    lead: "Green, Amber or Red — with the wall test: would you pin this on a classroom wall?",
    fields: [
      {
        id: "hour-classify",
        label: "A planned use from my desk: GREEN / AMBER / RED",
        placeholder: "GREEN — my own fractions worksheet, no names",
      },
      {
        id: "hour-minimise",
        label: "What I will strip out or substitute",
        placeholder: "e.g. replace the class code with ‘a Year 9 class’",
        multiline: true,
      },
    ],
  },
  {
    id: "hour-files",
    n: "04",
    title: "Files for this unit",
    lead: "A Project is a teaching drawer, not a markbook. Free: up to five files.",
    fields: [
      {
        id: "hour-project",
        label: "Project name",
        placeholder: "MYP4 Standard form",
      },
      {
        id: "hour-belong",
        label: "Up to three files that belong here — and what each controls",
        placeholder: "IB excerpt → criterion language. Planner → sequence. My worksheet → pitch.",
        multiline: true,
      },
      {
        id: "hour-never-file",
        label: "What must never be stored here",
        placeholder: "class lists, photographed scripts, unpublished tests, marks",
        multiline: true,
      },
    ],
  },
  {
    id: "hour-make",
    n: "05",
    title: "A resource I will draft",
    lead: "Brief it like a covering colleague. Then you own every line of maths.",
    fields: [
      {
        id: "hour-brief",
        label: "SCOPE-V brief I will use (or the Pythagoras retrieval)",
        multiline: true,
      },
      {
        id: "hour-kept",
        label: "What I kept, what I cut, what I still need to check",
        multiline: true,
      },
    ],
  },
  {
    id: "hour-images",
    n: "06",
    title: "Images versus figures",
    lead: "Generated pictures are decoration. Graphs come from Desmos, GeoGebra or the GDC.",
    fields: [
      {
        id: "hour-image-yes",
        label: "One place I might use a generated image",
        placeholder: "e.g. a topic-hook slide, not a figure",
      },
      {
        id: "hour-image-no",
        label: "One place I will not",
        placeholder: "e.g. any graph students will read values from",
        multiline: true,
      },
    ],
  },
  {
    id: "hour-close",
    n: "07",
    title: "Department agreement",
    lead: "What you will try this week, what you will not, and how the hour felt.",
    fields: [
      {
        id: "hour-try",
        label: "One thing I will try this week at the maths desk",
        multiline: true,
      },
      {
        id: "hour-wont",
        label: "One thing I will not do, even if it would be faster",
        multiline: true,
      },
    ],
  },
];

export const capstoneChecks = [
  "I can explain what ChatGPT is and where it can fail.",
  "I can organise ongoing teaching work around Projects.",
  "I can write robust Project Instructions and source rules.",
  "I can create and verify teaching artifacts.",
  "I can explain the data and safety boundary before using AI.",
  "I know which decisions remain human.",
];

export const thirtyDays = [
  { week: "Week 1", action: "Set up + one Project", evidence: "A named Project with instructions and approved sources only." },
  { week: "Week 2", action: "Prompt + verify", evidence: "One SCOPE-V brief and a written verification pass." },
  { week: "Week 3", action: "Resource workflow", evidence: "One classroom artifact, scaffold, extension, teacher-owned." },
  { week: "Week 4", action: "Reflect + improve", evidence: "What failed, what you will not automate, next low-risk habit." },
];
