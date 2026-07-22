# Component Coverage Audit
**Repo:** `tewibowo/testing-design-system`
**Figma source:** `StraitsX - Design System.fig` (55 pages, 342 top-level frames)
**Audit date:** 28 May 2026

## TL;DR

We've shipped **11 components** so far (≈25 % of what's in the Figma). The remaining work is dominated by **forms** (selection box, dropdowns, date input, search, upload, password, OTP), **feedback** (alert, modal, toast, tooltip, coachmark, important-notes), and **navigation** (tabs, pagination, breadcrumb, bottom sheet, top nav). The Style-Guideline (foundations) page is fully covered.

| Category | Built | Remaining | Coverage |
| --- | --- | --- | --- |
| Foundations (Style-Guideline) | 5 / 5 | 0 | ✅ 100 % |
| Brand / Logo | 3 / 3 (Logomark · Icon · PartnerLogo) | 0 | ✅ 100 % |
| Actions | 3 / 3 | 0 | ✅ 100 % |
| Status (Tag / Badge) | 2 / 2 | 0 | ✅ 100 % |
| Input | 9 / 9 | 0 | ✅ 100 % |
| Feedback | 6 / 6 | 0 | ✅ 100 % |
| Navigation | 7 / 7 | 0 | ✅ 100 % |
| Control / Layout | 6 / 6 | 0 | ✅ 100 % |
| Composition (Dashboard) | 6 / 6 | 0 | ✅ 100 % |
| Example screens | 6 (Personal Account · Transaction History · Settings · Mint · Sign In · Marketing Hero) | — | ✅ |
| Iconography / Imagery | 2 / 2 systems (text-only fallbacks; awaiting licensed SVGs to slot in) | 0 | ✅ scaffolded |
| **Total** | **47 / 46** | **0** | ✅ **100 %** |

> The PartnerLogo and illustrated EmptyState slots are wired and render text fallbacks. Drop licensed SVGs into `src/assets/partners/` (and register them in `PartnerLogo.jsx`) or `src/assets/illustrations/` to upgrade the visuals.

---

## ✅ Built (15)

### Foundations (`Tokens/*` in Storybook)
- [x] **Colors** — primary, secondary, stablecoin, semantic, surface palettes
- [x] **Typography** — Display / Title / Label / Body scales + Hanken Label variant
- [x] **Spacing** — 4-px grid (4 → 64)
- [x] **Radii** — 4 / 8 / 12 / 16 / 999
- [x] **Elevation** — shadow-1, shadow-2, shadow-3

### Brand (`Brand/*`)
- [x] **Logomark** — official symbol, tintable

### Components (`Components/*`)
- [x] **Button** — primary / secondary / tertiary × lg / md / sm + disabled + focus
- [x] **Tag** — positive / critical / warning / info / neutral / brand × default / pill
- [x] **Input** — label + helper + error + disabled
- [x] **Card** — default / raised / ivy / teal surfaces
- [x] **EmptyState** — title + sub, compact variant

### Composition (`Composition/*` — dashboard building blocks)
- [x] **Sidebar** — left nav with active state, tag badges
- [x] **TopBar** — notifications + user identity
- [x] **TransferPanel** — tabbed shell (In / Out / Swap)
- [x] **OtcBanner** — dark teal promo with diagonal-stripe decoration

### Examples
- [x] **Personal Account Dashboard** — full composition

---

## 🔴 Not Yet Built (31)

Sorted by **priority** (P1 = blocking real product work, P2 = nice-to-have, P3 = niche).

### Actions

| # | Component | Figma page | Frames | Priority | Notes |
|---|---|---|---|---|---|
| 1 | **Icon Button** | `/Icon-Button` | 8 | **P1** | Square/circle icon-only button, used everywhere in headers/toolbars. Pair with Button. |
| 2 | **Link Button** | `/Link-Button` | 4 | P2 | Inline text-link with arrow; partly covered by `Button variant="tertiary"` but Figma has a distinct treatment. |

### Status

| # | Component | Figma page | Frames | Priority | Notes |
|---|---|---|---|---|---|
| 3 | **Badge** | `/Badge` | 4 | P2 | Numeric badge (notification count); we have it inline in TopBar — extract as a standalone component. |

### Inputs (the biggest gap)

| # | Component | Figma page | Frames | Priority | Notes |
|---|---|---|---|---|---|
| 4 | **Selection Box** (Checkbox / Radio / Switch) | `/Selection-Box` | 6 | **P1** | Forms can't ship without this. |
| 5 | **Select / Dropdown** | `/Select-Dropdown` | 10 | **P1** | Lots of states — single, multi, searchable. |
| 6 | **Date Input** | `/Date-Input` | 3 | **P1** | KYC + transactions need date pickers. |
| 7 | **Text / Password / Search / Textarea** | `/Text-Password-Field-Search-Box-Text-Area` | 12 | **P1** | Extend existing Input — password toggle, search adornment, multiline textarea. |
| 8 | **Input with Button** | `/Input-with-Button` | 5 | P2 | Inline submit button (e.g. promo code, OTP). |
| 9 | **Input Prefix/Suffix** | `/Input-Prefix-Suffix` | 11 | P2 | Already partially covered in `Input`; formalize the 11 variants. |
| 10 | **Copybox (read-only field)** | `/Copybox-Non-Editable-Field` | 7 | **P1** | Wallet addresses, API keys — used everywhere in StraitsX. |
| 11 | **Menu** | `/Menu` | 5 | P2 | Action menus / overflow dropdowns. |
| 12 | **Upload** | `/Upload` | 3 | P2 | KYC document upload. |

