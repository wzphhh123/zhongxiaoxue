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
          <div id="main4" style="height: 300px"></div>
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
      shuzi: "",
      dataList: [
      ],
    };
  },
  methods: {
    charts() {
      var myChart = echarts.init(document.getElementById("main4"));
      var option = {
        toolbox: {
          show: true,
        },
        color: [
          "#7351E3",
          "#EA5401",
          "#209A90",
          "#FC4873",
          "#FDD100",
          "#42EAFB",
        ],
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [25, 90],
            center: ["40%", "45%"],
            roseType: "area",
            // 弧度
            // itemStyle: {
            //   borderRadius: 8,
            // },
            data: this.dataList,
            labelLine: {
              //设置延长线的长度
              normal: {
                length: 10, //设置延长线的长度
                // length2: 10,//设置第二段延长线的长度
              },
            },
            label: {
              color: "#fff",
              fontSize: 16,
              opacity: 1,
              position: "outside",
              formatter: "{name|{b}}\n{per|{d}%}",
              padding: [0, -10],

              // formatter: (name) => {
              //   var data = this.dataList;
              //   var total = 0;
              //   var tarValue;
              //   for (var i = 0; i < data.length; i++) {
              //     total += data[i].value;
              //     // console.log("i",i);
              //     // console.log("total",total);
              //     if (data[i].name === name) {
              //       tarValue = data[i].value;
              //       console.log("tarValue",tarValue);
              //     }
              //   }
              //   var v = tarValue;
              //   var b = Math.round((tarValue / total) * 100);
              //   return b + "%";

              //   // return item.data.name + ":" + item.data.value + "（人）" + "";
              // },
              rich: {
                fangkuai: {
                  width: "5px",
                  height: "5px",
                  color: "#fff",
                },
                name: {
                  color: "#fff",
                  lineHeight: 20, //设置最后一行空数据高度，为了能让延长线与hr线对接起来
                  align: "center",
                },
                // hr: {
                //   //设置hr是为了让中间线能够自适应长度
                //   borderColor: "auto", //hr的颜色为auto时候会主动显示颜色的
                //   width: "75%",
                //   borderWidth: 0.5,
                //   height: 0.5,
                // },
                per: {
                  //用百分比数据来调整下数字位置，显的好看些。如果不设置，formatter最后一行的空数据就不需要
                  padding: [4, 0],
                  fontSize: "16px",
                  color: "#488CF7",
                  fontFamily: "AlibabaSans",
                },
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    // 获取电量
    async findAllElectricity() {
      const res = await this.$api.findAllElectricity();
      if (res.success) {
        this.shuzi = res.data.sumElec;
        this.dataList = res.data.map;
        this.charts();
      }
    },
  },
  mounted() {
    this.findAllElectricity();
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

        .tongyi {
          padding: 2px 0;
          display: flex;
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
          width: 26px;
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