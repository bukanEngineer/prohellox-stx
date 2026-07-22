# Figma Inventory — StraitsX Design System

File key: `pyipgQdAYl4NI0freEfKg4`. Compiled by triaging the page/frame node URLs
provided (REST API host is blocked in this environment, so pages were catalogued
via the Figma MCP `get_metadata`/`get_screenshot` instead).

> **Key takeaway:** nearly every Figma component page maps to a component the repo
> **already has**. The work is therefore mostly **(a) migrate existing components to
> the new semantic tokens** and **(b) align variants/specs**, plus a smaller set of
> genuinely net-new (mostly product composites on the `↳ New Component` page).

## Foundation pages (tokens / assets — not React components)

| Node | Page | Contents | Status |
|---|---|---|---|
| `5729:1144` | 🎨 Style Guideline | Type scale, box shadow, radius (4/8/12/999), padding/spacing | ✅ captured in `tokens.css` |
| `5729:1145` | 👾 Material Icons | ~3,478 rounded icons | repo uses Material Symbols font (Icon) |
| `458:37897` | 🤖 Illustration Set | Empty Data, Rocket, Shield, Coin Exchange, etc. | asset set (out of scope for tokens) |
| `964:20528` | 🎃 Bank / Blockchain Logo | StraitsX logo variants, coin/bank logos, favicon, OTC banner | maps to Logomark/PartnerLogo/OtcBanner |
| `4742:28` | ↳ New Component | STX foundation token frames + product composites | ✅ tokens captured |

## Core component pages → existing repo components (migrate + align)

| Node | Figma page | Figma components | Repo component | Action |
|---|---|---|---|---|
| `1:6348` | ↳ Button | PrimaryButton, SecondaryButton, TertiaryButton (states×size) | `Button` | ✅ tokens migrated; align states/sizes |
| `1574:36041` | ↳ Icon Button | Filled / Outlined / Ghost Icon Button | `IconButton` | migrate + variants |
| `1967:3735` | ↳ Link Button | Link Button (left/right/no-icon) | `LinkButton` | migrate + variants |
| `1574:46739` | ↳ Tag | Static Filled/Outlined, Removable, Clickable (5 tones×size×state) | `Tag` | migrate; add removable/clickable |
| `2288:28565` | ↳ Badge | Counter (16), Dots (8) | `Badge` | migrate; reconcile to Counter/Dot |
| `1574:46735` | ↳ Input | Text Field, Search, Password, Text Area, Prefix, Suffix | `Input`, `Textarea` | migrate; add search/password/affix |
| `2906:4613` | ↳ Date Input | Date Input (states×size) | `DateInput` | migrate + states |
| `1650:19933` | ↳ Alert | Alert (success/warning/critical/info), Alert with CTA | `Alert` | migrate; add CTA/closable |
| `1574:46737` | ↳ Selection Box | Selection - Radio, Selection - Check | `Radio`, `Checkbox` | migrate; row-select variant |
| `1574:46736` | Control | Toggle (Switch), Radio, Checkbox | `Switch`, `Radio`, `Checkbox` | migrate + states |
| `1574:46738` | ↳ Menu | Menu, List (state matrix) | `Menu` | migrate; add List |
| `3323:1694` | ↳ Important Notes | Important Notes (with/without title) | `ImportantNotes` | migrate + variants |
| `1574:46860` | ↳ Tooltip | Tooltip (4 placements), Tooltip - Supported Chain | `Tooltip` | migrate + placements |
| `1638:14924` | ↳ Modal | Modal Default/Illustration/New Feature, slots, button group | `Modal` | migrate + variants |
| `3496:313` | ↳ Toast | Toast (success/critical/info/warning) | `Toast` | migrate (✅ Toast IS in Figma) |
| `4132:17` | ↳ Pagination | Pagination, page/arrow items | `Pagination` | migrate + states |
| `1998:71939` | ↳ Top Navigation | Top Navigation (Desktop/Mobile × account), Dropdown | `TopNavigation`/`TopBar` | migrate + variants |
| `1578:8806` | ↳ Sidebar (New) | Sidebar - Base / Products (Personal/Business/Sandbox), Company Profile, MAS Badge | `Sidebar` | migrate; add Products/MAS Badge |
| `1598:36410` | ↳ Tabs | Tabs, Single Tab, Secondary Tab | `Tabs` | migrate + secondary |
| `3757:9592` | Table | Table Header, Table Cell - Single (text/2-line/link/button/tag), Transaction History | `Table` | ✅ tokens migrated; add cell types |
| `2169:22056` | ↳ Bottom Sheet | BottomSheet (header/slot/button group), Network Selection | `BottomSheet` | migrate + variants |
| `5122:41055` | Page Title | Page Title (desktop/mobile) | `PageTitle` | migrate |
| `1777:29087` | QR | QR (160×160) | `QR` | migrate |
| `1574:46859` | Steps | Horizontal Steps, Vertical Steps, Badge Steps | `Steps` | migrate; add vertical |
| `2851:10153` | ↳ Coachmark | Coachmark (4 beak positions), step dots | `Coachmark` | migrate + placements |
| `1861:34295` | ↳ Breadcrumb | Breadcrumbs (3–6 items) | `Breadcrumb` | migrate (⚠️ Figma note: "might not be used in future") |
| `2904:26415` | ↳ Copybox | Non-Editable Field / Copybox (action/error) | `Copybox` | migrate + variants |
| `2904:26414` | ↳ Select / Dropdown | Single/Multiple Select, Responsive Box, Dropdown Menu | `Select` | migrate; add multi-select |
| `5988:37528` | ↳ Upload | Upload (default/uploaded/error) | `Upload` | migrate + states |
| `4876:4713` | Error Response | Error 400/401/403/404/408/500 (full-page) | `ErrorResponse` | migrate (screen-level) |

## Net-new (no existing repo component)

| Node | Figma component | Notes |
|---|---|---|
| `2904:26416` | Input with Button | Input + trailing PrimaryButton |
| `4742:28` | Field / Bank · Network · Blockchain | product composite fields w/ dropdown + logo |
| `4742:28` | Dropdown / Asset · Network · Bank · Blockchain | product asset/network pickers |
| `4742:28` | Card / Asset · Swap · Status · Summary · Checklist · Attribute · Steps | product cards |
| `4742:28` | List / Bank · Asset · Blockchain · Supported Network | product list rows |
| `4742:28` | Modal / Asset Overview · Asset Selection; Bottom Sheet / Bank·Network·Blockchain | product overlays |
| `4742:28` | Table / Transaction History (Funding/OTC/Swap) | composition over Table |
| `4742:28` | Estimated Balance, Inline Box / Cross Asset, Status Icon, Modal - 2FA | misc product atoms |

## Skip / placeholder
- `1777:29088` Empty State — page contains only a header, no component artwork.

## Repo components with no clear Figma page yet
`TransferPanel`, `EmptyState` (Figma page empty) — confirm intent.
