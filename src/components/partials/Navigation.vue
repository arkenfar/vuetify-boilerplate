<template>
  <div class="navigation">
    <NavDrawer
      :menuItems="menuItems"
      :userIsAuthenticated="userIsAuthenticated"
      :user="user"
      :appName="appName"
    />
    <AppBar
      :menuItems="menuItems"
      :userIsAuthenticated="userIsAuthenticated"
      :user="user"
      :appName="appName"
    />
  </div>
</template>

<script>
import NavDrawer from "./NavDrawer";
import AppBar from "./AppBar";
export default {
  name: "Navigation",
  components: { NavDrawer, AppBar },
  props: ["appName"],
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-lead-pencil", title: "Sign up", link: "/signup" },
        { icon: "mdi-login-variant", title: "Log in", link: "/login" },
        {
          icon: "mdi-information-variant",
          title: "About",
          link: "/about"
        }
      ];

      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-home",
            title: "Home",
            link: "/"
          },
          {
            icon: "mdi-developer-board",
            title: "Dashboard",
            link: "/dashboard"
          },
          {
            icon: "mdi-account",
            title: "Profile",
            link: "/profile"
          },
          {
            icon: "mdi-information-variant",
            title: "About",
            link: "/about"
          }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters["user/getUser"] !== null &&
        this.$store.getters["user/getUser"] !== undefined
      );
    },
    user() {
      return this.$store.getters["user/getUser"];
    }
  }

  // methods: {
  //   onLogout() {
  //     this.$store.dispatch("user/logUserOut");
  //     this.$router.push("/login");
  //   },
  //   onLogin() {
  //     this.$store.dispatch("login");
  //     this.$router.push("/home");
  //   }
  // },
};
</script>

<style scoped></style>
