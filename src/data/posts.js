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
    image: "https://miro.medium.com/v2/resize:fit:1200/1*-XH6VTCxFiFaKM29qPzxMQ.png",
    summary: "La visibilité précédait la validation. Ce modèle se fissure. Les agents IA évaluent désormais le code de façon autonome — et la qualité technique devient le principal mécanisme de distribution.",
    tags: ["IA", "Développement", "Agents", "Qualité"],
    content: [
      {
        type: "lead",
        body: "Pendant des décennies, la trajectoire d'un outil logiciel a suivi la même séquence : un développeur crée quelque chose, puis consacre autant d'énergie — sinon plus — à le faire connaître qu'à le faire fonctionner. Conférences, articles de blog, threads Twitter, démos en live, pitch decks. La visibilité précédait la validation. Et souvent, elle la remplaçait.",
      },
      {
        type: "section",
        title: "Des systèmes qui lisent, testent et jugent en totale autonomie",
        body: "Le paradigme actuel est en train de craquer. Ce modèle reposait sur une contrainte simple : les humains ne peuvent pas tout évaluer. Le volume de code produit dans le monde dépasse depuis longtemps la capacité de revue humaine. Alors on s'appuie sur des proxys — la réputation, le nombre d'étoiles GitHub, le réseau, la qualité du README. Des signaux sociaux, pas techniques.\n\nMais cette contrainte est en train de disparaître. Des agents logiciels — assistants de développement, systèmes d'évaluation automatisée, outils comme Claude Code, Copilot, Devin — analysent désormais du code, des architectures et des résultats sans biais émotionnel. Ce qu'ils évaluent n'est pas subjectif. La qualité technique devient un signal mesurable. Pas un argument de vente, un fait vérifiable.",
      },
      {
        type: "section",
        title: "Promotion → Visibilité → Essai → Adoption (ou abandon)",
        body: "Traditionnellement, l'adoption suivait ce chemin : le marketing était le point d'entrée. Sans visibilité, pas d'essai. Sans essai, pas d'adoption. Un outil pouvait être excellent et mourir dans l'anonymat.\n\nAvec des agents capables de découvrir, évaluer et intégrer automatiquement, la séquence change : Validation technique → Intégration automatisée → Visibilité humaine.\n\nUn outil pertinent n'a plus besoin d'un volume massif de communication pour exister. Des agents recherchent des solutions, comparent, exécutent des tests, puis intègrent celles qui répondent le mieux à un besoin concret. La découverte devient fonctionnelle plutôt que marketing. C'est un renversement fondamental. La preuve précède la promotion.",
      },
      {
        type: "section",
        title: "Le développeur isolé entre dans la partie",
        body: "Dans l'ancien modèle, un développeur solo avait peu de chances face à une équipe de 50 personnes avec un budget marketing. Le rapport signal/bruit était écrasant.\n\nDans le nouveau modèle, un développeur isolé peut produire un composant ou une librairie adoptée à grande échelle — parce que son utilité est démontrée automatiquement. Des bots explorent les registres de packages, les dépôts publics, les APIs ouvertes. Ils ne cherchent pas un logo séduisant ou un site web bien designé. Ils valident, stressent et mettent à l'échelle avant même que la diffusion humaine commence. La distribution suit la preuve.",
      },
      {
        type: "section",
        title: "Ce que ça change pour les projets",
        body: "Les projets capables de survivre à cette évaluation continue gagnent une trajectoire différente. Moins dépendante de la promotion, davantage ancrée dans la performance.\n\nL'intelligence artificielle agit ici à double titre. Comme filtre : elle élimine ce qui ne tient pas. Un code fragile, mal documenté, sans tests — il n'est pas rejeté par un humain fatigué. Il est rejeté par un système qui applique des critères de manière systématique, 24h/24. Comme multiplicateur : un outil validé, adapté et éprouvé par des agents peut ensuite être repris par les humains. Non parce qu'il a été présenté, mais parce qu'il a déjà prouvé qu'il fonctionne. La confiance est construite par la preuve, pas par le pitch.",
      },
      {
        type: "section",
        title: "Les nouvelles règles du jeu",
        body: "Ce shift implique des conséquences concrètes pour quiconque construit des outils, des librairies, ou des services techniques.\n\n1. La documentation devient un avantage compétitif. Un agent qui ne comprend pas comment utiliser un outil le contourne. Une API mal documentée est une API invisible dans un monde où les machines font la découverte.\n\n2. Les tests ne sont plus optionnels. Ils deviennent le premier critère de sélection. Pas les tests cosmétiques qui couvrent le happy path — les tests qui prouvent la résilience.\n\n3. Le code lisible bat le code clever. L'optimisation prématurée, les patterns obscurs, le code « élégant mais illisible » — tout cela devient un handicap. La clarté est un signal de qualité pour un évaluateur automatisé.\n\n4. La maintenance compte autant que la création. Un projet abandonné, même brillant, sera écarté au profit d'un projet actif, même modeste. Les agents évaluent la vélocité des commits, la réactivité aux issues, la fraîcheur des dépendances.\n\n5. Le personal branding perd du poids relatif. Il ne disparaît pas — les humains restent dans la boucle. Mais le ratio s'inverse : 80% de la découverte pourrait bientôt être fonctionnelle, 20% sociale. Contre l'inverse aujourd'hui.",
      },
      {
        type: "section",
        title: "La compétence se manifeste par l'usage réel",
        body: "Dans ce modèle émergent, les systèmes sélectionnent ce qui fonctionne, éliminent ce qui ne tient pas sous contrainte, et amplifient ce qui apporte une valeur mesurable.\n\nLa compétence n'est plus ce que vous dites savoir faire. C'est ce que vos artefacts prouvent que vous savez faire.\n\nLe mouvement est engagé. La question n'est pas si — c'est à quelle vitesse ce nouveau modèle de sélection deviendra dominant.\n\nSi vous construisez des outils logiciels : investissez dans ce que les machines peuvent vérifier. Tests, documentation, lisibilité, résilience. C'est là que se joue votre visibilité future.\n\nLa preuve remplace la promotion. La qualité devient le marketing.",
      },
    ],
  },
  {
    slug: "python-enthousiasme-okazcar",
    title: "Et si le Python voyait ce que votre enthousiasme vous cache ?",
    date: "2026-02-17",
    mediumUrl: "https://medium.com/@karaoui.malik/et-si-le-python-voyait-ce-que-votre-enthousiasme-vous-cache-7389fa47de17",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*b947B_GVgasKrhxRxTRlQQ@2x.jpeg",
    summary: "Les achats automobiles d'occasion se font souvent dans l'urgence, avec un enthousiasme qui aveugle le jugement critique. Co-Pilot est une extension Chrome qui applique neuf filtres objectifs en deux secondes — prix, kilométrage, fraîcheur d'annonce, signaux faibles — pour voir ce que l'émotion cache.",
    tags: ["OkazCar", "Python", "Extension Chrome", "Produit"],
    content: [
      {
        type: "lead",
        body: "Vous connaissez cette sensation. Vous scrollez Leboncoin à 23h, un café froid à côté du clavier. Et là, vous la voyez. L'annonce parfaite. Le bon modèle, le bon prix, les belles photos. Votre cœur accélère. Votre cerveau, lui, a déjà décroché. C'est exactement là que les arnaques se glissent. Pas dans l'ombre. En pleine lumière, au milieu de votre enthousiasme.",
      },
      {
        type: "section",
        title: "Le problème : un marché opaque, des décisions sous contrainte",
        body: "Nous n'achetons pas une voiture tous les mois. En moyenne, c'est tous les 4 à 6 ans. Et ce jour-là, on achète souvent dans l'urgence — après une panne, un accident, une séparation, un changement de vie. On doit prendre une décision lourde financièrement dans un environnement qui n'est pas propre du tout.\n\nLe marché de l'occasion est opaque. Hétérogène. Technique. Nous cherchons des confirmations. Pas des contradictions.\n\nCo-Pilot est né de ce constat : l'acheteur a besoin d'un regard froid. Pas d'un expert payant. Pas d'un site de plus. Juste un copilote silencieux, installé dans son navigateur, qui fait le travail ingrat pendant que vous rêvez de votre prochaine voiture.",
      },
      {
        type: "section",
        title: "Un clic. Neuf verdicts. Zéro bullshit.",
        body: "Co-Pilot est une extension Chrome. Gratuite. Made in France.\n\nVous êtes sur une annonce Leboncoin ? Un clic sur l'icône. En deux secondes, neuf filtres indépendants passent l'annonce au crible. Pas besoin de copier-coller un lien. Pas besoin de changer d'onglet. Pas besoin de créer un compte. L'analyse arrive là où vous êtes déjà — sur l'annonce.\n\nMais surtout : l'analyse est froide. Elle ne projette rien. Elle ne fantasme rien. Elle mesure. Le score tombe. Vert, orange, rouge. Vous savez.",
      },
      {
        type: "section",
        title: "Ce que Co-Pilot voit (et que vous ne voyez pas)",
        body: "Le prix est trop beau ? Il sait pourquoi. Co-Pilot ne compare pas le prix à un vague « argus » statique. Il le replace dans un contexte réel : même modèle, même génération, même région, même tranche de kilométrage. Un prix n'est jamais « bon » ou « mauvais ». Il est cohérent... ou statistiquement anormal. Et quand un prix est anormalement bas et que l'annonce est en ligne depuis plus de 30 jours ? Co-Pilot le dit sans détour : « Anguille sous roche — les acheteurs n'ont pas franchi le pas. »\n\nLe compteur est crédible ? Ça dépend de la voiture. 150 000 km. Est-ce élevé ? La réponse dépend du type de véhicule, de son usage probable et de son âge réel. Un humain lit un chiffre. Un moteur lit une cohérence : âge × usage moyen = normalité ou déviation.\n\nL'annonce est « récente » ? Vraiment ? Leboncoin permet de supprimer et republier une annonce pour remonter en tête des résultats. Co-Pilot lit les vraies dates enfouies dans le code source — date de première publication, date d'indexation. Ce que vous voyez : « Annonce fraîche. » Ce que l'analyse voit : « Tentative de remise en avant. »\n\nLes signaux faibles : préfixe étranger, texte partiellement traduit, incohérence génération/année, indice fiscal ambigu. Pris isolément, ce sont des détails. Corrélés entre eux, ce sont des probabilités. Un humain ignore ces micro-signaux. Un moteur les agrège.",
      },
      {
        type: "section",
        title: "Derrière le rideau : du Python, du bon sens, et une logique assumée",
        body: "Co-Pilot n'est pas une boîte noire magique. Ce n'est pas un oracle. Ce n'est pas une promesse de fiabilité absolue. C'est un moteur Python qui croise des données publiques, applique des règles explicites, mesure des écarts et agrège des signaux.\n\nIl ne décide pas à votre place. Il ne remplace pas votre jugement. Il enlève les angles morts.\n\nCo-Pilot est calibré pour le marché français : réglementation française, données publiques françaises, réalités d'usage françaises. Il ne promet pas l'impossible. Il ne prédit pas l'avenir. Il réduit l'asymétrie d'information. Et dans un marché où l'acheteur est souvent seul face à un vendeur mieux informé, cela change l'équilibre.\n\nParce que l'achat d'une voiture n'est pas un jeu. Et parce que mieux vaut voir trop de choses... que pas assez.",
      },
    ],
  },
  {
    slug: "p2p-99-85-autoroute",
    title: "De 0% à 99,85% sur autoroute : comment on a rendu un protocole P2P fiable sur 4G",
    date: "2026-02-16",
    mediumUrl: "https://medium.com/@karaoui.malik/de-0-%C3%A0-99-85-sur-autoroute-comment-on-a-rendu-un-protocole-p2p-fiable-sur-4g-53982518405e",
    image: "https://miro.medium.com/v2/resize:fit:1024/1*0oZI8KQQ4c2S8eSwA4q9TA.png",
    summary: "Trois bugs, 54 minutes d'autoroute, 2752 pings entre la France et la Suisse. Comment le protocole ToM est passé de 0% à 99,85% de fiabilité sur 4G en quatre jours de debuggage réel.",
    tags: ["ToM Protocol", "Rust", "P2P", "QUIC", "4G"],
    content: [
      {
        type: "lead",
        body: "Trois bugs, 54 minutes d'autoroute, et 2752 pings entre la France et la Suisse. La semaine précédente, on avait prouvé que ToM Protocol pouvait percer les NAT : un NAS dans un salon en France, un MacBook sur le WiFi d'une école en Suisse, 32ms de latence directe. Hole punching réussi à 100%. C'était un PoC. Propre, contrôlé, 20 pings par test. Cette semaine, on a volontairement arrêté de « faire joli ».",
      },
      {
        type: "section",
        title: "Le problème : un PoC n'est pas un protocole",
        body: "Le PoC précédent avait un secret : chaque test créait une connexion fraîche. 20 pings, on ferme, on recommence. Pas de connexion persistante, pas de cache, pas de pool.\n\nEn conditions réelles, c'est l'inverse : une messagerie maintient une connexion ouverte pendant des heures. Le réseau change (WiFi → 4G → tunnel → 4G). Le NAT rebind les ports. L'opérateur peut couper silencieusement les mappings UDP après ~30 secondes d'inactivité.\n\nPour tester ça, on a construit deux outils : tom-transport (une API Rust stable qui wrappe iroh avec un pool de connexions) et tom-stress (un binaire de stress test en modes séquentiel, burst, continu et campagne). Sortie JSON structurée, cross-compilée en ARM64 statique pour le NAS.",
      },
      {
        type: "section",
        title: "Nuit du 12 février : Bug #1 — 0%",
        body: "Premier test en 4G réel (pas un hotspot USB contrôlé). Résultat : 0/20 pings. Zéro. Rien ne passe. Le NAS reçoit les pings et renvoie les pongs. Mais le MacBook ne les voit jamais.\n\nCause : le pool met en cache la connexion QUIC. Quand le NAT 4G rebind les ports (environ toutes les 30 secondes), la connexion en cache est morte. Mais close_reason().is_none() retourne true : QUIC pense que la connexion est vivante parce qu'aucun RST n'a été reçu. Chaque send() réutilise une connexion zombie.\n\nFix : 3 lignes dans node.rs. Sur erreur de open_bi(), évincer la connexion du pool avant de retourner l'erreur. Le prochain send() crée une connexion fraîche, refait le hole punch, et tout repart.",
      },
      {
        type: "section",
        title: "13 février, 7h42 : Bug #2 — 97%",
        body: "Nouveau build, nouveau départ. Trajet quotidien France → Suisse. 7 campagnes de test lancées pendant le trajet. Résultat : 97% de pings réussis, 100% de bursts réussis. L'éviction du pool fonctionne.\n\nMais campagne #7 : le test continu échoue 0/160 pings. Le MacBook entre dans une zone sans couverture, et le programme ne s'en remet jamais.\n\nCause : le send() réussit (la connexion QUIC semble vivante). Le pong ne revient jamais (timeout 10s). Le programme logge « pong timeout » mais ne fait rien — il continue à envoyer sur une connexion morte indéfiniment. La reconnexion n'était appelée que sur erreur de send(), pas sur timeout.\n\nFix : compteur de timeouts consécutifs. Après 3 timeouts d'affilée, on force l'éviction de la connexion.",
      },
      {
        type: "section",
        title: "16 février, 7h18 : Bug #3 — 99,85%",
        body: "Nouveau build. Autoroute A40, direction Suisse. Test continu : un ping par seconde, indéfiniment.\n\nSession 1 : 1638/1640 — 99,88%. Latence de 1,26ms en 4G. Iroh trouve un chemin direct via hole punch UDP, et il tient : 1580 pings consécutifs sans une seule perte. Les 20 derniers pings montrent la dégradation progressive (900ms, 1396ms, 570ms), puis déconnexion totale — un tunnel. Le programme tente 10 reconnexions. Toutes échouent. Il abandonne.\n\nCause : en mode continu, try_reconnect() s'arrête après 10 tentatives. Si le tunnel dure plus de 2 minutes (backoff 1+2+4+8+16+32+32+32+32+32 secondes), c'est fini.\n\nFix : en mode continu, la boucle de reconnexion tourne indéfiniment. Le backoff plafonne à 32 secondes. Toutes les 5 tentatives ratées, on force une redécouverte réseau complète via Pkarr.\n\nSession 2 : 1110/1112 — 99,82%. Relancé manuellement après le tunnel. RTT plus élevé (9,7ms vs 1,26ms) — probablement un relay au lieu du direct pour ce segment réseau.",
      },
      {
        type: "table",
        title: "Progression des tests",
        rows: [
          ["12 fév, soir", "4G statique", "0/20 (0%)"],
          ["13 fév, matin", "4G autoroute, 7 campagnes", "97%"],
          ["16 fév, session 1", "Continu, 32 min", "1638/1640 (99,88%)"],
          ["16 fév, session 2", "Après tunnel", "1110/1112 (99,82%)"],
          ["Global", "2752 pings, 4 jours", "99,85%"],
        ],
      },
      {
        type: "section",
        title: "Ce que ça prouve — et ce que ça ne prouve pas encore",
        body: "Ce que ça prouve : le P2P fonctionne sur 4G CGNAT en mouvement, sur autoroute, en changeant d'antenne-relais, en traversant des tunnels. Le hole punching maintient des sessions longues — 1580 pings consécutifs sans perte. La reconnexion automatique fonctionne après coupures. Les trois bugs provenaient tous de la gestion de cache côté applicatif, pas des limites du hole punching QUIC.\n\nCe que ça ne prouve pas encore : multi-nœuds (supérieur à 1-à-1), résilience aux firewalls d'entreprise bloquant UDP complètement, charge applicative réelle avec messages volumineux et chiffrement E2E.\n\nLa prochaine étape : porter la couche protocole ToM complète (routing, relay selection, enveloppes chiffrées, groupes) sur ce transport Rust validé. Le signaling server WebSocket a officiellement un successeur.",
      },
    ],
  },
  {
    slug: "tom-protocol-perce-les-murs",
    title: "ToM Protocol perce les murs. Littéralement.",
    date: "2026-02-11",
    mediumUrl: "https://medium.com/@karaoui.malik/tom-protocol-perce-les-murs-litt%C3%A9ralement-f5fb808f558e",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*Wi6eJcw-LOTk3hA7Jpeu6Q.png",
    summary: "Le protocole P2P ToM a établi une connexion directe entre un MacBook en Suisse et un NAS Freebox en France en 1,4 seconde, avec 95% des pings en direct à 32ms. 100% de succès de hole punching sur tous les scénarios testés.",
    tags: ["ToM Protocol", "Rust", "P2P", "QUIC", "NAT", "Freebox"],
    content: [
      {
        type: "lead",
        body: "Il y a une semaine, ToM Protocol avait 771 tests qui passaient, une architecture P2P propre en TypeScript, et un signaling server WebSocket qui faisait le job. Il y a trois jours, on s'est posé la vraie question : est-ce que ça marche sans le serveur ? Pas « en théorie ». Pas dans un whitepaper. Sur un vrai réseau. Avec un vrai NAT. Entre deux vrais pays. La réponse est oui. Et on a les JSON pour le prouver.",
      },
      {
        type: "section",
        title: "Le problème que personne ne veut affronter",
        body: "Chaque protocole P2P finit par buter sur le même mur : le NAT. Ton appareil n'a pas d'adresse publique. Il est derrière une box, derrière un opérateur, derrière un firewall d'entreprise ou d'école. Et l'appareil d'en face aussi.\n\nLa solution classique : un serveur relay permanent. Tous les messages passent par un tiers. C'est ce que font Signal, WhatsApp, et à peu près tout le monde. C'est fonctionnel. Mais ce n'est pas du P2P. C'est du P2serveur2P.\n\nLe vrai P2P, c'est quand deux machines se trouvent et se parlent directement. Sans intermédiaire permanent. Le relay est un tremplin, pas une destination. Pour ça, il faut percer le NAT — c'est ce qu'on appelle le hole punching. ToM ne peut pas se permettre le luxe du relay permanent. Si le hole punching ne marche pas, le projet ne marche pas.",
      },
      {
        type: "section",
        title: "Le choix d'iroh (et pourquoi pas libp2p)",
        body: "Avant de coder quoi que ce soit, on a étudié trois options en profondeur.\n\nlibp2p (Protocol Labs, derrière IPFS) : le standard de facto du P2P. Multi-langage, écosystème énorme. Mais libp2p est relay-first : la connexion initiale passe par un relay, le hole punching est une optimisation optionnelle. Pour un protocole qui vise le zéro-infra, c'est un mauvais point de départ philosophique.\n\nHyperswarm (Holepunch, créateurs de BitTorrent) : DHT-first, philosophie proche de ToM. Simple, efficace. Mais Node.js uniquement, pas de support browser, communauté plus petite.\n\niroh (n0-computer, Rust, MIT, 7800+ stars) : QUIC natif, hole punching intégré avec relay fallback automatique, ~90% de connexions directes en production. Identité = clé Ed25519 (exactement le modèle de ToM), relais stateless (exactement la philosophie de ToM), chiffrement E2E automatique via QUIC TLS.\n\niroh n'est pas une dépendance permanente. Le plan est en trois phases : PoC avec iroh → fork stratégique des modules nécessaires → indépendance complète.",
      },
      {
        type: "section",
        title: "3 jours, 4 PoC : du Hello World au cross-border",
        body: "Jour 1 — PoC-1 et PoC-2 : les fondations. PoC-1 : Echo QUIC. Deux nœuds, même machine. Connexion en 289ms, RTT 125ms via le relay iroh européen (auto-assigné, zéro config). PoC-2 : Gossip peer discovery. Trois nœuds qui se découvrent sans registre central via HyParView/PlumTree — un protocole épidémique. Neighbor détecté en 257ms. Exactement ce dont ToM a besoin pour remplacer son signaling server.\n\nJour 2 — PoC-3 : l'architecture cible. Gossip pour la découverte, QUIC direct pour les messages. Deux couches, deux rôles. Découverte en 3 secondes, livraison du premier message en 4,8 secondes. Trois bugs subtils trouvés et corrigés, uniquement parce qu'on a testé « pour de vrai ».\n\nJour 3 — PoC-4 : le test de vérité. Tout le reste n'était qu'un échauffement.",
      },
      {
        type: "section",
        title: "Le setup : NAS Freebox (France) ↔ MacBook (Suisse)",
        body: "Un binaire Rust instrumenté. Sortie JSON structurée pour chaque événement. Cross-compilé en binaire statique ARM64 via cargo-zigbuild (16 MB, zéro dépendance dynamique), déployé sur un NAS Freebox Delta : une VM Debian sur ARM Cortex-A72. Du matériel « salon », pas du datacenter.\n\nLe binaire observe en temps réel le chemin via l'API connection.paths() d'iroh : relay ou direct, RTT par chemin, adresse distante. Chaque changement de chemin génère un événement JSON horodaté.",
      },
      {
        type: "table",
        title: "Résultats des trois scénarios",
        rows: [
          ["Scénario A — LAN WiFi", "0,37s", "49ms RTT", "100% directs"],
          ["Scénario B — 4G CGNAT", "2,9s", "107ms RTT", "90% directs"],
          ["Scénario C — Cross-border CH↔FR", "1,4s", "32ms RTT", "95% directs"],
        ],
      },
      {
        type: "section",
        title: "Le scénario C : le moment où tout change",
        body: "Pas prévu. On était en train de finir les tests quand le MacBook s'est retrouvé connecté au WiFi d'une école. En Suisse. Sur un réseau guest. Derrière un routeur d'établissement.\n\nLe NAS tourne toujours en France, derrière la box résidentielle. On relance le test. Sans rien changer. Sans config.\n\nHole punch en 1,4 seconde. 20 pings, 95% directs. RTT moyen : 32ms. Suisse → France. À travers le routeur d'une école et une box résidentielle. Sans port forwarding. Sans STUN. Sans TURN. Sans config.\n\nLe relay iroh (euc1-1.relay.n0.iroh-canary.iroh.link) ne sert que pour le tout premier ping. Ensuite : DIRECT. 100% de succès de hole punching sur les trois scénarios.",
      },
      {
        type: "section",
        title: "Ce que ça change pour ToM Protocol",
        body: "Le signaling server a un successeur : gossip pour la découverte, QUIC pour le transport. L'architecture cible est validée. « Zéro infra » devient mesurable : pas de port forwarding, pas de STUN/TURN déployé, le relay sert d'amorce. Le chiffrement est gratuit : QUIC inclut TLS nativement, l'identité est une clé Ed25519.\n\nLe PoC prouve la faisabilité. Il ne prouve pas la production. Restent : fork stratégique des modules nécessaires, intégration avec le SDK TypeScript, tests d'échelle (10-100 nœuds), tests de résilience aux firewalls d'entreprise.\n\nIl y a 10 jours, ToM Protocol était un protocole P2P qui marchait — avec un cordon ombilical. Aujourd'hui, c'est un protocole P2P qui a prouvé qu'il peut couper le cordon. Pas avec un whitepaper. Avec un cargo run depuis une école en Suisse et 32ms de latence directe.",
      },
    ],
  },
  {
    slug: "the-open-messaging-whitepaper",
    title: "The Open Messaging",
    date: "2026-02-08",
    mediumUrl: "https://medium.com/@karaoui.malik/the-open-messaging-1f617ad6e4e4",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*XJXGlH-kBW5nrPJCQ0A5cg.png",
    summary: "Le White Paper v2 de ToM est publié. Un protocole qui cesse d'appartenir à ses créateurs pour devenir un espace commun de construction. Une ligne de départ, pas une fin.",
    tags: ["ToM Protocol", "White Paper", "P2P", "Décentralisation"],
    content: [
      {
        type: "lead",
        body: "Il existe deux types de White Papers. Ceux qui expliquent pourquoi un projet est déjà « prêt ». Et ceux qui expliquent pourquoi un projet ne doit surtout pas être fini trop tôt. Le White Paper v2 de The Open Messaging (ToM) appartient résolument à la seconde catégorie. Ce document n'est pas une promesse marketing. Ce n'est pas une levée de fonds déguisée. Ce n'est pas une feuille de route gravée dans le marbre. C'est un socle.",
      },
      {
        type: "section",
        title: "Pourquoi écrire un White Paper maintenant — et pas plus tard",
        body: "Ce White Paper v2 arrive après une première phase de développement réelle : messages qui circulent, relais qui apparaissent et disparaissent, problèmes concrets à résoudre. Ce document est né du réel, pas d'un tableau blanc. Ce n'est pas une promesse. C'est une fondation.\n\nIl ne prétend pas que ToM est terminé. Il ne prétend pas que tout est résolu. Il ne prétend pas que les choix sont irrévocables. Il fait quelque chose de beaucoup plus rare : il expose clairement le cadre, les principes, les invariants — et laisse volontairement le reste ouvert.",
      },
      {
        type: "section",
        title: "Une vision claire (et assumée)",
        body: "ToM est un protocole de transport, un BUS de données, destiné à devenir aussi invisible que TCP/IP ou HTTP. Chaque appareil devient le réseau. L'état présent prime sur l'historique. La masse remplace le capital et la puissance de calcul. L'économie est un équilibre, pas un jeu spéculatif.\n\nLe document décrit la L1 minimale, les subnets éphémères, les rôles distribués, le consensus basé sur la présence plutôt que la richesse. Tout est volontairement suffisamment précis pour être débattu, mais pas suffisamment fermé pour empêcher l'évolution.",
      },
      {
        type: "section",
        title: "Une philosophie radicalement ouverte",
        body: "Le dépôt GitHub de ToM n'est pas « propre » au sens marketing. Le wiki n'est pas une documentation figée. Et c'est intentionnel. On y trouve des questions ouvertes, des alternatives non tranchées, des mécanismes à calibrer, des décisions discutables.\n\nUn protocole qui prétend être un bien commun ne peut pas être écrit dans un coin.",
      },
      {
        type: "section",
        title: "Laisser du travail à faire est un acte politique",
        body: "Dans beaucoup de projets open-source, tout est déjà décidé. Contribuer revient à corriger des bugs ou documenter des choix existants. ToM fait le choix inverse : il reste des paramètres à calibrer, des mécanismes à éprouver. Ce n'est pas un manque de maturité. C'est une condition de la participation réelle.",
      },
      {
        type: "section",
        title: "Ce protocole n'appartient déjà plus à une personne",
        body: "The Open Messaging ne peut pas devenir une infrastructure commune si un seul acteur en garde le contrôle. Soit il devient collectif, soit il ne mérite pas d'exister.\n\nLe White Paper v2 marque précisément ce basculement : le moment où le projet cesse d'être « le projet de quelqu'un » pour devenir un espace commun de construction. Ce White Paper n'est pas une fin. C'est une ligne de départ.\n\nSi tu veux casser, tester, améliorer : le travail est ouvert. Et il n'appartient déjà plus à personne.",
      },
    ],
  },
  {
    slug: "the-open-messaging-genese",
    title: "The Open Messaging — Genèse et Architecture",
    date: "2025-11-16",
    mediumUrl: "https://medium.com/@karaoui.malik/the-open-messaging-gen%C3%A8se-architecture-e50d1119e1db",
    image: "https://miro.medium.com/v2/da:true/bc1f8416df0cad099e43cda2872716e5864f18a73bda2a7547ea082aca9b5632",
    summary: "Repenser la blockchain depuis zéro : non pas comme un registre financier, mais comme un bus de messagerie et de transport de données. Genèse du protocole ToM, ses fondements architecturaux et sa philosophie de décentralisation organique.",
    tags: ["ToM Protocol", "Blockchain", "Architecture", "P2P", "Décentralisation"],
    content: [
      {
        type: "lead",
        body: "The Open Messaging naît d'un constat simple : les blockchains actuelles ont été pensées pour sécuriser de la valeur monétaire avant tout, pas pour transporter massivement des messages et des données en temps réel. Un besoin fondamental reste mal adressé : un BUS de communication mondial, ultra léger, résilient, gratuit dans l'esprit, capable de délivrer des octets de A à B sans devenir une usine à gaz ou une industrie fermée.",
      },
      {
        type: "section",
        title: "Genèse : repenser la blockchain depuis zéro",
        body: "Bitcoin a été conçu comme un registre de transactions infalsifiable. Ethereum a ajouté la programmabilité. Puis sont arrivées des centaines de L1 et L2, chacune avec ses compromis. Pourtant, le besoin fondamental d'un BUS de communication reste mal adressé.\n\nLe deuxième constat touche à l'économie du consensus. Dans Bitcoin comme dans Ethereum, la validation est devenue une industrie : fermes de minage, pools, data centers, validateurs professionnels. L'accès au pouvoir de validation se paye en matériel, en énergie ou en capital immobilisé. Cela crée de la rente, de la centralisation de fait, et une barrière d'entrée.\n\nÀ cela s'ajoute le problème de l'historique : la plupart des blockchains traînent l'intégralité des transactions depuis leur genèse. Bitcoin approche le téraoctet, Ethereum accumule un état toujours plus lourd.\n\nThe Open Messaging part de ces constats. Et si l'on repensait la blockchain non pas comme un grand livre comptable historique, mais comme un organisme vivant, un BUS organique, dont le seul rôle est de maintenir un état présent cohérent et de délivrer des messages efficacement ?",
      },
      {
        type: "section",
        title: "Un réseau où chaque utilisateur est client ET serveur",
        body: "Dans ToM, chaque nœud joue plusieurs rôles possibles : messager, relai, observateur, validateur, archiviste, gardien. Ces rôles ne sont jamais figés : ils tournent, se redistribuent, et sont attribués via des mécanismes d'assignation pseudo-aléatoires et de Proof of Presence (PoP).\n\nLa L1 de ToM n'est pas une longue chaîne historique. C'est un BUS organique qui ne retient que l'état présent et quelques ancres récentes. Trois idées clés : purge agressive des données anciennes, genèse glissante (la « genèse » se déplace dans le temps), état présent plutôt qu'historique.\n\nAu-dessus de la L1, des subnets entièrement dynamiques. Chaque subnet naît, vit et meurt en fonction d'un besoin concret : une conversation, un groupe, un canal thématique, un flux de données.",
      },
      {
        type: "section",
        title: "Consensus PoP et économie d'équilibre",
        body: "Le consensus de ToM repose sur une idée centrale : ce n'est pas la puissance de calcul ou la mise de capital qui donne le droit de valider, mais la présence active et le bon comportement sur le réseau. D'où le Proof of Presence (PoP).\n\nChaque utilisateur U est caractérisé par deux quantités — Contribution_U et Usage_U. Score_U = Contribution_U − Usage_U. Les jetons du système ne représentent pas un capital à accumuler, mais la mesure de cet équilibre. On en gagne en contribuant, on en dépense en utilisant le réseau.\n\nPour le spam et les comportements abusifs, ToM adopte le principe de l'arroseur arrosé : plus un utilisateur tente de saturer le réseau, plus le protocole lui renvoie cette charge sous forme de travail local — micro-preuve-de-travail dont la difficulté augmente, sur-assignation de relai, tâches de validation non critiques. Le spam n'est pas seulement interdit, il est auto-destructeur.",
      },
      {
        type: "section",
        title: "Le défi de la double dépense sans historique complet",
        body: "Comment empêcher la double dépense dans un réseau qui refuse de garder un historique complet ? Bitcoin résout cela avec un UTXO set global. Dans ToM, la L1 se veut ultra purgée.\n\nSolution : plutôt que de faire vivre un UTXO set global, chaque wallet dispose de son propre engagement d'état, et des observateurs distribués garantissent que cet état ne peut pas être modifié de façon incohérente. State_W = { wallet_id, commit (engagement cryptographique de l'état local), net_sig (signature agrégée des observateurs), height (numéro de version) }.\n\nPour effectuer une dépense, le propriétaire propose une transition explicite avec from_commit et to_commit. Les observateurs vérifient qu'aucun d'eux n'a déjà signé une autre transition depuis le même from_commit. Cette continuité des commits joue le rôle du UTXO set local. L'historique détaillé quitte la L1 et se réfugie dans les engagements et les archives.\n\nOn peut décrire ce système avec une métaphore : votre portefeuille est comme un titre de propriété. À chaque vente, vous mettez à jour le titre et des témoins co-signent. Les différents Commit_W jouent le rôle de photos successives de votre portefeuille.",
      },
      {
        type: "section",
        title: "Vers une utilisation massive : addition de puissance et gratuité",
        body: "The Open Messaging prend le chemin inverse des data centers : plutôt que de concentrer la puissance dans quelques lieux physiques, le réseau devient un méta-ordinateur formé par l'ensemble de ses participants. Plus il y a d'utilisateurs, plus il y a de puissance disponible.\n\nSur le plan écologique, cette approche est plus vertueuse : en supprimant la nécessité d'ASICs dédiés ou de fermes spécialisées, on réduit la pression à produire toujours plus de matériel.\n\nToM vise une forme de gratuité d'accès : si l'on joue le jeu (en relayant, en validant, en stockant temporairement), l'expérience reste fluide et quasi gratuite. Si l'on abuse, le protocole répond par une augmentation du travail local jusqu'à rendre l'abus irrationnel.\n\nMême si ToM est pensé d'abord comme un BUS de messagerie, son architecture pose les bases d'applications beaucoup plus larges : paiements, coordination distribuée, jeux, réseaux sociaux, services publics numériques. Tout ce qui a besoin d'un transport léger, décentralisé et résilient peut en bénéficier.",
      },
    ],
  },
]

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null
}
