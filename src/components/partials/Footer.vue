<template>
  <v-footer
    height="75"
    max-height="150"
    :inset="footer.inset"
    app
    padless
    elevation="24"
  >
    <v-container>
      <v-row
        no-gutters
        justify="space-around"
        align="center"
        style="max-height:80%;"
      >
        <v-col cols="2" md="1">
          <v-switch
            class="mx-auto"
            v-model="darkMode"
            primary
            label="Dark mode"
            dense
          />
        </v-col>
        <v-col cols="4">
          <v-row no-gutters justify="center" align="end" class="mt-2">
            <p class="subtitle-2 text-center">{{ copyrights }}</p>
          </v-row>
        </v-col>
        <v-col cols="2" md="1">
          <v-menu
            top
            offset-y
            left
            :close-on-content-click="false"
            offset-overflow
            origin="center center"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on" small fab
                ><v-icon>mdi-dots-horizontal</v-icon></v-btn
              >
            </template>
            <v-color-picker class="ma-2" hide-inputs></v-color-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  props: ["copyrights"],
  computed: {
    darkMode: {
      get() {
        return this.$store.getters["settings/darkMode"];
      },
      set(value) {
        this.$store.dispatch("settings/darkMode", value);
      },
    },
  },
  methods: {
    setDarkMode() {
      this.$store.dispatch("settings/darkMode");
    },
  },
  data: () => ({
    footer: {
      inset: true,
    },
  }),
};
</script>
