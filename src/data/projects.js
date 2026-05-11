export const projects = [
  {
    slug: "luniisync",
    title: "LuniiSync",
    eyebrow: "Outil macOS · 9,99 €",
    description:
      "Application macOS pour synchroniser des histoires MP3 sur une Fabrique à Histoires Lunii. Glissez vos fichiers audio dans un dossier — LuniiSync convertit, encode et transfère automatiquement sur l'appareil.",
    tags: ["Python", "PySide6", "macOS", "Lunii"],
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
      solution: "LuniiSync détecte automatiquement la Lunii branchée en USB, compare le contenu avec un dossier local de fichiers MP3/M4A, et synchronise les ajouts et suppressions. L'app gère la conversion, l'encodage au format Lunii et le transfert — en un clic.",
      sections: [
        {
          title: "Distribution macOS",
          body: "DMG signé et notarisé par Apple — installation en glisser-déposer, aucune alerte Gatekeeper. Compatible Apple Silicon et Intel.",
        },
        {
          title: "Distribution Windows",
          body: "Extraire le ZIP puis lancer LuniiSync.exe. Windows peut afficher une alerte SmartScreen au premier lancement (l'exe n'est pas signé) : cliquer \"Informations complémentaires\" → \"Exécuter quand même\".",
        },
      ],
    },
  },
  {
    slug: "okazcar",
    title: "OKazCar",
    eyebrow: "Produit en ligne",
    description:
      "OKazCar analyse les annonces auto en un clic sur Leboncoin, La Centrale et AutoScout24. Le produit combine score de fiabilité, prix marché, alertes utiles et lecture immédiate d'une annonce.",
    tags: ["Chrome Extension", "Manifest V3", "JavaScript", "Python", "Flask", "Web app", "IA intégrée"],
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
      solution: "OKazCar injecte directement dans les pages d'annonces un panneau d'analyse : score de fiabilité calculé sur les données constructeur, position du prix par rapport au marché en temps réel, alertes sur les anomalies (kilométrage suspect, prix trop bas, historique introuvable).",
      sections: [
        {
          title: "Comment ça marche",
          body: "L'extension scrape les données de l'annonce courante (marque, modèle, année, kilométrage, prix) et les envoie à une API Python/Flask. Le backend croise ces données avec une base de valeurs marché, des stats de fiabilité et les signalements connus, puis renvoie un score et des alertes en moins d'une seconde.",
        },
        {
          title: "Stack technique",
          body: "Extension Chrome Manifest V3 (JavaScript vanilla, Service Worker), API Flask déployée sur un VPS, base de données SQLite pour le cache marché, scripts Python pour l'agrégation des données constructeur.",
        },
        {
          title: "Ce que j'ai appris",
          body: "Manifest V3 a changé les règles des extensions Chrome en profondeur : plus de persistent background pages, tout passe par des Service Workers éphémères. J'ai dû revoir l'architecture de communication entre content script, service worker et popup pour garantir la fiabilité.",
        },
      ],
    },
  },
  {
    slug: "boites-a-livres",
    title: "Boîtes à Livres",
    eyebrow: "Bénévol · iOS",
    description:
      "Application iOS native pour cartographier les boîtes à livres en France et dans le monde. Carte interactive, contribution communautaire, signalement en temps réel — développée bénévolement pour faciliter le partage libre de la lecture.",
    tags: ["iOS", "SwiftUI", "Swift", "MapKit", "Bénévol"],
    links: [],
    content: {
      problem: "Les boîtes à livres sont partout — en ville, en forêt, à la campagne — mais aucun outil ne permet de les trouver facilement ni d'y contribuer. Le projet part d'un constat simple : quelqu'un doit faire l'outil que personne n'a encore fait.",
      solution: "Une application iOS native qui centralise la carte mondiale des boîtes à livres. Les utilisateurs peuvent ajouter une boîte, signaler qu'elle a été déplacée ou endommagée, laisser un commentaire. Entièrement communautaire, sans monétisation.",
      sections: [
        {
          title: "Choix techniques",
          body: "SwiftUI + MapKit pour une intégration native iOS parfaite. La carte en plein écran était un défi technique réel : SwiftUI impose des contraintes sur les vues embarquées dans TabView. La solution : sortir la Map du TabView et gérer la navigation différemment.",
        },
        {
          title: "Pourquoi bénévol",
          body: "Ce projet ne génère pas de revenus et n'en générera jamais. Il existe parce que le partage du livre mérite un outil propre. C'est ma contribution à quelque chose de plus grand que le code.",
        },
        {
          title: "Statut",
          body: "En développement actif. Correction des deux bugs bloquants (bande basse SwiftUI + régression des pins) avant soumission sur l'App Store.",
        },
      ],
    },
  },
  {
    slug: "masterclaude-atelier",
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
    slug: "bilan-ia-local",
    title: "Bilan IA local",
    eyebrow: "IA locale · RAG",
    description:
      "Script Python qui parcourt des dossiers utilisateur en local, applique un RAG via Ollama, puis génère un bilan structuré en DOCX ou PDF — sans sortir les données de la machine.",
    tags: ["Python", "Ollama", "RAG", "QMD", "DOCX/PDF"],
    links: [
      { label: "Code", href: "https://github.com/malikkaraoui/LOCAL.IA.GENERATED_COMPTE_RENDU", kind: "code" },
      { label: "Medium", href: "https://medium.com/@karaoui.malik", kind: "article" },
    ],
    content: {
      problem: "Les professionnels de la santé, du social et de l'éducation passent des heures à rédiger des bilans à partir de notes éparses. Envoyer ces données à un cloud n'est pas une option — confidentialité et RGPD l'interdisent.",
      solution: "Un pipeline entièrement local : les notes et documents source sont indexés en mémoire, Ollama (LLM local) génère le bilan structuré, python-docx ou ReportLab produit le document final. Aucune donnée ne quitte la machine.",
      sections: [
        {
          title: "Pipeline RAG local",
          body: "Les documents source sont découpés en chunks et indexés avec des embeddings locaux (nomic-embed-text via Ollama). À la génération, les chunks les plus pertinents sont injectés dans le prompt contextuel envoyé au LLM. Le bilan résultant cite ses sources.",
        },
        {
          title: "QMD — la même logique en plus puissant",
          body: "Ce projet a directement inspiré l'adoption de QMD dans mon workflow personnel : un moteur de recherche local BM25+vecteurs sur le vault Obsidian. Même principe, appliqué à la mémoire personnelle.",
        },
      ],
    },
  },
  {
    slug: "tom-protocol",
    title: "ToM Protocol",
    eyebrow: "Recherche",
    description:
      "ToM Protocol est mon terrain d'exploration autour d'une architecture peer-to-peer pour une communication plus libre, plus résiliente et moins dépendante des plateformes centralisées.",
    tags: ["TypeScript", "P2P", "Protocole", "Xcode", "iOS"],
    links: [
      { label: "Code", href: "https://github.com/malikkaraoui/ToM-protocol", kind: "code" },
      { label: "Medium", href: "https://medium.com/@karaoui.malik", kind: "article" },
    ],
    content: {
      problem: "Nos communications passent par des serveurs centralisés que nous ne contrôlons pas. Un opérateur peut couper une conversation, lire les messages, vendre les métadonnées. La résilience du réseau dépend de la bonne volonté de quelques acteurs.",
      solution: "ToM Protocol explore une couche de communication P2P où les messages transitent directement entre appareils, sans serveur central. L'identité est cryptographique, le routage décentralisé.",
      sections: [
        {
          title: "État de la recherche",
          body: "Projet de recherche actif. Les articles Medium documentent les expérimentations au fil de l'eau : découverte de pairs, chiffrement de bout en bout sans PKI centrale, résistance aux partitions réseau.",
        },
        {
          title: "Stack",
          body: "TypeScript pour le nœud de réseau, Swift/Xcode pour le client iOS. Tests de charge en réseau local avant tout déploiement.",
        },
      ],
    },
  },
  {
    slug: "aieteck",
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
