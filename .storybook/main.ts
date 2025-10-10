import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@chromatic-com/storybook", "@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      builder: {
        viteConfigPath: undefined,
      },
    },
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": new URL("../src", import.meta.url).pathname,
      "next/navigation": new URL("./mocks/next-navigation.ts", import.meta.url).pathname,
    };
    return config;
  },
};

export default config;
