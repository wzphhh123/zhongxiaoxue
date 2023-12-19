<template>
  <div>
    <div class="top"></div>
    <div class="content">
      <div class="tu1"></div>
      <div class="tu2"></div>
    </div>
    <div class="gundong">
      <table
        style="width: 70%; border-color: #ccc; border-collapse: collapse"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td colspan="11" class="list"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.top {
  background-image: url("../../../assets/imgaes/title.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 39px;
}
.content {
  width: 464px;
  height: 448px;
  background: rgba(0, 188, 255, 0.1);
  border: 1px solid #00bcff;
  display: flex;
  margin-bottom: 36px;
  .tu1 {
    background-image: url("../../../assets/imgaes/总参观时长.png");
    background-size: 100%;
    width: 60px;
    background-repeat: no-repeat;
    height: 60px;
    margin-left: 52px;
    margin-top: 45px;
  }
  .tu2 {
    background-image: url("../../../assets/imgaes/总参观时长.png");
    background-size: 100%;
    width: 60px;
    background-repeat: no-repeat;
    height: 60px;
    margin-left: 147px;
    margin-top: 45px;
  }
}
</style>