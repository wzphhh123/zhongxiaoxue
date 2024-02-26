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
        <a-row>
          <a-col :span="4"
            ><div class="leftMenu">
              <a-menu
                :default-selected-keys="['1']"
                :default-open-keys="['sub1']"
                mode="inline"
                theme="light"
              >
                <a-sub-menu key="sub1">
                  <span slot="title"
                    ><a-icon type="mail" /><span style="margin-left: 20%"
                      >体验展馆列表</span
                    ></span
                  >
                  <!-- <a-menu-item key="1" @click="goContent(0)">
                位置管理
              </a-menu-item> -->
                  <a-menu-item
                    key="11"
                    @click="goContent(11)"
                    style="padding-left: 33%"
                  >
                    体验展馆列表
                  </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                  <span slot="title"
                    ><a-icon type="mail" /><span style="margin-left: 20%"
                      >区域管理</span
                    ></span
                  >
                  <a-menu-item
                    key="2"
                    @click="goContent(1)"
                    style="padding-left: 33%"
                  >
                    区域管理
                  </a-menu-item>
                </a-sub-menu>

                <a-sub-menu key="sub3">
                  <span slot="title"
                    ><a-icon type="mail" /><span style="margin-left: 20%"
                      >用户健康管理</span
                    ></span
                  >
                  <a-menu-item
                    key="3"
                    @click="goContent(2)"
                    style="padding-left: 33%"
                  >
                    用户健康管理
                  </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub4">
                  <span slot="title"
                    ><a-icon type="mail" /><span style="margin-left: 20%"
                      >电量管理</span
                    ></span
                  >
                  <a-menu-item
                    key="4"
                    @click="goContent(3)"
                    style="padding-left: 33%"
                  >
                    电量管理
                  </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub6">
                  <span slot="title"
                    ><a-icon type="mail" /><span style="margin-left: 20%"
                      >软件管理</span
                    ></span
                  >
                  <a-menu-item
                    key="5"
                    @click="goContent(5)"
                    style="padding-left: 33%"
                  >
                    软件管理
                  </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub7">
                  <span slot="title"
                    ><a-icon type="mail" /><span style="margin-left: 20%"
                      >门禁管理</span
                    ></span
                  >
                  <a-menu-item
                    key="7"
                    @click="goContent(6)"
                    style="padding-left: 33%"
                  >
                    门禁用户管理
                  </a-menu-item>
                  <a-menu-item
                    key="8"
                    @click="goContent(7)"
                    style="padding-left: 33%"
                  >
                    门禁管理
                  </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub8">
                  <span slot="title"
                    ><a-icon type="mail" /><span style="margin-left: 20%"
                      >预约管理</span
                    ></span
                  >
                  <a-menu-item
                    key="9"
                    @click="goContent(8)"
                    style="padding-left: 33%"
                  >
                    预约管理
                  </a-menu-item>
                  <!-- <a-menu-item
                    key="8"
                    @click="goContent(9)"
                    style="padding-left: 33%"
                  >
                    用户管理
                  </a-menu-item> -->
                  <a-menu-item
                    key="10"
                    @click="goContent(10)"
                    style="padding-left: 33%"
                  >
                    批次管理
                  </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </div></a-col
          >
          <a-col :span="20"
            ><div class="rightConent">
              <router-view></router-view></div
          ></a-col>
        </a-row>
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
      if (e == 0) {
        this.$router.push({ path: "/locateManage" });
      } else if (e == 1) {
        this.$router.push({ path: "/regionManage" });
      } else if (e == 2) {
        this.$router.push({ path: "/healthManage" });
      } else if (e == 3) {
        this.$router.push({ path: "/electManage" });
      } else if (e == 5) {
        this.$router.push({ path: "/softwareManage" });
      } else if (e == 6) {
        this.$router.push({ path: "/doorUserManage" });
      } else if (e == 7) {
        this.$router.push({ path: "/doorControlManage" });
      } else if (e == 8) {
        this.$router.push({ path: "/reservateManage" });
      } else if (e == 9) {
        this.$router.push({ path: "/reserUser" });
      } else if (e == 10) {
        this.$router.push({ path: "/batchManage" });
      } else if (e == 11) {
        this.$router.push({ path: "/exhibeAddress" });
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
  // display: flex;
  .leftMenu {
    width: 100%;
    // width: 300px;
    height: 92vh;
  }
  .rightConent {
    padding: 10px;
  }
}
</style>