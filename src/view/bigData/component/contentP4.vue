<template>
  <div>
    <div class="bk">
      <div class="top">
        <span>电量管理</span>
      </div>
      <div class="content">
        <div class="contentTop">
          <!-- 电量百分比 -->
          <div class="topLeft">
            <img src="../../../assets/images/dlh.png" alt="" />
            <div class="liTupian">
              <img src="../../../assets/images/shandian.png" alt="" />
              <p>
                <span>54</span>
                <span>%</span>
              </p>
            </div>
          </div>
          <!-- 具体 -->
          <div class="topRight">
            <span>总电量数</span>
            <div class="jindu">
              <div class="xiaoK1"></div>
              <div class="xiaoK2"></div>
              <div class="xiaoK3"></div>
              <div class="xiaoK4"></div>
              <div class="xiaoK5"></div>
              <div class="xiaoK6"></div>
              <div class="xiaoK7"></div>
              <div class="xiaoK8"></div>
              <div class="xiaoK9"></div>
              <div class="xiaoK10"></div>
            </div>
            <div class="shuzi">
              <span>{{ this.shuzi }}%</span>
            </div>
          </div>
        </div>
        <div class="contentMain">
          <div class="mainTitle">各区域耗电量占比:</div>
          <div id="main4" style="width: 300px; height: 300px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      shuzi: 54,
    };
  },
  methods: {
    charts() {
      var myChart = echarts.init(document.getElementById("main4"));
      var option = {
        toolbox: {
          show: true,
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [25, 120],
            center: ["50%", "50%"],
            roseType: "area",
            // 弧度
            // itemStyle: {
            //   borderRadius: 8,
            // },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.charts();
  },
};
</script>

<style lang="scss" scoped>
.bk {
  margin-top: -17px;
  width: 97%;
}
.top {
  background-image: url("../../../assets/images/title.png");
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
  .contentTop {
    display: flex;
    margin-top: 33px;
    margin-left: 30px;
    .topLeft {
      position: relative;
      img {
        width: 81px;
        height: 81px;
      }
      .liTupian {
        display: flex;
        position: absolute;
        top: 28%;
        left: 15%;
        img {
          width: 20px;
          height: 31px;
        }
        p {
          display: flex;
          span {
            width: 31px;
            height: 13px;
            font-size: 20px;
            color: #4bf9ef;
          }
          span:nth-child(2) {
            font-size: 13px;
            margin-top: 8px;
            margin-left: -8px;
          }
        }
      }
    }
    .topRight {
      margin-left: 20px;
      position: relative;
      span {
        width: 56px;
        height: 15px;
        font-size: 14px;
        font-weight: bold;
        color: #bec4c5;
      }
      .jindu {
        border: 1px solid #4d9496;
        margin-top: 5px;
        // width: 97%;
        width: 290px;
        height: 22px;
        padding: 2px 0;
        display: flex;
        justify-content: space-around;
        .xiaoK1,
        .xiaoK2,
        .xiaoK3,
        .xiaoK4,
        .xiaoK5,
        .xiaoK6,
        .xiaoK7,
        .xiaoK8,
        .xiaoK9,
        .xiaoK10 {
          width: 26px;
          height: 16px;
          background: linear-gradient(90deg, #03171f 0%, #46f7cb 100%);
        }
      }
      .shuzi {
        display: flex;
        position: absolute;
        top: 30%;
        left: 88%;
        span {
          color: #bdefff;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
        }
      }
    }
  }
  .contentMain {
    margin-left: 15%;
    margin-top: 5px;
    .mainTitle {
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #dfeef3;
      line-height: 33px;
      margin-left: -10%;
    }
  }
}
</style>