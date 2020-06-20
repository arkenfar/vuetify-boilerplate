import Vuetify from "../../../plugins/vuetify";
import Constants from "../../../constants/Constants";

const namespaced = true;

const state = {
  appName: Constants.APPLICATION.GET_APP_NAME(),
  darkMode: false,
  logo: Constants.APPLICATION.LOGO,
  logoDarkMode: Constants.APPLICATION.LOGO_DARK_MODE,
  copyrights: Constants.COPYRIGHTS.GET_COPYRIGHTS(),
  sideNavigation: false,
};

const getters = {
  appName(state) {
    return state.appName;
  },
  logo(state) {
    return state.logo;
  },
  logoDarkMode(state) {
    return state.logoDarkMode;
  },
  sideNavigation(state) {
    return state.sideNavigation;
  },
  darkMode(state) {
    return state.darkMode;
  },
  copyrights(state) {
    return state.copyrights;
  },
  showNav(state) {
    return state.showNav;
  },
};

const mutations = {
  setDarkMode(state, payload) {
    state.darkMode = payload;
  },
  setsideNavigation(state, payload) {
    state.sideNavigation = payload;
  },
  setShowNav(state, payload) {
    state.setShowNav = payload;
  },
};

const actions = {
  darkMode({ commit }, payload) {
    Vuetify.framework.theme.isDark = payload;
    Vuetify.framework.theme.dark = payload;
    commit("setDarkMode", payload);
  },
  sideNavigation({ commit }, payload) {
    commit("setsideNavigation", payload);
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
