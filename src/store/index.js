import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userId: '',
      email: '',
      name: '',
      wallet: 0,
    },
    users: [],
  },
  getters: {
    user(state) {
      return state.user;
    },
    users(state) {
      return state.users;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
  },
});
