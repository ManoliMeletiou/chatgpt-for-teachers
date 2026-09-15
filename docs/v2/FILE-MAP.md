# File map - ChatGPT for Teachers v2.0

Paths below are relative to `source/` unless otherwise stated.

## Curriculum and delivery

| File | Responsibility |
|---|---|
| `src/lib/content/modules.ts` | Modules 01-23 plus maths modules |
| `src/lib/content/math-hour.ts` | Modules 24-30 |
| `src/lib/content/courses.ts` | Course/session definitions and live/reference count labels |
| `src/lib/content/delivery.ts` | Curated live slide indices while preserving raw phone protocol indices |
| `src/lib/content/slide-view.ts` | Presentation transform, source-note extraction, imported-deck cleanup |
| `src/lib/content/slide-visuals.ts` | Maps slide titles to screenshots/UI guides |
| `src/lib/content/workbook.ts` | Workbook/booklet steps and 30-day action plan |
| `src/lib/content/legal.ts` | Legal/safety teaching content and source references |

## Live room / privacy

| File | Responsibility |
|---|---|
| `src/lib/live/room-secret.ts` | High-entropy QR capability generation/validation |
| `src/lib/join-share.ts` | Public join URL including optional room secret |
| `src/lib/live/public-bus.ts` | Slide v1 bus + AES-GCM encrypted guest v3 envelope |
| `src/lib/server/live-bus-pull.ts` | Public slide-position pull only |
| `src/components/live/provider.tsx` | Room state, publishing and encrypted guest merge |
| `src/components/live/phone-room.tsx` | Presenter view of encrypted phone presence/booklets |
| `src/components/live/join-screen.tsx` | QR/projector join surface |
| `docs/index.html` | Entire public phone app, encrypted guest publishing, room-scoped local storage |
| `docs/vercel.json` | Static security headers and CSP |

## Presenter records

| File | Responsibility |
|---|---|
| `src/lib/server/submissions.ts` | Signed-in booklet submission, inbox, room read, ended-room deletion |
| `src/routes/_shell/log/$code.tsx` | Past-class detail, print/export and two-step delete UI |
| `src/components/live/session-records.tsx` | Printable booklet/certificate pack |

## Practice / safety

| File | Responsibility |
|---|---|
| `src/lib/ai/practice.ts` | Local deterministic SCOPE-V coach; no hidden external AI provider |
| `src/lib/pii.ts` | Personal/sensitive-data risk scan |
| `src/routes/_shell/legal.tsx` | Safe/legal handbook surface |
| `src/routes/_shell/governance.tsx` | School implementation surface |

## Visual system

| File | Responsibility |
|---|---|
| `src/styles.css` | Design tokens, responsive layout and v2 visual/accessibility hardening |
| `src/components/stage/slide-canvas.tsx` | Slide renderer and compact evidence note |
| `public/slides/ui-guides/*.png` | Current-feature teaching guides with click highlights and live-verification label |

## Build / deployment

| File | Responsibility |
|---|---|
| `scripts/build-join-pack.ts` | Rebuild phone JSON from TypeScript curriculum |
| `scripts/check-source.mjs` | Dependency-free source integrity checks |
| `scripts/migrate.mjs` | Production migration runner |
| `scripts/migration-plan.mjs` | Ordered migration helper used by app and migrator |
| `.env.example` | Required/optional environment variables |
| `vite.config.ts` | TanStack/Vite/Nitro config with missing v1.2 helper plugins removed |
| `public/manifest.webmanifest` | Standard PWA manifest path |

## Pack-level operations

- `../../UPGRADE-AUDIT.md`
- `../../DEPLOYMENT-CHECKLIST.md`
- `../../QA-RESULTS.md`
- `../../workshop-kit/`
- `reference/DEVELOPER-SPEC-v1.2-original.md` (provenance only)
