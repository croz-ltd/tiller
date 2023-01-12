import { addons } from "@storybook/addons";
import tiller from "./tillerStorybookTheme";

window.STORYBOOK_GA_ID = "G-3XZCY5X0PB";
window.STORYBOOK_REACT_GA_OPTIONS = {};

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: "right",
  enableShortcuts: true,
  showToolbar: true,
  theme: tiller,
  selectedPanel: 1,
  initialActive: "sidebar",
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
