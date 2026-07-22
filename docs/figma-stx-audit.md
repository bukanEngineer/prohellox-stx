# StraitsX Design System — Git ↔ Figma Audit

**Source of truth (Figma):** [StraitsX – Design System](https://www.figma.com/design/pyipgQdAYl4NI0freEfKg4/StraitsX---Design-System?node-id=1306-23006)
Library: `StraitsX - Design System` · Variable collection: **`STX - New Token`**
**Audited repo:** `testing-design-system` (branch `claude/wonderful-carson-TnV6z`)
**Date:** 2026-05-31

> **What this is:** a gap + naming audit between what the repo has built and the published StraitsX
> Figma library. Two deliverables, as requested:
> 1. **Coverage gaps** — tokens / atoms / components / compositions in Figma not yet built in git.
> 2. **Naming mismatches** — where git's token / semantic / component naming does not follow Figma.

---

## 0. Methodology & confidence

The Figma side was read via the Figma MCP server using three tools:
- `get_variable_defs` on real nodes (returns resolved semantic token names + values),
- `get_design_context` (returns reference code + bound variables),
- `search_design_system` (relevance search across published libraries).

**Important limitations (so the gaps below are read correctly):**
- `search_design_system` is a **relevance search, not an enumeration API**. It returns ~20 ranked
  hits per query and only on strong single-term queries. The component list below is therefore a
  **high-confidence lower bound**, not a guaranteed-complete inventory.
- The file exposes only **2 document pages** (`Cover`, `Bank / Blockchain Logo`) via metadata; the
  actual component/foundation pages live in the **published library**, which is not page-traversable
  through the MCP. A 100%-complete dump would need either the Figma REST API
  (`/v1/files/:key/components` + `/variables`) or direct access to the library's component pages.
- **Spacing / radius / elevation tokens** and **semantic feedback colors** (success/warning/error)
  did **not** surface as Figma *variables* in search. They may be primitives under another name, or
  styles. Flagged as **UNVERIFIED** below rather than asserted.

Anything marked ⚠️ **UNVERIFIED** needs a second pass with REST API access or a node URL to the
Foundations / Components pages.

---

## 0b. UPDATE 2026-05-31 — foundation CONFIRMED (page `4742:28` "↳ New Component")

The Figma foundation token frames (`STX — Semantic Colors`, `STX — Typography`, `STX — Spacing &
Radius`, `STX — Brand Colors`) were read directly, resolving the ⚠️ items above. Implemented in
`src/styles/tokens.css` (two-tier model + legacy aliases). Confirmed facts:

- **Fonts: NO migration needed.** Canonical type frame uses **Red Hat Display (Bold)** for
  Display/Title/Label and **Hanken Grotesk** for Headline/Body/Body-Bold — exactly the repo's stack.
  ("Fazz Neue" was a one-off in a single Header component, not the system.)
- **Value bugs found & fixed in the new token layer:**
  - `--sx-xsgd` / `--sx-xidr` were **swapped** — XSGD is `#0e3fc7`, XIDR is `#df1312`.
  - `Background/Background` = `#f6f7f9` (git treated bg as `#FFFFFF`); `Surface/Surface` = `#ffffff`
    — git had no background/surface split.
  - `Base Color/Border` = `#d8d8d8` (git `--sx-line` was `#E0E0E0`).
- **Full semantic set now implemented:** `Base Color/*` (Primary, Interactive-Active, Text-Primary/
  -Secondary/-Inverse, Border, Link, Overlay, On-Container), `Background/*`, `Surface/*` (Surface,
  -Secondary, -Disabled, Disabled-On-Surface, -Hovered, -Pressed), `Status/*` (Positive/Critical/
  Warning/Information + Surface- variants), `Component/Button/*` (primary/secondary/tertiary
  hover+press, secondary-text).
- **Typography**: Display/Title/**Title-Mobile**/Headline/Label/Body/**Body-Bold** ramps (the last
  two are new vs git; git's `label-*-hk` maps to `Body-Bold/*`).
- **Spacing** = 4·8·12·16·**20**·24·40 (git had 32/64 instead of 20). **Radius** = 4·8·12·full
  (git's `lg`/16 dropped). **Shadow** lv-1..3 confirmed (git values already matched).

Remaining ⚠️ for later: full per-component specs across the other pages (in progress, component by
component via `get_design_context`).

---

## 1. Token & semantic naming — git does NOT follow Figma

This is the core finding. Figma's `STX - New Token` collection uses a **two-tier, role-based**
naming scheme. The repo (`src/styles/tokens.css`) uses a **flat, visual** `--sx-*` scheme with no
primitive/semantic separation. They diverge structurally, not just cosmetically.

### 1a. Structural differences (most important)

| # | Figma convention | Git convention | Problem |
|---|---|---|---|
| 1 | **Two tiers**: `Brand Color/*` (primitives) → aliased by `Base Color/*`, `Background/*`, `Surface/*` (semantic) | **One flat tier** — `--sx-*` mixes primitives and roles | Git has no primitive→semantic indirection, so re-theming means find/replacing hex across components |
| 2 | Names by **role**: `Primary`, `Text-Primary`, `Border`, `Surface`, `Overlay`, `Link` | Names by **appearance**: `fg-1`, `line`, `bg` | A dev cannot map `--sx-fg-1` ↔ `Base Color/Text-Primary` without a lookup table |
| 3 | Category as **path segment**: `Base Color/Text-Primary` | Category as **prefix mashup**: `--sx-fg-1` | No shared grammar; tooling (Tokens Studio, Style Dictionary) can't round-trip |
| 4 | Typography: `Display/Display-Medium`, `Label/Label-Large`, `Body/Body-Medium` | `--sx-display-m`, `--sx-label-l`, `--sx-body-m` | Different delimiter (`/` vs `-`) and size scale (`Medium` vs `m`) |

### 1b. Color token mapping (git → Figma)

| Git token (value) | Figma semantic token | Status |
|---|---|---|
| `--sx-fg-1` (#002B2A) | `Base Color/Text-Primary` | ❌ rename |
| `--sx-fg-2` (#505454) | `Base Color/Text-Secondary` | ❌ rename |
| `--sx-fg-3` (#6B6B6B) | (likely `Base Color/Text-Tertiary`/`-Placeholder`) | ⚠️ UNVERIFIED |
| `--sx-fg-4` (#9D9E9F) | (likely `Base Color/Text-Disabled`) | ⚠️ UNVERIFIED |
| `--sx-fg-inverse` (#FFFFFF) | `Base Color/Text-Inverse` **and/or** `Base Color/On-Container` | ❌ rename |
| `--sx-bg` (#FFFFFF) | `Background/Background` | ❌ rename |
| (card/sidebar surface) | `Surface/Surface` | ❌ **missing role** — git has no surface vs background split |
| `--sx-line` (#E0E0E0) | `Base Color/Border` | ❌ rename |
| (none) | `Base Color/Link` | ❌ **missing token** |
| (modal overlay hardcoded `rgba(...)`) | `Base Color/Overlay` | ❌ **missing token** |
| (button primary fill) | `Base Color/Primary` (→ Vibrant Green) | ❌ no semantic alias in git |
| (button active teal) | `Base Color/Primary-2` (#054948) | ❌ no semantic alias in git |

### 1c. Brand primitives (values mostly match, names don't)

| Git token | Figma `Brand Color/*` | Note |
|---|---|---|
| `--sx-vibrant-green` (#00D37E) | `Brand Color/Vibrant Green` | name shorthand |
| `--sx-secure-teal` (#054948) | `Brand Color/Secure Teal` | name shorthand |
| `--sx-deep-ivy` (#002B2A) | `Brand Color/Stable Deep Ivy` | missing **"Stable"** qualifier |
| `--sx-mint` (#79FFCA) | `Brand Color/Seamless Mint` | missing **"Seamless"** |
| `--sx-gold` (#B59B58) | `Brand Color/Wealthy Gold` | missing **"Wealthy"** |
| `--sx-blue` (#187D97) | `Brand Color/Credible Blue` | missing **"Credible"** |
| `--sx-xsgd / -xidr / -xusd` | `Brand Color/XSGD / XIDR / XUSD` | OK conceptually, naming differs |

> Figma marks every `Brand Color/*` primitive with: *"Avoid using this primitive color. Only use them
> when the existing color system cannot support the use case."* In the repo, components consume brand
> primitives **directly** (e.g. `Button.css` uses `var(--sx-vibrant-green)` / `var(--sx-secure-teal)`
> / `var(--sx-deep-ivy)` ~80 times) instead of semantic `Base Color/Primary*`. **This is the single
> most common violation** — git skips the semantic layer the design system is built around.

### 1d. Typography mismatches

| Git | Figma | Issue |
|---|---|---|
| `--sx-display-m` | `Display/Display-Medium` | delimiter + size-name |
| `--sx-label-l` / `-m` | `Label/Label-Large` / `Label-Medium` | delimiter + size-name |
| `--sx-body-m` | `Body/Body-Medium` | delimiter + size-name |
| font family: **Red Hat Display + Hanken Grotesk** | newer tokens resolve to **"Fazz Neue"** (Header), older to **Red Hat Display / Hanken Grotesk** (OTC Banner) | ⚠️ **Font-family conflict** — the Figma library appears mid-migration to **Fazz Neue**. Git is on the old stack. **Needs a product decision.** |
| line-height `1.05`–`1.5`, no letter-spacing tokens | e.g. `Display-Medium` = lh 54, letterSpacing −3; `Label-Medium` = lh 20, letterSpacing −1 | git approximates; exact metrics differ |

### 1e. Feedback / semantic colors — ⚠️ UNVERIFIED

Git defines a full feedback ramp: `--sx-positive`, `--sx-critical`, `--sx-warning`,
`--sx-information`, `--sx-neutral`, each with `-soft` and `-border` variants. **None of these
surfaced as Figma variables** in search. Either (a) they live under different Figma names
(e.g. `Base Color/Success`, `Surface/Critical`), or (b) they were invented in git. **Must be
reconciled** once the Foundations page / REST variables are accessible — do not assume parity.

### 1f. Tokens with no evidence in Figma variables (⚠️ verify before keeping)

`--sx-radius-*`, `--sx-space-*` (4-px scale), `--sx-shadow-1..3`, `--sx-dur-*`, `--sx-ease`.
The only numeric Figma variable found was `Brand Color/Number` (FLOAT). Spacing/radius/elevation
may not be tokenized in Figma yet, or live in a separate primitive collection not exposed.

---

## 2. Component & composition coverage

> Naming key — Figma frequently splits by **variant-as-separate-component-set**, where git uses a
> single component with a `variant`/`tone` prop. Those are **naming/structure mismatches**, not gaps.

### 2a. Built in git, exists in Figma — but NAMED / STRUCTURED differently

| Git component | Figma equivalent(s) | Mismatch |
|---|---|---|
| `Button` (`variant=primary\|secondary\|tertiary`) | `PrimaryButton`, `SecondaryButton`, `TertiaryButton` (3 separate component sets) | git collapses 3 Figma sets into 1 prop |
| `IconButton` (`variant`) | `Filled Icon Button`, `Outlined Icon Button`, `Ghost Icon Button` | same — 3 sets → 1 prop |
| `Input` | `Text Field` (+ `Input with Prefix` / `Suffix` / `Button`) | git name `Input` ≠ Figma `Text Field`; affix variants missing |
| `Textarea` | `Text Area` | spelling/spacing |
| `Select` | `Dropdown - Single Select`, `Dropdown - Multiple Select` | name + multi-select variant missing |
| `Radio` | `Selection - Radio` | name |
| `Checkbox` | `Checkbox`, `Selection - Check` | extra row-selection variant in Figma |
| `DateInput` | `Date Picker` | name + likely scope (calendar) |
| `Tag` (`tone`, `shape`) | `Static Tag - Filled`, `Static Tag - Outlined`, `Clickable Tag`, `Removable Tag` | git has only static; clickable/removable missing |
| `Breadcrumb` | `Breadcrumbs` | pluralization |
| `Steps` | `Horizontal Steps`, `Vertical Steps`, `Vertical Steps - Group`, `Badge Steps` | git naming ≠ Figma's orientation-based split |
| `TopNavigation` | `Top Navigation / Dropdown` | name + scope |
| `Sidebar` | `Sidebar - Base`, `Sidebar - Products`, `Sidebar - Legacy (Old)` | git generic; Figma has 3 explicit sets (Products is mandated per Apr-2026 note) |
| `Card` | `Card / Asset`, `/ Swap`, `/ Status`, `/ Summary`, `/ Checklist`, `/ Attribute`, `/ Steps` | git generic Card ≠ Figma's 7 purpose-built card sets |
| `Tabs` | `Tabs`, `Single Tab`, `Secondary Tab` | secondary/single-tab variants missing |
| `Tooltip` | `Tooltip`, `Tooltip - Supported Chain` | extra variant missing |
| `Coachmark` | `Coachmark` | ✅ matches |
| `Modal` | `Modal - Default`, `- 2FA`, `- New Feature`, `Modal with Illustration`, `Modal / Asset Overview`, `Modal / Asset Selection` | git generic ≠ Figma's 6 sets |
| `Table` | `Table Cell - Single`, `Table / Transaction History` | git monolith ≠ Figma cell+composition split |
| `Upload` | `Upload` | ✅ matches |
| `OtcBanner` | `OTC Desk - Banner` | name |
| `Menu` | `Menu`, `Dropdown Menu`, `Dropdown Menu - Company Profile` | extra variants missing |
| `Pagination` | `Pagination` | ✅ matches |

### 2b. In FIGMA, NOT built in git (coverage gaps)

**Atoms / inputs**
- `Search Box`
- `Input with Prefix`, `Input with Suffix`, `Input with Button` (affixed inputs)
- `Dropdown - Single Select`, `Dropdown - Multiple Select`, `Dropdown - Multiple Select (Responsive Box)`
- `Selection - Check` (selectable row)
- `Date Picker` (full calendar — git only has basic `DateInput`)
- `Clickable Tag`, `Removable Tag`
- `MAS Badge` (regulatory badge used in sidebar)

**Components**
- `List` (selectable list rows; can render as card via overrides)
- `Button Group - Modal/Bottomsheet`
- `Secondary Tab`, `Single Tab`
- `Tooltip - Supported Chain`
- `Dropdown Menu`, `Dropdown Menu - Company Profile`
- `Modal - 2FA`, `Modal - New Feature`, `Modal with Illustration`
- Card sets: `Card / Asset`, `/ Swap`, `/ Status`, `/ Summary`, `/ Checklist`, `/ Attribute`, `/ Steps`
- Steps: `Vertical Steps`, `Vertical Steps - Group`, `Badge Steps` (git has Horizontal-style Steps only)

**Compositions (multi-component layouts)**
- `Table / Transaction History`
- `Modal / Asset Overview`, `Modal / Asset Selection`
- `Sidebar - Products` (explicitly mandated for all projects per Apr-2026), `Sidebar - Base`, `Sidebar - Legacy (Old)`
- `Top Navigation / Dropdown`

**Doc-only (not real DS components — ignore):** `File Cover`, `Header Documentation (DS)`, and the
large set of Material-Symbols icon components (`switch_camera`, `select_window`, `radio_button_checked`, …).

### 2c. In GIT, NOT found in Figma (git-invented or unverified)

These have **no Figma match** in the searches run — confirm they're intentional app-level additions,
or rename/remove to match the library:
- `Toast` — **no `Toast`/`Snackbar`/`Notification` component found in the StraitsX library.** Figma's
  transient-message pattern appears to be **`Alert` only**. ⚠️ High-priority reconciliation.
- `TransferPanel`
- `TopBar` (distinct from `TopNavigation`?)
- `PageTitle`
- `ImportantNotes` (may map to Figma `Alert`)
- `ErrorResponse`
- `EmptyState`
- `Copybox`
- `QR`
- `Badge` (git generic; Figma only has `MAS Badge` / `Badge Steps`)

---

## 3. Recommended remediation order

1. **Adopt Figma's two-tier token model.** Introduce a primitives layer (`Brand Color/*`) and a
   semantic layer (`Base Color/*`, `Background/*`, `Surface/*`), then point components at the
   semantic layer only. Stop consuming brand primitives directly in components.
2. **Rename tokens to the Figma grammar** (`--sx-fg-1` → `--sx-base-text-primary` etc., or generate
   straight from Figma variable names) and add the **missing roles**: `Surface/Surface`,
   `Base Color/Link`, `Base Color/Overlay`, `Base Color/Primary(-2)`.
3. **Resolve the font-family decision** (Fazz Neue vs Red Hat Display/Hanken Grotesk) before
   touching typography tokens — it changes every component.
4. **Reconcile feedback colors** (`positive/critical/warning/information/neutral`) against the real
   Figma semantic tokens once Foundations/REST access is available.
5. **Close component gaps** in priority order: Sidebar - Products (mandated), Dropdown selects,
   affixed Inputs, Card variants, Modal variants, List, Table composition.
6. **Reconcile git-only components** — especially `Toast` (no Figma equivalent) and `Badge`.

---

## 4. To make this audit 100% complete

The relevance-search method can't guarantee a full inventory. To finish:
- Provide a **node URL to the Foundations page** (variables/typography) and the **Components page**, **or**
- Enable **Figma REST API** access so we can pull `GET /v1/files/:key/component_sets` and the full
  published `variables` list and diff them programmatically against `tokens.css` + `src/components/`.
