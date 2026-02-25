# Landing Page — Malik Karaoui

## Stack
- React 19 + Vite
- CSS vanilla (custom properties)
- Framer Motion (animations scroll-triggered)
- Google Fonts: Inter + JetBrains Mono

## Structure One-Page

### Navigation
- Barre fixe, transparente au départ, backdrop-blur au scroll
- Logo "MK" à gauche, liens sections à droite (À propos, Projets, Contact)

### Hero (100vh)
- "Malik Karaoui" en typographie large (clamp 5rem → 8rem)
- Sous-titre punch : "Développeur · Explorateur · Bâtisseur"
- Trait bleu accent animé en largeur
- Scroll indicator (chevron animé)

### À Propos + Compétences
- Bio courte (2-3 lignes)
- Compétences en pills groupées par domaine :
  - IA & LLM : Python, LLM, IA locale, Prompt Engineering
  - Web : React, Vite, JavaScript, TypeScript, CSS
  - Backend & Data : Java, Firebase, SQL, API REST
  - Blockchain & P2P : Blockchain, P2P, Protocoles
- Stagger animation au scroll

### Projets (3 cartes)
- **ToM Protocol** — Protocole décentralisé, hérité de la vision WH4F
- **Co-Pilot** — Extension Chrome IA (bientôt Chrome Web Store)
- **Pizzaella.fr** — Plateforme pizza, lancement en cours
- Grille responsive 3 cols → 1 col mobile
- Hover : translateY -4px + box-shadow

### Contact & Footer
- Titre "Let's connect"
- Bouton email + icônes GitHub / LinkedIn
- Footer : © 2026 Malik Karaoui

## Palette
- Fond : #F5F7FA
- Surface : #FFFFFF
- Texte principal : #1A1A2E
- Texte secondaire : #6B7280
- Accent : #2563EB
- Accent hover : #1D4ED8
- Bordures : #E5E7EB

## Typographie
- Titres : Inter 700
- Corps : Inter 400
- Mono (tags) : JetBrains Mono

## Animations
- Fade-in + translateY au scroll (Framer Motion, InView)
- Stagger sur les pills compétences et cartes projets
- Nav : transition opacity/blur au scroll
- Hero : trait bleu animé au chargement
- Cartes : hover lift subtle
