# StraitsX Design System (`testing-design-system`)

A React + plain-CSS design system rebuilt from the official StraitsX brand guidelines and the internal **FDS 3** Figma file. Ships as an npm-style package with **Storybook** for component documentation and **Chromatic** for visual regression on every PR.

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

## Project layout

```
testing-design-system/
├── package.json
├── vite.config.js
├── chromatic.config.json
├── SKILL.md                    ← agent-skill manifest
├── brand_guidelines.txt        ← extracted PDF text for reference
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
│   │   ├── Introduction.mdx
│   │   ├── Colors.stories.jsx
│   │   ├── Typography.stories.jsx
│   │   ├── Spacing.stories.jsx
│   │   └── PersonalAccount.stories.jsx
│   └── components/
│       ├── Logomark/           ← Logomark.jsx + .stories.jsx
│       ├── Button/             ← Button.{jsx,css,stories.jsx}
│       ├── Tag/
│       ├── Input/
│       ├── Card/
│       ├── EmptyState/
│       ├── Sidebar/
│       ├── TopBar/
│       ├── OnboardingSteps/
│       ├── TransferPanel/
│       └── OtcBanner/
├── examples/
│   ├── PersonalAccount.jsx     ← full dashboard composition
│   └── PersonalAccount.css
├── preview/                    ← legacy HTML preview cards (kept for the
│                                  Design System tab; not part of the package)
└── ui_kits/personal-account/   ← legacy HTML demo (kept for reference)
```

## Source materials

This system was reconstructed from materials supplied by the design team:

| Source | Notes |
| --- | --- |
| `StraitsX_BrandGuidelines_2025_V1.pdf` (uploads/, not in repo) | 32-page brand book — positioning, logo, colour palette, stablecoin marks, typography |
| `Hanken_Grotesk,Red_Hat_Display.zip` (extracted to `src/fonts/`) | Variable & static `.ttf` files for both type families |
| **Figma file:** `StraitsX - Design System.fig` | 55 pages of internal "FDS 3" UI components. Notable pages used: `Cover`, `Style-Guideline`, `Bank-Blockchain-Logo`, `Illustration-Set`, `Button`, `Tag`, `Top-Navigation`, `Input`. |

Public product surfaces (for further reference): https://www.straitsx.com, the StraitsX dashboard at app.straitsx.com.

---

## Content fundamentals — voice & tone

StraitsX writes in a **plain, confident, security-first** register. It is a regulated payments company speaking to both retail individuals and institutional clients (CIMB, Standard Chartered, QCP Capital, Hana Bank). The brand sounds professional but humane — never breezy, never jargon-heavy.

**Sentence case.** Headings, buttons, nav labels — all sentence case ("Verify your account", "Transaction history", "Request quote"). No ALL CAPS in product UI. Eye-brow labels like "FDS 3" are the only uppercase usage and only in design-system chrome.

**"You" not "we" in product, "we" in marketing.** Dashboard copy is directed at the user ("Verify your account and complete a quick assessment to unlock StraitsX"). Marketing/positioning copy uses "we" ("We offer deep liquidity to institutions and high net-worth individuals").

**Concrete, infrastructure-flavoured nouns.** The brand leans on words like *infrastructure*, *liquidity*, *seamless*, *secure*, *compliance-first*, *scalable*, *interoperable*. Avoid hype words (revolutionary, disrupt, game-changing). Avoid crypto-bro slang (moon, ape, degens).

**Numbers are facts, not flourishes.** "100% Backed by highly liquid reserves." "Starting from 50,000 USD." Numbers get tabular spacing and the mono typeface; they're load-bearing, not decorative.

**No emoji.** None observed anywhere in the Figma file or guidelines; this is a financial-services brand. Use Material Icons (rounded) instead — see ICONOGRAPHY.

**Brand values to echo:** Transparency · Resilience · Security · Team · Unlimited Possibilities. The first four are the company's stated values (p.7); "Unlimited Possibilities" is the over-arching positioning that ties them together.

**Examples (verbatim from Figma + PDF):**
- Empty state: "No Transaction Found · You don't have any transactions yet."
- OTC banner: "StraitsX OTC Desk · We offer deep liquidity to institutions and high net-worth individuals. Starting from 50,000 USD. · Request Quote →"
- Onboarding step: "Verify Your Identity · Complete identity verification for a smooth and secure experience."
- Marketing hero: "Payments Infrastructure for Digital Assets · We enable fast and safe access to digital assets markets and decentralised finance applications through the StraitsX APIs and stablecoins for individuals and businesses."

