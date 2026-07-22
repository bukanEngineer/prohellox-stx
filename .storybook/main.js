/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  // Storybook 10: docs, controls, actions, viewport, backgrounds, toolbars,
  // measure, outline, highlight and test/interactions are built into core.
  addons: [
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
    "@storybook/addon-mcp",
    "@storybook/addon-vitest",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../src/fonts", "../src/assets"],
};
export default config;
