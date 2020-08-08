<template>
  <div class="container">
    <div class="balance-modal">
      <div class="user-info">
        <p><slot name="name"></slot>さんの残高</p>
        <p><slot name="wallet"></slot></p>
      </div>
      <div class="btn-area">
        <button class="close-btn" @click="closeBalanceModal">close</button>
      </div>
    </div>
    <div id="modal-background"></div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  computed: {
    isModal() {
      return this.$store.getters.isModal;
    },
  },
  methods: {
    closeBalanceModal() {
      this.$store.commit("setIsModal", false);
    },
  },
};
</script>

<style scoped>
.balance-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 150px;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 5px;
  z-index: 2;
  opacity: 1;
  transition: 0.3s;
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
  opacity: 0.7;
  transition: 0.3s;
}
</style>
