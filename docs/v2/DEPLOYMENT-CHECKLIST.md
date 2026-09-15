# Production Deployment Checklist - v2.0

Use this as a **go/no-go** checklist. A demo working on the presenter's laptop is not enough.

## Governance before deployment

- [ ] School has named the approved ChatGPT account/workspace type for this session.
- [ ] Presenter knows the school's AI, privacy, safeguarding and incident-reporting routes.
- [ ] DPO/IBP/privacy lead has reviewed any collection of participant names/booklets if the workshop will retain them.
- [ ] A retention period for class logs/booklets is documented.
- [ ] If the public relay is not acceptable, replace it with an approved first-party/contracted transport before use.
- [ ] Presenter will not demonstrate with real student/parent/colleague records.

## App deployment

- [ ] `DATABASE_URL` is set to the intended database; production is not using ephemeral PGLite.
- [ ] `npm run db:migrate` completes against a staging database.
- [ ] Presenter authentication works on the production origin.
- [ ] `/class` and `/log*` require presenter authentication.
- [ ] HTTPS is enforced.
- [ ] No secret keys are present in client bundles.

## Phone join deployment

- [ ] `docs/index.html`, `docs/hour.json`, `docs/content.json`, `docs/404.html`, `docs/vercel.json` are deployed together.
- [ ] QR opens on a phone on cellular data, not only school Wi-Fi.
- [ ] QR contains `c=XXXXXX` and a high-entropy `k=` room capability.
- [ ] Typed-code fallback can follow slides but correctly explains that secure booklet sending needs the QR.
- [ ] Security headers are visible: CSP, no-referrer, nosniff, frame deny, permissions policy.
- [ ] No GitHub/jsDelivr `main` content fallback is active.

## Live-room acceptance

- [ ] Phone shows the same raw slide as presenter within ~2 seconds.
- [ ] Phone never displays “Say this”.
- [ ] Presenter can see phone presence.
- [ ] A test booklet reaches presenter and relay traffic contains an encrypted v3 envelope, not the plaintext name/answers.
- [ ] End class locks the room.
- [ ] New class generates a different code and a different secret.
- [ ] Ended class can be deleted from Past classes.

## Workshop-day visual check

- [ ] 1366×768 projector view has no clipped headings/body text.
- [ ] 390px-wide phone has no horizontal overflow.
- [ ] All UI-guide images load.
- [ ] Evidence notes are compact, not giant cards.
- [ ] Keyboard focus is visible.
- [ ] Contrast is readable on the projector in the actual room.

## Failure drill

- [ ] Presenter has the offline fallback PDF/print pack or can continue from solo mode.
- [ ] Presenter knows the phrase: “The live follow tool has failed; the learning can continue.”
- [ ] A room code/QR failure does not cause the presenter to collect participant data by email/WhatsApp as an improvised workaround.
