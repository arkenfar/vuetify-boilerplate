import Vue from "vue";
import Vuex from "vuex";

// Modules
import user from "./modules/user";
import settings from "./modules/settings";
import loading from "./modules/loading";
import error from "./modules/error";
import about from "./modules/about";
import tasks from "./modules/tasks";
import boards from "./modules/boards";
import board from "./modules/board";
import goals from "./modules/goals";
import task from "./modules/task";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    settings,
    loading,
    error,
    about,
    tasks,
    boards,
    board,
    goals,
    task,
  },
});
