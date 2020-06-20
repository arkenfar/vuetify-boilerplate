import * as firebase from "firebase";
import dateAndTime from "../../utils/dateAndTime";
const namespaced = true;

const state = {
  tasks: [],
};

const getters = {
  tasks(state) {
    return state.tasks;
  },
};

const mutations = {
  setTasks(state, payload) {
    state.tasks = payload;
  },
  addTask(state, payload) {
    state.tasks.splice(0, 0, payload);
  },
};

const actions = {
  loadTasks({ commit }) {
    this.dispatch("loading/setLoading", true);

    const currentUser = firebase.auth().currentUser;
    const tasksRef = firebase
      .database()
      .ref("users/" + currentUser.uid + "/tasks");

    tasksRef.on("value", (snapshot) => {
      if (snapshot.val() == null) {
        return;
      }
      const arr = Object.keys(snapshot.val()).map((key) => {
        return snapshot.val()[key];
      });
      arr.map((key) => {
        key.created = dateAndTime.UTCToLocalTimeAndDate(key.created);
        key.lastModified = dateAndTime.UTCToLocalTimeAndDate(key.lastModified);
      });
      commit("setTasks", arr);
    });
    this.dispatch("loading/setLoading", false);
  },

  newTask({ commit }, payload) {
    const timestamp = dateAndTime.getUTCTimestamp();
    const currentUser = firebase.auth().currentUser;
    const newTask = {
      owner: currentUser.uid,
      description: payload.taskDescription,
      title: payload.taskTitle,
      created: timestamp,
      lastModified: null,
    };

    // Get a key for a new Task.
    const newTaskKey = firebase
      .database()
      .ref()
      .child("tasks")
      .push().key;
    newTask.uid = newTaskKey;
    // Write the new tasks data simultaneously in the tasks list and the user's tasks list.
    const updates = {};
    updates["/tasks/" + newTaskKey] = newTask;
    updates["/users/" + currentUser.uid + "/tasks/" + newTaskKey] = newTask;
    commit("addTask", newTask);
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
