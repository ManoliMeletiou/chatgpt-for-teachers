export type CourseId = "math-hour" | "essentials" | "half-day" | "full-day" | "multi";

export type CourseSession = {
  title: string;
  duration: string;
  summary: string;
  moduleIds: string[];
};

export type Course = {
  id: CourseId;
  kicker: string;
  title: string;
  duration: string;
  contact: string;
  slides: string;
  bestFor: string;
  summary: string;
  pace: string;
  coverage: "full" | "selective";
  sessions: CourseSession[];
};

export const courses: Course[] = [
  {
    id: "math-hour",
    kicker: "Maths department",
    title: "1-hour ChatGPT for maths",
    duration: "60 minutes",
    contact: "1 contact hour",
    slides: "31-slide live hour",
    bestFor:
      "A department meeting: how to use ChatGPT correctly at the maths desk — files, safety, documents, images, and what it is actually for.",
    summary:
      "A presentable hour for a mathematics department. Correct use, Green / Amber / Red for Netherlands schools, uploading documents into a Project, creating worksheets you will check, and why generated images are not diagrams. Safety is not optional even in 60 minutes.",
    pace: "Talk-through with two short live practices and a department agreement. Booklets go to the presenter at the close.",
    coverage: "selective",
    sessions: [
      {
        title: "How to use it — and for what",
        duration: "14 min",
        summary: "Teacher in control. Pattern machine, not a mathematician. What it is for at the maths desk, and what it is not.",
        moduleIds: ["24", "25"],
      },
      {
        title: "Safety at the maths desk",
        duration: "10 min",
        summary: "Green / Amber / Red with maths examples. Unpublished tests and named students stay out.",
        moduleIds: ["26"],
      },
      {
        title: "Uploading documents",
        duration: "8 min",
        summary: "One Project per unit. What to add. What must never be stored.",
        moduleIds: ["27"],
      },
      {
        title: "Creating documents",
        duration: "10 min",
        summary: "SCOPE-V briefs, worksheets you will verify, differentiation that keeps the objective.",
        moduleIds: ["28"],
      },
      {
        title: "Images and diagrams",
        duration: "8 min",
        summary: "Generated pictures are decoration. Graphs come from Desmos, GeoGebra or the GDC.",
        moduleIds: ["29"],
      },
      {
        title: "Department agreement and close",
        duration: "10 min",
        summary: "What we will try, what we will not, booklet to the presenter, certificates ready.",
        moduleIds: ["30"],
      },
    ],
  },
  {
    id: "essentials",
    kicker: "Staff introduction",
    title: "2-hour AI Essentials",
    duration: "120 minutes",
    contact: "2 contact hours",
    slides: "44-slide live route · 96-slide reference library",
    bestFor: "A staff introduction or rapid upskilling when the diary will not give you a full day.",
    summary:
      "A usable ChatGPT workflow you can apply tomorrow, with the full Netherlands / EU safety, privacy, assessment and governance core made impossible to miss. Live practice is selective; the safety strand is not.",
    pace: "PRE diagnostic, one Project/instruction example, one resource prompt, selected safety scenarios, implementation checkpoint.",
    coverage: "selective",
    sessions: [
      {
        title: "Welcome and opening diagnostic",
        duration: "8 min",
        summary: "Professional mindset: the goal is better teaching decisions, not more AI.",
        moduleIds: ["01"],
      },
      {
        title: "What ChatGPT is — and why it can be wrong",
        duration: "10 min",
        summary: "Fluency is not truth. AI supports; the teacher decides.",
        moduleIds: ["02", "03"],
      },
      {
        title: "Account, setup and workspace",
        duration: "14 min",
        summary: "Personal vs managed vs school approval. Safe default setup.",
        moduleIds: ["04"],
      },
      {
        title: "Projects, instructions and source hierarchy",
        duration: "23 min",
        summary: "Build one teaching Project. Engineer instructions. Add only approved sources.",
        moduleIds: ["07"],
      },
      {
        title: "SCOPE-V prompting and a first resource",
        duration: "12 min",
        summary: "Professional briefing, one practical resource, verification before use.",
        moduleIds: ["05", "06", "09"],
      },
      {
        title: "Mandatory Netherlands / EU safe-legal core",
        duration: "30 min",
        summary: "Green / Amber / Red, AVG, AI Act, safeguarding, incident response.",
        moduleIds: ["14", "15", "17"],
      },
      {
        title: "Students, governance and close",
        duration: "23 min",
        summary: "Disclosure, school rules, mini-capstone and first-30-days checkpoint.",
        moduleIds: ["12", "22", "23"],
      },
    ],
  },
  {
    id: "half-day",
    kicker: "School-wide workshop",
    title: "Half-day workshop",
    duration: "3 hours 30 minutes",
    contact: "200 contact minutes + 10-minute break",
    slides: "82-slide live route · 147-slide reference library",
    bestFor: "A school-wide practical workshop: end-to-end workflow with selected hands-on builds.",
    summary:
      "Configure ChatGPT safely, organise work, build Projects, prompt professionally, create resources, use Free-tier tools, verify outputs and operate inside Dutch/EU privacy, assessment and governance boundaries.",
    pace: "Setup audit; Project build; one prompt/resource iteration; safety scenario cluster; mini-capstone. Other slides are the participant’s complete reference.",
    coverage: "selective",
    sessions: [
      {
        title: "Welcome, diagnostic and AI foundations",
        duration: "12 min",
        summary: "Where you are now. What ChatGPT is. Why fluent output can still be wrong.",
        moduleIds: ["01", "02", "03"],
      },
      {
        title: "Setup, personalisation and organisation",
        duration: "18 min",
        summary: "Account audit, Memory awareness, naming and pinning a workspace.",
        moduleIds: ["04"],
      },
      {
        title: "Projects, instructions and source control",
        duration: "35 min",
        summary: "Engineered instructions, files, hierarchy, boundary tests.",
        moduleIds: ["07", "19"],
      },
      {
        title: "Prompting, verification and resource creation",
        duration: "25 min",
        summary: "SCOPE-V, the professional loop, one classroom-ready artifact.",
        moduleIds: ["05", "06", "08", "09", "11"],
      },
      {
        title: "Current tools, plugins, research and tasks",
        duration: "25 min",
        summary: "Permissions, plugins/apps, GPT migration, search, Study Mode and scheduled-task limits.",
        moduleIds: ["20", "21"],
      },
      {
        title: "Mandatory safe-legal core and scenarios",
        duration: "40 min",
        summary: "The full Netherlands / EU core plus a safety clinic.",
        moduleIds: ["13", "14", "15", "16", "17"],
      },
      {
        title: "Students, governance, mini-capstone",
        duration: "45 min",
        summary: "Disclosure, school rules, POST diagnostic, first 30 days.",
        moduleIds: ["12", "18", "22", "23"],
      },
    ],
  },
  {
    id: "full-day",
    kicker: "Complete PD day",
    title: "Full-day programme",
    duration: "6 contact hours",
    contact: "360 minutes + two 10-minute breaks + lunch",
    slides: "114-slide live route · 153-slide reference library",
    bestFor: "A complete professional-development day with substantial practice, safety and a capstone.",
    summary:
      "The full practical Teacher AI Workspace: setup through Projects, Resource Studio, tools, scheduled workflows, the entire safe-legal strand, student literacy and a 30-day plan.",
    pace: "Participants must build and verify actual low-risk workflows, and be able to explain data they may use, when to stop, and which decisions stay human.",
    coverage: "full",
    sessions: [
      {
        title: "Opening and PRE diagnostic",
        duration: "20 min",
        summary: "Baseline, professional mindset, teacher agency.",
        moduleIds: ["01"],
      },
      {
        title: "AI foundations and professional authority",
        duration: "25 min",
        summary: "Literacy, hallucinations, the teacher-must-decide boundary.",
        moduleIds: ["02", "03"],
      },
      {
        title: "Setup, personalisation and organisation",
        duration: "30 min",
        summary: "Account choices, Memory, workspace hygiene.",
        moduleIds: ["04"],
      },
      {
        title: "Projects, instructions and red-team tests",
        duration: "70 min",
        summary: "Source hierarchy, boundary tests, conflict handling.",
        moduleIds: ["07", "19"],
      },
      {
        title: "SCOPE-V prompting and verification lab",
        duration: "40 min",
        summary: "Professional briefing loop and evidence checks.",
        moduleIds: ["05", "06"],
      },
      {
        title: "Teaching Resource Studio",
        duration: "50 min",
        summary: "Planning, differentiation, feedback and multimodal use.",
        moduleIds: ["08", "09", "11", "20"],
      },
      {
        title: "Plugins, GPT migration, research and scheduled tasks",
        duration: "50 min",
        summary: "Permissions, Free-tier limits, repeatable low-risk workflows.",
        moduleIds: ["21"],
      },
      {
        title: "Netherlands / EU safe-legal core",
        duration: "45 min",
        summary: "AVG, AI Act, assessment, safeguarding, integrity.",
        moduleIds: ["10", "13", "14", "15", "16", "17"],
      },
      {
        title: "Students, governance and 30-day close",
        duration: "30 min",
        summary: "Disclosure, 90-day roadmap, capstone framing.",
        moduleIds: ["12", "18", "22", "23"],
      },
    ],
  },
  {
    id: "multi",
    kicker: "Sustained programme",
    title: "Multi-session · 6 × 2 hours",
    duration: "12 contact hours",
    contact: "Six sessions × 120 minutes",
    slides: "153-slide reference library · 6 paced sessions",
    bestFor: "A sustained implementation programme with between-session application and capstone evidence.",
    summary:
      "The deepest route. Teachers learn the full practical workflow, apply it between sessions, and demonstrate safe, verified professional practice over time.",
    pace: "Apply one low-risk workflow between sessions. Record what you verified. Bring back one question or failure mode. Never require identifiable student data to prove competence.",
    coverage: "full",
    sessions: [
      {
        title: "Session 1 — Foundations, setup, workspace",
        duration: "120 min",
        summary: "AI foundations, account audit, personalisation/Memory, organisation. Safe-data rule from the first exercise.",
        moduleIds: ["01", "02", "03", "04"],
      },
      {
        title: "Session 2 — Projects, instructions, source control",
        duration: "120 min",
        summary: "Engineered Project Instructions, files/knowledge, hierarchy, boundary and red-team tests.",
        moduleIds: ["07", "19"],
      },
      {
        title: "Session 3 — Prompting, verification, resources",
        duration: "120 min",
        summary: "SCOPE-V, professional loop, lesson planning, differentiation, feedback, Resource Studio.",
        moduleIds: ["05", "06", "08", "09", "11"],
      },
      {
        title: "Session 4 — Tools, research, repeatable workflows",
        duration: "120 min",
        summary: "Plugins/apps, GPTs, search/data/Study Mode, scheduled-task limits, automation boundaries.",
        moduleIds: ["20", "21"],
      },
      {
        title: "Session 5 — Netherlands / EU safe + legal use",
        duration: "120 min",
        summary: "Green/Amber/Red, AVG, AI Act, assessment, safeguarding, integrity, communication clinic.",
        moduleIds: ["10", "13", "14", "15", "16", "17", "18"],
      },
      {
        title: "Session 6 — Student literacy, governance, capstone",
        duration: "120 min",
        summary: "Student accounts/age, disclosure, 90-day roadmap, demonstration, first 30 days.",
        moduleIds: ["12", "22", "23"],
      },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}
