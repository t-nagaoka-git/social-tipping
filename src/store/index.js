import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    isModal: false,
  },
  getters: {
    user(state) {
      return state.user;
    },
    users(state) {
      return state.users;
    },
    isModal(state) {
      return state.isModal;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setIsModal(state, isModal) {
      state.isModal = isModal;
    },
  },
});
