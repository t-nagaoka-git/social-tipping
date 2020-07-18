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
  </div>
</template>

<script>
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
