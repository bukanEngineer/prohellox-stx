# StraitsX Personal Account — UI Kit

Recreation of the StraitsX Personal Account dashboard's "Home" surface, built from the FDS3 Figma file. Demonstrates the design system's components in a realistic product layout.

## What's here

`index.html` — single dashboard screen that pulls in all components below. Click the sidebar items to switch the active item.

Components (one file each, React/JSX, loaded via Babel):
- `Sidebar.jsx` — left nav with the StraitsX logo at top, Material-icon nav items, active state, and a "New" tag pattern.
- `TopBar.jsx` — notifications bell + user identity block (top-right).
- `TransferPanel.jsx` — tab strip (Transfer In / Out / Swap) with an empty-state inside.
- `OtcBanner.jsx` — the dark Secure-Teal "StraitsX OTC Desk" promo card with the diagonal-stripe decoration.
- `EmptyState.jsx` — magnifier-with-cogs illustration + heading + sub used in both the transfer panel and the notification panel.

## Things deliberately omitted

- **Real navigation/routing.** Each sidebar item just sets local state.
- **Real partner logos.** The transfer panel would normally surface CIMB / Standard Chartered / Hana Bank rails; we don't ship those assets — the panel shows the empty state instead.
- **Light/dark mode.** The product is light-mode only; no toggle.

## Visual references

- Figma page `/Bank-Blockchain-Logo/StraitsX-Logo` for the lockup.
- Figma page `/Top-Navigation` for the top bar.
- Brand Guidelines 2025 p.20–21 for colour usage.
