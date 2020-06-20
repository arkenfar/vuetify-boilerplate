import * as firebase from "firebase";
import dateAndTime from "../../utils/dateAndTime";

const namespaced = true;

const state = {
  user: null,
};

const getters = {
  getUser(state) {
    return state.user;
  },
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
};

const actions = {
  logUserIn({ commit }, payload) {
    this.dispatch("loading/setLoading", true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((u) => {
        commit("setUser", u);
        this.dispatch("loading/setLoading", false);
      })
      .catch((error) => {
        this.dispatch("loading/setLoading", false);
        return {
          error: {
            message: error.message,
          },
        };
      });
  },
  logUserOut({ commit }) {
    this.dispatch("loading/setLoading", true);
    firebase.auth().signOut();
    commit("setUser", null);
    this.dispatch("loading/setLoading", false);
  },
  autoLogin({ commit }, payload) {
    this.dispatch("loading/setLoading", true);
    commit("setUser", { id: payload.uid });
    this.dispatch("loading/setLoading", false);
  },
  deleteUser({ commit }) {
    this.dispatch("loading/setLoading", true);
    const currentUser = firebase.auth().currentUser;
    const usersRef = firebase.database().ref("users");

    currentUser
      .delete()
      .then(() => {
        usersRef
          .child(currentUser.uid)
          .remove()
          .catch((error) => {
            console.log(error);
          });

        firebase.auth().signOut();
      })
      .catch((error) => {
        console.log("error in deleting user", error);
        this.dispatch("loading/setLoading", false);
      });
    commit("setUser", null);
    this.dispatch("loading/setLoading", false);
  },
  signUserUp({ commit }, payload) {
    this.dispatch("loading/setLoading", true);
    const timestamp = dateAndTime.getUTCTimestamp();
    return firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((u) => {
        var usersRef = firebase.database().ref("users");
        const { uid, email } = u.user;
        const newUser = {
          uid: uid,
          email: email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          created: timestamp,
          tasks: [],
          boards: [],
          goals: [],
        };
        usersRef
          .child(uid)
          .set(newUser)
          .catch((error) => {
            console.log(error);
            this.dispatch("loading/setLoading", false);
            return {
              error: {
                message: error.message,
              },
            };
          });

        commit("setUser", u);
        this.dispatch("loading/setLoading", false);
      })
      .catch((error) => {
        this.dispatch("loading/setLoading", false);
        return {
          error: {
            message: error.message,
          },
        };
      });
  },
  loadUser({ commit }) {
    this.dispatch("loading/setLoading", true);
    const currentUser = firebase.auth().currentUser;
    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .orderByChild(currentUser.uid)
      .once("value", (u) => {
        const { firstName, lastName } = u.val();
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
        commit("setUser", currentUser);
        this.dispatch("loading/setLoading", false);
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
