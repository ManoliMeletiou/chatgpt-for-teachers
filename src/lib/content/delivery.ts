import type { Course, CourseId } from "./courses";
import type { CourseModule, Slide } from "./modules";

const LIVE_RATIO: Record<CourseId, number> = {
  "math-hour": 1,
  essentials: 0.45,
  "half-day": 0.55,
  "full-day": 0.75,
  multi: 1,
};

function score(slide: Slide, index: number, last: number): number {
  let n = 0;
  if (index === 0) n += 1000;
  if (index === last) n += 900;
  if (slide.kind === "hands-on") n += 700;
  if (slide.kind === "avoid-aim") n += 680;
  if (slide.kind === "lens") n += 620;
  if (slide.kind === "step") n += 560;
  const t = slide.title.toLowerCase();
  if (/(safe|privacy|avg|gdpr|ai act|approval|safeguard|incident|verify|teacher|human|green|amber|red|policy|assessment|prompt|project|source|student|capstone|close)/.test(t)) n += 450;
  if (/(source checked|references|further reading)/.test(t)) n -= 300;
  n += Math.max(0, 100 - index);
  return n;
}

/**
 * A short course must be a teachable live route, not the entire reference library.
 * We keep raw slide indices so the public phone pack remains protocol-compatible.
 */
export function liveSlideIndexes(course: Course | undefined, mod: CourseModule): number[] {
  const all = mod.slides.map((_, i) => i);
  if (!course || course.id === "multi" || course.id === "math-hour") return all;
  const ratio = LIVE_RATIO[course.id] ?? 1;
  const target = Math.max(2, Math.min(all.length, Math.round(all.length * ratio)));
  if (target >= all.length) return all;
  const ranked = [...all].sort((a, b) => score(mod.slides[b]!, b, all.length - 1) - score(mod.slides[a]!, a, all.length - 1));
  return ranked.slice(0, target).sort((a, b) => a - b);
}

export function firstLiveSlide(course: Course | undefined, mod: CourseModule): number {
  return liveSlideIndexes(course, mod)[0] ?? 0;
}

export function lastLiveSlide(course: Course | undefined, mod: CourseModule): number {
  const ids = liveSlideIndexes(course, mod);
  return ids[ids.length - 1] ?? Math.max(0, mod.slides.length - 1);
}

export function livePosition(course: Course | undefined, mod: CourseModule, rawIndex: number) {
  const ids = liveSlideIndexes(course, mod);
  const pos = ids.indexOf(rawIndex);
  return { ids, pos: pos >= 0 ? pos : 0, count: ids.length };
}
