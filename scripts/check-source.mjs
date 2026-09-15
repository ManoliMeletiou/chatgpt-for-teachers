import { access, readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const required = [
  "src/router.tsx", "src/styles.css", "docs/index.html", "docs/content.json", "docs/hour.json",
  "migrations/0001_auth.sql", "migrations/0002_live_class.sql", "migrations/0003_booklet_submissions.sql",
  "scripts/build-join-pack.ts", "scripts/migrate.mjs", "scripts/migration-plan.mjs"
];
let failed = false;
for (const rel of required) {
  try { await access(resolve(root, rel)); }
  catch { console.error(`[check] missing ${rel}`); failed = true; }
}
const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
for (const script of Object.values(pkg.scripts ?? {})) {
  const matches = String(script).matchAll(/scripts\/([A-Za-z0-9._-]+\.(?:mjs|js|ts))/g);
  for (const m of matches) {
    try { await access(resolve(root, "scripts", m[1])); }
    catch { console.error(`[check] package script references missing scripts/${m[1]}`); failed = true; }
  }
}
const practice = await readFile(resolve(root, "src/lib/ai/practice.ts"), "utf8");
if (/api\.x\.ai|XAI_API_KEY|grok-4/i.test(practice)) {
  console.error("[check] practice sandbox still sends workshop content to xAI/Grok"); failed = true;
}
const join = await readFile(resolve(root, "docs/index.html"), "utf8");
if (!/name="referrer" content="no-referrer"/i.test(join)) {
  console.error("[check] public join page is missing no-referrer metadata"); failed = true;
}
const files = await readdir(resolve(root, "migrations"));
if (files.filter((f) => /^\d{4}_.*\.sql$/.test(f)).length < 3) {
  console.error("[check] migrations look incomplete"); failed = true;
}
if (failed) process.exit(1);
console.log("[check] source pack integrity checks passed");
