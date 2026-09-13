export function PrivatePreviewNotice({
  variant = "note",
}: {
  variant?: "card" | "banner" | "projector" | "note";
}) {
  if (variant === "banner") return null;
  return (
    <p className={variant === "projector" ? "text-sm text-accent-fg/80" : "mt-3 text-center text-sm text-ink-soft"}>
      This QR opens a public class page on the teacher’s phone. It is not a draft.
      They type their name and follow the lesson.
    </p>
  );
}
