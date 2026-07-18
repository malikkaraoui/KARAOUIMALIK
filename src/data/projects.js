export const projects = [
  {
    slug: "luniisync",
    category: "produit",
    title: "Synchro Boite à Histoires",
    eyebrow: "macOS & Windows · 9,99 €",
    description:
      "Application macOS et Windows pour synchroniser des histoires MP3 sur une Fabrique à Histoires Lunii. Glissez vos fichiers audio dans un dossier — Synchro convertit, encode et transfère automatiquement sur l'appareil.",
    tags: ["Python", "PySide6", "macOS", "Windows", "Lunii"],
    links: [
      {
        label: "macOS — 9,99 €",
        href: "https://buy.stripe.com/dRm8wPcNd1Ob6o7byN6wE01",
        kind: "stripe",
        platform: "macos",
      },
      {
        label: "Windows — 9,99 €",
        href: "https://buy.stripe.com/14A14n3cDgJ5cMv7ix6wE02",
        kind: "stripe",
        platform: "windows",
      },
    ],
    content: {
      problem: "La Fabrique à Histoires Lunii ne permet d'écouter que les histoires achetées sur son store officiel. Il n'existe pas d'outil simple pour y charger ses propres fichiers audio sans passer par des manipulations techniques complexes.",
      solution: "Synchro Boite à Histoires détecte automatiquement la Lunii branchée en USB, compare le contenu avec un dossier local de fichiers MP3/M4A, et synchronise les ajouts et suppressions. L'app gère la conversion, l'encodage au format Lunii et le transfert — en un clic.",
      sections: [
        {
          title: "Distribution macOS",
          body: "DMG signé et notarisé par Apple — installation en glisser-déposer, aucune alerte Gatekeeper. Compatible Apple Silicon et Intel.",
        },
        {
          title: "Distribution Windows",
          body: "Télécharger puis lancer LuniiSync.exe. Windows peut afficher une alerte SmartScreen au premier lancement (l'exe n'est pas signé) : cliquer \"Informations complémentaires\" → \"Exécuter quand même\".",
        },
        {
          title: "Ce qui arrive ensuite",
          body: "La prochaine version va bien au-delà de la synchronisation. Au programme : suppression d'histoires directement depuis l'app, génération d'histoires personnalisées (sujet, matière, âge de l'enfant), création de parcours audio sur mesure.",
        },
      ],
    },
  },
  {
    slug: "okazcar",
    category: "produit",
    title: "OKazCar",
    eyebrow: "Extension Chrome · Gratuit · Version finale bientôt",
    description:
      "OKazCar analyse les annonces auto en un clic sur Leboncoin, La Centrale, AutoScout24 et ParuVendu. Score de fiabilité, prix marché, alertes utiles, email IA au vendeur — directement injecté dans la page d'annonce. 178 marques, 3 200+ modèles, gratuit.",
    tags: ["Chrome Extension", "Manifest V3", "React", "Firebase", "IA intégrée", "Vite"],
    links: [
      { label: "Site", href: "https://okazcar.com", kind: "live" },
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/okazcar-analyse-annonces/eakomgkenllkkmfccjjfoegealnchmmo",
        kind: "store",
      },
    ],
    content: {
      problem: "Acheter une voiture d'occasion est un parcours du combattant : des dizaines d'annonces sur plusieurs plateformes, des prix qui varient du simple au double, des historiques opaques. La majorité des acheteurs prennent leur décision sur des intuitions plutôt que des données.",
      solution: "OKazCar injecte directement dans les pages d'annonces un panneau d'analyse complet : score de fiabilité sur 12 critères, position du prix par rapport au marché en temps réel, alertes anomalies, rappels constructeur avec liens officiels, et un email personnalisé généré par IA pour contacter le vendeur.",
      sections: [
        {
          title: "Sites compatibles",
          body: "Leboncoin, La Centrale, AutoScout24 (12 pays) et ParuVendu. L'extension fonctionne directement sur les pages d'annonces de chaque plateforme — pas besoin de copier-coller d'URL.",
        },
        {
          title: "Une base de données sérieuse",
          body: "178 marques, 1 389 générations, 3 200+ modèles, ~546 000 versions cataloguées de 2000 à 2026. Le score de fiabilité croise ces données avec les historiques de fiabilité constructeur, les rappels Takata, les alertes pneus neige (loi montagne) et les signaux d'import ou de vendeur pro camouflé.",
        },
        {
          title: "Email IA au vendeur",
          body: "OKazCar génère automatiquement un email personnalisé à envoyer au vendeur, basé sur l'analyse de l'annonce. Points à négocier, questions pertinentes, ton adapté — en un clic.",
        },
        {
          title: "Statut",
          body: "Actuellement en phase de test finale. La version définitive sort dans quelques semaines et sera gratuite dans un premier temps.",
        },
      ],
    },
  },
  {
    slug: "boites-a-livres",
    category: "produit",
    title: "Boîtes à Livres",
    eyebrow: "Bénévol · iOS · Android à venir",
    description:
      "Application pour cartographier les boîtes à livres dans le monde. 98 172 boîtes recensées, 135 pays, 94 244 villes couvertes. Contribution communautaire, signalement en temps réel — bénévol, sans publicité, sans monétisation.",
    tags: ["iOS", "Swift", "MapKit", "Android", "Bénévol"],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/fr/app/bo%C3%AEtes-%C3%A0-livres/id6768351762",
        kind: "store",
      },
    ],
    stats: {
      highlights: [
        { value: "98 172", label: "boîtes" },
        { value: "135",    label: "pays" },
        { value: "94 244", label: "villes" },
        { value: "16 777", label: "photos" },
        { value: "99,9 %", label: "géocodées" },
      ],
      regions: [
        { flag: "🌍", name: "Europe",    count: "55 812", pct: "57 %" },
        { flag: "🌎", name: "Amériques", count: "37 280", pct: "38 %" },
        { flag: "🌏", name: "Océanie",   count: "4 242",  pct: "4 %"  },
        { flag: "🌏", name: "Asie",      count: "261",    pct: "<1 %" },
      ],
      topCountries: [
        { flag: "🇺🇸", name: "États-Unis",    count: "33 709" },
        { flag: "🇫🇷", name: "France",        count: "28 693" },
        { flag: "🇩🇪", name: "Allemagne",     count: "13 110" },
        { flag: "🇦🇺", name: "Australie",     count: "4 072"  },
        { flag: "🇳🇱", name: "Pays-Bas",      count: "3 212"  },
        { flag: "🇨🇦", name: "Canada",        count: "3 160"  },
        { flag: "🇬🇧", name: "Royaume-Uni",   count: "2 473"  },
        { flag: "🇧🇪", name: "Belgique",      count: "1 538"  },
        { flag: "🇦🇹", name: "Autriche",      count: "1 358"  },
        { flag: "🇨🇿", name: "Rép. tchèque", count: "1 035"  },
        { flag: "🇷🇺", name: "Russie",        count: "915"    },
      ],
    },
    content: {
      problem: "Les boîtes à livres sont partout — en ville, en forêt, à la campagne — mais aucun outil ne permet de les trouver facilement ni d'y contribuer. Le projet part d'un constat simple : quelqu'un doit faire l'outil que personne n'a encore fait.",
      solution: "Une application native qui centralise la carte des boîtes à livres. Les utilisateurs ajoutent des boîtes, signalent les déplacements ou dégradations, et bientôt pourront noter et commenter. La base dépasse 98 000 boîtes dans 135 pays, avec 99,9 % des points géocodés.",
      sections: [
        {
          title: "iOS natif — et Android dans les cartons",
          body: "L'app iOS est disponible sur l'App Store (Swift + MapKit). Une version Android native est en cours de finalisation et sortira prochainement — même expérience, code natif, pas de compromis cross-platform.",
        },
        {
          title: "Modération des contenus communautaires",
          body: "L'app intègre un système de modération conforme aux exigences de l'App Store : les photos soumises par les utilisateurs passent par une validation avant publication. C'est une obligation dès lors qu'une app permet du contenu généré par des tiers — et c'est une responsabilité qu'on prend au sérieux.",
        },
        {
          title: "Ce qui arrive bientôt",
          body: "Notation et commentaires par boîte, app Android native. Le projet grandit au rythme de sa communauté — 98 000 boîtes aujourd'hui, et ça continue.",
        },
        {
          title: "Pourquoi bénévol",
          body: "Ce projet ne génère pas de revenus et n'en générera jamais. Il existe parce que le partage du livre mérite un outil propre. C'est ma contribution à quelque chose de plus grand que le code.",
        },
      ],
    },
  },
  {
    slug: "yzphotos",
    category: "produit",
    title: "YZPhotos",
    eyebrow: "iOS & iPadOS · Confidentialité totale · App Store en cours",
    description:
      "YZPhotos trie et fait le ménage dans des bibliothèques photo/vidéo de plusieurs téraoctets sur disque externe ou NAS, sans jamais tout copier sur l'appareil. Swipe façon Tinder pour garder ou jeter, détection automatique des doublons, zéro donnée collectée.",
    tags: ["Swift", "SwiftUI", "iOS", "iPadOS", "GRDB", "SMB"],
    links: [],
    detailPath: "/YZPhotos",
    content: {
      problem: "Une bibliothèque de plusieurs centaines de milliers de photos et vidéos accumulées sur un disque externe ou un NAS devient impossible à trier sur iPhone ou iPad — il faudrait tout rapatrier en local, ce qui prend des heures et sature le stockage de l'appareil.",
      solution: "YZPhotos se connecte directement au disque USB-C ou au partage réseau (SMB/NAS/Freebox) et affiche le contenu en streaming, sans copie préalable. Un geste façon Tinder pour garder ou jeter, une détection de doublons par hachage perceptuel, une corbeille différée instantanée et réversible.",
      sections: [
        {
          title: "Vitesse sur réseau",
          body: "93 000 fichiers scannés sur un disque réseau en environ 18 minutes, contre près de 3 heures avec une approche naïve — grâce à un pipeline Swift 6 en concurrence structurée (async/await, TaskGroup).",
        },
        {
          title: "Zéro donnée collectée",
          body: "Pas de compte, pas de cloud, pas de traqueur, pas d'analytics. Toute l'app tourne en local — c'est un choix d'architecture, pas une promesse marketing.",
        },
        {
          title: "Statut",
          body: "Utilisée quotidiennement en interne depuis plusieurs mois, stable sur USB-C comme sur réseau. La sortie sur l'App Store est en cours de finalisation.",
        },
      ],
    },
  },
  {
    slug: "brickoff",
    category: "produit",
    title: "BrickOFF",
    eyebrow: "iOS · IA embarquée · En développement",
    description:
      "BrickOFF scanne un tas de briques LEGO en vrac avec l'appareil photo et identifie chaque pièce — référence et couleur — grâce à un pipeline de vision entraîné sur mesure. L'app reconstitue l'inventaire, puis suggère les sets officiels déjà constructibles.",
    tags: ["Swift", "SwiftUI", "CoreML", "PyTorch", "Vision", "iOS"],
    links: [],
    content: {
      problem: "Les collectionneurs et les familles accumulent des tas de briques LEGO en vrac sans pouvoir en tirer parti : impossible de savoir quelles pièces on possède, ni quels sets on peut construire sans en racheter.",
      solution: "Une photo suffit. BrickOFF détecte chaque brique, l'identifie par référence et couleur grâce à un pipeline de vision entraîné sur plus d'un million d'images, puis compare l'inventaire obtenu au catalogue officiel pour proposer les sets constructibles.",
      sections: [
        {
          title: "Un pipeline de vision entraîné sur mesure",
          body: "Détection (YOLO) et classification sur environ 1 000 références de pièces, identification de couleur déterministe en espace LAB. Le jeu d'entraînement combine plus d'1 million d'images certifiées et de la génération synthétique via Blender, qui a fait grimper le rappel de détection de 18 % à 51 %.",
        },
        {
          title: "Une IA qui tient dans la poche",
          body: "Modèle exporté en CoreML (7,6 Mo) et ONNX (14,9 Mo) pour tourner entièrement sur l'appareil — aucune image n'est envoyée à un serveur. Classification : 82,5 % top-1 / 98,1 % top-5 sur le jeu de test, 89 % top-1 sur photos réelles.",
        },
        {
          title: "Statut",
          body: "En développement actif — pipeline de scan, matching et inventaire fonctionnels. Interface et sortie App Store sont les prochaines étapes.",
        },
      ],
    },
  },
  {
    slug: "masterclaude-atelier",
    category: "projet",
    title: "MasterClaude & Claude Atelier",
    eyebrow: "Outil open-source · Harnais IA",
    description:
      "Claude Atelier (plugins NPM) est la base ; MasterClaude en est le runtime autonome. Ensemble, ils forment un harnais complet pour Claude Code : hooks SessionStart/Stop/UserPrompt, skills composables, gate pré-push, routing Ollama local, handoffs Copilot automatiques et gestion fine de la fenêtre de contexte.",
    tags: ["Claude Code", "Node.js", "NPM", "LaunchAgent", "Hooks", "Ollama", "LLM", "Autonomie"],
    links: [
      { label: "Doc", href: "https://claude-atelier.vercel.app", kind: "live" },
      { label: "NPM", href: "https://www.npmjs.com/package/claude-atelier", kind: "store" },
      { label: "Code", href: "https://github.com/malikkaraoui/claude-atelier", kind: "code" },
    ],
    content: {
      problem: "Utiliser Claude Code sans cadre revient à conduire sans tableau de bord : on ne sait pas combien de tokens on brûle, le contexte déborde sans prévenir, les PR restent ouvertes des jours, et le code n'est jamais challengé par un deuxième regard.",
      solution: "Un harnais complet autour de Claude Code. Claude Atelier installe les hooks, skills et agents. MasterClaude est le daemon LaunchAgent qui tourne en fond — il surveille les sessions, route les requêtes vers Ollama en local, gère les handoffs Copilot et garde un œil sur la consommation.",
      sections: [
        {
          title: "Ce que le harnais fait concrètement",
          body: "À chaque session : horodatage automatique, modèle actif détecté, fenêtre de contexte monitorée (alerte à 50%). À chaque push : gate pré-push en 6 étapes (secrets, lint, tests, drift manifest). À chaque feature : handoff JSON généré automatiquement, PR créée, Copilot review lancée, fixes intégrés, merge final sans intervention.",
        },
        {
          title: "Routing Ollama — LLM local",
          body: "Un proxy Go intercepte les requêtes Claude et les redirige vers Ollama pour les tâches légères (exploration, lint). Sonnet prend les features, Opus les décisions architecturales. Résultat : ~60% de tokens économisés sur les sessions longues.",
        },
        {
          title: "Pulse — monitoring multi-sessions",
          body: "Chaque session Claude écrit un fichier pouls.md toutes les 30 secondes (status, intensité, fenêtre). Un watchdog LaunchAgent vérifie que les sessions sont vivantes et alerte via Telegram si l'une est bloquée. Le système supporte plusieurs sessions simultanées sur des projets différents.",
        },
        {
          title: "Pourquoi open-source",
          body: "Ce projet est né d'un besoin personnel mais il répond à une question universelle : comment travailler avec un LLM de façon professionnelle, sans perdre le contrôle ? Le package NPM permet à n'importe qui d'installer le harnais en une commande.",
        },
      ],
    },
  },
  {
    slug: "second-cerveau",
    category: "projet",
    title: "Second Cerveau",
    eyebrow: "Vault Obsidian · IA locale · Coffre-fort personnel",
    description:
      "Un vault Obsidian devient le réceptacle chiffré de toute une vie numérique — notes, liens YouTube, croquis, mails, audios, échanges SMS — puis s'ouvre à vos LLMs via un moteur de recherche hybride entièrement local. Votre mémoire augmentée, sans cloud.",
    tags: ["Obsidian", "Python", "Ollama", "RAG", "BM25", "Embeddings", "DOCX/PDF"],
    links: [
      { label: "Code", href: "https://github.com/malikkaraoui/LOCAL.IA.GENERATED_COMPTE_RENDU", kind: "code" },
    ],
    content: {
      problem: "Nos pensées vivent dans dix endroits à la fois — des notes Markdown orphelines, des liens YouTube jamais relus, des photos de croquis dans Camera Roll, des mails importants enfouis, des vocaux oubliés, des conversations SMS qui contiennent des décisions cruciales. On passe des heures à chercher ce qu'on a déjà pensé. Et quand on parle à un LLM, il repart de zéro — il ne sait rien de nous.",
      solution: "Le vault Obsidian est un coffre-fort numérique : un dossier local chiffré qui centralise tout ce qui constitue votre pensée. Notes Markdown structurées, liens annotés, images, PDFs, transcriptions audio, exports SMS. Un moteur de recherche hybride (BM25 + embeddings vectoriels via Ollama) indexe l'intégralité du vault en local. Votre LLM favori — Mistral, Ollama, Claude via API — interroge ce coffre comme une mémoire longue terme. Il sait ce que vous avez lu, pensé, décidé. Sans jamais sortir une seule donnée de votre machine.",
      sections: [
        {
          title: "Le vault comme externalisation du cerveau",
          body: "Obsidian n'est pas un simple éditeur de notes — c'est un graphe de connaissances. Chaque note est un nœud, chaque lien entre notes est une synapse. Sur cinq ans d'usage intensif, un vault accumule des milliers de connexions : une idée de 2021 reliée à un article de 2024, une conversation capturée qui répond à un problème d'aujourd'hui. Le vault devient plus riche que la mémoire biologique parce qu'il n'oublie rien et que tout est cherchable.",
        },
        {
          title: "Ce que le vault absorbe",
          body: "Notes de réflexion personnelle et professionnelle. Liens YouTube avec résumé annoté. Photos de croquis et tableaux blancs (OCR local). Exports de mails importants. Transcriptions de vocaux (Whisper local). Extraits de conversations SMS ou iMessage. Passages de livres photographiés. Tout rentre dans le même graphe Markdown — unifié, cherchable, relié.",
        },
        {
          title: "Moteur de recherche hybride BM25 + vecteurs",
          body: "La recherche full-text classique (BM25) trouve les correspondances exactes. Les embeddings vectoriels (nomic-embed-text via Ollama) trouvent le sens — une note sur « la fatigue décisionnelle » ressort quand vous cherchez « trop de choix paralysent ». La combinaison des deux donne une précision chirurgicale sur des milliers de notes. L'index est recalculé incrémentalement à chaque modification du vault.",
        },
        {
          title: "Interface LLM — votre mémoire devient son contexte",
          body: "À chaque session, le LLM reçoit les chunks les plus pertinents du vault directement dans son contexte. Il peut ainsi citer vos propres notes, prolonger une réflexion commencée il y a six mois, ou croiser deux idées que vous n'aviez jamais connectées. Le résultat : un interlocuteur qui vous connaît vraiment — sans abonnement, sans profil cloud, sans cession de données.",
        },
        {
          title: "Génération de documents — bilans et rapports",
          body: "Le pipeline va plus loin que la simple conversation. À partir d'un ensemble de notes sources, Ollama génère un bilan structuré (compte-rendu, rapport, synthèse) et python-docx ou ReportLab produit le document final en DOCX ou PDF. Application directe : des professionnels de santé génèrent leurs bilans de suivi en quelques secondes à partir de notes de consultation — RGPD respecté, aucune donnée hors machine.",
        },
      ],
    },
  },
  {
    slug: "tom-protocol",
    category: "projet",
    title: "ToM Protocol",
    eyebrow: "Protocole P2P · Phase 3 en cours",
    description:
      "ToM est un protocole de transport décentralisé : chaque appareil devient un nœud du réseau. Pas de serveurs centraux, pas de dépendance aux plateformes. En juillet 2026, deux personnes ont échangé leurs premiers messages en pair-à-pair direct — du relais cellulaire jusqu'à l'IPv6 sans intermédiaire — chiffrés de bout en bout, via des applications natives iOS, macOS et tvOS.",
    tags: ["Rust", "TypeScript", "Swift", "QUIC", "P2P", "E2E Crypto", "NAT Traversal", "Freebox OS"],
    links: [
      { label: "Code", href: "https://github.com/malikkaraoui/ToM-protocol", kind: "code" },
      { label: "Medium", href: "https://medium.com/@karaoui.malik", kind: "article" },
    ],
    content: {
      problem: "Chaque message qu'on envoie passe par des serveurs que l'on ne contrôle pas. Un opérateur peut couper une conversation, lire les métadonnées, tomber en panne. La résilience du réseau dépend de la bonne volonté de quelques acteurs centralisés.",
      solution: "ToM Protocol est une couche de transport P2P où les appareils se connectent directement via QUIC avec traversée NAT automatique. L'identité est cryptographique (Ed25519), les messages sont chiffrés et signés (XChaCha20-Poly1305), sans PKI centrale. Chaque nœud est à la fois client et relais potentiel.",
      sections: [
        {
          title: "Phases de développement",
          body: "Phase 1 (TypeScript, WebRTC) : 8 épics sur 8 livrés — pile protocole complète, SDK développeur, démo Snake multijoueur P2P en navigateur. Phase 2 (Rust, QUIC) : transport natif validé — traversée NAT 100%, chiffrement E2E, messagerie de groupe avec failover de hub. Phase 3 en cours : convergence des deux piles, plus une nouvelle couche d'applications natives Apple (iOS, macOS, tvOS) déjà déployée sur une flotte réelle d'appareils. La suite (R13+) vise le port-forwarding automatique pour l'auto-hébergement — la distribution publique plus large est conditionnée à cette étape.",
        },
        {
          title: "Résultats de tests réels",
          body: "Stress test sur autoroute A40 (France↔Suisse) : 99,85% de fiabilité sur 2 752 pings, 54 minutes en continu, tunnels et changements de cellule inclus. Traversée NAT : 100% de réussite en LAN, 4G CGNAT et cross-border école Genève↔Freebox France. Latence directe post-hole-punch : 27–49 ms. Suite de tests automatisée étendue en continu côté TypeScript et Rust, complétée par un nouveau banc de test « chaos » basé sur l'injection de pannes plutôt que sur le seul chemin nominal.",
        },
        {
          title: "Le jalon P2P direct entre deux personnes",
          body: "Le 17 juillet 2026, deux personnes ont échangé des messages chiffrés en pair-à-pair direct — d'abord via relais sur réseau cellulaire, puis en connexion IPv6 directe, sans aucun serveur intermédiaire. Un jalon symbolique pour un protocole pensé comme souverain dès l'origine.",
        },
        {
          title: "Applications natives — tvOS, iOS, macOS",
          body: "Au-dessus du transport Rust, une couche d'applications natives (SwiftUI, architecture MVVM) tourne sur une flotte de cinq appareils personnels : Mac, iPad, iPhone, Apple TV. Le pont Rust↔Swift passe par un xcframework FFI généré automatiquement.",
        },
        {
          title: "Fiabilité, vitesse et sécurité",
          body: "Le temps de reconnexion d'un nœud est passé de 45 secondes–2 minutes à moins d'une seconde ; celui de la flotte complète à moins de 18 secondes (release 2.1.0). Un test d'endurance de 25,5 heures a fait transiter environ 74 000 messages sans redémarrage ni crash. Côté sécurité, un exercice de red-team complet a ciblé la couche de preuve de présence — résistance Sybil, quorum de témoins, plafonds anti-DoS — et neutralisé les 6 scénarios d'attaque testés.",
        },
        {
          title: "Freebox & messagerie de groupe",
          body: "Le NAS embarqué dans la Freebox Delta (ARM64 Cortex-A72, Debian) tourne comme nœud permanent du réseau. La messagerie de groupe utilise une réplication \"virus-like\" : un hub primaire, un shadow watchdog qui prend le relais en ~6 secondes si le primaire disparaît, un candidat déterministe prêt à monter en shadow. Pas de consensus, pas de split-brain.",
        },
        {
          title: "Stack technique",
          body: "Rust (QUIC via iroh, tokio async runtime, MessagePack, XChaCha20-Poly1305, HKDF-SHA256) pour le transport natif. TypeScript (WebRTC DataChannel, TweetNaCl.js, XSalsa20-Poly1305) pour la pile navigateur Phase 1. Swift/SwiftUI pour la couche d'applications natives Apple, reliée au cœur Rust via un xcframework FFI. Cross-compilation ARM64 statique (cargo-zigbuild) pour NAS et Raspberry Pi.",
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
      "AïeTeck est mon podcast sur l'intelligence artificielle — entre actualité, réflexions et usages concrets. Des épisodes courts pour comprendre où l'IA nous emmène.",
    tags: ["Podcast", "Intelligence Artificielle", "Tech"],
    links: [
      { label: "Spotify", href: "https://open.spotify.com/show/2uDQQaXYtkgeEtCYDoXcLs", kind: "spotify" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com/fr/podcast/a%C3%AFeteck/id1893943595", kind: "apple-podcast" },
    ],
    content: {
      problem: "L'IA évolue si vite que même les praticiens peinent à suivre. La plupart des contenus sont soit trop techniques, soit trop superficiels.",
      solution: "Des épisodes courts (10–20 min), fondés sur la pratique réelle. Je parle de ce que j'expérimente, pas de ce que je lis. Chaque épisode est une réflexion actionnelle.",
      sections: [
        {
          title: "Format",
          body: "Solo ou en dialogue. Pas de script figé — une idée, un fil, une conclusion. Disponible sur Spotify et Apple Podcasts.",
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
      "Plateforme SaaS dédiée aux pizzaïolos et food-trucks. Gestion des commandes, paiements et livraisons depuis une interface unique pour simplifier la vente en ligne multi-points.",
    tags: ["React", "Firebase", "Vite", "Stripe"],
    links: [
      { label: "Code", href: "https://github.com/malikkaraoui/PLANIZZA-", kind: "code" },
      { label: "Live", href: "https://pizzaella.fr", kind: "live" },
    ],
    content: {
      problem: "Les pizzaïolos indépendants et les food-trucks jonglent entre plusieurs outils sans intégration : une caisse pour le physique, un outil tiers pour le click & collect, rien pour les livraisons. La complexité tue la marge.",
      solution: "Une plateforme SaaS unifiée : interface de prise de commande en ligne, dashboard de gestion en temps réel, intégration Stripe pour les paiements, gestion des zones de livraison. Un seul outil pour tout.",
      sections: [
        {
          title: "Stack",
          body: "React + Vite pour le front, Firebase (Firestore + Auth + Hosting) pour le backend temps réel, Stripe pour les paiements. Architecture serverless pour maintenir les coûts au minimum.",
        },
        {
          title: "Ce que j'ai appris",
          body: "Concevoir un produit SaaS pour des non-techniciens force à aller à l'essentiel. Chaque friction dans l'interface est une commande perdue. Ce projet m'a appris à prioriser l'UX sur les features.",
        },
      ],
    },
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null
}
