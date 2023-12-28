<template>
  <div>
    <div class="bk">
      <div class="top">
        <div class="topTitle">中小学安全教育管理平台</div>
        <div class="goOut">
          <a-button @click="goOut">退出</a-button>
        </div>
      </div>
      <div class="content">
        <div class="leftMenu">
          <a-menu
            :default-selected-keys="['1']"
            :default-open-keys="['sub1', 'sub2', 'sub3']"
            mode="inline"
            theme="light"
          >
            <a-sub-menu key="sub1">
              <span slot="title"
                ><a-icon type="mail" /><span>位置管理</span></span
              >
              <a-menu-item key="1" @click="goContent(0)">
                位置管理
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"
                ><a-icon type="appstore" /><span>区域管理</span></span
              >
              <a-menu-item key="2" @click="goContent(1)">
                区域管理
              </a-menu-item>
              <!-- <a-menu-item key="7" @click="goContent(6)">
                门禁管理
              </a-menu-item> -->
            </a-sub-menu>

            <a-sub-menu key="sub3">
              <span slot="title"
                ><a-icon type="appstore" /><span>用户健康管理</span></span
              >
              <a-menu-item key="3" @click="goContent(2)">
                用户健康管理
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <span slot="title"
                ><a-icon type="appstore" /><span>电量管理</span></span
              >
              <a-menu-item key="4" @click="goContent(3)">
                电量管理
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub6">
              <span slot="title"
                ><a-icon type="appstore" /><span>软件管理</span></span
              >
              <a-menu-item key="6" @click="goContent(5)">
                软件管理
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
        <div class="rightConent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goOut() {
      sessionStorage.clear();
      this.$router.push({ path: "/" });
    },
    goContent(e) {
      // if (e == 0) {
      //   this.$router.push({ path: "/project" });
      // } else if (e == 1) {
      //   this.$router.push({ path: "/index2" });
      // } else {
      //   this.$router.push({ path: "/builder" });
      // }
      if (e == 0) {
        this.$router.push({ path: "/locateManage" });
      } else if (e == 1) {
        this.$router.push({ path: "/regionManage" });
      }else if (e == 2) {
        this.$router.push({ path: "/healthManage" });
      }else if (e == 3) {
        this.$router.push({ path: "/electManage" });
      }else if (e == 5) {
        this.$router.push({ path: "/softwareManage" });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.bk {
  //   background-image: url("../../assets/images/zu43.png");
  background-repeat: no-repeat;
  height: 100vh;
  background-size: 100% 100%;
  position: relative;
}
.top {
  height: 66px;
  display: flex;
  line-height: 66px;
  background-image: url("../../assets/images/zu15.png");
  background-repeat: no-repeat;
  position: relative;
  .topTitle {
    height: 41px;
    font-size: 23px;
    margin-left: 40px;
    color: #fff;
    font-weight: 600;
    letter-spacing: 1px;
    // margin-top: 10px;
    // margin-right: 93px;
  }
  .goOut {
    position: absolute;
    right: 50px;
  }
}
.content {
  display: flex;
  .leftMenu {
    width: 236px;
    height: 92vh;
  }
}
</style>