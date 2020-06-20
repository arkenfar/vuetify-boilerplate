<template>
  <v-app>
    <v-container fluid id="container-app">
      <v-row no-gutters>
        <v-col cols="12" xs="12">
          <Navigation :appName="appName"></Navigation>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" xs="12">
          <v-content>
            <router-view></router-view>
          </v-content>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" xs="12">
          <Footer :copyrights="copyrights"></Footer>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Footer from "./components/partials/Footer";
import Navigation from "./components/partials/Navigation";

export default {
  name: "App",
  components: {
    Footer,
    Navigation,
  },
  computed: {
    appName() {
      return this.$store.getters["settings/appName"];
    },
    copyrights() {
      return this.$store.getters["settings/copyrights"];
    },
  },
};
</script>
