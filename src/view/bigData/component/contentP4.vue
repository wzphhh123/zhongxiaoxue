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
                <span>{{ this.shuzi }}</span>
                <span>%</span>
              </p>
            </div>
            <!-- <a-progress
              class="xiaoGuo"
              type="circle"
              :format="() => ''"
              :width="78"
              :percent="this.shuzi"
              stroke-color="#45f5ca"
            /> -->
          </div>
          <!-- 具体 -->
          <div class="topRight">
            <span>总电量数</span>
            <div class="jindu">
              <!-- 0-10 -->
              <div class="tongyi" v-if="shuzi > 0 && shuzi <= 10">
                <div class="xiaoK5"></div>
              </div>
              <!-- 11-20 -->
              <div class="tongyi" v-if="shuzi > 10 && shuzi <= 20">
                <div class="xiaoK4"></div>
                <div class="xiaoK6"></div>
              </div>
              <!-- 21-30 -->
              <div class="tongyi" v-if="shuzi > 20 && shuzi <= 30">
                <div class="xiaoK3"></div>
                <div class="xiaoK5"></div>
                <div class="xiaoK7"></div>
              </div>
              <!-- 31-40 -->
              <div class="tongyi" v-if="shuzi > 30 && shuzi <= 40">
                <div class="xiaoK2"></div>
                <div class="xiaoK4"></div>
                <div class="xiaoK6"></div>
                <div class="xiaoK8"></div>
              </div>
              <!-- 41-50 -->
              <div class="tongyi" v-if="shuzi > 40 && shuzi <= 50">
                <div class="xiaoK1"></div>
                <div class="xiaoK3"></div>
                <div class="xiaoK5"></div>
                <div class="xiaoK7"></div>
                <div class="xiaoK8"></div>
              </div>
              <!-- 51-60 -->
              <div class="tongyi" v-if="shuzi > 50 && shuzi <= 60">
                <div class="xiaoK1"></div>
                <div class="xiaoK2"></div>
                <div class="xiaoK3"></div>
                <div class="xiaoK5"></div>
                <div class="xiaoK7"></div>
                <div class="xiaoK8"></div>
              </div>
              <!-- 61-70 -->
              <div class="tongyi" v-if="shuzi > 60 && shuzi <= 70">
                <div class="xiaoK1"></div>
                <div class="xiaoK2"></div>
                <div class="xiaoK3"></div>
                <div class="xiaoK4"></div>
                <div class="xiaoK6"></div>
                <div class="xiaoK7"></div>
                <div class="xiaoK9"></div>
              </div>
              <!-- 71-80 -->
              <div class="tongyi" v-if="shuzi > 70 && shuzi <= 80">
                <div class="xiaoK1"></div>
                <div class="xiaoK2"></div>
                <div class="xiaoK3"></div>
                <div class="xiaoK4"></div>
                <div class="xiaoK5"></div>
                <div class="xiaoK6"></div>
                <div class="xiaoK7"></div>
                <div class="xiaoK9"></div>
              </div>
              <!-- 81-90 -->
              <div class="tongyi" v-if="shuzi > 80 && shuzi <= 90">
                <div class="xiaoK1"></div>
                <div class="xiaoK2"></div>
                <div class="xiaoK3"></div>
                <div class="xiaoK4"></div>
                <div class="xiaoK5"></div>
                <div class="xiaoK6"></div>
                <div class="xiaoK7"></div>
                <div class="xiaoK8"></div>
                <div class="xiaoK9"></div>
              </div>
              <!-- 91-100-->
              <div class="tongyi" v-if="shuzi > 90 && shuzi <= 100">
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
            </div>
            <div class="shuzi">
              <span>{{ this.shuzi }}%</span>
            </div>
          </div>
        </div>
        <div class="contentMain">
          <div class="mainTitle">各区域耗电量占比:</div>
          <div
            id="main4"
            style="width: 400px; height: 280px; margin-left: -15%"
          ></div>
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
      shuzi: "100",
      dataList: [],
      oneData: [],
      twoData: [],
      nameData: [],
    };
  },
  methods: {
    async charts() {
      var myChart = echarts.init(document.getElementById("main4"));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          orient: "horizontal",
          itemHeight: 10,
          itemWidth: 10,
          // data: [
          //   {
          //     name: "正确数",
          //     icon: "circle",
          //     textStyle: { fontWeight: "bold", color: "#fff" },
          //   },
          // ],
          icon: "circle",
          textStyle: {
            color: "#fff",
          },
          left: "60%",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            // show: false,
            data: this.nameData,
            // 去掉刻度线
            axisTick: {
              show: false,
            },
            // 去掉x轴横线
            axisLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            show: false,
          },
        ],
        series: [
          {
            name: "发电量",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.oneData,
            // barWidth: 20,
            itemStyle: {
              // 使用方法二的写法
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 0, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: "#3e92f3", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "#226dcf", // 70% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#1054b7", // 100% 处的颜色
                  },
                ],
              },
            },
            label: {
              normal: {
                show: true, //开启显示
                position: "top", //柱形上方
                textStyle: {
                  //数值样式
                  color: "#1054b7",
                },
              },
            },
          },
          {
            name: "耗电量",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.twoData,
            // barWidth: 20,
            itemStyle: {
              // 使用方法二的写法
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 0, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: "#20fde7", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "#22dbd7", // 70% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#25beca", // 100% 处的颜色
                  },
                ],
              },
            },
            label: {
              normal: {
                show: true, //开启显示
                position: "top", //柱形上方
                textStyle: {
                  //数值样式
                  color: "#25beca",
                },
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    // 获取电量
    async findElectricity() {
      const res = await this.$api.findElectricity();
      if (res.success) {
        // this.shuzi = res.data.sumElec;
        this.nameData = res.data.nameData;
        this.oneData = res.data.oneData;
        this.twoData = res.data.twoData;
        this.charts();
      }
    },
  },
  mounted() {
    this.findElectricity();
  },
};
</script>

