export const operatingAssumption = {
  title: "The operating assumption",
  body: "ChatGPT may not yet be a school-approved tool. This platform teaches safe professional use under that assumption. Training does not approve the tool, create a lawful basis, replace a DPIA or processing agreement, or override school policy.",
  everyday:
    "Do not put identifiable student, parent, colleague or safeguarding information into a personal or unapproved ChatGPT account.",
};

export type TrafficLight = "green" | "amber" | "red";

export const trafficLights: {
  id: TrafficLight;
  label: string;
  meaning: string;
  examples: string;
  action: string;
}[] = [
  {
    id: "green",
    label: "Green",
    meaning:
      "Generally suitable for an unapproved or personal AI tool because no identifiable or confidential school data is needed.",
    examples:
      "Public curriculum information; generic lesson ideas; fictional examples; self-created low-risk notes; truly anonymous data.",
    action: "Proceed — then verify the output before classroom use.",
  },
  {
    id: "amber",
    label: "Amber",
    meaning:
      "Pause. The material may be internal, confidential, unpublished or only pseudonymised. School policy and necessity matter.",
    examples:
      "Internal planning; unpublished assessment material; class-level patterns; de-identified work that could still be re-identified.",
    action:
      "Default to synthetic, public or truly anonymous material unless the school has approved this use.",
  },
  {
    id: "red",
    label: "Red",
    meaning: "Do not enter it into an unapproved general AI tool.",
    examples:
      "Names + grades; identifiable student work; health/SEN data; safeguarding; wellbeing; parent disputes; discipline; psychological reports; family circumstances; IDs and contact details; confidential HR data.",
    action: "Stop. Substitute a synthetic version, or escalate to the school process.",
  },
];

export const fiveQuestions = [
  "Is there any personal, confidential or special-category data?",
  "Is the exact tool, account and use case school-approved?",
  "Could the person still be identified from combined details?",
  "Could the output significantly affect a learner or another person?",
  "Which authoritative source and human decision control the result?",
];

export const stopSubstituteEscalate = [
  {
    title: "Stop",
    body: "Do not use the real data in an unapproved tool. Do not “just test it”.",
  },
  {
    title: "Substitute",
    body: "Replace with a fictional, synthetic or truly anonymous version that still lets you practise the workflow.",
  },
  {
    title: "Escalate",
    body: "Take the real use case to the school’s privacy, ICT, DPO or leadership route.",
  },
];

