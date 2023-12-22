<template>
  <div class="bk">
    <div class="bk2">
      <vue-particles
        style="position: fixed; width: 100%"
        color="#fff"
        :particleOpacity="0.3"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
      <div class="top"></div>
      <div class="main">
        <div class="content">
          <a-row>
            <a-col :span="6"> <contentP1Vue /> </a-col>
            <a-col :span="12"> <contentP2Vue /></a-col>
            <a-col :span="6">
              <contentP3Vue />
              <!-- <testVue /> -->
            </a-col>
          </a-row>
        </div>
        <div class="footer">
          <a-row>
            <a-col :span="6"><contentP4Vue /></a-col>
            <a-col :span="12">
              <contentP5Vue />
              <!-- <test2Vue /> -->
              <!-- <test3Vue /> -->
              <!-- <test21Vue /> -->
            </a-col>
            <a-col :span="6"> <contentP6Vue /></a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contentP1Vue from "./component/contentP1.vue";
import contentP2Vue from "./component/contentP2.vue";
import contentP3Vue from "./component/contentP3.vue";
import contentP4Vue from "./component/contentP4.vue";
import contentP5Vue from "./component/contentP5.vue";
import contentP6Vue from "./component/contentP6.vue";
import testVue from "./component/test.vue";
import test2Vue from "../test/test2.vue";
import test3Vue from "../test/test3.vue";
import test21Vue from "../test/test21.vue";
export default {
  components: {
    contentP1Vue,
    contentP2Vue,
    contentP3Vue,
    contentP4Vue,
    contentP5Vue,
    contentP6Vue,
    testVue,
    test2Vue,test3Vue,test21Vue
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.bk {
  background-image: url("../../assets/images/图层 1011.png");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
}
.bk2 {
  background-image: url("../../assets/images/bk.png");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
}
.top {
  background-image: url("../../assets/images/top.png");
  background-repeat: no-repeat;
  width: 100vw;
  height: 66px;
  // background-size: 100% ;
  background-size: contain;
}
.main {
  padding: 5px 18px 18px 18px;
}
</style>