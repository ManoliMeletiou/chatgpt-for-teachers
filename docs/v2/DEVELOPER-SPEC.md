# ChatGPT for Teachers - Developer Spec v2.0

**Snapshot:** 15 September 2026  
**Edition:** Netherlands / EU · live workshop  
**Read with:** `FILE-MAP.md`, `../UPGRADE-AUDIT.md`, and the source under `source/`.

## 1. Product contract

This is an independent teacher professional-development system. It is not OpenAI certification, legal advice, school approval or a student-facing application.

Operating line:

> Use ChatGPT like a teacher. Keep the teacher in control.

Safety line:

> Training is not permission. Do not enter identifiable student, parent, colleague, safeguarding, SEN, health, grade or assessment data into a personal or unapproved ChatGPT account.

## 2. Two surfaces

### Presenter app

- authenticated laptop surface;
- teal live chrome;
- facilitator cue (“Say this”) visible only here;
- opens/ends rooms, moves slides, receives encrypted phone presence/booklets;
- keeps past-class records until the presenter deletes them according to the school's retention decision.

### Public phone join

- standalone `docs/index.html` on a public HTTPS origin;
- amber participant chrome;
- no sign-in;
- no facilitator cue;
- booklet sits under current slide;
- QR join enables encrypted booklet transport;
- typed six-character code is a limited fallback for slide following/local booklet use.

## 3. Live room identifiers

The SQL session id remains the readable six-character class code. The v2.0 QR additionally carries a high-entropy room secret:

`https://cft-nl-join.vercel.app/?c=ABCDEF&k=<ROOM_SECRET>`

The six-character code is **not** an encryption key. The secret is generated in the presenting browser and stored for that browser session.

## 4. Live slide bus - public v1

Slide position contains no participant booklet content. Topic remains `cftnl{code}` for compatibility.

```ts
type LiveBusPayload = {
  v: 1;
  code: string;
  courseId: CourseId;
  title: string;
  moduleId: string | null;
  slide: number;       // raw slide index
  status: "live" | "ended";
  hostName: "Presenter";
  at: number;
};
```

The raw slide index is deliberate: curated live routes skip reference slides without changing the phone protocol.

## 5. Encrypted guest bus - v3 envelope

The semantic guest event is still a v2 object in memory, but it is encrypted before transport.

```ts
type GuestBusEvent = {
  v: 2;
  kind: "hello" | "booklet";
  code: string;
  name: string;
  answers?: Record<string, string>;
  feeling?: string;
  takeaway?: string;
  at: number;
};

type GuestBusEnvelope = {
  v: 3;
  code: string;
  iv: string;    // base64url 12-byte AES-GCM IV
  data: string;  // base64url ciphertext + auth tag
  at: number;
};
```

Key derivation:

1. validate the QR room secret;
2. SHA-256 `cft-guest-v3:${secret}`;
3. import digest as AES-GCM key;
4. encrypt each event using a fresh 12-byte IV.

Guest topic: `cftnlg{code}{secretPrefix12}`.

**Important:** encryption reduces disclosure risk on the relay; it does not turn an anonymous third-party relay into a contracted school processor. See the deployment checklist.

## 6. Curated live routes vs reference library

`src/lib/content/delivery.ts` chooses live slide indices by course. Solo/reference mode keeps all slides.

Current design intent:

| Course | Live route | Reference library |
|---|---:|---:|
| 1-hour maths | 31 | 31 |
| 2-hour Essentials | ~44 | 96 |
| Half-day | ~82 | 147 |
| Full-day | ~114 | 153 |
| 6×2-hour multi-session | 153 | 153 |

Do not collapse the reference library to make the counts match. The distinction is pedagogical: **teach fewer, retain depth**.

## 7. Content rendering rules

`viewOf(slide)` is the canonical presentation transform.

- Literal `item.n === "check"` is rendered as a human number, not the word “check”.
- Source-register items do not become large checklist cards; they go to `sources[]` and render as an evidence note.
- Citation text imported into aim/lens copy is separated from the teaching sentence.
- Deck page-number artefacts are stripped.
- Avoid/Aim appears as two cards, not duplicate paragraphs.
- When items/steps already carry the detail, extra paragraphs are capped.

## 8. Practice sandbox

v2.0 intentionally does **not** call another AI vendor. `src/lib/ai/practice.ts` is a local coach that checks whether a practice prompt includes SCOPE-V elements and refuses obvious personal/sensitive-school-data patterns.

If a future developer adds live AI feedback, the provider, endpoint, data use, retention and school approval must be explicit in the UI and documentation. Do not silently proxy “ChatGPT practice” through another model provider.

## 9. Data and retention

SQL remains Better Auth + `live_sessions`, `session_members`, `user_progress`, `booklet_submissions`.

New operation: `deletePresenterRoom({code})` is host-authenticated and only allows deletion after a room is ended. It explicitly deletes booklet submissions, members and the session record.

Phone-only booklet data remains local on the participant device and uses room-scoped keys. The user can clear it from the phone page.

## 10. Static join hardening

`docs/vercel.json` applies:

- `Cache-Control: public, max-age=0, must-revalidate`
- `Referrer-Policy: no-referrer`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- CSP limited to self plus the three relay hosts.

The page no longer imports external Google Fonts and no longer falls back to unpinned GitHub/jsDelivr curriculum JSON.

## 11. Current-UI visual strategy

Exact screenshots rot quickly. v2.0 distinguishes:

- **UI guide** - a labelled, workshop-safe diagram showing the expected click path and a red click target; it says “VERIFY LIVE ON WORKSHOP DAY”.
- **Live demo** - presenter uses the actual account/device in the room.
- **Reference screenshot** - may be retained only when it materially clarifies a concept and must not be described as guaranteed pixel-perfect navigation.

Generated guides live at `public/slides/ui-guides/`.

## 12. Build and portability

The source pack is self-contained at the repository level. Important scripts:

```bash
npm install
npm run build:join-pack
npm run typecheck
npm run check:source
npm run build
npm run db:migrate
```

`npm install` requires network access to the npm registry. The supplied source check does not.

Environment variables are documented in `.env.example`.

## 13. Acceptance criteria

The rebuild is not done until all are true:

1. QR opens on a non-school-network phone without a login wall.
2. QR includes a valid room secret and guest traffic is a v3 encrypted envelope.
3. Phone and presenter move together; cue never appears on phone.
4. A short course follows its curated live route; solo mode still exposes the reference library.
5. Booklet fields are module-specific, not one generic textarea.
6. Presenter can end a room, print/export what is needed, and delete ended class records.
7. Practice sandbox makes no hidden external model call.
8. Phone content pack is same-origin and version-consistent.
9. Static page and TypeScript source parse without syntax errors.
10. Production deployment passes `../DEPLOYMENT-CHECKLIST.md`.

## 14. Provenance

The original v1.2 recreation spec is retained under `reference/DEVELOPER-SPEC-v1.2-original.md`. It documents the old protocol for audit history only and must not be used as the current implementation contract.
