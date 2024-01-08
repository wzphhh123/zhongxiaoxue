<template>
  <div style="padding-left: 13px">
    <div class="top">
      <span>健康体验管理</span>
    </div>
    <div class="content">
      <div class="imgDiv">
        <div class="img1">
          <img src="../../../assets/images/xiao2.png" alt="" />
          <div style="position: absolute; top: 70%; left: 14%">
            <p>
              <span>{{ this.dataList.sumCount }}</span>
              <span>人</span>
            </p>
            <span class="imgFootTitle">总健康体验人数</span>
          </div>
        </div>
        <div class="img2">
          <img
            style="margin-top: 2px"
            src="../../../assets/images/xiao1.png"
            alt=""
          />
          <div style="position: absolute; top: 70%; left: 16%">
            <p>
              <span>{{ this.dataList.healthCount }}</span>
              <span>人</span>
            </p>
            <span class="imgFootTitle">总健康人数</span>
          </div>
        </div>
        <div class="img3">
          <img
            style="margin-top: -8px"
            src="../../../assets/images/xiao3.png"
            alt=""
          />
          <div style="position: absolute; top: 70%; left: 12%">
            <p>
              <span>{{ this.dataList.notHealthCount }}</span>
              <span>人</span>
            </p>
            <span class="imgFootTitle">总健康异常人数</span>
          </div>
        </div>
      </div>
      <div class="footer">
        <div
          ref="chartPanel"
          id="chart-panel"
          style="width: 100%; height: 220px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import { getPie3D } from "../../../assets/js/getPie3D";

export default {
  components: {},
  data() {
    return {
      optionData: [
        {
          name: "总健康体验人数",
          value: "",
          itemStyle: {
            opacity: 0.2,
            color: "#18B2FE",
          },
        },
        {
          name: "总健康人数",
          value: "",
          itemStyle: {
            opacity: 0.2,
            color: "#80D9FE",
          },
        },
        {
          name: "总健康异常人数",
          value: "",
          itemStyle: {
            opacity: 0.2,
            color: "#00D7E9",
          },
        },
      ],
      dataList: {},
    };
  },
  methods: {
    draw3d() {
      // 基于准备好的dom，初始化echarts实例
      let chartPanel = echarts.init(document.getElementById("chart-panel"));
      for (let i = 0; i < this.optionData.length; i++) {
        delete this.optionData[i].itemStyle.opacity;
      }
      // 传入数据生成 option
      let series = getPie3D(this.optionData, 0);
      let option = {
        // tooltip: {
        //   formatter: (params) => {
        //     // console.log(params)
        //     if (
        //       params.seriesName !== "mouseoutSeries" &&
        //       params.seriesName !== "pie2d"
        //     ) {
        //       return `<div style="padding:0 10px">${params.seriesName}：${(
        //         option.series[params.seriesIndex].pieData.proportion * 100
        //       ).toFixed(2)}%</div>`;
        //     }
        //   },
        // },
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false, //是否显示三维笛卡尔坐标系。
          boxHeight: 20, //三维笛卡尔坐标系在三维场景中的高度
          top: "-12.5%",
          // bottom: "80%",
          // environment: "#021041", //背景
          viewControl: {
            //用于鼠标的旋转，缩放等视角控制
            alpha: 25, //角度
            distance: 250, //调整视角到主体的距离，类似调整zoom 重要
            rotateSensitivity: 0, //设置为0无法旋转
            zoomSensitivity: 0, //设置为0无法缩放
            panSensitivity: 0, //设置为0无法平移
            autoRotate: false, //自动旋转
          },
        },
        series: series,
      };
      chartPanel.setOption(option);

      //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      option.series.push({
        name: "pie2d",
        type: "pie",
        label: {
          color: "#fff",
          fontSize: 14,
          opacity: 1,
          //  position: 'inner',
          // formatter: "{b}\n\n",
          // padding: [0, -40],
          formatter: (item) => {
            //  console.log(item)
            return item.data.name + ":" + item.data.value + "人" ;
          },
        },
        labelLine: {
          length: 12,
          length2: 10,
          lineStyle: {
            color: "#ffffff",
            width: 1.5,
          },
        },
        startAngle: 321, //起始角度，支持范围[0, 360]。 //重要
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ["25%", "50%"],
        center: ["50%", "50%"],
        data: this.optionData,
        itemStyle: {
          opacity: 0,
        },
        top: "-20%",
        avoidLabelOverlap: true, //防止标签重叠
      });
      chartPanel.setOption(option);
    },
    // 健康体验管理
    async showHealthy() {
      const res = await this.$api.showHealthy();
      if (res.success) {
        this.dataList = res.data;
        // 对象转化为数组
        let a = Object.values(this.dataList);
        var one = "";
        var two = "";
        var three = "";
        a.map((item) => {
          console.log(item);
          one = a[0];
          two = a[1];
          three = a[2];
        });
        this.optionData[0].value = one;
        this.optionData[1].value = three;
        this.optionData[2].value = two;
        this.draw3d();
      }
    },
  },
  mounted() {
    this.showHealthy();
    this.$nextTick(() => {
      let parent = document.getElementById("chart-panel"); // 获取父元素
      let canvas = parent.getElementsByTagName("canvas"); // 获取父元素下面的所有canvas元素
      console.log(canvas);
      // canvas[1].style.transform = "rotateX(30deg)";
    });
  },
};
</script>

<style lang="scss" scoped>
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
  height: 450px;
  background: rgba(0, 188, 255, 0.1);
  border: 1px solid #00bcff;
  .imgDiv {
    display: flex;
    margin-top: 14px;
    justify-content: space-around;
    img {
      width: 124px;
      height: 133px;
    }
    .img1 {
      position: relative;
      p {
        display: flex;
        color: #7cf8fd;
        font-size: 29px;
        height: 10px;
        // margin-left: 16px;
        justify-content: center;
        span:nth-child(2) {
          font-size: 16px;
          margin-top: 12px;
          margin-left: 5px;
        }
      }
      .imgFootTitle {
        font-size: 14px;
        color: #bac3c4;
      }
    }
    .img2 {
      position: relative;
      p {
        display: flex;
        color: #7cf8fd;
        font-size: 29px;
        height: 10px;
        justify-content: center;
        span:nth-child(2) {
          font-size: 16px;
          margin-top: 12px;
          margin-left: 5px;
        }
      }
      .imgFootTitle {
        font-size: 14px;
        color: #bac3c4;
        margin-left: 12px;
      }
    }
    .img3 {
      position: relative;
      p {
        display: flex;
        color: #7cf8fd;
        font-size: 29px;
        height: 10px;
        justify-content: center;
        span:nth-child(2) {
          font-size: 16px;
          margin-top: 12px;
          margin-left: 5px;
        }
      }
      .imgFootTitle {
        font-size: 14px;
        color: #bac3c4;
      }
    }
  }
}
.footer {
  width: 450px;
  height: 270px;
  overflow: hidden;
  float: right;
  margin: 60px 0 0 60px;
}
</style>