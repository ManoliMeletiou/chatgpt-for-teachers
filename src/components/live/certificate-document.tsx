import { BrandMark } from "@/components/brand-mark";
import { prettyPersonName } from "@/lib/person-name";
import { cn } from "@/lib/utils";

export type CertificateData = {
  name: string;
  courseTitle: string;
  courseKicker?: string;
  duration?: string;
  day: string;
  school?: string;
  role?: string;
};

export function CertificateDocument({
  data,
  className,
}: {
  data: CertificateData;
  className?: string;
}) {
  const name = prettyPersonName(data.name);
  const school = (data.school ?? "").trim();
  const role = (data.role ?? "").trim();
  const under = [role, school].filter(Boolean).join(" · ");

  return (
    <article className={cn("certificate-sheet", className)}>
      <div className="certificate-sheet-inner">
        <span className="certificate-corner certificate-corner-tl" aria-hidden />
        <span className="certificate-corner certificate-corner-tr" aria-hidden />
        <span className="certificate-corner certificate-corner-bl" aria-hidden />
        <span className="certificate-corner certificate-corner-br" aria-hidden />

        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandMark className="size-10" />
            <div>
              <p className="font-display text-lg leading-tight tracking-tight">
                ChatGPT for Teachers
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                Netherlands · v1.2
              </p>
            </div>
          </div>
          {data.courseKicker ? (
            <p className="hidden text-right text-[10px] uppercase tracking-[0.16em] text-accent sm:block">
              {data.courseKicker}
            </p>
          ) : null}
        </header>

        <p className="mt-7 text-center text-[11px] uppercase tracking-[0.28em] text-accent">
          Certificate of completion
        </p>
        <p className="mt-5 text-center text-sm text-ink-soft">This is to certify that</p>
        <h1 className="certificate-name">{name}</h1>
        {under ? <p className="mt-1 text-center text-sm text-ink-soft">{under}</p> : null}

        <p className="mt-6 text-center text-sm text-ink-soft">has completed</p>
        <p className="mt-2 text-center font-display text-2xl leading-tight tracking-tight sm:text-3xl">
          {data.courseTitle}
        </p>
        <p className="mt-2 text-center text-sm text-muted">
          {[data.duration, data.day].filter(Boolean).join(" · ")}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-8 px-2 pt-8 sm:px-8">
          <div className="border-t border-line-strong pt-2">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Participant</p>
            <p className="mt-1 font-display text-base leading-tight">{name}</p>
          </div>
          <div className="border-t border-line-strong pt-2 text-right">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Issued</p>
            <p className="mt-1 font-display text-base leading-tight">{data.day}</p>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted">
          Independent professional development. Not OpenAI certification, not legal advice,
          and not school approval.
        </p>
      </div>
    </article>
  );
}
