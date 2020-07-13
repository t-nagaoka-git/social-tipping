<template>
  <div class="container">
    <header>
      <div class="username">{{ user.name }} さんようこそ！</div>
      <div class="wallet">残高：{{ user.wallet }}</div>
      <div class="logout">
        ログアウト
      </div>
    </header>

    <h1>ユーザー一覧</h1>
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
    signIn: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mailAddress, this.password)
        .then((result) => {
          firebase
            .firestore()
            .collection('users')
            .doc(result.user.uid)
            .get()
            .then((doc) => {
              const user = doc.data();
              this.$store.commit('setUserId', { userId: user.user_id });
              this.$store.commit('setEmail', { email: user.email });
              this.$store.commit('setName', { name: user.name });
              this.$store.commit('setWallet', { wallet: user.wallet });
              alert('Success!');
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
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
</style>
