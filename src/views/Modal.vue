<template>
  <div class="container">
    <div v-if="isBalanceModal" class="modal">
      <div class="user-info">
        <p>
          <slot name="name"></slot>さんの残高
        </p>
        <p>
          <slot name="wallet"></slot>
        </p>
      </div>
      <div class="btn-area">
        <button class="btn" @click="closeModal">close</button>
      </div>
    </div>
    <div v-if="isSocialTippingModal" class="modal">
      <div class="user-info">
        <p>あなたの残高：{{ user.wallet }}</p>
        <p>送る金額</p>
        <input class="money" type="text" v-model="money" />
      </div>
      <div class="btn-area">
        <button class="btn" @click="socialTipping">送信</button>
      </div>
    </div>
    <div id="modal-background"></div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Modal",
  data() {
    return {
      money: 0,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    users() {
      return this.$store.getters.users;
    },
    socialTippingUser() {
      return this.$store.getters.socialTippingUser;
    },
    isBalanceModal() {
      return this.$store.getters.isBalanceModal;
    },
    isSocialTippingModal() {
      return this.$store.getters.isSocialTippingModal;
    },
  },
  methods: {
    closeModal() {
      this.$store.commit("setIsBalanceModal", false);
    },
    socialTipping: function () {
      const db = firebase.firestore();
      const currentUserRef = db.collection("users").doc(this.user.userId);
      const socialTippingUserRef = db
        .collection("users")
        .doc(this.socialTippingUser.userId);
      db.runTransaction(async (transaction) => {
        await Promise.all([
          transaction.get(currentUserRef),
          transaction.get(socialTippingUserRef),
        ]);
        await transaction.update(currentUserRef, {
          wallet: this.user.wallet - this.money,
        });
        await transaction.update(socialTippingUserRef, {
          wallet:
            parseInt(this.socialTippingUser.wallet) + parseInt(this.money),
        });
      })
        .then(() => {
          const updatedCurrentUser = this.user;
          updatedCurrentUser.wallet -= this.money;
          this.$store.commit("setUser", updatedCurrentUser);
          const updatedUsers = this.users;
          const updatedSocialTippingUser = updatedUsers.find(
            (user) => user.userId === this.socialTippingUser.userId
          );
          updatedSocialTippingUser.wallet += parseInt(this.money);
          this.$store.commit("setUsers", updatedUsers);
          this.$store.commit("setSocialTippingUser", null);
          this.$store.commit("setIsSocialTippingModal", false);
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 200px;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 5px;
  z-index: 2;
  opacity: 1;
  transition: 0.3s;
}
.money {
  border: 1px solid silver;
  margin: 5px 0;
}
.btn-area {
  background: silver;
  padding: 10px;
  border-radius: 0 0 5px 5px;
}
.btn {
  border: none;
  border-radius: 5px;
  padding: 10px;
  background: red;
  color: white;
}
#modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 1;
  opacity: 0.7;
  transition: 0.3s;
}
</style>
