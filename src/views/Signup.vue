<template>
  <div class="container">
    <h1>新規登録画面</h1>

    <table>
      <tr>
        <td>ユーザー名</td>
        <td><input type="text" placeholder="User Name" v-model="userName" /></td>
      </tr>
      <tr>
        <td>メールアドレス</td>
        <td><input type="email" placeholder="Email" v-model="mailAddress" /></td>
      </tr>
      <tr>
        <td>パスワード</td>
        <td><input type="password" placeholder="Password" v-model="password" /></td>
      </tr>
    </table>

    <div class="signup" @click="signUp">
      新規登録
    </div>

    <div class="signin">
      <router-link to="/">ログインはこちらから</router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Signup',
  data() {
    return {
      userName: '',
      mailAddress: '',
      password: '',
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.mailAddress, this.password)
        .then((result) => {
          const userData = {
            user_id: result.user.uid,
            name: this.userName,
            email: this.mailAddress,
            wallet: 500,
          };
          firebase
            .firestore()
            .collection('users')
            .doc(result.user.uid)
            .set(userData)
            .catch(function(error) {
              alert(error.message);
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
.signup {
  display: inline-block;
  border: 1px solid skyblue;
  color: skyblue;
  cursor: pointer;
  padding: 10px;
  margin: 10px 0;
}
.signup:hover {
  color: white;
  background: skyblue;
}
.signin a {
  color: skyblue;
}
</style>
