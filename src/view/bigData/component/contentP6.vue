<template>
  <div>
    <div class="bk">
      <div class="top">
        <span>软件使用占比</span>
      </div>
      <div class="content">
        <div id="main6" style="height: 400px"></div>
        <div class="ditu">
          <img src="../../../assets/images/P6ditu.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  methods: {
    charts() {
      var myChart = echarts.init(document.getElementById("main6"));

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
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
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              // 删除刻度
              show: false,
            },
            axisLine: {
              // 轴线
              show: false,
            },
          },
        ],
        yAxis: [
          {
            name: "单位:（人数）",
            type: "value",
            splitLine: {
              // 删除横线
              show: false,
            },
            axisLine: {
              // 轴线
              show: true,
            },
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "40%",
            data: [10, 52, 200, 334, 390, 330, 220],
            // 阴影
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00B7FF" },
                // { offset: 0.5, color: "#0C5199" },
                { offset: 1, color: "rgba(34,68,172,0.3)" },
              ]),
            },
            label: {
              show: true, // 开启显示
              position: "top", // 在上方显示
              distance: 10, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
              verticalAlign: "middle",
              textStyle: {
                // 数值样式
                color: "rgba(216,236,244,1)",
                fontSize: 12,
              },
              // backgroundColor: "rgba(51, 167, 240, 1)",
              // width: 20,
              // height: 8,
              // // shadowBlur: 6, //阴影
              // borderRadius: 100,
            },
          },
          {
            //数据圆片(蓝色柱子的顶部圆片)
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [0, -5],
            z: 3,
            itemStyle: {
              opacity: 1,
              color: "rgba(33,243,255,0.7)",
            },

            symbolPosition: "end",
            data: [10, 52, 200, 334, 390, 330, 220],
            // 柱子顶部显示值
            // label: {
            //     show: true,
            //     position: 'top',
            //     distance: 0,
            //     formatter: '{c}'
            // },
          },
          {
            //最底部圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 10], //圆片的形状大小
            symbolOffset: [0, -5], //圆片的偏移量
            z: 3,
            itemStyle: {
              opacity: 1,
              color: "rgba(31,97,234,0.8)",
              //color: '#000'
            },
            symbolPosition: "end",
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
  padding-left: 13px;
  margin-top: -17px;
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
  padding: 15px;
  position: relative;
  .ditu {
    position: absolute;
    bottom: 11%;
    left: 57px;
    img {
      width: 390px;
      height: 40px;
    }
  }
}
</style>