export type PromptCategory =
  | "scope-v"
  | "projects"
  | "resources"
  | "verification"
  | "safety"
  | "refuse";

export type PromptPattern = {
  id: string;
  category: PromptCategory;
  title: string;
  summary: string;
  body: string;
  warning?: string;
};

export const scopeVFields = [
  {
    key: "situation",
    letter: "S",
    label: "Situation",
    hint: "Course, age, audience, current learning.",
    placeholder: "Year 7 mathematics · first lesson on equivalent fractions · mixed prior knowledge",
  },
  {
    key: "constraints",
    letter: "C",
    label: "Constraints",
    hint: "Time, curriculum, resources, accessibility, boundaries.",
    placeholder: "50 minutes · IB MYP criterion A · no named student data · one projector, no mini-whiteboards",
  },
  {
    key: "output",
    letter: "O",
    label: "Output",
    hint: "Exact deliverable and format.",
    placeholder: "A lesson outline with retrieval starter, modelling, 3 misconceptions, guided + independent practice, exit ticket, teacher notes",
  },
  {
    key: "persona",
    letter: "P",
    label: "Persona",
    hint: "A useful expert role — not a gimmick.",
    placeholder: "Experienced MYP mathematics teacher who writes in plain English and flags uncertainty",
  },
  {
    key: "examples",
    letter: "E",
    label: "Examples",
    hint: "Model, style or sample — only if it changes the work.",
    placeholder: "Match the tone of the uploaded unit planner. Use the notation from the textbook excerpt.",
  },
  {
    key: "verification",
    letter: "V",
    label: "Verification",
    hint: "Accuracy, source, curriculum, accessibility and safety checks.",
    placeholder: "List every factual claim that needs checking. Flag missing prerequisites. Do not invent curriculum requirements.",
  },
] as const;

