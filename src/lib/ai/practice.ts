import { createServerFn } from "@tanstack/react-start";

const PERSONAL = /(?:student|pupil|parent|colleague|learner).{0,35}(?:name|email|phone|diagnos|sen|safeguard|grade|mark)|\bBSN\b|@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i;
const checks = [
  ["Situation", /(year|grade|class|lesson|topic|context|students?|teachers?)/i, "State the teaching context and purpose."],
  ["Constraints", /(must|do not|avoid|limit|minutes?|words?|level|language|curriculum|rubric)/i, "Add the boundaries that matter."],
  ["Output", /(table|worksheet|quiz|email|plan|slides?|questions?|format|list|draft)/i, "Name the exact deliverable and structure."],
  ["Persona", /(teacher|coach|editor|expert|act as|you are)/i, "Specify the professional role only when it improves the result."],
  ["Examples", /(example|model|sample|such as|e\.g\.)/i, "Add one short example when format or level could be ambiguous."],
  ["Verification", /(verify|check|source|cite|accuracy|criteria|flag uncertainty|show working)/i, "Tell the model how the teacher will verify the output."],
] as const;

export const runPractice = createServerFn({ method: "POST" })
  .validator((input: { prompt: string }) => {
    const prompt = (input?.prompt ?? "").trim();
    if (prompt.length < 8) throw new Error("Write a fuller brief before running practice.");
    if (prompt.length > 4000) throw new Error("Shorten the brief to under 4,000 characters.");
    return { prompt };
  })
  .handler(async ({ data }) => {
    if (PERSONAL.test(data.prompt)) {
      return {
        ok: true as const,
        text: "SAFETY GATE — stop here. This training coach detected wording that may contain identifiable or sensitive school information. Replace the case with fictional, synthetic or genuinely anonymous data, then retry. Do not paste the real case into a personal or unapproved AI account.",
      };
    }
    const results = checks.map(([label, re, advice]) => ({ label, pass: re.test(data.prompt), advice }));
    const strong = results.filter((r) => r.pass).map((r) => r.label);
    const missing = results.filter((r) => !r.pass);
    const score = strong.length;
    const lines = [
      `SCOPE-V COACH · ${score}/6 signals present`,
      "",
      strong.length ? `Already clear: ${strong.join(", ")}.` : "The brief is still very open-ended.",
      "",
      "Strengthen before you use it:",
      ...(missing.length ? missing.map((r) => `• ${r.label}: ${r.advice}`) : ["• Nothing essential is missing. Keep the prompt concise and test the output."]),
      "",
      "Teacher-control check:",
      "• Use only data your school permits for this tool and purpose.",
      "• Verify factual, mathematical, curricular and legal claims against an authoritative source.",
      "• Keep grading, safeguarding, accommodations and other consequential decisions human.",
      "",
      "This coach analyses the wording locally; it does not send your practice brief to another AI provider.",
    ];
    return { ok: true as const, text: lines.join("\n") };
  });
