// project-level .storybook/main.js file
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

module.exports = {
  framework: "@storybook/react",
  features: {
    interactionsDebugger: true,
    storyStoreV7: true,
  },
  core: {
    builder: {
      name: "webpack5",
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  stories: [
    "../src/base-documentation/ReleaseNotes.stories.mdx",
    "../src/base-documentation/Introduction.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-controls",
    "@storybook/addon-docs",
    "storybook-addon-designs",
    "@storybook/addon-actions",
    "storybook-addon-playroom",
    "@storybook/addon-essentials",
    "@storybook/addon-google-analytics",
    {
      name: "@storybook/addon-postcss",
      options: {
        cssLoaderOptions: {
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          implementation: require("postcss"),
          postcssOptions: {
            plugins: [require("tailwindcss")({ config: "./storybook/tailwind.config.js" }), require("autoprefixer")],
          },
        },
      },
    },
    "@nrwl/storybook",
  ],
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
  },
  exclude: [/.yarn/],
  webpackFinal: async (config, { configType }) => {
    const tsPaths = new TsconfigPathsPlugin({
      configFile: "./storybook/.storybook/tsconfig.storybook.json",
    });

    config.resolve.plugins ? config.resolve.plugins.push(tsPaths) : (config.resolve.plugins = [tsPaths]);

    return config;
  },
};
