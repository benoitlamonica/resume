# Benoit Portfolio Resume

A cinematic, interactive resume website built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Three.js.

> Built with caffeine, curiosity, and at least one "just one more animation" moment.

## Highlights ✨

- Animated single-page portfolio with section-aware navigation
- 3D hero scene with React Three Fiber and Drei
- Motion system with reduced-motion preference support
- Data-driven content from a central typed data file
- Hidden easter eggs and playful interactions
- ESLint Flat Config for TypeScript, TSX, and React
- VS Code workspace settings for ESLint fix-on-save

Bonus: no lorem ipsum harmed during production.

## Tech Stack 🧰

- React 18
- TypeScript 5
- Vite 6
- Tailwind CSS 3
- Framer Motion 11
- Three.js + @react-three/fiber + @react-three/drei
- ESLint 9 (Flat Config)

If the stack had a personality, it would be: fast, opinionated, and slightly dramatic.

## Project Structure 🗺️

```text
src/
  components/   Reusable UI and visual components (3D, cards, nav, etc.)
  sections/     Page sections (Hero, AI, Experience, Projects, Footer)
  data/         Typed content source (siteData)
  lib/          Hooks, motion helpers, utilities
```

## Getting Started 🚀

### 1. Install dependencies

Step one in every great adventure: install things.

```bash
npm install
```

### 2. Start development server

This is where pixels start moving.

```bash
npm run dev
```

### 3. Build for production

Ship mode: activated.

```bash
npm run build
```

### 4. Preview production build

Final check before showing it to the world (or your favorite recruiter).

```bash
npm run preview
```

## Linting 🧹

Run lint checks:

```bash
npm run lint
```

This project uses ESLint Flat Config in `eslint.config.ts` with:

- Recommended JavaScript rules
- Recommended TypeScript rules
- React and React Hooks rules
- React Refresh guidance
- React Three Fiber override for non-DOM JSX properties in the 3D scene

Translation: fewer surprises, cleaner commits, happier future-you.

## VS Code Setup 🛠️

Workspace settings are included in `.vscode/settings.json` and `.vscode/extensions.json`.

They provide:

- ESLint extension recommendation (`dbaeumer.vscode-eslint`)
- TypeScript and TSX ESLint validation
- Automatic ESLint fixes on save

If you do not have the ESLint extension installed, install it from the Extensions panel.

Yes, it fixes on save. Yes, it feels like magic. No, it is not cheating.

## Content Customization 🎨

Most portfolio content is centralized in `src/data/siteData.ts`:

- Hero intro and highlights
- AI workflow section
- Experience timeline
- Projects grid
- Social links and contact CTA
- Motion modal and easter-egg messages

Update this file to refresh the resume content without changing UI logic.

One file to rule your content, one file to find your typos.

## Tiny Dev Jokes 😄

- There are two hard things in computer science: cache invalidation, naming things, and centering a div.
- This portfolio is responsive, unlike me before coffee.
- If a bug disappears after adding `console.log`, it was never a bug, it was stage fright.

## Notes 📌

- Built as a private project (`"private": true` in `package.json`).
- If you deploy publicly, make sure your personal links and contact details are up to date.

## License

No license file is currently defined.
