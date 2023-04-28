/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import { aliases, fa } from "vuetify/iconsets/fa4";
import { mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import "font-awesome/css/font-awesome.min.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
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
        },
      },
    },
  },
});
