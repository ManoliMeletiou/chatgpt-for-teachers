export type SlideVisual = {
  src: string;
  caption: string;
  alt: string;
};

const VISUALS: { test: (title: string) => boolean; visual: SlideVisual }[] = [
  {
    test: (t) => t.includes("safe setup") || t.includes("memory: useful") || t.includes("memory"),
    visual: {
      src: "/slides/memory-settings.jpg",
      caption: "Do this live: Settings → Personalization → Memory. Review what is stored, then use Temporary Chat when you do not want a conversation remembered.",
      alt: "ChatGPT Settings, Personalization, Memory screen",
    },
  },
  {
    test: (t) => t.includes("create your first teaching project") || t.includes("new project"),
    visual: {
      src: "/slides/new-project.png",
      caption: "Do this live: in the sidebar, tap New project. Name it after one real course or unit — for maths, the unit, not ‘Maths’.",
      alt: "ChatGPT New project control in the sidebar",
    },
  },
  {
    test: (t) => t.includes("open project settings") || t.includes("project settings"),
    visual: {
      src: "/slides/project-settings.png",
      caption: "Do this live: open the Project, tap the ••• menu, choose Project settings, then add instructions.",
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
        "A healthy Project: source files together, separate chats for distinct tasks, instructions that name what each source controls. Free: up to 5 files. Approved excerpts only — never student work.",
      alt: "ChatGPT Project with files, chats and instructions",
    },
  },
  {
    test: (t) => t.includes("free-tier research") || t.includes("control the source set"),
    visual: {
      src: "/slides/web-search.jpg",
      caption: "Do this live: turn on web search, name official sites, open the source, then record uncertainty.",
      alt: "ChatGPT web search tools menu",
    },
  },
  {
    test: (t) => t.includes("scheduled task"),
    visual: {
      src: "/slides/scheduled-tasks.jpg",
      caption: "Do this live: Scheduled in the sidebar. Free: up to 3 active tasks, no more than once a day, with a human checkpoint.",
      alt: "ChatGPT scheduled tasks screen",
    },
  },
];

export function visualForSlide(title: string): SlideVisual | undefined {
  const t = title.toLowerCase();
  return VISUALS.find((row) => row.test(t))?.visual;
}
