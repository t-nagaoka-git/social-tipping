import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    email: '',
    name: '',
    wallet: 0,
    users: [],
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    email(state) {
      return state.email;
    },
    name(state) {
      return state.name;
    },
    wallet(state) {
      return state.wallet;
    },
    users(state) {
      return state.users;
    },
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setName(state, name) {
      state.name = name;
    },
    setWallet(state, wallet) {
      state.wallet = wallet;
    },
    setUsers(state, users) {
      state.users = users;
    },
  },
});
