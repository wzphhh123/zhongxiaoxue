<template>
  <div>
    <div class="bk">
      <div class="top">
        <p>
          <span class="topName">中小学生项目管理平台</span>
          <span class="english"
            >Project Management Platform for Primary and Secondary School
            Students</span
          >
        </p>
      </div>
      <!-- <div class="topTitle">
        <p>
          <span
            >智慧供热集“全网监测、诊断分析、治调节、节能提升”于一体，将供热系统从信息获取、分析处理、决策执行三方面行成完整、安全、高效、可的“生产运行服务管理链”</span
          >
          <span
            >保证集中供热安全生产、经济运行是汇中智慧供热平台的目标，智慧供热平台从生产运行、维护管理、经营服务、辅助决策四方面出发，将生产监控与运行管理有机的结合起来，使热力公司实现运行调度实时科学化、运维管理规范高效化、经营服务优质人性化、增强供热企业辅助决策雕力，</span
          >
          <span>切实做到按无供热。节能降再提高企业的经济和社会效普。</span>
        </p>
      </div> -->
      <div class="content">
        <div class="contentP1"></div>
        <div class="contentP2"></div>
        <div class="contentP3">
          <div class="title">登录</div>
          <div class="contentP3Main">
            <a-input
              ref="userNameInput"
              v-model="loginForm.account"
              placeholder="请输入用户名"
              style="margin-bottom: 45px"
            >
              <a-icon slot="prefix" type="user" style="font-size: 20px" />
            </a-input>
            <a-input
              ref="userNameInput"
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
              style="margin-bottom: 45px"
            >
              <a-icon slot="prefix" type="lock" style="font-size: 20px" />
            </a-input>
            <!-- <div style="display: flex">
              <a-input
                ref="userNameInput"
                v-model="loginForm.code"
                placeholder="请输入右侧验证码"
                style="width: 64%; margin-bottom: 45px"
              >
              </a-input>
              <span class="photoCode" @click="refreshCode">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </span>
            </div> -->

            <div style="text-align: center">
              <a-button
                @click="JWTToken"
                type="primary"
                style="width: 90%; height: 50px; font-size: 18px"
                >登录</a-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import SIdentify from "./identify.vue";
export default {
  components: { SIdentify },
  data() {
    return {
      loginForm: {
        account: "admin",
        password: "bhkj8070039!@#.",
      },
      // 图片验证码
      identifyCode: "",
      // 验证码规则
      identifyCodes: "3456789ABCDEFGHGKMNPQRSTUVWXY",
      firstNetWork: {},
    };
  },
  methods: {
    //验证码abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
      // console.log(this.identifyCode);
    },
    async JWTToken() {
      const res = await this.$api.JWTToken(this.loginForm);
      if (res.success) {
        // this.data = res.token
        this.$message.success("登录成功！");
        sessionStorage.setItem("userToken", res.data.token);
        this.$router.push({ path: "/index" });
      } else {
        this.$message.warn(res.msg);
      }
    },
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
};
</script>

<style lang="scss" scoped>
.bk {
  background-image: url("../../assets/images/bk.png");
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  padding-top: 109px;
  padding-left: 98px;
  position: relative;
  .top {
    // background-image: url("../../assets/images/top.png");
    // width: 740px;
    // height: 81px;
    // background-size: 100% 100%;
    // margin-bottom: 67px;
    p {
      .topName {       
        width: 1000px;
        font-size: 80px;
        color: #fff;
      }
      .english {
        display: block;
        width: 700px;
        font-size: 30px;
        color: #fff;
      }
    }
    h3 {
      font-size: 80px;
      color: #fff;
      letter-spacing: 3px;
    }
    span {
      color: rgb(233, 230, 230);
      font-size: 25px;
      width: 100px;
    }
  }
  .topTitle {
    width: 1043px;
    height: 198px;
    font-size: 18px;
    color: #d3ddfc;
    line-height: 36px;
    p {
      span {
        display: block;
      }
    }
  }
  .content {
    .contentP1 {
      position: absolute;
      right: 138px;
      top: 260px;
      width: 554px;
      height: 457px;
      background: #ffffff;
      box-shadow: 0px 4px 35px 0px #104683;
      opacity: 0.12;
      border-radius: 15px;
    }
    .contentP2 {
      position: absolute;
      right: 160px;
      top: 220px;
      width: 505px;
      height: 531px;
      background: #ffffff;
      box-shadow: 0px 4px 24px 0px #104683;
      opacity: 0.29;
      border-radius: 15px;
    }
    .contentP3 {
      position: absolute;
      right: 181px;
      top: 183px;
      width: 460px;
      height: 604px;
      background: #ffffff;
      box-shadow: 0px 4px 21px 0px #104683;
      border-radius: 15px;
      padding: 0 33px;
      .title {
        width: 158px;
        height: 29px;
        font-size: 30px;
        font-weight: bold;
        color: #333333;
        margin-top: 50px;
        margin-left: 10px;
        margin-bottom: 57px;
        letter-spacing: 2px;
      }
      .contentP3Main {
        /deep/ .ant-input {
          padding-left: 40px;
          height: 50px !important;
        }
        .photoCode {
          display: inline-block;
          width: 170px;
          height: 50px;
          margin-left: 10px;
          // background: #333;
          vertical-align: middle;
        }
      }
    }
  }
  .footer {
    background-image: url("../../assets/images/footer.png");
    width: 388px;
    height: 39px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 31px;
    left: 766px;
  }
}
</style>