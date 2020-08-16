<template>
  <div class="container">
    <header>
      <div class="username">{{ user.name }} さんようこそ！</div>
      <div class="wallet">残高：{{ user.wallet }}</div>
      <div class="logout" @click="logout">ログアウト</div>
    </header>

    <h1>ユーザー一覧</h1>

    <table>
      <tr>
        <th>ユーザー名</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="user in users" :key="user.userId">
        <td>{{ user.name }}</td>
        <td class="wallet-btn" @click="openBalanceModal(user)">walletを見る</td>
        <td class="wallet-btn" @click="openSocialTippingModal(user)">送る</td>
      </tr>
    </table>

    <Modal v-if="isBalanceModal || isSocialTippingModal" :socialTippingUser="socialTippingUser">
      <template v-slot:name>{{ modalUser.name }}</template>
      <template v-slot:wallet>{{ modalUser.wallet }}</template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
export default {
  name: "SocialTipping",
  components: {
    Modal,
  },
  data() {
    return {
      modalUser: null,
      socialTippingUser: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    users() {
      return this.$store.getters.users;
    },
    isBalanceModal() {
      return this.$store.getters.isBalanceModal;
    },
    isSocialTippingModal() {
      return this.$store.getters.isSocialTippingModal;
    },
  },
  methods: {
    logout: function () {
      this.$store.commit("setUser", null);
      this.$router.push("/");
    },
    openBalanceModal(user) {
      this.modalUser = user;
      this.$store.commit("setIsBalanceModal", true);
    },
    openSocialTippingModal(user) {
      this.socialTippingUser = user;
      this.$store.commit("setIsSocialTippingModal", true);
    },
  },
};
</script>

<style scoped>
header {
  width: 600px;
  margin: 0 auto;
  padding: 10px;
}
.username,
.wallet,
.logout {
  display: inline-block;
}
.username {
  margin-right: 100px;
}
.logout {
  border: 1px solid skyblue;
  color: skyblue;
  cursor: pointer;
  padding: 10px;
  margin-left: 100px;
}
.logout:hover {
  color: white;
  background: skyblue;
}
table {
  margin: 0 auto;
}
.wallet-btn {
  cursor: pointer;
  color: white;
  background: skyblue;
  padding: 10px;
  border-radius: 5px;
}
</style>
