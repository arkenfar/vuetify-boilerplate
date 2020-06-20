import * as firebase from "firebase";

const namespaced = true;

const state = {
  goals: [],
};

const getters = {
  goals(state) {
    return state.goals;
  },
};

const mutations = {
  setGoals(state, payload) {
    state.goals = payload;
  },
  addGoal(state, payload) {
    state.goals.splice(0, 0, payload);
  },
};

const actions = {
  loadGoals({ commit }) {
    this.dispatch("loading/setLoading", true);

    const currentUser = firebase.auth().currentUser;
    var goalsRef = firebase
      .database()
      .ref("users/" + currentUser.uid + "/goals");

    goalsRef.on("value", (snapshot) => {
      if (snapshot.val() == null) {
        return;
      }
      let arr = Object.keys(snapshot.val()).map((key) => {
        return snapshot.val()[key];
      });
      console.log("array", arr);
      commit("setGoals", arr);
    });
    this.dispatch("loading/setLoading", false);
  },

  newGoal({ commit }, payload) {
    const currentUser = firebase.auth().currentUser;
    const newGoal = {
      owner: currentUser.uid,
      description: payload.goalDescription,
      title: payload.goalTitle,
    };

    // Get a key for a new Goal.
    const newGoalKey = firebase
      .database()
      .ref()
      .child("goals")
      .push().key;
    newGoal.uid = newGoalKey;
    // Write the new goals data simultaneously in the goals list and the user's goals list.
    const updates = {};
    updates["/goals/" + newGoalKey] = newGoal;
    updates["/users/" + currentUser.uid + "/goals/" + newGoalKey] = newGoal;
    commit("addGoal", newGoal);
    return firebase
      .database()
      .ref()
      .update(updates);
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