---

## Visual foundations

### Colour
A three-tier palette: a tight brand trio, a softer secondary set, and dedicated stablecoin marks.

- **Primary (brand-defining):** Vibrant Green `#00D37E` (signature, growth), Secure Teal `#054948` (grounding), Stable Deep Ivy `#002B2A` (near-black w/ green undertone). The teal/ivy do most of the heavy structural work; vibrant green is the highlight.
- **Secondary (accent):** Seamless Mint `#79FFCA`, Innovative Grey `#D8D8D8`, Modern Light Grey `#F0F0F0`, Wealthy Gold `#B59B58`, Credible Blue `#187D97`. Used sparingly — for callouts, supporting accents, or category coding.
- **Stablecoins:** XSGD `#DF1312` (Singapore red), XIDR `#0E3FC7` (Indonesia blue), XUSD `#257C58` (USD green). Each picks up a flag colour from its issuing region.
- **Semantic:** Positive `#007D00` / Critical `#DF1312` / Warning `#F79410` / Information `#0D69D4` / Neutral `#1B2736`. Each has a soft surface and a border tone (see `colors_and_type.css`).

**Backgrounds.** The product UI is overwhelmingly white-on-light-grey. Marketing surfaces switch to Secure Teal (`#054948`) or Stable Deep Ivy (`#002B2A`) with the logomark as a low-opacity (10%) pattern. No gradients — backgrounds are flat. No grain, no noise.

### Type
Two families do all the work:
- **Red Hat Display** — primary. Modern geometric sans with distinctive angled cuts (the `t` slope mirrors the wordmark). Used for Display, Title, and Label roles. Weights: Light (300) / Regular (400) / Medium (500) / SemiBold (600) / Bold (700) / Black (900). Headlines & UI labels are typically Bold.
- **Hanken Grotesk** — secondary. Warmer, more humane sans for body copy and Headline (paragraph-style) roles. Weights: 100–900 + italics.
- **Red Hat Mono** — used for numerals and code (loaded from Google Fonts).

Full scale: Display L 64 / M 45 / S 36 · Headline L 28 / M 24 / S 20 · Title L 28 / M 24 / S 20 (bold) · Label L 16 / M 14 / S 12 (bold, two variants — Red Hat Display & Hanken Grotesk) · Body L 16 / M 14 / S 12.

Hierarchy lives in *weight + size*, not colour. Body copy stays at the default ivy `#002B2A` or grey-500 `#505454`. Use the Hanken Label variant when you want a slightly more human voice (Title-like blocks inside cards, gamified UI).

### Spacing, radii, shadows
- **Base grid:** 4 px. Inline gaps generally 4 / 8 / 12 / 16; section gaps 24 / 32 / 40 / 64.
- **Radii:** `8` (Alert, Card), `12` (Input, Select, Copybox, Dialog), `999` (Button, Tag, Badge, Icon Button). Component shells use `16` (Style-Guideline panels). Sub-4 details use `4`.
- **Shadows (3-tier, near-black not pure):**
  - `shadow-1` raised card — `0 1px 3px rgba(10,13,18,.10), 0 1px 2px rgba(10,13,18,.06)`
  - `shadow-2` menu/popover — `0 12px 16px -4px rgba(10,13,18,.08), 0 4px 6px -2px rgba(10,13,18,.03)`
  - `shadow-3` dialog — `0 20px 24px -4px rgba(10,13,18,.08), 0 8px 8px -4px rgba(10,13,18,.03)`

### Borders
Cards & inputs use a 1 px hairline in `#E0E0E0`–`#C6C6C6`. Tables use the same hairline as an inset shadow (`inset 1px 0 0` on each cell) instead of outer borders, giving a thinner, sharper look than borders.

### Buttons & pills
Pill-shaped (border-radius 999). Three variants:
- **Primary** — vibrant green `#00D37E` background, deep-ivy `#002B2A` text. The flagship action.
- **Secondary** — white background, 1.5 px deep-ivy border, deep-ivy text. Use for the second action in a pair.
- **Tertiary / Link** — text-only, deep-ivy with underline on hover.

