import * as firebase from "firebase";
import dateAndTime from "../../utils/dateAndTime";

const namespaced = true;

const state = {
  task: null,
  linkedBoards: [],
};

const getters = {
  task(state) {
    return state.task;
  },
  linkedBoards(state) {
    return state.linkedBoards;
  },
};

const mutations = {
  setTask(state, payload) {
    state.task = payload;
  },
  setLinkedBoards(state, payload) {
    state.linkedBoards = payload;
  },
  clearTask(state) {
    state.task = null;
    state.linkedBoards = [];
  },
};

const actions = {
  clearTask({ commit }) {
    commit("clearTask");
  },

  loadTask({ commit }, payload) {
    this.dispatch("loading/setLoading", true);
    const currentUser = firebase.auth().currentUser;
    var tasksRef = firebase
      .database()
      .ref("users/" + currentUser.uid + "/tasks/" + payload.task);

    tasksRef.on("value", (snapshot) => {
      if (snapshot.val() == null) {
        return;
      }
      const {
        title,
        description,
        created,
        lastModified,
        owner,
        uid,
      } = snapshot.val();
      const task = {
        title,
        description,
        owner,
        uid,
      };
      task.created = dateAndTime.UTCToLocalTimeAndDate(created);
      task.lastModified = dateAndTime.UTCToLocalTimeAndDate(lastModified);
      console.log("load task returned", task);
      commit("setTask", snapshot.val());
    });
    this.dispatch("loading/setLoading", false);
  },
  updateTask(_, payload) {
    const timestamp = dateAndTime.getUTCTimestamp();
    this.dispatch("loading/setLoading", true);
    const currentUser = firebase.auth().currentUser;
    const updatedTask = {
      owner: currentUser.uid,
      uid: this.state.task.task.uid,
      title: payload.title,
      description: payload.description,
      lastModified: timestamp,
      created: dateAndTime.LocalToUTC(this.state.task.task.created),
    };
    const updates = {};
    updates["/tasks/" + this.state.task.task.uid] = updatedTask;
    updates[
      "/users/" + currentUser.uid + "/tasks/" + this.state.task.task.uid
    ] = updatedTask;
    firebase
      .database()
      .ref()
      .update(updates, function(res, error) {
        if (error) {
          console.log("error: ", error);
        } else {
          console.log("res (data should be saved successfully)", res);
        }
      });

    this.dispatch("loading/setLoading", false);
  },
  deleteTask({ commit }, payload) {
    const currentUser = firebase.auth().currentUser;
    const usersTasksRef = firebase
      .database()
      .ref("/users/" + currentUser.uid + "/tasks/" + payload.task);
    usersTasksRef.remove();
    const tasksRef = firebase.database().ref("/tasks/" + payload.task);
    tasksRef.remove();

    commit("clearTask");
  },
  loadLinkedBoards() {
    this.dispatch("loading/setLoading", true);
    console.log("load linked boards");
    this.dispatch("loading/setLoading", false);
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
