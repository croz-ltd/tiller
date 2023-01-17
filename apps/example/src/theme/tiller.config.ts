import { iconConfig } from "@tiller-ds/icons";
import { ThemeConfigFactory, IconConfig } from "@tiller-ds/theme";

export const defaultComponentConfig: ThemeConfigFactory = {
  component: {
    // examples of overriding components' base styles
    Alert: {
      borderRadius: "rounded-lg",
      title: {
        fontSize: "text-base",
        fontWeight: "font-bold",
        color: "text-slate-800",
      },
    },
    Button: {
      base: {
        borderRadius: "rounded",
      },
    },
    Badge: {
      base: {
        padding: "px-3",
      },
    },
    PageHeading: {
      master: "mt-8",
    },
  },
};

export const defaultIconConfig: IconConfig = {
  ...iconConfig,
};
