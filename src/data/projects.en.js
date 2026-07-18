export const projectsEn = [
{
  slug: "luniisync",
  category: "produit",
  title: "LuniiSync",
  eyebrow: "macOS & Windows · 9,99 €",
  description:
    "A macOS and Windows app for syncing MP3 stories onto a Lunii storytelling device. Drop your audio files into a folder and LuniiSync converts, encodes, and transfers them to the device automatically.",
  tags: ["Python", "PySide6", "macOS", "Windows", "Lunii"],
  links: [
    {
      label: "macOS · 9,99 €",
      href: "https://buy.stripe.com/dRm8wPcNd1Ob6o7byN6wE01",
      kind: "stripe",
      platform: "macos",
    },
    {
      label: "Windows · 9,99 €",
      href: "https://buy.stripe.com/14A14n3cDgJ5cMv7ix6wE02",
      kind: "stripe",
      platform: "windows",
    },
  ],
  content: {
    problem: "Lunii's storytelling device only plays stories bought through its official store. There's no simple tool for loading your own audio files onto it without going through complex technical workarounds.",
    solution: "LuniiSync automatically detects a Lunii device plugged in over USB, compares its contents with a local folder of MP3/M4A files, and syncs additions and removals. The app handles conversion, Lunii format encoding, and transfer, all in one click.",
    sections: [
      {
        title: "macOS distribution",
        body: "DMG signed and notarized by Apple: drag-and-drop install, no Gatekeeper warning. Compatible with Apple Silicon and Intel.",
      },
      {
        title: "Windows distribution",
        body: "Download and launch the app. Windows may show a SmartScreen warning on first launch (the exe isn't signed): click \"More info\" then \"Run anyway\".",
      },
      {
        title: "What's coming next",
        body: "The next version goes well beyond syncing. On the roadmap: deleting stories directly from the app, generating custom stories (topic, subject, child's age), and building tailor-made audio journeys.",
      },
    ],
  },
},
{
  slug: "okazcar",
  category: "produit",
  title: "OKazCar",
  eyebrow: "Chrome Extension · Free · Final version coming soon",
  description:
    "OKazCar analyzes car listings in one click on Leboncoin, La Centrale, AutoScout24, and ParuVendu. Reliability score, market price, useful alerts, AI-generated email to the seller, injected directly into the listing page. 178 brands, 3,200+ models, free.",
  tags: ["Chrome Extension", "Manifest V3", "React", "Firebase", "Built-in AI", "Vite"],
  links: [
    { label: "Website", href: "https://okazcar.com", kind: "live" },
    {
      label: "Chrome Web Store",
      href: "https://chromewebstore.google.com/detail/okazcar-analyse-annonces/eakomgkenllkkmfccjjfoegealnchmmo",
      kind: "store",
    },
  ],
  content: {
    problem: "Buying a used car is an obstacle course: dozens of listings across multiple platforms, prices that can double from one seller to the next, opaque histories. Most buyers end up deciding on gut feeling rather than data.",
    solution: "OKazCar injects a full analysis panel directly into listing pages: a reliability score across 12 criteria, real-time price positioning against the market, anomaly alerts, manufacturer recalls with official links, and a personalized AI-generated email to contact the seller.",
    sections: [
      {
        title: "Supported sites",
        body: "Leboncoin, La Centrale, AutoScout24 (12 countries), and ParuVendu. The extension works directly on each platform's listing pages: no need to copy-paste a URL.",
      },
      {
        title: "A serious database",
        body: "178 brands, 1,389 generations, 3,200+ models, ~546,000 versions catalogued from 2000 to 2026. The reliability score cross-references this data with manufacturer reliability history, Takata recalls, winter tire alerts (French mountain law), and signals of imports or disguised professional sellers.",
      },
      {
        title: "AI email to the seller",
        body: "OKazCar automatically generates a personalized email to send to the seller, based on the listing analysis. Negotiation points, relevant questions, the right tone, all in one click.",
      },
      {
        title: "Status",
        body: "Currently in final testing. The final version launches in a few weeks and will be free at first.",
      },
    ],
  },
},
{
  slug: "boites-a-livres",
  category: "produit",
  title: "Boîtes à Livres",
  eyebrow: "Volunteer · iOS · Android coming soon",
  description:
    "An app for mapping little free libraries around the world. 98,172 boxes recorded, 135 countries, 94,244 cities covered. Community contributions, real-time reporting, volunteer-run, no ads, no monetization.",
  tags: ["iOS", "Swift", "MapKit", "Android", "Volunteer"],
  links: [
    {
      label: "App Store",
      href: "https://apps.apple.com/fr/app/bo%C3%AEtes-%C3%A0-livres/id6768351762",
      kind: "store",
    },
  ],
  stats: {
    highlights: [
      { value: "98 172", label: "boxes" },
      { value: "135",    label: "countries" },
      { value: "94 244", label: "cities" },
      { value: "16 777", label: "photos" },
      { value: "99,9 %", label: "geocoded" },
    ],
    regions: [
      { flag: "🌍", name: "Europe",   count: "55 812", pct: "57 %" },
      { flag: "🌎", name: "Americas", count: "37 280", pct: "38 %" },
      { flag: "🌏", name: "Oceania",  count: "4 242",  pct: "4 %"  },
      { flag: "🌏", name: "Asia",     count: "261",    pct: "<1 %" },
    ],
    topCountries: [
      { flag: "🇺🇸", name: "United States",  count: "33 709" },
      { flag: "🇫🇷", name: "France",         count: "28 693" },
      { flag: "🇩🇪", name: "Germany",        count: "13 110" },
      { flag: "🇦🇺", name: "Australia",      count: "4 072"  },
      { flag: "🇳🇱", name: "Netherlands",    count: "3 212"  },
      { flag: "🇨🇦", name: "Canada",         count: "3 160"  },
      { flag: "🇬🇧", name: "United Kingdom", count: "2 473"  },
      { flag: "🇧🇪", name: "Belgium",        count: "1 538"  },
      { flag: "🇦🇹", name: "Austria",        count: "1 358"  },
      { flag: "🇨🇿", name: "Czech Rep.",     count: "1 035"  },
      { flag: "🇷🇺", name: "Russia",         count: "915"    },
    ],
  },
  content: {
    problem: "Little free libraries are everywhere: in cities, in forests, out in the countryside, but no tool makes them easy to find or contribute to. The project started from a simple observation: someone has to build the tool nobody else has built yet.",
    solution: "A native app that centralizes the map of little free libraries. Users add boxes, report moves or damage, and will soon be able to rate and comment. The database now covers more than 98,000 boxes across 135 countries, with 99.9% of points geocoded.",
    sections: [
      {
        title: "Native iOS, Android in the works",
        body: "The iOS app is available on the App Store (Swift + MapKit). A native Android version is being finalized and will launch soon: same experience, native code, no cross-platform compromises.",
      },
      {
        title: "Moderating community content",
        body: "The app includes a moderation system that meets App Store requirements: photos submitted by users go through validation before publication. It's a requirement for any app that allows user-generated content, and it's a responsibility taken seriously.",
      },
      {
        title: "Coming soon",
        body: "Ratings and comments per box, a native Android app. The project grows at the pace of its community: 98,000 boxes today, and counting.",
      },
      {
        title: "Why volunteer-run",
        body: "This project generates no revenue and never will. It exists because sharing books deserves a proper tool. It's my contribution to something bigger than code.",
      },
    ],
  },
},
{
  slug: "yzphotos",
  category: "produit",
  title: "YZPhotos",
  eyebrow: "iOS & iPadOS · Total privacy · App Store submission in progress",
  description:
    "YZPhotos sorts and cleans up multi-terabyte photo and video libraries on an external drive or NAS, without ever copying everything to the device. Tinder-style swipe to keep or trash, automatic duplicate detection, zero data collected.",
  tags: ["Swift", "SwiftUI", "iOS", "iPadOS", "GRDB", "SMB"],
  links: [],
  detailPath: "/YZPhotos",
  content: {
    problem: "A library of several hundred thousand photos and videos piled up on an external drive or NAS becomes impossible to sort through on an iPhone or iPad: you'd have to bring everything down locally first, which takes hours and fills up the device's storage.",
    solution: "YZPhotos connects directly to the USB-C drive or network share (SMB/NAS/Freebox) and streams the content, with no upfront copy. A Tinder-style gesture to keep or trash, duplicate detection via perceptual hashing, an instant, reversible deferred trash.",
    sections: [
      {
        title: "Speed over the network",
        body: "93,000 files scanned on a network drive in about 18 minutes, versus nearly 3 hours with a naive approach, thanks to a Swift 6 pipeline built on structured concurrency (async/await, TaskGroup).",
      },
      {
        title: "Zero data collected",
        body: "No account, no cloud, no tracker, no analytics. The entire app runs locally: it's an architectural choice, not a marketing promise.",
      },
      {
        title: "Status",
        body: "Used daily in-house for several months, stable over both USB-C and the network. The App Store release is in its final stages.",
      },
    ],
  },
},
{
  slug: "brickoff",
  category: "produit",
  title: "BrickOFF",
  eyebrow: "iOS · On-device AI · In development",
  description:
    "BrickOFF scans a pile of loose LEGO bricks with the camera and identifies every piece, part number, and color, using a custom-trained vision pipeline. The app rebuilds your inventory, then suggests which official sets you can already build.",
  tags: ["Swift", "SwiftUI", "CoreML", "PyTorch", "Vision", "iOS"],
  links: [],
  content: {
    problem: "Collectors and families pile up loose LEGO bricks without being able to make anything of them: there's no way to know which pieces you own, or which sets you can build without buying more.",
    solution: "A single photo is enough. BrickOFF detects every brick, identifies it by part number and color using a vision pipeline trained on more than a million images, then compares the resulting inventory against the official catalog to suggest buildable sets.",
    sections: [
      {
        title: "A custom-trained vision pipeline",
        body: "Detection (YOLO) and classification across roughly 1,000 part references, deterministic color identification in LAB space. The training set combines more than 1 million certified images with synthetic generation via Blender, which pushed detection recall from 18% to 51%.",
      },
      {
        title: "AI that fits in your pocket",
        body: "Model exported to CoreML (7.6 MB) and ONNX (14.9 MB) to run entirely on-device: no image is ever sent to a server. Classification: 82.5% top-1 / 98.1% top-5 on the test set, 89% top-1 on real-world photos.",
      },
      {
        title: "Status",
        body: "Actively in development: the scan, matching, and inventory pipeline is functional. The interface and App Store release are the next steps.",
      },
    ],
  },
},
{
  slug: "masterclaude-atelier",
  category: "projet",
  title: "MasterClaude & Claude Atelier",
  eyebrow: "Open-source tool · AI harness",
  description:
    "Claude Atelier (NPM plugins) is the foundation; MasterClaude is its autonomous runtime. Together, they form a complete harness for Claude Code: SessionStart/Stop/UserPrompt hooks, composable skills, a pre-push gate, local Ollama routing, automatic Copilot handoffs, and fine-grained context window management.",
  tags: ["Claude Code", "Node.js", "NPM", "LaunchAgent", "Hooks", "Ollama", "LLM", "Autonomy"],
  links: [
    { label: "Doc", href: "https://claude-atelier.vercel.app", kind: "live" },
    { label: "NPM", href: "https://www.npmjs.com/package/claude-atelier", kind: "store" },
    { label: "Code", href: "https://github.com/malikkaraoui/claude-atelier", kind: "code" },
  ],
  content: {
    problem: "Using Claude Code without a framework is like driving without a dashboard: you don't know how many tokens you're burning, context overflows without warning, PRs stay open for days, and the code never gets a second pair of eyes.",
    solution: "A complete harness built around Claude Code. Claude Atelier installs the hooks, skills, and agents. MasterClaude is the LaunchAgent daemon that runs in the background: it watches sessions, routes requests to local Ollama, manages Copilot handoffs, and keeps an eye on token consumption.",
    sections: [
      {
        title: "What the harness actually does",
        body: "On every session: automatic timestamping, active model detection, context window monitoring (alert at 50%). On every push: a 6-step pre-push gate (secrets, lint, tests, manifest drift). On every feature: a JSON handoff generated automatically, a PR created, Copilot review triggered, fixes applied, final merge with no manual intervention.",
      },
      {
        title: "Ollama routing, local LLM",
        body: "A Go proxy intercepts Claude requests and redirects lightweight tasks (exploration, lint) to Ollama. Sonnet handles features, Opus handles architectural decisions. Result: roughly 60% of tokens saved on long sessions.",
      },
      {
        title: "Pulse, multi-session monitoring",
        body: "Every Claude session writes a pouls.md file every 30 seconds (status, intensity, context window). A LaunchAgent watchdog checks that sessions are still alive and sends a Telegram alert if one gets stuck. The system supports several simultaneous sessions across different projects.",
      },
      {
        title: "Why open source",
        body: "This project was born out of a personal need, but it answers a universal question: how do you work with an LLM professionally without losing control? The NPM package lets anyone install the harness with a single command.",
      },
    ],
  },
},
{
  slug: "second-cerveau",
  category: "projet",
  title: "Second Brain",
  eyebrow: "Obsidian vault · Local AI · Personal safe",
  description:
    "An Obsidian vault becomes the encrypted repository for an entire digital life: notes, YouTube links, sketches, emails, audio, text message threads, then opens up to your LLMs through a fully local hybrid search engine. Your augmented memory, with no cloud.",
  tags: ["Obsidian", "Python", "Ollama", "RAG", "BM25", "Embeddings", "DOCX/PDF"],
  links: [
    { label: "Code", href: "https://github.com/malikkaraoui/LOCAL.IA.GENERATED_COMPTE_RENDU", kind: "code" },
  ],
  content: {
    problem: "Our thoughts live in ten places at once: orphaned Markdown notes, YouTube links never watched again, photos of sketches buried in the Camera Roll, important emails lost in the pile, forgotten voice memos, text threads that hold crucial decisions. We spend hours hunting for thoughts we've already had. And when we talk to an LLM, it starts from zero: it knows nothing about us.",
    solution: "The Obsidian vault is a digital safe: a local, encrypted folder that centralizes everything that makes up your thinking. Structured Markdown notes, annotated links, images, PDFs, audio transcripts, text message exports. A hybrid search engine (BM25 plus vector embeddings via Ollama) indexes the entire vault locally. Your LLM of choice (Mistral, Ollama, Claude via API) queries this vault like a long-term memory. It knows what you've read, thought, decided. Without a single piece of data ever leaving your machine.",
    sections: [
      {
        title: "The vault as an externalized brain",
        body: "Obsidian isn't just a note editor: it's a knowledge graph. Every note is a node, every link between notes is a synapse. Over five years of heavy use, a vault accumulates thousands of connections: a 2021 idea linked to a 2024 article, a captured conversation that answers today's problem. The vault ends up richer than biological memory because it forgets nothing and everything is searchable.",
      },
      {
        title: "What the vault absorbs",
        body: "Personal and professional reflection notes. YouTube links with annotated summaries. Photos of sketches and whiteboards (local OCR). Exports of important emails. Voice memo transcripts (local Whisper). Excerpts from SMS or iMessage conversations. Photographed pages from books. Everything lands in the same Markdown graph: unified, searchable, connected.",
      },
      {
        title: "Hybrid search engine: BM25 plus vectors",
        body: "Classic full-text search (BM25) finds exact matches. Vector embeddings (nomic-embed-text via Ollama) find meaning: a note about \"decision fatigue\" surfaces when you search for \"too many choices are paralyzing.\" Combining both gives surgical precision across thousands of notes. The index is recomputed incrementally with every change to the vault.",
      },
      {
        title: "LLM interface: your memory becomes its context",
        body: "In every session, the LLM receives the most relevant chunks from the vault directly in its context. It can quote your own notes, pick up a train of thought started six months ago, or connect two ideas you'd never linked together. The result: a conversational partner that actually knows you, with no subscription, no cloud profile, no data handed over.",
      },
      {
        title: "Document generation: reports and summaries",
        body: "The pipeline goes further than conversation alone. Starting from a set of source notes, Ollama generates a structured report (write-up, summary, synthesis), and python-docx or ReportLab produces the final document as DOCX or PDF. A direct use case: healthcare professionals generate their follow-up reports in seconds from consultation notes, GDPR-compliant, with no data ever leaving the machine.",
      },
    ],
  },
},
{
  slug: "tom-protocol",
  category: "projet",
  title: "ToM Protocol",
  eyebrow: "P2P protocol · Phase 3 underway",
  description:
    "ToM is a decentralized transport protocol: every device becomes a node on the network. No central servers, no dependence on platforms. In July 2026, two people exchanged their first direct peer-to-peer messages, from a cellular relay all the way to intermediary-free IPv6, end-to-end encrypted, through native iOS, macOS, and tvOS apps.",
  tags: ["Rust", "TypeScript", "Swift", "QUIC", "P2P", "E2E Crypto", "NAT Traversal", "Freebox OS"],
  links: [
    { label: "Code", href: "https://github.com/malikkaraoui/ToM-protocol", kind: "code" },
    { label: "Medium", href: "https://medium.com/@karaoui.malik", kind: "article" },
  ],
  content: {
    problem: "Every message we send passes through servers we don't control. An operator can cut off a conversation, read the metadata, or simply go down. The network's resilience depends on the goodwill of a handful of centralized players.",
    solution: "ToM Protocol is a P2P transport layer where devices connect directly over QUIC with automatic NAT traversal. Identity is cryptographic (Ed25519), messages are encrypted and signed (XChaCha20-Poly1305), with no central PKI. Every node is both a client and a potential relay.",
    sections: [
      {
        title: "Development phases",
        body: "Phase 1 (TypeScript, WebRTC): 8 out of 8 epics delivered: complete protocol stack, developer SDK, a multiplayer P2P Snake demo in the browser. Phase 2 (Rust, QUIC): native transport validated: 100% NAT traversal, E2E encryption, group messaging with hub failover. Phase 3 underway: convergence of the two stacks, plus a new layer of native Apple apps (iOS, macOS, tvOS) already deployed on a real fleet of devices. What's next (R13+) targets automatic port forwarding for self-hosting: wider public distribution is gated on that step.",
      },
      {
        title: "Real-world test results",
        body: "Stress test on the A40 highway (France to Switzerland): 99.85% reliability across 2,752 pings, 54 minutes straight, tunnels and cell handoffs included. NAT traversal: 100% success on LAN, 4G CGNAT, and a Geneva-school-to-French-Freebox cross-border link. Direct post-hole-punch latency: 27 to 49 ms. The automated test suite keeps growing on both the TypeScript and Rust sides, now complemented by a new \"chaos\" test bench built on fault injection rather than just the happy path.",
      },
      {
        title: "The direct P2P milestone between two people",
        body: "On July 17, 2026, two people exchanged encrypted messages in direct peer-to-peer mode: first through a relay over the cellular network, then over a direct IPv6 connection, with no intermediary server at all. A symbolic milestone for a protocol designed to be sovereign from day one.",
      },
      {
        title: "Native apps: tvOS, iOS, macOS",
        body: "On top of the Rust transport, a layer of native apps (SwiftUI, MVVM architecture) runs across a fleet of five personal devices: Mac, iPad, iPhone, Apple TV. The Rust-to-Swift bridge goes through an auto-generated xcframework FFI.",
      },
      {
        title: "Reliability, speed, and security",
        body: "A node's reconnection time dropped from 45 seconds to 2 minutes down to under a second; the full fleet's reconnection time dropped to under 18 seconds (release 2.1.0). A 25.5-hour endurance test pushed through roughly 74,000 messages with no restart or crash. On the security side, a full red-team exercise targeted the proof-of-presence layer: Sybil resistance, witness quorum, anti-DoS caps, neutralizing all 6 attack scenarios tested.",
      },
      {
        title: "Freebox and group messaging",
        body: "The NAS built into the Freebox Delta (ARM64 Cortex-A72, Debian) runs as a permanent node on the network. Group messaging uses \"virus-like\" replication: a primary hub, a shadow watchdog that takes over in about 6 seconds if the primary disappears, and a deterministic candidate ready to step up as shadow. No consensus, no split-brain.",
      },
      {
        title: "Tech stack",
        body: "Rust (QUIC via iroh, tokio async runtime, MessagePack, XChaCha20-Poly1305, HKDF-SHA256) for the native transport. TypeScript (WebRTC DataChannel, TweetNaCl.js, XSalsa20-Poly1305) for the Phase 1 browser stack. Swift/SwiftUI for the native Apple app layer, connected to the Rust core via an xcframework FFI. Static ARM64 cross-compilation (cargo-zigbuild) for NAS devices and Raspberry Pi.",
      },
    ],
  },
},
{
  slug: "aieteck",
  category: "projet",
  title: "AïeTeck",
  eyebrow: "Podcast",
  description:
    "AïeTeck is my podcast about artificial intelligence: news, reflections, and real-world use cases. Short episodes to understand where AI is taking us.",
  tags: ["Podcast", "Artificial Intelligence", "Tech"],
  links: [
    { label: "Spotify", href: "https://open.spotify.com/show/2uDQQaXYtkgeEtCYDoXcLs", kind: "spotify" },
    { label: "Apple Podcasts", href: "https://podcasts.apple.com/fr/podcast/a%C3%AFeteck/id1893943595", kind: "apple-podcast" },
  ],
  content: {
    problem: "AI moves so fast that even practitioners struggle to keep up. Most content out there is either too technical or too shallow.",
    solution: "Short episodes (10 to 20 minutes), grounded in real practice. I talk about what I'm actually experimenting with, not what I've read. Every episode is an actionable reflection.",
    sections: [
      {
        title: "Format",
        body: "Solo or as a conversation. No fixed script: one idea, one thread, one takeaway. Available on Spotify and Apple Podcasts.",
      },
    ],
  },
},
{
  slug: "pizzaella",
  category: "projet",
  title: "Pizzaella.fr",
  eyebrow: "SaaS",
  description:
    "A SaaS platform built for pizzerias and food trucks. Manage orders, payments, and deliveries from a single interface to simplify multi-location online sales.",
  tags: ["React", "Firebase", "Vite", "Stripe"],
  links: [
    { label: "Code", href: "https://github.com/malikkaraoui/PLANIZZA-", kind: "code" },
    { label: "Live", href: "https://pizzaella.fr", kind: "live" },
  ],
  content: {
    problem: "Independent pizzerias and food trucks juggle several disconnected tools: a register for in-person sales, a third-party tool for click-and-collect, nothing for deliveries. Complexity eats the margin.",
    solution: "A unified SaaS platform: an online ordering interface, a real-time management dashboard, Stripe integration for payments, delivery zone management. One tool for everything.",
    sections: [
      {
        title: "Stack",
        body: "React + Vite for the front end, Firebase (Firestore + Auth + Hosting) for the real-time backend, Stripe for payments. Serverless architecture to keep costs to a minimum.",
      },
      {
        title: "What I learned",
        body: "Designing a SaaS product for non-technical users forces you to strip things down to the essentials. Every bit of friction in the interface is a lost order. This project taught me to prioritize UX over features.",
      },
    ],
  },
},
{
  slug: "marepublic",
  category: "projet",
  title: "MaRepublic",
  eyebrow: "Civic platform · React/Firebase · Live",
  description:
    "MaRepublic is an open political debate platform: every measure is a card that can be voted on and commented on, by citizens and by their AI agents alike. No showcase, no black box, more than 800 proposals already live, each one inspired by a country where it already works.",
  tags: ["React", "Vite", "Firebase", "Civic-tech"],
  links: [
    { label: "Website", href: "https://marepublique-2027.web.app", kind: "live" },
    { label: "Code", href: "https://github.com/malikkaraoui/MaRepublic", kind: "code" },
  ],
  content: {
    problem: "Political platforms remain static showcases: you discover them, you don't get to debate them, and once voted in they don't move again until the next election.",
    solution: "MaRepublic builds a platform like open-source software: every measure is a versioned draft that citizens and their AI agents alike can vote on and comment on, with a public vote counter aggregated continuously. No measure is ever final: everything stays open to discussion.",
    sections: [
      {
        title: "How a measure gets written",
        body: "Every proposal is documented with its source: a country where it's already been applied, along with its results. Several hundred cards spread across nearly 90 topics, continuously updated.",
      },
      {
        title: "Frictionless participation",
        body: "A matching flow to pinpoint your political leanings, a shareable image generator, one-click bug reporting with automatic daily triage of technical reports; sensitive topics are always handled manually.",
      },
      {
        title: "Stack",
        body: "React + Vite for the front end, Firebase (Firestore + Auth + Hosting) for the backend, pseudonymized email-link authentication.",
      },
    ],
  },
}
]

export function getProjectBySlugEn(slug) {
  return projectsEn.find((p) => p.slug === slug) ?? null
}
