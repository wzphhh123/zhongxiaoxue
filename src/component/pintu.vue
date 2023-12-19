<template>
  <div>
    <div class="content">
      <slide-verify
        :l="42"
        :r="10"
        :w="470"
        :h="175"
        :imgs="imgs"
        slider-text="向右滑动"
        @success="onSuccess"
        @fail="onFail"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [require("../assets/image/bk2.jpg")],
    };
  },
  methods: {
    onSuccess() {
      this.$message.success("登录成功");
      sessionStorage.setItem("userToken", this.userToken);
      setTimeout(() => {
        this.$router.push({ path: "/home" });
      }, 1500);
    },
    onFail() {
      this.$message.warn("验证失败，请重新尝试！");
    },
  },
};
</script>

<style lang="scss" scoped>
.content{
}
</style>