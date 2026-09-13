import { getCourse, type Course, type CourseId } from "./courses";
import { diagnosticItems } from "./diagnostic";
import { getModule, modules } from "./modules";
import { workbookSteps, type WorkbookStep } from "./workbook";

/** Workbook step → the modules it belongs to. */
export const workbookModuleIds: Record<string, string[]> = {
  open: ["01"],
  what: ["02", "03"],
  setup: ["04"],
  personalise: ["04"],
  organise: ["04"],
  build: ["07"],
  instructions: ["07"],
  knowledge: ["07", "19"],
  prompt: ["05", "06"],
  resource: ["08", "09", "11"],
  tools: ["20", "21"],
  tasks: ["21"],
  safely: ["10", "13", "14", "15", "16", "17"],
  capstone: ["18", "22", "23"],
  "hour-open": ["24"],
  "hour-for": ["25"],
  "hour-safety": ["26"],
  "hour-files": ["27"],
  "hour-make": ["28"],
  "hour-images": ["29"],
  "hour-close": ["30"],
};

/** PRE diagnostic item → where to practise if the rating is still developing. */
export const diagnosticFocus: Record<
  string,
  { label: string; moduleIds: string[]; workbookStepId: string }
> = {
  confidence: { label: "Professional confidence", moduleIds: ["01", "24"], workbookStepId: "open" },
  authority: { label: "Teacher authority vs fluency", moduleIds: ["02", "03", "25"], workbookStepId: "what" },
  traffic: { label: "Green / Amber / Red", moduleIds: ["13", "14", "26"], workbookStepId: "safely" },
  approval: { label: "Account and school approval", moduleIds: ["04", "26"], workbookStepId: "setup" },
  scopev: { label: "SCOPE-V prompting", moduleIds: ["05", "06", "28"], workbookStepId: "prompt" },
  verify: { label: "Verification before use", moduleIds: ["06", "09", "28"], workbookStepId: "resource" },
  human: { label: "Human decisions", moduleIds: ["03", "25"], workbookStepId: "what" },
  avg: { label: "AVG / GDPR", moduleIds: ["14", "15", "26"], workbookStepId: "safely" },
  aiact: { label: "EU AI Act literacy", moduleIds: ["16", "26"], workbookStepId: "safely" },
  safeguarding: { label: "Safeguarding boundary", moduleIds: ["17", "26"], workbookStepId: "safely" },
  detectors: { label: "Assessment integrity", moduleIds: ["10", "26"], workbookStepId: "safely" },
  students: { label: "Student use of AI", moduleIds: ["12", "25"], workbookStepId: "safely" },
};

export function courseOf(id: CourseId | string | null | undefined): Course | undefined {
  if (!id) return undefined;
  return getCourse(id);
}

export function courseModuleIds(course: Course): string[] {
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const session of course.sessions) {
    for (const id of session.moduleIds) {
      if (seen.has(id)) continue;
      seen.add(id);
      ids.push(id);
    }
  }
  return ids;
}

export function courseHasModule(course: Course, moduleId: string): boolean {
  return courseModuleIds(course).includes(moduleId);
}

export function sessionForModule(course: Course, moduleId: string) {
  return course.sessions.find((s) => s.moduleIds.includes(moduleId));
}

export function adjacentInCourse(
  course: Course | undefined,
  moduleId: string,
): { prev?: ReturnType<typeof getModule>; next?: ReturnType<typeof getModule> } {
  const ids = course ? courseModuleIds(course) : modules.map((m) => m.id);
  const pos = ids.indexOf(moduleId);
  if (pos < 0) {
    const global = modules.findIndex((m) => m.id === moduleId);
    return {
      prev: global > 0 ? modules[global - 1] : undefined,
      next: global >= 0 ? modules[global + 1] : undefined,
    };
  }
  return {
    prev: pos > 0 ? getModule(ids[pos - 1]!) : undefined,
    next: pos < ids.length - 1 ? getModule(ids[pos + 1]!) : undefined,
  };
}

export function workbookStepsForCourse(course: Course | undefined): WorkbookStep[] {
  if (!course) return workbookSteps;
  const allowed = new Set(courseModuleIds(course));
  return workbookSteps.filter((step) => {
    const ids = workbookModuleIds[step.id] ?? [];
    return ids.some((id) => allowed.has(id));
  });
}

export function workbookStepForModule(moduleId: string): WorkbookStep | undefined {
  const hit = workbookSteps.find((step) => (workbookModuleIds[step.id] ?? []).includes(moduleId));
  return hit;
}

export function stepFilledCount(step: WorkbookStep, values: Record<string, string>): number {
  return step.fields.filter((f) => (values[f.id] ?? "").trim()).length;
}

export type FocusArea = {
  id: string;
  label: string;
  score: number;
  moduleIds: string[];
  workbookStepId: string;
};

export function focusAreasFromDiagnostic(
  answers: Record<string, number>,
  course?: Course,
): FocusArea[] {
  const allowed = course ? new Set(courseModuleIds(course)) : null;
  const areas: FocusArea[] = [];
  for (const item of diagnosticItems) {
    const score = answers[item.id];
    if (typeof score !== "number" || score > 3) continue;
    const spec = diagnosticFocus[item.id];
    if (!spec) continue;
    const moduleIds = spec.moduleIds.filter((id) => (allowed ? allowed.has(id) : true));
    if (allowed && moduleIds.length === 0) continue;
    areas.push({
      id: item.id,
      label: spec.label,
      score,
      moduleIds: moduleIds.length ? moduleIds : spec.moduleIds,
      workbookStepId: spec.workbookStepId,
    });
  }
  return areas.sort((a, b) => a.score - b.score).slice(0, 3);
}
