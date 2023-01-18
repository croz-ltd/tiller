const path = require("path");
const React = require("react");

module.exports = {
  components: "./src/components.tsx",
  outputPath: "../dist/storybook/playroom",
  title: "Tiller Playroom",
  snippets: "./.playroom/snippets.js",
  frameComponent: "./.playroom/frameComponent.js",
  widths: [414, 1024],
  port: 9000,
  openBrowser: true,
  paramType: "search", // default is 'hash'
  typeScriptFiles: ["../**/src/*.tsx", "!**/node_modules"],
  exampleCode: `
    <Button>
      Hello World!
    </Button>
  `,
  baseUrl: "/tiller/playroom/",
  webpackConfig: () => {
    return {
      module: {
        rules: [
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.tsx?$/,
            include: __dirname,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
              },
            },
          },
          {
            test: /\.js?$/,
            include: __dirname,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
              },
            },
          },
          {
            test: /\.svg$/,
            loader: require.resolve("url-loader"),
          },
        ],
      },
      resolve: {
        extensions: [".js", ".ts", ".tsx"],
        alias: {
          "@tiller-ds/alert": path.resolve(__dirname, "../dist/libs/alert"),
          "@tiller-ds/core": path.resolve(__dirname, "../dist/libs/core"),
          "@tiller-ds/data-display": path.resolve(__dirname, "../dist/libs/data-display"),
          "@tiller-ds/date": path.resolve(__dirname, "../dist/libs/date"),
          "@tiller-ds/dev": path.resolve(__dirname, "../dist/libs/dev"),
          "@tiller-ds/form-elements": path.resolve(__dirname, "../dist/libs/form-elements"),
          "@tiller-ds/form-elements-advanced": path.resolve(__dirname, "../dist/libs/form-elements-advanced"),
          "@tiller-ds/formik-elements": path.resolve(__dirname, "../dist/libs/formik-elements"),
          "@tiller-ds/icons": path.resolve(__dirname, "../dist/libs/icons"),
          "@tiller-ds/intl": path.resolve(__dirname, "../dist/libs/intl"),
          "@tiller-ds/menu": path.resolve(__dirname, "../dist/libs/menu"),
          "@tiller-ds/selectors": path.resolve(__dirname, "../dist/libs/selectors"),
          "@tiller-ds/theme": path.resolve(__dirname, "../dist/libs/theme"),
          "@tiller-ds/upload": path.resolve(__dirname, "../dist/libs/upload"),
          "@tiller-ds/util": path.resolve(__dirname, "../dist/libs/util"),
        },
      },
    };
  },
  iframeSandbox: "allow-scripts",
};
