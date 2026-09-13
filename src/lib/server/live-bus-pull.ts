import { createServerFn } from "@tanstack/react-start";
import { normalizeCode } from "@/lib/live/codes";
import {
  liveBusUrl,
  parseLiveBusPayload,
  parseNtfyPollBody,
  type LiveBusPayload,
} from "@/lib/live/public-bus";

/** Public: phones poll this. No auth — knowing the six-character code is the gate. */
export const pullLiveBus = createServerFn({ method: "POST" })
  .validator((input: { code: string }) => normalizeCode(input.code))
  .handler(async ({ data: code }): Promise<LiveBusPayload | null> => {
    if (code.length !== 6) return null;
    try {
      const res = await fetch(`${liveBusUrl(code)}/json?poll=1`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (!res.ok) return null;
      const text = await res.text();
      return parseNtfyPollBody(text) ?? parseLiveBusPayload(JSON.parse(text));
    } catch {
      return null;
    }
  });
