/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config — used by Storybook (via @storybook/react-vite) and for any
// future direct app builds. The published package is built separately via
// Babel (see `npm run build`); this config only drives dev/test tooling.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react({
      babel: {
        configFile: true, // picks up babel.config.js
      },
    }),
  ],
  // aria-query is CommonJS with a chained-assignment export pattern that Vite's
  // CJS→ESM lexer can't statically read, so `import { elementRoles }` (via
  // @testing-library/dom, used by the Storybook a11y test setup) fails. Pre-
  // bundling it (and its testing-library consumer) with esbuild produces a
  // proper ESM interop wrapper with the named exports detected.
  optimizeDeps: {
    include: ["aria-query", "@testing-library/dom"],
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{
              browser: 'chromium'
            }]
          }
        }
      },
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.test.jsx'],
          setupFiles: ['./vitest.setup.js'],
        },
      },
    ]
  }
});