// eslint-disable-next-line @typescript-eslint/no-var-requires
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import { color, font } from "./themeHelpers";

const preset = {
  content: ["./src/**/*.{tsx,ts,jsx,html,js}", "./node_modules/@tiller-ds/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flex: {
        2: "2 1 auto",
      },
      fontFamily: {
        sans: ['"Inter var"', '"Inter"', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      spacing: {
        96: "24rem",
      },
      width: {
        "1/7": "14.28%",
        "2px": "2px",
      },
      colors: {
        // brand
        primary: color("blue"),
        secondary: color("yellow"),
        tertiary: color("teal"),
        // status
        success: color("green", { dark: "900" }),
        danger: color("red", { dark: "900" }),
        warning: color("orange", { dark: "900" }),
        info: color("sky", { dark: "900" }),
      },
      textColor: {
        link: {
          DEFAULT: colors.blue["800"],
          hover: colors.blue["600"],
        },
        heading: {
          DEFAULT: colors.slate["900"],
        },
        body: {
          DEFAULT: colors.slate["800"],
          light: colors.slate["500"],
        },
      },
      borderColor: {
        base: colors.slate["200"],
      },
      fontSize: {
        base: font("sm", "5", "normal"),
        normal: font("base", "6", "normal"),
        title: font("lg", "6", "medium"),
        subtitle: font("sm", "4", "normal"),
        h1: font("4xl", "10", "bold"),
        h2: font("3xl", "9", "bold"),
        h3: font("2xl", "8", "bold"),
        h4: font("xl", "7", "bold"),
        h5: font("lg", "7", "bold"),
        h6: font("base", "6", "bold"),
        "button-xs": font("xs", "5", "medium"),
        "button-sm": font("sm", "5", "medium"),
        "button-md": font("sm", "5", "medium"),
        "button-lg": font("base", "5", "medium"),
        "button-xl": font("base", "5", "medium"),
        label: font("sm", "5", "medium"),
      },
    },
  },
  plugins: [],
};
export default preset;
