// Every fact on the site lives here. Numbers come from the resume, the project
// READMEs, and the Codeforces / LeetCode / CodeChef profiles as of 6 Nov 2026.

export const CHECKED_ON = "6 Nov 2026"

export const person = {
  name: "Ali Ansari",
  email: "lycanalan205@gmail.com",
  location: "Jaipur, India (IST, UTC+5:30)",
  resume: `${import.meta.env.BASE_URL}Ali_Ansari_Resume.pdf`,
  availability:
    "Open to a 6-month internship (Jan to Jun 2027) and full-time SDE roles from mid 2027.",
}

export const links = {
  github: "https://github.com/LycanAlan",
  linkedin: "https://www.linkedin.com/in/ali-ansari-5924ab21b/",
  codeforces: "https://codeforces.com/profile/LycanAlan",
  leetcode: "https://leetcode.com/u/LycanAlan/",
  codechef: "https://www.codechef.com/users/lycanalan",
  source: "https://github.com/LycanAlan/LycanAlan.github.io",
}

export type Bar = { label: string; value: number; display: string }

export type Measure =
  | { kind: "compare"; what: string; before: Bar; after: Bar }
  | { kind: "single"; items: { value: string; label: string }[] }

export type Project = {
  name: string
  when: string
  context?: string
  stack: string[]
  summary: string
  measure?: Measure
  facts: string[]
  links: { label: string; href: string }[]
  flagship?: boolean
}

export const projects: Project[] = [
  {
    name: "Distributed Rate Limiter",
    when: "Nov 2026",
    flagship: true,
    stack: ["C++17", "epoll", "Redis", "Lua", "Consistent hashing"],
    summary:
      "An HTTP gateway that enforces one rate limit across several nodes. Each node is a single-threaded epoll loop. The shared count lives in Redis, updated by atomic Lua scripts and sharded with a consistent hash ring.",
    measure: {
      kind: "compare",
      what: "Requests let through a limit of 100, across 3 nodes",
      before: { label: "GET then SET", value: 600, display: "600" },
      after: { label: "Atomic Lua script", value: 100, display: "100" },
    },
    facts: [
      "Killed a Redis shard under 500 req/s. Circuit breakers opened on every node in 222 ms, with 0 failed requests.",
      "One gateway thread proxies 20k req/s with a Redis script on every request. Hybrid leasing takes that to 27k and keeps the shared limit.",
      "100 virtual nodes per shard: adding a fourth shard moves about a quarter of the keys, where hash % N would move three quarters.",
    ],
    links: [
      { label: "Code", href: "https://github.com/LycanAlan/Distributed-Rate-Limiter" },
    ],
  },
  {
    name: "PitchLens",
    when: "Aug 2026",
    flagship: true,
    stack: ["Python", "LangGraph", "FAISS", "BM25", "Gemini Vision", "FastAPI", "Docker"],
    summary:
      "Question answering over startup pitch decks. 65% of the pages in 19 real decks had no text layer, so a normal chat-with-your-PDF pipeline read nothing from most of them. PitchLens sends each page to the text layer or to a vision model, whichever can read it.",
    measure: {
      kind: "compare",
      what: "Decks a pipeline can actually read, out of 19",
      before: { label: "Text layer only", value: 4, display: "4" },
      after: { label: "Per-page routing", value: 19, display: "19" },
    },
    facts: [
      "Hybrid BM25 + FAISS retrieval with a cross-encoder re-ranker: Recall@3 went from 0.76 to 0.94 on 72 questions I labelled by hand.",
      "A corpus-fingerprint cache cut cold start from 3.9 s to 0.036 s, 109 times faster.",
      "A LangGraph loop grades what it retrieved and rewrites the query when the answer isn't there.",
    ],
    links: [{ label: "Code", href: "https://github.com/LycanAlan/PitchLens" }],
  },
  {
    name: "Micromouse",
    when: "2025",
    context: "3 national 1st places",
    stack: ["C++", "RP2040", "PID control", "Flood fill"],
    summary:
      "A 10 × 8 cm robot that maps a maze on its own and races the shortest path. It runs the same flood fill as the maze at the top of this page.",
    measure: {
      kind: "compare",
      what: "Time to read the IR wall sensors, in µs",
      before: { label: "Official library", value: 300, display: "300" },
      after: { label: "My C++ driver", value: 20, display: "20" },
    },
    facts: [
      "1st at IIT Roorkee Cognizance '25, DTU Invictus '25 and BITS Pilani Apogee '25.",
      "PID control on MPU6050 gyro data for 90 ± 0.1° turns.",
      "Interrupts, hardware timers and both RP2040 cores keep the sensing and control loops apart.",
    ],
    links: [{ label: "Code (team repo)", href: "https://github.com/paramveer5404/MicroMouse" }],
  },
  {
    name: "Panchayat",
    when: "Sep 2026",
    context: "AWS Agents for Humans hackathon",
    stack: ["Python", "Strands Agents", "Bedrock AgentCore", "A2A"],
    summary:
      "An agent mesh for neighbourhood complaints. One household types one line. Panchayat finds the office that owes the duty, with the statute that says so, drafts a complaint a person signs, files it and keeps watching the deadline.",
    measure: {
      kind: "single",
      items: [
        { value: "100 s", label: "from signature to ticket number, on the deployed stack" },
        { value: "10 s", label: "to merge a second household's report into one case" },
      ],
    },
    facts: [
      "Jurisdiction comes from a curated table, never from the model. An unknown street gets a question, not a guess.",
      "A watchdog agent escalates a tier on the day a statutory deadline is missed.",
    ],
    links: [
      { label: "Live", href: "https://pcvsce443opuo4ma4wayk4bogi0btrkj.lambda-url.ap-south-1.on.aws/" },
      { label: "Demo video", href: "https://youtu.be/8PZwcGsHFJ8" },
      { label: "Code", href: "https://github.com/LycanAlan/Panchayat" },
    ],
  },
  {
    name: "Dispute Autopilot",
    when: "Sep 2026",
    context: "Razorpay AI Buildathon",
    stack: ["Python", "LightGBM", "Isotonic calibration", "LLM drafting"],
    summary:
      "Chargeback defence for Razorpay merchants. It scores each transaction's chargeback risk, keeps evidence when that is worth paying for, and contests a dispute only when the expected value says so.",
    measure: {
      kind: "compare",
      what: "Brier score on 118,108 held-out transactions (lower is better)",
      before: { label: "Raw LightGBM", value: 0.078, display: "0.078" },
      after: { label: "Calibrated", value: 0.024, display: "0.024" },
    },
    facts: [
      "ROC-AUC 0.87 on a temporal split, with precision, recall and calibration published. Commercial tools only publish win rates.",
      "Every claim in 20 drafted responses traced back to stored evidence. When the evidence is missing, it refuses to contest.",
    ],
    links: [
      { label: "Live", href: "https://lycanalan.github.io/Dispute-Autopilot/" },
      { label: "Code", href: "https://github.com/LycanAlan/Dispute-Autopilot" },
    ],
  },
  {
    name: "VoidCart",
    when: "Jul 2026",
    stack: ["MongoDB", "Express", "React", "Node.js", "Redux Toolkit"],
    summary:
      "A full-stack store with an admin dashboard, JWT auth, Redux cart state, Cloudinary image uploads and Razorpay payments, shipped as a single service on Render.",
    facts: [],
    links: [
      { label: "Live", href: "https://voidcart-frontend.onrender.com" },
      { label: "Code", href: "https://github.com/LycanAlan/VoidCart" },
    ],
  },
]

