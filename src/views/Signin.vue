<template>
  <div class="container">
    <h1>ログイン画面</h1>

    <table>
      <tr>
        <td>メールアドレス</td>
        <td><input type="text" v-model="mailAddress" /></td>
      </tr>
      <tr>
        <td>パスワード</td>
        <td><input type="password" v-model="password" /></td>
      </tr>
    </table>

    <div class="signin" @click="signIn">
      ログイン
    </div>

    <div class="signup">
      <router-link to="/signup">新規登録はこちらから</router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Signin',
  data() {
    return {
      mailAddress: '',
      password: '',
    };
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
              console.log(user);
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
table {
  margin: 0 auto;
}
.signin {
  display: inline-block;
  border: 1px solid skyblue;
  color: skyblue;
  cursor: pointer;
  padding: 10px;
  margin: 10px 0;
}
.signin:hover {
  color: white;
  background: skyblue;
}
.signup a {
  color: skyblue;
}
</style>
