import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { displayCode, isValidCode, normalizeCode } from "@/lib/live/codes";

export const Route = createFileRoute("/join/")({
  component: JoinIndex,
});

function JoinIndex() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const ready = isValidCode(code);

  return (
    <main className="join-field min-h-dvh text-paper">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-12">
        <Link to="/" className="mb-8 flex items-center gap-2.5">
          <BrandMark inverse />
          <span className="font-display text-[15px] tracking-tight">ChatGPT for Teachers</span>
        </Link>
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-paper/80">
          <span className="live-dot" />
          Join a live class
        </p>
        <h1 className="mt-2 font-display text-3xl">Enter the code on the screen.</h1>
        <p className="mt-3 text-paper/90 leading-relaxed">
          Scan the presenter’s QR code, or type the six characters. Then sign in on your own
          account — not the presenting laptop. That enrols you on the course being taught, saves
          your booklet, and puts you in the room with the presenter.
        </p>
        <form
          className="mt-8 space-y-4 rounded-xl bg-paper p-5 text-ink shadow-[var(--shadow-border)] sm:p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!ready) return;
            void navigate({ to: "/join/$code", params: { code: normalizeCode(code) } });
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="code">Class code</Label>
            <Input
              id="code"
              value={displayCode(code)}
              onChange={(e) => setCode(normalizeCode(e.target.value).slice(0, 6))}
              autoCapitalize="characters"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              placeholder="K7M 4P2"
              className="h-14 font-display text-2xl tracking-[0.2em]"
            />
          </div>
          <Button type="submit" className="w-full" disabled={!ready}>
            Continue
          </Button>
        </form>
        <p className="mt-6 text-sm text-paper/80">
          Presenting today?{" "}
          <Link to="/class" className="font-medium text-paper underline-offset-4 hover:underline">
            Open a live class
          </Link>
        </p>
      </div>
    </main>
  );
}
