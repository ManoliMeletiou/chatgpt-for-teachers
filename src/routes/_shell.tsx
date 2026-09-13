import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";

export const Route = createFileRoute("/_shell")({
  component: Shell,
});

function Shell() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
