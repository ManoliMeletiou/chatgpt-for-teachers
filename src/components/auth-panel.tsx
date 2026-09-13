import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { goAfterAuth } from "@/lib/after-auth-nav";
import { persistPreviewToken, restoreRememberedToken } from "@/lib/use-preview-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | undefined> {
  return Promise.race([
    promise.then((value) => value, () => undefined),
    new Promise<undefined>((resolve) => {
      window.setTimeout(() => resolve(undefined), ms);
    }),
  ]);
}

export function AuthPanel({
  callbackURL,
  lead,
  staySignedIn = true,
}: {
  callbackURL: string;
  lead?: string;
  staySignedIn?: boolean;
}) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onOAuth(providerId: string) {
    setError(null);
    try {
      await signIn(providerId, { callbackURL, errorCallbackURL: callbackURL });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    }
  }

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    if (!authEnabled) return;
    setBusy(true);
    setError(null);
    try {
      if (mode === "signup") {
        const { data, error: err } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || email.split("@")[0] || "Teacher",
        });
        if (err) throw new Error(err.message ?? "Could not create the account.");
        persistPreviewToken(data);
      } else {
        const { data, error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
          rememberMe: true,
        });
        if (err) throw new Error(err.message ?? "Email or password is not right.");
        persistPreviewToken(data);
      }
      await withTimeout(authClient.getSession(), 1600);
      restoreRememberedToken();
      await goAfterAuth(navigate, callbackURL);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not continue.");
      setBusy(false);
    }
  }

  if (!authEnabled) {
    return <p className="text-sm text-muted">Sign-in is disabled.</p>;
  }

  return (
    <div className="space-y-5">
      {lead && <p className="text-sm leading-relaxed text-ink-soft">{lead}</p>}
      <div className="flex flex-col gap-2">
        {GROK_PROVIDERS.map((p) => (
          <Button
            key={p.providerId}
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => void onOAuth(p.providerId)}
          >
            Continue with {p.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-muted">
        <span className="h-px flex-1 bg-line" />
        or email
        <span className="h-px flex-1 bg-line" />
      </div>

      <form className="space-y-3" onSubmit={(e) => void onEmail(e)}>
        {mode === "signup" && (
          <div className="space-y-1.5">
            <Label htmlFor="display-name">How should the room see you?</Label>
            <Input
              id="display-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="First name and initial"
            />
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@school.nl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
        </div>
        {error && <p className="text-sm text-red">{error}</p>}
        {staySignedIn ? (
          <p className="text-sm text-muted">
            You stay signed in on this device until you tap Log out.
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Opening…" : mode === "signup" ? "Create account and continue" : "Sign in with email"}
        </Button>
      </form>

      <button
        type="button"
        className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setError(null);
        }}
      >
        {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
