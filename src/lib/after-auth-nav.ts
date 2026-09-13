import type { NavigateOptions, RegisteredRouter } from "@tanstack/react-router";

type Go = (opts: NavigateOptions<RegisteredRouter>) => Promise<void> | void;

/** Client-side continue after sign-in — never a full document reload. */
export async function goAfterAuth(navigate: Go, callbackURL: string): Promise<void> {
  const path = callbackURL.split("?")[0] || "/desk";
  if (path === "/class") {
    await navigate({ to: "/class" });
    return;
  }
  if (path === "/desk") {
    await navigate({ to: "/desk" });
    return;
  }
  if (path === "/workbook") {
    await navigate({ to: "/workbook" });
    return;
  }
  if (path === "/log") {
    await navigate({ to: "/log" });
    return;
  }
  const log = path.match(/^\/log\/([^/]+)$/);
  if (log?.[1]) {
    await navigate({ to: "/log/$code", params: { code: log[1] } });
    return;
  }
  const join = path.match(/^\/join\/([^/]+)$/);
  if (join?.[1]) {
    await navigate({ to: "/join/$code", params: { code: join[1] } });
    return;
  }
  const mod = path.match(/^\/modules\/([^/]+)$/);
  if (mod?.[1]) {
    await navigate({ to: "/modules/$moduleId", params: { moduleId: mod[1] } });
    return;
  }
  await navigate({ to: "/desk" });
}
