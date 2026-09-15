import { writeFileSync } from "node:fs";
import { modules } from "../src/lib/content/modules.ts";
import { courses } from "../src/lib/content/courses.ts";
import { viewOf } from "../src/lib/content/slide-view.ts";
import { extraForSlide } from "../src/lib/content/slide-enrichment.ts";
import { workbookStepForModule, courseModuleIds } from "../src/lib/content/path.ts";

const pack = {
  courses: courses.map((c) => ({
    id: c.id,
    title: c.title,
    moduleIds: courseModuleIds(c),
  })),
  modules: modules.map((mod) => {
    const booklet = workbookStepForModule(mod.id);
    return {
      id: mod.id,
      slug: mod.slug,
      title: mod.title,
      booklet: booklet
        ? {
            id: booklet.id,
            n: booklet.n,
            title: booklet.title,
            lead: booklet.lead,
            fields: booklet.fields.map((f) => ({
              id: f.id,
              label: f.label,
              placeholder: f.placeholder ?? "",
              multiline: Boolean(f.multiline),
            })),
          }
        : null,
      slides: mod.slides.map((slide) => {
        const view = viewOf(slide);
        const extra = extraForSlide(slide.title);
        return {
          kind: view.kind,
          title: view.title,
          kicker: view.kicker,
          activity: view.activity,
          lead: view.lead,
          duration: view.duration,
          paras: view.paras,
          sources: view.sources,
          items: view.items.map((it) => ({
            n: it.n === "check" ? "check" : it.n,
            title: it.title,
            body: it.body,
          })),
          steps: view.steps,
          path: view.path,
          prompt: view.prompt,
          avoidLabel: view.avoidLabel,
          avoidBody: view.avoidBody,
          avoidBullets: view.avoidBullets,
          aimLabel: view.aimLabel,
          aimBody: view.aimBody,
          aimBullets: view.aimBullets,
          warning: view.warning,
          example: extra?.example ?? "",
          remember: extra?.remember ?? "",
        };
      }),
    };
  }),
};

const json = JSON.stringify(pack);
writeFileSync(new URL("../docs/content.json", import.meta.url), json);
const hourIds = new Set(["24", "25", "26", "27", "28", "29", "30"]);
const hour = {
  v: 1,
  courses: pack.courses.filter((c) => c.id === "math-hour"),
  modules: pack.modules.filter((m) => hourIds.has(m.id)),
};
writeFileSync(new URL("../docs/hour.json", import.meta.url), JSON.stringify(hour));
console.log("modules", pack.modules.length, "bytes", json.length, "hour", JSON.stringify(hour).length);
