import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.indigo.darken2,
        secondary: colors.blueGrey.darken2,
        accent: "#43A047",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        error: colors.red.darken2,
      },
      dark: {
        primary: colors.deepOrange.darken4,
        secondary: colors.darkGrey,
        accent: "#43A047",
        info: "#2196F3",
        success: colors.green.darken3,
        warning: "#FFC107",
        error: colors.red.darken3,
      },
    },
    options: {
      customProperties: true,
    },
  },
});
