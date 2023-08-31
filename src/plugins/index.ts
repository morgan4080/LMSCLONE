/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import pinia from "../store";
import router from "../router";

// Types
import type { App } from "vue";

import { aliases, fa } from "vuetify/iconsets/fa4";
import { mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import "font-awesome/css/font-awesome.min.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VDataTableServer } from "vuetify/labs/VDataTable";

const vuetifyConf = createVuetify({
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#3C7AB7",
          secondary: "#4d6d73",
          background: "#F5F7FB",
          prestaBlue: "#4D99D4",
        },
      },
    },
  },
  components: {
    VDataTableServer,
  },
});

export function registerPlugins(app: App) {
  loadFonts();
  // @ts-ignore
  app.use(vuetifyConf).use(router).use(pinia);
}
