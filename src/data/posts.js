export const posts = [
  {
    "slug": "brickoff-genese-methode-resultats",
    "title": "BrickOFF : genèse, méthode, résultats",
    "date": "2026-07-19",
    "summary": "1,03 million d'images, un pipeline de vision en deux étages qui tourne à 100 % sur le téléphone, et un rappel qui passe de 18 % à 51 % sur un vrai tas de LEGO en vrac. La genèse, la méthode et les résultats mesurés de BrickOFF.",
    "tags": [
      "BrickOFF",
      "Computer Vision",
      "CoreML",
      "Machine Learning",
      "iOS"
    ],
    "content": [
      {
        "type": "lead",
        "body": "BrickOFF part d'une frustration très concrète : un tas de LEGO en vrac, le vôtre ou celui de milliers de gens qui ont des bacs de pièces récupérées, héritées, mélangées, est un actif inutilisable. Personne n'a envie de trier 3 000 pièces à la main pour savoir ce qu'il peut construire."
      },
      {
        "type": "section",
        "title": "1. La genèse et la vision",
        "body": "L'idée : une app qui scanne le tas à la caméra, identifie chaque pièce (référence et couleur) 100 % en local, 100 % offline (aucune photo n'est envoyée sur un serveur, l'IA tourne entièrement sur le téléphone), puis propose des constructions réalisables avec exactement ce que vous avez, et guide pas à pas comme une notice officielle.\n\nCible produit : iOS et Android, iOS d'abord (V1) pour prouver le pipeline de vision sur un parc homogène avant de doubler la surface. Monétisation : gratuit, financé par la publicité, décision produit tranchée le 4 juillet.\n\nFeuille de route : V1 scan, inventaire, sets officiels réalisables (catalogue Rebrickable offline) ; V1.5 blueprints adaptés aux pièces possédées avec guidage pas à pas ; V2 Android ; V3 génération libre de plans inédits par IA embarquée (spike Go/No-Go)."
      },
      {
        "type": "section",
        "title": "2. L'approche technique",
        "body": "Le pipeline de vision tient en deux étages, entièrement embarqués sur le téléphone : la caméra détecte d'abord les pièces dans le tas (détection mono-classe), puis chaque pièce recadrée passe par un classifieur qui la reconnaît parmi environ 1 000 références, avant identification de la couleur en espace LAB (déterministe). L'inventaire obtenu est stocké en local (SQLite) et comparé au catalogue Rebrickable.\n\nPourquoi séparer détection et classification plutôt qu'un seul détecteur à 1 000 classes : la détection mono-classe maximise le rappel (ne rater aucune pièce dans le tas), la classification voit ensuite chaque pièce en gros plan pour une précision fine, et les deux modèles progressent indépendamment.\n\nChoix d'architecture (décision D11, tranchée le 07/07 après 8 runs) : SSDLite320-MobileNetV3 (torchvision, licence BSD-3 permissive), retenu comme simple référence de départ, promu candidat de production après avoir fait ses preuves de bout en bout. YOLOX et RT-DETR restent une option d'escalade si les cibles réelles ne sont pas atteintes."
      },
      {
        "type": "table",
        "title": "Budget ultra-léger (décision D04)",
        "rows": [
          [
            "Détecteur (.mlpackage)",
            "≤ 15 Mo"
          ],
          [
            "Classifieur (.mlpackage)",
            "≤ 25 Mo"
          ],
          [
            "Palette + configs",
            "< 1 Mo"
          ],
          [
            "Base Rebrickable (SQLite)",
            "≤ 80 Mo"
          ],
          [
            "Total assets",
            "≤ 120 Mo"
          ],
          [
            "App installée (IPA)",
            "< 350 Mo"
          ]
        ]
      },
      {
        "type": "section",
        "title": "Résultat mesuré à date",
        "body": "Export CoreML du détecteur à 7,6 Mo, soit la moitié du budget, avec parité bit-fidèle avec le modèle PyTorch d'origine. Le classifieur pèse environ 22 Mo avant quantization.\n\nInfrastructure d'entraînement : un MacBook Pro M1 16 Go, en local, via PyTorch MPS (Metal). Pas de cloud, le critère d'escalade (projeter plus de 48 h pour un run complet) n'a jamais été déclenché. Les runs de détection tournent en 4 à 7 minutes par epoch, la classification en 1 à 2 heures par epoch."
      },
      {
        "type": "section",
        "title": "3. Ce qui est fait",
        "body": "Légal (~95 %) : licences vérifiées (Rebrickable OK commercial, LDraw CC BY), marque BrickOFF libre (zéro conflit TMview/EUIPO/USPTO), risque brevet nul pour l'approche blueprints V1.5 (deux garde-fous datés : pas d'étapes automatiques par désassemblage avant 2028, pas d'AR superposée à la caméra avant 2032).\n\nDataset : 1,03 million d'images certifiées (sources réelles et synthétique), audité, converti au format YOLO avec validation numérique et visuelle.\n\nEntraînement : détecteur et classifieur tous deux fonctionnels (détail dans le journal d'entraînement ci-dessous).\n\nExport mobile (dry-run) : CoreML 7,6 Mo et ONNX 14,9 Mo, parité parfaite entre les deux formats (IoU 1.000 sur 50 images), la voie Android est donc déjà prouvée techniquement.\n\niOS : navigation, permission caméra, 22 tests verts, CI GitHub Actions.\n\nPipeline de scan : caméra, agrégateur multi-frames et écran de revue branché sur l'inventaire (92 tests), il ne manque que le branchement des vrais modèles (le mock tourne actuellement).\n\nInventaire : persistance en base locale, annulation de scan, écran fonctionnel (48 tests)."
      },
      {
        "type": "section",
        "title": "4. Le journal d'entraînement, ce qui a marché, ce qu'on a appris",
        "body": "C'est le cœur technique du projet, et son fil narratif le plus intéressant."
      },
      {
        "type": "table",
        "title": "Progression des runs de détection",
        "rows": [
          [
            "det_v0 (05/07)",
            "0,679",
            "Une val mélangée (rendus + photos) trompe l'arrêt automatique"
          ],
          [
            "det_v0.1 (05/07)",
            "0,763",
            "Bugfix : le flip horizontal ne retournait pas les boîtes. La supervision propre vaut plus que tout le reste (+8,4 pts d'un seul bug corrigé)"
          ],
          [
            "det_v1 (05/07)",
            "0,773",
            "Rappel max 0,985 : le modèle voit les pièces, il manque de confiance"
          ],
          [
            "det_v2C (06/07)",
            "0,666",
            "Synthétique Blender seul, zéro photo réelle : le rendu transfère bel et bien au réel"
          ],
          [
            "det_v2A ⭐ (06/07)",
            "0,820",
            "Mélange 70 % réel / 30 % synthétique : recette de référence, validée depuis"
          ],
          [
            "det_v3 (06/07)",
            "0,826",
            "+ rotations ±45° et crop-zoom : meilleur rappel opérationnel jamais mesuré"
          ],
          [
            "det_v4 (09/07)",
            "0,802",
            "Révèle que le juge de test mesurait le mauvais cas : sur un vrai tas dense, l'ancien champion ne trouvait que 20 % des pièces"
          ],
          [
            "det_v4b ⭐ (10/07)",
            "0,822 mono-pièce",
            "Champion actuel, jugé proprement en holdout : le rappel sur tas dense passe de 18 % à 51 % (×2,8)"
          ]
        ]
      },
      {
        "type": "section",
        "title": "Ce que la trajectoire raconte",
        "body": "Trajectoire globale : 0,679 à 0,826 de mAP en 4 jours, chaque gain rattaché à sa cause exacte.\n\nLes enseignements les plus transférables : une supervision propre (bugfix) rapporte plus que n'importe quel réglage fin ; la métrique d'arrêt doit regarder la vraie cible, pas une moyenne flatteuse ; le synthétique fonctionne mesurablement, et la diversité compte plus que le photoréalisme parfait (un relecteur humain distinguait mal le vrai du faux, mais le modèle apprenait quand même) ; et le vrai piège a été méthodologique, pas technique : le premier jeu de test (photos éparpillées) ne représentait pas le cas produit réel (un tas dense de 50 pièces qui se chevauchent). Une fois le bon juge construit (holdout propre, jamais entraîné), le vrai progrès est apparu, passer de 18 % à 51 % de rappel sur un tas dense.\n\nClassification (1 000 références) : environ 30 h de M1 au total, arrêt volontaire à l'epoch 24 car les cibles étaient dépassées depuis l'epoch 19, 82,5 % top-1 / 98,1 % top-5 sur test synthétique (cibles 80/95 dépassées), 89,2 % top-1 sur photos réelles. Les confusions résiduelles sont presque toutes des variantes de moules de la même pièce, pas des erreurs de vision mais des ambiguïtés du catalogue lui-même, qui seront fusionnées en groupes fonctionnels.",
        "image": {
          "src": "/brickoff/verif-annotations.jpg",
          "alt": "Grille de photos réelles avec chaque pièce détectée entourée d'une boîte rouge, distracteurs inclus (stylo, câble, pince à linge)",
          "caption": "Vérification du détecteur sur photos réelles, avec distracteurs volontaires pour tester les faux positifs."
        }
      },
      {
        "type": "section",
        "title": "5. La modélisation Blender",
        "body": "Faute d'assez de photos réelles de tas denses (le corpus réel trouvé, Gdańsk UT, est à 82 % mono-pièce, presque aucune scène d'occlusion), le projet génère ses propres scènes de tas via Blender.\n\nMoteur : Blender 5.1.2, rendu EEVEE headless, sur le même MacBook M1. Import LDraw scripté : 0,05 s par pièce, catalogue de 24 299 pièces disponibles. Annotations automatiques par Cryptomatte : masque par pièce extrait du rendu lui-même (alignement garanti), bbox émise si au moins 25 % de la pièce est visible, zone 10-25 % flaggée cas limite. Débit mesuré : 100 scènes en 260 secondes.\n\nDeux tirs de production : v1 avec 10 000 scènes en environ un jour machine, puis v2.1 (le tir actuel) avec 12 000 scènes et 342 541 pièces annotées, générées en une nuit (environ 13 h de M1). Composition : 28 % de scènes monochromes, des scènes très denses (46 pièces ou plus), des fonds seuls en négatifs purs, des scènes avec distracteurs non-LEGO, de 0 à 75 pièces par scène (médiane 29).\n\nRéalisme : plastique mat ou usé, éclairage domestique casual, auto-exposition simulant le comportement d'un téléphone, HDRI et textures CC0, distracteurs (stylo, pièce de monnaie, câble) pour apprendre au modèle à ignorer le bruit de la table. Recette gagnante : le même mélange 70 % réel / 30 % synthétique par epoch, validé d'abord en détection, repris tel quel en classification.",
        "image": {
          "src": "/brickoff/synth-render.jpg",
          "alt": "Grille de scènes Blender synthétiques de tas de LEGO sur différents sols (carrelage, parquet, uni)",
          "caption": "Scènes synthétiques v2.1 : sols variés, distracteurs non-LEGO, densités de tas différentes."
        }
      },
      {
        "type": "section",
        "title": "6. Ce qu'on a appris de plus important",
        "body": "La supervision compte plus que l'architecture : un bug de flip horizontal a coûté plus de points qu'un changement de modèle.\n\nLe juge de test doit ressembler au produit final, pas au dataset disponible. Le premier gain prouvé (det_v4) s'est révélé être un artefact de fuite train/test ; il a fallu construire un set holdout dédié (4 tas jamais entraînés) pour obtenir une preuve propre.\n\nLe synthétique transfère, même sans réalisme parfait : la diversité (angles, densités, éclairages) compte plus que le photoréalisme.\n\nLe vrai goulot du produit n'est pas la vision, c'est la calibration : le modèle voit presque tout (rappel max proche de 1,0) mais manque de confiance au seuil de décision, d'où la stratégie retenue : seuil bas (0,20-0,25) et vote sur plusieurs frames de la vidéo, déjà codée côté iOS."
      },
      {
        "type": "section",
        "title": "7. Ce qu'il reste à faire",
        "body": "Verdict sur de vrais tas : environ 100 photos réelles de vrais tas (10 à 40 pièces) restent à prendre, le seul juge final qui compte vraiment.\n\nAméliorer la précision de localisation sur les tas denses : le rappel a explosé, la précision de cadrage sur pièces qui se chevauchent reste le prochain chantier.\n\nFusionner les groupes fonctionnels de pièces interchangeables (moules équivalents).\n\nBrancher les vrais modèles dans le pipeline iOS (aujourd'hui : mock).\n\nMatching avec le catalogue Rebrickable, UI/UX, QA bêta, puis release.",
        "image": {
          "src": "/brickoff/piles-preannotation.jpg",
          "alt": "Grille de photos de tas denses de LEGO avant annotation, montrant des pièces qui se chevauchent",
          "caption": "Le prochain chantier : la précision de cadrage sur des tas denses où les pièces se chevauchent."
        }
      }
    ]
  },
  {
    "slug": "tom-protocol-rapport-avancement-2026-07",
    "title": "ToM Protocol : rapport d'avancement technique",
    "date": "2026-07-18",
    "summary": "765 commits, 117 builds, un protocole P2P sans serveur qui tourne sur une vraie flotte de 6 appareils. Jalons mesurés, bugs de terrain racontés en détail, un banc de test qui vérifie des garanties plutôt que des chronos, et les murs qui restent.",
    "tags": [
      "ToM Protocol",
      "Rust",
      "P2P",
      "Rapport d'avancement",
      "LLM-first"
    ],
    "content": [
      {
        "type": "lead",
        "body": "765 commits, 117 builds versionnés, un réseau sans maître qui tient debout. Rédigé depuis l'atelier le 18 juillet 2026, avec Claude Fable 5. Règle d'écriture héritée du projet : un jalon n'est « fait » que mesuré sur la flotte réelle, jamais sur un proxy vert. Tout chiffre de cet article a une source : un commit, un log, un fichier de code, une campagne instrumentée."
      },
      {
        "type": "table",
        "title": "TL;DR : les chiffres du jour",
        "rows": [
          [
            "Naissance du repo",
            "2 février 2026",
            "git log --reverse"
          ],
          [
            "Commits",
            "765",
            "git log (18/07)"
          ],
          [
            "Builds versionnés",
            "117 (flotte réelle en 107)",
            "TomVersion.swift"
          ],
          [
            "Code Rust du workspace",
            "~150 000 lignes",
            "comptage crates/"
          ],
          [
            "Tests",
            "~990 Rust (comptage 22/06, en croissance) + 771 TypeScript legacy",
            "CLAUDE.md"
          ],
          [
            "Flotte réelle",
            "6 nœuds : Mac, iPad, iPhone x2, Apple TV, NAS ARM64",
            "campagne 18/07"
          ],
          [
            "Campagne du 18/07",
            "1809 messages livrés, 0 perte finale, 0 crash",
            "rapport instrumenté"
          ],
          [
            "Gros transferts",
            "64 Mo livrés à ~6 Mo/s, E2E chiffré",
            "mesure flotte"
          ],
          [
            "Re-mesh après SIGKILL",
            "8 secondes (Apple TV tuée en plein trafic)",
            "campagne 18/07"
          ],
          [
            "Reconnexion à froid",
            "nœud < 1 s, flotte complète 18 s",
            "mesures 16/07 nuit"
          ],
          [
            "Red-team",
            "5 classes de DoS fermées, 6/6 kill-shots PoP fermés",
            "vault + commits"
          ]
        ]
      },
      {
        "type": "section",
        "title": "1. La thèse de départ, pour ceux qui prennent le train en marche",
        "body": "La roadmap Rust (R1 → R12) est complète. La phase actuelle n'est plus « faire marcher », c'est « rendre incassable, puis invisible ».\n\nToM (The Open Messaging) part d'une inversion simple : chaque appareil est à la fois client et relais. Pas de serveur central, pas de compte, pas de token. Les messages routent par des pairs, chiffrés de bout en bout (Ed25519 + X25519 + XChaCha20-Poly1305), et le réseau ne garde que le présent : TTL de 24 heures, puis purge globale, sans exception.\n\nSept décisions ont été gravées dès le début (« LOCKED ») et n'ont jamais été démenties depuis : la livraison, un message est livré si et seulement si le destinataire émet un ACK ; le TTL, 24 h de vie maximum puis purge, le réseau n'archive rien ; la L1 qui ancre l'état mais n'arbitre jamais ; la réputation à fade progressif, jamais de ban permanent ; l'anti-spam à charge progressive (« l'arroseur arrosé »), jamais d'exclusion ; l'invisibilité de la couche protocolaire pour l'utilisateur final ; et une portée pensée comme une fondation universelle, comme TCP/IP, pas comme un produit.\n\nLa métaphore fondatrice est le virus positif : le réseau se nourrit du travail qu'on lui confie et meurt seulement si plus personne ne s'en sert. Plus d'hôtes, un organisme plus fort.\n\nCinq mois et demi plus tard, la question n'est plus « est-ce que c'est possible ? ». C'est mesuré."
      },
      {
        "type": "section",
        "title": "2. La roadmap, tenue, et le point où le terrain l'a dépassée",
        "body": "Phase 1 (TypeScript) puis Phase 2 (Rust) : R1 → R12, 100 %.\n\nHuit livraisons TS (stack protocolaire complète, 771 tests), puis douze étapes Rust : enveloppe MessagePack et crypto, discovery gossip et rôles dynamiques, groupes avec failover Primary → Shadow → Candidate, durcissement et campagnes de stress, fork complet d'iroh avec élimination du bootstrap, durcissement production et DHT, récupération de groupe et antispam, et rendez-vous DHT zéro-config. Tout est livré.\n\nLa suite (R13 → R18) a été réordonnée par le réel, et c'est le passage le plus instructif du trimestre. Le 16/07, la feuille de route acte noir sur blanc : « DIRECT same-WiFi ne tient jamais, 100 % RELAY » était faux, un mensonge d'affichage. Le champ last_path côté FFI était un singleton global écrasé par n'importe quel pair. La vérité terrain : DIRECT partout, y compris iPad↔Apple TV en IPv6 global bilatéral (11 ms), NAS↔iPad en IPv6 (4,5 ms).\n\nTrois semaines de doute réseau se sont levées d'un coup : le réseau était meilleur que ses instruments de mesure. L'IPv6 global en hole-punch marche sans toucher à la box (le vrai verrou était une fonction qui testait les chemins existants au lieu de la capacité du socket). Conséquence stratégique : R14 (IPv6 first-class) est passé devant R13 (porte automatique) en maturité, le hole-punch v6 est plus fiable que le NAT v4 et court-circuite le besoin d'ouvrir des ports.\n\nAutre dépassement du plan par le terrain : le plan global du 06/07 notait l'attestation de présence (première brique de la couche L1) « prête à coder ». Dix jours plus tard elle tournait sur la flotte : challenges signés bidirectionnels, éphémères 30 s, puis vue signée du relais avec quorum de témoins distincts. Citation de la vision consolidée du 16/07 : « la vitesse réelle du projet est supérieure à la vitesse planifiée »."
      },
      {
        "type": "table",
        "title": "Roadmap Rust : R1 → R12",
        "rows": [
          [
            "TS 1-8",
            "Stack protocolaire complète, 771 tests",
            "livré"
          ],
          [
            "R1-R2",
            "Envelope MessagePack, crypto, Router, ProtocolRuntime",
            "livré"
          ],
          [
            "R3-R4",
            "Discovery gossip, keepalive, backup virus, rôles dynamiques",
            "livré"
          ],
          [
            "R5",
            "Groupes : hub, failover Primary→Shadow→Candidate, sender keys",
            "livré"
          ],
          [
            "R6",
            "TUI, intégration, campagnes de stress",
            "livré"
          ],
          [
            "R7",
            "Fork complet d'iroh, élimination du bootstrap",
            "livré"
          ],
          [
            "R8-R9",
            "Durcissement production, DHT, fiabilité de livraison",
            "livré"
          ],
          [
            "R10-R11",
            "Récupération de groupe, antispam, nonce anti-replay, admin",
            "livré"
          ],
          [
            "R12",
            "Rendez-vous DHT zéro-config, isolation recovery, anti-veille",
            "livré"
          ]
        ]
      },
      {
        "type": "section",
        "title": "3. L'acte de souveraineté : le fork",
        "body": "En février, ToM démarrait au-dessus d'iroh 0.96. En phase R7, tout le chemin critique a été forké et assimilé sous namespace tom-* (MIT) : tom-connect (~15K lignes, MagicSock et hole punching), tom-relay (~8K), tom-gossip (~5K), tom-quinn (6,5K), tom-quinn-proto (41K), tom-base, tom-metrics. Environ 75 000 lignes assimilées, sur les ~150 000 du workspace.\n\nCe n'est pas un fork décoratif : les identifiants protocolaires sont désormais souverains et volontairement incompatibles avec le réseau iroh public. Préfixe DNS _tom, SNI TLS .tom.invalid, en-têtes relay dédiés (X-Tom-NodeId, X-Tom-Challenge, X-Tom-Response), ALPN transport et gossip propres. iroh est le point de départ historique, pas une dépendance réseau. Le protocole n'a plus de maître amont."
      },
      {
        "type": "section",
        "title": "4.1 · Le routeur est un moteur de décision pur, et la décision #1 est dans le type",
        "body": "Le Router ne fait pas d'I/O : il retourne une RoutingAction, le runtime exécute. Extrait de crates/tom-protocol/src/router.rs (variante ReadReceipt coupée pour la lecture).\n\nLa variante ReAck est un bon exemple de ce que « décision LOCKED » veut dire en pratique : le cas pathologique (ACK perdu, réémission, doublon) est traité dans le type, avec la décision fondatrice citée en commentaire. Et l'ACK n'est pas une politesse : il est signé à l'émission et vérifié à la réception, un ACK forgé est rejeté.",
        "code": {
          "lang": "rust",
          "text": "#[derive(Debug)]\npub enum RoutingAction {\n    /// Regular message for us -- deliver to application.\n    /// `response` is an unsigned delivery ACK to send back to the sender.\n    Deliver { envelope: Envelope, response: Envelope },\n    /// ACK for us -- update message status tracker.\n    Ack { original_message_id: String, ack_type: AckType, from: NodeId },\n    /// Forward to next hop. `relay_ack` is an unsigned ACK for the original sender.\n    Forward { envelope: Envelope, next_hop: NodeId, relay_ack: Envelope },\n    /// Rejected (TTL exhausted, chain too deep, malformed, etc.)\n    Reject { reason: String },\n    /// Duplicate of an already-delivered message: do NOT re-deliver locally, but\n    /// RE-SEND the (unsigned) delivery ACK.\n    ReAck { response: Envelope },\n    /// Duplicate or expired -- silently ignore.\n    Drop,\n}\n\n// L'ACK n'est pas une politesse : il est signé à l'émission et vérifié à la réception.\nlet mut ack = response;\nack.sign(&self.secret_seed);\neffects.push(RuntimeEffect::SendEnvelope(ack));"
        }
      },
      {
        "type": "section",
        "title": "4.2 · Zéro-config : le rendez-vous DHT partagé, sans nœud privilégié",
        "body": "Le problème classique du P2P : comment deux inconnus se trouvent-ils sans bootstrap server ? Réponse ToM (ADR-010) : une constante publique (tom-protocol-rendezvous-v1) dérive 8 keypairs Ed25519 « slots » partagés par tout le monde. Chaque nœud publie {node_id, addrs} dans le slot hash(node_id) % 8 de la DHT Mainline (BEP-0044 mutable) ; n'importe qui lit les 8 slots et découvre les pairs vivants avec zéro connaissance préalable. Aucun nœud privilégié, aucune infra à payer.\n\nUn rendez-vous public est squattable par construction, donc chaque entrée découverte doit prouver la possession de son identité : un attaquant peut écrire dans le slot, il ne peut pas y mettre un pair qu'il ne possède pas. Extrait de crates/tom-protocol/src/runtime/loop.rs, ligne 1166.",
        "code": {
          "lang": "rust",
          "text": "fn rendezvous_entry_authentic(addr: &tom_dht::DhtNodeAddr) -> bool {\n    use ed25519_dalek::{Signature, Verifier, VerifyingKey};\n    let Ok(node_id) = addr.node_id.parse::<NodeId>() else {\n        return false;\n    };\n    let Ok(vk) = VerifyingKey::from_bytes(&node_id.as_bytes()) else {\n        return false;\n    };\n    if addr.sig.len() != 64 {\n        return false;\n    }\n    let mut sig_bytes = [0u8; 64];\n    sig_bytes.copy_from_slice(&addr.sig);\n    vk.verify(&addr.signing_bytes(), &Signature::from_bytes(&sig_bytes))\n        .is_ok()\n}"
        }
      },
      {
        "type": "section",
        "title": "4.3 · Le détecteur de zombies : « connecté » ne veut rien dire, « vivant » se mesure",
        "body": "Découverte de terrain : QUIC peut maintenir une connexion ouverte dont l'autre bout est mort (veille, cellulaire, suspension iOS). Le runtime ne fait donc plus confiance à connected_peers() seul, il exige du trafic entrant récent. C'est ce mécanisme qui donne l'auto-guérison mesurée en campagne : un nœud arrêté brutalement est détecté, contourné, et ré-intégré en secondes à son retour.",
        "code": {
          "lang": "rust",
          "text": "/// Silence window after which \"connected\" peers are treated as zombies.\n/// Healthy peers emit gossip announces (~10s) + heartbeats, so 45s of total\n/// inbound silence means the links are dead even if QUIC still reports them.\nconst LIVENESS_STALE_MS: u64 = 45_000;\n\nfn liveness_is_stale(last_inbound: u64, now: u64, threshold_ms: u64) -> bool {\n    now.saturating_sub(last_inbound) > threshold_ms\n}\n\nlet zombie = !connected.is_empty()\n    && liveness_is_stale(last_inbound_at, now_ms(), LIVENESS_STALE_MS);\nif connected.is_empty() || zombie {\n    // -> retour en phase d'amorçage : reprobe relais, republish DHT,\n    //    rendez-vous, rejoin gossip. Le nœud se ré-amorce seul.\n}"
        }
      },
      {
        "type": "section",
        "title": "4.4 · Une décision LOCKED, c'est une ligne qui rend la violation impossible",
        "body": "Le backup virus (ADR-009) réplique les messages des destinataires hors-ligne sur des nœuds de garde. La décision #2 (24 h max) n'est pas un commentaire ni une review, c'est un clamp à la construction de l'entrée, dans crates/tom-protocol/src/backup/types.rs. Le stockage SQLite ne peut pas contenir une entrée qui dépasse 24 h, quel que soit l'appelant. Purge câblée dans le tick du coordinateur. L'ADR-009 a ensuite été verrouillé par endurance réelle (15/15 en livraison différée) et par tests déterministes.",
        "code": {
          "lang": "rust",
          "text": "pub const MAX_TTL_MS: u64 = 24 * 60 * 60 * 1000;\n// ... dans le constructeur :\nlet ttl = ttl_ms.unwrap_or(DEFAULT_TTL_MS).min(MAX_TTL_MS);"
        }
      },
      {
        "type": "section",
        "title": "5. Les batailles : ce que le réseau réel a appris au code",
        "body": "C'est la partie qu'aucun benchmark de labo ne raconte. Tous ces bugs ne vivaient qu'en réel, sur de vrais appareils, de vrais réseaux, de vraies mises en veille.\n\nLe verrou-otage du pool (17/07). get_or_connect dialait, 10 à 20 secondes de timeout réseau, en tenant le mutex du pool de connexions, et le poll de statut passait dans la même boucle. Record mesuré : 74 secondes de boucle tenue. Fix : dial hors verrou et statut répondu hors boucle, et surtout un legs durable, le profileur timed() qui nomme tout await inline de plus de 300 ms dans la boucle du runtime. Règle gravée : jamais d'await réseau sous un mutex partagé.\n\nLe gel transport iOS (17/07). Un iPad prouvé gelé 5 min 21 s par un wedge tokio dans la couche transport, le timer FFI lui-même était mort, donc aucun timeout applicatif ne pouvait sauver. Cure : port de deux fixes upstream d'iroh, budgets FFI bornés, et au passage une régression de surdité UDP attrapée et hotfixée le jour même. Leçon : quand le runtime async est wedgé, la supervision doit vivre en dessous de lui.\n\nLa topologie empoisonnée (17/07). 1286 pairs persistés dans l'état local, des fantômes ravivés par gossip, des ticks de boucle à 84–218 secondes. Diagnostic tranché par un canari A/B (deux nœuds identiques, un seul purgé). La réponse de fond est arrivée cette semaine : anti-ravivage avec TTL 24 h strict sur les identités disparues, cohérent avec la décision #2, le réseau ne garde que le présent, y compris dans sa mémoire topologique.\n\nLe mensonge d'affichage « 100 % RELAY » (16/07). Déjà évoqué plus haut, le singleton last_path écrasé par n'importe quel pair. La leçon a été promue règle de projet : l'observabilité doit refléter la vérité terrain, par pair, par chemin, jamais un agrégat qui peut mentir.\n\nLe décodage silencieux (17/07). Une régression Swift : un champ non-optionnel ajouté à un type Codable sans initialiseur explicite, et toute la réception était jetée en silence côté app pendant que le transport livrait parfaitement. Fix, plus un test de contrat sur le JSON wire exact. Leçon : une frontière FFI mérite des tests de contrat, pas de la confiance.\n\nLe flake CI 1/256 (18/07). Un test de falsification crypto forçait le dernier octet à 0xff, sans effet si l'octet valait déjà 0xff, le message « falsifié » restait intact et déchiffrait, test rouge une fois sur 256. Fix : un flip garanti différent. Un flake probabiliste ne se reproduit pas en 23 runs, il se calcule.\n\nL'orage de timers (16/07). 18 intervalles tokio en mode Burst : après un stall (résume iOS, appareil faible), tous les ticks manqués rejouaient d'un coup, tempête de republish et de rejoin au pire moment. Fix : ne rattraper qu'un tick, jamais le backlog complet.\n\nLa méta-leçon de ces batailles tient en une phrase, déjà payée deux fois : les indicateurs verts sur des proxies laissent des régressions survivre des semaines. C'est elle qui a engendré le chantier suivant."
      },
      {
        "type": "section",
        "title": "6. Le hardtest : d'un banc de chronos à un banc d'invariants",
        "body": "Constat du 18/07 : nos campagnes valident l'envoi et la réception plus quelques chronos, c'est trop peu. Un test qui passe parce que « ça avait l'air d'aller » ne prouve rien. Le renversement, écrit dans la conception du banc chaos : sous une faute précise, est-ce que les garanties du protocole tiennent encore ? Un scénario qui livre 100 % des messages mais laisse une connexion zombie, ou gèle une boucle 45 s, ou double une livraison, échoue.\n\nHuit invariants durs encadrent désormais le protocole : zéro perte finale, ACK égale livraison à l'app sans ACK fantôme, reconvergence bornée sous 15 secondes après perte de pair, zéro connexion zombie au-delà de 45 secondes, zéro gel de boucle au-delà de deux fois la période mesurée, zéro crash non compté, mémoire bornée en endurance, et zéro double-livraison. Et 21 scénarios gradués en 6 niveaux, du sanity unicast jusqu'à une cascade combinatoire (kill d'un pair, message lourd en vol, handover cellulaire d'un autre, clock-skew d'un troisième, simultanés) et une endurance de 6 à 24 heures sous chaos. Le scénario-signature : un nœud fait un reset usine, saisit l'identifiant d'un pair jamais rencontré et hors ligne, écrit, le message doit arriver quand même, via backup et découverte, sans qu'ils se soient jamais parlé.\n\nLe premier étage tourne (build 116) : N nœuds in-process, chaos-monkey seedé donc reproductible (kill, revive, skew), et les quatre premiers invariants assertés avec un tracking réel des livraisons. Deux premières itérations du banc, écrites par des sous-agents, étaient tombées exactement dans le piège inverse : des assertions creuses qui ne pouvaient pas observer une double-livraison. Reprises à la main. Vérifier le travail des agents reste une discipline, pas une option.\n\nLe deuxième étage pilote les vrais appareils, là où vivaient le verrou-otage, le wedge transport et la surdité UDP. L'arsenal, déjà en place ou en construction : injection de fautes OS (SIGKILL, arrêt de service NAS, terminaison de process iOS/tvOS, mise en veille Mac réelle), réseau adverse (profils cellulaires dégradés sur iPhone/iPad, partition réseau côté Mac/NAS), API de contrôle par nœud (statut HTTP, commandes d'envoi et d'arrêt, endpoint de reset en chantier), télémétrie de vérité terrain (collecteur UDP horodaté à la réception, événements de changement de chemin par pair, traqueurs d'actions bouton), et du property-based testing qui a déjà exhibé un vrai bug protocolaire sur le QUIC multipath, corrigé en portant un patch upstream.\n\nLe chantier ouvert et assumé de ce banc : l'herméticité, un nœud de test ne doit jamais voir la flotte de production pendant les tests. C'est listé dans les murs de la feuille de route, pas caché sous le tapis.\n\nUn détail de conception qui montre le niveau d'exigence, dans l'étage L : le tracker de réception compte, il n'ensemble pas.",
        "code": {
          "lang": "rust",
          "text": "/// node_idx -> (payload -> number of times that exact payload was delivered).\n/// A COUNT, not a set: a set would silently dedup double-deliveries and make\n/// I8 impossible to observe (the exact trap the first two rounds fell into).\ntype ReceivedMap = HashMap<usize, HashMap<Vec<u8>, u32>>;"
        }
      },
      {
        "type": "section",
        "title": "7. L'arrivée de Fable 5 : le juge adverse à un million de tokens",
        "body": "Début juillet, l'atelier a intégré Claude Fable 5, premier modèle de la famille Claude 5 d'Anthropic, d'une classe au-dessus d'Opus. Son apport au projet n'est pas d'écrire du code plus vite. C'est un changement de méthode : le modèle qui développe est aussi celui qu'on retourne contre le projet.\n\nLe cas d'école : la revue « démolis-le » de l'ADR Proof of Presence, menée à 1M de tokens de contexte, assez pour tenir tout le protocole en tête d'un coup, code et docs. Verdict du 11/07 : PoP survit comme direction, pas comme état actuel, avec 6 kill-shots ancrés ligne par ligne, pas des opinions, des attaques : heartbeat déclaratif non gaté sur signature (une enveloppe forgée reconstruisait des pairs-fantômes), coût d'identité « KNOWN » quasi nul amorti en 14 h, témoin unique éclipsable, budget par-identité sans cap global agrégé.\n\nQuarante-huit heures plus tard : 6/6 fermés, vérifiés commit par commit, présence gatée sur la validité de signature, séparation entre Known (adresse découverte) et Online (travail soutenu prouvé), quorum de témoins distincts (promotion seulement si N témoins concordent, dédup par témoin, TTL 30 s), cap global symétrique. Détail savoureux : deux des six kill-shots étaient déjà fermés par du code existant que la doc n'avait pas rattrapé, l'audit a aussi débusqué la dérive documentaire, et des tests ont été ajoutés pour figer ce que personne n'avait figé.\n\nCe pattern est désormais institutionnalisé dans la vision consolidée : des checkpoints adversariaux périodiques dont le seul but est de démonter l'état présent. C'est ça, le dev LLM-first version 2026, pas un autocomplete, un partenaire qui code la journée, red-team le soir, et écrit ce rapport.\n\nEt ce n'est pas un hasard si ça marche sur ce projet : ToM est conçu depuis le début pour être LLM-first aussi côté adoption (docs structurées pour agents, SDK, MCP). Un protocole qu'un agent peut comprendre en entier est un protocole qu'un agent peut auditer en entier, et déployer chez un utilisateur en trois messages."
      },
      {
        "type": "section",
        "title": "8. Le jalon qui compte : sortir du labo",
        "body": "Le 17/07 au soir, le jalon produit : deux iPhones réels, sur réseaux cellulaires, qui conversent via ToM, dont un en LTE monté en direct IPv6 cellulaire, sans serveur, sans compte, sans configuration. La première conversation qui ne doit rien au labo.\n\nLe 18/07 au matin, la campagne totale instrumentée sur les 6 nœuds : 1809 messages livrés, 26 échecs transitoires tous rattrapés, 0 perte finale, 0 crash, 0 gel de boucle. SIGKILL de l'Apple TV en plein trafic : re-mesh en 8 s. Coupure data d'un iPhone : continuité sur 3 pairs sur 4, backup rejoué au retour.\n\nEt peut-être le plus révélateur : l'après-midi, une contre-enquête a invalidé 2 des 3 « findings » de la campagne. Le « gel de 45 s » et la « cascade de veille » ? Quatre arrêts manuels au bouton, prouvés par les traqueurs d'UI et les logs système. Le protocole s'était auto-guéri en moins de 10 s à chaque fois. Un projet qui instruit à charge et à décharge contre ses propres résultats, c'est cette discipline-là qui rend les 1809 messages sans perte crédibles."
      },
      {
        "type": "section",
        "title": "9. Ce qui reste dur : les murs, nommés",
        "body": "Rien sous le tapis. Les murs actuels, tels que consignés : l'entropie non-biaisable au niveau L1 reste le verrou de recherche principal, sans source d'aléa que personne ne peut griller, la sélection de quorums est attaquable, un budget d'étude est borné et une revue externe par un cryptographe est prévue. L'anti-Sybil quantifié doit encore donner un chiffre à la probabilité de quorum Sybil, avec un modèle qui inclut l'attaquant patient qui attend 6 mois. L'échantillon reste de 1 : toute la validation tourne sur une box, un FAI, un foyer ; avant distribution il faudra 3 à 5 foyers testeurs, d'autres FAI, d'autres pays. Le bus factor est de 1, le piège numéro un, devant tous les murs techniques, avec pour mitigations des specs normatives, une mémoire d'agent, et des docs LLM-first comme assurance-vie du projet. Restent aussi l'herméticité des tests réseau, la stabilité DIRECT au-delà d'une heure, et le SPOF de la porte publique. Et l'arrière-plan iOS reste un non-objectif assumé, une décision produit du 15/07 : pas de daemon, pas de push, premier plan en pleine contribution, arrière-plan en sursis de quelques minutes, filet de backup 24 h. Un choix de vision, pas un trou."
      },
      {
        "type": "section",
        "title": "10. La vision : crédible ? Le terrain dit mieux que ça",
        "body": "Reprenons la promesse du whitepaper : un nouveau protocole pour un internet qui n'appartient à personne. En février c'était une thèse. En juillet : le zéro-config est atteint, deux inconnus se trouvent par le rendez-vous DHT partagé, sans nœud privilégié, avec preuve de possession, le serveur de signaling est mort et enterré. La souveraineté du fil est atteinte, plus un octet du chemin critique ne dépend d'un tiers. La résilience est mesurée, pas promise : auto-guérison en secondes sous SIGKILL, zombies détectés en 45 s, zéro perte sur 1809 messages avec du chaos humain réel dedans. Et la couche L1 a démarré en avance sur son propre plan, et a déjà survécu à un red-team à 1M de tokens.\n\nLa vision de base n'est plus « potentiellement crédible ». Sur l'étage 0, elle est en retard sur son propre terrain, le réseau faisait déjà du direct IPv6 global pendant qu'on le croyait coincé en relay.\n\nLa suite est écrite en trois étages. Étage 0, le tuyau irréprochable (maintenant jusqu'à fin 2026) : DIRECT stable des jours entiers, porte publique automatique sur toute box, rejoin en moins de 2 secondes pour les pairs connus, un binaire qui s'installe sans terminal. Étage 1, le réseau qui se prouve lui-même (2027) : le Proof of Presence transforme la présence en intégrité, quorums imprévisibles, validation croisée, ancrage du présent sans registre global, utile même sans argent comme couche d'immunité anti-Sybil et anti-eclipse. Étage 2, la valeur comme preuve ultime (2028 et au-delà, conditionnel) : le portefeuille scellé auto-custodié n'est pas le but, c'est le test de vérité du PoP ; si un réseau de présence pure peut empêcher une double dépense sans grand livre ni frais, la thèse fondatrice est démontrée, et si les verrous de recherche ne tiennent pas, cet étage sera abandonné sans honte, la messagerie souveraine et le swarm d'intégrité justifient déjà le projet à eux seuls.\n\nEt au-dessus des étages, l'horizon qui donne son sens à chaque build : la disparition comme succès. Le nœud livré par défaut, dans la box, l'OS, le terminal de paiement. Le réseau qui finit par héberger son propre code. ToM comme primitive système que les apps appellent sans le savoir, comme une socket. L'incitation par l'accès, jamais par le jeton. Un protocole a réussi quand plus personne ne prononce son nom.\n\nIl y a une raison plus profonde de tenir cette ligne, et elle est dans la genèse du projet : les trois péages, la surveillance, la rente, le point central, reviennent toujours. L'email fut décentralisé, puis vint Gmail. Un protocole souverain n'est jamais terminé : il est maintenu libre, activement, contre une gravité constante. Chaque heure investie dans l'ennuyeuse fiabilité du tuyau est pour quelqu'un qu'on ne rencontrera jamais."
      },
      {
        "type": "section",
        "title": "Épilogue",
        "body": "Le 2 février, ce dépôt s'ouvrait sur un scaffold vide. Le 18 juillet, un message part d'un iPhone en LTE, se chiffre, trouve son destinataire sans qu'aucun serveur au monde sache qu'il existe, traverse en direct IPv6, revient acquitté et signé, et si le destinataire dort, le réseau le porte 24 heures puis l'oublie, exactement comme promis, parce qu'une ligne de code rend l'inverse impossible.\n\n765 commits. 117 builds. Zéro serveur. La suite : rendre tout ça ennuyeux de fiabilité, puis invisible.\n\nSources : git log du dépôt (765 commits, 02/02 → 18/07), les plans de feuille de route et de vision consolidée du projet, le banc de test chaos, la campagne instrumentée du 18/07, et le code cité verbatim aux emplacements indiqués. Rédigé avec Claude Fable 5."
      }
    ]
  },
  {
    slug: "second-cerveau",
    title: "Mon cerveau fusionne avec Claude, grâce à Obsidian",
    date: "2026-05-13",
    summary: "Comment j'ai transformé mon vault Obsidian en système nerveux central pour mes LLMs : notes, YouTube, SMS, vocaux, agents nocturnes. Mémoire privée, contextuelle, sans cloud.",
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
        body: "L'extension Chrome Obsidian Web Clipper est le bras armé du vault dans le navigateur. En un raccourci clavier, n'importe quelle page web, article, vidéo YouTube, thread, documentation, est aspirée dans le vault avec son contenu, sa date, sa source, et les tags que j'assigne à la volée.\n\nCe qui change tout : je ne bookmark plus jamais. Un bookmark est mort : il est statique, isolé, non cherchable dans le contexte de mes projets. Un clip dans Obsidian est vivant : il est lié aux notes qui y font référence, indexé dans le graphe, disponible pour le RAG.\n\nQuand je lis une vidéo YouTube sur le BM25 et que je la clip, elle atterrit dans mon vault avec le transcript, mes annotations, et un lien automatique vers toutes mes notes sur la recherche vectorielle. La connaissance s'accumule et se connecte.",
      },
      {
        type: "section",
        title: "La fusion : trois agents Claude travaillent chaque soir dans mon vault",
        body: "C'est ici que le système devient vraiment différent. Tous les soirs, pendant que je dors ou que je code, trois agents Claude planifiés s'activent automatiquement pour maintenir le pont entre mon cerveau et l'IA.\n\n20h00. Vault Reingest quotidien. Le premier agent ré-ingère l'intégralité de mon dossier ATELIER PROJETS dans le vault Obsidian. Chaque commit, chaque fichier modifié, chaque note de session Claude Code est capturé, daté, structuré en Markdown et intégré au graphe. Le vault ne reflète pas ce que j'ai pensé archiver. Il reflète ce que j'ai réellement fait aujourd'hui.\n\n21h00. Idriss, le bilan quotidien. Idriss est mon agent de synthèse. Il lit le vault, parcourt les commits du jour, analyse les handoffs, et produit un bilan : ce qui a été accompli, les blocages, les décisions, les next steps. Ce bilan est écrit dans le vault. Il devient mémoire.\n\nVendredi 22h00. Léonor, la stratège hebdomadaire. Léonor prend du recul. Elle lit une semaine entière de bilans Idriss et produit une analyse stratégique : ce qui avance bien, les patterns dans ma façon de travailler, les priorités pour la semaine suivante, les risques à surveiller.",
      },
      {
        type: "section",
        title: "La mémoire devient sélective et contextuelle",
        body: "Le vault n'est pas monolithique. Il est organisé par projet, par produit, par domaine. Quand je travaille sur LuniiSync, Claude reçoit dans son contexte uniquement les notes liées à LuniiSync. Quand je travaille sur Boîtes à Livres, il reçoit ce contexte.\n\nCe n'est plus un LLM généraliste. C'est un partenaire qui connaît mon travail en profondeur, parce que son contexte est nourri par des années de pensées organisées. Le tout, avec un moteur de recherche hybride BM25 + embeddings vectoriels via Ollama en local : la recherche sémantique comprend que \"fatigue de décision\" et \"trop de choix paralysent\" parlent de la même chose.",
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
        body: "Ce qui me fascine dans ce système, c'est son potentiel de généralisation. Aujourd'hui, c'est mon vault personnel couplé à mes agents. Demain : une équipe partageant un vault commun, un vault \"client\" nourri de tous les échanges et décisions, un vault \"apprentissage\" où chaque lecture s'accumule et devient interrogeable.\n\nLe vault Obsidian, ce n'est pas juste une nouvelle façon de prendre des notes. C'est une nouvelle façon de penser avec l'IA : en lui donnant accès à ce qu'on a vraiment pensé, pas à ce qu'on pense lui dire dans un prompt de cinq lignes.",
      },
    ],
  },
  {
    slug: "machines-evaluent-competences",
    title: "Quand les machines évaluent les compétences",
    date: "2026-02-25",
    mediumUrl: "https://medium.com/@karaoui.malik/quand-les-machines-%C3%A9valuent-les-comp%C3%A9tences-409cde3baa2f",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*-XH6VTCxFiFaKM29qPzxMQ.png",
    summary: "La visibilité précédait la validation. Ce modèle se fissure. Les agents IA évaluent désormais le code de façon autonome, et la qualité technique devient le principal mécanisme de distribution.",
    tags: ["IA", "Développement", "Agents", "Qualité"],
    content: [
      {
        type: "lead",
        body: "Pendant des décennies, la trajectoire d'un outil logiciel a suivi la même séquence : un développeur crée quelque chose, puis consacre autant d'énergie, sinon plus, à le faire connaître qu'à le faire fonctionner. Conférences, articles de blog, threads Twitter, démos en live, pitch decks. La visibilité précédait la validation. Et souvent, elle la remplaçait.",
      },
      {
        type: "section",
        title: "Des systèmes qui lisent, testent et jugent en totale autonomie",
        body: "Le paradigme actuel est en train de craquer. Ce modèle reposait sur une contrainte simple : les humains ne peuvent pas tout évaluer. Le volume de code produit dans le monde dépasse depuis longtemps la capacité de revue humaine. Alors on s'appuie sur des proxys : la réputation, le nombre d'étoiles GitHub, le réseau, la qualité du README. Des signaux sociaux, pas techniques.\n\nMais cette contrainte est en train de disparaître. Des agents logiciels (assistants de développement, systèmes d'évaluation automatisée, outils comme Claude Code, Copilot, Devin) analysent désormais du code, des architectures et des résultats sans biais émotionnel. Ce qu'ils évaluent n'est pas subjectif. La qualité technique devient un signal mesurable. Pas un argument de vente, un fait vérifiable.",
      },
      {
        type: "section",
        title: "Promotion → Visibilité → Essai → Adoption (ou abandon)",
        body: "Traditionnellement, l'adoption suivait ce chemin : le marketing était le point d'entrée. Sans visibilité, pas d'essai. Sans essai, pas d'adoption. Un outil pouvait être excellent et mourir dans l'anonymat.\n\nAvec des agents capables de découvrir, évaluer et intégrer automatiquement, la séquence change : Validation technique → Intégration automatisée → Visibilité humaine.\n\nUn outil pertinent n'a plus besoin d'un volume massif de communication pour exister. Des agents recherchent des solutions, comparent, exécutent des tests, puis intègrent celles qui répondent le mieux à un besoin concret. La découverte devient fonctionnelle plutôt que marketing. C'est un renversement fondamental. La preuve précède la promotion.",
      },
      {
        type: "section",
        title: "Le développeur isolé entre dans la partie",
        body: "Dans l'ancien modèle, un développeur solo avait peu de chances face à une équipe de 50 personnes avec un budget marketing. Le rapport signal/bruit était écrasant.\n\nDans le nouveau modèle, un développeur isolé peut produire un composant ou une librairie adoptée à grande échelle : parce que son utilité est démontrée automatiquement. Des bots explorent les registres de packages, les dépôts publics, les APIs ouvertes. Ils ne cherchent pas un logo séduisant ou un site web bien designé. Ils valident, stressent et mettent à l'échelle avant même que la diffusion humaine commence. La distribution suit la preuve.",
      },
      {
        type: "section",
        title: "Ce que ça change pour les projets",
        body: "Les projets capables de survivre à cette évaluation continue gagnent une trajectoire différente. Moins dépendante de la promotion, davantage ancrée dans la performance.\n\nL'intelligence artificielle agit ici à double titre. Comme filtre : elle élimine ce qui ne tient pas. Un code fragile, mal documenté, sans tests : il n'est pas rejeté par un humain fatigué. Il est rejeté par un système qui applique des critères de manière systématique, 24h/24. Comme multiplicateur : un outil validé, adapté et éprouvé par des agents peut ensuite être repris par les humains. Non parce qu'il a été présenté, mais parce qu'il a déjà prouvé qu'il fonctionne. La confiance est construite par la preuve, pas par le pitch.",
      },
      {
        type: "section",
        title: "Les nouvelles règles du jeu",
        body: "Ce shift implique des conséquences concrètes pour quiconque construit des outils, des librairies, ou des services techniques.\n\n1. La documentation devient un avantage compétitif. Un agent qui ne comprend pas comment utiliser un outil le contourne. Une API mal documentée est une API invisible dans un monde où les machines font la découverte.\n\n2. Les tests ne sont plus optionnels. Ils deviennent le premier critère de sélection. Pas les tests cosmétiques qui couvrent le happy path : les tests qui prouvent la résilience.\n\n3. Le code lisible bat le code clever. L'optimisation prématurée, les patterns obscurs, le code « élégant mais illisible », tout cela devient un handicap. La clarté est un signal de qualité pour un évaluateur automatisé.\n\n4. La maintenance compte autant que la création. Un projet abandonné, même brillant, sera écarté au profit d'un projet actif, même modeste. Les agents évaluent la vélocité des commits, la réactivité aux issues, la fraîcheur des dépendances.\n\n5. Le personal branding perd du poids relatif. Il ne disparaît pas : les humains restent dans la boucle. Mais le ratio s'inverse : 80% de la découverte pourrait bientôt être fonctionnelle, 20% sociale. Contre l'inverse aujourd'hui.",
      },
      {
        type: "section",
        title: "La compétence se manifeste par l'usage réel",
        body: "Dans ce modèle émergent, les systèmes sélectionnent ce qui fonctionne, éliminent ce qui ne tient pas sous contrainte, et amplifient ce qui apporte une valeur mesurable.\n\nLa compétence n'est plus ce que vous dites savoir faire. C'est ce que vos artefacts prouvent que vous savez faire.\n\nLe mouvement est engagé. La question n'est pas si, c'est à quelle vitesse ce nouveau modèle de sélection deviendra dominant.\n\nSi vous construisez des outils logiciels : investissez dans ce que les machines peuvent vérifier. Tests, documentation, lisibilité, résilience. C'est là que se joue votre visibilité future.\n\nLa preuve remplace la promotion. La qualité devient le marketing.",
      },
    ],
  },
  {
    slug: "python-enthousiasme-okazcar",
    title: "Et si le Python voyait ce que votre enthousiasme vous cache ?",
    date: "2026-02-17",
    mediumUrl: "https://medium.com/@karaoui.malik/et-si-le-python-voyait-ce-que-votre-enthousiasme-vous-cache-7389fa47de17",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*b947B_GVgasKrhxRxTRlQQ@2x.jpeg",
    summary: "Les achats automobiles d'occasion se font souvent dans l'urgence, avec un enthousiasme qui aveugle le jugement critique. Co-Pilot est une extension Chrome qui applique neuf filtres objectifs en deux secondes (prix, kilométrage, fraîcheur d'annonce, signaux faibles) pour voir ce que l'émotion cache.",
    tags: ["OkazCar", "Python", "Extension Chrome", "Produit"],
    content: [
      {
        type: "lead",
        body: "Vous connaissez cette sensation. Vous scrollez Leboncoin à 23h, un café froid à côté du clavier. Et là, vous la voyez. L'annonce parfaite. Le bon modèle, le bon prix, les belles photos. Votre cœur accélère. Votre cerveau, lui, a déjà décroché. C'est exactement là que les arnaques se glissent. Pas dans l'ombre. En pleine lumière, au milieu de votre enthousiasme.",
      },
      {
        type: "section",
        title: "Le problème : un marché opaque, des décisions sous contrainte",
        body: "Nous n'achetons pas une voiture tous les mois. En moyenne, c'est tous les 4 à 6 ans. Et ce jour-là, on achète souvent dans l'urgence : après une panne, un accident, une séparation, un changement de vie. On doit prendre une décision lourde financièrement dans un environnement qui n'est pas propre du tout.\n\nLe marché de l'occasion est opaque. Hétérogène. Technique. Nous cherchons des confirmations. Pas des contradictions.\n\nCo-Pilot est né de ce constat : l'acheteur a besoin d'un regard froid. Pas d'un expert payant. Pas d'un site de plus. Juste un copilote silencieux, installé dans son navigateur, qui fait le travail ingrat pendant que vous rêvez de votre prochaine voiture.",
      },
      {
        type: "section",
        title: "Un clic. Neuf verdicts. Zéro bullshit.",
        body: "Co-Pilot est une extension Chrome. Gratuite. Made in France.\n\nVous êtes sur une annonce Leboncoin ? Un clic sur l'icône. En deux secondes, neuf filtres indépendants passent l'annonce au crible. Pas besoin de copier-coller un lien. Pas besoin de changer d'onglet. Pas besoin de créer un compte. L'analyse arrive là où vous êtes déjà : sur l'annonce.\n\nMais surtout : l'analyse est froide. Elle ne projette rien. Elle ne fantasme rien. Elle mesure. Le score tombe. Vert, orange, rouge. Vous savez.",
      },
      {
        type: "section",
        title: "Ce que Co-Pilot voit (et que vous ne voyez pas)",
        body: "Le prix est trop beau ? Il sait pourquoi. Co-Pilot ne compare pas le prix à un vague « argus » statique. Il le replace dans un contexte réel : même modèle, même génération, même région, même tranche de kilométrage. Un prix n'est jamais « bon » ou « mauvais ». Il est cohérent... ou statistiquement anormal. Et quand un prix est anormalement bas et que l'annonce est en ligne depuis plus de 30 jours ? Co-Pilot le dit sans détour : « Anguille sous roche : les acheteurs n'ont pas franchi le pas. »\n\nLe compteur est crédible ? Ça dépend de la voiture. 150 000 km. Est-ce élevé ? La réponse dépend du type de véhicule, de son usage probable et de son âge réel. Un humain lit un chiffre. Un moteur lit une cohérence : âge × usage moyen = normalité ou déviation.\n\nL'annonce est « récente » ? Vraiment ? Leboncoin permet de supprimer et republier une annonce pour remonter en tête des résultats. Co-Pilot lit les vraies dates enfouies dans le code source : date de première publication, date d'indexation. Ce que vous voyez : « Annonce fraîche. » Ce que l'analyse voit : « Tentative de remise en avant. »\n\nLes signaux faibles : préfixe étranger, texte partiellement traduit, incohérence génération/année, indice fiscal ambigu. Pris isolément, ce sont des détails. Corrélés entre eux, ce sont des probabilités. Un humain ignore ces micro-signaux. Un moteur les agrège.",
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
        title: "Nuit du 12 février : Bug #1 · 0%",
        body: "Premier test en 4G réel (pas un hotspot USB contrôlé). Résultat : 0/20 pings. Zéro. Rien ne passe. Le NAS reçoit les pings et renvoie les pongs. Mais le MacBook ne les voit jamais.\n\nCause : le pool met en cache la connexion QUIC. Quand le NAT 4G rebind les ports (environ toutes les 30 secondes), la connexion en cache est morte. Mais close_reason().is_none() retourne true : QUIC pense que la connexion est vivante parce qu'aucun RST n'a été reçu. Chaque send() réutilise une connexion zombie.\n\nFix : 3 lignes dans node.rs. Sur erreur de open_bi(), évincer la connexion du pool avant de retourner l'erreur. Le prochain send() crée une connexion fraîche, refait le hole punch, et tout repart.",
      },
      {
        type: "section",
        title: "13 février, 7h42 : Bug #2 · 97%",
        body: "Nouveau build, nouveau départ. Trajet quotidien France → Suisse. 7 campagnes de test lancées pendant le trajet. Résultat : 97% de pings réussis, 100% de bursts réussis. L'éviction du pool fonctionne.\n\nMais campagne #7 : le test continu échoue 0/160 pings. Le MacBook entre dans une zone sans couverture, et le programme ne s'en remet jamais.\n\nCause : le send() réussit (la connexion QUIC semble vivante). Le pong ne revient jamais (timeout 10s). Le programme logge « pong timeout » mais ne fait rien : il continue à envoyer sur une connexion morte indéfiniment. La reconnexion n'était appelée que sur erreur de send(), pas sur timeout.\n\nFix : compteur de timeouts consécutifs. Après 3 timeouts d'affilée, on force l'éviction de la connexion.",
      },
      {
        type: "section",
        title: "16 février, 7h18 : Bug #3 · 99,85%",
        body: "Nouveau build. Autoroute A40, direction Suisse. Test continu : un ping par seconde, indéfiniment.\n\nSession 1 : 1638/1640 (99,88%). Latence de 1,26ms en 4G. Iroh trouve un chemin direct via hole punch UDP, et il tient : 1580 pings consécutifs sans une seule perte. Les 20 derniers pings montrent la dégradation progressive (900ms, 1396ms, 570ms), puis déconnexion totale, un tunnel. Le programme tente 10 reconnexions. Toutes échouent. Il abandonne.\n\nCause : en mode continu, try_reconnect() s'arrête après 10 tentatives. Si le tunnel dure plus de 2 minutes (backoff 1+2+4+8+16+32+32+32+32+32 secondes), c'est fini.\n\nFix : en mode continu, la boucle de reconnexion tourne indéfiniment. Le backoff plafonne à 32 secondes. Toutes les 5 tentatives ratées, on force une redécouverte réseau complète via Pkarr.\n\nSession 2 : 1110/1112 (99,82%). Relancé manuellement après le tunnel. RTT plus élevé (9,7ms vs 1,26ms), probablement un relay au lieu du direct pour ce segment réseau.",
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
        title: "Ce que ça prouve, et ce que ça ne prouve pas encore",
        body: "Ce que ça prouve : le P2P fonctionne sur 4G CGNAT en mouvement, sur autoroute, en changeant d'antenne-relais, en traversant des tunnels. Le hole punching maintient des sessions longues : 1580 pings consécutifs sans perte. La reconnexion automatique fonctionne après coupures. Les trois bugs provenaient tous de la gestion de cache côté applicatif, pas des limites du hole punching QUIC.\n\nCe que ça ne prouve pas encore : multi-nœuds (supérieur à 1-à-1), résilience aux firewalls d'entreprise bloquant UDP complètement, charge applicative réelle avec messages volumineux et chiffrement E2E.\n\nLa prochaine étape : porter la couche protocole ToM complète (routing, relay selection, enveloppes chiffrées, groupes) sur ce transport Rust validé. Le signaling server WebSocket a officiellement un successeur.",
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
        body: "Chaque protocole P2P finit par buter sur le même mur : le NAT. Ton appareil n'a pas d'adresse publique. Il est derrière une box, derrière un opérateur, derrière un firewall d'entreprise ou d'école. Et l'appareil d'en face aussi.\n\nLa solution classique : un serveur relay permanent. Tous les messages passent par un tiers. C'est ce que font Signal, WhatsApp, et à peu près tout le monde. C'est fonctionnel. Mais ce n'est pas du P2P. C'est du P2serveur2P.\n\nLe vrai P2P, c'est quand deux machines se trouvent et se parlent directement. Sans intermédiaire permanent. Le relay est un tremplin, pas une destination. Pour ça, il faut percer le NAT : c'est ce qu'on appelle le hole punching. ToM ne peut pas se permettre le luxe du relay permanent. Si le hole punching ne marche pas, le projet ne marche pas.",
      },
      {
        type: "section",
        title: "Le choix d'iroh (et pourquoi pas libp2p)",
        body: "Avant de coder quoi que ce soit, on a étudié trois options en profondeur.\n\nlibp2p (Protocol Labs, derrière IPFS) : le standard de facto du P2P. Multi-langage, écosystème énorme. Mais libp2p est relay-first : la connexion initiale passe par un relay, le hole punching est une optimisation optionnelle. Pour un protocole qui vise le zéro-infra, c'est un mauvais point de départ philosophique.\n\nHyperswarm (Holepunch, créateurs de BitTorrent) : DHT-first, philosophie proche de ToM. Simple, efficace. Mais Node.js uniquement, pas de support browser, communauté plus petite.\n\niroh (n0-computer, Rust, MIT, 7800+ stars) : QUIC natif, hole punching intégré avec relay fallback automatique, ~90% de connexions directes en production. Identité = clé Ed25519 (exactement le modèle de ToM), relais stateless (exactement la philosophie de ToM), chiffrement E2E automatique via QUIC TLS.\n\niroh n'est pas une dépendance permanente. Le plan est en trois phases : PoC avec iroh → fork stratégique des modules nécessaires → indépendance complète.",
      },
      {
        type: "section",
        title: "3 jours, 4 PoC : du Hello World au cross-border",
        body: "Jour 1. PoC-1 et PoC-2 : les fondations. PoC-1 : Echo QUIC. Deux nœuds, même machine. Connexion en 289ms, RTT 125ms via le relay iroh européen (auto-assigné, zéro config). PoC-2 : Gossip peer discovery. Trois nœuds qui se découvrent sans registre central via HyParView/PlumTree : un protocole épidémique. Neighbor détecté en 257ms. Exactement ce dont ToM a besoin pour remplacer son signaling server.\n\nJour 2. PoC-3 : l'architecture cible. Gossip pour la découverte, QUIC direct pour les messages. Deux couches, deux rôles. Découverte en 3 secondes, livraison du premier message en 4,8 secondes. Trois bugs subtils trouvés et corrigés, uniquement parce qu'on a testé « pour de vrai ».\n\nJour 3. PoC-4 : le test de vérité. Tout le reste n'était qu'un échauffement.",
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
          ["Scénario A · LAN WiFi", "0,37s", "49ms RTT", "100% directs"],
          ["Scénario B · 4G CGNAT", "2,9s", "107ms RTT", "90% directs"],
          ["Scénario C · Cross-border CH↔FR", "1,4s", "32ms RTT", "95% directs"],
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
        body: "Le signaling server a un successeur : gossip pour la découverte, QUIC pour le transport. L'architecture cible est validée. « Zéro infra » devient mesurable : pas de port forwarding, pas de STUN/TURN déployé, le relay sert d'amorce. Le chiffrement est gratuit : QUIC inclut TLS nativement, l'identité est une clé Ed25519.\n\nLe PoC prouve la faisabilité. Il ne prouve pas la production. Restent : fork stratégique des modules nécessaires, intégration avec le SDK TypeScript, tests d'échelle (10-100 nœuds), tests de résilience aux firewalls d'entreprise.\n\nIl y a 10 jours, ToM Protocol était un protocole P2P qui marchait, avec un cordon ombilical. Aujourd'hui, c'est un protocole P2P qui a prouvé qu'il peut couper le cordon. Pas avec un whitepaper. Avec un cargo run depuis une école en Suisse et 32ms de latence directe.",
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
        title: "Pourquoi écrire un White Paper maintenant, et pas plus tard",
        body: "Ce White Paper v2 arrive après une première phase de développement réelle : messages qui circulent, relais qui apparaissent et disparaissent, problèmes concrets à résoudre. Ce document est né du réel, pas d'un tableau blanc. Ce n'est pas une promesse. C'est une fondation.\n\nIl ne prétend pas que ToM est terminé. Il ne prétend pas que tout est résolu. Il ne prétend pas que les choix sont irrévocables. Il fait quelque chose de beaucoup plus rare : il expose clairement le cadre, les principes, les invariants, et laisse volontairement le reste ouvert.",
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
    title: "The Open Messaging · Genèse et Architecture",
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
        body: "Le consensus de ToM repose sur une idée centrale : ce n'est pas la puissance de calcul ou la mise de capital qui donne le droit de valider, mais la présence active et le bon comportement sur le réseau. D'où le Proof of Presence (PoP).\n\nChaque utilisateur U est caractérisé par deux quantités : Contribution_U et Usage_U. Score_U = Contribution_U − Usage_U. Les jetons du système ne représentent pas un capital à accumuler, mais la mesure de cet équilibre. On en gagne en contribuant, on en dépense en utilisant le réseau.\n\nPour le spam et les comportements abusifs, ToM adopte le principe de l'arroseur arrosé : plus un utilisateur tente de saturer le réseau, plus le protocole lui renvoie cette charge sous forme de travail local : micro-preuve-de-travail dont la difficulté augmente, sur-assignation de relai, tâches de validation non critiques. Le spam n'est pas seulement interdit, il est auto-destructeur.",
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
