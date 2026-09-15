import { useEffect, useState } from "react";
import { pullGuestRoomBrowser, type GuestRow } from "@/lib/live/public-bus";
import { getOrCreateRoomSecret } from "@/lib/live/room-secret";

export function PhoneRoom({ code }: { code: string }) {
  const [rows, setRows] = useState<GuestRow[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      const secret = getOrCreateRoomSecret(code);
      void pullGuestRoomBrowser(code, secret)
        .then((next) => {
          if (!cancelled) setRows(next);
        })
        .catch(() => {
          if (!cancelled) setRows([]);
        });
    };
    load();
    const timer = window.setInterval(load, 2500);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [code]);

  const live = rows.filter((r) => r.online).length;
  const sent = rows.filter((r) => r.bookletAt).length;

  return (
    <>
      <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl">On their phones</h2>
          <p className="text-sm text-muted">
            {live} live · {sent} booklet{sent === 1 ? "" : "s"}
          </p>
        </div>
        {rows.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft">
            When a teacher scans the QR and types their name, they appear here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {rows.map((row) => (
              <li key={row.name}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 py-2.5 text-left text-sm"
                  onClick={() => setOpen(open === row.name ? null : row.name)}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className={
                        row.online
                          ? "size-2 shrink-0 rounded-full bg-green"
                          : "size-2 shrink-0 rounded-full bg-line-strong"
                      }
                    />
                    <span className="truncate font-medium">{row.name}</span>
                  </span>
                  <span className="shrink-0 text-muted">
                    {row.bookletAt ? "Booklet in" : row.online ? "Following" : "Left"}
                  </span>
                </button>
                {open === row.name && row.bookletAt ? (
                  <div className="mb-3 space-y-2 rounded-lg bg-paper px-3 py-3 text-sm">
                    {Object.entries(row.answers)
                      .filter(([, v]) => v.trim())
                      .map(([id, value]) => (
                        <p key={id}>
                          <span className="block text-[11px] uppercase tracking-[0.14em] text-muted">
                            {id.replace(/^hour-/, "").replace(/-/g, " ")}
                          </span>
                          {value}
                        </p>
                      ))}
                    {row.takeaway ? (
                      <p>
                        <span className="block text-[11px] uppercase tracking-[0.14em] text-muted">
                          Will try
                        </span>
                        {row.takeaway}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
