# AGENTS.md

## Cursor Cloud specific instructions

This repo is `prohellox-designsystem` — the StraitsX design system: a React 19 component
library + design tokens, developed and previewed through **Storybook**. There is no backend,
database, or server component; "running the product" means running Storybook and the
Vitest/lint/build checks. Standard commands live in `package.json` `scripts` and `README.md`.

### Node version (important gotcha)

The project requires **Node >= 24.18.0** (`.nvmrc` / `package.json` `engines`). The VM's
default `node` on `PATH` (`/exec-daemon/node`) is an older v22 that the exec environment
force-prepends to `PATH` on every command. The correct Node 24 is installed via `nvm`
(`nvm alias default` is set to `24.18.0`).

- Interactive shells: `~/.bashrc` already sources `nvm` and runs `nvm use default`, so new
  terminals get Node 24 automatically.
- Non-interactive / scripted commands: if `node -v` reports v22, activate Node 24 first with
  `export PATH="$HOME/.nvm/versions/node/v24.18.0/bin:$PATH"` (or `. "$HOME/.nvm/nvm.sh" && nvm use`).

### Services / commands

- Storybook dev workbench: `npm run storybook -- --host 0.0.0.0` → http://localhost:6006
  (only network port). **Always pass `--host 0.0.0.0`.** By default Storybook/Vite binds to
  IPv6 only (`:::6006`), which appears solely in `/proc/net/tcp6`. Cursor's port
  auto-forwarder scans the IPv4 listen table (`/proc/net/tcp`), so an IPv6-only listener is
  never forwarded and the browser gets `ERR_CONNECTION_REFUSED` at `localhost:6006` even
  though `curl` works inside the VM. Binding to `0.0.0.0` puts it in the IPv4 table and lets
  the forward work.
- Tests: `npm run test` (Vitest; `unit` project on jsdom + `storybook` project in real
  Chromium via Playwright). The Chromium browser binary must be present
  (`npx playwright install chromium`); it is included in the update script and persists in the
  VM snapshot.
- Lint: `npm run lint` (ESLint; currently passes with warnings, 0 errors).
- Build the publishable package: `npm run build` (Babel → `dist/`, `tsc` types, copy assets).

### Optional / non-blocking

- Chromatic visual regression (`npm run chromatic`) is a cloud SaaS and needs
  `CHROMATIC_PROJECT_TOKEN`; it is optional and not required for local development or testing.
