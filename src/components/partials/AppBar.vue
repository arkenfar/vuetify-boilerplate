<template>
  <div class="navigation-app-bar">
    <v-app-bar flat app dark class="primary">
      <v-app-bar-nav-icon
        @click.stop="onShowSideNav"
        class="hidden-sm-and-up"
      />
      <v-toolbar-title v-if="showLogo">
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-img
            alt="Logo"
            :src="logo"
            class="hidden-xs-only"
            max-height="125"
            max-width="125"
          />
        </router-link>
      </v-toolbar-title>
      <v-toolbar-title v-else>
        <router-link to="/" tag="span" style="cursor: pointer">{{
          appName
        }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn text v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>mdi-logout-variant</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  props: ["appName", "menuItems", "userIsAuthenticated"],
  computed: {
    showSideNav() {
      return this.$store.getters["settings/sideNavigation"];
    },
    logo() {
      return this.$store.getters["settings/logoDarkMode"];
    },
    showLogo() {
      return this.logo !== null && this.logo !== undefined;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("user/logUserOut");
      this.$router.push("/login");
    },
    onShowSideNav(value) {
      this.$store.dispatch("settings/sideNavigation", value);
    },
  },
};
</script>

<style scoped></style>
