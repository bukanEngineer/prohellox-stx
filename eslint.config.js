// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [{
  // ui_kits/ and preview/ are legacy, kept for reference only (see README);
  // they predate this component library and aren't part of the npm package.
  ignores: ["dist/**", "storybook-static/**", "node_modules/**", "ui_kits/**", "preview/**"],
}, js.configs.recommended, {
  files: ["**/*.mjs"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: { ...globals.node },
  },
}, {
  files: ["**/*.{js,jsx}"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
    globals: { ...globals.browser, ...globals.node },
  },
  plugins: {
    react,
    "react-hooks": reactHooks,
    "jsx-a11y": jsxA11y,
  },
  settings: { react: { version: "19" } },
  rules: {
    ...react.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    ...jsxA11y.configs.recommended.rules,
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    // Pre-existing gap in the dropdown/field components: click handlers on
    // non-native elements without matching keyboard support. Real a11y bugs,
    // but fixing them means implementing proper roving-tabindex/ARIA-widget
    // keyboard behavior per component — tracked as follow-up, not silenced.
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/interactive-supports-focus": "warn",
    "jsx-a11y/no-noninteractive-tabindex": "warn",
  },
}, {
  // Storybook CSF3 `render` functions are valid components, but their name
  // ("render") fails eslint-plugin-react-hooks' naming heuristic, causing
  // false-positive rules-of-hooks errors.
  files: ["**/*.stories.jsx"],
  rules: {
    "react-hooks/rules-of-hooks": "off",
  },
}, prettier, ...storybook.configs["flat/recommended"]];
