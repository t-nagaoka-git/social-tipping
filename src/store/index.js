import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    socialTippingUser: null,
    isBalanceModal: false,
    isSocialTippingModal: false,
  },
  getters: {
    user(state) {
      return state.user;
    },
    users(state) {
      return state.users;
    },
    socialTippingUser(state) {
      return state.socialTippingUser;
    },
    isBalanceModal(state) {
      return state.isBalanceModal;
    },
    isSocialTippingModal(state) {
      return state.isSocialTippingModal;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setSocialTippingUser(state, socialTippingUser) {
      state.socialTippingUser = socialTippingUser;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setIsBalanceModal(state, isBalanceModal) {
      state.isBalanceModal = isBalanceModal;
    },
    setIsSocialTippingModal(state, isSocialTippingModal) {
      state.isSocialTippingModal = isSocialTippingModal;
    },
  },
});
