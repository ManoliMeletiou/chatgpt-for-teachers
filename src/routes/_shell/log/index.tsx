import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Page } from "@/components/layout/app-shell";
import { PresenterInbox } from "@/components/live/presenter-inbox";
import { PresenterAccount } from "@/components/presenter-account";
import { Button } from "@/components/ui/button";
import { usePreviewAuth } from "@/lib/use-preview-auth";

export const Route = createFileRoute("/_shell/log/")({
  component: DateLogPage,
});

function DateLogPage() {
  const { signedIn, resolving } = usePreviewAuth();

  if (resolving) {
    return (
      <Page kicker="Past classes" title="Opening past classes.">
        <div className="h-40 animate-pulse rounded-xl bg-line/70" />
      </Page>
    );
  }

  if (!signedIn) return <Navigate to="/login" search={{ next: "/log" }} />;

  return (
    <Page
      kicker="Past classes"
      title="Open a past class."
      lead="Who participated, which exact course, how long it took. Open one to print booklets and certificates."
      actions={
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="secondary">
            <Link to="/class">Open a room</Link>
          </Button>
          <PresenterAccount />
        </div>
      }
    >
      <PresenterInbox empty="message" heading={false} />
    </Page>
  );
}