Sizes: Large 48 px tall · Medium 40 · Small 32. Padding scales: 24 / 16 / 12 horizontal. Text is Red Hat Display Bold (Label-Large/-Medium).

### States
- **Hover:** primary darkens to teal (`#02855A` observed in Figma); secondary fills its background with deep-ivy at 6% (light grey-green tint).
- **Press / active:** primary darkens further (`#04482C`); buttons do *not* shrink — colour change only.
- **Disabled:** light-grey fill `#F0F0F0`, mid-grey text `#9D9E9F`. No drop shadow.
- **Focus:** 2 px Information blue ring offset by 2 px (`#0D69D4`).

### Motion
Subtle, never bouncy. Transitions are 120 ms (hover/press) or 200 ms (chips, tooltips); modals open at 320 ms with a `cubic-bezier(0.2, 0.7, 0.2, 1)` ease. No spring physics, no bounces. Page transitions fade-only; loaders use a circular spinner in vibrant green.

### Transparency & blur
Brand backgrounds use the logomark as a 10 % alpha overlay (per p.14 of guidelines). Otherwise transparency is almost absent — modals dim the page with a `rgba(0, 43, 42, 0.4)` scrim (deep ivy with alpha) and the dialog itself is fully opaque. No frosted-glass / backdrop-filter blurs anywhere in the system.

### Cards
White surface, `8 px` radius, `shadow-1` for raised, 1 px `#E0E0E0` border for resting. Cards have generous padding (24 px) and titles in Title-Small (Red Hat Display Bold 20 / Title-Medium 24 for larger cards). Sub-cards (e.g. onboarding steps) keep the same radius and add an illustration on the right side.

### Imagery
The illustration set is a flat, cool-palette style: muted teals, a single warm peach `#F2A89B` accent on hands/faces, blue `#0E3FC7` shirts, grey backgrounds. People-led but never photographic. No grain, no gradients inside illustrations. Decorative imagery is sparing — a hero spot per page at most.

---

## Iconography

The system uses **Google Material Icons (rounded variant)** — the Figma file contains a `Material-Icons-Rounded` page with 3,476 instances. Use weight 400, fill 0 (line style), size 24 px by default; 20 px for compact UI, 16 px inline.

In product HTML:

```html
<!-- Easiest: Google Material Symbols (Rounded, line) -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet">
<span class="material-symbols-rounded">home</span>
<span class="material-symbols-rounded">notifications</span>
<span class="material-symbols-rounded">arrow_forward</span>
```

Common glyphs observed in the Figma file: `home`, `account_circle`, `notifications`, `expand_more`, `keyboard_arrow_down`, `close`, `check`, `chevron_right`, `info`, `support_agent`, `flag`, `settings`, `groups`, `description` (statement), `swap_horiz`, `qr_code`, `developer_board`, `tune`.

**No emoji, ever.** The brand is a regulated financial-services company; emoji breaks trust.

**Bank & blockchain logos** live in `Bank-Blockchain-Logo/Logo/` in the Figma — partners are shown as their official monochrome wordmarks. When you need partner logos, request them from the user; do not redraw.

**The StraitsX logomark itself** is in `assets/logomark-full.svg` (vibrant green, no padding) and `assets/logo-icon-stroke.svg` (24×24 monochrome currentColor — fits any background, paint via CSS `color`).

---

## Caveats & substitutions

- **Wordmark** — The brand's bespoke "StraitsX" wordmark uses custom letterforms (rising cuts on `t`, special rounded `X`). The Figma rebuilds it from 8 per-letter SVGs; this project ships only the logomark and the special `X` glyph as SVGs. The wordmark in our preview cards and UI kit is set in **Red Hat Display Bold** as the closest match — please supply the official SVG wordmark file if pixel-perfect branding is required.
- **Partner logos** — Not included. If you need CIMB, Standard Chartered, Hana Bank, etc., request the official assets from the StraitsX marketing team.
- **Iconography** — Material Symbols Rounded (CDN) is used as the icon system; the in-Figma icons appear to be the same family. If StraitsX has standardised on a specific subset or modified glyphs, please flag.
- **Source Sans Pro / IBM Plex** — A few legacy components in the Figma still reference these. New work should use only Red Hat Display + Hanken Grotesk + Red Hat Mono.
