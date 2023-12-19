<template>
  <div>
    <div class="bk">
      <div class="top"></div>
      <div class="main">
        <div class="content">
          <a-row>
            <a-col :span="6"> <gundongVue /> </a-col>
            <a-col :span="12"> col-12 </a-col>
            <a-col :span="6"> col-12 </a-col>
          </a-row>
        </div>
        <div class="footer">
          <a-row>
            <a-col :span="6"> col-12 </a-col>
            <a-col :span="12"> col-12 </a-col>
            <a-col :span="6"> col-12 </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gundongVue from './component/gundong.vue';
export default {
    components:{gundongVue},
    data() {
        return {
        }
    },
};
</script>

<style lang="scss" scoped>
.bk {
  background-image: url("../../assets/imgaes/椭圆 4.png");
  background-repeat: no-repeat;
  background-size: 100% ;
  height: 100vh;
  
}
.top {
  background-image: url("../../assets/imgaes/top.png");
  background-repeat: no-repeat;
  //   width: 100vw;
  height: 66px;
  background-size: 100% ;
}
.main{
    padding: 5px 18px 18px 18px;
}
</style>