import { useState, useSyncExternalStore } from "react";
import { Link } from "@tanstack/react-router";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authEnabled, signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { forgetRememberedToken, usePreviewAuth } from "@/lib/use-preview-auth";
import { cn } from "@/lib/utils";

const subscribeToNothing = () => () => {};

export function PresenterAccount({
  tone = "paper",
  compact = false,
  loginLabel = "Log in",
}: {
  tone?: "paper" | "accent";
  compact?: boolean;
  loginLabel?: string;
}) {
  const { user, signedIn } = usePreviewAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const gateSession = useSyncExternalStore(
    subscribeToNothing,
    hasGateSessionMarker,
    () => false,
  );
  const onAccent = tone === "accent";
  const name = user?.displayName ?? user?.primaryEmail ?? "Presenter";

  if (!signedIn) {
    return (
      <Button
        asChild
        size={compact ? "sm" : "default"}
        className={onAccent ? "bg-paper text-accent hover:bg-paper/90" : undefined}
      >
        <Link to="/login" search={{ next: "/class" }}>
          <LogIn className="size-4" />
          {loginLabel}
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <p
        className={cn(
          "truncate text-sm",
          onAccent ? "text-accent-fg/90" : "text-ink-soft",
          compact ? "hidden max-w-[9rem] sm:block" : "max-w-[12rem]",
        )}
        title={name}
      >
        {name}
      </p>
      {authEnabled && !gateSession ? (
        <Button
          type="button"
          size="sm"
          variant={onAccent ? "secondary" : "outline"}
          className={onAccent ? "bg-paper text-accent hover:bg-paper/90" : undefined}
          disabled={busy}
          onClick={() => {
            setBusy(true);
            setError(null);
            forgetRememberedToken();
            void signOut("/").catch(() => {
              setBusy(false);
              setError("Could not sign out. Try again.");
            });
          }}
        >
          <LogOut className="size-4" />
          {busy ? "Signing out…" : "Log out"}
        </Button>
      ) : null}
      {error ? (
        <p className={cn("text-xs", onAccent ? "text-accent-fg" : "text-red")}>{error}</p>
      ) : null}
    </div>
  );
}
