import { mathHourModules } from "./math-hour";

export type Strand = "foundations" | "practice" | "legal" | "capstone";

export type SlideKind = "teach" | "hands-on" | "avoid-aim" | "step" | "lens";

export type SlideItem = {
  n: string;
  title: string;
  body: string;
};

export type Slide = {
  kind: SlideKind;
  title: string;
  paras: string[];
  items: SlideItem[];
  avoid: string;
  aim: string;
  lens: string;
  notes: string;
  duration: string;
};

export type CourseModule = {
  id: string;
  slug: string;
  title: string;
  blurb: string;
  strand: Strand;
  duration: string;
  slides: Slide[];
};

export const modules: CourseModule[] = [
  {
    "id": "01",
    "slug": "orientation",
    "title": "Orientation, baseline & mindset",
    "blurb": "Opening diagnostic, professional mindset and teacher agency.",
    "strand": "foundations",
    "duration": "25 min",
    "slides": [
      {
        "kind": "teach",
        "title": "The journey: build your Teacher AI Workspace",
        "paras": [
          "A practical pathway for teachers using ChatGPT Free: what works, what is limited, and what must stay under teacher control."
        ],
        "items": [
          {
            "n": "1",
            "title": "What is ChatGPT?",
            "body": ""
          },
          {
            "n": "2",
            "title": "Set it up",
            "body": ""
          },
          {
            "n": "3",
            "title": "Personalise it",
            "body": ""
          },
          {
            "n": "4",
            "title": "Organise it",
            "body": ""
          },
          {
            "n": "5",
            "title": "Build Projects",
            "body": ""
          },
          {
            "n": "6",
            "title": "Engineer project instructions",
            "body": ""
          },
          {
            "n": "7",
            "title": "Add knowledge",
            "body": ""
          },
          {
            "n": "8",
            "title": "Prompt properly",
            "body": ""
          },
          {
            "n": "9",
            "title": "Create teaching resources",
            "body": ""
          },
          {
            "n": "10",
            "title": "Use Free-tier tools & limits",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Opening diagnostic: where are you now?",
        "paras": [
          "Choose one teaching workflow you want ChatGPT to improve by the end of today.",
          "7 min",
          "1.",
          "Rate your confidence: 1 = new to ChatGPT, 5 = advanced user.",
          "2.",
          "Write one thing you already use AI for — or one thing you want to try.",
          "3.",
          "Write one risk or concern you want answered today.",
          "No real student personal data during training activities."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Use this to gauge pace. Emphasise that the course is about professional competence, not technological bravado.",
        "duration": "7 min"
      },
      {
        "kind": "teach",
        "title": "The goal is not “use more AI.”",
        "paras": [
          "The goal is better teaching decisions, less low-value workload, safer workflows and stronger professional judgement."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Frame the entire programme around teacher agency.",
        "duration": ""
      }
    ]
  },
  {
    "id": "02",
    "slug": "ai-literacy",
    "title": "AI literacy foundations",
    "blurb": "Generative AI fundamentals, failure modes and professional AI literacy.",
    "strand": "foundations",
    "duration": "30 min",
    "slides": [
      {
        "kind": "step",
        "title": "What is ChatGPT?",
        "paras": [
          "Understand the tool well enough to use it critically — without turning the course into a computer-science lecture.",
          "Build the habit → practise it → use it safely"
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "ChatGPT Free in teacher-friendly language",
        "paras": [
          "A generative AI assistant that works with natural language and, on Free, also supports limited files/images, web search, data analysis, image creation and existing GPTs."
        ],
        "items": [
          {
            "n": "1",
            "title": "Generates",
            "body": "Creates drafts, explanations, questions, summaries, examples, plans, images and structured outputs."
          },
          {
            "n": "2",
            "title": "Reasons with context",
            "body": "Uses the conversation, uploaded files, project context and enabled tools to respond to the task you set."
          },
          {
            "n": "3",
            "title": "Can be wrong",
            "body": "Fluent wording is not proof. It can hallucinate, misunderstand, omit context, amplify bias or use weak sources — especially when sources are not supplied or checked."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Do not say “it thinks like a person.” Explain it as a powerful generative model that produces responses from learned patterns and current context.",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "AI assistant ≠ professional authority",
        "paras": [
          "The boundary matters most in education.",
          "AI can support",
          "Brainstorming • first drafts • resource variations • explanations • practice questions • formatting • research support • accessibility adaptations • administrative wording",
          "Teacher must decide",
          "What students need • whether a resource is correct • grading decisions • safeguarding action • accommodations • discipline • high-stakes communication • fairness"
        ],
        "items": [],
        "avoid": "AI can support Brainstorming • first drafts • resource variations • explanations • practice questions • formatting • research support • accessibility adaptations • administrative wording",
        "aim": "Teacher must decide What students need • whether a resource is correct • grading decisions • safeguarding action • accommodations • discipline • high-stakes communication • fairness 7",
        "lens": "",
        "notes": "Ask teachers to name one decision they would never delegate.",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Why ChatGPT can sound certain when it is wrong",
        "paras": [
          "Fluency is not truth.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "It predicts a useful response; it does not inherently “know” that every claim is true.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Missing context can produce plausible but inappropriate lessons or assessments.",
            "body": ""
          },
          {
            "n": "check",
            "title": "References and quotations may be incomplete, outdated or fabricated unless verified.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Bias can enter through data, framing, examples and the assumptions in your prompt.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 8",
        "notes": "Demonstrate one deliberately ambiguous prompt and show how the answer improves once curriculum, age, objective and constraints are added.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "AI literacy is now a professional competence",
        "paras": [
          "Teachers need more than “prompt tricks”."
        ],
        "items": [
          {
            "n": "1",
            "title": "Understand",
            "body": "What AI is, what it can do, where it fails and what systems your organisation uses."
          },
          {
            "n": "2",
            "title": "Judge risk",
            "body": "Know when privacy, fairness, safeguarding, assessment validity or legal obligations change the workflow."
          },
          {
            "n": "3",
            "title": "Act responsibly",
            "body": "Use human oversight, verification, school policy and appropriate data boundaries."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "The EU AI Act Article 4 requires organisations using AI to take measures supporting staff AI literacy; the approach should reflect role, experience, context and risk.",
        "duration": ""
      }
    ]
  },
  {
    "id": "03",
    "slug": "how-it-works",
    "title": "How ChatGPT works — and fails",
    "blurb": "Practical mental model, hallucination control and evidence.",
    "strand": "foundations",
    "duration": "25 min",
    "slides": [
      {
        "kind": "step",
        "title": "What is ChatGPT?",
        "paras": [
          "Understand the tool well enough to use it critically — without turning the course into a computer-science lecture.",
          "Build the habit → practise it → use it safely"
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "ChatGPT Free in teacher-friendly language",
        "paras": [
          "A generative AI assistant that works with natural language and, on Free, also supports limited files/images, web search, data analysis, image creation and existing GPTs."
        ],
        "items": [
          {
            "n": "1",
            "title": "Generates",
            "body": "Creates drafts, explanations, questions, summaries, examples, plans, images and structured outputs."
          },
          {
            "n": "2",
            "title": "Reasons with context",
            "body": "Uses the conversation, uploaded files, project context and enabled tools to respond to the task you set."
          },
          {
            "n": "3",
            "title": "Can be wrong",
            "body": "Fluent wording is not proof. It can hallucinate, misunderstand, omit context, amplify bias or use weak sources — especially when sources are not supplied or checked."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Do not say “it thinks like a person.” Explain it as a powerful generative model that produces responses from learned patterns and current context.",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "AI assistant ≠ professional authority",
        "paras": [
          "The boundary matters most in education.",
          "AI can support",
          "Brainstorming • first drafts • resource variations • explanations • practice questions • formatting • research support • accessibility adaptations • administrative wording",
          "Teacher must decide",
          "What students need • whether a resource is correct • grading decisions • safeguarding action • accommodations • discipline • high-stakes communication • fairness"
        ],
        "items": [],
        "avoid": "AI can support Brainstorming • first drafts • resource variations • explanations • practice questions • formatting • research support • accessibility adaptations • administrative wording",
        "aim": "Teacher must decide What students need • whether a resource is correct • grading decisions • safeguarding action • accommodations • discipline • high-stakes communication • fairness 7",
        "lens": "",
        "notes": "Ask teachers to name one decision they would never delegate.",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Why ChatGPT can sound certain when it is wrong",
        "paras": [
          "Fluency is not truth.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "It predicts a useful response; it does not inherently “know” that every claim is true.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Missing context can produce plausible but inappropriate lessons or assessments.",
            "body": ""
          },
          {
            "n": "check",
            "title": "References and quotations may be incomplete, outdated or fabricated unless verified.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Bias can enter through data, framing, examples and the assumptions in your prompt.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 8",
        "notes": "Demonstrate one deliberately ambiguous prompt and show how the answer improves once curriculum, age, objective and constraints are added.",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Hallucination control",
        "paras": [
          "Confidence must never replace evidence.",
          "Risky habit",
          "Ask AI for a curriculum fact, citation or legal claim and copy it because the answer sounds polished.",
          "Professional habit",
          "Use authoritative sources. Ask for citations. Open the source. Compare the claim. Document uncertainty. If it matters, verify independently."
        ],
        "items": [],
        "avoid": "Ask AI for a curriculum fact, citation or legal claim and copy it because the answer sounds polished.",
        "aim": "Use authoritative sources. Ask for citations. Open the source. Compare the claim. Document uncertainty. If it matters, verify independently. 82",
        "lens": "",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "04",
    "slug": "setup-privacy",
    "title": "Setup, privacy & account choices",
    "blurb": "Account type, school approval, privacy controls and safe default setup.",
    "strand": "foundations",
    "duration": "35 min",
    "slides": [
      {
        "kind": "teach",
        "title": "Know which ChatGPT environment you are using",
        "paras": [
          "The same prompt can carry different risk depending on the account and workspace."
        ],
        "items": [
          {
            "n": "1",
            "title": "Personal account",
            "body": "Useful for low-risk work. If school approval is unknown, treat it as unapproved: do not enter identifiable student/staff data or connect school systems."
          },
          {
            "n": "2",
            "title": "Managed school workspace",
            "body": "May provide admin controls, organisational privacy terms and approved apps. A managed workspace is safer only when your school has actually approved its use and data categories."
          },
          {
            "n": "3",
            "title": "Free-tier feature reality",
            "body": "Free-tier feature access can be useful for professional learning, but feature availability is separate from school approval. Paid or managed access never, by itself, authorises student-data processing."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Make the distinction explicit: product capability, privacy settings and school approval are three different things. If participants cannot confirm approval, use only public, synthetic or truly anonymised non-confidential information.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "WORKSHOP ASSUMPTION: ChatGPT may not yet be school-approved.",
        "paras": [
          "This course teaches safe professional use under that assumption. Training does not approve the tool, legalise data processing or override school policy. Until approval is explicit: use only public, synthetic or truly anonymised non-confidential data."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Say this aloud in every format. The workshop is designed to reduce risk where teachers are already experimenting, not to give permission that belongs to the school organisation.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Safe setup checklist",
        "paras": [
          "Before doing real school work, check these five things."
        ],
        "items": [
          {
            "n": "1",
            "title": "Account",
            "body": "Personal or school-managed — and is it approved?"
          },
          {
            "n": "2",
            "title": "Policy",
            "body": "Which tools AND which data/use cases has the school approved?"
          },
          {
            "n": "3",
            "title": "Data controls",
            "body": "What is retained, trained on, shared or connected?"
          },
          {
            "n": "4",
            "title": "Memory",
            "body": "Could memory retain school or personal information?"
          },
          {
            "n": "5",
            "title": "Apps",
            "body": "Which apps/systems can it read or change — and are those connections authorised?"
          },
          {
            "n": "3",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Pause and give participants 2 minutes to inspect their own environment.",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Memory: useful — but intentional",
        "paras": [
          "Memory can personalise future responses if it is available and enabled. Review what is remembered, correct it when wrong, and use Temporary Chat when you do not want memory saved from a conversation.",
          "7 min",
          "1.",
          "Open Settings → Personalization → Memory.",
          "2.",
          "Review or clear anything that should not sit in a teaching account.",
          "3.",
          "Write in your booklet: what must never be stored in Memory.",
          "No real student personal data during training activities."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Show the screenshot, then walk the room through the live settings. This is the visual for the setup block.",
        "duration": "7 min"
      },
      {
        "kind": "teach",
        "title": "Personal account, managed workspace, school approval: three different questions",
        "paras": [
          "A privacy feature can reduce risk; only the school can define approved educational use."
        ],
        "items": [
          {
            "n": "1",
            "title": "Personal Free / Plus / Pro",
            "body": "Personal-workspace data controls can stop new chats being used for model improvement. That is useful — but it does not create a school data-processing agreement or approval."
          },
          {
            "n": "2",
            "title": "Managed organisation workspace",
            "body": "Business/Enterprise/Edu/Teachers workspaces have organisational controls and are not used for model training by default. The school must still approve the product, purpose, users, data and connected systems."
          },
          {
            "n": "3",
            "title": "School approval",
            "body": "Use the school’s approved-tool register, policy and privacy/security process. “Paid”, “managed”, “encrypted” or “no training” never automatically means “approved for student data”."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "OpenAI product privacy and school governance are separate layers. Do not imply that a specific OpenAI plan is automatically GDPR-compliant for a school.",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "The 10-second pre-prompt check",
        "paras": [
          "Run this before every school-related prompt.",
          "If approval is unknown: do not “test it with real data”. Switch to public, fictional or truly anonymised information."
        ],
        "items": [
          {
            "n": "check",
            "title": "1. Is there any personal, confidential or special-category data?",
            "body": ""
          },
          {
            "n": "check",
            "title": "2. Is this tool/account AND this use case explicitly school-approved?",
            "body": ""
          },
          {
            "n": "check",
            "title": "3. Could the person still be identified from combined details?",
            "body": ""
          },
          {
            "n": "check",
            "title": "4. Could this affect a grade, right, opportunity, wellbeing or reputation?",
            "body": ""
          },
          {
            "n": "check",
            "title": "5. What source, policy and human decision must control the final outcome?",
            "body": ""
          },
          {
            "n": "6",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "If approval is unknown: do not “test it with real data”. Switch to public, fictional or truly anonymised information. 6",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "05",
    "slug": "scope-v",
    "title": "SCOPE-V prompting fundamentals",
    "blurb": "Professional briefing, refinement and verification.",
    "strand": "practice",
    "duration": "35 min",
    "slides": [
      {
        "kind": "step",
        "title": "Prompt properly",
        "paras": [
          "Prompting is professional briefing — not a secret list of magic words.",
          "Build the habit → practise it → use it safely"
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "SCOPE-V: a reusable prompting framework",
        "paras": [
          "A clear brief produces a better first draft.",
          "Context + audience",
          "Time + level + limits",
          "Exact deliverable",
          "Useful expert role",
          "Model/style",
          "Checks + sources"
        ],
        "items": [
          {
            "n": "1",
            "title": "Situation",
            "body": ""
          },
          {
            "n": "2",
            "title": "Constraints",
            "body": ""
          },
          {
            "n": "3",
            "title": "Output",
            "body": ""
          },
          {
            "n": "4",
            "title": "Persona",
            "body": ""
          },
          {
            "n": "5",
            "title": "Examples",
            "body": ""
          },
          {
            "n": "6",
            "title": "Verification",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Weak prompt → professional brief",
        "paras": [
          "The better prompt exposes assumptions before they become mistakes.",
          "“Make a lesson on fractions.”",
          "Missing: age, current knowledge, objective, lesson length, curriculum, misconceptions, resources, accessibility, assessment and output format.",
          "“Create a 50-minute Year 7 lesson…”",
          "Include learning intention, retrieval starter, explicit modelling, 3 common misconceptions, guided practice, independent practice, checks for understanding, exit ticket and teacher notes. Use only the uploaded unit plan for sequence. Flag any missing prerequisites."
        ],
        "items": [],
        "avoid": "“Make a lesson on fractions.” Missing: age, current knowledge, objective, lesson length, curriculum, misconceptions, resources, accessibility, assessment and output format.",
        "aim": "“Create a 50-minute Year 7 lesson…” Include learning intention, retrieval starter, explicit modelling, 3 common misconceptions, guided practice, independent practice, checks for understanding, exit ticket and teacher notes. Use only the uploaded unit plan for sequence. Flag any missing prerequisites. 47",
        "lens": "",
        "notes": "Live-demo both prompts and compare outputs.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Ask ChatGPT to ask you questions",
        "paras": [
          "A powerful move when the task is underspecified."
        ],
        "items": [
          {
            "n": "1",
            "title": "Before the output",
            "body": "“Ask only questions whose answers would materially change the lesson.”"
          },
          {
            "n": "2",
            "title": "During refinement",
            "body": "“What assumptions are you making that I should verify?”"
          },
          {
            "n": "3",
            "title": "Before use",
            "body": "“Run a final accuracy, curriculum, accessibility and safety check.”"
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "The professional prompting loop",
        "paras": [
          "Treat the first answer as a draft.",
          "Context + task",
          "What is weak?",
          "Assumptions + evidence",
          "Adapt + differentiate",
          "Human review",
          "Teacher owns it"
        ],
        "items": [
          {
            "n": "1",
            "title": "Brief",
            "body": ""
          },
          {
            "n": "2",
            "title": "Inspect",
            "body": ""
          },
          {
            "n": "3",
            "title": "Challenge",
            "body": ""
          },
          {
            "n": "4",
            "title": "Refine",
            "body": ""
          },
          {
            "n": "5",
            "title": "Verify",
            "body": ""
          },
          {
            "n": "6",
            "title": "Use",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Verification prompts that actually help",
        "paras": [
          "Do not ask only “Are you sure?”",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "“List every factual claim in this resource that needs external verification.”",
            "body": ""
          },
          {
            "n": "check",
            "title": "“Check each answer independently and show where an ambiguity could produce multiple valid answers.”",
            "body": ""
          },
          {
            "n": "check",
            "title": "“Compare this lesson against the uploaded objectives; flag anything taught too early or omitted.”",
            "body": ""
          },
          {
            "n": "check",
            "title": "“Identify cultural, accessibility or language assumptions that may exclude learners.”",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 50",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Prompt lab",
        "paras": [
          "Use one real task and improve it through three iterations.",
          "15 min",
          "1.",
          "Write your natural first prompt.",
          "2.",
          "Add SCOPE-V elements that materially improve the brief.",
          "3.",
          "Ask ChatGPT to identify missing context before generating.",
          "4.",
          "After the output, run a verification prompt and make one teacher-led revision.",
          "No real student personal data during training activities."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": "15 min"
      }
    ]
  },
  {
    "id": "06",
    "slug": "verification",
    "title": "Verification & hallucination control",
    "blurb": "Fact-checking, evidence and professional review.",
    "strand": "practice",
    "duration": "30 min",
    "slides": [
      {
        "kind": "lens",
        "title": "Why ChatGPT can sound certain when it is wrong",
        "paras": [
          "Fluency is not truth.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "It predicts a useful response; it does not inherently “know” that every claim is true.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Missing context can produce plausible but inappropriate lessons or assessments.",
            "body": ""
          },
          {
            "n": "check",
            "title": "References and quotations may be incomplete, outdated or fabricated unless verified.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Bias can enter through data, framing, examples and the assumptions in your prompt.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 8",
        "notes": "Demonstrate one deliberately ambiguous prompt and show how the answer improves once curriculum, age, objective and constraints are added.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "The professional prompting loop",
        "paras": [
          "Treat the first answer as a draft.",
          "Context + task",
          "What is weak?",
          "Assumptions + evidence",
          "Adapt + differentiate",
          "Human review",
          "Teacher owns it"
        ],
        "items": [
          {
            "n": "1",
            "title": "Brief",
            "body": ""
          },
          {
            "n": "2",
            "title": "Inspect",
            "body": ""
          },
          {
            "n": "3",
            "title": "Challenge",
            "body": ""
          },
          {
            "n": "4",
            "title": "Refine",
            "body": ""
          },
          {
            "n": "5",
            "title": "Verify",
            "body": ""
          },
          {
            "n": "6",
            "title": "Use",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Verification prompts that actually help",
        "paras": [
          "Do not ask only “Are you sure?”",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "“List every factual claim in this resource that needs external verification.”",
            "body": ""
          },
          {
            "n": "check",
            "title": "“Check each answer independently and show where an ambiguity could produce multiple valid answers.”",
            "body": ""
          },
          {
            "n": "check",
            "title": "“Compare this lesson against the uploaded objectives; flag anything taught too early or omitted.”",
            "body": ""
          },
          {
            "n": "check",
            "title": "“Identify cultural, accessibility or language assumptions that may exclude learners.”",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 50",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Hallucination control",
        "paras": [
          "Confidence must never replace evidence.",
          "Risky habit",
          "Ask AI for a curriculum fact, citation or legal claim and copy it because the answer sounds polished.",
          "Professional habit",
          "Use authoritative sources. Ask for citations. Open the source. Compare the claim. Document uncertainty. If it matters, verify independently."
        ],
        "items": [],
        "avoid": "Ask AI for a curriculum fact, citation or legal claim and copy it because the answer sounds polished.",
        "aim": "Use authoritative sources. Ask for citations. Open the source. Compare the claim. Document uncertainty. If it matters, verify independently. 82",
        "lens": "",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "07",
    "slug": "lesson-planning",
    "title": "AI-assisted lesson planning",
    "blurb": "Planning with source hierarchy and teacher control.",
    "strand": "practice",
    "duration": "30 min",
    "slides": [
      {
        "kind": "step",
        "title": "Create teaching resources",
        "paras": [
          "Turn ChatGPT into a production assistant — while you remain the editor, subject expert and decision-maker.",
          "Build the habit → practise it → use it safely"
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "What can teachers create?",
        "paras": [
          "The answer is broader than “lesson plans”."
        ],
        "items": [
          {
            "n": "1",
            "title": "Teaching",
            "body": "Lesson plans • slides • worksheets • worked examples • retrieval practice • explanations • station activities • visuals."
          },
          {
            "n": "2",
            "title": "Assessment",
            "body": "Question banks • rubrics • exemplars • mark schemes • feedback stems • revision plans • moderation prompts."
          },
          {
            "n": "3",
            "title": "Communication & admin",
            "body": "Parent drafts • meeting agendas • reports • policies • checklists • data summaries • professional learning resources."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Lesson planning workflow",
        "paras": [
          "Use sources + teacher judgement at every stage.",
          "Planner + textbook",
          "Prerequisites + misconceptions",
          "Learning sequence",
          "Support + extension",
          "Accuracy + workload",
          "Slides / worksheet"
        ],
        "items": [
          {
            "n": "1",
            "title": "Read sources",
            "body": ""
          },
          {
            "n": "2",
            "title": "Diagnose",
            "body": ""
          },
          {
            "n": "3",
            "title": "Design",
            "body": ""
          },
          {
            "n": "4",
            "title": "Differentiate",
            "body": ""
          },
          {
            "n": "5",
            "title": "Check",
            "body": ""
          },
          {
            "n": "6",
            "title": "Export",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Resource studio",
        "paras": [
          "Create one classroom-ready resource from your Project.",
          "20 min",
          "1.",
          "Use your Project sources and a real learning objective.",
          "2.",
          "Create the first draft.",
          "3.",
          "Create one scaffolded adaptation and one extension.",
          "4.",
          "Run accuracy + accessibility + curriculum checks.",
          "5.",
          "Save the final teacher-edited version."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": "20 min"
      }
    ]
  },
  {
    "id": "08",
    "slug": "differentiation",
    "title": "Differentiation, inclusion & support",
    "blurb": "Scaffold and extend without lowering expectations.",
    "strand": "practice",
    "duration": "30 min",
    "slides": [
      {
        "kind": "avoid-aim",
        "title": "Differentiation: transform access, not expectations",
        "paras": [
          "AI can help create routes into the same learning goal.",
          "Weak differentiation",
          "“Make an easy worksheet for weak students.”",
          "Better differentiation",
          "“Keep the same learning objective. Create a scaffolded version using worked-example fading, vocabulary support and one-step prompts; then create an extension version that increases reasoning demand without introducing unplanned new content.”"
        ],
        "items": [],
        "avoid": "Weak differentiation “Make an easy worksheet for weak students.”",
        "aim": "Better differentiation “Keep the same learning objective. Create a scaffolded version using worked-example fading, vocabulary support and one-step prompts; then create an extension version that increases reasoning demand without introducing unplanned new content.” 55",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Resource studio",
        "paras": [
          "Create one classroom-ready resource from your Project.",
          "20 min",
          "1.",
          "Use your Project sources and a real learning objective.",
          "2.",
          "Create the first draft.",
          "3.",
          "Create one scaffolded adaptation and one extension.",
          "4.",
          "Run accuracy + accessibility + curriculum checks.",
          "5.",
          "Save the final teacher-edited version."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": "20 min"
      },
      {
        "kind": "lens",
        "title": "Bias, fairness and accessibility",
        "paras": [
          "“Personalised” AI is not automatically equitable.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "Check examples for stereotypes, cultural assumptions and representation.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Do not confuse language fluency with subject understanding.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Keep accessibility needs explicit: reading load, visual clarity, language support, alt text and format.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Check whether differentiation preserves dignity and the intended learning goal.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 83",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "09",
    "slug": "resource-creation",
    "title": "Resource creation studio",
    "blurb": "Worksheets, slides, rubrics and exemplars — verified.",
    "strand": "practice",
    "duration": "35 min",
    "slides": [
      {
        "kind": "step",
        "title": "Create teaching resources",
        "paras": [
          "Turn ChatGPT into a production assistant — while you remain the editor, subject expert and decision-maker.",
          "Build the habit → practise it → use it safely"
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "What can teachers create?",
        "paras": [
          "The answer is broader than “lesson plans”."
        ],
        "items": [
          {
            "n": "1",
            "title": "Teaching",
            "body": "Lesson plans • slides • worksheets • worked examples • retrieval practice • explanations • station activities • visuals."
          },
          {
            "n": "2",
            "title": "Assessment",
            "body": "Question banks • rubrics • exemplars • mark schemes • feedback stems • revision plans • moderation prompts."
          },
          {
            "n": "3",
            "title": "Communication & admin",
            "body": "Parent drafts • meeting agendas • reports • policies • checklists • data summaries • professional learning resources."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Lesson planning workflow",
        "paras": [
          "Use sources + teacher judgement at every stage.",
          "Planner + textbook",
          "Prerequisites + misconceptions",
          "Learning sequence",
          "Support + extension",
          "Accuracy + workload",
          "Slides / worksheet"
        ],
        "items": [
          {
            "n": "1",
            "title": "Read sources",
            "body": ""
          },
          {
            "n": "2",
            "title": "Diagnose",
            "body": ""
          },
          {
            "n": "3",
            "title": "Design",
            "body": ""
          },
          {
            "n": "4",
            "title": "Differentiate",
            "body": ""
          },
          {
            "n": "5",
            "title": "Check",
            "body": ""
          },
          {
            "n": "6",
            "title": "Export",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Differentiation: transform access, not expectations",
        "paras": [
          "AI can help create routes into the same learning goal.",
          "Weak differentiation",
          "“Make an easy worksheet for weak students.”",
          "Better differentiation",
          "“Keep the same learning objective. Create a scaffolded version using worked-example fading, vocabulary support and one-step prompts; then create an extension version that increases reasoning demand without introducing unplanned new content.”"
        ],
        "items": [],
        "avoid": "Weak differentiation “Make an easy worksheet for weak students.”",
        "aim": "Better differentiation “Keep the same learning objective. Create a scaffolded version using worked-example fading, vocabulary support and one-step prompts; then create an extension version that increases reasoning demand without introducing unplanned new content.” 55",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Feedback and marking support",
        "paras": [
          "Use AI to support the process — not replace professional judgement."
        ],
        "items": [
          {
            "n": "1",
            "title": "Useful",
            "body": "Generate feedback sentence stems, identify common misconception patterns in de-identified samples, compare a draft rubric with criteria."
          },
          {
            "n": "2",
            "title": "Caution",
            "body": "AI may miss nuance, context, legitimate alternative methods or evidence of process."
          },
          {
            "n": "3",
            "title": "Do not delegate",
            "body": "Final grades, disciplinary conclusions, accommodations or decisions with significant student impact."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Creating artifacts on ChatGPT Free: useful, but limited",
        "paras": [
          "Free can draft lesson materials, tables, explanations and structured outputs. Full ChatGPT Work-style creation/editing of documents, spreadsheets, presentations or Sites is a paid or eligible-workspace feature.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "Start with clear instructions or attach a small approved reference file/excerpt.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Review and edit before sharing; generated artifacts are drafts, not automatically correct.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Expect usage limits for files, data analysis, images and tools. Exact availability varies by account and rollout.",
            "body": ""
          },
          {
            "n": "check",
            "title": "For a Free workshop, demonstrate reliable Free workflows first; mention Work only as an upgrade/workspace option.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 57",
        "notes": "Demonstrate artifact creation only if the audience has access; otherwise show the workflow conceptually.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Multimodal Free use cases",
        "paras": [
          "ChatGPT Free can work beyond plain text, but tool limits and document-reading limitations matter."
        ],
        "items": [
          {
            "n": "1",
            "title": "Images",
            "body": "Create simple visual hooks or analyse uploaded images — then check accuracy, copyright and accessibility."
          },
          {
            "n": "2",
            "title": "Audio / voice",
            "body": "Brainstorm hands-free, rehearse explanations or capture thinking where voice is available; limits and features can vary."
          },
          {
            "n": "3",
            "title": "Data",
            "body": "Analyse spreadsheets/tables and draft summaries. For PDFs/documents on non-Enterprise plans, do not assume embedded visuals are read reliably; verify manually."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Resource studio",
        "paras": [
          "Create one classroom-ready resource from your Project.",
          "20 min",
          "1.",
          "Use your Project sources and a real learning objective.",
          "2.",
          "Create the first draft.",
          "3.",
          "Create one scaffolded adaptation and one extension.",
          "4.",
          "Run accuracy + accessibility + curriculum checks.",
          "5.",
          "Save the final teacher-edited version."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": "20 min"
      }
    ]
  },
  {
    "id": "10",
    "slug": "assessment",
    "title": "Assessment design in the AI age",
    "blurb": "Validity, human oversight and detector limits.",
    "strand": "practice",
    "duration": "30 min",
    "slides": [
      {
        "kind": "teach",
        "title": "Feedback and marking support",
        "paras": [
          "Use AI to support the process — not replace professional judgement."
        ],
        "items": [
          {
            "n": "1",
            "title": "Useful",
            "body": "Generate feedback sentence stems, identify common misconception patterns in de-identified samples, compare a draft rubric with criteria."
          },
          {
            "n": "2",
            "title": "Caution",
            "body": "AI may miss nuance, context, legitimate alternative methods or evidence of process."
          },
          {
            "n": "3",
            "title": "Do not delegate",
            "body": "Final grades, disciplinary conclusions, accommodations or decisions with significant student impact."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Education uses that can enter high-risk territory",
        "paras": [
          "Annex III lists several education uses as high-risk categories, subject to the Article 6(3) carve-out. The main Chapter III requirements for Annex III systems apply from 2 Dec 2027.",
          "Do not label every worksheet or feedback draft “high-risk”. The intended purpose and effect of the system matter."
        ],
        "items": [
          {
            "n": "check",
            "title": "AI determining access, admission or assignment to education/training",
            "body": ""
          },
          {
            "n": "check",
            "title": "AI intended to evaluate learning outcomes, including where outcomes steer learning",
            "body": ""
          },
          {
            "n": "check",
            "title": "AI assessing the level of education a person will receive or be able to access",
            "body": ""
          },
          {
            "n": "check",
            "title": "AI monitoring/detecting prohibited student behaviour during tests",
            "body": ""
          },
          {
            "n": "check",
            "title": "Not every teacher use is high-risk: Article 6(3) can exclude narrow/preparatory/review uses that do not materially influence decisions. Treat classification as a provider/school governance question.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "Do not label every worksheet or feedback draft “high-risk”. The intended purpose and effect of the system matter. Source: EUR-Lex consolidated Regulation (EU) 2024/1689 (27 Jul 2026), Article 6, Annex III and Article 113. Educational guidance, not legal advice. 3",
        "notes": "Important correction: Annex III is not a blanket label for all classroom AI. Article 6(3) provides an exception where the system does not pose a significant risk and meets specified narrow/preparatory/review conditions. Escalate classification questions.",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Assessment + automated decisions: AI may support — it must not silently decide",
        "paras": [
          "The higher the impact on a learner, the stronger the need for lawful processing, transparency, validity and meaningful human review.",
          "Unsafe shortcut",
          "“AI gave this student 6/10, so I entered the grade.” Or: “the detector says 92% AI, therefore misconduct.” This outsources a consequential judgement to an uncertain system.",
          "Professional workflow",
          "Where school policy/law permits AI support: use appropriate data, inspect the evidence and reasoning, verify against criteria, be able to depart from the output, document the teacher decision and provide the required transparency. GDPR restricts solely automated significant decisions."
        ],
        "items": [
          {
            "n": "4",
            "title": "Sources: Kennisnet privacy guidance; European Commission GDPR Article 22 guidance; EU AI Act Articles 6/Annex III. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "“AI gave this student 6/10, so I entered the grade.” Or: “the detector says 92% AI, therefore misconduct.” This outsources a consequential judgement to an uncertain system.",
        "aim": "Where school policy/law permits AI support: use appropriate data, inspect the evidence and reasoning, verify against criteria, be able to depart from the output, document the teacher decision and provide the required transparency. GDPR restricts solely automated significant decisions. 4 Sources: Kennisnet privacy guidance; European Commission GDPR Article 22 guidance; EU AI Act Articles 6/Annex III. Educational guidance, not legal advice.",
        "lens": "",
        "notes": "Kennisnet specifically cautions against independent AI grading and requires teacher oversight in its example. Annex III also covers AI systems intended to evaluate learning outcomes, subject to Article 6 classification rules.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "AI detectors are not lie detectors.",
        "paras": [
          "Do not use a detector score as sole proof that a student cheated. Investigate through process evidence, conversation, drafts and school policy."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Assessment in the AI age",
        "paras": [
          "Redesign the evidence of learning — do not simply ban the tool and hope."
        ],
        "items": [
          {
            "n": "1",
            "title": "GREEN — AI allowed",
            "body": "AI is explicitly part of the task; students disclose how it was used and critically evaluate output."
          },
          {
            "n": "2",
            "title": "AMBER — limited AI",
            "body": "Defined support such as brainstorming or language polishing, with process evidence and disclosure."
          },
          {
            "n": "3",
            "title": "RED — no AI",
            "body": "The task is designed to capture unaided knowledge/skill under controlled conditions."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Design assessment evidence AI cannot easily fake",
        "paras": [
          "Capture the learning process, not only the final product.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "In-class checkpoints and oral follow-up",
            "body": ""
          },
          {
            "n": "check",
            "title": "Drafts, annotations and rationale for decisions",
            "body": ""
          },
          {
            "n": "check",
            "title": "Personalised/contextual application requiring course experiences",
            "body": ""
          },
          {
            "n": "check",
            "title": "Reflection on errors, feedback and revision",
            "body": ""
          },
          {
            "n": "check",
            "title": "Explicit AI-use declaration where relevant",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 7",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "11",
    "slug": "feedback",
    "title": "Feedback & marking support",
    "blurb": "Teacher-controlled support, not outsourced grades.",
    "strand": "practice",
    "duration": "25 min",
    "slides": [
      {
        "kind": "teach",
        "title": "Feedback and marking support",
        "paras": [
          "Use AI to support the process — not replace professional judgement."
        ],
        "items": [
          {
            "n": "1",
            "title": "Useful",
            "body": "Generate feedback sentence stems, identify common misconception patterns in de-identified samples, compare a draft rubric with criteria."
          },
          {
            "n": "2",
            "title": "Caution",
            "body": "AI may miss nuance, context, legitimate alternative methods or evidence of process."
          },
          {
            "n": "3",
            "title": "Do not delegate",
            "body": "Final grades, disciplinary conclusions, accommodations or decisions with significant student impact."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Assessment + automated decisions: AI may support — it must not silently decide",
        "paras": [
          "The higher the impact on a learner, the stronger the need for lawful processing, transparency, validity and meaningful human review.",
          "Unsafe shortcut",
          "“AI gave this student 6/10, so I entered the grade.” Or: “the detector says 92% AI, therefore misconduct.” This outsources a consequential judgement to an uncertain system.",
          "Professional workflow",
          "Where school policy/law permits AI support: use appropriate data, inspect the evidence and reasoning, verify against criteria, be able to depart from the output, document the teacher decision and provide the required transparency. GDPR restricts solely automated significant decisions."
        ],
        "items": [
          {
            "n": "3",
            "title": "Sources: Kennisnet privacy guidance; European Commission GDPR Article 22 guidance; EU AI Act Articles 6/Annex III. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "“AI gave this student 6/10, so I entered the grade.” Or: “the detector says 92% AI, therefore misconduct.” This outsources a consequential judgement to an uncertain system.",
        "aim": "Where school policy/law permits AI support: use appropriate data, inspect the evidence and reasoning, verify against criteria, be able to depart from the output, document the teacher decision and provide the required transparency. GDPR restricts solely automated significant decisions. 3 Sources: Kennisnet privacy guidance; European Commission GDPR Article 22 guidance; EU AI Act Articles 6/Annex III. Educational guidance, not legal advice.",
        "lens": "",
        "notes": "Kennisnet specifically cautions against independent AI grading and requires teacher oversight in its example. Annex III also covers AI systems intended to evaluate learning outcomes, subject to Article 6 classification rules.",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Hallucination control",
        "paras": [
          "Confidence must never replace evidence.",
          "Risky habit",
          "Ask AI for a curriculum fact, citation or legal claim and copy it because the answer sounds polished.",
          "Professional habit",
          "Use authoritative sources. Ask for citations. Open the source. Compare the claim. Document uncertainty. If it matters, verify independently."
        ],
        "items": [],
        "avoid": "Ask AI for a curriculum fact, citation or legal claim and copy it because the answer sounds polished.",
        "aim": "Use authoritative sources. Ask for citations. Open the source. Compare the claim. Document uncertainty. If it matters, verify independently. 4",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Assessment in the AI age",
        "paras": [
          "Redesign the evidence of learning — do not simply ban the tool and hope."
        ],
        "items": [
          {
            "n": "1",
            "title": "GREEN — AI allowed",
            "body": "AI is explicitly part of the task; students disclose how it was used and critically evaluate output."
          },
          {
            "n": "2",
            "title": "AMBER — limited AI",
            "body": "Defined support such as brainstorming or language polishing, with process evidence and disclosure."
          },
          {
            "n": "3",
            "title": "RED — no AI",
            "body": "The task is designed to capture unaided knowledge/skill under controlled conditions."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Design assessment evidence AI cannot easily fake",
        "paras": [
          "Capture the learning process, not only the final product.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "In-class checkpoints and oral follow-up",
            "body": ""
          },
          {
            "n": "check",
            "title": "Drafts, annotations and rationale for decisions",
            "body": ""
          },
          {
            "n": "check",
            "title": "Personalised/contextual application requiring course experiences",
            "body": ""
          },
          {
            "n": "check",
            "title": "Reflection on errors, feedback and revision",
            "body": ""
          },
          {
            "n": "check",
            "title": "Explicit AI-use declaration where relevant",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 6",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "12",
    "slug": "student-literacy",
    "title": "Teaching students AI literacy",
    "blurb": "Disclosure, guided use and responsible learning.",
    "strand": "practice",
    "duration": "30 min",
    "slides": [
      {
        "kind": "teach",
        "title": "AI detectors are not lie detectors.",
        "paras": [
          "Do not use a detector score as sole proof that a student cheated. Investigate through process evidence, conversation, drafts and school policy."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Assessment in the AI age",
        "paras": [
          "Redesign the evidence of learning — do not simply ban the tool and hope."
        ],
        "items": [
          {
            "n": "1",
            "title": "GREEN — AI allowed",
            "body": "AI is explicitly part of the task; students disclose how it was used and critically evaluate output."
          },
          {
            "n": "2",
            "title": "AMBER — limited AI",
            "body": "Defined support such as brainstorming or language polishing, with process evidence and disclosure."
          },
          {
            "n": "3",
            "title": "RED — no AI",
            "body": "The task is designed to capture unaided knowledge/skill under controlled conditions."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Design assessment evidence AI cannot easily fake",
        "paras": [
          "Capture the learning process, not only the final product.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "In-class checkpoints and oral follow-up",
            "body": ""
          },
          {
            "n": "check",
            "title": "Drafts, annotations and rationale for decisions",
            "body": ""
          },
          {
            "n": "check",
            "title": "Personalised/contextual application requiring course experiences",
            "body": ""
          },
          {
            "n": "check",
            "title": "Reflection on errors, feedback and revision",
            "body": ""
          },
          {
            "n": "check",
            "title": "Explicit AI-use declaration where relevant",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 4",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Students and personal ChatGPT accounts: do not improvise",
        "paras": [
          "A classroom activity can create a school-controlled privacy problem if students are told to create personal accounts."
        ],
        "items": [
          {
            "n": "1",
            "title": "School instruction",
            "body": "Kennisnet warns against directing students to make personal free AI accounts when the school lacks the necessary privacy arrangements/control."
          },
          {
            "n": "2",
            "title": "Age + terms",
            "body": "OpenAI’s EEA terms set a minimum age of 13 (or higher local consent age); under 18s need parent/guardian permission. For under-13 education use, OpenAI says the actual interaction must be conducted by an adult."
          },
          {
            "n": "3",
            "title": "Safer teaching path",
            "body": "Use a teacher-led demonstration or school-approved student environment/account setup. Teach students not to enter personal data and follow assessment/disclosure rules."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Always check the current terms of the tool and the school’s student-account policy. Do not turn this into a request for teachers to collect parental consent on their own unless the school has designed that process.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Student AI literacy belongs in the course too",
        "paras": [
          "Teachers need to model and teach responsible use."
        ],
        "items": [
          {
            "n": "1",
            "title": "Understand",
            "body": "Students should know what generative AI is, where it fails, what data must stay out, and why fluent output still needs evidence and judgement."
          },
          {
            "n": "2",
            "title": "Disclose",
            "body": "Teach students to state the tool, purpose, inputs, changes and verification — only where school/assessment rules allow AI use."
          },
          {
            "n": "3",
            "title": "Learn with AI",
            "body": "Use teacher-led demonstrations or school-approved student access. Do not require personal accounts when the school has not approved the privacy/account arrangement; check age/guardian rules."
          },
          {
            "n": "6",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "A simple student AI disclosure",
        "paras": [
          "Build transparency into the learning process.",
          "What did you use?",
          "What did it help with?",
          "What did you ask / provide?",
          "What did you revise?",
          "How did you check?",
          "What did you learn?"
        ],
        "items": [
          {
            "n": "1",
            "title": "Tool",
            "body": ""
          },
          {
            "n": "2",
            "title": "Purpose",
            "body": ""
          },
          {
            "n": "3",
            "title": "Input",
            "body": ""
          },
          {
            "n": "4",
            "title": "Change",
            "body": ""
          },
          {
            "n": "5",
            "title": "Verify",
            "body": ""
          },
          {
            "n": "6",
            "title": "Learn",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "13",
    "slug": "integrity",
    "title": "Academic integrity & misuse",
    "blurb": "Misuse, AI-detector limits and fair process.",
    "strand": "legal",
    "duration": "30 min",
    "slides": [
      {
        "kind": "teach",
        "title": "AI detectors are not lie detectors.",
        "paras": [
          "Do not use a detector score as sole proof that a student cheated. Investigate through process evidence, conversation, drafts and school policy."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Assessment in the AI age",
        "paras": [
          "Redesign the evidence of learning — do not simply ban the tool and hope."
        ],
        "items": [
          {
            "n": "1",
            "title": "GREEN — AI allowed",
            "body": "AI is explicitly part of the task; students disclose how it was used and critically evaluate output."
          },
          {
            "n": "2",
            "title": "AMBER — limited AI",
            "body": "Defined support such as brainstorming or language polishing, with process evidence and disclosure."
          },
          {
            "n": "3",
            "title": "RED — no AI",
            "body": "The task is designed to capture unaided knowledge/skill under controlled conditions."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Design assessment evidence AI cannot easily fake",
        "paras": [
          "Capture the learning process, not only the final product.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "In-class checkpoints and oral follow-up",
            "body": ""
          },
          {
            "n": "check",
            "title": "Drafts, annotations and rationale for decisions",
            "body": ""
          },
          {
            "n": "check",
            "title": "Personalised/contextual application requiring course experiences",
            "body": ""
          },
          {
            "n": "check",
            "title": "Reflection on errors, feedback and revision",
            "body": ""
          },
          {
            "n": "check",
            "title": "Explicit AI-use declaration where relevant",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 87",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "A simple student AI disclosure",
        "paras": [
          "Build transparency into the learning process.",
          "What did you use?",
          "What did it help with?",
          "What did you ask / provide?",
          "What did you revise?",
          "How did you check?",
          "What did you learn?"
        ],
        "items": [
          {
            "n": "1",
            "title": "Tool",
            "body": ""
          },
          {
            "n": "2",
            "title": "Purpose",
            "body": ""
          },
          {
            "n": "3",
            "title": "Input",
            "body": ""
          },
          {
            "n": "4",
            "title": "Change",
            "body": ""
          },
          {
            "n": "5",
            "title": "Verify",
            "body": ""
          },
          {
            "n": "6",
            "title": "Learn",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "14",
    "slug": "avg-gdpr",
    "title": "AVG / GDPR & school data protection",
    "blurb": "Personal data, minimisation, DPIA and escalation.",
    "strand": "legal",
    "duration": "40 min",
    "slides": [
      {
        "kind": "teach",
        "title": "WORKSHOP ASSUMPTION: ChatGPT may not yet be school-approved.",
        "paras": [
          "This course teaches safe professional use under that assumption. Training does not approve the tool, legalise data processing or override school policy. Until approval is explicit: use only public, synthetic or truly anonymised non-confidential data."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Say this aloud in every format. The workshop is designed to reduce risk where teachers are already experimenting, not to give permission that belongs to the school organisation.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Personal account, managed workspace, school approval: three different questions",
        "paras": [
          "A privacy feature can reduce risk; only the school can define approved educational use."
        ],
        "items": [
          {
            "n": "1",
            "title": "Personal Free / Plus / Pro",
            "body": "Personal-workspace data controls can stop new chats being used for model improvement. That is useful — but it does not create a school data-processing agreement or approval."
          },
          {
            "n": "2",
            "title": "Managed organisation workspace",
            "body": "Business/Enterprise/Edu/Teachers workspaces have organisational controls and are not used for model training by default. The school must still approve the product, purpose, users, data and connected systems."
          },
          {
            "n": "3",
            "title": "School approval",
            "body": "Use the school’s approved-tool register, policy and privacy/security process. “Paid”, “managed”, “encrypted” or “no training” never automatically means “approved for student data”."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "OpenAI product privacy and school governance are separate layers. Do not imply that a specific OpenAI plan is automatically GDPR-compliant for a school.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "The fastest safe rule: do not paste information you would not be comfortable sending to an unapproved external service.",
        "paras": [
          "If ChatGPT is not explicitly approved for the data/use case, treat it as an unapproved external service: do not enter identifiable student/staff information or connect school systems. Use public, fictional or truly anonymised information instead. Turning off model training can reduce one risk; it does NOT create school approval."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Core message for every course format: if approval is unknown, the safe training default is no identifiable school personal data and no school-system connections.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "GREEN / AMBER / RED data classification",
        "paras": [
          "A simple classroom decision model."
        ],
        "items": [
          {
            "n": "1",
            "title": "GREEN",
            "body": "Public curriculum information • fictional/synthetic cases • generic teaching examples • truly anonymised, non-confidential information."
          },
          {
            "n": "2",
            "title": "AMBER",
            "body": "Internal documents • unpublished assessments • class-level patterns • pseudonymised/de-identified material. Check policy, confidentiality and re-identification risk; on an unapproved personal account, default to “do not upload”."
          },
          {
            "n": "3",
            "title": "RED",
            "body": "Identifiable student/staff data • names + grades • health/SEN • safeguarding/wellbeing • disciplinary/family details • confidential parent correspondence • credentials — never in an unapproved personal AI tool."
          },
          {
            "n": "5",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Anonymous ≠ pseudonymous ≠ “I removed the surname”",
        "paras": [
          "Identifiability depends on all the information available — not just the name field.",
          "False anonymity",
          "“Laura, Year 10D, Belgian national-level hockey player…” may still point to one person. Initials, student numbers or coded IDs can also remain personal data if the person can be re-identified.",
          "Safer standard",
          "Truly anonymous data means the person is no longer identifiable and anonymisation is effectively irreversible. Pseudonymised/de-identified data that can be re-linked remains personal data under GDPR. For unapproved personal AI: use fictional or truly anonymous data."
        ],
        "items": [
          {
            "n": "6",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "False anonymity “Laura, Year 10D, Belgian national-level hockey player…” may still point to one person. Initials, student numbers or coded IDs can also remain personal data if the person can be re-identified.",
        "aim": "Safer standard Truly anonymous data means the person is no longer identifiable and anonymisation is effectively irreversible. Pseudonymised/de-identified data that can be re-linked remains personal data under GDPR. For unapproved personal AI: use fictional or truly anonymous data. 6 Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
        "lens": "",
        "notes": "Use an audience-relevant example. Do not teach “remove the surname = anonymous”.",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "The 10-second pre-prompt check",
        "paras": [
          "Run this before every school-related prompt.",
          "If approval is unknown: do not “test it with real data”. Switch to public, fictional or truly anonymised information."
        ],
        "items": [
          {
            "n": "check",
            "title": "1. Is there any personal, confidential or special-category data?",
            "body": ""
          },
          {
            "n": "check",
            "title": "2. Is this tool/account AND this use case explicitly school-approved?",
            "body": ""
          },
          {
            "n": "check",
            "title": "3. Could the person still be identified from combined details?",
            "body": ""
          },
          {
            "n": "check",
            "title": "4. Could this affect a grade, right, opportunity, wellbeing or reputation?",
            "body": ""
          },
          {
            "n": "check",
            "title": "5. What source, policy and human decision must control the final outcome?",
            "body": ""
          },
          {
            "n": "7",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "If approval is unknown: do not “test it with real data”. Switch to public, fictional or truly anonymised information. 7",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "AVG/GDPR: practical teacher principles",
        "paras": [
          "AVG/GDPR still applies when AI is involved. Translate it into daily behaviour; refer uncertain/high-risk cases to the school’s DPO/privacy/leadership process."
        ],
        "items": [
          {
            "n": "1",
            "title": "Lawful + purposeful",
            "body": "Know the specific purpose and legal basis before personal data is processed. “AI is useful” is not a lawful purpose by itself."
          },
          {
            "n": "2",
            "title": "Minimise + anonymise",
            "body": "Use the least data needed. Prefer fictional or truly anonymous information; pseudonymised data that can be re-linked remains personal data."
          },
          {
            "n": "3",
            "title": "Protect + account",
            "body": "Use approved systems, appropriate supplier arrangements, access/security, retention and transparency. Health/SEN and similar data need especially careful handling."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Legal nuance: Kennisnet recommends a DPIA when an AI application processes personal data. Under GDPR, the statutory DPIA trigger is processing likely to result in high risk. Use the school’s DPO/privacy process to decide and document the assessment.",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "If identifiable personal data is genuinely necessary: STOP and use the school process",
        "paras": [
          "This is no longer an individual prompting choice. It becomes a documented school data-governance decision.",
          "Teacher action: If you cannot answer these questions from school policy, do not put the identifiable data into the tool."
        ],
        "items": [
          {
            "n": "check",
            "title": "1. Define the educational purpose and lawful basis — and whether personal data is actually necessary.",
            "body": ""
          },
          {
            "n": "check",
            "title": "2. Confirm the approved tool/account and appropriate supplier/data-processing arrangements.",
            "body": ""
          },
          {
            "n": "check",
            "title": "3. Run the required privacy/risk assessment. Kennisnet recommends a DPIA when an AI application processes personal data; involve the DPO.",
            "body": ""
          },
          {
            "n": "check",
            "title": "4. Set security/access, retention/deletion, transparency and data-minimisation controls.",
            "body": ""
          },
          {
            "n": "check",
            "title": "5. Check AI Act classification/oversight and obtain the school approvals required before deployment.",
            "body": ""
          },
          {
            "n": "9",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "Teacher action: If you cannot answer these questions from school policy, do not put the identifiable data into the tool. 9",
        "notes": "Do not tell individual teachers to negotiate processor agreements or classify high-risk AI themselves. The practical teacher action is to stop and escalate.",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "If sensitive data is accidentally shared with an AI tool",
        "paras": [
          "Treat it as an information-security/privacy incident — not just a prompt you regret.",
          "Teacher action: know your school’s incident contact BEFORE using AI for school work."
        ],
        "items": [
          {
            "n": "check",
            "title": "1. Stop further sharing and do not repeat the data in another tool while trying to “fix” it.",
            "body": ""
          },
          {
            "n": "check",
            "title": "2. Record the minimum facts: what data, which tool/account, when, who had access and what actions were taken.",
            "body": ""
          },
          {
            "n": "check",
            "title": "3. Follow the school’s data-breach / information-security process immediately; notify the designated privacy/DPO/security contact as policy requires.",
            "body": ""
          },
          {
            "n": "check",
            "title": "4. If safeguarding information is involved, follow safeguarding reporting procedures as well — do not substitute the AI incident process for them.",
            "body": ""
          },
          {
            "n": "check",
            "title": "5. Follow approved containment/deletion/vendor steps and document the outcome. Do not assume deleting the chat alone resolves the incident.",
            "body": ""
          },
          {
            "n": "10",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "Teacher action: know your school’s incident contact BEFORE using AI for school work. 10",
        "notes": "Exact breach-notification decisions belong to the school/DPO, not this workshop. Staff should know who to contact and act promptly.",
        "duration": ""
      }
    ]
  },
  {
    "id": "15",
    "slug": "ai-act",
    "title": "EU AI Act — risk-based school use",
    "blurb": "Literacy duties, high-risk nuance and prohibited practices.",
    "strand": "legal",
    "duration": "40 min",
    "slides": [
      {
        "kind": "teach",
        "title": "AI literacy is now a professional competence",
        "paras": [
          "Teachers need more than “prompt tricks”."
        ],
        "items": [
          {
            "n": "1",
            "title": "Understand",
            "body": "What AI is, what it can do, where it fails and what systems your organisation uses."
          },
          {
            "n": "2",
            "title": "Judge risk",
            "body": "Know when privacy, fairness, safeguarding, assessment validity or legal obligations change the workflow."
          },
          {
            "n": "3",
            "title": "Act responsibly",
            "body": "Use human oversight, verification, school policy and appropriate data boundaries."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "The EU AI Act Article 4 requires organisations using AI to take measures supporting staff AI literacy; the approach should reflect role, experience, context and risk.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "EU AI Act: why this course matters",
        "paras": [
          "Article 4 AI-literacy duties apply to providers/deployers. This workshop can support that duty, but attendance alone does not prove compliance or approve a tool."
        ],
        "items": [
          {
            "n": "1",
            "title": "Applied since 2 Feb 2025",
            "body": "Organisations using AI must take measures to support staff AI literacy, considering knowledge, experience, training, context and affected people."
          },
          {
            "n": "2",
            "title": "Risk-aware competence",
            "body": "Teachers should understand capabilities, hallucinations, privacy, bias, assessment risk, safeguards and the school’s own approved systems/rules."
          },
          {
            "n": "3",
            "title": "Governance — not solo compliance",
            "body": "High-risk or prohibited uses, procurement, DPIA/FRIA questions and consequential decisions belong in school-level legal/privacy/governance processes."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "The amended Article 4 no longer sets a fixed individual literacy level, but the duty to take measures supporting staff AI literacy remains. Do not market this workshop as automatic AI Act compliance.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "AI Act + Dutch school readiness timeline — as of 10 Sep 2026",
        "paras": [
          "Keep the legal timelines separate: EU AI Act duties and the Dutch Normenkader IBP are related governance work, but they are not the same law."
        ],
        "items": [
          {
            "n": "1",
            "title": "2 Feb 2025",
            "body": "Article 4 AI literacy + key prohibited-practice rules apply"
          },
          {
            "n": "2",
            "title": "Aug 2026",
            "body": "AI Act generally applies; national supervision/enforcement framework is active"
          },
          {
            "n": "3",
            "title": "1 Jan 2027",
            "body": "NL schools: Normenkader IBP self-evaluation + improvement plan expected"
          },
          {
            "n": "4",
            "title": "2 Dec 2027",
            "body": "Main Chapter III requirements for Annex III high-risk AI systems apply"
          },
          {
            "n": "5",
            "title": "Dec 2027",
            "body": "FRIA required for some deployers, incl. certain public-body high-risk uses"
          },
          {
            "n": "6",
            "title": "By 2030",
            "body": "Dutch planning: schools required to meet all Normenkader IBP requirements"
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Do not present the Normenkader timetable as an AI Act deadline. The Rijksoverheid page describes it as the Dutch information-security/privacy framework for schools.",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Education uses that can enter high-risk territory",
        "paras": [
          "Annex III lists several education uses as high-risk categories, subject to the Article 6(3) carve-out. The main Chapter III requirements for Annex III systems apply from 2 Dec 2027.",
          "Do not label every worksheet or feedback draft “high-risk”. The intended purpose and effect of the system matter."
        ],
        "items": [
          {
            "n": "check",
            "title": "AI determining access, admission or assignment to education/training",
            "body": ""
          },
          {
            "n": "check",
            "title": "AI intended to evaluate learning outcomes, including where outcomes steer learning",
            "body": ""
          },
          {
            "n": "check",
            "title": "AI assessing the level of education a person will receive or be able to access",
            "body": ""
          },
          {
            "n": "check",
            "title": "AI monitoring/detecting prohibited student behaviour during tests",
            "body": ""
          },
          {
            "n": "check",
            "title": "Not every teacher use is high-risk: Article 6(3) can exclude narrow/preparatory/review uses that do not materially influence decisions. Treat classification as a provider/school governance question.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "Do not label every worksheet or feedback draft “high-risk”. The intended purpose and effect of the system matter. Source: EUR-Lex consolidated Regulation (EU) 2024/1689 (27 Jul 2026), Article 6, Annex III and Article 113. Educational guidance, not legal advice. 5",
        "notes": "Important correction: Annex III is not a blanket label for all classroom AI. Article 6(3) provides an exception where the system does not pose a significant risk and meets specified narrow/preparatory/review conditions. Escalate classification questions.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Emotion recognition in education: a prohibited practice",
        "paras": [
          "Some AI uses are not merely “high risk” — they are prohibited."
        ],
        "items": [
          {
            "n": "1",
            "title": "What this means",
            "body": "The AI Act defines emotion recognition as identifying or inferring emotions/intentions from biometric data."
          },
          {
            "n": "2",
            "title": "Education rule",
            "body": "Using AI to infer a person’s emotions in educational institutions is prohibited, except limited uses intended for medical or safety reasons."
          },
          {
            "n": "3",
            "title": "Teacher action",
            "body": "Do not pilot “attention”, “engagement” or emotion-detection from faces/voice/biometrics with students. Escalate any proposed system to leadership/privacy/legal procurement review."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "This prohibition is about biometric emotion inference. It is not a ban on a teacher noticing that a student appears upset through normal human interaction.",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Assessment + automated decisions: AI may support — it must not silently decide",
        "paras": [
          "The higher the impact on a learner, the stronger the need for lawful processing, transparency, validity and meaningful human review.",
          "Unsafe shortcut",
          "“AI gave this student 6/10, so I entered the grade.” Or: “the detector says 92% AI, therefore misconduct.” This outsources a consequential judgement to an uncertain system.",
          "Professional workflow",
          "Where school policy/law permits AI support: use appropriate data, inspect the evidence and reasoning, verify against criteria, be able to depart from the output, document the teacher decision and provide the required transparency. GDPR restricts solely automated significant decisions."
        ],
        "items": [
          {
            "n": "7",
            "title": "Sources: Kennisnet privacy guidance; European Commission GDPR Article 22 guidance; EU AI Act Articles 6/Annex III. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "“AI gave this student 6/10, so I entered the grade.” Or: “the detector says 92% AI, therefore misconduct.” This outsources a consequential judgement to an uncertain system.",
        "aim": "Where school policy/law permits AI support: use appropriate data, inspect the evidence and reasoning, verify against criteria, be able to depart from the output, document the teacher decision and provide the required transparency. GDPR restricts solely automated significant decisions. 7 Sources: Kennisnet privacy guidance; European Commission GDPR Article 22 guidance; EU AI Act Articles 6/Annex III. Educational guidance, not legal advice.",
        "lens": "",
        "notes": "Kennisnet specifically cautions against independent AI grading and requires teacher oversight in its example. Annex III also covers AI systems intended to evaluate learning outcomes, subject to Article 6 classification rules.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "School governance: shared rules beat private improvisation",
        "paras": [
          "If staff are already using AI before formal approval, the answer is not silence: set interim red lines, approved-use boundaries and an escalation path."
        ],
        "items": [
          {
            "n": "1",
            "title": "Approved tools + supplier arrangements",
            "body": "Which tool/account is approved for which data and purpose? Are processor/data terms, security, access, retention and connections acceptable?"
          },
          {
            "n": "2",
            "title": "Risk + rights assessments",
            "body": "Who decides when a DPIA is needed, whether an AI use is high-risk, and whether a FRIA or other assessment applies? Involve DPO/privacy/legal/leadership."
          },
          {
            "n": "3",
            "title": "Operational rules + incidents",
            "body": "Define assessment/human-oversight rules, student-account/age rules, safeguarding boundaries and what staff do after accidental data sharing."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "90-day school implementation roadmap",
        "paras": [
          "Move from experimentation to governed practice.",
          "What staff/students already use",
          "No identifiable data in unapproved tools",
          "Tools, supplier terms, DPIA/AI Act",
          "AI literacy + safe workflows",
          "Low-risk, reviewable use cases",
          "Incidents, quality, policy, Normenkader"
        ],
        "items": [
          {
            "n": "1",
            "title": "Map reality",
            "body": ""
          },
          {
            "n": "2",
            "title": "Set interim red lines",
            "body": ""
          },
          {
            "n": "3",
            "title": "Approve + assess",
            "body": ""
          },
          {
            "n": "4",
            "title": "Train",
            "body": ""
          },
          {
            "n": "5",
            "title": "Pilot safely",
            "body": ""
          },
          {
            "n": "6",
            "title": "Audit + improve",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Use Kennisnet guidance and your school’s own legal/privacy process to adapt this roadmap.",
        "duration": ""
      }
    ]
  },
  {
    "id": "16",
    "slug": "bias-fairness",
    "title": "Bias, fairness, accessibility",
    "blurb": "Inclusion, cultural assumptions and fairness checks.",
    "strand": "legal",
    "duration": "25 min",
    "slides": [
      {
        "kind": "avoid-aim",
        "title": "Differentiation: transform access, not expectations",
        "paras": [
          "AI can help create routes into the same learning goal.",
          "Weak differentiation",
          "“Make an easy worksheet for weak students.”",
          "Better differentiation",
          "“Keep the same learning objective. Create a scaffolded version using worked-example fading, vocabulary support and one-step prompts; then create an extension version that increases reasoning demand without introducing unplanned new content.”"
        ],
        "items": [],
        "avoid": "Weak differentiation “Make an easy worksheet for weak students.”",
        "aim": "Better differentiation “Keep the same learning objective. Create a scaffolded version using worked-example fading, vocabulary support and one-step prompts; then create an extension version that increases reasoning demand without introducing unplanned new content.” 55",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Bias, fairness and accessibility",
        "paras": [
          "“Personalised” AI is not automatically equitable.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "Check examples for stereotypes, cultural assumptions and representation.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Do not confuse language fluency with subject understanding.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Keep accessibility needs explicit: reading load, visual clarity, language support, alt text and format.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Check whether differentiation preserves dignity and the intended learning goal.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 83",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Design assessment evidence AI cannot easily fake",
        "paras": [
          "Capture the learning process, not only the final product.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "In-class checkpoints and oral follow-up",
            "body": ""
          },
          {
            "n": "check",
            "title": "Drafts, annotations and rationale for decisions",
            "body": ""
          },
          {
            "n": "check",
            "title": "Personalised/contextual application requiring course experiences",
            "body": ""
          },
          {
            "n": "check",
            "title": "Reflection on errors, feedback and revision",
            "body": ""
          },
          {
            "n": "check",
            "title": "Explicit AI-use declaration where relevant",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 87",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "17",
    "slug": "safeguarding",
    "title": "Safeguarding, pastoral & wellbeing",
    "blurb": "Hard boundaries: never use generic AI as a safeguarding record.",
    "strand": "legal",
    "duration": "30 min",
    "slides": [
      {
        "kind": "teach",
        "title": "WORKSHOP ASSUMPTION: ChatGPT may not yet be school-approved.",
        "paras": [
          "This course teaches safe professional use under that assumption. Training does not approve the tool, legalise data processing or override school policy. Until approval is explicit: use only public, synthetic or truly anonymised non-confidential data."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Say this aloud in every format. The workshop is designed to reduce risk where teachers are already experimenting, not to give permission that belongs to the school organisation.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "GREEN / AMBER / RED data classification",
        "paras": [
          "A simple classroom decision model."
        ],
        "items": [
          {
            "n": "1",
            "title": "GREEN",
            "body": "Public curriculum information • fictional/synthetic cases • generic teaching examples • truly anonymised, non-confidential information."
          },
          {
            "n": "2",
            "title": "AMBER",
            "body": "Internal documents • unpublished assessments • class-level patterns • pseudonymised/de-identified material. Check policy, confidentiality and re-identification risk; on an unapproved personal account, default to “do not upload”."
          },
          {
            "n": "3",
            "title": "RED",
            "body": "Identifiable student/staff data • names + grades • health/SEN • safeguarding/wellbeing • disciplinary/family details • confidential parent correspondence • credentials — never in an unapproved personal AI tool."
          },
          {
            "n": "3",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "The 10-second pre-prompt check",
        "paras": [
          "Run this before every school-related prompt.",
          "If approval is unknown: do not “test it with real data”. Switch to public, fictional or truly anonymised information."
        ],
        "items": [
          {
            "n": "check",
            "title": "1. Is there any personal, confidential or special-category data?",
            "body": ""
          },
          {
            "n": "check",
            "title": "2. Is this tool/account AND this use case explicitly school-approved?",
            "body": ""
          },
          {
            "n": "check",
            "title": "3. Could the person still be identified from combined details?",
            "body": ""
          },
          {
            "n": "check",
            "title": "4. Could this affect a grade, right, opportunity, wellbeing or reputation?",
            "body": ""
          },
          {
            "n": "check",
            "title": "5. What source, policy and human decision must control the final outcome?",
            "body": ""
          },
          {
            "n": "4",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "If approval is unknown: do not “test it with real data”. Switch to public, fictional or truly anonymised information. 4",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Safeguarding and wellbeing: hard boundary",
        "paras": [
          "ChatGPT is not your safeguarding record, counsellor or decision-maker."
        ],
        "items": [
          {
            "n": "1",
            "title": "Do not upload",
            "body": "Identifiable disclosures, case notes, allegations, health/mental-health information or safeguarding records must not go into an unapproved general AI tool."
          },
          {
            "n": "2",
            "title": "Follow policy",
            "body": "Use the school’s designated safeguarding systems, leads and reporting procedures. AI must not become an unofficial record or triage route."
          },
          {
            "n": "3",
            "title": "AI can still help",
            "body": "Use fictional/synthetic scenarios for staff training, generic policy explanation and non-case-specific resource drafting."
          },
          {
            "n": "5",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "If sensitive data is accidentally shared with an AI tool",
        "paras": [
          "Treat it as an information-security/privacy incident — not just a prompt you regret.",
          "Teacher action: know your school’s incident contact BEFORE using AI for school work."
        ],
        "items": [
          {
            "n": "check",
            "title": "1. Stop further sharing and do not repeat the data in another tool while trying to “fix” it.",
            "body": ""
          },
          {
            "n": "check",
            "title": "2. Record the minimum facts: what data, which tool/account, when, who had access and what actions were taken.",
            "body": ""
          },
          {
            "n": "check",
            "title": "3. Follow the school’s data-breach / information-security process immediately; notify the designated privacy/DPO/security contact as policy requires.",
            "body": ""
          },
          {
            "n": "check",
            "title": "4. If safeguarding information is involved, follow safeguarding reporting procedures as well — do not substitute the AI incident process for them.",
            "body": ""
          },
          {
            "n": "check",
            "title": "5. Follow approved containment/deletion/vendor steps and document the outcome. Do not assume deleting the chat alone resolves the incident.",
            "body": ""
          },
          {
            "n": "6",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "Teacher action: know your school’s incident contact BEFORE using AI for school work. 6",
        "notes": "Exact breach-notification decisions belong to the school/DPO, not this workshop. Staff should know who to contact and act promptly.",
        "duration": ""
      }
    ]
  },
  {
    "id": "18",
    "slug": "communication",
    "title": "Parents, colleagues & leaders",
    "blurb": "Professional communication without leaking identifiers.",
    "strand": "practice",
    "duration": "25 min",
    "slides": [
      {
        "kind": "teach",
        "title": "GREEN / AMBER / RED data classification",
        "paras": [
          "A simple classroom decision model."
        ],
        "items": [
          {
            "n": "1",
            "title": "GREEN",
            "body": "Public curriculum information • fictional/synthetic cases • generic teaching examples • truly anonymised, non-confidential information."
          },
          {
            "n": "2",
            "title": "AMBER",
            "body": "Internal documents • unpublished assessments • class-level patterns • pseudonymised/de-identified material. Check policy, confidentiality and re-identification risk; on an unapproved personal account, default to “do not upload”."
          },
          {
            "n": "3",
            "title": "RED",
            "body": "Identifiable student/staff data • names + grades • health/SEN • safeguarding/wellbeing • disciplinary/family details • confidential parent correspondence • credentials — never in an unapproved personal AI tool."
          },
          {
            "n": "2",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Anonymous ≠ pseudonymous ≠ “I removed the surname”",
        "paras": [
          "Identifiability depends on all the information available — not just the name field.",
          "False anonymity",
          "“Laura, Year 10D, Belgian national-level hockey player…” may still point to one person. Initials, student numbers or coded IDs can also remain personal data if the person can be re-identified.",
          "Safer standard",
          "Truly anonymous data means the person is no longer identifiable and anonymisation is effectively irreversible. Pseudonymised/de-identified data that can be re-linked remains personal data under GDPR. For unapproved personal AI: use fictional or truly anonymous data."
        ],
        "items": [
          {
            "n": "3",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "False anonymity “Laura, Year 10D, Belgian national-level hockey player…” may still point to one person. Initials, student numbers or coded IDs can also remain personal data if the person can be re-identified.",
        "aim": "Safer standard Truly anonymous data means the person is no longer identifiable and anonymisation is effectively irreversible. Pseudonymised/de-identified data that can be re-linked remains personal data under GDPR. For unapproved personal AI: use fictional or truly anonymous data. 3 Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
        "lens": "",
        "notes": "Use an audience-relevant example. Do not teach “remove the surname = anonymous”.",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "The 10-second pre-prompt check",
        "paras": [
          "Run this before every school-related prompt.",
          "If approval is unknown: do not “test it with real data”. Switch to public, fictional or truly anonymised information."
        ],
        "items": [
          {
            "n": "check",
            "title": "1. Is there any personal, confidential or special-category data?",
            "body": ""
          },
          {
            "n": "check",
            "title": "2. Is this tool/account AND this use case explicitly school-approved?",
            "body": ""
          },
          {
            "n": "check",
            "title": "3. Could the person still be identified from combined details?",
            "body": ""
          },
          {
            "n": "check",
            "title": "4. Could this affect a grade, right, opportunity, wellbeing or reputation?",
            "body": ""
          },
          {
            "n": "check",
            "title": "5. What source, policy and human decision must control the final outcome?",
            "body": ""
          },
          {
            "n": "4",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "If approval is unknown: do not “test it with real data”. Switch to public, fictional or truly anonymised information. 4",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "If sensitive data is accidentally shared with an AI tool",
        "paras": [
          "Treat it as an information-security/privacy incident — not just a prompt you regret.",
          "Teacher action: know your school’s incident contact BEFORE using AI for school work."
        ],
        "items": [
          {
            "n": "check",
            "title": "1. Stop further sharing and do not repeat the data in another tool while trying to “fix” it.",
            "body": ""
          },
          {
            "n": "check",
            "title": "2. Record the minimum facts: what data, which tool/account, when, who had access and what actions were taken.",
            "body": ""
          },
          {
            "n": "check",
            "title": "3. Follow the school’s data-breach / information-security process immediately; notify the designated privacy/DPO/security contact as policy requires.",
            "body": ""
          },
          {
            "n": "check",
            "title": "4. If safeguarding information is involved, follow safeguarding reporting procedures as well — do not substitute the AI incident process for them.",
            "body": ""
          },
          {
            "n": "check",
            "title": "5. Follow approved containment/deletion/vendor steps and document the outcome. Do not assume deleting the chat alone resolves the incident.",
            "body": ""
          },
          {
            "n": "5",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "Teacher action: know your school’s incident contact BEFORE using AI for school work. 5",
        "notes": "Exact breach-notification decisions belong to the school/DPO, not this workshop. Staff should know who to contact and act promptly.",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Parent and colleague communication",
        "paras": [
          "AI can polish wording — but you own the message.",
          "Unsafe",
          "Paste a parent complaint or colleague case containing names, family/health/behaviour details into a personal/unapproved AI account and ask it to write the reply.",
          "Safer",
          "Extract only the non-identifying facts needed, use fictional placeholders, draft neutral wording, verify every claim, then restore necessary details only in the school-approved communication system. Pseudonyms may still be personal data."
        ],
        "items": [
          {
            "n": "6",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "Unsafe Paste a parent complaint or colleague case containing names, family/health/behaviour details into a personal/unapproved AI account and ask it to write the reply.",
        "aim": "Safer Extract only the non-identifying facts needed, use fictional placeholders, draft neutral wording, verify every claim, then restore necessary details only in the school-approved communication system. Pseudonyms may still be personal data. 6 Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
        "lens": "",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "19",
    "slug": "research-policy",
    "title": "Research, curriculum & policy",
    "blurb": "Source control, official domains and dated claims.",
    "strand": "practice",
    "duration": "25 min",
    "slides": [
      {
        "kind": "teach",
        "title": "Source hierarchy beats “use everything”",
        "paras": [
          "Tell ChatGPT what each source is for.",
          "Sequence + objectives",
          "Notation + examples",
          "Local rules",
          "Criteria + standards",
          "Final decision"
        ],
        "items": [
          {
            "n": "1",
            "title": "Planner",
            "body": ""
          },
          {
            "n": "2",
            "title": "Textbook",
            "body": ""
          },
          {
            "n": "3",
            "title": "School policy",
            "body": ""
          },
          {
            "n": "4",
            "title": "Rubric",
            "body": ""
          },
          {
            "n": "5",
            "title": "Teacher judgement",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Explicitly say what to do when sources conflict: flag the conflict instead of silently choosing.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Good knowledge sources for a teaching Project",
        "paras": [
          "Use only materials you are authorised to use."
        ],
        "items": [
          {
            "n": "1",
            "title": "Curriculum",
            "body": "Official guides, approved planners, schemes of work, standards and unit documents."
          },
          {
            "n": "2",
            "title": "Teaching materials",
            "body": "Your own resources, approved textbook extracts, exemplar structures and department templates."
          },
          {
            "n": "3",
            "title": "Assessment",
            "body": "Rubrics, mark schemes, command terms and assessment policy — without uploading identifiable student work unnecessarily."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Knowledge ≠ instructions",
        "paras": [
          "Do not blur these two roles.",
          "RULES",
          "Instructions = behaviour",
          "“Use the planner to control sequence. Ask before advancing. Use British English. Include retrieval practice.”",
          "SOURCES",
          "Knowledge = source material",
          "Planner.pdf • rubric.docx • vocabulary list • unit overview • approved exemplar."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "This distinction also applies to GPT knowledge when available.",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Source audit",
        "paras": [
          "Choose 3 files you would genuinely add to your Project.",
          "8 min",
          "1.",
          "For each file, write: “This source controls…”",
          "2.",
          "Identify whether it contains personal/confidential information.",
          "3.",
          "Decide whether a lighter, de-identified or excerpted version would be enough.",
          "4.",
          "Add only what you are permitted to use.",
          "No real student personal data during training activities."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": "8 min"
      },
      {
        "kind": "step",
        "title": "Use Free-tier tools & limits",
        "paras": [
          "Make the useful tools practical without pretending every paid or managed feature is available.",
          "Build the habit → practise it → use it safely"
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Plugins, apps and skills — current terminology",
        "paras": [
          "The directory changed in July 2026, but availability still depends on plan, region, workspace and permissions."
        ],
        "items": [
          {
            "n": "1",
            "title": "Plugin",
            "body": "A packaged workflow capability. It may include skills, apps and app templates; not every plugin is available or appropriate for Free/school use."
          },
          {
            "n": "2",
            "title": "App",
            "body": "The connection to external tools, information or actions — e.g. document stores or calendars. Free users should assume permissions and actions are limited unless shown in their account."
          },
          {
            "n": "3",
            "title": "Skill",
            "body": "Reusable workflow instructions, examples and sometimes code that help ChatGPT perform a task consistently."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Do not teach “plugins = old browser extensions”. In current ChatGPT, the Plugin Directory is the discovery layer for workflow capabilities.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Before connecting any plugin or app",
        "paras": [
          "Keep the teacher in control.",
          "DO",
          "DO",
          "• Check what system it connects to.",
          "• Review what it can read, sync or change.",
          "• Use a school-approved account and workspace where required.",
          "• Keep first rollout read-only when possible.",
          "• Confirm terms, privacy policy and admin approval.",
          "DON'T",
          "DON'T",
          "• Do not connect your school Drive simply because a button is available.",
          "• Do not assume “OpenAI Verified” means your school has approved it."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Useful teacher tool categories",
        "paras": [
          "Use the category, not the brand, as your selection logic — and first check whether it is available on Free."
        ],
        "items": [
          {
            "n": "1",
            "title": "Knowledge",
            "body": "Approved Drive/SharePoint/document systems for curriculum and policy retrieval — only if school-approved and permission-safe."
          },
          {
            "n": "2",
            "title": "Productivity",
            "body": "Calendars, task systems or collaboration tools for non-sensitive planning when available and approved."
          },
          {
            "n": "3",
            "title": "Creation",
            "body": "Design, document generation and data workflows that speed up low-risk production; many advanced actions are paid/managed."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Availability varies by plan, region and administrator settings. Teach participants to evaluate permissions, not chase a fixed list of “best plugins”.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Search, data analysis and Study Mode",
        "paras": [
          "Use the right Free-tier mode for the right cognitive job."
        ],
        "items": [
          {
            "n": "1",
            "title": "Web search",
            "body": "Fast, current lookup with sources. Good when you need recent facts quickly."
          },
          {
            "n": "2",
            "title": "Data analysis",
            "body": "Useful for tables, spreadsheets, calculations and charts within Free limits. Check inputs, formulas and interpretation; file/upload limits still apply."
          },
          {
            "n": "3",
            "title": "Study Mode",
            "body": "Available across plans and designed for guided learning rather than simply giving an answer. It is not available in Projects, GPTs or Temporary Chats."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Free-tier research: control the source set",
        "paras": [
          "For policy, curriculum or literature work, source control matters more than the tool label. Free workshops should use search as the reliable baseline.",
          "DO THIS LIVE"
        ],
        "items": [
          {
            "n": "1",
            "title": "Use web search when the task needs up-to-date sources.",
            "body": ""
          },
          {
            "n": "2",
            "title": "Name specific official sites when you want authoritative boundaries.",
            "body": ""
          },
          {
            "n": "3",
            "title": "Open the source, compare the claim and record uncertainty.",
            "body": ""
          },
          {
            "n": "4",
            "title": "Treat Deep Research in Chat as plan, region and usage-limit dependent; check the in-product counter and do not make the workshop depend on it.",
            "body": "Sources checked 10 Sep 2026: OpenAI Help Center — Free Tier FAQ, Projects, GPTs, File Uploads/Library, Scheduled Tasks, Apps/Plugins, Study Mode, Work. Interface, limits and rollout may vary."
          },
          {
            "n": "1",
            "title": "2",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Example: compare current national guidance, school policy and an official curriculum document — but never use research mode as a substitute for reading a policy that directly governs your action.",
        "duration": ""
      }
    ]
  },
  {
    "id": "20",
    "slug": "multimodal",
    "title": "Multimodal AI — images, audio, data",
    "blurb": "Free-tier multimodal use with accessibility in mind.",
    "strand": "practice",
    "duration": "25 min",
    "slides": [
      {
        "kind": "lens",
        "title": "Creating artifacts on ChatGPT Free: useful, but limited",
        "paras": [
          "Free can draft lesson materials, tables, explanations and structured outputs. Full ChatGPT Work-style creation/editing of documents, spreadsheets, presentations or Sites is a paid or eligible-workspace feature.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "Start with clear instructions or attach a small approved reference file/excerpt.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Review and edit before sharing; generated artifacts are drafts, not automatically correct.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Expect usage limits for files, data analysis, images and tools. Exact availability varies by account and rollout.",
            "body": ""
          },
          {
            "n": "check",
            "title": "For a Free workshop, demonstrate reliable Free workflows first; mention Work only as an upgrade/workspace option.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 57",
        "notes": "Demonstrate artifact creation only if the audience has access; otherwise show the workflow conceptually.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Multimodal Free use cases",
        "paras": [
          "ChatGPT Free can work beyond plain text, but tool limits and document-reading limitations matter."
        ],
        "items": [
          {
            "n": "1",
            "title": "Images",
            "body": "Create simple visual hooks or analyse uploaded images — then check accuracy, copyright and accessibility."
          },
          {
            "n": "2",
            "title": "Audio / voice",
            "body": "Brainstorm hands-free, rehearse explanations or capture thinking where voice is available; limits and features can vary."
          },
          {
            "n": "3",
            "title": "Data",
            "body": "Analyse spreadsheets/tables and draft summaries. For PDFs/documents on non-Enterprise plans, do not assume embedded visuals are read reliably; verify manually."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Bias, fairness and accessibility",
        "paras": [
          "“Personalised” AI is not automatically equitable.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "Check examples for stereotypes, cultural assumptions and representation.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Do not confuse language fluency with subject understanding.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Keep accessibility needs explicit: reading load, visual clarity, language support, alt text and format.",
            "body": ""
          },
          {
            "n": "check",
            "title": "Check whether differentiation preserves dignity and the intended learning goal.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 83",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Copyright and intellectual property",
        "paras": [
          "Use AI to transform your own/approved material — not to ignore rights."
        ],
        "items": [
          {
            "n": "1",
            "title": "Check permission",
            "body": "Know whether you may upload or reproduce textbook, subscription, exam-board or colleague-created content."
          },
          {
            "n": "2",
            "title": "Prefer transformation",
            "body": "Use lawful excerpts, your own notes and licensed/approved sources where possible."
          },
          {
            "n": "3",
            "title": "Attribute when needed",
            "body": "AI does not remove your responsibility to cite or respect ownership."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      }
    ]
  },
  {
    "id": "21",
    "slug": "plugins-gpts",
    "title": "Plugins, apps, GPTs & workflows",
    "blurb": "Permissions, existing GPTs and scheduled-task limits.",
    "strand": "practice",
    "duration": "30 min",
    "slides": [
      {
        "kind": "step",
        "title": "Use Free-tier tools & limits",
        "paras": [
          "Make the useful tools practical without pretending every paid or managed feature is available.",
          "Build the habit → practise it → use it safely"
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Plugins, apps and skills — current terminology",
        "paras": [
          "The directory changed in July 2026, but availability still depends on plan, region, workspace and permissions."
        ],
        "items": [
          {
            "n": "1",
            "title": "Plugin",
            "body": "A packaged workflow capability. It may include skills, apps and app templates; not every plugin is available or appropriate for Free/school use."
          },
          {
            "n": "2",
            "title": "App",
            "body": "The connection to external tools, information or actions — e.g. document stores or calendars. Free users should assume permissions and actions are limited unless shown in their account."
          },
          {
            "n": "3",
            "title": "Skill",
            "body": "Reusable workflow instructions, examples and sometimes code that help ChatGPT perform a task consistently."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Do not teach “plugins = old browser extensions”. In current ChatGPT, the Plugin Directory is the discovery layer for workflow capabilities.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Before connecting any plugin or app",
        "paras": [
          "Keep the teacher in control.",
          "DO",
          "DO",
          "• Check what system it connects to.",
          "• Review what it can read, sync or change.",
          "• Use a school-approved account and workspace where required.",
          "• Keep first rollout read-only when possible.",
          "• Confirm terms, privacy policy and admin approval.",
          "DON'T",
          "DON'T",
          "• Do not connect your school Drive simply because a button is available.",
          "• Do not assume “OpenAI Verified” means your school has approved it."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Useful teacher tool categories",
        "paras": [
          "Use the category, not the brand, as your selection logic — and first check whether it is available on Free."
        ],
        "items": [
          {
            "n": "1",
            "title": "Knowledge",
            "body": "Approved Drive/SharePoint/document systems for curriculum and policy retrieval — only if school-approved and permission-safe."
          },
          {
            "n": "2",
            "title": "Productivity",
            "body": "Calendars, task systems or collaboration tools for non-sensitive planning when available and approved."
          },
          {
            "n": "3",
            "title": "Creation",
            "body": "Design, document generation and data workflows that speed up low-risk production; many advanced actions are paid/managed."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Availability varies by plan, region and administrator settings. Teach participants to evaluate permissions, not chase a fixed list of “best plugins”.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "GPTs on Free: use existing ones, do not create them",
        "paras": [
          "Useful — but different from Projects, and Free/personal accounts cannot create or publish new GPTs."
        ],
        "items": [
          {
            "n": "1",
            "title": "What they are",
            "body": "Configured assistants with instructions, knowledge and selected capabilities. Free users can use GPTs they have access to."
          },
          {
            "n": "2",
            "title": "Current creation access",
            "body": "New GPT creation/publishing is not available on personal ChatGPT accounts, including Free, Go, Plus and Pro. It remains a managed-workspace feature where permissions allow."
          },
          {
            "n": "3",
            "title": "Memory difference",
            "body": "Treat each GPT as its own assistant. Do not assume it shares your Project context, memory, Custom Instructions or previous conversations in the same way."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "This is a major 2026 product change. Avoid telling personal Plus users to build a custom GPT as though the old workflow still exists.",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Create your first teaching Project on Free",
        "paras": [
          "Start with one real course or unit. Keep it small enough for Free limits.",
          "8 min",
          "1.",
          "Click New project in the sidebar.",
          "2.",
          "Give it a clear name that includes course or unit.",
          "3.",
          "Write the Project name in your booklet.",
          "No real student personal data during training activities."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Stay on the screenshot until people have found New project on their own phones.",
        "duration": "8 min"
      },
      {
        "kind": "hands-on",
        "title": "Open Project settings",
        "paras": [
          "This is where the Project stops being a folder and becomes a working system.",
          "6 min",
          "1.",
          "Open the Project.",
          "2.",
          "Select the ••• menu.",
          "3.",
          "Choose Project settings and add project-specific instructions."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Point at the screenshot. Do not skip this — it is the most missed click in the room.",
        "duration": "6 min"
      },
      {
        "kind": "hands-on",
        "title": "Add knowledge: files and tools on Free",
        "paras": [
          "Attach only approved reference material. Free has lower upload and storage limits.",
          "8 min",
          "1.",
          "Use + → Add photos & files for approved excerpts.",
          "2.",
          "Stay within 5 files per Project.",
          "3.",
          "Write in your booklet what each file is allowed to control."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Use the synthetic demo files, never a real class list.",
        "duration": "8 min"
      },
      {
        "kind": "teach",
        "title": "Free workflow: Project vs GPT",
        "paras": [
          "Choose based on the job, not which feature sounds more advanced.",
          "PROJECT",
          "Project",
          "Your own ongoing contextual workspace: chats + up to 5 files + project instructions + continuity.",
          "GPT",
          "GPT",
          "Existing specialised assistants you can use within Free limits. On personal Free accounts, do not plan to create or publish your own GPT."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "For most individual teachers building their own class workflow, Projects are the default starting point.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Search, data analysis and Study Mode",
        "paras": [
          "Use the right Free-tier mode for the right cognitive job."
        ],
        "items": [
          {
            "n": "1",
            "title": "Web search",
            "body": "Fast, current lookup with sources. Good when you need recent facts quickly."
          },
          {
            "n": "2",
            "title": "Data analysis",
            "body": "Useful for tables, spreadsheets, calculations and charts within Free limits. Check inputs, formulas and interpretation; file/upload limits still apply."
          },
          {
            "n": "3",
            "title": "Study Mode",
            "body": "Available across plans and designed for guided learning rather than simply giving an answer. It is not available in Projects, GPTs or Temporary Chats."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Free-tier research: control the source set",
        "paras": [
          "For policy, curriculum or literature work, source control matters more than the tool label. Free workshops should use search as the reliable baseline.",
          "DO THIS LIVE"
        ],
        "items": [
          {
            "n": "1",
            "title": "Use web search when the task needs up-to-date sources.",
            "body": ""
          },
          {
            "n": "2",
            "title": "Name specific official sites when you want authoritative boundaries.",
            "body": ""
          },
          {
            "n": "3",
            "title": "Open the source, compare the claim and record uncertainty.",
            "body": ""
          },
          {
            "n": "4",
            "title": "Treat Deep Research in Chat as plan, region and usage-limit dependent; check the in-product counter and do not make the workshop depend on it.",
            "body": "Sources checked 10 Sep 2026: OpenAI Help Center — Free Tier FAQ, Projects, GPTs, File Uploads/Library, Scheduled Tasks, Apps/Plugins, Study Mode, Work. Interface, limits and rollout may vary."
          },
          {
            "n": "1",
            "title": "2",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Example: compare current national guidance, school policy and an official curriculum document — but never use research mode as a substitute for reading a policy that directly governs your action.",
        "duration": ""
      },
      {
        "kind": "step",
        "title": "Use Free-tier scheduled tasks carefully",
        "paras": [
          "Automation should remove repetitive administration — not remove human oversight or exceed Free-tier limits.",
          "Build the habit → practise it → use it safely"
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Scheduled tasks on Free: useful, but limited",
        "paras": [
          "Free users can have up to 3 active tasks. They can run once or recur no more than once per day, using flexible scheduling windows rather than exact times.",
          "DO THIS LIVE"
        ],
        "items": [
          {
            "n": "1",
            "title": "Open Scheduled from the ChatGPT sidebar where available, or ask ChatGPT to create a task.",
            "body": ""
          },
          {
            "n": "2",
            "title": "Create only one-off or daily/weekly/monthly routines that fit Free limits.",
            "body": ""
          },
          {
            "n": "3",
            "title": "Use flexible timing such as “tomorrow morning” or “every Friday”; exact times/hourly schedules require paid eligibility.",
            "body": ""
          },
          {
            "n": "4",
            "title": "Do not use Free tasks for event-triggered/webhook workflows, confidential monitoring or actions that need paid/managed permissions.",
            "body": "Sources checked 10 Sep 2026: OpenAI Help Center — Free Tier FAQ, Projects, GPTs, File Uploads/Library, Scheduled Tasks, Apps/Plugins, Study Mode, Work. Interface, limits and rollout may vary."
          },
          {
            "n": "2",
            "title": "69",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Suggested safe teacher examples: weekly planning reminder; Friday reflection prompt; monthly PD reading brief. Avoid student monitoring or confidential mail workflows unless explicitly approved.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Good Free-tier teacher tasks",
        "paras": [
          "Use reminders and low-risk recurring prompts — not judgement or confidential monitoring."
        ],
        "items": [
          {
            "n": "1",
            "title": "Weekly planning",
            "body": "“Every Friday, remind me to review next week’s objectives and prepare the planning checklist.”"
          },
          {
            "n": "2",
            "title": "Professional learning",
            "body": "“Every month, remind me to check official AI-in-education guidance and summarise only the sources I provide.”"
          },
          {
            "n": "3",
            "title": "Follow-up",
            "body": "“Remind me in 2 weeks to review whether this new retrieval routine is working.”"
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Automation boundaries",
        "paras": [
          "Keep the teacher in control.",
          "DO",
          "DO",
          "• Automate low-risk, reversible prompts.",
          "• Keep review/approval before consequential actions.",
          "• Use clear scope and stop conditions.",
          "• Stay within Free limits: max 3 active tasks and no more than daily recurrence.",
          "DON'T",
          "DON'T",
          "• Do not automate grading decisions.",
          "• Do not automate safeguarding triage to a generic chatbot.",
          "• Do not send parent messages automatically without review."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Turn a great prompt into a repeatable workflow",
        "paras": [
          "A reusable workflow is more valuable than 100 random prompts.",
          "Save the good prompt",
          "Define inputs + checks",
          "Project / saved prompt / task",
          "Edge cases",
          "Human checkpoint",
          "Iterate"
        ],
        "items": [
          {
            "n": "1",
            "title": "Capture",
            "body": ""
          },
          {
            "n": "2",
            "title": "Standardise",
            "body": ""
          },
          {
            "n": "3",
            "title": "Place",
            "body": ""
          },
          {
            "n": "4",
            "title": "Test",
            "body": ""
          },
          {
            "n": "5",
            "title": "Review",
            "body": ""
          },
          {
            "n": "6",
            "title": "Improve",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Design one repeatable Free-tier workflow",
        "paras": [
          "Choose one weekly teacher task that is safe to standardise and fits Free limits.",
          "12 min",
          "1.",
          "Name the trigger: when does this workflow start?",
          "2.",
          "List the inputs it needs.",
          "3.",
          "Write the prompt, Project routine or saved template.",
          "4.",
          "Define the human verification checkpoint.",
          "5.",
          "Decide whether it should remain manual, become a saved template or become a Scheduled Task within Free limits."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": "12 min"
      }
    ]
  },
  {
    "id": "22",
    "slug": "governance",
    "title": "School implementation & AI policy",
    "blurb": "Governance, 90-day roadmap and shared rules.",
    "strand": "legal",
    "duration": "35 min",
    "slides": [
      {
        "kind": "teach",
        "title": "WORKSHOP ASSUMPTION: ChatGPT may not yet be school-approved.",
        "paras": [
          "This course teaches safe professional use under that assumption. Training does not approve the tool, legalise data processing or override school policy. Until approval is explicit: use only public, synthetic or truly anonymised non-confidential data."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Say this aloud in every format. The workshop is designed to reduce risk where teachers are already experimenting, not to give permission that belongs to the school organisation.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Personal account, managed workspace, school approval: three different questions",
        "paras": [
          "A privacy feature can reduce risk; only the school can define approved educational use."
        ],
        "items": [
          {
            "n": "1",
            "title": "Personal Free / Plus / Pro",
            "body": "Personal-workspace data controls can stop new chats being used for model improvement. That is useful — but it does not create a school data-processing agreement or approval."
          },
          {
            "n": "2",
            "title": "Managed organisation workspace",
            "body": "Business/Enterprise/Edu/Teachers workspaces have organisational controls and are not used for model training by default. The school must still approve the product, purpose, users, data and connected systems."
          },
          {
            "n": "3",
            "title": "School approval",
            "body": "Use the school’s approved-tool register, policy and privacy/security process. “Paid”, “managed”, “encrypted” or “no training” never automatically means “approved for student data”."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "OpenAI product privacy and school governance are separate layers. Do not imply that a specific OpenAI plan is automatically GDPR-compliant for a school.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "AVG/GDPR: practical teacher principles",
        "paras": [
          "AVG/GDPR still applies when AI is involved. Translate it into daily behaviour; refer uncertain/high-risk cases to the school’s DPO/privacy/leadership process."
        ],
        "items": [
          {
            "n": "1",
            "title": "Lawful + purposeful",
            "body": "Know the specific purpose and legal basis before personal data is processed. “AI is useful” is not a lawful purpose by itself."
          },
          {
            "n": "2",
            "title": "Minimise + anonymise",
            "body": "Use the least data needed. Prefer fictional or truly anonymous information; pseudonymised data that can be re-linked remains personal data."
          },
          {
            "n": "3",
            "title": "Protect + account",
            "body": "Use approved systems, appropriate supplier arrangements, access/security, retention and transparency. Health/SEN and similar data need especially careful handling."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Legal nuance: Kennisnet recommends a DPIA when an AI application processes personal data. Under GDPR, the statutory DPIA trigger is processing likely to result in high risk. Use the school’s DPO/privacy process to decide and document the assessment.",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "If identifiable personal data is genuinely necessary: STOP and use the school process",
        "paras": [
          "This is no longer an individual prompting choice. It becomes a documented school data-governance decision.",
          "Teacher action: If you cannot answer these questions from school policy, do not put the identifiable data into the tool."
        ],
        "items": [
          {
            "n": "check",
            "title": "1. Define the educational purpose and lawful basis — and whether personal data is actually necessary.",
            "body": ""
          },
          {
            "n": "check",
            "title": "2. Confirm the approved tool/account and appropriate supplier/data-processing arrangements.",
            "body": ""
          },
          {
            "n": "check",
            "title": "3. Run the required privacy/risk assessment. Kennisnet recommends a DPIA when an AI application processes personal data; involve the DPO.",
            "body": ""
          },
          {
            "n": "check",
            "title": "4. Set security/access, retention/deletion, transparency and data-minimisation controls.",
            "body": ""
          },
          {
            "n": "check",
            "title": "5. Check AI Act classification/oversight and obtain the school approvals required before deployment.",
            "body": ""
          },
          {
            "n": "5",
            "title": "Sources checked 10 Sep 2026: Kennisnet (privacy & school AI agreements); European Commission GDPR guidance; EU AI Act consolidated 27 Jul 2026; Rijksoverheid Normenkader IBP; AP; OpenAI official privacy/age guidance. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "Teacher action: If you cannot answer these questions from school policy, do not put the identifiable data into the tool. 5",
        "notes": "Do not tell individual teachers to negotiate processor agreements or classify high-risk AI themselves. The practical teacher action is to stop and escalate.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "EU AI Act: why this course matters",
        "paras": [
          "Article 4 AI-literacy duties apply to providers/deployers. This workshop can support that duty, but attendance alone does not prove compliance or approve a tool."
        ],
        "items": [
          {
            "n": "1",
            "title": "Applied since 2 Feb 2025",
            "body": "Organisations using AI must take measures to support staff AI literacy, considering knowledge, experience, training, context and affected people."
          },
          {
            "n": "2",
            "title": "Risk-aware competence",
            "body": "Teachers should understand capabilities, hallucinations, privacy, bias, assessment risk, safeguards and the school’s own approved systems/rules."
          },
          {
            "n": "3",
            "title": "Governance — not solo compliance",
            "body": "High-risk or prohibited uses, procurement, DPIA/FRIA questions and consequential decisions belong in school-level legal/privacy/governance processes."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "The amended Article 4 no longer sets a fixed individual literacy level, but the duty to take measures supporting staff AI literacy remains. Do not market this workshop as automatic AI Act compliance.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "AI Act + Dutch school readiness timeline — as of 10 Sep 2026",
        "paras": [
          "Keep the legal timelines separate: EU AI Act duties and the Dutch Normenkader IBP are related governance work, but they are not the same law."
        ],
        "items": [
          {
            "n": "1",
            "title": "2 Feb 2025",
            "body": "Article 4 AI literacy + key prohibited-practice rules apply"
          },
          {
            "n": "2",
            "title": "Aug 2026",
            "body": "AI Act generally applies; national supervision/enforcement framework is active"
          },
          {
            "n": "3",
            "title": "1 Jan 2027",
            "body": "NL schools: Normenkader IBP self-evaluation + improvement plan expected"
          },
          {
            "n": "4",
            "title": "2 Dec 2027",
            "body": "Main Chapter III requirements for Annex III high-risk AI systems apply"
          },
          {
            "n": "5",
            "title": "Dec 2027",
            "body": "FRIA required for some deployers, incl. certain public-body high-risk uses"
          },
          {
            "n": "6",
            "title": "By 2030",
            "body": "Dutch planning: schools required to meet all Normenkader IBP requirements"
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Do not present the Normenkader timetable as an AI Act deadline. The Rijksoverheid page describes it as the Dutch information-security/privacy framework for schools.",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Education uses that can enter high-risk territory",
        "paras": [
          "Annex III lists several education uses as high-risk categories, subject to the Article 6(3) carve-out. The main Chapter III requirements for Annex III systems apply from 2 Dec 2027.",
          "Do not label every worksheet or feedback draft “high-risk”. The intended purpose and effect of the system matter."
        ],
        "items": [
          {
            "n": "check",
            "title": "AI determining access, admission or assignment to education/training",
            "body": ""
          },
          {
            "n": "check",
            "title": "AI intended to evaluate learning outcomes, including where outcomes steer learning",
            "body": ""
          },
          {
            "n": "check",
            "title": "AI assessing the level of education a person will receive or be able to access",
            "body": ""
          },
          {
            "n": "check",
            "title": "AI monitoring/detecting prohibited student behaviour during tests",
            "body": ""
          },
          {
            "n": "check",
            "title": "Not every teacher use is high-risk: Article 6(3) can exclude narrow/preparatory/review uses that do not materially influence decisions. Treat classification as a provider/school governance question.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "Do not label every worksheet or feedback draft “high-risk”. The intended purpose and effect of the system matter. Source: EUR-Lex consolidated Regulation (EU) 2024/1689 (27 Jul 2026), Article 6, Annex III and Article 113. Educational guidance, not legal advice. 8",
        "notes": "Important correction: Annex III is not a blanket label for all classroom AI. Article 6(3) provides an exception where the system does not pose a significant risk and meets specified narrow/preparatory/review conditions. Escalate classification questions.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Emotion recognition in education: a prohibited practice",
        "paras": [
          "Some AI uses are not merely “high risk” — they are prohibited."
        ],
        "items": [
          {
            "n": "1",
            "title": "What this means",
            "body": "The AI Act defines emotion recognition as identifying or inferring emotions/intentions from biometric data."
          },
          {
            "n": "2",
            "title": "Education rule",
            "body": "Using AI to infer a person’s emotions in educational institutions is prohibited, except limited uses intended for medical or safety reasons."
          },
          {
            "n": "3",
            "title": "Teacher action",
            "body": "Do not pilot “attention”, “engagement” or emotion-detection from faces/voice/biometrics with students. Escalate any proposed system to leadership/privacy/legal procurement review."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "This prohibition is about biometric emotion inference. It is not a ban on a teacher noticing that a student appears upset through normal human interaction.",
        "duration": ""
      },
      {
        "kind": "avoid-aim",
        "title": "Assessment + automated decisions: AI may support — it must not silently decide",
        "paras": [
          "The higher the impact on a learner, the stronger the need for lawful processing, transparency, validity and meaningful human review.",
          "Unsafe shortcut",
          "“AI gave this student 6/10, so I entered the grade.” Or: “the detector says 92% AI, therefore misconduct.” This outsources a consequential judgement to an uncertain system.",
          "Professional workflow",
          "Where school policy/law permits AI support: use appropriate data, inspect the evidence and reasoning, verify against criteria, be able to depart from the output, document the teacher decision and provide the required transparency. GDPR restricts solely automated significant decisions."
        ],
        "items": [
          {
            "n": "10",
            "title": "Sources: Kennisnet privacy guidance; European Commission GDPR Article 22 guidance; EU AI Act Articles 6/Annex III. Educational guidance, not legal advice.",
            "body": ""
          }
        ],
        "avoid": "“AI gave this student 6/10, so I entered the grade.” Or: “the detector says 92% AI, therefore misconduct.” This outsources a consequential judgement to an uncertain system.",
        "aim": "Where school policy/law permits AI support: use appropriate data, inspect the evidence and reasoning, verify against criteria, be able to depart from the output, document the teacher decision and provide the required transparency. GDPR restricts solely automated significant decisions. 10 Sources: Kennisnet privacy guidance; European Commission GDPR Article 22 guidance; EU AI Act Articles 6/Annex III. Educational guidance, not legal advice.",
        "lens": "",
        "notes": "Kennisnet specifically cautions against independent AI grading and requires teacher oversight in its example. Annex III also covers AI systems intended to evaluate learning outcomes, subject to Article 6 classification rules.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Students and personal ChatGPT accounts: do not improvise",
        "paras": [
          "A classroom activity can create a school-controlled privacy problem if students are told to create personal accounts."
        ],
        "items": [
          {
            "n": "1",
            "title": "School instruction",
            "body": "Kennisnet warns against directing students to make personal free AI accounts when the school lacks the necessary privacy arrangements/control."
          },
          {
            "n": "2",
            "title": "Age + terms",
            "body": "OpenAI’s EEA terms set a minimum age of 13 (or higher local consent age); under 18s need parent/guardian permission. For under-13 education use, OpenAI says the actual interaction must be conducted by an adult."
          },
          {
            "n": "3",
            "title": "Safer teaching path",
            "body": "Use a teacher-led demonstration or school-approved student environment/account setup. Teach students not to enter personal data and follow assessment/disclosure rules."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Always check the current terms of the tool and the school’s student-account policy. Do not turn this into a request for teachers to collect parental consent on their own unless the school has designed that process.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "School governance: shared rules beat private improvisation",
        "paras": [
          "If staff are already using AI before formal approval, the answer is not silence: set interim red lines, approved-use boundaries and an escalation path."
        ],
        "items": [
          {
            "n": "1",
            "title": "Approved tools + supplier arrangements",
            "body": "Which tool/account is approved for which data and purpose? Are processor/data terms, security, access, retention and connections acceptable?"
          },
          {
            "n": "2",
            "title": "Risk + rights assessments",
            "body": "Who decides when a DPIA is needed, whether an AI use is high-risk, and whether a FRIA or other assessment applies? Involve DPO/privacy/legal/leadership."
          },
          {
            "n": "3",
            "title": "Operational rules + incidents",
            "body": "Define assessment/human-oversight rules, student-account/age rules, safeguarding boundaries and what staff do after accidental data sharing."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "90-day school implementation roadmap",
        "paras": [
          "Move from experimentation to governed practice.",
          "What staff/students already use",
          "No identifiable data in unapproved tools",
          "Tools, supplier terms, DPIA/AI Act",
          "AI literacy + safe workflows",
          "Low-risk, reviewable use cases",
          "Incidents, quality, policy, Normenkader"
        ],
        "items": [
          {
            "n": "1",
            "title": "Map reality",
            "body": ""
          },
          {
            "n": "2",
            "title": "Set interim red lines",
            "body": ""
          },
          {
            "n": "3",
            "title": "Approve + assess",
            "body": ""
          },
          {
            "n": "4",
            "title": "Train",
            "body": ""
          },
          {
            "n": "5",
            "title": "Pilot safely",
            "body": ""
          },
          {
            "n": "6",
            "title": "Audit + improve",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Use Kennisnet guidance and your school’s own legal/privacy process to adapt this roadmap.",
        "duration": ""
      }
    ]
  },
  {
    "id": "23",
    "slug": "capstone",
    "title": "Capstone & completion",
    "blurb": "A working Teacher AI Workspace, evidence and next steps.",
    "strand": "capstone",
    "duration": "40 min",
    "slides": [
      {
        "kind": "step",
        "title": "Build your complete Teacher AI Workspace",
        "paras": [
          "Bring the practical setup, workflows and safety rules together into one system you can use tomorrow.",
          "Build the habit → practise it → use it safely"
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Student AI literacy belongs in the course too",
        "paras": [
          "Teachers need to model and teach responsible use."
        ],
        "items": [
          {
            "n": "1",
            "title": "Understand",
            "body": "Students should know what generative AI is, how it can fail and why fluent output still needs judgement."
          },
          {
            "n": "2",
            "title": "Disclose",
            "body": "Teach students how to state what AI they used, for which part and what they changed or verified."
          },
          {
            "n": "3",
            "title": "Learn with AI",
            "body": "Use guided modes, teacher-designed prompts and Free-tier examples that support thinking rather than replace it."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "A simple student AI disclosure",
        "paras": [
          "Build transparency into the learning process.",
          "What did you use?",
          "What did it help with?",
          "What did you ask / provide?",
          "What did you revise?",
          "How did you check?",
          "What did you learn?"
        ],
        "items": [
          {
            "n": "1",
            "title": "Tool",
            "body": ""
          },
          {
            "n": "2",
            "title": "Purpose",
            "body": ""
          },
          {
            "n": "3",
            "title": "Input",
            "body": ""
          },
          {
            "n": "4",
            "title": "Change",
            "body": ""
          },
          {
            "n": "5",
            "title": "Verify",
            "body": ""
          },
          {
            "n": "6",
            "title": "Learn",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "School governance: shared rules beat private improvisation",
        "paras": [
          "Individual teacher skill must connect to school-wide decisions."
        ],
        "items": [
          {
            "n": "1",
            "title": "Approved tools",
            "body": "Which accounts, plugins/apps and AI systems are permitted for which kinds of data?"
          },
          {
            "n": "2",
            "title": "Assessment rules",
            "body": "How will departments communicate allowed / limited / prohibited AI use consistently?"
          },
          {
            "n": "3",
            "title": "Incident pathway",
            "body": "What should staff do if sensitive data is accidentally shared or an AI tool behaves unexpectedly?"
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "90-day school implementation roadmap",
        "paras": [
          "Move from experimentation to governed practice.",
          "Who uses what?",
          "Privacy + safeguarding",
          "AI literacy + workflows",
          "Small use cases",
          "Quality + risk",
          "Policy + support"
        ],
        "items": [
          {
            "n": "1",
            "title": "Map use",
            "body": ""
          },
          {
            "n": "2",
            "title": "Set red lines",
            "body": ""
          },
          {
            "n": "3",
            "title": "Train staff",
            "body": ""
          },
          {
            "n": "4",
            "title": "Pilot",
            "body": ""
          },
          {
            "n": "5",
            "title": "Evaluate",
            "body": ""
          },
          {
            "n": "6",
            "title": "Scale",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Use Kennisnet guidance and your school’s own legal/privacy process to adapt this roadmap.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Your capstone is not a quiz. It is a working professional system.",
        "paras": [
          "By the end, every participant should be able to show how they have configured, organised, used and governed ChatGPT for a real teaching workflow."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Capstone: Build Your Complete Free-tier Teacher AI Workspace",
        "paras": [
          "Evidence of competence."
        ],
        "items": [
          {
            "n": "1",
            "title": "Configure",
            "body": "Personalisation + intentional memory/privacy choices + organised/pinned workspace that fits Free features."
          },
          {
            "n": "2",
            "title": "Build",
            "body": "One teaching Project with engineered instructions and approved source files, staying within Free file limits."
          },
          {
            "n": "3",
            "title": "Produce & verify",
            "body": "Lesson/resource + differentiation + assessment/document + reusable prompt + safety checklist, all teacher-verified."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Capstone success criteria",
        "paras": [
          "Participants should be able to demonstrate — not merely describe — these skills.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "I can explain what ChatGPT is and where it can fail.",
            "body": ""
          },
          {
            "n": "check",
            "title": "I can organise ChatGPT around Projects rather than repeated context.",
            "body": ""
          },
          {
            "n": "check",
            "title": "I can write robust Project Instructions and prompt professionally.",
            "body": ""
          },
          {
            "n": "check",
            "title": "I can create and verify teaching artifacts.",
            "body": ""
          },
          {
            "n": "check",
            "title": "I can explain the data/safety boundary before I use AI.",
            "body": ""
          },
          {
            "n": "check",
            "title": "I know which decisions remain human.",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 97",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Final Free-tier capstone build",
        "paras": [
          "Use the workbook checklist and build your complete Teacher AI Workspace using features available on ChatGPT Free.",
          "30–45 min",
          "1.",
          "Personalise ChatGPT intentionally.",
          "2.",
          "Create and organise one real teaching Project.",
          "3.",
          "Engineer Project Instructions and add only approved sources within Free limits.",
          "4.",
          "Generate, differentiate and verify one teaching artifact.",
          "5.",
          "Create a reusable workflow + safety checklist, then prepare a 2-minute demonstration."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": "30–45 min"
      },
      {
        "kind": "teach",
        "title": "Your first 30 days on ChatGPT Free",
        "paras": [
          "Small habits beat an enormous setup you never maintain. Upgrade only when the limits genuinely block safe, valuable work.",
          "Set up + one Project",
          "Prompt + verify",
          "Resource workflow",
          "Reflect + improve"
        ],
        "items": [
          {
            "n": "1",
            "title": "Week 1",
            "body": ""
          },
          {
            "n": "2",
            "title": "Week 2",
            "body": ""
          },
          {
            "n": "3",
            "title": "Week 3",
            "body": ""
          },
          {
            "n": "4",
            "title": "Week 4",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Take-away rules",
        "paras": [
          "If participants remember only three things…"
        ],
        "items": [
          {
            "n": "1",
            "title": "Context beats clever wording",
            "body": "Use Projects, source hierarchy and clear instructions — within Free limits."
          },
          {
            "n": "2",
            "title": "Verify before you trust",
            "body": "AI output is a draft until checked against evidence and professional standards."
          },
          {
            "n": "3",
            "title": "Never outsource judgement",
            "body": "Protect data, follow policy and keep consequential decisions human."
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "",
        "duration": ""
      },
      {
        "kind": "lens",
        "title": "Official resources for keeping the Free-tier course current",
        "paras": [
          "ChatGPT changes quickly — check the exact Free-tier features before every delivery.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”"
        ],
        "items": [
          {
            "n": "check",
            "title": "OpenAI Help Center — ChatGPT Free Tier FAQ, Projects, GPTs and File Uploads",
            "body": ""
          },
          {
            "n": "check",
            "title": "OpenAI Help Center — Scheduled Tasks, Apps/Plugins, Study Mode, Deep Research and Work/Codex",
            "body": ""
          },
          {
            "n": "check",
            "title": "European Commission — AI Literacy Q&A and AI Act information platform",
            "body": ""
          },
          {
            "n": "check",
            "title": "Autoriteit Persoonsgegevens — AI / privacy guidance",
            "body": ""
          },
          {
            "n": "check",
            "title": "Kennisnet — Handreiking AI in het onderwijs / school guidance",
            "body": ""
          }
        ],
        "avoid": "",
        "aim": "",
        "lens": "“What would I need to check before using this with real students?” 101",
        "notes": "Before every delivery, check the OpenAI release notes and the legal/privacy guidance for material changes.",
        "duration": ""
      },
      {
        "kind": "teach",
        "title": "Build better Free-tier teaching workflows. Keep the teacher in control.",
        "paras": [
          "Questions • practice • capstone demonstrations • final verification before classroom use"
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Close with participant demonstrations or next-step commitments.",
        "duration": ""
      },
      {
        "kind": "hands-on",
        "title": "Send your booklet to the presenter",
        "paras": [
          "Notes, how the session felt, what you will try next, and how the course could improve — one pack, with your name on it.",
          "4 min",
          "1.",
          "Give an overall score from 1 to 5.",
          "2.",
          "Write how the session felt and one way the course could improve.",
          "3.",
          "Tap Send booklet to the presenter. You can update it if you think of more.",
          "No real student personal data in the notes."
        ],
        "items": [],
        "avoid": "",
        "aim": "",
        "lens": "",
        "notes": "Stay on this slide until the room has sent. Collect booklets in Room against each name.",
        "duration": "4 min"
      }
    ]
  },
  ...mathHourModules,
];

export function getModule(idOrSlug: string): CourseModule | undefined {
  return modules.find((m) => m.id === idOrSlug || m.slug === idOrSlug);
}

export const strandLabel: Record<Strand, string> = {
  foundations: "Foundations",
  practice: "Practice",
  legal: "Safe & legal",
  capstone: "Capstone",
};
