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
]

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null
}
