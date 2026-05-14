export const posts = [
  {
    slug: "second-cerveau",
    title: "Mon cerveau fusionne avec Claude — grâce à Obsidian",
    date: "2026-05-13",
    summary: "Comment j'ai transformé mon vault Obsidian en système nerveux central pour mes LLMs — notes, YouTube, SMS, vocaux, agents nocturnes. Mémoire privée, contextuelle, sans cloud.",
    tags: ["Obsidian", "IA", "LLM", "Vault", "Workflow"],
    content: [
      {
        type: "lead",
        body: "Vous avez déjà eu cette sensation frustrante de réexpliquer à Claude exactement qui vous êtes, ce sur quoi vous travaillez, ce que vous avez décidé la semaine dernière ? De reprendre depuis zéro à chaque nouvelle conversation ? J'ai résolu ce problème. Et la solution est à la fois simple, radicale, et totalement privée.",
      },
      {
        type: "section",
        title: "Le problème : notre mémoire est fragmentée. L'IA repart de zéro.",
        body: "Pendant des années, j'ai accumulé mes pensées dans des dizaines d'endroits : Notion pour les projets, des notes Apple pour les idées du soir, des favoris Safari pour les articles, des captures d'écran pour les croquis, des vocaux WhatsApp pour les décisions prises en voiture, des mails importants perdus dans une inbox de 40 000 messages.\n\nEt à chaque conversation avec Claude ou un autre LLM, même constat : le modèle ne sait rien de moi. Il est brilliant, mais aveugle. Je dois lui réexpliquer mon contexte, mes projets, mes contraintes. À chaque fois. C'est comme avoir un associé talentueux qui perd la mémoire chaque matin.\n\nLe problème n'est pas l'IA. Le problème, c'est qu'il n'y a pas de pont entre ma mémoire et la sienne.",
      },
      {
        type: "section",
        title: "La solution : le vault Obsidian comme coffre-fort du cerveau",
        body: "Obsidian n'est pas un outil de prise de notes. C'est un graphe de connaissances personnelles qui vit entièrement en local, dans un dossier de fichiers Markdown sur votre machine. Pas de cloud propriétaire. Pas de synchronisation forcée. Pas d'abonnement qui détient vos données.\n\nUn vault Obsidian devient ce que j'appelle un coffre-fort cognitif : l'endroit où toute pensée, toute décision, tout signal externe est capturé, daté, relié.\n\nDans mon vault vivent aujourd'hui : toutes mes notes de projet (architecture, décisions, blocages, next steps), mes liens YouTube annotés avec résumé et tag thématique, mes croquis photographiés (OCR local pour les rendre cherchables), des extraits de mails importants, des transcriptions de vocaux via Whisper en local, des échanges SMS capturés, des passages de livres photographiés. Tout dans le même format. Tout dans le même endroit. Tout cherchable.",
      },
      {
        type: "section",
        title: "Obsidian Web Clipper : capturer le monde en un clic",
        body: "L'extension Chrome Obsidian Web Clipper est le bras armé du vault dans le navigateur. En un raccourci clavier, n'importe quelle page web — article, vidéo YouTube, thread, documentation — est aspirée dans le vault avec son contenu, sa date, sa source, et les tags que j'assigne à la volée.\n\nCe qui change tout : je ne bookmark plus jamais. Un bookmark est mort — il est statique, isolé, non cherchable dans le contexte de mes projets. Un clip dans Obsidian est vivant — il est lié aux notes qui y font référence, indexé dans le graphe, disponible pour le RAG.\n\nQuand je lis une vidéo YouTube sur le BM25 et que je la clip, elle atterrit dans mon vault avec le transcript, mes annotations, et un lien automatique vers toutes mes notes sur la recherche vectorielle. La connaissance s'accumule et se connecte.",
      },
      {
        type: "section",
        title: "La fusion : trois agents Claude travaillent chaque soir dans mon vault",
        body: "C'est ici que le système devient vraiment différent. Tous les soirs, pendant que je dors ou que je code, trois agents Claude planifiés s'activent automatiquement pour maintenir le pont entre mon cerveau et l'IA.\n\n20h00 — Vault Reingest quotidien. Le premier agent ré-ingère l'intégralité de mon dossier ATELIER PROJETS dans le vault Obsidian. Chaque commit, chaque fichier modifié, chaque note de session Claude Code est capturé, daté, structuré en Markdown et intégré au graphe. Le vault ne reflète pas ce que j'ai pensé archiver. Il reflète ce que j'ai réellement fait aujourd'hui.\n\n21h00 — Idriss, le bilan quotidien. Idriss est mon agent de synthèse. Il lit le vault, parcourt les commits du jour, analyse les handoffs, et produit un bilan : ce qui a été accompli, les blocages, les décisions, les next steps. Ce bilan est écrit dans le vault. Il devient mémoire.\n\nVendredi 22h00 — Léonor, la stratège hebdomadaire. Léonor prend du recul. Elle lit une semaine entière de bilans Idriss et produit une analyse stratégique : ce qui avance bien, les patterns dans ma façon de travailler, les priorités pour la semaine suivante, les risques à surveiller.",
      },
      {
        type: "section",
        title: "La mémoire devient sélective et contextuelle",
        body: "Le vault n'est pas monolithique. Il est organisé par projet, par produit, par domaine. Quand je travaille sur LuniiSync, Claude reçoit dans son contexte uniquement les notes liées à LuniiSync. Quand je travaille sur Boîtes à Livres, il reçoit ce contexte.\n\nCe n'est plus un LLM généraliste. C'est un partenaire qui connaît mon travail en profondeur, parce que son contexte est nourri par des années de pensées organisées. Le tout, avec un moteur de recherche hybride BM25 + embeddings vectoriels via Ollama en local — la recherche sémantique comprend que \"fatigue de décision\" et \"trop de choix paralysent\" parlent de la même chose.",
      },
      {
        type: "section",
        title: "Ce que ce système a changé dans ma façon de travailler",
        body: "La continuité. Chaque matin, quand j'ouvre une session Claude, il sait ce que j'ai fait hier. Il connaît les blocages de la semaine. Il n'a pas besoin que je réexplique.\n\nLa vitesse. Je ne cherche plus. Je pose une question au vault et le RAG remonte la réponse en quelques secondes. Une décision prise il y a six mois refait surface exactement quand j'en ai besoin.\n\nLa profondeur. Les agents voient des patterns que je ne vois pas. Léonor m'a signalé trois fois que je passais trop de temps sur des détails visuels quand les fonctionnalités core n'étaient pas finies. Elle avait raison les trois fois.\n\nLa confidentialité totale. Rien ne quitte ma machine. Pas de cloud, pas d'abonnement SaaS qui stocke mes pensées sur ses serveurs.",
      },
      {
        type: "table",
        title: "Les outils du système",
        rows: [
          ["Vault central", "Obsidian (dossier local Markdown)"],
          ["Capture web", "Obsidian Web Clipper (extension Chrome)"],
          ["Embeddings locaux", "Ollama + nomic-embed-text"],
          ["Recherche hybride", "BM25 + recherche vectorielle (Python)"],
          ["Agents planifiés", "Claude Code (tâches schedulées)"],
          ["LLM pour les bilans", "Claude via API Anthropic"],
          ["Génération de docs", "python-docx / ReportLab"],
        ],
      },
      {
        type: "section",
        title: "Pourquoi c'est différent d'un RAG classique",
        body: "Le RAG classique, c'est mettre des PDFs dans une base vectorielle et faire des recherches dessus. C'est utile. Ce n'est pas ce que je décris.\n\nCe que je décris, c'est un système vivant qui se met à jour automatiquement chaque soir sans intervention humaine, génère sa propre mémoire structurée (les bilans Idriss, les stratégies Léonor), alimente en retour les agents qui l'interrogent, et s'adapte au contexte de travail (quel projet, quel produit, quelle question).\n\nLe vault ne stocke pas de la connaissance statique. Il capture l'évolution de ma pensée en temps réel, la réfléchit via des agents, et la rend disponible pour la prochaine session. C'est une boucle. Pas un index.",
      },
      {
        type: "section",
        title: "La prochaine étape : le vault comme mémoire partagée",
        body: "Ce qui me fascine dans ce système, c'est son potentiel de généralisation. Aujourd'hui, c'est mon vault personnel couplé à mes agents. Demain : une équipe partageant un vault commun, un vault \"client\" nourri de tous les échanges et décisions, un vault \"apprentissage\" où chaque lecture s'accumule et devient interrogeable.\n\nLe vault Obsidian, ce n'est pas juste une nouvelle façon de prendre des notes. C'est une nouvelle façon de penser avec l'IA — en lui donnant accès à ce qu'on a vraiment pensé, pas à ce qu'on pense lui dire dans un prompt de cinq lignes.",
      },
    ],
  },
  {
    slug: "machines-evaluent-competences",
    title: "Quand les machines évaluent les compétences",
    date: "2026-02-25",
    mediumUrl: "https://medium.com/@karaoui.malik/quand-les-machines-%C3%A9valuent-les-comp%C3%A9tences-409cde3baa2f",
    summary: "La visibilité précédait la validation. Ce modèle se fissure. Les agents IA évaluent désormais le code de façon autonome — et la qualité technique devient le principal mécanisme de distribution.",
    tags: ["IA", "Développement", "Agents", "Qualité"],
    content: [
      {
        type: "lead",
        body: "Pendant longtemps, la visibilité précédait la validation. Un outil devenait connu, puis les gens le testaient, puis certains l'adoptaient. Ce modèle se fissure. Les agents IA peuvent désormais évaluer du code de façon autonome, sans les contraintes de capacité humaine. Ce changement redistribue les cartes.",
      },
      {
        type: "section",
        title: "Le basculement de paradigme",
        body: "Les systèmes d'évaluation automatisée ne jugent pas sur la réputation ou le marketing. Ils mesurent : robustesse, lisibilité, couverture de tests, qualité de la documentation, performance. Des métriques objectives que le code prouve ou ne prouve pas.",
      },
      {
        type: "section",
        title: "La courbe d'adoption inversée",
        body: "L'ancien chemin : Promotion → Visibilité → Test → Adoption.\n\nLe nouveau chemin : Validation technique → Intégration automatisée → Visibilité humaine.\n\nLes agents découvrent, testent et intègrent avant que les humains ne sachent que l'outil existe. La distribution se joue au niveau du code, pas du marketing.",
      },
      {
        type: "section",
        title: "La nouvelle opportunité des développeurs solo",
        body: "Un développeur individuel peut désormais atteindre une adoption à grande échelle par la qualité technique plutôt que par les ressources marketing. Les agents découvrent et valident automatiquement les outils utiles, indépendamment de la taille de l'équipe derrière.",
      },
      {
        type: "section",
        title: "Cinq changements concrets pour les créateurs d'outils",
        body: "La documentation devient indispensable pour la découvrabilité machine. Les tests passent d'optionnels à critères de sélection obligatoires. Le code lisible l'emporte sur le code « intelligent ». La maintenance active compte plus que la création initiale. La fonctionnalité technique écrase le personal branding.",
      },
      {
        type: "section",
        title: "La thèse centrale",
        body: "La compétence n'est plus ce qu'on prétend savoir. C'est ce que nos artefacts prouvent qu'on peut faire. La qualité devient le principal mécanisme de distribution, remplaçant le marketing traditionnel.",
      },
    ],
  },
  {
    slug: "python-enthousiasme-okazcar",
    title: "Et si le Python voyait ce que votre enthousiasme vous cache ?",
    date: "2026-02-17",
    mediumUrl: "https://medium.com/@karaoui.malik/et-si-le-python-voyait-ce-que-votre-enthousiasme-vous-cache-7389fa47de17",
    summary: "Les achats automobiles d'occasion se font souvent dans l'urgence, avec un enthousiasme qui aveugle le jugement critique. Co-Pilot est une extension Chrome qui applique neuf filtres objectifs en deux secondes — prix, kilométrage, fraîcheur d'annonce, signaux faibles — pour voir ce que l'émotion cache.",
    tags: ["OkazCar", "Python", "Extension Chrome", "Produit"],
    content: [
      {
        type: "lead",
        body: "Parcourir des annonces automobiles tard le soir, trouver le véhicule parfait, et laisser l'enthousiasme obscurcir le jugement critique. C'est précisément dans ce moment que les arnaques prospèrent — non cachées, mais dissimulées par l'optimisme de l'acheteur.",
      },
      {
        type: "section",
        title: "Le problème : l'achat auto est un terrain fertile pour l'asymétrie d'information",
        body: "Les achats automobiles surviennent rarement (tous les 4 à 6 ans en moyenne) et dans des circonstances contraignantes : urgence post-panne, accident, séparation ou changement de vie. Le marché de l'occasion reste opaque, hétérogène et technique, tandis que les acheteurs cherchent naturellement des confirmations plutôt que des contradictions.",
      },
      {
        type: "section",
        title: "Co-Pilot : neuf filtres en deux secondes",
        body: "Co-Pilot est une extension Chrome gratuite. Activée d'un clic sur une annonce Leboncoin, elle applique neuf filtres indépendants en deux secondes, sans copier-coller, sans changement d'onglet, sans création de compte. Résultat : un score coloré (vert, orange, rouge) qui reflète l'analyse.",
      },
      {
        type: "section",
        title: "Ce que le moteur voit que vous ne voyez pas",
        body: "Analyse tarifaire contextuelle : au lieu d'un barème statique, Co-Pilot compare le prix parmi des annonces similaires (même modèle, génération, région, kilométrage). Un prix anormalement bas persistant plus de 30 jours génère l'alerte : « Anguille sous roche — les acheteurs n'ont pas franchi le pas ».\n\nÉvaluation du kilométrage : âge × usage moyen = normalité ou anomalie mesurable, au-delà de l'intuition humaine.\n\nFraîcheur d'annonce : Leboncoin permet suppression et republication pour remonter dans les résultats. Co-Pilot extrait les vraies dates du code source.\n\nSignaux faibles : préfixes étrangers, traductions partielles, incohérences génération/année. Isolés, ce sont des détails. Agrégés, ce sont des probabilités.",
      },
      {
        type: "section",
        title: "Philosophie : éliminer les angles morts, pas remplacer le jugement",
        body: "Co-Pilot ne prétend pas être une boîte noire magique. C'est un moteur Python croisant données publiques, appliquant des règles explicites, mesurant des écarts et agrégeant des signaux. Il n'usurpe pas le jugement de l'acheteur — il réduit l'asymétrie informationnelle face au vendeur.",
      },
    ],
  },
  {
    slug: "p2p-99-85-autoroute",
    title: "De 0% à 99,85% sur autoroute : comment on a rendu un protocole P2P fiable sur 4G",
    date: "2026-02-16",
    mediumUrl: "https://medium.com/@karaoui.malik/de-0-%C3%A0-99-85-sur-autoroute-comment-on-a-rendu-un-protocole-p2p-fiable-sur-4g-53982518405e",
    summary: "Trois bugs, 54 minutes d'autoroute, 2752 pings entre la France et la Suisse. Comment le protocole ToM est passé de 0% à 99,85% de fiabilité sur 4G en quatre jours de debuggage réel.",
    tags: ["ToM Protocol", "Rust", "P2P", "QUIC", "4G"],
    content: [
      {
        type: "lead",
        body: "Trois bugs, 54 minutes d'autoroute, et 2752 pings entre la France et la Suisse. Voici comment le protocole ToM est passé de 0% à 99,85% de fiabilité sur réseau mobile en quatre jours.",
      },
      {
        type: "section",
        title: "Le problème : un PoC n'est pas un protocole",
        body: "Les tests préalables utilisaient des connexions fraîches de 20 pings chacune. En conditions réelles, c'est l'inverse : une messagerie maintient une connexion ouverte pendant des heures. Les changements de réseau (WiFi vers 4G, traversée de tunnels) révèlent les faiblesses du système que les tests contrôlés ne voient pas.",
      },
      {
        type: "section",
        title: "Les trois bugs qui bloquaient tout",
        body: "Bug #1 (12-13 février) : Le pool met en cache la connexion QUIC. Quand le NAT 4G rebind les ports, la connexion en cache est morte. Symptôme : 0/20 pings réussis. Solution : trois lignes de code évincent la connexion morte du pool lors d'une erreur open_bi().\n\nBug #2 (13 février) : Les connexions zombie ne déclenchent pas la reconnexion automatique. Symptôme : 0/160 pings lors d'une perte progressive de réseau. Solution : un compteur de trois timeouts consécutifs déclenche l'éviction.\n\nBug #3 (16 février) : En mode continu, le programme s'arrête après 10 tentatives de reconnexion. Solution : boucle infinie avec backoff plafonné à 32 secondes et redécouverte via Pkarr toutes les 5 tentatives.",
      },
      {
        type: "table",
        title: "Progression des tests",
        rows: [
          ["12 fév", "4G statique", "0%"],
          ["13 fév", "4G autoroute, 7 campagnes", "97%"],
          ["16 fév — Session 1", "Continu, 32 min", "1638/1640 (99,88%)"],
          ["16 fév — Session 2", "Après tunnel", "1110/1112 (99,82%)"],
          ["Global", "2752 pings", "99,85%"],
        ],
      },
      {
        type: "section",
        title: "Ce que ça prouve",
        body: "Le P2P fonctionne sur 4G CGNAT en mouvement, sur autoroute, en changeant d'antenne-relais, en traversant des tunnels. Le hole punching maintient des sessions longues : 1580 pings consécutifs sans perte, 26 minutes. La reconnexion automatique fonctionne après coupures en 52 secondes. Les bugs provenaient de la gestion de cache côté applicatif, pas des limites du hole punching QUIC.",
      },
      {
        type: "section",
        title: "Ce que ça ne prouve pas encore",
        body: "Multi-nœuds (supérieur à 1-à-1). Résilience aux firewalls d'entreprise bloquant UDP complètement. Charge applicative réelle avec messages volumineux et chiffrement end-to-end. La prochaine étape : porter la couche protocole ToM complète sur ce transport Rust validé.",
      },
    ],
  },
  {
    slug: "tom-protocol-perce-les-murs",
    title: "ToM Protocol perce les murs. Littéralement.",
    date: "2026-02-11",
    mediumUrl: "https://medium.com/@karaoui.malik/tom-protocol-perce-les-murs-litt%C3%A9ralement-f5fb808f558e",
    summary: "Le protocole P2P ToM a établi une connexion directe entre un MacBook en Suisse et un NAS Freebox en France en 1,4 seconde, avec 95% des pings en direct à 32ms. 100% de succès de hole punching sur tous les scénarios testés.",
    tags: ["ToM Protocol", "Rust", "P2P", "QUIC", "NAT", "Freebox"],
    content: [
      {
        type: "lead",
        body: "Il y a 10 jours, ToM Protocol était un protocole P2P qui marchait — avec un cordon ombilical. Aujourd'hui, c'est un protocole P2P qui a prouvé qu'il peut couper le cordon.",
      },
      {
        type: "section",
        title: "Le problème fondamental du P2P",
        body: "Chaque appareil se trouve derrière un NAT (box, opérateur, firewall). La plupart des protocoles P2P résolvent cela via un serveur relay permanent. C'est du P2serveur2P, pas du vrai P2P. Le vrai P2P, c'est quand deux machines se trouvent et se parlent directement — sans infrastructure permanente au milieu.",
      },
      {
        type: "section",
        title: "Pourquoi iroh",
        body: "Parmi libp2p, Hyperswarm et iroh, le choix s'est porté sur iroh (Rust, MIT, ~7800 stars) : QUIC natif, hole punching intégré, ~90% de connexions directes en production. La bibliothèque fait ce qu'elle promet.",
      },
      {
        type: "table",
        title: "Résultats des quatre PoCs cross-border",
        rows: [
          ["LAN WiFi", "0,37s", "49ms RTT", "100% directs"],
          ["4G CGNAT", "2,9s", "107ms RTT", "90% directs"],
          ["Cross-border CH↔FR", "1,4s", "32ms RTT", "95% directs"],
        ],
      },
      {
        type: "section",
        title: "Ce que ça change pour ToM Protocol",
        body: "Le serveur WebSocket de signalisation a un successeur validé. L'architecture cible (gossip + QUIC direct) est confirmée. Le chiffrement E2E via QUIC TLS est gratuit. Zéro port forwarding ou configuration manuelle requise.\n\nLes bugs trouvés et corrigés pendant les tests réels ont tous été de la gestion applicative, pas des limites du protocole.",
      },
      {
        type: "section",
        title: "Travaux restants",
        body: "Fork stratégique des modules nécessaires. Intégration avec le SDK TypeScript. Tests d'échelle (10-100 nœuds). Tests de résilience aux firewalls d'entreprise. La fondation est là — le reste est de la construction.",
      },
    ],
  },
  {
    slug: "the-open-messaging-whitepaper",
    title: "The Open Messaging",
    date: "2026-02-08",
    mediumUrl: "https://medium.com/@karaoui.malik/the-open-messaging-1f617ad6e4e4",
    summary: "Le White Paper v2 de ToM est publié. Un protocole qui cesse d'appartenir à ses créateurs pour devenir un espace commun de construction. Une ligne de départ, pas une fin.",
    tags: ["ToM Protocol", "White Paper", "P2P", "Décentralisation"],
    content: [
      {
        type: "lead",
        body: "Il existe deux catégories de White Papers : ceux qui expliquent qu'un projet est prêt, et ceux qui montrent pourquoi un projet ne doit surtout pas être fini trop tôt. Le White Paper v2 de ToM suit la deuxième approche.",
      },
      {
        type: "section",
        title: "Pourquoi écrire maintenant",
        body: "Le document émerge après une phase réelle de développement — messages circulants, relais apparaissant et disparaissant, problèmes concrets à résoudre. Il est né du réel, pas d'un tableau blanc. Ce n'est pas une promesse. C'est une fondation.",
      },
      {
        type: "section",
        title: "Ce que le White Paper n'est pas volontairement",
        body: "Pas une spécification finale. Pas une norme figée. Il expose le cadre et les principes tout en laissant volontairement le reste ouvert — condition nécessaire à la participation réelle.",
      },
      {
        type: "section",
        title: "L'architecture : vision et principes",
        body: "ToM est un protocole de transport destiné à devenir invisible comme TCP/IP ou HTTP. Chaque appareil devient le réseau. L'état présent prime sur l'historique. L'économie est un équilibre plutôt qu'un jeu spéculatif.\n\nL1 minimale, subnets éphémères, rôles distribués, consensus basé sur la présence plutôt que la richesse. Suffisamment précis pour être débattu, pas fermé pour empêcher l'évolution.",
      },
      {
        type: "section",
        title: "Laisser du travail ouvert comme acte politique",
        body: "Contrairement aux projets où tout est décidé d'avance, ToM laisse volontairement des paramètres à calibrer, des mécanismes à éprouver, des décisions discutables. Ce n'est pas de l'inachèvement — c'est une invitation à construire ensemble.",
      },
      {
        type: "section",
        title: "Le protocole n'appartient plus à ses créateurs",
        body: "C'est le moment où un projet cesse d'être le projet de quelqu'un pour devenir un espace commun de construction. Ce White Paper n'est pas une fin. C'est une ligne de départ.",
      },
    ],
  },
  {
    slug: "the-open-messaging-genese",
    title: "The Open Messaging — Genèse et Architecture",
    date: "2025-11-16",
    mediumUrl: "https://medium.com/@karaoui.malik/the-open-messaging-gen%C3%A8se-architecture-e50d1119e1db",
    summary: "Repenser la blockchain depuis zéro : non pas comme un registre financier, mais comme un bus de messagerie et de transport de données. Genèse du protocole ToM, ses fondements architecturaux et sa philosophie de décentralisation organique.",
    tags: ["ToM Protocol", "Blockchain", "Architecture", "P2P", "Décentralisation"],
    content: [
      {
        type: "lead",
        body: "Les blockchains existantes ont été conçues pour la sécurité monétaire, pas pour la messagerie en temps réel à grande échelle. Ce projet commence avec une prémisse différente : nous avons besoin d'un réseau qui est d'abord un bus de messagerie et de transport de données.",
      },
      {
        type: "section",
        title: "Genèse : les limites des blockchains actuelles",
        body: "La consolidation de l'industrie autour du mining et de la validation crée une centralisation de fait malgré les promesses de décentralisation. Une infrastructure coûteuse nécessitant un capital significatif. Un modèle conçu pour la sécurité financière qui devient inadapté à d'autres usages.",
      },
      {
        type: "section",
        title: "Architecture organique",
        body: "Chaque participant peut agir comme client, relai, observateur, gardien, archiviste ou validateur — les rôles se distribuent dynamiquement. La L1 retient uniquement l'état courant, pas l'historique complet des transactions. Les subnets éphémères se forment et se dissolvent selon les besoins.",
      },
      {
        type: "section",
        title: "Proof of Presence : valider par la présence",
        body: "La validation se fait par la participation active plutôt que par la puissance de calcul. Un Proof of Presence (PoP) plutôt qu'un Proof of Work. Ce mécanisme positionne le réseau comme écologiquement soutenable, en agrégeant les ressources des participants existants.",
      },
      {
        type: "section",
        title: "Prévention de la double dépense sans UTXO global",
        body: "Des engagements au niveau du wallet avec des observateurs distribués plutôt qu'un ensemble UTXO global. Cela permet la purge d'état tout en maintenant la sécurité contre les dépenses dupliquées — une architecture qui scale sans accumuler un historique croissant.",
      },
    ],
  },
]

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null
}
