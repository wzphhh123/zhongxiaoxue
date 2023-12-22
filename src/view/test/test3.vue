
<template>
  <div class="container">
    <div class="xx-map" id="baseBar"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.echarts();
  },
  methods: {
    echarts() {
      var myChart = echarts.init(document.getElementById("baseBar"));

      let option = {
        backgroundColor: "#061326",
        // grid: {
        //   top: "25%",
        //   left: "-5%",
        //   bottom: "5%",
        //   right: "5%",
        //   containLabel: true
        // },
        tooltip: {
          show: true
        },
        animation: true,
        xAxis: [
          {
            type: "category",
            data: ["粉丝总数", "经常活跃粉丝数", "不长活跃"],
            axisTick: {
              alignWithLabel: true
            },
            nameTextStyle: {
              color: "#82b0ec"
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#82b0ec"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
              margin: 30
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#0c2c5a"
              }
            },
            // 整条y轴
            axisTick:{
                show:true
            },
            // y轴上的小横线
            axisLine: {
              show: true,
              lineStyle: {
                color: '#0c2c5a',
                width: 2
              }
            }
          }
        ],
        series: [
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [40, 10],
            symbolOffset: [0, -6],
            symbolPosition: "end",
            z: 12,
            // "barWidth": "0",
            label: {
              normal: {
                show: true,
                position: "top",
                // "formatter": "{c}%"
                fontSize: 25,
                fontWeight: "bold",
                color: "#34DCFF"
              }
            },
            color: "#2DB1EF",
            data: [1998, 1096, 903]
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [40, 10],
            symbolOffset: [0, 7],
            // "barWidth": "20",
            z: 12,
            color: "#2DB1EF",
            data: ["粉丝总数", "经常活跃粉丝数", "不长活跃"]
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [50, 15],
            symbolOffset: [0, 12],
            z: 10,
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: "#2EA9E5",
                borderType: "solid",
                borderWidth: 1
              }
            },
            data: [1998, 1096, 903]
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [70, 20],
            symbolOffset: [0, 18],
            z: 10,
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: "#19465D",
                borderType: "solid",
                borderWidth: 2
              }
            },
            data: [1998, 1096, 903]
          },
          {
            type: "bar",
            //silent: true,
            barWidth: "40",
            barGap: "10%", // Make series be overlap
            barCateGoryGap: "10%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                  {
                    offset: 0,
                    color: "#38B2E6"
                  },
                  {
                    offset: 1,
                    color: "#0B3147"
                  }
                ]),
                opacity: 0.8
              }
            },
            data: [1998, 1096, 903]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: 800px;
  height: 700px;
  margin: 0 auto;
  background: #032b50;
  .xx-map {
    width: 100%;
    height: 100%;
  }
}
</style>