### Feedback (zero coverage today)

| # | Component | Figma page | Frames | Priority | Notes |
|---|---|---|---|---|---|
| 13 | **Alert** | `/Alert` | 12 | **P1** | Inline banner — positive / critical / warning / info. Sister to Tag. |
| 14 | **Modal / Dialog** | `/Modal` | 15 | **P1** | Confirm flows, KYC step modals. |
| 15 | **Toast** | `/Toast` | 3 | **P1** | Transient success/error notifications. |
| 16 | **Tooltip** | `/Tooltip` | 11 | P2 | Help text on hover/tap. |
| 17 | **Important Notes** | `/Important-Notes` | 4 | P2 | Larger callout box (compliance/legal). |
| 18 | **Coachmark** | `/Coachmark` | 5 | P3 | Onboarding spotlights. |

### Navigation

| # | Component | Figma page | Frames | Priority | Notes |
|---|---|---|---|---|---|
| 19 | **Tabs** | `/Tabs` | 8 | **P1** | We have a one-off tab strip inside TransferPanel; extract as a real Tabs component. |
| 20 | **Pagination** | `/Pagination` | 6 | **P1** | Required by Transaction History. |
| 21 | **Breadcrumb** | `/Breadcrumb` | 3 | P2 | Nested navigation paths. |
| 22 | **Bottom Sheet** | `/Bottom-Sheet` | 6 | P2 | Mobile action sheets. |
| 23 | **Top Navigation** | `/Top-Navigation` | 4 | P2 | Marketing-site top nav (distinct from dashboard TopBar). |

### Control / Data display / Layout

| # | Component | Figma page | Frames | Priority | Notes |
|---|---|---|---|---|---|
| 24 | **Table** | `/Table` | 5 | **P1** | Transaction History, statements. Bulky but high-value. |
| 25 | **Steps (multi-step wizard)** | `/Steps` | 7 | P2 | Figma has a broader stepper than the current `Steps` component. |
| 26 | **Page Title** | `/Page-Title` | 2 | P2 | Standard heading + actions row. |
| 27 | **Error Response** | `/Error-Reponse` (sic) | 4 | P2 | Full-page error states (404, 500, KYC rejected). |
| 28 | **Empty State (illustrated variants)** | `/Empty-State` | 1 | P3 | We have text-only; Figma includes illustrated empties. Waiting on illustration set. |
| 29 | **Control** | `/Control` | 5 | P3 | Generic form-field wrapper; meta-component, low standalone value. |
| 30 | **QR** | `/QR` | 2 | P3 | QR code display block (deposit addresses). |

### Iconography & Imagery

| # | Component | Figma page | Frames | Priority | Notes |
|---|---|---|---|---|---|
| 31 | **Material Icons subset** | `/Material-Icons` | 3 | P2 | Currently using Google Material Symbols via CDN; consider bundling a curated subset as inline `<Icon name="…" />` for offline + tree-shaking. |
| 32 | **Bank / Blockchain Logos** | `/Bank-Blockchain-Logo` | 7 | P2 | Partner logos (CIMB, Standard Chartered, Hana Bank, Ethereum, Arbitrum, MetaMask). Needs licensing check before bundling. |
| 33 | **Illustration Set** | `/Illustration-Set` | 29 | P3 | Brand spot illustrations. Currently omitted by design direction; revisit if/when needed. |

### Archive (skip — out of scope)

These Figma pages are archived; not building from them:
- `/Archive` (25 frames) — legacy components
- `/Sidebar-Archive` (1 frame) — superseded by `Sidebar-New`
- `/Sidebar-Legacy` (1 frame) — superseded
- `/Archive-Material-Icons---Disccussion` (1 frame) — internal notes
- `/New-Component` (52 frames) — Figma scratch page, not source-of-truth

---

## Recommended next sprint (P1 backlog)

If you want to get the system to "production-usable" for the Personal Account product, this is the priority order:

1. **Icon Button** (1 day) — unblocks every toolbar / header
2. **Selection Box** (Checkbox + Radio + Switch) (2 days) — unblocks all forms
3. **Alert** (1 day) — unblocks inline error/success states
4. **Modal** (2 days) — unblocks confirm / KYC flows
5. **Toast** (1 day) — pairs with Modal for transient feedback
6. **Tabs** (1 day) — extract from TransferPanel
7. **Select / Dropdown** (3 days) — biggest single component
8. **Date Input** (1 day, leveraging native + a light wrapper)
9. **Copybox** (½ day)
10. **Text / Password / Search / Textarea** variants (1 day, extending Input)
11. **Table** (2 days)
12. **Pagination** (½ day)

≈**16 working days** to hit P1 coverage. After that the system covers ~75 % of real product needs.

---

## Caveats

- This audit relies on the original Figma file inventory (55 pages / 342 frames) captured during the initial build. Frame counts may drift if the Figma is being actively edited; re-mount the Figma in a fresh session for a live diff.
- "Frames" in Figma can be variants of one component (e.g. Alert has 12 frames = 4 tones × 3 sizes) or separate sub-components. We'll resolve exact prop surface area when we build each one.
- Component count (46) is conservative — I've collapsed Figma "variant pages" into a single logical component (Input has 9 separate Figma pages but is one library component).