<style lang="scss" scoped>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
.bk {
  margin-top: -17px;
  width: 97%;
}
.top {
  background-image: url("../../../assets/images/title.png");
  background-size: 100%;
  background-repeat: no-repeat;
  // height: 39px;
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
  height: 41vh;
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
          text-align: right;
          margin-left: -1px;
          span {
            height: 13px;
            font-size: 17px;
            color: #4bf9ef;
            margin-top: 4px;
            min-width: 11px;
          }
          span:nth-child(2) {
            font-size: 13px;
            margin-top: 8px;
          }
        }
      }
      .xiaoGuo {
        position: absolute;
        left: 1%;
        top: 1%;
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

        .tongyi {
          padding: 2px 0;
          display: flex;
          // justify-content: space-between;
          padding-left: 2px;
        }
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
          // width: 26px;
          width: 9%;

          height: 16px;
          margin-right: 3px;
          // background: linear-gradient(90deg, #03171f 0%, #46f7cb 100%);
        }
        .xiaoK1 {
          background: linear-gradient(90deg, #031927 0%, #0a2d2f 100%);
        }
        .xiaoK2 {
          background: linear-gradient(90deg, #0a2d2f 0%, #0e3b3e 100%);
        }
        .xiaoK3 {
          background: linear-gradient(90deg, #0e3b3e 0%, #15514b 100%);
        }
        .xiaoK4 {
          background: linear-gradient(90deg, #15514b 0%, #1d6c61 100%);
        }
        .xiaoK5 {
          background: linear-gradient(90deg, #1d6c61 0%, #217b6c 100%);
        }
        .xiaoK6 {
          background: linear-gradient(90deg, #217b6c 0%, #2ea78f 100%);
        }
        .xiaoK7 {
          background: linear-gradient(90deg, #2ea78f 0%, #35c0a1 100%);
        }
        .xiaoK8 {
          background: linear-gradient(90deg, #35c0a1 0%, #3cd7b4 100%);
        }
        .xiaoK9 {
          background: linear-gradient(90deg, #3cd7b4 0%, #41e6be 100%);
        }
        .xiaoK10 {
          background: linear-gradient(90deg, #41e6be 0%, #45f5ca 100%);
        }
      }
      .shuzi {
        // display: flex;
        position: absolute;
        top: 30%;
        left: 84%;
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