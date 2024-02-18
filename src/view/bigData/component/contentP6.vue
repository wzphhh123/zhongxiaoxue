<template>
  <div>
    <div class="bk">
      <div class="top">
        <span>人员趋势图</span>
      </div>
      <div class="content">
        <div id="main6" style="height: 36vh; margin-top: 3%"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      dataList: [],
      xAxisData: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      yAxisData1: [820, 932, 901, 934, 190, 1330, 1320],
      yAxisData2: [120, 132, 201, 134, 90, 230, 210],
    };
  },
  methods: {
    async FindHealthIndex() {
      var data = {
        type: 0,
      };
      const res = await this.$api.FindHealthIndex(data);
      if (res.success) {
        this.dataList = res.data;
        this.charts();
      }
    },
    charts() {
      var myChart = echarts.init(document.getElementById("main6"));
      var option = {
        tooltip: {
          trigger: "axis",
        },
        color: ["rgba(30,155,251)", "rgba(28,231,198)"],
        legend: {
          orient: "vertical",
          itemHeight: 10,
          itemWidth: 10,
          data: [
            {
              name: "预约人数",
              icon: "rect",

              textStyle: { color: "#fff" },
            },
            {
              name: "实际人数",
              icon: "rect",
              textStyle: { color: "#fff" },
            },
          ],
          left: "70%",
          top:"2%",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxisData,
          // 去掉刻度线
          axisTick: {
            show: false,
          },
          axisLine: {
            //坐标轴轴线设置
            show: true, //是否显示坐标轴轴线
            symbol: ["none", "arrow"], //坐标轴箭头(可选'none','arrow',['none','arrow'])
            symbolSize: [5, 8], //箭头大小([宽度,高度])
            symbolOffset: [0, 7], //箭头偏移
            lineStyle: {
              //坐标轴的线
              color: "#54A8CF", //线的颜色
              width: 2, //线的粗细程度    (用数字表示)
              type: "solid", //线的类型        (可选solid  dotted  dashed)
              opacity: 1, //线的透明度        (用0~1的小数表示)
            },
          },
          axisLabel: {
            textStyle: {
              color: "#fff", // 将x轴文字颜色设为红色
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine:{
            show:false,
          },
          axisLine: {
            //坐标轴轴线设置
            show: true, //是否显示坐标轴轴线
            symbol: ["none", "arrow"], //坐标轴箭头(可选'none','arrow',['none','arrow'])
            symbolSize: [5, 8], //箭头大小([宽度,高度])
            symbolOffset: [0, 7], //箭头偏移
            lineStyle: {
              //坐标轴的线
              color: "#54A8CF", //线的颜色
              width: 2, //线的粗细程度    (用数字表示)
              type: "solid", //线的类型        (可选solid  dotted  dashed)
              opacity: 1, //线的透明度        (用0~1的小数表示)
            },
          },
          axisLabel: {
            textStyle: {
              color: "#fff", // 将x轴文字颜色设为红色
            },
          },
        },
        series: [
          {
            name: "预约人数",
            type: "line",
            data: [120, 132, 201, 134, 90, 230, 210],
            smooth: true,
            symbol: "none",
            lineStyle: {
              color: "rgba(30,155,251)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0,50,110,1)",
                },
                {
                  offset: 0.7,
                  color: "rgba(0,50,110,0.1)",
                },
              ]),
            },
          },
          {
            name: "实际人数",
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
            symbol: "none",
            lineStyle: {
              color: "rgba(28,231,198)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(7,85,102,1)",
                },
                {
                  offset: 0.7,
                  color: "rgba(7,85,102,0.1)",
                },
              ]),
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.FindHealthIndex();
  },
};
</script>

<style lang="scss" scoped>
.bk {
  padding-left: 13px;
  // margin-top: -17px;
  margin-top: 17px;
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
  height: 40.7vh;
  background: rgba(0, 188, 255, 0.1);
  border: 1px solid #00bcff;
  padding: 15px;
  position: relative;
}
</style>