export const legalChapters: {
  id: string;
  title: string;
  kicker: string;
  paragraphs: string[];
  points?: string[];
}[] = [
  {
    id: "personal-data",
    title: "Personal data: what teachers must recognise",
    kicker: "AVG / GDPR",
    paragraphs: [
      "Personal data is any information relating to an identified or identifiable living person. Multiple details can identify someone even when their name is removed.",
      "Educational records such as named work, marks, attendance, behaviour notes and communications are personal data when linked to an identifiable person.",
      "Some data is especially protected as special-category data, including health information. Do not assume all education data is special-category data; distinguish the categories correctly.",
      "Pseudonymised data remains personal data if re-identification is possible. Truly anonymous data is outside GDPR only when the individual is no longer identifiable and anonymisation is effectively irreversible.",
      "Uploading a file is still data processing. A file can contain personal data even if your prompt does not repeat it.",
    ],
    points: [
      "False anonymity: “Laura, Year 10D, Belgian national-level hockey player…” may still identify one student in a school community.",
      "Removing a surname is not enough when the remaining combination points back to the person.",
    ],
  },
  {
    id: "approval",
    title: "Account type is not school approval",
    kicker: "Three different questions",
    paragraphs: [
      "A personal Free, Plus or Pro account is a consumer workspace. Data Controls can change whether new conversations are used for model improvement. That does not prove the school has approved the tool or the intended use of student or staff data.",
      "A managed organisation workspace may provide organisation controls and default no-training commitments. That does not prove every data type, app, connector or workflow is lawful or approved for your school.",
      "School approval means the school has assessed the tool and use case through its policy, privacy, security, supplier and governance processes. Approval can be use-case and data-specific.",
      "Turning off “Improve the model for everyone” can reduce one data-use risk. It does not create a verwerkersovereenkomst, supply a lawful basis, complete a DPIA, or make the account school-approved.",
    ],
  },
  {
    id: "avg",
    title: "AVG / GDPR: the practical school workflow",
    kicker: "Escalate rather than self-authorise",
    paragraphs: [
      "Define the educational purpose and legal basis. “AI is useful” is not a lawful purpose by itself.",
      "Use the least personal data needed. Prefer public, synthetic, fictitious or truly anonymous data when possible.",
      "If a supplier processes personal data on behalf of the school, the school must have appropriate processing arrangements, including a verwerkersovereenkomst where applicable.",
      "Kennisnet advises schools to perform a DPIA when an AI application processes personal data. Under GDPR, the statutory DPIA trigger is processing likely to result in high risk. Teachers should escalate the question rather than decide this alone.",
      "If you cannot answer “Is this use school-approved for this data?”, do not test it with real data.",
    ],
  },
  {
    id: "ai-act",
    title: "EU AI Act: what is already relevant",
    kicker: "Literacy, risk, prohibition",
    paragraphs: [
      "Article 4 requires providers and deployers to take measures supporting AI literacy for staff using AI on their behalf. Attendance at one workshop does not itself prove compliance.",
      "Most of the AI Act applies from 2 August 2026. Chapters I and II began applying from 2 February 2025. The main Chapter III requirements for Annex III high-risk systems apply from 2 December 2027.",
      "A general chatbot used to brainstorm a worksheet is not automatically a high-risk education AI system. Intended purpose and effect matter.",
      "Annex III includes AI intended for access, admission or assignment to education; evaluation of learning outcomes including where results steer learning; assessment of the education level a person receives; and monitoring prohibited behaviour during tests.",
      "Article 6(3) can exclude narrow, preparatory or review uses that do not materially influence decision outcomes. Profiling of natural persons remains high-risk. Do not label every teacher use “high-risk”.",
    ],
  },
  {
    id: "emotion",
    title: "Prohibited: emotion recognition in education",
    kicker: "Article 5",
    paragraphs: [
      "The AI Act generally prohibits using AI to infer a person’s emotions in educational institutions from biometric data, apart from limited medical or safety reasons.",
      "Do not pilot “attention”, “engagement” or emotion-detection systems using students’ faces, voices or other biometrics. Escalate any proposed system to leadership, privacy and procurement review.",
      "This prohibition is about biometric emotion inference. It is not a ban on a teacher noticing that a student appears upset through normal human interaction.",
    ],
  },
  {
    id: "assessment",
    title: "Assessment, grading and automated decisions",
    kicker: "Human oversight",
    paragraphs: [
      "AI can support question design, generic feedback stems, rubric critique, moderation thinking and teacher-led analysis. It should not silently or independently determine a student’s grade, discipline, placement, accommodation, safeguarding action or other significant educational outcome.",
      "GDPR Article 22 addresses decisions based solely on automated processing that produce legal effects or similarly significant effects, with defined exceptions and safeguards. It is narrower than “all automated decisions are illegal”.",
      "Kennisnet warns against independent AI grading and emphasises teacher oversight. Keep the teacher able to inspect the evidence, understand limitations, override the output and make the final decision.",
      "Never use an AI-detector score as sole proof of misconduct. Use process evidence, drafts, conversation, subject knowledge and school policy.",
    ],
  },
  {
    id: "safeguarding",
    title: "Safeguarding and wellbeing",
    kicker: "Hard boundary",
    paragraphs: [
      "Do not upload identifiable disclosures, safeguarding notes, allegations, medical or mental-health details or family circumstances to an unapproved general AI tool.",
      "Use the school’s safeguarding record, designated safeguarding lead and reporting process. AI must not become a substitute safeguarding record or triage authority.",
      "AI can still create fictional staff-training scenarios or explain an approved policy using fictional data.",
    ],
  },
  {
    id: "incidents",
    title: "If sensitive data is accidentally shared",
    kicker: "Incident response",
    paragraphs: [
      "Stop further sharing. Do not copy the same data into another AI tool while trying to fix the first disclosure.",
      "Record the minimum facts: what data, which tool and account, when, who could access it, and what actions were taken.",
      "Follow the school’s data-breach and information-security incident process immediately. Notify the designated privacy, DPO or security contact.",
      "If safeguarding information is involved, follow safeguarding reporting procedures as well. Do not assume deleting a chat automatically resolves the incident.",
    ],
  },
  {
    id: "students",
    title: "Students and personal AI accounts",
    kicker: "Do not improvise",
    paragraphs: [
      "Do not instruct students to create personal or free AI accounts for required schoolwork unless the school has deliberately approved that model and its privacy implications.",
      "Kennisnet recommends school-arranged safe or anonymous accounts where schools want pupils to experiment with generative AI, plus clear rules preventing personal data in prompts.",
      "OpenAI’s EU terms currently require users to be at least 13 or the local minimum age for consent; under-18s require parent or legal-guardian permission. Product-specific school arrangements can differ and must be checked.",
    ],
  },
  {
    id: "normenkader",
    title: "Normenkader IBP FO",
    kicker: "Separate but relevant",
    paragraphs: [
      "The Dutch Normenkader Informatiebeveiliging en Privacy for primary and secondary education is not a ChatGPT-specific law and is not the AI Act. It is a separate sector framework for information security and privacy.",
      "From 1 January 2027 schools must know where they stand through self-evaluation and have an improvement plan. The government plans mandatory full compliance by 2030.",
    ],
  },
];

