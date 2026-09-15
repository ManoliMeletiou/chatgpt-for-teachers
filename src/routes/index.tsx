import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookMarked, Check, Presentation, QrCode, Shield } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { PresenterAccount } from "@/components/presenter-account";
import { Button } from "@/components/ui/button";
import { usePreviewAuth } from "@/lib/use-preview-auth";
import { courses } from "@/lib/content/courses";
import { trafficLights } from "@/lib/content/legal";
import { scopeVFields } from "@/lib/content/prompts";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { signedIn } = usePreviewAuth();
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <section className="hero-field text-accent-fg">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <BrandMark inverse />
            <span className="font-display text-[15px] tracking-tight">ChatGPT for Teachers</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/legal" className="hidden text-sm text-accent-fg/80 hover:text-accent-fg sm:inline">
              Safe & legal
            </Link>
            <Button asChild size="sm" className="bg-paper/15 text-accent-fg hover:bg-paper/25">
              <Link to="/desk">My desk</Link>
            </Button>
            {signedIn ? (
              <Button asChild size="sm" className="bg-paper/15 text-accent-fg hover:bg-paper/25">
                <Link to="/log">Past classes</Link>
              </Button>
            ) : null}
            <PresenterAccount compact loginLabel="Presenter login" tone="accent" />
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 pb-12 pt-4 sm:px-8 sm:pb-16 sm:pt-10">
          <p className="inline-flex rounded-full bg-paper/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-accent-fg">
            v2.0 · Netherlands · live workshop
          </p>
          <h1 className="mt-4 max-w-[18ch] font-display text-[2rem] leading-[1.05] sm:text-6xl">
            Use ChatGPT like a teacher. Keep the teacher in control.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-accent-fg/85 sm:mt-6 sm:text-lg">
            Independent professional development for Dutch schools. Two doors: present the room, or
            join it. The booklet sits beside the slides. At the end it is sent to the presenter as
            one pack.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Link
              {...(signedIn
                ? { to: "/class" as const }
                : { to: "/login" as const, search: { next: "/class" as const } })}
              className="door-lift group rounded-xl bg-paper p-6 text-ink sm:p-8"
            >
              <Presentation className="size-6 text-accent" strokeWidth={1.6} />
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-accent">
                {signedIn ? "Presenter desk" : "Presenter login"}
              </p>
              <h2 className="mt-1 font-display text-3xl">I’m presenting today</h2>
              <p className="mt-3 text-ink-soft">
                {signedIn
                  ? "Open the desk, pick the course, then open the room. Past classes shows who joined, the exact course, and how long it took. Log out from the top of this page when another presenter takes the laptop."
                  : "Log in as presenter — this laptop remembers you. Pick the course, then open the room. Use this account only on the presenting laptop. Other presenters use their own account."}
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                {signedIn ? "Open presenter desk" : "Log in as presenter"}
                <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </p>
            </Link>
            <Link to="/join" className="door-lift group rounded-xl bg-amber p-6 text-paper sm:p-8">
              <QrCode className="size-6" strokeWidth={1.6} />
              <p className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-paper/80">
                <span className="live-dot" />
                Participant
              </p>
              <h2 className="mt-1 font-display text-3xl">I’m in this session</h2>
              <p className="mt-3 text-paper/90">
                Scan or type the code. Land on the current slide. Write in the booklet. Send it at
                the end.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                Join the session
                <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </p>
            </Link>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-accent-fg/70">
            Completing this programme does not approve ChatGPT for your school, prove AI Act
            compliance, or constitute OpenAI certification. Educational guidance, not legal advice.
          </p>
        </div>
      </section>

      <section className="paper-grain mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-accent">On the projector</p>
            <h3 className="mt-2 font-display text-2xl">The slide the room shares.</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Tick the points with the presenter. Diagrams and classroom examples sit on the slide.
              Facilitator cues stay on the presenting laptop only.
            </p>
            <div className="mt-5 overflow-hidden rounded-lg bg-elevated shadow-[var(--shadow-border)]">
              <div className="bg-accent px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-accent-fg">
                Together
              </div>
              <div className="px-4 py-4">
                <p className="font-display text-xl leading-tight">A pattern machine. Not a person.</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-red px-3 py-2 text-xs text-paper">Not a colleague</div>
                  <div className="rounded-md bg-green px-3 py-2 text-xs text-paper">A drafting assistant</div>
                </div>
              </div>
            </div>
          </div>
          <div className="booklet-page pl-8 pr-5 py-5 sm:py-6">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-amber">
              <BookMarked className="size-3.5" />
              On every phone
            </p>
            <h3 className="mt-2 font-display text-2xl">The booklet they write in.</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Numbered prompts under the slide. Same pack the presenter collects at the end — notes,
              how it felt, what they will try, how the course could improve.
            </p>
            <div className="mt-5 space-y-3">
              <p className="flex gap-2 text-sm">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-amber font-display text-paper">
                  1
                </span>
                <span className="border-b border-amber/40 pt-1 text-muted">One workflow I want to improve</span>
              </p>
              <p className="flex gap-2 text-sm">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-amber font-display text-paper">
                  2
                </span>
                <span className="border-b border-amber/40 pt-1 text-muted">One risk I want answered</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-accent text-accent-fg">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:grid-cols-[auto_1fr] sm:px-8">
          <Shield className="size-7" strokeWidth={1.5} />
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent-fg/70">
              Operating assumption
            </p>
            <p className="mt-2 max-w-3xl text-lg leading-snug">
              ChatGPT may not yet be school-approved. If approval is unknown, use only public,
              synthetic, fictional or truly anonymous non-confidential information. Training does
              not approve the tool.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Five delivery routes</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Same core. Different depth.</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          The 1-hour maths hour is the department meeting: files, safety, documents, images, and
          what ChatGPT is actually for. Longer routes add practice — they never drop the
          Netherlands / EU safety core.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {courses.map((c) => (
            <Link
              key={c.id}
              to="/courses/$courseId"
              params={{ courseId: c.id }}
              className={
                c.id === "math-hour"
                  ? "door-lift group overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] md:col-span-2"
                  : "door-lift group overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]"
              }
            >
              <div className={c.id === "math-hour" ? "h-2 bg-amber" : "h-2 bg-accent"} />
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-accent">{c.kicker}</p>
                <h3 className="mt-2 font-display text-2xl group-hover:text-accent">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.duration}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.bestFor}</p>
                {c.id === "math-hour" && (
                  <ol className="mt-5 grid gap-2 sm:grid-cols-3">
                    {c.sessions.map((s) => (
                      <li key={s.title} className="rounded-md bg-elevated px-3 py-2">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{s.duration}</p>
                        <p className="mt-0.5 text-sm font-medium leading-snug">{s.title}</p>
                      </li>
                    ))}
                  </ol>
                )}
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  View route <ArrowRight className="size-3.5" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-ink text-accent-fg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent-fg/60">
            Before every school-related prompt
          </p>
          <h2 className="mt-2 font-display text-3xl">Green. Amber. Red.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {trafficLights.map((t) => (
              <div
                key={t.id}
                className={
                  t.id === "green"
                    ? "rounded-xl bg-green p-5 text-paper"
                    : t.id === "amber"
                      ? "rounded-xl bg-amber p-5 text-paper"
                      : "rounded-xl bg-red p-5 text-paper"
                }
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-paper/80">{t.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-paper/95">{t.meaning}</p>
                <p className="mt-3 text-sm font-medium">{t.action}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-8 bg-paper text-ink hover:bg-paper/90">
            <Link to="/data-card">Practise the data decision card</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">SCOPE-V</p>
        <h2 className="mt-2 max-w-[16ch] font-display text-3xl sm:text-4xl">
          Prompting is professional briefing, not magic words.
        </h2>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {scopeVFields.map((f) => (
            <li key={f.key} className="rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]">
              <span className="flex size-11 items-center justify-center rounded-md bg-accent font-display text-2xl text-accent-fg">
                {f.letter}
              </span>
              <p className="mt-3 font-medium">{f.label}</p>
              <p className="mt-1 text-sm text-muted">{f.hint}</p>
            </li>
          ))}
        </ol>
        <Button asChild className="mt-8">
          <Link to="/studio">Open the prompt studio</Link>
        </Button>
      </section>

      <section className="border-t border-line bg-accent-soft">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:grid-cols-2 sm:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent">What teachers leave with</p>
            <h2 className="mt-2 font-display text-3xl">A working Teacher AI Workspace.</h2>
            <p className="mt-3 text-ink-soft">Not a list of prompts. A system they can use tomorrow.</p>
          </div>
          <ul className="space-y-3 text-sm leading-relaxed">
            {[
              "Safe default setup on ChatGPT Free, including Memory and data-control awareness.",
              "One teaching Project with engineered instructions and approved sources.",
              "SCOPE-V prompting, verification and a classroom-ready artifact they own.",
              "Green / Amber / Red judgement, AVG escalation, AI Act literacy and safeguarding boundaries.",
              "A 30-day plan. Human decisions stay human.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-green" strokeWidth={2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="bg-ink text-accent-fg/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>ChatGPT for Teachers · v2.0 · Independent professional development.</p>
          <p>Not OpenAI certified. Not legal advice. Not school approval.</p>
        </div>
      </footer>
    </div>
  );
}
