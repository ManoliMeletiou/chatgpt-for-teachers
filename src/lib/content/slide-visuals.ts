export type SlideVisual = {
  src: string;
  caption: string;
  alt: string;
};

const UI_NOTE = "Instructional UI guide — verify the exact controls in the live account on workshop day because labels and rollout can change.";

const VISUALS: { test: (title: string) => boolean; visual: SlideVisual }[] = [
  {
    test: (t) => t.includes("safe setup") || t.includes("data controls"),
    visual: {
      src: "/slides/ui-guides/data-controls.png",
      caption: `Data controls: show the model-improvement setting, then repeat that a privacy setting does not equal school approval. ${UI_NOTE}`,
      alt: "Instructional UI guide for ChatGPT Data Controls with the key click marked",
    },
  },
  {
    test: (t) => t.includes("memory: useful") || t === "memory" || t.includes("memory summary"),
    visual: {
      src: "/slides/ui-guides/memory-summary.png",
      caption: `Settings → Personalization → Memory → Memory summary. Temporary Chat does not use or create memory. ${UI_NOTE}`,
      alt: "Instructional UI guide showing the current Memory summary path",
    },
  },
  {
    test: (t) => t.includes("temporary chat"),
    visual: {
      src: "/slides/ui-guides/temporary-chat.png",
      caption: `Use Temporary Chat deliberately; it is not a substitute for school approval or a data-processing agreement. ${UI_NOTE}`,
      alt: "Instructional UI guide for starting Temporary Chat",
    },
  },
  {
    test: (t) => t.includes("create your first teaching project") || t.includes("new project"),
    visual: {
      src: "/slides/ui-guides/new-project.png",
      caption: `Create one Project per real course or unit. Keep student work and identifiable personal data out. ${UI_NOTE}`,
      alt: "Instructional UI guide for creating a new ChatGPT Project",
    },
  },
  {
    test: (t) => t.includes("open project settings") || t.includes("project settings"),
    visual: {
      src: "/slides/project-settings.png",
      caption: "Open the Project menu, choose Project settings, then add durable instructions. Verify the menu labels live before the session.",
      alt: "ChatGPT project overflow menu with Project settings highlighted",
    },
  },
  {
    test: (t) =>
      t.includes("add knowledge") ||
      t.includes("files and tools on free") ||
      t.includes("files on free") ||
      t.includes("healthy project") ||
      t.includes("project vs gpt"),
    visual: {
      src: "/slides/project-structure.jpg",
      caption:
        "A healthy Project: source files together, separate chats for distinct tasks, instructions that name what each source controls. Free: up to 5 files per project at the current limit. Approved sources only — never student work.",
      alt: "ChatGPT Project with files, chats and instructions",
    },
  },
  {
    test: (t) => t.includes("plugin") && (t.includes("terminology") || t.includes("connecting") || t.includes("workflow")),
    visual: {
      src: "/slides/ui-guides/plugins.png",
      caption: `Review included apps, permissions and school approval before connecting anything. OpenAI verification is not organisational approval. ${UI_NOTE}`,
      alt: "Instructional UI guide for reviewing a Plugin and its permissions",
    },
  },
  {
    test: (t) => t.includes("study mode"),
    visual: {
      src: "/slides/ui-guides/study-mode.png",
      caption: `Use Study Mode to demonstrate guided learning and checking, not answer vending. ${UI_NOTE}`,
      alt: "Instructional UI guide for selecting Study Mode",
    },
  },
  {
    test: (t) => t.includes("writing block") || t.includes("drafting on free"),
    visual: {
      src: "/slides/ui-guides/writing-blocks.png",
      caption: `Writing blocks are the current in-chat drafting/editing surface; do not teach deprecated Canvas-first workflows. ${UI_NOTE}`,
      alt: "Instructional UI guide for working with a writing block",
    },
  },
  {
    test: (t) => t.includes("free-tier research") || t.includes("control the source set"),
    visual: {
      src: "/slides/web-search.jpg",
      caption: "Do this live: use web search, name official sites, open the source, compare the claim, then record uncertainty.",
      alt: "ChatGPT web search tools menu",
    },
  },
  {
    test: (t) => t.includes("scheduled task"),
    visual: {
      src: "/slides/scheduled-tasks.jpg",
      caption: "Use the live account to demonstrate scheduled tasks only if available. Teach the human checkpoint and current plan limits rather than a fixed button location.",
      alt: "ChatGPT scheduled tasks screen",
    },
  },
];

export function visualForSlide(title: string): SlideVisual | undefined {
  const t = title.toLowerCase();
  return VISUALS.find((row) => row.test(t))?.visual;
}
