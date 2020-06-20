import * as firebase from "firebase";
const namespaced = true;

const state = {
  board: null,
  boardTasks: [],
};

const getters = {
  board(state) {
    return state.board;
  },
  boardTasks(state) {
    return state.boardTasks;
  },
};

const mutations = {
  setBoard(state, payload) {
    state.board = payload;
  },
  setBoardTasks(state, payload) {
    state.boardTasks = payload;
  },
  clearBoard(state) {
    state.board = null;
    state.boardTasks = [];
  },
};

const actions = {
  clearBoard({ commit }) {
    commit("clearBoard");
  },
  loadBoard({ commit }, payload) {
    this.dispatch("loading/setLoading", true);
    const currentUser = firebase.auth().currentUser;
    var boardsRef = firebase
      .database()
      .ref("users/" + currentUser.uid + "/boards/" + payload.board);

    boardsRef.on("value", (snapshot) => {
      if (snapshot.val() == null) {
        return;
      }

      commit("setBoard", snapshot.val());
    });
    this.dispatch("loading/setLoading", false);
  },
  deleteBoard({ commit }, payload) {
    const currentUser = firebase.auth().currentUser;
    const usersBoardsRef = firebase
      .database()
      .ref("/users/" + currentUser.uid + "/boards/" + payload.board);
    usersBoardsRef.remove();
    const boardsRef = firebase.database().ref("/boards/" + payload.board);
    boardsRef.remove();

    commit("clearBoard");
  },
  loadBoardTasks({ commit }, payload) {
    this.dispatch("loading/setLoading", true);
    const currentUser = firebase.auth().currentUser;
    var boardsRef = firebase
      .database()
      .ref(
        "/users/" + currentUser.uid + "/boards/" + payload.board + "/tasks/"
      );

    boardsRef.on("value", (snapshot) => {
      if (snapshot.val() == null) {
        return;
      }

      let arr = Object.keys(snapshot.val()).map((key) => {
        return snapshot.val()[key];
      });
      commit("setBoardTasks", arr);
    });
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
