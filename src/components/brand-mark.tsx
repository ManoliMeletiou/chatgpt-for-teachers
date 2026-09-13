import { cn } from "@/lib/utils";

export function BrandMark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  const field = inverse ? "#f6edd8" : "#0c6e66";
  const mark = inverse ? "#0c6e66" : "#f6edd8";
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8 shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill={field} />
      <path
        d="M8 11.5c3.2-2.2 6.4-2.2 8 0 1.6-2.2 4.8-2.2 8 0v10c-3.2-2-6.4-2-8 0-1.6-2-4.8-2-8 0v-10z"
        fill={mark}
      />
      <path d="M16 11.5v10" stroke={field} strokeWidth="1.4" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <BrandMark />
      <div className="min-w-0 leading-tight">
        <div className="font-display text-[15px] tracking-tight text-ink truncate">
          ChatGPT for Teachers
        </div>
        {!compact && (
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted truncate">
            Netherlands · Safe · Legal
          </div>
        )}
      </div>
    </div>
  );
}
