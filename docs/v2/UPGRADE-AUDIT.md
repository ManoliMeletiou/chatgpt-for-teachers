# v1.2 -> v2.0 Product Audit

This audit separates **appearance problems** from issues that would make the workshop weaker, harder to run, less trustworthy or harder to rebuild.

## Executive assessment

The v1.2 pack contained a strong idea and a substantial curriculum, but it behaved like three products layered together: a deck dump, a live-room prototype and a developer snapshot. The biggest problem was not colour or typography. It was **misalignment between what the pack promised and what it could reliably deliver**.

v2.0 therefore changes the delivery model, privacy path, practice architecture, source freshness, build portability and workshop operations as well as the visual system.

## Weaknesses found and the v2.0 response

| Severity | v1.2 weakness | Why it weakened the product | v2.0 change |
|---|---|---|---|
| Critical | `package.json` and Vite referenced helper/plugin files that were not included | A developer could not reliably rebuild the “complete” pack from the ZIP | Replaced with self-contained migration/build/check scripts and removed missing Vite plugin dependencies |
| Critical | Phone guest names and booklet answers travelled as plaintext over predictable public relay topics | The workshop taught data minimisation while the workshop platform itself exposed named reflection content to a public transport layer | Guest traffic is AES-GCM encrypted; QR carries a high-entropy room capability; presenter name is no longer sent on public slide beacons |
| Critical | “ChatGPT practice” sent practice prompts to xAI/Grok | Brand/purpose mismatch and undisclosed third-party data path | Practice is now a local deterministic SCOPE-V coach; no external AI call is made |
| High | No explicit class-data deletion path | Named participation/booklets could accumulate without a purpose/retention action | Ended class page now has a two-step permanent delete action for class, roster and signed-in booklet records |
| High | Short-course slide counts and module durations did not fit the advertised course lengths | A 2-hour or half-day facilitator could not actually teach the routed material as shown | Live-room delivery plans select a curated set of raw slide indices; the full source remains the solo/reference library |
| High | Static phone page could fall back to unpinned `main` JSON from GitHub/jsDelivr | Presenter and phones could show different curriculum versions | Same-origin versioned pack only; failure is explicit instead of silently loading a different version |
| High | Volatile ChatGPT guidance had already aged | Teachers could be trained on obsolete navigation/features | Refreshed Memory, Data Controls, Projects, Plugins, Study Mode, writing blocks and custom-GPT transition guidance; source register dated 15 Sep 2026 |
| High | Imported source citations and legal references appeared as giant slide items | Important evidence crowded out the teaching point and made slides look unfinished | Sources move to a compact evidence footer; citation text glued into aim/lens copy is separated from the teaching sentence |
| Medium | “Screenshot-as-truth” design made UI changes look like course errors | ChatGPT UI is volatile across plan/device/rollout | New UI guides show the path, highlight the click target and explicitly tell the presenter to verify live on workshop day |
| Medium | Participant local storage keys were global | An old booklet could bleed into a later room on the same phone | Guest name/booklet keys are scoped by room code; participant can clear local booklet data |
| Medium | Static join page lacked strong browser hardening | Increased leakage/embedding surface | Added no-referrer, CSP, nosniff, frame deny and permissions policy; removed external font dependency |
| Medium | Reference/library slides and live facilitation slides were indistinguishable | Facilitators felt obliged to “get through everything” | Live-route/reference-library distinction is explicit in course metadata and stage navigation |
| Medium | Operational guidance lived mostly in the app | A presenter had no professional runbook for Wi-Fi failure, room setup, consent, timing or escalation | Added pre-flight, runbook, offline fallback, escalation, accessibility and school leader packs |
| Medium | Completion certificate could be mistaken for accreditation or demonstrated competence | Risk of overclaiming | Certificate criteria document clarifies participation/completion evidence and the non-accreditation disclaimer remains visible |
| Low | Visual hierarchy was inconsistent in evidence-heavy slides | Dense cards and long lines made a strong course look weaker | Stronger slide surface, focus states, spacing, source note, figure treatment and visual guide system |

## What was deliberately not “fixed away”

The following are product decisions, not bugs:

- Presenter and participant remain two distinct surfaces.
- The presenter cue stays private to the laptop.
- Phone participants do not sign in.
- The six-character code remains easy to read on a projector.
- Solo/reference mode retains the complete curriculum rather than deleting depth.
- Legal and privacy wording remains cautious: the product is professional development, not legal advice or school approval.

## Residual risks / next production decisions

### 1. Third-party relay
Encrypted payloads are materially safer than plaintext, but a third-party anonymous relay is still not equivalent to a contracted school service. For production procurement, decide whether a first-party WebSocket/SSE/API channel is required.

### 2. Authentication history
The source snapshot still includes compatibility code for the original preview/auth environment. It is no longer needed for the phone join page, but an independent production rebuild should simplify authentication around the chosen identity provider and document its processor/retention model.

### 3. UI volatility
No static screenshot pack can remain exact indefinitely. v2.0 reduces this problem by using UI guides and a live-demo pre-flight, but the facilitator must still verify the actual account/plan used on the day.

### 4. Legal interpretation
The workshop teaches a conservative operating boundary. A school still needs its own DPO/privacy officer/IBP lead and management decision for local policy, vendor review, contracts, lawful basis, DPIA and retention.

## Definition of “10/10” for this product

A polished workshop is not one with the most slides. It is one where a teacher can, by the end:

1. name what ChatGPT is good at and where it can fail;
2. classify a planned use as green/amber/red and explain why;
3. refuse to enter identifiable or sensitive school data into an unapproved account;
4. write a constrained SCOPE-V prompt;
5. verify a generated resource rather than trust fluent output;
6. create one useful, classroom-ready artefact without surrendering teacher judgement;
7. know which school process to use when approval, safeguarding, assessment or privacy is involved;
8. leave with a realistic 30-day action, not a list of 150 features.
