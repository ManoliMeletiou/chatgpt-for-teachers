import type { CourseId } from "./content/courses";
import type { DiagnosticKind } from "./content/diagnostic";

export type DiagnosticAnswers = Record<string, number>;

export type PracticeTurn = {
  prompt: string;
  reply: string;
  at: number;
};

export type ClinicResult = {
  id: string;
  picked: "green" | "amber" | "red";
  correct: boolean;
};

export type ProgressSnapshot = {
  enrolledCourseId: CourseId | null;
  completedModules: string[];
  moduleSlide: Record<string, number>;
  diagnostic: Record<DiagnosticKind, DiagnosticAnswers>;
  diagnosticSubmitted: Record<DiagnosticKind, boolean>;
  workbook: Record<string, string>;
  capstoneTicks: Record<string, boolean>;
  bookmarkedPrompts: string[];
  practiceHistory: PracticeTurn[];
  clinic: ClinicResult[];
  certificateName: string;
  certificateRole: string;
  certificateSchool: string;
  certificateIssuedAt: string | null;
};

export const emptyProgress = (): ProgressSnapshot => ({
  enrolledCourseId: null,
  completedModules: [],
  moduleSlide: {},
  diagnostic: { pre: {}, post: {} },
  diagnosticSubmitted: { pre: false, post: false },
  workbook: {},
  capstoneTicks: {},
  bookmarkedPrompts: [],
  practiceHistory: [],
  clinic: [],
  certificateName: "",
  certificateRole: "Teacher",
  certificateSchool: "",
  certificateIssuedAt: null,
});
