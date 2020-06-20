const namespaced = true;

const state = {
  menuItems: null,
};

const getters = {
  menuItemsloading(state) {
    return state.menuItems;
  },
};

const mutations = {
  setLoading(state, payload) {
    state.menuItems = payload;
  },
};

const actions = {};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
