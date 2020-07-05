<template>
  <div class="container">
    <h1>ログイン画面</h1>

    <table>
      <tr>
        <td>メールアドレス</td>
        <td><input type="text" /></td>
      </tr>
      <tr>
        <td>パスワード</td>
        <td><input type="text" /></td>
      </tr>
    </table>

    <div class="signin">
      ログイン
    </div>

    <div class="signup">
      <router-link to="/signup">新規登録はこちらから</router-link>
    </div>
  </div>
</template>

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
