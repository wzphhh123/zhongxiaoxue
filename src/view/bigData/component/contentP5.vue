<template>
  <div>
    <div class="bk">
      <div class="top">
        <span>体验中心管理</span>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bk {
    padding: 5px 7px;
}
.top {
  background-image: url("../../../assets/images/title长图.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 39px;
  line-height: 39px;
  padding-left: 42px;
  letter-spacing: 1px;
  span {
    color: #fff;
    font-size: 16px;
  }
}
.content {
  width: 100%;
  height: 440px;
  background: rgba(0, 188, 255, 0.1);
  border: 1px solid #00bcff;
}
</style>