# ChatGPT for Teachers - v2.0 Major Upgrade Pack

**Edition:** Netherlands / EU · 15 September 2026  
**Purpose:** a professional-development workshop system for teachers learning to use ChatGPT safely, critically and usefully.  
**Status:** rebuilt from the v1.2 developer pack after a product, privacy, delivery, UX and portability audit.

## Start here

1. Read `UPGRADE-AUDIT.md` - what was weak and what changed.
2. Read `workshop-kit/PRE-FLIGHT.md` before presenting.
3. Read `workshop-kit/FACILITATOR-RUNBOOK.md` for delivery.
4. Developers: read `product/DEVELOPER-SPEC.md`, then `product/FILE-MAP.md`.
5. Run the checks in `QA-RESULTS.md` and `DEPLOYMENT-CHECKLIST.md` before using a live room.

## What v2.0 changes

v2.0 is not a theme refresh. It fixes structural weaknesses in the original pack:

- **Teachable live routes.** Short courses no longer try to deliver an entire reference library verbatim. Live rooms use curated slide routes while solo mode retains the full reference set.
- **Private booklet transport.** Phone names and booklet answers are AES-GCM encrypted before they are sent through the anonymous relay. The encryption key is carried in the QR capability URL, not derived from the six-character code.
- **No hidden second AI provider in practice.** The practice sandbox is now a deterministic, local SCOPE-V coach. It does not silently send a teacher's practice text to xAI/Grok.
- **Deletion is a product feature.** Presenters can delete an ended class's stored roster and signed-in booklet submissions after the purpose is complete.
- **Version drift reduced.** The phone app no longer falls back to an unpinned GitHub/jsDelivr `main` curriculum if its local content pack fails.
- **Build pack repaired.** Missing helper scripts/config imports were replaced with self-contained migration, source-check and build-pack tooling.
- **Current product teaching.** Volatile ChatGPT material was refreshed for current Memory, Data Controls, Projects, Plugins, Study Mode and writing-block workflows; custom GPT content is treated as migration/legacy guidance rather than a future-facing build target.
- **Better visual teaching.** Citation dumps are rendered as compact evidence notes; imported deck artefacts are stripped; UI steps use purpose-built visual guides with a red click target and a “verify live” warning.
- **Workshop operations added.** This pack now includes pre-flight, incident/escalation, accessibility, offline fallback, school-leader follow-up, source register and certificate criteria.

## Non-negotiable safety position

Training is not permission. A school must still decide which account/workspace/tool is approved, for which data and purpose. A privacy setting or Temporary Chat does **not** create a lawful basis, replace a DPIA, replace a processing agreement or override school policy. Do not use identifiable student, parent, colleague, safeguarding, SEN, health, grade or assessment data in a personal/unapproved account.

## Folder map

- `product/source/` - application source, phone join app, migrations, curriculum, generated visual guides.
- `product/DEVELOPER-SPEC.md` - current v2.0 rebuild contract.
- `product/reference/` - original v1.2 recreation spec retained for provenance only.
- `workshop-kit/` - facilitator and school implementation materials.
- `UPGRADE-AUDIT.md` - weakness-by-weakness audit and resolution.
- `DEPLOYMENT-CHECKLIST.md` - production go/no-go.
- `QA-RESULTS.md` - checks completed on this pack.

## Residual risk that is intentionally visible

The live room still uses third-party public ntfy hosts as a transient relay. v2.0 encrypts **guest names and booklet content** before relay transport, but the relay is still outside the school's control and ciphertext may be cached according to that provider's configuration. For a school requiring a processor agreement, controlled retention, formal audit logs or first-party deletion guarantees, replace ntfy with a school-controlled or contracted relay/API before production use. This pack treats that as an **amber deployment decision**, not as “solved by encryption.”
