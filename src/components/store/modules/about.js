import * as firebase from "firebase";
const namespaced = true;

const state = {
  about: null,
};

const getters = {
  about(state) {
    return state.about;
  },
};

const mutations = {
  setAbout(state, payload) {
    state.about = payload;
  },
};

const actions = {
  loadAbout({ commit }) {
    firebase
      .database()
      .ref("about")
      .orderByChild("aboutPage")
      .once("value", (about) => {
        commit("setAbout", about.val());
      });
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
