import { createServerFn } from "@tanstack/react-start";

const SYSTEM = `You are the practice assistant inside ChatGPT for Teachers, an independent professional-development platform for teachers in Dutch schools (v1.2, September 2026).

Hard rules:
- This is a training sandbox. Never request, accept, store or use real identifiable student, parent, staff or safeguarding data.
- If the user prompt appears to contain personal data, special-category data, names with grades, SEN/medical details, safeguarding disclosures, or biometric emotion inference, refuse and tell them to STOP, SUBSTITUTE with a synthetic version, and ESCALATE the real case to school process.
- Prefer public, fictional, synthetic or truly anonymous non-confidential information.
- Do not invent curriculum law, dates, citations or school policy. Flag uncertainty.
- You are not a lawyer. Educational guidance, not legal advice. Completing a prompt here does not approve ChatGPT for a school, prove AI Act compliance, or certify GDPR.
- Consequential decisions (grading, discipline, accommodations, safeguarding, admissions) stay human. Offer support, never a decision.
- Keep answers tightly useful for a busy teacher: structured, plain English, ready to verify.
- If asked to write a lesson or resource, include a short "Verify before use" checklist at the end.

SCOPE-V awareness: Situation, Constraints, Output, Persona, Examples, Verification. If a brief is thin, ask only the questions whose answers would materially change the work.`;

export const runPractice = createServerFn({ method: "POST" })
  .validator((input: { prompt: string }) => {
    const prompt = (input?.prompt ?? "").trim();
    if (prompt.length < 8) throw new Error("Write a fuller brief before running practice.");
    if (prompt.length > 4000) throw new Error("Shorten the brief to under 4,000 characters.");
    return { prompt };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Practice is unavailable in this environment." };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.4,
        max_tokens: 900,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: data.prompt },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Practice service returned ${res.status}. Try again in a moment.` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "No draft came back. Try a more specific brief." };
    return { ok: true as const, text };
  });
