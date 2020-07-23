<template>
  <div class="container">
    <header>
      <div class="username">{{ user.name }} さんようこそ！</div>
      <div class="wallet">残高：{{ user.wallet }}</div>
      <div class="logout" @click="logout">
        ログアウト
      </div>
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
        <td class="wallet-btn" @click="openBalanceModal(user.userId)">walletを見る</td>
        <td class="wallet-btn">送る</td>
      </tr>
    </table>

    <div :id="'balance-modal' + user.userId" class="balance-modal" v-for="user in users" :key="user.userId">
      <div class="user-info">
        <p>{{ user.name }}さんの残高</p>
        <p>{{ user.wallet }}</p>
      </div>
      <div class="btn-area">
        <button class="close-btn" @click="closeBalanceModal(user.userId)">close</button>
      </div>
    </div>
    <div id="modal-background"></div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'SocialTipping',
  computed: {
    user() {
      return this.$store.getters.user;
    },
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    logout: function() {
      this.$store.commit('setUser', null);
      this.$router.push('/');
    },
    openBalanceModal: (userId) => {
      const modal = document.getElementById('balance-modal' + userId);
      const modalBackground = document.getElementById('modal-background');
      modal.classList.add('active');
      modalBackground.classList.add('active');
    },
    closeBalanceModal: (userId) => {
      const modal = document.getElementById('balance-modal' + userId);
      const modalBackground = document.getElementById('modal-background');
      modal.classList.remove('active');
      modalBackground.classList.remove('active');
    },
  },
  created() {
    firebase
      .firestore()
      .collection('users')
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          if (doc.id === this.user.userId) return;
          const user = doc.data();
          user.userId = doc.id;
          delete user.user_id;
          users.push(user);
        });
        this.$store.commit('setUsers', users);
      })
      .catch((error) => {
        alert(error);
      });
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
.balance-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 150px;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 5px;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}
.balance-modal.active {
  opacity: 1;
  visibility: visible;
}
.btn-area {
  background: silver;
  padding: 10px;
  border-radius: 0 0 5px 5px;
}
.close-btn {
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
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}
#modal-background.active {
  opacity: 0.7;
  visibility: visible;
}
</style>
