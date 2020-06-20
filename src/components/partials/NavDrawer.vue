<template>
  <div class="navigation-drawer">
    <v-navigation-drawer v-model="showSideNav" app temporary>
      <v-list dense>
        <v-list-item>
          <v-row no-gutters justify="center">
            <v-toolbar-title v-if="showLogo">
              <router-link to="/" tag="span" style="cursor: pointer">
                <v-img alt="Logo" :src="logo" max-height="125" max-width="125" />
              </router-link>
            </v-toolbar-title>
            <v-toolbar-title v-else>
              <router-link to="/" tag="span" style="cursor: pointer">
                {{
                appName
                }}
              </router-link>
            </v-toolbar-title>
          </v-row>
        </v-list-item>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated" @click="onLogout">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "NavDrawer",
  props: ["menuItems", "appName", "userIsAuthenticated"],

  computed: {
    showSideNav: {
      get() {
        return this.$store.getters["settings/sideNavigation"];
      },
      set(value) {
        this.$store.dispatch("settings/sideNavigation", value);
      }
    },
    logo() {
      if (this.$store.getters["settings/darkMode"] == true) {
        return this.$store.getters["settings/logoDarkMode"];
      }
      return this.$store.getters["settings/logo"];
    },
    showLogo() {
      return this.logo !== null && this.logo !== undefined;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("user/logUserOut");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
