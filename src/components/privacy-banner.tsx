import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const KEY = "cft-privacy-ok-v1";

export function PrivacyBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setOpen(window.localStorage.getItem(KEY) !== "1");
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/45 p-4 sm:items-center no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
    >
      <div className="w-full max-w-md rounded-xl bg-paper p-5 shadow-[var(--shadow-border-hover)] sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Privacy</p>
        <h2 id="privacy-title" className="mt-2 font-display text-2xl">
          How this desk keeps your work.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Sign-in uses an essential cookie. Your booklet, diagnostic and class join are saved on
          your account so you keep the work, and so the presenter can collect it after the session.
          Do not put student names in the notes.
        </p>
        <button
          type="button"
          className="mt-5 h-12 w-full rounded-md bg-accent px-4 text-sm text-accent-fg"
          onClick={() => {
            try {
              window.localStorage.setItem(KEY, "1");
            } catch {
              /* ignore */
            }
            setOpen(false);
          }}
        >
          Understood
        </button>
      </div>
    </div>,
    document.body,
  );
}
