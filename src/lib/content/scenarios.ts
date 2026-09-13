import type { TrafficLight } from "./legal";

export type Scenario = {
  id: string;
  prompt: string;
  answer: TrafficLight;
  why: string;
};

export const clinicScenarios: Scenario[] = [
  {
    id: "retrieval",
    prompt: "A teacher pastes an anonymous public curriculum excerpt and asks for retrieval questions.",
    answer: "green",
    why: "Public curriculum, no identifiable people. Still verify the questions before use.",
  },
  {
    id: "spreadsheet",
    prompt: "A teacher wants to analyse a spreadsheet containing names and accommodations.",
    answer: "red",
    why: "Identifiable students plus special-category or highly confidential support data. Redesign with synthetic or truly anonymous data, or use an approved school workflow.",
  },
  {
    id: "parent-email",
    prompt: "A teacher drafts a parent email using a de-identified scenario, then reviews it personally.",
    answer: "amber",
    why: "De-identified is not automatically anonymous. Check policy, remaining identifiers, and send in your own voice.",
  },
  {
    id: "detector",
    prompt: "A teacher asks ChatGPT to decide whether a student cheated based only on an AI-detector score.",
    answer: "red",
    why: "Consequential judgement outsourced to an uncertain system. Detectors are not proof. Follow school academic-integrity process.",
  },
  {
    id: "policy-compare",
    prompt: "A department uses a school-approved AI workspace to compare a public policy with a public curriculum guide.",
    answer: "green",
    why: "Approved workspace and public sources. Still verify claims against the official documents.",
  },
  {
    id: "hockey",
    prompt: "“Laura, Year 10D, Belgian national-level hockey player, is struggling with algebra. Draft an intervention plan.”",
    answer: "red",
    why: "The combination of details can re-identify one student even without a surname. Substitute a fully synthetic learner profile.",
  },
  {
    id: "safeguarding",
    prompt: "A colleague pastes a disclosure note into ChatGPT to ask whether it needs reporting.",
    answer: "red",
    why: "Safeguarding stays on the school route. Generic AI must not triage or store disclosures.",
  },
  {
    id: "generic-fractions",
    prompt: "“Create a 50-minute Year 7 lesson on equivalent fractions using only the public curriculum sequence.”",
    answer: "green",
    why: "Age and topic without person-level data. Verify mathematics, sequence and accessibility before teaching it.",
  },
];
