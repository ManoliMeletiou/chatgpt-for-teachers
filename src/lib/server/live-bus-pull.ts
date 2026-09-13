import { createServerFn } from "@tanstack/react-start";
import { normalizeCode } from "@/lib/live/codes";
import {
  LIVE_BUS_HOSTS,
  guestsFromPoll,
  liveBusTopic,
  liveGuestTopic,
  parseLiveBusPayload,
  parseNtfyPollBody,
  type GuestRow,
  type LiveBusPayload,
} from "@/lib/live/public-bus";

async function pollHost(host: string, topic: string): Promise<string> {
  const res = await fetch(`${host}/${topic}/json?poll=1`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(String(res.status));
  return res.text();
}

/** Public: phones poll this. No auth — knowing the six-character code is the gate. */
export const pullLiveBus = createServerFn({ method: "POST" })
  .validator((input: { code: string }) => normalizeCode(input.code))
  .handler(async ({ data: code }): Promise<LiveBusPayload | null> => {
    if (code.length !== 6) return null;
    const topic = liveBusTopic(code);
    const results = await Promise.allSettled(
      LIVE_BUS_HOSTS.map(async (host) => {
        const text = await pollHost(host, topic);
        let parsed = parseNtfyPollBody(text);
        if (!parsed) {
          try {
            parsed = parseLiveBusPayload(JSON.parse(text));
          } catch {
            parsed = null;
          }
        }
        if (!parsed) throw new Error("empty");
        return parsed;
      }),
    );
    let best: LiveBusPayload | null = null;
    for (const row of results) {
      if (row.status !== "fulfilled") continue;
      if (!best || row.value.at >= best.at) best = row.value;
    }
    return best;
  });

/** Presenter laptop: who joined from a phone and which booklets arrived. */
export const pullGuestRoom = createServerFn({ method: "POST" })
  .validator((input: { code: string }) => normalizeCode(input.code))
  .handler(async ({ data: code }): Promise<GuestRow[]> => {
    if (code.length !== 6) return [];
    const topic = liveGuestTopic(code);
    for (const host of LIVE_BUS_HOSTS) {
      try {
        const text = await pollHost(host, topic);
        const rows = guestsFromPoll(text);
        if (rows.length) return rows;
      } catch {
        // try next host
      }
    }
    return [];
  });
