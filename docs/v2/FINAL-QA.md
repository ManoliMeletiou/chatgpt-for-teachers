# ChatGPT for Teachers v2.0 — Final QA Record

Release date: 15 September 2026
Edition: Netherlands · live workshop

## Included release checks

- Source integrity checker: PASS (`node scripts/check-source.mjs`)
- Public join content pack rebuild: PASS (`scripts/build-join-pack.ts`)
- `docs/content.json`: valid JSON, 30 modules
- `docs/hour.json`: valid JSON
- Public join inline JavaScript syntax (`node --check`): PASS
- Workshop PDFs present: PASS
- Facilitator/teacher operational pack present: PASS
- Deployment checklist present: PASS
- Upgrade audit and developer recreation specification present: PASS

## Important deployment verification

A production deployment is still required to run the end-to-end live acceptance tests against the actual hosting, database, authentication configuration and public relay endpoints. This source pack is the complete v2.0 release package, but a source archive cannot itself prove availability of external production services.

Before using the workshop with a school, follow `DEPLOYMENT-CHECKLIST.md`, especially the real-phone/off-network QR test, presenter-to-phone slide sync, encrypted booklet round-trip, class deletion, print output, accessibility checks and current-source review.

## Release contents

The archive contains:

- the rebuilt application source and public phone surface;
- database migrations and build/migration helpers;
- all 30 curriculum modules and course routes;
- live presenter/participant room implementation;
- encrypted phone guest/booklet transport implementation;
- presenter data-deletion controls;
- local practice/SCOPE-V coaching tooling;
- updated UI guides;
- facilitator runbook and pre-flight materials;
- teacher quickstart and safety/prompt card;
- school-leader action pack;
- incident/escalation and accessibility guidance;
- offline fallback and demo cue sheet;
- certificate criteria;
- current-source register;
- developer specification, upgrade audit and deployment checklist.
