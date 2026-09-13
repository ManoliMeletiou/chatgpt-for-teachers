import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/layout/app-shell";
import { precisionTable, legalChapters, operatingAssumption, sources } from "@/lib/content/legal";

export const Route = createFileRoute("/_shell/legal")({ component: LegalPage });

function LegalPage() {
  return (
    <Page
      kicker="Mandatory participant reference"
      title="Safe & legal use of ChatGPT in Dutch schools"
      lead="Netherlands teacher edition · v1.2 · 10 September 2026. Educational guidance, not legal advice or compliance certification."
    >
      <div className="rounded-xl bg-accent p-6 text-accent-fg sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.16em] text-accent-fg/70">
          {operatingAssumption.title}
        </p>
        <p className="mt-3 max-w-3xl text-lg leading-snug">{operatingAssumption.body}</p>
        <p className="mt-4 max-w-3xl text-sm text-accent-fg/85">{operatingAssumption.everyday}</p>
      </div>

      <div className="mt-10 space-y-8">
        {legalChapters.map((ch) => (
          <article key={ch.id} id={ch.id} className="scroll-mt-20">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{ch.kicker}</p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl">{ch.title}</h2>
            <div className="mt-4 max-w-prose space-y-3 text-[15px] leading-relaxed text-ink-soft">
              {ch.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {ch.points && (
              <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5 text-sm text-ink">
                {ch.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Legal precision</h2>
        <p className="mt-2 text-sm text-muted">What this workshop deliberately does not overstate.</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-line">
          {precisionTable.map((row) => (
            <div key={row.avoid} className="grid gap-3 border-b border-line p-4 last:border-b-0 sm:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-red">Avoid saying</p>
                <p className="mt-1 text-sm">{row.avoid}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-green">Use this</p>
                <p className="mt-1 text-sm">{row.use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Official source register</h2>
        <p className="mt-2 max-w-prose text-sm text-muted">
          These sources control the legal and safety claims in this edition. Recheck before delivery.
        </p>
        <ul className="mt-4 space-y-3">
          {sources.map((s) => (
            <li key={s.document} className="rounded-lg border border-line bg-surface p-4">
              <p className="text-sm font-medium">
                {s.authority} · {s.date}
              </p>
              <p className="mt-1 text-sm">{s.document}</p>
              <p className="mt-1 text-sm text-muted">{s.why}</p>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