export const promptLibrary: PromptPattern[] = [
  {
    id: "scope-v-master",
    category: "scope-v",
    title: "SCOPE-V master template",
    summary: "The professional brief. Fill only the fields that change the work.",
    body: `Situation: [course / age / audience / current learning]
Constraints: [time, curriculum, resources, accessibility, boundaries]
Output: [exact deliverable and format]
Persona: [useful expert role]
Examples: [model/style/example, if needed]
Verification: [accuracy, source, curriculum, accessibility and safety checks]`,
  },
  {
    id: "project-instructions",
    category: "projects",
    title: "Project Instruction builder",
    summary: "Identity, purpose, source hierarchy, never-rules and a pre-use check.",
    body: `This Project supports [course/unit]. Its purpose is [repeatable work]. Use [source 1] for sequence, [source 2] for notation/examples and [policy/rubric] for local rules. If sources conflict, flag the conflict. Produce [standards]. Never invent dates, curriculum requirements, student facts or policy. Ask when a missing fact would materially change the answer. Before use, run an accuracy, curriculum, accessibility and safety check.`,
  },
  {
    id: "red-team",
    category: "projects",
    title: "Instruction red-team tests",
    summary: "Boundary, missing-info and source-conflict tests.",
    body: `Boundary test: Create a resource for a different curriculum than this Project supports.
Missing-info test: Tell me the assessment date. (when it is not in the sources)
Source-conflict test: These two synthetic sources disagree. Do not silently choose. Surface the conflict and ask which authority controls.`,
  },
  {
    id: "classroom-resource",
    category: "resources",
    title: "Classroom-ready resource",
    summary: "Lesson, worksheet or retrieval activity with scaffold and extension.",
    body: `Create a [lesson/worksheet/slides/retrieval activity] for [age/course] on [objective]. Use only the uploaded planner for sequence. Include prerequisites, likely misconceptions, explicit modelling, guided practice, independent practice, checks for understanding and an exit ticket. Keep the same learning objective in the scaffolded version. Create an extension that increases reasoning demand without introducing unplanned new content. Then verify every answer independently.`,
  },
  {
    id: "differentiation",
    category: "resources",
    title: "Differentiation without lowering expectations",
    summary: "Same objective. Scaffolded access plus a higher-demand extension.",
    body: `Keep the same learning objective. Create a scaffolded version using worked-example fading, vocabulary support and one-step prompts. Then create an extension that increases reasoning or transfer demand without introducing new content that is not in the planned sequence. Do not use or request real student names, diagnoses or case notes.`,
  },
  {
    id: "feedback-stems",
    category: "resources",
    title: "Feedback support — not grading",
    summary: "Misconception patterns and sentence stems from de-identified examples.",
    body: `Using only de-identified or fictional examples, identify common misconception patterns and draft feedback sentence stems. Do not assign final grades or make disciplinary/accommodation decisions. Flag legitimate alternative methods and any uncertainty.`,
  },
  {
    id: "verify-claims",
    category: "verification",
    title: "Verification pack",
    summary: "Do not ask only “Are you sure?”",
    body: `List every factual claim in this resource that needs external verification.
Check each answer independently and flag any ambiguity that could allow more than one valid answer.
Compare this lesson against the uploaded objectives; flag anything taught too early or omitted.
Identify cultural, accessibility or language assumptions that could exclude learners.
What assumptions are you making that I should verify?`,
  },
  {
    id: "source-hierarchy",
    category: "verification",
    title: "Source hierarchy",
    summary: "Tell the model what each source is for — and who decides.",
    body: `Use the planner for sequence/objectives, the approved reference for notation/examples, school policy for local rules, and the rubric for criteria/standards. Teacher judgement controls the final decision. If any source conflicts with another, do not silently choose: show the conflict and ask which authority controls.`,
  },
  {
    id: "final-qa",
    category: "verification",
    title: "Final pre-use QA",
    summary: "Four passes before anything reaches students.",
    body: `Before I use this with real students, run four passes: (1) factual/mathematical accuracy, (2) alignment to the supplied curriculum/source hierarchy, (3) accessibility/inclusion and (4) privacy/safeguarding/professional-judgement boundaries. List every change I should make before use.`,
  },
  {
    id: "parent-email",
    category: "safety",
    title: "Privacy-safe parent email draft",
    summary: "Non-identifying facts only. You review and send.",
    warning: "Replace any real person/case with fictional or truly anonymous details first.",
    body: `Draft a neutral parent email from these NON-IDENTIFYING facts only: [generic facts]. Do not infer names, diagnoses, family circumstances or events not provided. Flag any statement that would require checking against school records. I will review and send it myself.`,
  },
  {
    id: "anonymisation-test",
    category: "safety",
    title: "Anonymisation stress test",
    summary: "Removing a surname is not enough.",
    body: `Review this FICTIONAL example for identifiability. Identify combinations of details that could make a person recognisable. Do not tell me that removing a name is enough. Suggest a synthetic version that preserves the teaching problem without person-level detail.`,
  },
  {
    id: "connector-check",
    category: "safety",
    title: "Connector permission check",
    summary: "Least privilege. No school system access without approval.",
    body: `Before using this connected app, list what information/actions are required for the task and what permissions are unnecessary. Use least privilege. Do not access or change school systems unless the use and permissions are explicitly approved.`,
  },
  {
    id: "scheduled-task",
    category: "safety",
    title: "Low-risk scheduled task",
    summary: "Free-tier recurrence with a human checkpoint.",
    body: `Create a [weekly/monthly] reminder to [low-risk professional routine]. It must not monitor confidential systems, send parent/student messages automatically, grade students or make safeguarding decisions. Include a human review checkpoint.`,
  },
  {
    id: "refuse-grade",
    category: "refuse",
    title: "Do not use — named grading / SEN / discipline",
    summary: "This pattern is listed so you can recognise and refuse it.",
    warning: "Never send this to an unapproved tool with real data.",
    body: `Here are the named student’s marks, diagnosis and behaviour notes — tell me what grade / accommodation / discipline decision to make.`,
  },
  {
    id: "refuse-safeguarding",
    category: "refuse",
    title: "Do not use — safeguarding triage",
    summary: "Safeguarding stays on the school route.",
    warning: "Never send this to an unapproved tool.",
    body: `Here is a safeguarding disclosure — decide whether it is serious enough to report.`,
  },
  {
    id: "refuse-emotion",
    category: "refuse",
    title: "Do not use — biometric emotion inference",
    summary: "Prohibited under the AI Act in education (with limited medical/safety exceptions).",
    warning: "Do not pilot this. Escalate any proposed system.",
    body: `Analyse this webcam footage and infer which students are bored, anxious or disengaged.`,
  },
];

export const categoryLabel: Record<PromptCategory, string> = {
  "scope-v": "SCOPE-V",
  projects: "Projects",
  resources: "Resources",
  verification: "Verification",
  safety: "Safe / legal",
  refuse: "Refuse these",
};
