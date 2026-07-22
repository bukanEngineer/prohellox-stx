## Quick start

```bash
# 1. Install
npm install

# 2. Run Storybook (http://localhost:6006)
npm run storybook

# 3. Build the static Storybook (used by Chromatic CI)
npm run build-storybook

# 4. Run Chromatic locally — needs CHROMATIC_PROJECT_TOKEN in env
npx chromatic --project-token=<your-token>
```

## Using this package in an app

Install it as a dependency, then import components and stylesheets from the built `dist/` output:

```bash
npm install prohellox-designsystem
```

```jsx
import "prohellox-designsystem/global.css"; // resets + tokens + @font-face (once, at your app's entry)
import { Button, Tag, Card } from "prohellox-designsystem";

export default function Example() {
  return (
    <Card shadow={1} title="Welcome">
      <Tag tone="positive">Verified</Tag>
      <Button variant="primary">Continue</Button>
    </Card>
  );
}
```

Each component imports its own CSS (`import "./Button.css"` etc.) as part of the package — this requires a bundler that handles CSS-from-JS imports (Vite, webpack, Next.js, Remix, CRA all do this out of the box, including for `node_modules` dependencies). Running the package's compiled output directly under plain Node (no bundler) is not a supported consumption path.

`prohellox-designsystem/tokens.css` is also available on its own if you only want the CSS variables and `@font-face` rules without the body reset from `global.css`.

### Building the package

`npm run build` compiles `src/` with Babel into `dist/` (ESM, `.jsx` extensions preserved, cross-file imports rewritten to match), generates type declarations with `tsc`, and copies fonts/assets/CSS alongside — mirroring the `src/` layout so relative asset paths keep resolving. `npm run prepublishOnly` runs lint + test + build automatically before `npm publish`.

## Wiring up Chromatic

1. Sign in at [chromatic.com](https://www.chromatic.com) and link your GitHub repo. Chromatic gives you a **project token**.
2. In your repo, go to **Settings → Secrets and variables → Actions → New repository secret** and add:
   - Name: `CHROMATIC_PROJECT_TOKEN`
   - Value: the token from step 1.
3. Push to `main` or open a PR. The workflow at `.github/workflows/chromatic.yml` will build Storybook, upload it to Chromatic, and post a PR comment with the diff URL.

The workflow uses `onlyChanged: true` (TurboSnap) so only stories whose dependencies changed get re-snapshotted — keeps your monthly snapshot budget low.

## Stable Storybook URL (Vercel)

Production Storybook (stable URL): **https://prohellox-stx.vercel.app**

Chromatic build URLs change per run. Vercel serves the static Storybook and updates that same URL on every push to `main` (Git integration on `bukanEngineer/prohellox-stx`). PRs get preview URLs automatically.

Build is locked to Storybook via `vercel.json` and project settings:

- Build Command: `npm run build-storybook`
- Output Directory: `storybook-static`
- Framework: Other (not the package `npm run build` → `dist/`)

Chromatic (visual regression) and Vercel (hosted Storybook) both run from git pushes — they are independent. Local `npm run storybook` / Chromatic CLI does **not** update the Vercel URL; push to `main` (or open a PR for a preview).

## Project layout

```
testing-design-system/
├── package.json
├── vite.config.js
├── chromatic.config.json
├── vercel.json                 ← Storybook static deploy to Vercel
├── .storybook/
│   ├── main.js                 ← stories glob + framework config
│   └── preview.js              ← global styles + backgrounds + story sort
├── .github/workflows/
│   └── chromatic.yml           ← visual regression on every PR
├── src/
│   ├── index.js                ← package exports
│   ├── styles/
│   │   ├── tokens.css          ← --sx-* CSS variables + @font-face
│   │   └── global.css          ← resets, body defaults, Material Symbols
│   ├── fonts/                  ← Hanken Grotesk + Red Hat Display ttfs
│   ├── assets/                 ← logomark SVGs
│   ├── stories/
│   │   ├── Colors.stories.jsx
│   │   ├── Typography.stories.jsx
│   │   ├── Spacing.stories.jsx
│   │   └── Examples.stories.jsx
│   └── components/
│       ├── Logomark/           ← Logomark.jsx + .stories.jsx
│       ├── Button/             ← Button.{jsx,css,stories.jsx}
│       ├── Tag/
│       ├── Input/
│       ├── Card/
│       ├── EmptyState/
│       ├── Sidebar/
│       ├── TopBar/
│       ├── TransferPanel/
│       └── OtcBanner/
├── examples/
│   ├── PersonalAccount.jsx     ← full dashboard composition
│   └── PersonalAccount.css
├── preview/                    ← legacy HTML preview cards (kept for the
│                                  Design System tab; not part of the package)
└── ui_kits/personal-account/   ← legacy HTML demo (kept for reference)
```
