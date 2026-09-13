import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { roadmap, timeline } from "@/lib/content/legal";

export const Route = createFileRoute("/_shell/governance")({ component: GovernancePage });

function GovernancePage() {
  return (
    <Page
      kicker="School implementation"
      title="Shared rules beat private improvisation."
      lead="If staff are already using AI before formal approval, the answer is not silence: set interim red lines, approved-use boundaries and an escalation path."
    >
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {roadmap.map((r) => (
          <li key={r.n} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-display text-3xl text-accent">{r.n}</p>
            <h2 className="mt-2 font-display text-xl">{r.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{r.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Two clocks, kept separate</h2>
        <p className="mt-2 max-w-prose text-sm text-ink-soft">
          EU AI Act duties and the Dutch Normenkader IBP are related governance work. They are
          not the same law. Do not present the Normenkader timetable as an AI Act deadline.
        </p>
        <ol className="mt-6 space-y-0">
          {timeline.map((t, i) => (
            <li key={t.date} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="size-2.5 rounded-full bg-accent" />
                {i < timeline.length - 1 && <span className="w-px flex-1 bg-line" />}
              </div>
              <div className="pb-6">
                <p className="font-medium">{t.date}</p>
                <p className="text-sm text-ink-soft">{t.label}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Approved tools",
            body: "Which accounts, plugins and AI systems are permitted for which kinds of data? Are processor terms, security, access, retention and connections acceptable?",
          },
          {
            title: "Risk and rights",
            body: "Who decides when a DPIA is needed, whether a use is high-risk, and whether a FRIA applies? Involve DPO, privacy, legal and leadership.",
          },
          {
            title: "Operational rules",
            body: "Assessment and human-oversight rules, student-account and age rules, safeguarding boundaries, and what staff do after accidental data sharing.",
          },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border border-line bg-elevated p-5">
            <h3 className="font-display text-xl">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
          </div>
        ))}
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/legal">Read the full handbook</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/data-card">Practise the data card</Link>
        </Button>
      </div>
    </Page>
  );
}
