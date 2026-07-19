export const postsEn = [
{
  slug: "brickoff-genese-methode-resultats",
  title: "BrickOFF: genesis, method, results",
  date: "2026-07-19",
  summary: "1.03 million images, a two-stage vision pipeline that runs 100% on the phone, and recall that jumps from 18% to 51% on a real pile of loose LEGO. The genesis, method, and measured results of BrickOFF.",
  tags: ["BrickOFF", "Computer Vision", "CoreML", "Machine Learning", "iOS"],
  content: [
    {
      type: "lead",
      body: "BrickOFF starts from a very concrete frustration: a pile of loose LEGO, yours or the kind thousands of people have sitting in bins of salvaged, inherited, mixed-up parts, is a useless asset. Nobody wants to sort 3,000 pieces by hand just to find out what they can build.",
    },
    {
      type: "section",
      title: "1. Genesis and vision",
      body: "The idea: an app that scans the pile with the camera, identifies each piece (part number and color) 100% on-device, 100% offline (no photo ever leaves the device, the AI runs entirely on the phone), then suggests builds you can actually make with exactly what you have, and guides you step by step like an official instruction booklet.\n\nTarget platforms: iOS and Android, iOS first (V1) to prove out the vision pipeline on a homogeneous device fleet before doubling the surface. Monetization: free, ad-supported, a product decision locked in on July 4.\n\nRoadmap: V1 scan, inventory, official sets you can build (offline Rebrickable catalog); V1.5 blueprints tailored to the pieces you own with step-by-step guidance; V2 Android; V3 free-form generation of original plans by on-device AI (Go/No-Go spike).",
    },
    {
      type: "section",
      title: "2. The technical approach",
      body: "The vision pipeline runs in two stages, entirely on-device: the camera first detects the pieces in the pile (single-class detection), then each cropped piece goes through a classifier that recognizes it among roughly 1,000 part numbers, before color identification in LAB space (deterministic). The resulting inventory is stored locally (SQLite) and compared against the Rebrickable catalog.\n\nWhy separate detection from classification instead of a single 1,000-class detector: single-class detection maximizes recall (missing no piece in the pile), classification then looks at each piece in close-up for fine-grained precision, and the two models improve independently.\n\nArchitecture choice (decision D11, locked in on 07/07 after 8 runs): SSDLite320-MobileNetV3 (torchvision, permissive BSD-3 license), picked as a simple starting baseline, promoted to production candidate after proving itself end to end. YOLOX and RT-DETR remain an escalation option if real-world targets aren't met.",
    },
    {
      type: "table",
      title: "Ultra-light budget (decision D04)",
      rows: [["Detector (.mlpackage)", "≤ 15 MB"], ["Classifier (.mlpackage)", "≤ 25 MB"], ["Palette + configs", "< 1 MB"], ["Rebrickable database (SQLite)", "≤ 80 MB"], ["Total assets", "≤ 120 MB"], ["Installed app (IPA)", "< 350 MB"]],
    },
    {
      type: "section",
      title: "Result measured to date",
      body: "CoreML export of the detector at 7.6 MB, half the budget, with bit-exact parity against the original PyTorch model. The classifier weighs around 22 MB before quantization.\n\nTraining infrastructure: a MacBook Pro M1 with 16 GB, locally, via PyTorch MPS (Metal). No cloud; the escalation criterion (projecting more than 48h for a full run) was never triggered. Detection runs take 4 to 7 minutes per epoch, classification 1 to 2 hours per epoch.",
    },
    {
      type: "section",
      title: "3. What's done",
      body: "Legal (~95%): licenses verified (Rebrickable OK for commercial use, LDraw CC BY), BrickOFF trademark clear (zero conflict on TMview/EUIPO/USPTO), zero patent risk for the V1.5 blueprint approach (two dated guardrails: no automatic disassembly steps before 2028, no camera-overlaid AR before 2032).\n\nDataset: 1.03 million certified images (real and synthetic sources), audited, converted to YOLO format with both numerical and visual validation.\n\nTraining: detector and classifier both functional (details in the training log below).\n\nMobile export (dry run): CoreML at 7.6 MB and ONNX at 14.9 MB, perfect parity between the two formats (IoU 1.000 across 50 images), so the Android path is already technically proven.\n\niOS: navigation, camera permission, 22 passing tests, GitHub Actions CI.\n\nScan pipeline: camera, multi-frame aggregator, and review screen wired to the inventory (92 tests), all that's missing is wiring in the real models (the mock currently runs).\n\nInventory: local database persistence, scan cancellation, functional screen (48 tests).",
    },
    {
      type: "section",
      title: "4. The training log: what worked, what we learned",
      body: "This is the technical heart of the project, and its most interesting narrative thread.",
    },
    {
      type: "table",
      title: "Detection run progression",
      rows: [["det_v0 (05/07)", "0.679", "A mixed validation set (renders + photos) fools the automatic stopping criterion"], ["det_v0.1 (05/07)", "0.763", "Bugfix: horizontal flip wasn't flipping the boxes. Clean supervision is worth more than anything else (+8.4 pts from a single fixed bug)"], ["det_v1 (05/07)", "0.773", "Max recall 0.985: the model sees the pieces, it lacks confidence"], ["det_v2C (06/07)", "0.666", "Blender synthetic only, zero real photos: the renders do transfer to the real world"], ["det_v2A ⭐ (06/07)", "0.820", "70% real / 30% synthetic mix: the reference recipe, validated ever since"], ["det_v3 (06/07)", "0.826", "+ ±45° rotations and crop-zoom: best operational recall measured yet"], ["det_v4 (09/07)", "0.802", "Reveals that the test judge was measuring the wrong case: on a real dense pile, the previous champion found only 20% of the pieces"], ["det_v4b ⭐ (10/07)", "0.822 single-piece", "Current champion, properly judged on holdout: recall on dense piles goes from 18% to 51% (×2.8)"]],
    },
    {
      type: "section",
      title: "What the trajectory tells us",
      body: "Overall trajectory: 0.679 to 0.826 mAP over 4 days, every gain traced back to its exact cause.\n\nThe most transferable lessons: clean supervision (a bugfix) pays off more than any fine-tuning; the stopping metric has to look at the real target, not a flattering average; synthetic data measurably works, and diversity matters more than perfect photorealism (a human reviewer could barely tell real from fake, yet the model still learned); and the real trap was methodological, not technical: the first test set (scattered photos) didn't represent the real product case (a dense pile of 50 overlapping pieces). Once the right judge was built (a clean holdout, never trained on), real progress showed up: recall on a dense pile going from 18% to 51%.\n\nClassification (1,000 part numbers): about 30 hours of M1 compute total, stopped deliberately at epoch 24 since targets had already been cleared since epoch 19, 82.5% top-1 / 98.1% top-5 on the synthetic test set (80/95 targets cleared), 89.2% top-1 on real photos. The remaining confusions are almost all mold variants of the same piece, not vision errors but ambiguities in the catalog itself, which will be merged into functional groups.",
      image: {
        src: "/brickoff/verif-annotations.jpg",
        alt: "Grid of real photos with each detected piece outlined in a red box, including distractors (pen, cable, clothespin)",
        caption: "Detector verification on real photos, with deliberate distractors to test for false positives.",
      },
    },
    {
      type: "section",
      title: "5. Blender modeling",
      body: "Lacking enough real photos of dense piles (the real-world corpus found, Gdańsk UT, is 82% single-piece, with almost no occlusion scenes), the project generates its own pile scenes in Blender.\n\nEngine: Blender 5.1.2, headless EEVEE rendering, on the same MacBook M1. Scripted LDraw import: 0.05s per piece, a catalog of 24,299 available pieces. Automatic annotation via Cryptomatte: a per-piece mask extracted straight from the render itself (guaranteed alignment), a bbox emitted if at least 25% of the piece is visible, the 10-25% zone flagged as a borderline case. Measured throughput: 100 scenes in 260 seconds.\n\nTwo production runs: v1 with 10,000 scenes in about one machine-day, then v2.1 (the current batch) with 12,000 scenes and 342,541 annotated pieces, generated overnight (about 13 hours of M1 compute). Composition: 28% monochrome scenes, very dense scenes (46 pieces or more), background-only shots as pure negatives, scenes with non-LEGO distractors, 0 to 75 pieces per scene (median 29).\n\nRealism: matte or worn plastic, casual household lighting, auto-exposure simulating how a phone behaves, CC0 HDRIs and textures, distractors (pen, coin, cable) to teach the model to ignore table clutter. Winning recipe: the same 70% real / 30% synthetic mix per epoch, validated first in detection, carried over unchanged to classification.",
      image: {
        src: "/brickoff/synth-render.jpg",
        alt: "Grid of synthetic Blender scenes of LEGO piles on different floors (tile, hardwood, plain)",
        caption: "Synthetic v2.1 scenes: varied floors, non-LEGO distractors, different pile densities.",
      },
    },
    {
      type: "section",
      title: "6. The most important thing we learned",
      body: "Supervision matters more than architecture: a horizontal-flip bug cost more points than a model change did.\n\nThe test judge has to resemble the final product, not the dataset you happen to have. The first proven gain (det_v4) turned out to be a train/test leakage artifact; a dedicated holdout set (4 piles never trained on) had to be built to get a clean proof.\n\nSynthetic data transfers, even without perfect realism: diversity (angles, densities, lighting) matters more than photorealism.\n\nThe product's real bottleneck isn't vision, it's calibration: the model sees almost everything (max recall close to 1.0) but lacks confidence at the decision threshold, hence the strategy adopted: a low threshold (0.20-0.25) and voting across multiple video frames, already coded on the iOS side.",
    },
    {
      type: "section",
      title: "7. What's left to do",
      body: "Verdict on real piles: about 100 real photos of actual piles (10 to 40 pieces) still need to be taken, the only final judge that really counts.\n\nImprove localization precision on dense piles: recall has exploded, but bounding-box precision on overlapping pieces remains the next project.\n\nMerge functional groups of interchangeable pieces (equivalent molds).\n\nWire the real models into the iOS pipeline (currently: mock).\n\nMatching against the Rebrickable catalog, UI/UX, beta QA, then release.",
      image: {
        src: "/brickoff/piles-preannotation.jpg",
        alt: "Grid of dense LEGO pile photos before annotation, showing overlapping pieces",
        caption: "The next project: bounding-box precision on dense piles where pieces overlap.",
      },
    },
  ],
},
{
    "slug": "tom-protocol-rapport-avancement-2026-07",
    "title": "ToM Protocol: Technical Progress Report",
    "date": "2026-07-18",
    "summary": "765 commits, 117 builds, a serverless P2P protocol running on a real fleet of 6 devices. Measured milestones, field bugs recounted in detail, a test harness that verifies guarantees rather than stopwatches, and the walls that remain.",
    "tags": [
      "ToM Protocol",
      "Rust",
      "P2P",
      "Progress Report",
      "LLM-first"
    ],
    "content": [
      {
        "type": "lead",
        "body": "765 commits, 117 versioned builds, a masterless network still standing. Written from the workshop on July 18, 2026, with Claude Fable 5. A writing rule inherited from the project: a milestone is only \"done\" once it's measured on the real fleet, never on a green proxy. Every number in this article has a source: a commit, a log, a code file, an instrumented campaign."
      },
      {
        "type": "table",
        "title": "TL;DR: today's numbers",
        "rows": [
          [
            "Repo birth",
            "February 2, 2026",
            "git log --reverse"
          ],
          [
            "Commits",
            "765",
            "git log (18/07)"
          ],
          [
            "Versioned builds",
            "117 (real fleet at 107)",
            "TomVersion.swift"
          ],
          [
            "Workspace Rust code",
            "~150 000 lines",
            "crates/ count"
          ],
          [
            "Tests",
            "~990 Rust (counted 22/06, growing) + 771 TypeScript legacy",
            "CLAUDE.md"
          ],
          [
            "Real fleet",
            "6 nodes: Mac, iPad, iPhone x2, Apple TV, NAS ARM64",
            "18/07 campaign"
          ],
          [
            "18/07 campaign",
            "1809 messages delivered, 0 final loss, 0 crashes",
            "instrumented report"
          ],
          [
            "Large transfers",
            "64 MB delivered at ~6 MB/s, E2E encrypted",
            "fleet measurement"
          ],
          [
            "Re-mesh after SIGKILL",
            "8 seconds (Apple TV killed mid-traffic)",
            "18/07 campaign"
          ],
          [
            "Cold reconnection",
            "node < 1s, full fleet 18s",
            "16/07 night measurements"
          ],
          [
            "Red team",
            "5 DoS classes closed, 6/6 PoP kill-shots closed",
            "vault + commits"
          ]
        ]
      },
      {
        "type": "section",
        "title": "1. The starting thesis, for those joining mid-ride",
        "body": "The Rust roadmap (R1 → R12) is complete. The current phase is no longer \"make it work,\" it's \"make it unbreakable, then invisible.\"\n\nToM (The Open Messaging) starts from a simple inversion: every device is both client and relay. No central server, no account, no token. Messages route through peers, end-to-end encrypted (Ed25519 + X25519 + XChaCha20-Poly1305), and the network only keeps the present: a 24-hour TTL, then a global purge, no exceptions.\n\nSeven decisions were carved in from day one (\"LOCKED\") and have never been walked back since: delivery, a message is delivered if and only if the recipient issues an ACK; the TTL, 24h max lifetime then purge, the network archives nothing; L1, which anchors state but never arbitrates; reputation with progressive fade, never a permanent ban; progressive-cost anti-spam (spam that boomerangs back on the spammer), never exclusion; invisibility of the protocol layer to the end user; and a scope conceived as a universal foundation, like TCP/IP, not as a product.\n\nThe founding metaphor is the positive virus: the network feeds on the work entrusted to it and only dies if nobody uses it anymore. More hosts, a stronger organism.\n\nFive and a half months later, the question is no longer \"is this possible?\" It's measured."
      },
      {
        "type": "section",
        "title": "2. The roadmap, kept, and the point where reality overtook it",
        "body": "Phase 1 (TypeScript) then Phase 2 (Rust): R1 → R12, 100%.\n\nEight TS deliveries (complete protocol stack, 771 tests), then twelve Rust stages: MessagePack envelope and crypto, gossip discovery and dynamic roles, groups with Primary → Shadow → Candidate failover, hardening and stress campaigns, a full iroh fork eliminating the bootstrap, production hardening and DHT, group recovery and anti-spam, and zero-config DHT rendezvous. All shipped.\n\nWhat comes next (R13 → R18) got reordered by reality, and it's the most instructive part of the quarter. On 16/07, the roadmap states it plainly: \"same-WiFi DIRECT never holds, 100% RELAY\" was false, a display lie. The last_path field on the FFI side was a global singleton overwritten by any peer. The ground truth: DIRECT everywhere, including iPad↔Apple TV over bilateral global IPv6 (11ms), NAS↔iPad over IPv6 (4.5ms).\n\nThree weeks of networking doubt lifted all at once: the network was better than its own measuring instruments. Global IPv6 hole-punching works without touching the router at all (the real blocker was a function testing existing paths instead of socket capability). Strategic consequence: R14 (IPv6 first-class) leapfrogged R13 (automatic port opening) in maturity, v6 hole-punch is more reliable than v4 NAT and short-circuits the need to open ports.\n\nAnother case of reality outpacing the plan: the global plan from 06/07 marked Proof of Presence (the first building block of the L1 layer) as \"ready to code.\" Ten days later it was running on the fleet: bidirectional signed challenges, 30s ephemeral, then a signed relay view with a quorum of distinct witnesses. Quote from the consolidated vision doc, 16/07: \"the project's actual velocity exceeds its planned velocity.\""
      },
      {
        "type": "table",
        "title": "Rust Roadmap: R1 → R12",
        "rows": [
          [
            "TS 1-8",
            "Complete protocol stack, 771 tests",
            "shipped"
          ],
          [
            "R1-R2",
            "Envelope MessagePack, crypto, Router, ProtocolRuntime",
            "shipped"
          ],
          [
            "R3-R4",
            "Gossip discovery, keepalive, virus backup, dynamic roles",
            "shipped"
          ],
          [
            "R5",
            "Groups: hub, Primary→Shadow→Candidate failover, sender keys",
            "shipped"
          ],
          [
            "R6",
            "TUI, integration, stress campaigns",
            "shipped"
          ],
          [
            "R7",
            "Full iroh fork, bootstrap elimination",
            "shipped"
          ],
          [
            "R8-R9",
            "Production hardening, DHT, delivery reliability",
            "shipped"
          ],
          [
            "R10-R11",
            "Group recovery, anti-spam, anti-replay nonce, admin",
            "shipped"
          ],
          [
            "R12",
            "Zero-config DHT rendezvous, recovery isolation, anti-sleep",
            "shipped"
          ]
        ]
      },
      {
        "type": "section",
        "title": "3. The act of sovereignty: the fork",
        "body": "In February, ToM started on top of iroh 0.96. During phase R7, the entire critical path was forked and absorbed under the tom-* namespace (MIT): tom-connect (~15K lines, MagicSock and hole punching), tom-relay (~8K), tom-gossip (~5K), tom-quinn (6.5K), tom-quinn-proto (41K), tom-base, tom-metrics. About 75,000 lines absorbed, out of the workspace's ~150,000.\n\nThis isn't a cosmetic fork: the protocol identifiers are now sovereign and deliberately incompatible with the public iroh network. Dedicated _tom DNS prefix, .tom.invalid TLS SNI, dedicated relay headers (X-Tom-NodeId, X-Tom-Challenge, X-Tom-Response), its own transport and gossip ALPN. iroh is the historical starting point, not a network dependency. The protocol no longer has an upstream master."
      },
      {
        "type": "section",
        "title": "4.1 · The router is a pure decision engine, and decision #1 lives in the type",
        "body": "The Router doesn't do I/O: it returns a RoutingAction, the runtime executes it. Excerpt from crates/tom-protocol/src/router.rs (ReadReceipt variant trimmed for readability).\n\nThe ReAck variant is a good example of what a \"LOCKED decision\" means in practice: the pathological case (lost ACK, retransmission, duplicate) is handled in the type itself, with the founding decision cited in a comment. And the ACK isn't a courtesy: it's signed on send and verified on receipt, a forged ACK gets rejected.",
        "code": {
          "lang": "rust",
          "text": "#[derive(Debug)]\npub enum RoutingAction {\n    /// Regular message for us -- deliver to application.\n    /// `response` is an unsigned delivery ACK to send back to the sender.\n    Deliver { envelope: Envelope, response: Envelope },\n    /// ACK for us -- update message status tracker.\n    Ack { original_message_id: String, ack_type: AckType, from: NodeId },\n    /// Forward to next hop. `relay_ack` is an unsigned ACK for the original sender.\n    Forward { envelope: Envelope, next_hop: NodeId, relay_ack: Envelope },\n    /// Rejected (TTL exhausted, chain too deep, malformed, etc.)\n    Reject { reason: String },\n    /// Duplicate of an already-delivered message: do NOT re-deliver locally, but\n    /// RE-SEND the (unsigned) delivery ACK.\n    ReAck { response: Envelope },\n    /// Duplicate or expired -- silently ignore.\n    Drop,\n}\n\n// The ACK isn't a courtesy: it's signed on send and verified on receipt.\nlet mut ack = response;\nack.sign(&self.secret_seed);\neffects.push(RuntimeEffect::SendEnvelope(ack));"
        }
      },
      {
        "type": "section",
        "title": "4.2 · Zero-config: the shared DHT rendezvous, no privileged node",
        "body": "The classic P2P problem: how do two strangers find each other without a bootstrap server? ToM's answer (ADR-010): a public constant (tom-protocol-rendezvous-v1) derives 8 shared Ed25519 keypair \"slots\" that everyone uses. Every node publishes {node_id, addrs} into slot hash(node_id) % 8 of the Mainline DHT (mutable BEP-0044); anyone can read the 8 slots and discover live peers with zero prior knowledge. No privileged node, no infrastructure to pay for.\n\nA public rendezvous is squattable by construction, so every discovered entry must prove ownership of its identity: an attacker can write into the slot, but can't put a peer there that they don't own. Excerpt from crates/tom-protocol/src/runtime/loop.rs, line 1166.",
        "code": {
          "lang": "rust",
          "text": "fn rendezvous_entry_authentic(addr: &tom_dht::DhtNodeAddr) -> bool {\n    use ed25519_dalek::{Signature, Verifier, VerifyingKey};\n    let Ok(node_id) = addr.node_id.parse::<NodeId>() else {\n        return false;\n    };\n    let Ok(vk) = VerifyingKey::from_bytes(&node_id.as_bytes()) else {\n        return false;\n    };\n    if addr.sig.len() != 64 {\n        return false;\n    }\n    let mut sig_bytes = [0u8; 64];\n    sig_bytes.copy_from_slice(&addr.sig);\n    vk.verify(&addr.signing_bytes(), &Signature::from_bytes(&sig_bytes))\n        .is_ok()\n}"
        }
      },
      {
        "type": "section",
        "title": "4.3 · The zombie detector: \"connected\" means nothing, \"alive\" is measured",
        "body": "Field discovery: QUIC can keep a connection open even though the other end is dead (sleep, cellular, iOS suspension). So the runtime no longer trusts connected_peers() alone, it requires recent inbound traffic. This is the mechanism behind the self-healing measured in the campaign: a node killed abruptly gets detected, routed around, and re-integrated within seconds of coming back.",
        "code": {
          "lang": "rust",
          "text": "/// Silence window after which \"connected\" peers are treated as zombies.\n/// Healthy peers emit gossip announces (~10s) + heartbeats, so 45s of total\n/// inbound silence means the links are dead even if QUIC still reports them.\nconst LIVENESS_STALE_MS: u64 = 45_000;\n\nfn liveness_is_stale(last_inbound: u64, now: u64, threshold_ms: u64) -> bool {\n    now.saturating_sub(last_inbound) > threshold_ms\n}\n\nlet zombie = !connected.is_empty()\n    && liveness_is_stale(last_inbound_at, now_ms(), LIVENESS_STALE_MS);\nif connected.is_empty() || zombie {\n    // -> back to bootstrap phase: reprobe relays, republish DHT,\n    //    rendezvous, rejoin gossip. The node re-bootstraps itself.\n}"
        }
      },
      {
        "type": "section",
        "title": "4.4 · A LOCKED decision is a line of code that makes violation impossible",
        "body": "The virus backup (ADR-009) replicates offline recipients' messages onto guardian nodes. Decision #2 (24h max) isn't a comment or a review, it's a clamp at entry construction time, in crates/tom-protocol/src/backup/types.rs. SQLite storage cannot hold an entry that exceeds 24h, no matter who the caller is. Purge is wired into the coordinator's tick. ADR-009 was then locked in by real-world endurance (15/15 on deferred delivery) and by deterministic tests.",
        "code": {
          "lang": "rust",
          "text": "pub const MAX_TTL_MS: u64 = 24 * 60 * 60 * 1000;\n// ... in the constructor:\nlet ttl = ttl_ms.unwrap_or(DEFAULT_TTL_MS).min(MAX_TTL_MS);"
        }
      },
      {
        "type": "section",
        "title": "5. The battles: what the real network taught the code",
        "body": "This is the part no lab benchmark tells you about. Every one of these bugs only existed in the real world, on real devices, real networks, real sleep cycles.\n\nThe pool lock-hostage bug (17/07). get_or_connect was dialing, 10 to 20 seconds of network timeout, while holding the connection pool's mutex, and the status poll ran in the same loop. Measured record: 74 seconds of the loop held hostage. Fix: dial outside the lock and status answered outside the loop, and, more lastingly, a durable legacy: the timed() profiler, which names any inline await over 300ms in the runtime loop. Rule now carved in stone: never a network await under a shared mutex.\n\nThe iOS transport freeze (17/07). An iPad proven frozen for 5 min 21s by a tokio wedge in the transport layer, the FFI timer itself was dead, so no application-level timeout could save it. Cure: porting two upstream iroh fixes, bounded FFI budgets, and, along the way, a UDP-deafness regression caught and hotfixed the same day. Lesson: when the async runtime is wedged, supervision has to live below it.\n\nThe poisoned topology (17/07). 1286 peers persisted in local state, ghosts revived by gossip, loop ticks at 84 to 218 seconds. The diagnosis was settled by an A/B canary (two identical nodes, only one purged). The real fix landed this week: anti-revival with a strict 24h TTL on vanished identities, consistent with decision #2, the network only keeps the present, including in its topological memory.\n\nThe \"100% RELAY\" display lie (16/07). Already mentioned above, the last_path singleton overwritten by any peer. The lesson was promoted to a project rule: observability must reflect ground truth, per peer, per path, never an aggregate that can lie.\n\nThe silent decode (17/07). A Swift regression: a non-optional field added to a Codable type without an explicit initializer, and the entire reception path was silently dropped on the app side while the transport delivered perfectly. Fix, plus a contract test on the exact JSON wire format. Lesson: an FFI boundary deserves contract tests, not trust.\n\nThe 1/256 CI flake (18/07). A crypto tampering test forced the last byte to 0xff, no effect if the byte was already 0xff, the \"tampered\" message stayed intact and decrypted, red test one time in 256. Fix: a guaranteed-different flip. A probabilistic flake doesn't get reproduced by running 23 times, it gets calculated.\n\nThe timer storm (16/07). 18 tokio intervals in Burst mode: after a stall (iOS resume, weak device), every missed tick would all fire at once, a storm of republishing and rejoining at the worst possible moment. Fix: catch up only one tick, never the full backlog.\n\nThe meta-lesson from these battles fits in one sentence, already paid for twice: green indicators on proxies let regressions survive for weeks. That's the lesson that spawned the next project."
      },
      {
        "type": "section",
        "title": "6. The hardtest: from a stopwatch harness to an invariant harness",
        "body": "Finding from 18/07: our campaigns validate send and receive plus a few timers, that's not enough. A test that passes because \"it seemed fine\" proves nothing. The reversal, written into the chaos harness's design: under a precise fault, do the protocol's guarantees still hold? A scenario that delivers 100% of messages but leaves a zombie connection, or freezes a loop for 45s, or double-delivers, fails.\n\nEight hard invariants now bound the protocol: zero final loss, ACK equals app delivery with no phantom ACK, bounded reconvergence under 15 seconds after peer loss, zero zombie connections past 45 seconds, zero loop freeze beyond twice the measured period, zero uncounted crashes, bounded memory under endurance, and zero double-delivery. Plus 21 scenarios graded across 6 levels, from unicast sanity checks up to a combinatorial cascade (one peer killed, a heavy message in flight, another peer's cellular handover, a third peer's clock skew, all simultaneous) and 6 to 24 hours of endurance under chaos. The signature scenario: a node does a factory reset, enters the ID of a peer it has never met and that's offline, writes to it, the message has to arrive anyway, via backup and discovery, without the two nodes ever having spoken.\n\nThe first stage is running (build 116): N in-process nodes, a seeded chaos-monkey so it's reproducible (kill, revive, skew), and the first four invariants asserted with real delivery tracking. The first two iterations of the harness, written by sub-agents, had fallen into exactly the opposite trap: hollow assertions that couldn't actually observe a double-delivery. Redone by hand. Checking agents' work remains a discipline, not an option.\n\nThe second stage drives the real devices, where the lock-hostage bug, the transport wedge, and the UDP deafness all lived. The arsenal, already in place or under construction: OS fault injection (SIGKILL, NAS service stop, iOS/tvOS process termination, real Mac sleep), adversarial networking (degraded cellular profiles on iPhone/iPad, network partition on Mac/NAS), per-node control API (HTTP status, send and stop commands, a reset endpoint in progress), ground-truth telemetry (a UDP collector timestamped on receipt, per-peer path-change events, button-action trackers), and property-based testing that has already exposed a real protocol bug on QUIC multipath, fixed by porting an upstream patch.\n\nThe open, openly acknowledged gap in this harness: hermeticity, a test node must never see the production fleet during tests. It's listed among the roadmap's walls, not swept under the rug.\n\nOne design detail that shows the level of rigor, in the L stage: the reception tracker counts, it doesn't set.",
        "code": {
          "lang": "rust",
          "text": "/// node_idx -> (payload -> number of times that exact payload was delivered).\n/// A COUNT, not a set: a set would silently dedup double-deliveries and make\n/// I8 impossible to observe (the exact trap the first two rounds fell into).\ntype ReceivedMap = HashMap<usize, HashMap<Vec<u8>, u32>>;"
        }
      },
      {
        "type": "section",
        "title": "7. Fable 5 arrives: the million-token adversarial judge",
        "body": "In early July, the workshop brought in Claude Fable 5, the first model in Anthropic's Claude 5 family, a class above Opus. Its contribution to the project isn't writing code faster. It's a change in method: the model that builds is also the one you turn against the project.\n\nThe textbook case: the \"tear it down\" review of the Proof of Presence ADR, run at 1M tokens of context, enough to hold the entire protocol in mind at once, code and docs. Verdict from 11/07: PoP survives as a direction, not as its current state, with 6 kill-shots anchored line by line, not opinions, attacks: a declarative heartbeat not gated on signature (a forged envelope could rebuild ghost peers), near-zero \"KNOWN\" identity cost amortized in 14h, a single eclipsable witness, per-identity budget with no aggregated global cap.\n\nForty-eight hours later: 6/6 closed, verified commit by commit, presence gated on signature validity, a split between Known (discovered address) and Online (proven sustained work), a quorum of distinct witnesses (promotion only if N witnesses agree, dedup per witness, 30s TTL), symmetric global cap. A tasty detail: two of the six kill-shots were already closed by existing code that the docs hadn't caught up with, the audit also flushed out the documentation drift, and tests were added to pin down what nobody had pinned down before.\n\nThis pattern is now institutionalized in the consolidated vision doc: periodic adversarial checkpoints whose sole purpose is to tear down the current state. That's LLM-first development, 2026 edition, not an autocomplete, a partner that codes by day, red-teams by night, and writes this report.\n\nAnd it's no coincidence that this works on this particular project: ToM was designed from day one to be LLM-first on the adoption side too (docs structured for agents, SDK, MCP). A protocol an agent can understand in full is a protocol an agent can audit in full, and deploy for a user in three messages."
      },
      {
        "type": "section",
        "title": "8. The milestone that matters: getting out of the lab",
        "body": "On the evening of 17/07, the product milestone: two real iPhones, on cellular networks, talking through ToM, one of them over LTE with a direct cellular IPv6 connection, no server, no account, no configuration. The first conversation that owes nothing to the lab.\n\nOn the morning of 18/07, the full instrumented campaign across all 6 nodes: 1809 messages delivered, 26 transient failures all recovered, 0 final loss, 0 crashes, 0 loop freezes. SIGKILL on the Apple TV mid-traffic: re-mesh in 8s. An iPhone's data cut off: continuity held on 3 of 4 peers, backup replayed on return.\n\nAnd maybe the most telling part: that afternoon, a counter-investigation invalidated 2 of the campaign's 3 \"findings.\" The \"45s freeze\" and the \"sleep cascade\"? Four manual button-press stops, proven by the UI trackers and system logs. The protocol had self-healed in under 10s every single time. A project that builds a case for and against its own results, that's the discipline that makes the 1809 lossless messages credible."
      },
      {
        "type": "section",
        "title": "9. What's still hard: the walls, named",
        "body": "Nothing swept under the rug. The current walls, as recorded: unbiasable entropy at the L1 level remains the main research blocker, with no randomness source that nobody can rig, quorum selection is attackable, a research budget is bounded and an external review by a cryptographer is planned. Quantified anti-Sybil still needs to put a number on Sybil quorum probability, with a model that includes the patient attacker willing to wait 6 months. The sample size is still 1: all validation runs on one box, one ISP, one household; before distribution it will need 3 to 5 tester households, other ISPs, other countries. The bus factor is 1, the number-one trap, ahead of every technical wall, mitigated by normative specs, agent memory, and LLM-first docs as the project's life insurance. Also remaining: network test hermeticity, DIRECT stability beyond one hour, and the public gateway's SPOF. And iOS background execution stays a deliberate non-goal, a product decision from 15/07: no daemon, no push, full foreground while actively contributing, a few-minute grace period in the background, a 24h backup safety net. A vision choice, not a hole."
      },
      {
        "type": "section",
        "title": "10. The vision: credible? Reality says better than that",
        "body": "Let's revisit the whitepaper's promise: a new protocol for an internet nobody owns. In February that was a thesis. In July: zero-config is achieved, two strangers find each other through the shared DHT rendezvous, no privileged node, with proof of possession, the signaling server is dead and buried. Wire sovereignty is achieved, not a single byte of the critical path depends on a third party anymore. Resilience is measured, not promised: self-healing in seconds under SIGKILL, zombies detected in 45s, zero loss across 1809 messages with real human chaos baked in. And the L1 layer started ahead of its own plan, and has already survived a 1M-token red team.\n\nThe base vision is no longer \"potentially credible.\" At stage 0, it's actually behind its own reality, the network was already doing global direct IPv6 while we still thought it was stuck on relay.\n\nWhat's next is written across three stages. Stage 0, the flawless pipe (now through end of 2026): DIRECT stable for entire days, automatic public gateway on any router, sub-2-second rejoin for known peers, a binary that installs with no terminal needed. Stage 1, the network that proves itself (2027): Proof of Presence turns presence into integrity, unpredictable quorums, cross-validation, anchoring the present with no global ledger, useful even with no money involved as an anti-Sybil, anti-eclipse immunity layer. Stage 2, value as the ultimate proof (2028 and beyond, conditional): the self-custodied sealed wallet isn't the goal, it's PoP's truth test; if a pure-presence network can prevent double-spending with no ledger and no fees, the founding thesis is proven, and if the research blockers don't hold up, this stage gets abandoned without shame, sovereign messaging and the integrity swarm already justify the project on their own.\n\nAnd above the stages, the horizon that gives every build its meaning: disappearance as success. The node shipped by default, in the router, the OS, the payment terminal. The network that ends up hosting its own code. ToM as a system primitive that apps call without knowing it, like a socket. Incentive through access, never through a token. A protocol has succeeded when nobody says its name anymore.\n\nThere's a deeper reason to hold this line, and it's in the project's genesis: the three tolls, surveillance, rent, the central chokepoint, they always come back. Email was decentralized, then Gmail happened. A sovereign protocol is never finished: it's kept free, actively, against a constant gravity. Every hour invested in the boring reliability of the pipe is for someone we'll never meet."
      },
      {
        "type": "section",
        "title": "Epilogue",
        "body": "On February 2, this repo opened on an empty scaffold. On July 18, a message leaves an iPhone over LTE, encrypts itself, finds its recipient without a single server on earth knowing it exists, crosses over direct IPv6, comes back acknowledged and signed, and if the recipient is asleep, the network carries it for 24 hours then forgets it, exactly as promised, because one line of code makes the opposite impossible.\n\n765 commits. 117 builds. Zero servers. What's next: make all of this boringly reliable, then invisible.\n\nSources: the repo's git log (765 commits, 02/02 → 18/07), the project's roadmap and consolidated vision documents, the chaos test harness, the instrumented campaign from 18/07, and code quoted verbatim at the locations indicated. Written with Claude Fable 5."
      }
    ]
  },
{
  slug: "second-cerveau",
  title: "My brain merges with Claude, thanks to Obsidian",
  date: "2026-05-13",
  summary: "How I turned my Obsidian vault into a central nervous system for my LLMs: notes, YouTube, texts, voice memos, overnight agents. Private, contextual memory, no cloud required.",
  tags: ["Obsidian", "AI", "LLM", "Vault", "Workflow"],
  content: [
    {
      type: "lead",
      body: "Have you ever had that frustrating feeling of re-explaining to Claude exactly who you are, what you're working on, what you decided last week? Of starting from zero at every new conversation? I solved that problem. And the solution is simple, radical, and completely private.",
    },
    {
      type: "section",
      title: "The problem: our memory is fragmented. AI starts from zero.",
      body: "For years, I piled my thoughts into dozens of places: Notion for projects, Apple Notes for late-night ideas, Safari bookmarks for articles, screenshots for sketches, WhatsApp voice memos for decisions made in the car, important emails buried in a 40,000-message inbox.\n\nAnd every conversation with Claude or another LLM hit the same wall: the model knows nothing about me. It's brilliant, but blind. I have to re-explain my context, my projects, my constraints. Every single time. It's like having a talented partner who loses their memory every morning.\n\nThe problem isn't the AI. The problem is that there's no bridge between my memory and its memory.",
    },
    {
      type: "section",
      title: "The solution: the Obsidian vault as a brain vault",
      body: "Obsidian isn't a note-taking tool. It's a personal knowledge graph that lives entirely locally, in a folder of Markdown files on your machine. No proprietary cloud. No forced sync. No subscription holding your data hostage.\n\nAn Obsidian vault becomes what I call a cognitive vault: the place where every thought, every decision, every external signal is captured, timestamped, and linked.\n\nToday my vault holds: all my project notes (architecture, decisions, blockers, next steps), YouTube links annotated with a summary and a topic tag, photographed sketches (local OCR makes them searchable), excerpts from important emails, voice memo transcripts via local Whisper, captured text message exchanges, photographed book passages. All in the same format. All in the same place. All searchable.",
    },
    {
      type: "section",
      title: "Obsidian Web Clipper: capturing the world in one click",
      body: "The Obsidian Web Clipper Chrome extension is the vault's armed wing in the browser. With one keyboard shortcut, any web page, article, YouTube video, thread, or piece of documentation gets pulled into the vault with its content, date, source, and whatever tags I assign on the fly.\n\nWhat this changes completely: I never bookmark anything anymore. A bookmark is dead: static, isolated, unsearchable in the context of my projects. A clip in Obsidian is alive: it's linked to the notes that reference it, indexed in the graph, available for RAG.\n\nWhen I watch a YouTube video on BM25 and clip it, it lands in my vault with the transcript, my annotations, and an automatic link to every note I have on vector search. Knowledge accumulates and connects.",
    },
    {
      type: "section",
      title: "The merge: three Claude agents work in my vault every night",
      body: "This is where the system truly becomes different. Every night, while I sleep or code, three scheduled Claude agents kick in automatically to maintain the bridge between my brain and the AI.\n\n8:00 PM. Daily vault reingest. The first agent re-ingests the entirety of my ATELIER PROJETS folder into the Obsidian vault. Every commit, every modified file, every Claude Code session note is captured, timestamped, structured into Markdown, and woven into the graph. The vault doesn't reflect what I chose to archive. It reflects what I actually did today.\n\n9:00 PM. Idriss, the daily wrap-up. Idriss is my synthesis agent. He reads the vault, goes through the day's commits, analyzes the handoffs, and produces a summary: what got done, the blockers, the decisions, the next steps. That summary is written into the vault. It becomes memory.\n\nFriday, 10:00 PM. Léonor, the weekly strategist. Léonor steps back. She reads an entire week of Idriss summaries and produces a strategic analysis: what's moving well, patterns in how I work, priorities for the following week, risks to watch.",
    },
    {
      type: "section",
      title: "Memory becomes selective and contextual",
      body: "The vault isn't monolithic. It's organized by project, by product, by domain. When I'm working on LuniiSync, Claude only receives the notes tied to LuniiSync in its context. When I'm working on Boîtes à Livres, it receives that context instead.\n\nThis is no longer a generalist LLM. It's a partner who knows my work in depth, because its context is fed by years of organized thinking. All of it powered by a hybrid BM25 plus vector embeddings search engine running locally via Ollama: semantic search understands that \"decision fatigue\" and \"too many choices cause paralysis\" are talking about the same thing.",
    },
    {
      type: "section",
      title: "What this system changed in how I work",
      body: "Continuity. Every morning, when I open a Claude session, it knows what I did yesterday. It knows this week's blockers. It doesn't need me to re-explain anything.\n\nSpeed. I no longer search. I ask the vault a question and RAG surfaces the answer in seconds. A decision made six months ago resurfaces exactly when I need it.\n\nDepth. The agents see patterns I don't. Léonor flagged three times that I was spending too much time on visual details while core features weren't finished. She was right all three times.\n\nTotal privacy. Nothing leaves my machine. No cloud, no SaaS subscription storing my thoughts on someone else's servers.",
    },
    {
      type: "table",
      title: "The system's tools",
      rows: [
        ["Central vault", "Obsidian (local Markdown folder)"],
        ["Web capture", "Obsidian Web Clipper (Chrome extension)"],
        ["Local embeddings", "Ollama + nomic-embed-text"],
        ["Hybrid search", "BM25 + vector search (Python)"],
        ["Scheduled agents", "Claude Code (scheduled tasks)"],
        ["LLM for summaries", "Claude via Anthropic API"],
        ["Doc generation", "python-docx / ReportLab"],
      ],
    },
    {
      type: "section",
      title: "Why this differs from classic RAG",
      body: "Classic RAG means dropping PDFs into a vector database and running searches over them. It's useful. It's not what I'm describing.\n\nWhat I'm describing is a living system that updates itself automatically every night with no human intervention, generates its own structured memory (the Idriss summaries, the Léonor strategies), feeds that memory back to the agents that query it, and adapts to the work context (which project, which product, which question).\n\nThe vault doesn't store static knowledge. It captures the evolution of my thinking in real time, reflects on it through agents, and makes it available for the next session. It's a loop. Not an index.",
    },
    {
      type: "section",
      title: "The next step: the vault as shared memory",
      body: "What fascinates me about this system is its potential to generalize. Today, it's my personal vault paired with my agents. Tomorrow: a team sharing a common vault, a \"client\" vault fed by every exchange and decision, a \"learning\" vault where every piece of reading accumulates and becomes queryable.\n\nThe Obsidian vault isn't just a new way to take notes. It's a new way to think with AI: by giving it access to what you actually thought, not to what you think you're telling it in a five-line prompt.",
    },
  ],
},
{
    slug: "machines-evaluent-competences",
    title: "When Machines Evaluate Skills",
    date: "2026-02-25",
    mediumUrl: "https://medium.com/@karaoui.malik/quand-les-machines-%C3%A9valuent-les-comp%C3%A9tences-409cde3baa2f",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*-XH6VTCxFiFaKM29qPzxMQ.png",
    summary: "Visibility used to precede validation. That model is cracking. AI agents now evaluate code autonomously, and technical quality is becoming the primary distribution mechanism.",
    tags: ["AI", "Development", "Agents", "Quality"],
    content: [
      {
        type: "lead",
        body: "For decades, the trajectory of a software tool followed the same sequence: a developer builds something, then spends as much energy, if not more, making it known as making it work. Conferences, blog posts, Twitter threads, live demos, pitch decks. Visibility preceded validation. And often, it replaced it.",
      },
      {
        type: "section",
        title: "Systems that read, test, and judge with total autonomy",
        body: "The current paradigm is cracking. That model rested on a simple constraint: humans cannot evaluate everything. The volume of code produced worldwide has long since outstripped human review capacity. So we rely on proxies: reputation, GitHub star counts, network, README quality. Social signals, not technical ones.\n\nBut that constraint is disappearing. Software agents (development assistants, automated evaluation systems, tools like Claude Code, Copilot, Devin) now analyze code, architectures, and results without emotional bias. What they evaluate is not subjective. Technical quality becomes a measurable signal. Not a sales pitch, a verifiable fact.",
      },
      {
        type: "section",
        title: "Promotion → Visibility → Trial → Adoption (or Abandonment)",
        body: "Traditionally, adoption followed this path: marketing was the entry point. No visibility, no trial. No trial, no adoption. A great tool could die in obscurity.\n\nWith agents able to discover, evaluate, and integrate automatically, the sequence changes: Technical validation → Automated integration → Human visibility.\n\nA relevant tool no longer needs a massive volume of communication to exist. Agents search for solutions, compare them, run tests, then integrate the ones that best meet a concrete need. Discovery becomes functional rather than marketing driven. This is a fundamental reversal. Proof precedes promotion.",
      },
      {
        type: "section",
        title: "The solo developer enters the game",
        body: "In the old model, a solo developer stood little chance against a 50-person team with a marketing budget. The signal-to-noise ratio was overwhelming.\n\nIn the new model, a lone developer can produce a component or library adopted at scale: because its usefulness is demonstrated automatically. Bots crawl package registries, public repositories, open APIs. They are not looking for an appealing logo or a well-designed website. They validate, stress-test, and scale it before human distribution even begins. Distribution follows proof.",
      },
      {
        type: "section",
        title: "What this changes for projects",
        body: "Projects able to survive this continuous evaluation gain a different trajectory. Less dependent on promotion, more anchored in performance.\n\nArtificial intelligence acts here in two ways. As a filter: it eliminates what does not hold up. Fragile code, poorly documented, without tests: it is not rejected by a tired human. It is rejected by a system that applies criteria systematically, around the clock. As a multiplier: a tool validated, adapted, and battle tested by agents can then be picked up by humans. Not because it was pitched, but because it has already proven that it works. Trust is built through proof, not through the pitch.",
      },
      {
        type: "section",
        title: "The new rules of the game",
        body: "This shift carries concrete consequences for anyone building tools, libraries, or technical services.\n\n1. Documentation becomes a competitive advantage. An agent that does not understand how to use a tool works around it. A poorly documented API is an invisible API in a world where machines do the discovering.\n\n2. Tests are no longer optional. They become the primary selection criterion. Not cosmetic tests covering the happy path: tests that prove resilience.\n\n3. Readable code beats clever code. Premature optimization, obscure patterns, code that is \"elegant but unreadable\": all of it becomes a liability. Clarity is a quality signal for an automated evaluator.\n\n4. Maintenance matters as much as creation. An abandoned project, even a brilliant one, will be passed over in favor of an active project, even a modest one. Agents evaluate commit velocity, issue responsiveness, dependency freshness.\n\n5. Personal branding loses relative weight. It does not disappear: humans remain in the loop. But the ratio flips: 80% of discovery could soon be functional, 20% social. The reverse of today.",
      },
      {
        type: "section",
        title: "Competence shows up through real usage",
        body: "In this emerging model, systems select what works, eliminate what does not hold up under pressure, and amplify what delivers measurable value.\n\nCompetence is no longer what you say you can do. It is what your artifacts prove you can do.\n\nThe shift is underway. The question is not if, it is how fast this new selection model will become dominant.\n\nIf you build software tools: invest in what machines can verify. Tests, documentation, readability, resilience. That is where your future visibility is decided.\n\nProof replaces promotion. Quality becomes the marketing.",
      },
    ],
  },
{
    slug: "python-enthousiasme-okazcar",
    title: "What if Python could see what your enthusiasm hides from you?",
    date: "2026-02-17",
    mediumUrl: "https://medium.com/@karaoui.malik/et-si-le-python-voyait-ce-que-votre-enthousiasme-vous-cache-7389fa47de17",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*b947B_GVgasKrhxRxTRlQQ@2x.jpeg",
    summary: "Used-car purchases often happen in a rush, with enthusiasm that blinds critical judgment. Co-Pilot is a Chrome extension that applies nine objective filters in two seconds (price, mileage, listing freshness, weak signals) to see what emotion hides.",
    tags: ["OkazCar", "Python", "Chrome Extension", "Product"],
    content: [
      {
        type: "lead",
        body: "You know the feeling. You're scrolling Leboncoin at 11pm, a cold coffee next to the keyboard. And then you see it. The perfect listing. The right model, the right price, great photos. Your heart races. Your brain, meanwhile, has already checked out. That's exactly where scams slip in. Not in the shadows. In broad daylight, right in the middle of your enthusiasm.",
      },
      {
        type: "section",
        title: "The problem: an opaque market, decisions made under pressure",
        body: "We don't buy a car every month. On average, it's every 4 to 6 years. And on that day, we're often buying under pressure: after a breakdown, an accident, a separation, a life change. We have to make a financially heavy decision in an environment that isn't clean at all.\n\nThe used-car market is opaque. Heterogeneous. Technical. We're looking for confirmation. Not contradiction.\n\nCo-Pilot was born from that observation: buyers need a cold, clear-eyed look. Not a paid expert. Not another website. Just a silent copilot, installed in your browser, doing the unglamorous work while you dream about your next car.",
      },
      {
        type: "section",
        title: "One click. Nine verdicts. Zero bullshit.",
        body: "Co-Pilot is a Chrome extension. Free. Made in France.\n\nYou're on a Leboncoin listing? One click on the icon. In two seconds, nine independent filters scrutinize the listing. No need to copy-paste a link. No need to switch tabs. No need to create an account. The analysis shows up right where you already are: on the listing.\n\nBut above all: the analysis is cold. It projects nothing. It fantasizes about nothing. It measures. The score lands. Green, orange, red. You know.",
      },
      {
        type: "section",
        title: "What Co-Pilot sees (and what you don't)",
        body: "The price is too good? It knows why. Co-Pilot doesn't compare the price to some vague, static \"blue book\" value. It puts the price back into real context: same model, same generation, same region, same mileage bracket. A price is never \"good\" or \"bad.\" It's either consistent... or statistically abnormal. And when a price is abnormally low and the listing has been online for over 30 days? Co-Pilot says it bluntly: \"Something's fishy: buyers haven't taken the plunge.\"\n\nIs the odometer credible? It depends on the car. 150,000 km. Is that high? The answer depends on the type of vehicle, its likely usage, and its real age. A human reads a number. An engine reads a consistency: age × average usage = normal or deviant.\n\nIs the listing \"recent\"? Really? Leboncoin lets sellers delete and repost a listing to jump back to the top of the results. Co-Pilot reads the real dates buried in the source code: first publication date, indexing date. What you see: \"Fresh listing.\" What the analysis sees: \"Attempt to bump the listing.\"\n\nThe weak signals: foreign phone prefix, partially translated text, generation/year mismatch, ambiguous tax rating. Taken in isolation, they're just details. Correlated with each other, they're probabilities. A human ignores these micro-signals. An engine aggregates them.",
      },
      {
        type: "section",
        title: "Behind the curtain: Python, common sense, and unapologetic logic",
        body: "Co-Pilot isn't a magic black box. It's not an oracle. It's not a promise of absolute reliability. It's a Python engine that cross-references public data, applies explicit rules, measures deviations, and aggregates signals.\n\nIt doesn't decide for you. It doesn't replace your judgment. It removes the blind spots.\n\nCo-Pilot is calibrated for the French market: French regulations, French public data, French usage realities. It doesn't promise the impossible. It doesn't predict the future. It reduces the information asymmetry. And in a market where the buyer is often alone facing a better-informed seller, that shifts the balance.\n\nBecause buying a car isn't a game. And because it's better to see too much... than not enough.",
      },
    ],
  },
{
    slug: "p2p-99-85-autoroute",
    title: "From 0% to 99,85% on the highway: how we made a P2P protocol reliable over 4G",
    date: "2026-02-16",
    mediumUrl: "https://medium.com/@karaoui.malik/de-0-%C3%A0-99-85-sur-autoroute-comment-on-a-rendu-un-protocole-p2p-fiable-sur-4g-53982518405e",
    image: "https://miro.medium.com/v2/resize:fit:1024/1*0oZI8KQQ4c2S8eSwA4q9TA.png",
    summary: "Three bugs, 54 minutes on the highway, 2752 pings between France and Switzerland. How the ToM protocol went from 0% to 99,85% reliability over 4G in four days of real-world debugging.",
    tags: ["ToM Protocol", "Rust", "P2P", "QUIC", "4G"],
    content: [
      {
        type: "lead",
        body: "Three bugs, 54 minutes on the highway, and 2752 pings between France and Switzerland. The week before, we'd proven that ToM Protocol could punch through NATs: a NAS in a living room in France, a MacBook on a school's WiFi in Switzerland, 32ms of direct latency. Hole punching succeeded 100% of the time. That was a PoC: clean, controlled, 20 pings per test. This week, we deliberately stopped making it look pretty.",
      },
      {
        type: "section",
        title: "The problem: a PoC is not a protocol",
        body: "The previous PoC had a secret: every test opened a fresh connection. 20 pings, close, start over. No persistent connection, no cache, no pool.\n\nIn real conditions, it's the opposite: a messaging app keeps a connection open for hours. The network changes (WiFi to 4G to tunnel to 4G). NAT rebinds ports. The carrier can silently drop UDP mappings after about 30 seconds of inactivity.\n\nTo test that, we built two tools: tom-transport (a stable Rust API that wraps iroh with a connection pool) and tom-stress (a stress-test binary with sequential, burst, continuous, and campaign modes). Structured JSON output, cross-compiled to static ARM64 for the NAS.",
      },
      {
        type: "section",
        title: "Night of February 12: Bug #1 · 0%",
        body: "First test on real 4G (not a controlled USB hotspot). Result: 0/20 pings. Zero. Nothing gets through. The NAS receives the pings and sends back the pongs. But the MacBook never sees them.\n\nCause: the pool caches the QUIC connection. When the 4G NAT rebinds ports (roughly every 30 seconds), the cached connection is dead. But close_reason().is_none() returns true: QUIC thinks the connection is alive because no RST was received. Every send() reuses a zombie connection.\n\nFix: 3 lines in node.rs. On an open_bi() error, evict the connection from the pool before returning the error. The next send() creates a fresh connection, redoes the hole punch, and everything works again.",
      },
      {
        type: "section",
        title: "February 13, 7:42 AM: Bug #2 · 97%",
        body: "New build, new start. Daily commute, France to Switzerland. 7 test campaigns launched during the trip. Result: 97% of pings successful, 100% of bursts successful. Pool eviction works.\n\nBut campaign #7: the continuous test fails 0/160 pings. The MacBook enters a dead zone, and the program never recovers.\n\nCause: send() succeeds (the QUIC connection looks alive). The pong never comes back (10s timeout). The program logs \"pong timeout\" but does nothing: it keeps sending on a dead connection indefinitely. Reconnection was only triggered on a send() error, not on a timeout.\n\nFix: a consecutive-timeout counter. After 3 timeouts in a row, we force eviction of the connection.",
      },
      {
        type: "section",
        title: "February 16, 7:18 AM: Bug #3 · 99,85%",
        body: "New build. Highway A40, heading to Switzerland. Continuous test: one ping per second, indefinitely.\n\nSession 1: 1638/1640 (99,88%). Latency of 1,26ms over 4G. Iroh finds a direct path via UDP hole punch, and it holds: 1580 consecutive pings with zero loss. The last 20 pings show progressive degradation (900ms, 1396ms, 570ms), then total disconnection, a tunnel. The program attempts 10 reconnections. All fail. It gives up.\n\nCause: in continuous mode, try_reconnect() stops after 10 attempts. If the tunnel lasts more than 2 minutes (backoff of 1+2+4+8+16+32+32+32+32+32 seconds), it's over.\n\nFix: in continuous mode, the reconnection loop runs indefinitely. The backoff caps at 32 seconds. Every 5 failed attempts, we force a full network rediscovery via Pkarr.\n\nSession 2: 1110/1112 (99,82%). Restarted manually after the tunnel. Higher RTT (9,7ms vs 1,26ms), likely a relay instead of a direct path for this network segment.",
      },
      {
        type: "table",
        title: "Test progression",
        rows: [
          ["Feb 12, evening", "Static 4G", "0/20 (0%)"],
          ["Feb 13, morning", "4G highway, 7 campaigns", "97%"],
          ["Feb 16, session 1", "Continuous, 32 min", "1638/1640 (99,88%)"],
          ["Feb 16, session 2", "After tunnel", "1110/1112 (99,82%)"],
          ["Overall", "2752 pings, 4 days", "99,85%"],
        ],
      },
      {
        type: "section",
        title: "What this proves, and what it doesn't prove yet",
        body: "What this proves: P2P works on 4G CGNAT while moving, on the highway, switching cell towers, going through tunnels. Hole punching sustains long sessions: 1580 consecutive pings with no loss. Automatic reconnection works after drops. All three bugs came from application-side cache handling, not from the limits of QUIC hole punching.\n\nWhat this doesn't prove yet: multi-node (beyond 1-to-1), resilience against enterprise firewalls that block UDP entirely, real application load with large messages and E2E encryption.\n\nThe next step: port the full ToM protocol layer (routing, relay selection, encrypted envelopes, groups) onto this validated Rust transport. The WebSocket signaling server officially has a successor.",
      },
    ],
  },
{
  slug: "tom-protocol-perce-les-murs",
  title: "ToM Protocol Breaks Through Walls. Literally.",
  date: "2026-02-11",
  mediumUrl: "https://medium.com/@karaoui.malik/tom-protocol-perce-les-murs-litt%C3%A9ralement-f5fb808f558e",
  image: "https://miro.medium.com/v2/resize:fit:1200/1*Wi6eJcw-LOTk3hA7Jpeu6Q.png",
  summary: "The ToM P2P protocol established a direct connection between a MacBook in Switzerland and a Freebox NAS in France in 1.4 seconds, with 95% of pings going direct at 32ms. 100% hole punching success across every tested scenario.",
  tags: ["ToM Protocol", "Rust", "P2P", "QUIC", "NAT", "Freebox"],
  content: [
    {
      type: "lead",
      body: "A week ago, ToM Protocol had 771 passing tests, a clean P2P architecture in TypeScript, and a WebSocket signaling server doing the job. Three days ago, we asked the real question: does it work without the server? Not \"in theory.\" Not in a whitepaper. On a real network. With a real NAT. Between two real countries. The answer is yes. And we have the JSON to prove it.",
    },
    {
      type: "section",
      title: "The problem nobody wants to face",
      body: "Every P2P protocol eventually hits the same wall: NAT. Your device has no public address. It sits behind a box, behind an ISP, behind a corporate or school firewall. And so does the device on the other side.\n\nThe classic solution: a permanent relay server. Every message passes through a third party. That's what Signal, WhatsApp, and pretty much everyone else does. It works. But it isn't P2P. It's P2server2P.\n\nReal P2P is when two machines find each other and talk directly. No permanent intermediary. The relay is a springboard, not a destination. To get there, you have to punch through the NAT: that's what's called hole punching. ToM can't afford the luxury of a permanent relay. If hole punching doesn't work, the project doesn't work.",
    },
    {
      type: "section",
      title: "Choosing iroh (and why not libp2p)",
      body: "Before writing a single line of code, we studied three options in depth.\n\nlibp2p (Protocol Labs, behind IPFS): the de facto P2P standard. Multi-language, huge ecosystem. But libp2p is relay-first: the initial connection goes through a relay, and hole punching is an optional optimization. For a protocol aiming at zero infrastructure, that's a bad philosophical starting point.\n\nHyperswarm (Holepunch, the creators of BitTorrent): DHT-first, a philosophy close to ToM's. Simple, efficient. But Node.js only, no browser support, smaller community.\n\niroh (n0-computer, Rust, MIT, 7,800+ stars): native QUIC, hole punching built in with automatic relay fallback, ~90% direct connections in production. Identity equals an Ed25519 key (exactly ToM's model), stateless relays (exactly ToM's philosophy), automatic end-to-end encryption via QUIC TLS.\n\niroh isn't a permanent dependency. The plan has three phases: PoC with iroh, then a strategic fork of the modules we need, then full independence.",
    },
    {
      type: "section",
      title: "3 days, 4 PoCs: from Hello World to cross-border",
      body: "Day 1. PoC-1 and PoC-2: the foundations. PoC-1: QUIC echo. Two nodes, same machine. Connection in 289ms, RTT of 125ms via the European iroh relay (auto-assigned, zero config). PoC-2: gossip peer discovery. Three nodes discovering each other with no central registry via HyParView/PlumTree, an epidemic protocol. Neighbor detected in 257ms. Exactly what ToM needs to replace its signaling server.\n\nDay 2. PoC-3: the target architecture. Gossip for discovery, direct QUIC for messages. Two layers, two roles. Discovery in 3 seconds, first message delivered in 4.8 seconds. Three subtle bugs found and fixed, only because we tested it for real.\n\nDay 3. PoC-4: the moment of truth. Everything else was just a warm-up.",
    },
    {
      type: "section",
      title: "The setup: Freebox NAS (France) to MacBook (Switzerland)",
      body: "An instrumented Rust binary. Structured JSON output for every event. Cross-compiled into a static ARM64 binary via cargo-zigbuild (16 MB, zero dynamic dependencies), deployed on a Freebox Delta NAS: a Debian VM on an ARM Cortex-A72. Living-room hardware, not a datacenter.\n\nThe binary observes the path in real time through iroh's connection.paths() API: relay or direct, RTT per path, remote address. Every path change generates a timestamped JSON event.",
    },
    {
      type: "table",
      title: "Results across the three scenarios",
      rows: [
        ["Scenario A · LAN WiFi", "0.37s", "49ms RTT", "100% direct"],
        ["Scenario B · 4G CGNAT", "2.9s", "107ms RTT", "90% direct"],
        ["Scenario C · Cross-border CH↔FR", "1.4s", "32ms RTT", "95% direct"],
      ],
    },
    {
      type: "section",
      title: "Scenario C: the moment everything changes",
      body: "Not planned. We were wrapping up testing when the MacBook found itself connected to a school's WiFi. In Switzerland. On a guest network. Behind an institutional router.\n\nThe NAS is still running in France, behind the residential box. We rerun the test. Without changing anything. Without any config.\n\nHole punch in 1.4 seconds. 20 pings, 95% direct. Average RTT: 32ms. Switzerland to France. Through a school's router and a residential box. No port forwarding. No STUN. No TURN. No config.\n\nThe iroh relay (euc1-1.relay.n0.iroh-canary.iroh.link) is only used for the very first ping. After that: DIRECT. 100% hole punching success across all three scenarios.",
    },
    {
      type: "section",
      title: "What this changes for ToM Protocol",
      body: "The signaling server now has a successor: gossip for discovery, QUIC for transport. The target architecture is validated. \"Zero infrastructure\" becomes measurable: no port forwarding, no STUN/TURN deployment, the relay just serves as a bootstrap. Encryption comes for free: QUIC includes TLS natively, and identity is an Ed25519 key.\n\nThe PoC proves feasibility. It doesn't prove production readiness. What's left: a strategic fork of the necessary modules, integration with the TypeScript SDK, scale testing (10 to 100 nodes), resilience testing against corporate firewalls.\n\n10 days ago, ToM Protocol was a working P2P protocol with an umbilical cord. Today, it's a P2P protocol that has proven it can cut the cord. Not with a whitepaper. With a cargo run from a school in Switzerland and 32ms of direct latency.",
    },
  ],
},
{
    slug: "the-open-messaging-whitepaper",
    title: "The Open Messaging",
    date: "2026-02-08",
    mediumUrl: "https://medium.com/@karaoui.malik/the-open-messaging-1f617ad6e4e4",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*XJXGlH-kBW5nrPJCQ0A5cg.png",
    summary: "The v2 White Paper of ToM is published. A protocol that stops belonging to its creators to become a shared space for building. A starting line, not an ending.",
    tags: ["ToM Protocol", "White Paper", "P2P", "Decentralization"],
    content: [
      {
        type: "lead",
        body: "There are two kinds of White Papers. Those that explain why a project is already \"ready.\" And those that explain why a project must not be finished too soon. The v2 White Paper of The Open Messaging (ToM) firmly belongs to the second category. This document is not a marketing promise. It is not a fundraise in disguise. It is not a roadmap set in stone. It is a foundation.",
      },
      {
        type: "section",
        title: "Why write a White Paper now, and not later",
        body: "This v2 White Paper arrives after a genuine first phase of development: messages actually flowing, relays appearing and disappearing, real problems to solve. This document was born from reality, not from a blank slate. It is not a promise. It is a foundation.\n\nIt does not claim ToM is finished. It does not claim everything is solved. It does not claim the choices are irrevocable. It does something much rarer: it clearly lays out the framework, the principles, the invariants, and deliberately leaves the rest open.",
      },
      {
        type: "section",
        title: "A clear vision (and one we own)",
        body: "ToM is a transport protocol, a data BUS, meant to become as invisible as TCP/IP or HTTP. Every device becomes the network. Present state takes precedence over history. Mass replaces capital and computing power. The economy is a balance, not a speculative game.\n\nThe document describes the minimal L1, the ephemeral subnets, the distributed roles, consensus based on presence rather than wealth. Everything is deliberately precise enough to be debated, but not closed enough to prevent evolution.",
      },
      {
        type: "section",
        title: "A radically open philosophy",
        body: "ToM's GitHub repo is not \"clean\" in the marketing sense. The wiki is not frozen documentation. And that's intentional. You'll find open questions, undecided alternatives, mechanisms still to be calibrated, debatable decisions.\n\nA protocol that claims to be a commons cannot be written in a corner.",
      },
      {
        type: "section",
        title: "Leaving work to be done is a political act",
        body: "In many open-source projects, everything is already decided. Contributing amounts to fixing bugs or documenting existing choices. ToM makes the opposite choice: there are still parameters to calibrate, mechanisms to be tested. This is not a lack of maturity. It is a condition for real participation.",
      },
      {
        type: "section",
        title: "This protocol no longer belongs to one person",
        body: "The Open Messaging cannot become shared infrastructure if a single actor keeps control of it. Either it becomes collective, or it doesn't deserve to exist.\n\nThe v2 White Paper marks exactly that shift: the moment the project stops being \"someone's project\" and becomes a shared space for building. This White Paper is not an ending. It's a starting line.\n\nIf you want to break it, test it, improve it: the work is open. And it no longer belongs to anyone.",
      },
    ],
  },
{
    slug: "the-open-messaging-genese",
    title: "The Open Messaging · Genesis and Architecture",
    date: "2025-11-16",
    mediumUrl: "https://medium.com/@karaoui.malik/the-open-messaging-gen%C3%A8se-architecture-e50d1119e1db",
    image: "https://miro.medium.com/v2/da:true/bc1f8416df0cad099e43cda2872716e5864f18a73bda2a7547ea082aca9b5632",
    summary: "Rethinking blockchain from scratch: not as a financial ledger, but as a data messaging and transport bus. Genesis of the ToM protocol, its architectural foundations, and its philosophy of organic decentralization.",
    tags: ["ToM Protocol", "Blockchain", "Architecture", "P2P", "Decentralization"],
    content: [
      {
        type: "lead",
        body: "The Open Messaging starts from a simple observation: today's blockchains were designed first and foremost to secure monetary value, not to carry messages and data at scale in real time. One fundamental need remains poorly addressed: a global communication BUS, ultra-lightweight, resilient, free in spirit, capable of delivering bytes from A to B without turning into a bloated machine or a closed industry.",
      },
      {
        type: "section",
        title: "Genesis: rethinking blockchain from scratch",
        body: "Bitcoin was designed as a tamper-proof transaction ledger. Ethereum added programmability. Then came hundreds of L1s and L2s, each with its own trade-offs. Yet the fundamental need for a communication BUS remains poorly addressed.\n\nThe second observation concerns the economics of consensus. In both Bitcoin and Ethereum, validation has become an industry: mining farms, pools, data centers, professional validators. Access to validation power is paid for in hardware, energy, or locked-up capital. This creates rent, de facto centralization, and a barrier to entry.\n\nOn top of that comes the history problem: most blockchains drag along their entire transaction history since genesis. Bitcoin is approaching a terabyte, Ethereum keeps accumulating an ever-heavier state.\n\nThe Open Messaging starts from these observations. What if we rethought blockchain not as a historical accounting ledger, but as a living organism, an organic BUS, whose sole role is to maintain a coherent present state and deliver messages efficiently?",
      },
      {
        type: "section",
        title: "A network where every user is both client AND server",
        body: "In ToM, every node can play several possible roles: messenger, relay, observer, validator, archivist, guardian. These roles are never fixed: they rotate, get redistributed, and are assigned through pseudo-random allocation mechanisms and Proof of Presence (PoP).\n\nToM's L1 is not a long historical chain. It's an organic BUS that retains only the present state and a few recent anchors. Three key ideas: aggressive pruning of old data, a sliding genesis (the \"genesis\" moves through time), present state rather than history.\n\nAbove the L1 sit fully dynamic subnets. Each subnet is born, lives, and dies according to a concrete need: a conversation, a group, a topic channel, a data stream.",
      },
      {
        type: "section",
        title: "PoP consensus and balance economics",
        body: "ToM's consensus rests on one central idea: it's not computing power or staked capital that earns the right to validate, but active presence and good behavior on the network. Hence Proof of Presence (PoP).\n\nEach user U is characterized by two quantities: Contribution_U and Usage_U. Score_U = Contribution_U − Usage_U. The system's tokens don't represent capital to accumulate, but a measure of this balance. You earn them by contributing, you spend them by using the network.\n\nFor spam and abusive behavior, ToM adopts a boomerang principle: the harder a user tries to saturate the network, the more the protocol bounces that load right back at them as local work: a micro-proof-of-work whose difficulty ramps up, relay over-assignment, non-critical validation tasks. Spam isn't just forbidden, it's self-defeating.",
      },
      {
        type: "section",
        title: "The double-spend challenge without full history",
        body: "How do you prevent double spending in a network that refuses to keep a full history? Bitcoin solves this with a global UTXO set. In ToM, the L1 is meant to stay ultra-pruned.\n\nSolution: rather than maintaining a global UTXO set, each wallet holds its own state commitment, and distributed observers guarantee that this state cannot be altered inconsistently. State_W = { wallet_id, commit (cryptographic commitment to the local state), net_sig (aggregated signature from the observers), height (version number) }.\n\nTo make a spend, the owner proposes an explicit transition with from_commit and to_commit. The observers verify that none of them has already signed a different transition from the same from_commit. This continuity of commits plays the role of the local UTXO set. Detailed history leaves the L1 and takes refuge in the commitments and the archives.\n\nYou can describe this system with a metaphor: your wallet is like a property title. Every time you sell, you update the title and witnesses co-sign it. The successive Commit_W values act like snapshots of your wallet.",
      },
      {
        type: "section",
        title: "Toward mass-scale use: combined power and free access",
        body: "The Open Messaging takes the opposite path from data centers: rather than concentrating power in a handful of physical sites, the network becomes a meta-computer formed by all its participants combined. The more users, the more power available.\n\nOn the environmental side, this approach is more virtuous: by removing the need for dedicated ASICs or specialized farms, it reduces the pressure to keep producing more hardware.\n\nToM aims for a form of free access: if you play by the rules (relaying, validating, temporarily storing data), the experience stays smooth and nearly free. If you abuse it, the protocol responds by ramping up local work until the abuse becomes irrational.\n\nEven though ToM is designed first as a messaging BUS, its architecture lays the groundwork for much broader applications: payments, distributed coordination, gaming, social networks, digital public services. Anything that needs lightweight, decentralized, resilient transport can benefit from it.",
      },
    ],
  },
]

export function getPostBySlugEn(slug) {
  return postsEn.find((p) => p.slug === slug) ?? null
}
