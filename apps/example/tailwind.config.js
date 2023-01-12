// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      flex: {
        ...defaultTheme.flex,
        "2": "2 1 auto",
      },
      fontFamily: {
        sans: ['"Inter var"', '"Inter"', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: (theme, config) => ({
        ...defaultTheme.maxWidth(theme, config),
        "8xl": "88rem",
        "9xl": "96rem",
      }),
      spacing: {
        "96": "24rem",
      },
      width: (theme) => ({
        ...defaultTheme.width(theme),
        "1/7": "14.28%",
        "2px": "2px",
      }),
    },
  },
  plugins: [],
};
