module.exports = {
  presets: [require('../dist/libs/theme').preset],
  content: ["./libs/**/src/*.{js,jsx,ts,tsx}", "./storybook/src/**/*.{js,jsx,ts,tsx}"],
};
