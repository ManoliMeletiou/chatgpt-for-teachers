import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CourseId } from "./content/courses";
import type { DiagnosticKind } from "./content/diagnostic";
import {
  emptyProgress,
  type ClinicResult,
  type DiagnosticAnswers,
  type PracticeTurn,
  type ProgressSnapshot,
} from "./progress-types";

export type { ProgressSnapshot, PracticeTurn, ClinicResult, DiagnosticAnswers };

type AppState = ProgressSnapshot & {
  liveSessionCode: string | null;
  followPresenter: boolean;
  enroll: (id: CourseId) => void;
  completeModule: (id: string) => void;
  setModuleSlide: (id: string, index: number) => void;
  setDiagnostic: (kind: DiagnosticKind, itemId: string, value: number) => void;
  submitDiagnostic: (kind: DiagnosticKind) => void;
  setWorkbook: (fieldId: string, value: string) => void;
  toggleCapstone: (label: string) => void;
  toggleBookmark: (id: string) => void;
  addPractice: (turn: PracticeTurn) => void;
  addClinic: (result: ClinicResult) => void;
  setCertificate: (name: string, role: string, school: string) => void;
  issueCertificate: () => void;
  setLiveSession: (code: string | null) => void;
  setFollowPresenter: (value: boolean) => void;
  exportProgress: () => ProgressSnapshot;
  importProgress: (snapshot: ProgressSnapshot) => void;
  resetLocal: () => void;
};

function snapshotFrom(s: ProgressSnapshot): ProgressSnapshot {
  return {
    enrolledCourseId: s.enrolledCourseId,
    completedModules: s.completedModules,
    moduleSlide: s.moduleSlide,
    diagnostic: s.diagnostic,
    diagnosticSubmitted: s.diagnosticSubmitted,
    workbook: s.workbook,
    capstoneTicks: s.capstoneTicks,
    bookmarkedPrompts: s.bookmarkedPrompts,
    practiceHistory: s.practiceHistory,
    clinic: s.clinic,
    certificateName: s.certificateName,
    certificateRole: s.certificateRole,
    certificateSchool: s.certificateSchool,
    certificateIssuedAt: s.certificateIssuedAt,
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...emptyProgress(),
      liveSessionCode: null,
      followPresenter: true,
      enroll: (id) => set({ enrolledCourseId: id }),
      completeModule: (id) =>
        set({
          completedModules: get().completedModules.includes(id)
            ? get().completedModules
            : [...get().completedModules, id],
        }),
      setModuleSlide: (id, index) =>
        set({ moduleSlide: { ...get().moduleSlide, [id]: index } }),
      setDiagnostic: (kind, itemId, value) =>
        set({
          diagnostic: {
            ...get().diagnostic,
            [kind]: { ...get().diagnostic[kind], [itemId]: value },
          },
        }),
      submitDiagnostic: (kind) =>
        set({
          diagnosticSubmitted: { ...get().diagnosticSubmitted, [kind]: true },
        }),
      setWorkbook: (fieldId, value) =>
        set({ workbook: { ...get().workbook, [fieldId]: value } }),
      toggleCapstone: (label) =>
        set({
          capstoneTicks: {
            ...get().capstoneTicks,
            [label]: !get().capstoneTicks[label],
          },
        }),
      toggleBookmark: (id) => {
        const has = get().bookmarkedPrompts.includes(id);
        set({
          bookmarkedPrompts: has
            ? get().bookmarkedPrompts.filter((x) => x !== id)
            : [...get().bookmarkedPrompts, id],
        });
      },
      addPractice: (turn) =>
        set({ practiceHistory: [turn, ...get().practiceHistory].slice(0, 12) }),
      addClinic: (result) =>
        set({
          clinic: [result, ...get().clinic.filter((c) => c.id !== result.id)],
        }),
      setCertificate: (name, role, school) =>
        set({ certificateName: name, certificateRole: role, certificateSchool: school }),
      issueCertificate: () => set({ certificateIssuedAt: new Date().toISOString() }),
      setLiveSession: (code) => set({ liveSessionCode: code }),
      setFollowPresenter: (value) => set({ followPresenter: value }),
      exportProgress: () => snapshotFrom(get()),
      importProgress: (snapshot) =>
        set({
          ...snapshotFrom(snapshot),
          enrolledCourseId: snapshot.enrolledCourseId ?? get().enrolledCourseId,
        }),
      resetLocal: () =>
        set({
          ...emptyProgress(),
          liveSessionCode: null,
          followPresenter: true,
        }),
    }),
    {
      name: "cft-teacher-desk-v1",
      skipHydration: true,
    },
  ),
);
