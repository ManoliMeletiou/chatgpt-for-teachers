export function PrivatePreviewNotice({
  variant = "note",
}: {
  variant?: "card" | "banner" | "projector" | "note";
}) {
  if (variant === "banner") return null;
  return (
    <p className="mt-3 text-center text-sm text-ink-soft">
      Teachers scan this code on their own phones. They type their name and follow the lesson.
    </p>
  );
}
