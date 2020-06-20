import * as firebase from "firebase";

const namespaced = true;

const state = {
  boards: [],
};

const getters = {
  boards(state) {
    return state.boards;
  },
};

const mutations = {
  setBoards(state, payload) {
    state.boards = payload;
  },
  addBoard(state, payload) {
    state.boards.splice(0, 0, payload);
  },
};

const actions = {
  // loadBoardTasks({commit}, payload){
  //   this.dispatch("loading/setLoading", true);

  //   const currentUser = firebase.auth().currentUser;
  //   var boardsRef = firebase
  //     .database()
  //     .ref("users/" + currentUser.uid + "/boards/" + payload.board + "tasks");

  //   boardsRef.on("value", (snapshot) => {
  //     if (snapshot.val() == null) {
  //       return;
  //     }
  //     let arr = Object.keys(snapshot.val()).map((key) => {
  //       return snapshot.val()[key];
  //     });
  //     commit("setBoards", arr);
  //   });
  //   this.dispatch("loading/setLoading", false);
  // },
  newBoardTask({ commit }, payload) {
    const currentUser = firebase.auth().currentUser;

    console.log("commit", commit);
    console.log("payload", payload);
    const newTask = {
      owner: currentUser.uid,
      description: payload.task.taskDescription,
      title: payload.task.taskTitle,
    };

    // Get a key for a new Task.
    const newTaskKey = firebase
      .database()
      .ref()
      .child("tasks")
      .push().key;
    newTask.uid = newTaskKey;
    // Write the new tasks data simultaneously in the tasks list and the boards's tasks list.
    const updates = {};
    updates["/tasks/" + newTaskKey] = newTask;
    updates["/boards/" + payload.board + "/tasks/" + newTaskKey] = newTask;
    updates["/users/" + currentUser.uid + "/tasks/" + newTaskKey] = newTask;
    updates[
      "/users/" +
        currentUser.uid +
        "/boards/" +
        payload.board +
        "/tasks/" +
        newTaskKey
    ] = newTask;
    //  commit("addTask", newTask);
    return firebase
      .database()
      .ref()
      .update(updates);
  },

  loadBoards({ commit }) {
    this.dispatch("loading/setLoading", true);

    const currentUser = firebase.auth().currentUser;
    var boardsRef = firebase
      .database()
      .ref("users/" + currentUser.uid + "/boards");

    boardsRef.on("value", (snapshot) => {
      if (snapshot.val() == null) {
        return;
      }
      let arr = Object.keys(snapshot.val()).map((key) => {
        return snapshot.val()[key];
      });
      commit("setBoards", arr);
    });
    this.dispatch("loading/setLoading", false);
  },

  newBoard({ commit }, payload) {
    const currentUser = firebase.auth().currentUser;
    const newBoard = {
      owner: currentUser.uid,
      description: payload.boardDescription,
      title: payload.boardTitle,
      stages: payload.boardStages,
    };

    // Get a key for a new Board.
    const newBoardKey = firebase
      .database()
      .ref()
      .child("boards")
      .push().key;
    newBoard.uid = newBoardKey;
    // Write the new boards data simultaneously in the boards list and the user's boards list.
    const updates = {};
    updates["/boards/" + newBoardKey] = newBoard;
    updates["/users/" + currentUser.uid + "/boards/" + newBoardKey] = newBoard;
    commit("addBoard", newBoard);
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
