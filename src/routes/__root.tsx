import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { LiveClassProvider } from "@/components/live/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { PrivacyBanner } from "@/components/privacy-banner";
import { ProgressSync } from "@/components/progress-sync";
import { restoreRememberedToken } from "@/lib/use-preview-auth";
import appCss from "../styles.css?url";

if (typeof window !== "undefined") restoreRememberedToken();

const APP_NAME = "ChatGPT for Teachers";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Independent professional development for teachers in Dutch schools: practical ChatGPT Free workflows with a mandatory Netherlands / EU safe-and-legal core.",
      },
      { name: "theme-color", content: "#0c6e66" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,460;9..144,520;9..144,600&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <LiveClassProvider>
            <ProgressSync />
            <Outlet />
            <PrivacyBanner />
          </LiveClassProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
