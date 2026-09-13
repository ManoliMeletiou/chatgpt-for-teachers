import type { CourseId } from "@/lib/content/courses";

export type LiveSession = {
  id: string;
  courseId: CourseId;
  title: string;
  status: "live" | "ended";
  currentModuleId: string | null;
  currentSlide: number;
  createdAt: string;
  endedAt?: string | null;
};

export type LiveMember = {
  userId: string;
  displayName: string;
  role: "host" | "participant";
  joinedAt: string;
  lastSeenAt: string;
  online: boolean;
};

export type LiveClassView = {
  session: LiveSession;
  role: "host" | "participant";
  members: LiveMember[];
  memberCount: number;
};

export type ClosedClass = {
  id: string;
  courseId: CourseId;
  title: string;
  createdAt: string;
  endedAt: string;
  hasBooklet: boolean;
};

export type LiveClassPeek = {
  id: string;
  courseId: CourseId;
  title: string;
  status: "live" | "ended";
  currentModuleId: string | null;
  currentSlide: number;
  memberCount: number;
};

export type RosterRow = {
  userId: string;
  displayName: string;
  role: "host" | "participant";
  online: boolean;
  diagnosticPre: boolean;
  workbookFilled: number;
  completedInCourse: number;
  courseModuleCount: number;
};