export const timeline = [
  { date: "2 Feb 2025", label: "Article 4 AI literacy and key prohibited-practice rules apply." },
  { date: "Aug 2026", label: "AI Act generally applies; national supervision is active." },
  { date: "1 Jan 2027", label: "NL schools: Normenkader IBP self-evaluation and improvement plan expected." },
  { date: "2 Dec 2027", label: "Main Chapter III requirements for Annex III high-risk AI systems apply." },
  { date: "Dec 2027", label: "FRIA required for some deployers, including certain public-body high-risk uses." },
  { date: "By 2030", label: "Dutch planning: schools required to meet all Normenkader IBP requirements." },
];

export const sources = [
  {
    authority: "Kennisnet",
    document: "Generatieve AI en privacy: hier moeten scholen op letten",
    date: "Updated 22 Sep 2025",
    why: "Personal data in prompts and uploads, DPIA guidance, supplier agreements, centrally managed accounts, anonymous or fictitious data.",
  },
  {
    authority: "Kennisnet",
    document: "Schoolafspraken over het gebruik van generatieve AI",
    date: "27 May 2025",
    why: "Human control, privacy, school-approved tools and shared school rules.",
  },
  {
    authority: "European Union",
    document: "Regulation (EU) 2024/1689 — AI Act, consolidated 27 Jul 2026",
    date: "27 Jul 2026",
    why: "Article 4 literacy; Article 5 prohibited practices; Article 6 classification; Annex III education uses.",
  },
  {
    authority: "European Commission",
    document: "GDPR — personal, pseudonymised and anonymous data",
    date: "Current",
    why: "Pseudonymised or re-identifiable data remains personal data.",
  },
  {
    authority: "Autoriteit Persoonsgegevens",
    document: "Aan de slag met de FRIA",
    date: "17 Aug 2026",
    why: "FRIA preparation for certain high-risk AI deployments from Dec 2027.",
  },
  {
    authority: "Rijksoverheid",
    document: "Veilige en goede ICT in het onderwijs",
    date: "Current",
    why: "Normenkader IBP FO timetable for schools.",
  },
  {
    authority: "OpenAI",
    document: "Europe Terms of Use / Data Controls / Business data privacy",
    date: "Checked 10 Sep 2026",
    why: "Age terms, model-training opt-out, organisation no-training defaults — none of which equal school approval.",
  },
];

export const precisionTable: { avoid: string; use: string }[] = [
  {
    avoid: "A DPIA is legally required for every AI use involving any personal data.",
    use: "Kennisnet advises a DPIA when an AI application processes personal data; GDPR’s statutory trigger is likely high risk. Escalate rather than self-authorise.",
  },
  {
    avoid: "All automated decisions are illegal.",
    use: "GDPR Article 22 restricts solely automated decisions with legal or similarly significant effects. Consequential school decisions should remain meaningfully human-controlled.",
  },
  {
    avoid: "Any AI that helps mark work is automatically high-risk.",
    use: "Annex III includes intended learning-outcome evaluation, but Article 6(3) can exclude narrow or preparatory uses that do not materially influence decisions.",
  },
  {
    avoid: "Business / Edu / Teachers means GDPR-approved.",
    use: "Organisation privacy commitments can reduce risk. School approval still requires the school’s own purpose, legal, supplier, privacy and governance assessment.",
  },
  {
    avoid: "Removing the name makes it anonymous.",
    use: "Data remains personal if the person can reasonably be re-identified from remaining or combined details.",
  },
];

export const roadmap = [
  { n: "1", title: "Map reality", body: "What staff and students already use." },
  { n: "2", title: "Set interim red lines", body: "No identifiable data in unapproved tools." },
  { n: "3", title: "Approve and assess", body: "Tools, supplier terms, DPIA / AI Act questions." },
  { n: "4", title: "Train", body: "AI literacy and safe workflows — role, context and risk aware." },
  { n: "5", title: "Pilot safely", body: "Low-risk, reviewable use cases only." },
  { n: "6", title: "Audit and improve", body: "Incidents, quality, policy, Normenkader." },
];
