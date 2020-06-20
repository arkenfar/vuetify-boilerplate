import Vue from "vue";
import App from "./App.vue";
import router from "./components/router/router";
import { store } from "./components/store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase";
import Constants from "./constants/Constants";

// Vue.prototype.appConfig = config
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,

  render: (h) => h(App),
  created() {
    // console.log(Constants.FIREBASE.API_KEY);
    firebase.initializeApp({
      apiKey: Constants.FIREBASE.API_KEY,
      authDomain: Constants.FIREBASE.PROJECT_ID + ".firebaseapp.com",
      databaseURL: Constants.FIREBASE.DB_URL,
      projectId: Constants.FIREBASE.PROJECT_ID,
      storageBucket: Constants.FIREBASE.PROJECT_ID + ".appspot.com",
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("user/autoLogin", user);
      }
    });
  },
}).$mount("#app");
