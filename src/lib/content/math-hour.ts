import type { CourseModule, Slide, SlideItem, SlideKind } from "./modules";

function items(rows: Array<[string, string, string]>): SlideItem[] {
  return rows.map(([n, title, body]) => ({ n, title, body }));
}

function slide(kind: SlideKind, title: string, rest: Partial<Slide> = {}): Slide {
  return {
    kind,
    title,
    paras: rest.paras ?? [],
    items: rest.items ?? [],
    avoid: rest.avoid ?? "",
    aim: rest.aim ?? "",
    lens: rest.lens ?? "",
    notes: rest.notes ?? "",
    duration: rest.duration ?? "",
  };
}

/** Compact 1-hour live route for a mathematics department. */
export const mathHourModules: CourseModule[] = [
  {
    id: "24",
    slug: "maths-use",
    title: "How to use it correctly",
    blurb: "Teacher in control. A pattern machine, not a mathematician.",
    strand: "foundations",
    duration: "7 min",
    slides: [
      slide("teach", "This hour is for the maths desk", {
        paras: [
          "Leave able to use ChatGPT correctly this week — not with a pile of prompts.",
        ],
        items: items([
          ["1", "Correct use", "What it is, what it is for, and what stays a teacher decision."],
          ["2", "Files", "What you may upload into a Project — and what you must not."],
          ["3", "Safety", "Green / Amber / Red for a maths department in the Netherlands."],
          ["4", "Documents & images", "Draft worksheets you will check. Never trust a generated graph."],
        ]),
        notes:
          "Say: this is not a tour of features. It is how we will use the tool at our desk without handing it the mathematics.",
      }),
      slide("teach", "A pattern machine — not a mathematician", {
        paras: [
          "It predicts a useful next response from your brief and its training. It does not prove Pythagoras, know your class, or stand behind a grade.",
        ],
        items: items([
          ["1", "Not a colleague", "It has not taught your Year 9s. It does not remember who still confuses the hypotenuse."],
          ["2", "Not a mark scheme", "A fluent worked solution can still use a method you do not teach, or a step that is simply wrong."],
          ["3", "You still decide", "Whether it is correct, fair, on-curriculum, and fit for these students — that stays with you."],
        ]),
        notes:
          "Hold a printed worksheet. Point at one line. Say: if this line is wrong, the students still think you wrote it.",
      }),
      slide("avoid-aim", "Why fluent maths can still be wrong", {
        paras: [
          "Confidence in the tone is not evidence. Check every line of mathematics before it reaches a class.",
          "Risky habit",
          "Copy a worked solution, a ‘standard form’ method, or a fake page of the IB guide because it sounds finished.",
          "Professional habit",
          "Work the answer yourself. Check the diagram. Open the guide. If you cannot verify it, it does not go to students.",
        ],
        avoid:
          "Copy a worked solution, a ‘standard form’ method, or a fake page of the IB guide because it sounds finished.",
        aim: "Work the answer yourself. Check the diagram. Open the guide. If you cannot verify it, it does not go to students.",
        notes:
          "Give one real miss: a right angle marked on the wrong vertex, or an invented ‘butterfly method’ for simultaneous equations.",
      }),
      slide("hands-on", "One workflow this week", {
        paras: [
          "Write in the booklet. No student names, no marks, no unpublished tests.",
          "3 min",
          "1.",
          "Name one maths workflow you want to improve this week — retrieval, an exit ticket, a Criterion B scaffold, a parent explanation.",
          "2.",
          "Name one risk you want answered before you try it.",
          "3.",
          "Tick: I will not put a real student’s work into ChatGPT in this hour.",
          "No real student personal data during training activities.",
        ],
        duration: "3 min",
        notes: "Walk the room. If someone writes a student’s name, ask them to replace it with ‘a Year 9 student’.",
      }),
    ],
  },
  {
    id: "25",
    slug: "maths-for",
    title: "What it is for — and not for",
    blurb: "Drafts you will check. Never a substitute for the mathematician.",
    strand: "foundations",
    duration: "7 min",
    slides: [
      slide("teach", "What ChatGPT is actually for in maths", {
        paras: [
          "Use it as a drafting assistant for low-risk teacher work. You remain the editor and the mathematician.",
        ],
        items: items([
          [
            "1",
            "Practice that you will check",
            "Retrieval starters, exit tickets, worked-example fading, three versions of the same worksheet with the same objective.",
          ],
          [
            "2",
            "Planning support",
            "A first pass at a lesson sequence, a list of misconceptions, a Criterion B investigation scaffold — then you cut, correct and own it.",
          ],
          [
            "3",
            "Words around the maths",
            "A parent-friendly explanation of a method. Feedback stems. A first draft of an answer key you rework yourself.",
          ],
        ]),
        notes:
          "Say: the win is less grind on the wrapping — not outsourcing the mathematics.",
      }),
      slide("teach", "What it is not for", {
        paras: ["If it carries a name, a mark, or an unpublished assessment, it does not go in."],
        items: items([
          [
            "1",
            "Assessment that counts",
            "Unpublished unit tests. Live exam papers. Marks. Comments you will paste onto ManageBac as if they were yours.",
          ],
          [
            "2",
            "People",
            "Named students, photos of exercise books, SEN / IEP notes, parent threads, anything that identifies a child.",
          ],
          [
            "3",
            "The figure itself",
            "Accurate graphs, scaled diagrams, labelled geometry. That is Desmos, GeoGebra or the GDC — not an image generator.",
          ],
          [
            "4",
            "Student work on their behalf",
            "Do not ‘solve this homework’ for a child, or write the Criterion B they then submit as theirs.",
          ],
        ]),
        notes: "Pause on unpublished tests. That is the most common maths-department miss.",
      }),
      slide("avoid-aim", "Draw the line at the maths desk", {
        paras: [
          "Same tool. Completely different professional decision.",
          "Do not",
          "Paste a student’s photographed homework and ask ChatGPT to mark it. Upload next week’s unseen test ‘just to generate a mark scheme’.",
          "Do this instead",
          "Write a synthetic Year 9 script yourself, or use a past paper that is already public. Generate practice, then you mark.",
        ],
        avoid:
          "Paste a student’s photographed homework and ask ChatGPT to mark it. Upload next week’s unseen test ‘just to generate a mark scheme’.",
        aim: "Write a synthetic Year 9 script yourself, or use a past paper that is already public. Generate practice, then you mark.",
        notes: "Ask the room: who has a test sitting in a drawer this month? That file is red.",
      }),
      slide("lens", "Talk this through — would you use it?", {
        paras: [
          "With the person next to you, classify each use. Then write one ‘for’ and one ‘not for’ in the booklet.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”",
        ],
        items: items([
          ["check", "Four retrieval questions on Pythagoras for Year 9, answers on a separate key you will work.", ""],
          ["check", "A parent explanation of why we rationalise the denominator — no student names.", ""],
          ["check", "Mark this photographed exercise-book page and write a comment for ManageBac.", ""],
          ["check", "Draft a Criterion B investigation on quadratic sequences — you will rewrite it before it is issued.", ""],
        ]),
        lens: "“What would I need to check before using this with real students?”",
        notes: "First and last are green if verified. The photographed page is red. The investigation is amber until you own every line.",
      }),
    ],
  },
  {
    id: "26",
    slug: "maths-safety",
    title: "Safety at the maths desk",
    blurb: "Green, Amber, Red for Netherlands / EU maths departments.",
    strand: "legal",
    duration: "10 min",
    slides: [
      slide("teach", "Green, amber and red at the maths desk", {
        paras: [
          "If you would not pin it on a classroom wall, do not paste it into ChatGPT.",
        ],
        items: items([
          [
            "green",
            "Green — generally suitable",
            "Public curriculum. Your own worksheet with no names. Past papers already public. ‘A Year 7 class’ as a fictional group.",
          ],
          [
            "amber",
            "Amber — pause",
            "Unpublished unit plans. School-branded booklets. Class-level patterns that could still identify a small group. Check with the HoD.",
          ],
          [
            "red",
            "Red — stop",
            "Names + marks. Photos of work. Unpublished tests. SEN / medical / safeguarding. Parent disputes. Anything in ManageBac about a child.",
          ],
        ]),
        notes:
          "Say the wall test out loud. Then: training in this room is not school approval.",
      }),
      slide("teach", "What never goes in — maths examples", {
        paras: ["Personal data is broader than a name in the first line."],
        items: items([
          ["1", "Identity", "A name, a photo, a distinctive seating plan, ‘the boy who arrived from X in March’."],
          ["2", "Marks and comments", "Spreadsheets, report drafts, criterion levels attached to a person."],
          ["3", "Unpublished assessment", "This week’s test, the mock, the investigation that has not been issued yet."],
          ["4", "Special category", "IEP, extra time, medical, pastoral. Do not ‘just test it’ with a real case."],
        ]),
        notes: "AVG / GDPR: a personal Free account is not a school processing agreement.",
      }),
      slide("step", "Five questions before every prompt", {
        paras: [
          "Ask these before you paste. If any answer is uncomfortable, stop, substitute, or escalate.",
          "Personal data? → School-approved tool? → Still identifiable? → Affects a learner? → Which source and which human decide?",
        ],
        items: items([
          ["1", "Any personal or confidential data?", "If yes, it does not go into an unapproved account."],
          ["2", "Is this tool and this use school-approved?", "Training is not permission."],
          ["3", "Could the person still be identified?", "Small classes make ‘anonymised’ work easy to re-identify."],
          ["4", "Could the output affect a learner?", "Grades, access, behaviour, extra time — human decision."],
          ["5", "Which source and which human control it?", "IB guide and you. Not the model’s memory of ‘how maths works’."],
        ]),
        notes: "Count them on your fingers. Do not skip number 2 because the room is in a hurry.",
      }),
      slide("lens", "Classify these maths-desk examples", {
        paras: [
          "Tick green, amber or red. Then write one planned use from your own desk in the booklet.",
        ],
        items: items([
          ["check", "IB MYP Mathematics guide excerpt + your own fractions worksheet, no names.", "Green — then verify the mathematics."],
          ["check", "‘Half of 10B still cannot factorise’ in a prompt, with the class code.", "Amber / red — a small group can be identified."],
          ["check", "Next week’s unseen quadratic-sequences test, to generate a mark scheme.", "Red — unpublished assessment."],
          ["check", "A photo of a student’s book, to ‘see the misconception’.", "Red — identifiable student work."],
        ]),
        notes: "Do not debate the red ones. Name the substitute: a synthetic script you wrote.",
      }),
      slide("avoid-aim", "Training is not permission", {
        paras: [
          "This hour does not approve ChatGPT for the school, create a lawful basis, or replace a DPIA.",
          "Risky habit",
          "‘We did the course, so I can put class data in now.’",
          "Professional habit",
          "If approval is unknown, stay on public, synthetic or truly anonymous material — and take real use-cases to the school process.",
        ],
        avoid: "‘We did the course, so I can put class data in now.’",
        aim: "If approval is unknown, stay on public, synthetic or truly anonymous material — and take real use-cases to the school process.",
        notes: "Close this block: the operating assumption stays up until leadership says otherwise.",
      }),
    ],
  },
  {
    id: "27",
    slug: "maths-files",
    title: "Uploading documents",
    blurb: "Projects, files, and what must never be stored there.",
    strand: "practice",
    duration: "8 min",
    slides: [
      slide("teach", "Why files beat a long chat", {
        paras: [
          "A Project holds the unit. A chat is one task. Files you approve beat whatever the model ‘remembers’ about mathematics.",
        ],
        items: items([
          [
            "1",
            "Source hierarchy",
            "IB subject guide and your planner sit above ChatGPT’s general idea of ‘how to teach standard form’.",
          ],
          [
            "2",
            "One Project per unit",
            "Name it after the course: ‘MYP4 Standard form’. Separate chats inside it for retrieval, the worksheet, the parent letter.",
          ],
          [
            "3",
            "Free-tier limit",
            "Up to five files per Project. Choose the three that actually control the mathematics.",
          ],
        ]),
        notes: "If they already have one endless chat called ‘maths’, that is the habit we are replacing.",
      }),
      slide("step", "Create your first teaching project", {
        paras: [
          "Do this live if you have a laptop. Otherwise watch the screen and write the Project name in the booklet.",
          "Sidebar → New project → name the unit → Project settings → instructions",
        ],
        items: items([
          ["1", "New project", "In the sidebar, tap New project. Name it after one real unit, not ‘Maths’."],
          ["2", "Project settings", "Open the ••• menu, choose Project settings, add who you are and what this unit is."],
          ["3", "Never-rules", "Add: no student names, no marks, flag uncertainty, do not invent IB page numbers."],
        ]),
        notes: "Project the new-project screen. Ask three people to shout a unit name. Pick one.",
      }),
      slide("step", "Add knowledge: files on Free", {
        paras: [
          "Approved excerpts only. Free allows up to five files per Project.",
          "+ → Add photos & files",
        ],
        items: items([
          ["1", "Open the Project", "Stay inside the unit Project, not a random chat."],
          ["2", "Add photos & files", "Tap + then Add photos & files. PDF or a clean excerpt beats a whole textbook scan."],
          ["3", "Say what it controls", "In instructions: ‘The IB excerpt controls criterion language. The planner controls sequence. The worksheet is an example of pitch.’"],
        ]),
        notes: "Project the add-files control. Repeat: five files, none of them student work.",
      }),
      slide("avoid-aim", "What belongs — and what must never be stored", {
        paras: [
          "The Project is a teaching drawer, not a markbook.",
          "Never upload",
          "Class lists. Photographed scripts. ManageBac exports. Unpublished tests. Anything with a child’s name, photo or mark.",
          "Do upload",
          "A public IB excerpt. Your own worksheet with names stripped. A unit planner with no student data. A past paper that is already public.",
        ],
        avoid:
          "Class lists. Photographed scripts. ManageBac exports. Unpublished tests. Anything with a child’s name, photo or mark.",
        aim: "A public IB excerpt. Your own worksheet with names stripped. A unit planner with no student data. A past paper that is already public.",
        notes: "If someone asks about a textbook PDF: copyright and school licence first. Prefer a short authorised excerpt.",
      }),
      slide("hands-on", "Name the three files you would add", {
        paras: [
          "Write in the booklet. Use a unit you are actually teaching.",
          "4 min",
          "1.",
          "Name the Project after the unit — course + topic.",
          "2.",
          "List up to three files that belong there, and what each one controls.",
          "3.",
          "Write one thing that must never be stored in this Project.",
          "No real student personal data during training activities.",
        ],
        duration: "4 min",
        notes: "Look for names. If a file is ‘10B marks.xlsx’, that person is practising the wrong habit.",
      }),
    ],
  },
  {
    id: "28",
    slug: "maths-make",
    title: "Creating documents",
    blurb: "Worksheets, exit tickets, scaffolds — you own every line.",
    strand: "practice",
    duration: "10 min",
    slides: [
      slide("teach", "Drafts you can actually use this week", {
        paras: [
          "ChatGPT is a production assistant. You remain the editor, the subject expert and the person whose name is on the sheet.",
        ],
        items: items([
          [
            "1",
            "Teaching",
            "Retrieval. Modelling prompts. Worked examples that fade. Exit tickets. Station cards. A first slide outline.",
          ],
          [
            "2",
            "Same objective, two routes",
            "A scaffolded version and an extension — not an ‘easy sheet for weak students’.",
          ],
          [
            "3",
            "The key you will check",
            "A separate answer key is useful only after you have worked every item yourself.",
          ],
        ]),
        notes: "Show one bad sheet in your head: ten questions, three of them off-curriculum. That is what unverified drafts look like.",
      }),
      slide("step", "Brief it with SCOPE-V", {
        paras: [
          "Brief it the way you would brief a colleague covering your class. ‘Make a fractions lesson’ is not a brief.",
        ],
        items: items([
          ["S", "Situation", "Year 9, first lesson back on Pythagoras, mixed prior knowledge, 50 minutes."],
          ["C", "Constraints", "MYP Criterion A. No student names. One projector. Calculators later, not in the starter."],
          ["O", "Output", "8-minute retrieval: 4 questions increasing in demand, one misconception, answers on a separate key."],
          ["P", "Persona", "An IB MYP mathematics teacher. Short items. No invented methods."],
          ["E", "Examples", "Question 1 is a missing hypotenuse. Question 4 needs a decision: is this a right triangle?"],
          ["V", "Verify", "Work every answer. Flag any method we do not teach. Do not invent a page of the IB guide."],
        ]),
        notes:
          "Read the Pythagoras brief aloud. Then say: that is the difference between a covering colleague and a vending machine.",
      }),
      slide("avoid-aim", "Differentiation is not ‘make it easy’", {
        paras: [
          "Keep the learning objective. Change the access, not the ambition.",
          "Weak brief",
          "‘Make an easy worksheet for weak students on Pythagoras.’",
          "Better brief",
          "‘Same objective. Scaffolded version: worked-example fading, one-step prompts, labelled diagram already drawn. Extension: a decision item and a ‘show that’ — no new content from next unit.’",
        ],
        avoid: "‘Make an easy worksheet for weak students on Pythagoras.’",
        aim: "‘Same objective. Scaffolded version: worked-example fading, one-step prompts, labelled diagram already drawn. Extension: a decision item and a ‘show that’ — no new content from next unit.’",
        notes: "This is the line our department holds. Say it as a department sentence, not a tip.",
      }),
      slide("hands-on", "Make one retrieval starter", {
        paras: [
          "Use the Pythagoras brief on the last slide, or swap in your own unit. Then verify.",
          "5 min",
          "1.",
          "Paste a SCOPE-V brief. No student names.",
          "2.",
          "Generate the four questions and the key.",
          "3.",
          "Work every answer yourself. Strike anything off-curriculum or method-wrong.",
          "4.",
          "Write in the booklet: what you kept, what you cut, what you still need to check.",
          "No real student personal data during training activities.",
        ],
        duration: "5 min",
        notes: "If laptops are closed, they write the brief only. The verification habit matters more than the output.",
      }),
      slide("lens", "Every line of maths is yours", {
        paras: [
          "Before anything is printed or projected, run this pass.",
          "Use this question during the activity:",
          "“What would I need to check before using this with real students?”",
        ],
        items: items([
          ["check", "Work each item independently. Do not ask only ‘are you sure?’", ""],
          ["check", "Does the method match what this class has been taught?", ""],
          ["check", "Any invented IB page, fake ‘common misconception’, or off-unit content?", ""],
          ["check", "Reading load, diagram clarity, calculator assumption, accessibility.", ""],
        ]),
        lens: "“What would I need to check before using this with real students?”",
        notes: "Close: if you cannot stand behind a line, delete the line.",
      }),
    ],
  },
  {
    id: "29",
    slug: "maths-images",
    title: "Images and diagrams",
    blurb: "Generated pictures are decoration. Figures come from Desmos, GeoGebra or the GDC.",
    strand: "practice",
    duration: "8 min",
    slides: [
      slide("teach", "Generated images versus mathematical figures", {
        paras: [
          "ChatGPT can sketch a mood. It cannot be trusted with scale, a right-angle mark, a coordinate grid, or a labelled hypotenuse.",
        ],
        items: items([
          [
            "1",
            "What image generation is for",
            "A decorative hook on a slide. A scene that is not being measured. Never a figure students will read as true.",
          ],
          [
            "2",
            "What it gets wrong",
            "Right angles on the wrong vertex. Unequal ticks that look equal. Graphs that miss intercepts. Axes without scale.",
          ],
          [
            "3",
            "The right tool",
            "Desmos, GeoGebra or the GDC for graphs and constructions. Screenshot that. Put the screenshot on the slide or sheet.",
          ],
        ]),
        notes: "If you have a live miss saved, show it. Otherwise describe the right-angle-on-the-wrong-corner.",
      }),
      slide("avoid-aim", "Never trust a generated graph", {
        paras: [
          "A picture that looks like y = x² is not a graph of y = x² until a tool that does mathematics drew it.",
          "Do not",
          "Ask ChatGPT to ‘draw the graph of y = 2x + 1’ and paste it into a worksheet as the figure.",
          "Do this instead",
          "Plot it in Desmos or on the GDC. Screenshot. Crop. Add alt text. The mathematics came from a tool that graphs, not a tool that draws.",
        ],
        avoid:
          "Ask ChatGPT to ‘draw the graph of y = 2x + 1’ and paste it into a worksheet as the figure.",
        aim: "Plot it in Desmos or on the GDC. Screenshot. Crop. Add alt text. The mathematics came from a tool that graphs, not a tool that draws.",
        notes: "Department line: if students will measure it, count on it, or copy it, it was not generated.",
      }),
      slide("teach", "When a screenshot is better than a drawing", {
        paras: ["Match the tool to the job. ChatGPT can still help with the words around the figure."],
        items: items([
          [
            "1",
            "Graphs and loci",
            "Desmos or GDC. Then ask ChatGPT for three questions about that graph — you still check the intercepts.",
          ],
          [
            "2",
            "Geometry",
            "GeoGebra or a careful sketch. Do not let a generated triangle teach the Pythagorean setup.",
          ],
          [
            "3",
            "Uploaded photos of a board",
            "A photo of your own board, no students in frame, can be a prompt for ‘list the steps I wrote’. Still check them.",
          ],
        ]),
        notes: "Photos of a board: no faces, no names, no other class’s work in the frame.",
      }),
      slide("lens", "The image habit", {
        paras: [
          "Write in the booklet: one place you will use a generated image, and one place you will not.",
        ],
        items: items([
          ["check", "Decorative slide background or topic hook — maybe.", ""],
          ["check", "A figure on a worksheet, test, or investigation — no.", ""],
          ["check", "A graph students will read values from — Desmos / GDC only.", ""],
          ["check", "Alt text and contrast if any image does go on a slide.", ""],
        ]),
        notes: "Collect two spoken examples. Then move to the close — do not overrun the hour here.",
      }),
    ],
  },
  {
    id: "30",
    slug: "maths-close",
    title: "Department agreement and close",
    blurb: "What we will try, what we will not, and the booklet to the presenter.",
    strand: "capstone",
    duration: "10 min",
    slides: [
      slide("teach", "What we agree as a department", {
        paras: ["These are the lines for our maths desk after this hour."],
        items: items([
          ["1", "Teacher owns the maths", "Every calculation, method and figure is checked before it reaches a class."],
          ["2", "No names, no marks, no unseen tests", "Green material only until the school says otherwise."],
          ["3", "Files live in a Project", "Approved excerpts. Five-file cap. Never student work."],
          ["4", "Figures from tools that graph", "Desmos, GeoGebra, GDC. Generated images are not diagrams."],
        ]),
        notes: "Read the four as a department statement. Invite one amendment, not a debate.",
      }),
      slide("hands-on", "What I will try — and what I will not", {
        paras: [
          "This is the page the presenter keeps.",
          "4 min",
          "1.",
          "Write one thing you will try this week at the maths desk.",
          "2.",
          "Write one thing you will not do, even if it would be faster.",
          "3.",
          "Score the hour from 1 to 5 and one way it could improve.",
          "No real student personal data in the notes.",
        ],
        duration: "4 min",
        notes: "Stay on this slide until most booklets have something in both boxes.",
      }),
      slide("teach", "First 30 days at the maths desk", {
        paras: ["Four small habits. None of them require class data."],
        items: items([
          ["1", "Week 1", "One named Project for one unit. Instructions and never-rules. No student files."],
          ["2", "Week 2", "One SCOPE-V brief and a written verification pass on a retrieval starter."],
          ["3", "Week 3", "One worksheet or exit ticket you edited, plus a scaffold or extension that keeps the objective."],
          ["4", "Week 4", "One thing that failed, one thing you will not automate, next low-risk habit."],
        ]),
        notes: "Offer to look at one Project in CPT if that helps. Do not collect student work as evidence.",
      }),
      slide("hands-on", "Send your booklet to the presenter", {
        paras: [
          "Notes, how the hour felt, what you will try next, and how the course could improve — one pack, with your name on it.",
          "4 min",
          "1.",
          "Give an overall score from 1 to 5.",
          "2.",
          "Write how the session felt and one way the course could improve.",
          "3.",
          "Tap Send booklet to the presenter. You can update it if you think of more.",
          "No real student personal data in the notes.",
        ],
        duration: "4 min",
        notes:
          "Stay here until the room has sent. Certificates are ready in the date log for everyone whose booklet arrived.",
      }),
    ],
  },
];