export const record = {
  semesters: 6,
  classSize: 142,
  degree: "B.Tech, Electronics and Communication Engineering",
  school: "The LNM Institute of Information Technology, Jaipur",
  cgpa: "8.70",
  graduating: "May 2027",
  wins: [
    { event: "Cognizance '25", host: "IIT Roorkee" },
    { event: "Invictus '25", host: "DTU" },
    { event: "Apogee '25", host: "BITS Pilani" },
  ],
  solved: [
    { site: "Codeforces", count: 667 },
    { site: "LeetCode", count: 218 },
    { site: "CodeChef", count: 187 },
  ],
}

export const profiles = [
  {
    site: "Codeforces",
    handle: "LycanAlan",
    rating: "1406",
    title: "Specialist",
    detail: "76 rated contests. Best rank 1293 in Round 1017.",
    href: links.codeforces,
  },
  {
    site: "LeetCode",
    handle: "LycanAlan",
    rating: "1882",
    title: "Knight",
    detail: "Top 5.3% of contest takers.",
    href: links.leetcode,
  },
  {
    site: "CodeChef",
    handle: "lycanalan",
    rating: "1654",
    title: "3 star",
    detail: "19 rated contests.",
    href: links.codechef,
  },
  {
    site: "GitHub",
    handle: "LycanAlan",
    rating: "",
    title: "",
    detail: "Every project on this page, with its benchmarks.",
    href: links.github,
  },
]

export const principles = [
  {
    title: "Measure first",
    body: "I don't trust a change I haven't checked. Every project here ships with a benchmark, a held-out test set or a failure drill, and the write-ups say where the numbers are weak.",
  },
  {
    title: "Go one layer down",
    body: "When the Micromouse sensor library was too slow, I wrote my own driver and cut reads from 300 µs to 20 µs. I'd rather understand the layer underneath than work around it.",
  },
]

export const timeline = [
  { when: "Sep 2023", what: "First rated Codeforces contest. 1,000+ problems since." },
  { when: "Aug 2024", what: "Teaching assistant for the first-year programming lab." },
  { when: "2025", what: "Micromouse: embedded C++ on the RP2040, three national 1sts." },
  { when: "Jul 2026", what: "VoidCart: full-stack MERN with payments." },
  { when: "Aug 2026", what: "PitchLens: multimodal retrieval, measured end to end." },
  { when: "Sep 2026", what: "Dispute Autopilot and Panchayat: calibrated ML, then agents on AWS." },
  { when: "Nov 2026", what: "Distributed rate limiter: C++17, epoll and Redis." },
]

export const toolbox = [
  { area: "Languages", items: "C++, Python, JavaScript, SQL" },
  { area: "Systems", items: "epoll, Redis, Lua, Docker, Linux" },
  { area: "ML and retrieval", items: "LangGraph, FAISS, BM25, LightGBM, FastAPI" },
  { area: "Web", items: "React, Node.js, Express, MongoDB, Tailwind" },
  { area: "Embedded", items: "RP2040, PID control, interrupts and timers" },
  { area: "Foundations", items: "DSA, OOD, DBMS, networks, operating systems" },
]

export const experience = [
  {
    role: "Teaching Assistant, Programming for Problem Solving Lab",
    org: "LNMIIT Jaipur",
    when: "Aug to Nov 2024",
    body: "Helped first-year students debug and speed up their code in lab sessions, 3+ hours a week.",
  },
  {
    role: "Member, Phoenix (the robotics club of LNMIIT)",
    org: "LNMIIT Jaipur",
    when: "Dec 2023 to Aug 2025",
    body: "Co-ran Roborace and Robosoccer at the college tech fest for 1,000+ participants. Wrote the challenges and problem statements and ran the events on Unstop.",
  },
]
