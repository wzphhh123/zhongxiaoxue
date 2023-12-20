<template>
  <div>
    <div class="bk">
      <div class="topContent">
        <div class="top"></div>
        <div class="photo">
          <div class="imgdiv">
            <img src="../../../assets/images/事故案例展示区.png" alt="" />
            <img src="../../../assets/images/消防安全体验区.png" alt="" />
            <img src="../../../assets/images/交通安全体验区.png" alt="" />
            <img src="../../../assets/images/意外伤害体验区.png" alt="" />
            <img src="../../../assets/images/应急救援体验区.png" alt="" />
            <img src="../../../assets/images/公共安全体验区.png" alt="" />
          </div>
          <div class="contentdi">
            <img src="../../../assets/images/contentP2di.png" alt="" />
          </div>
        </div>
      </div>

      <div class="footerContent">
        <div class="top2"></div>
        <div
          style="
            display: flex;
            border: 1px solid #00bcff;
            background: rgba(0, 188, 255, 0.1);
          "
        >
          <div class="gundong">
            <table
              style="
                width: 95%;
                color: #fff;
                border-collapse: collapse;
                text-align: center;
                margin-top: 12px;
                margin-left: 20px;
              "
              cellspacing="0"
              cellpadding="0"
            >
              <tr style="background-color: #084f8c">
                <th
                  style="
                    padding: 5px 7px;
                    font-size: 15px;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    width: 160px;
                  "
                >
                  软件名称
                </th>
                <th style="padding: 5px 7px; font-size: 15px; width: 110px">
                  使用时长
                </th>
                <th
                  style="
                    border-top-right-radius: 5px;
                    font-size: 15px;
                    border-bottom-right-radius: 5px;
                    padding: 5px 7px;
                    width: 110px;
                  "
                >
                  软件使用率
                </th>
              </tr>
            </table>
            <vue-seamless-scroll
              class="seamless-warp"
              :data="dataList"
              :class-option="defaultOption"
            >
              <ul v-for="(item, index) in dataList" :key="index">
                <li style="width: 145px">{{ item.name }}</li>
                <li style="width: 175px">{{ item.time }}</li>
                <li style="width: 120px; margin-left: -2%">{{ item.lu }}</li>
              </ul>
            </vue-seamless-scroll>
          </div>
          <div class="echart">
            <div
              id="main"
              style="height: 200px; width: 410px; margin-left: -70px"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import * as echarts from "echarts";
export default {
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: this.dataList.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 3000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      dataList: [
        {
          name: "你好",
          time: 5000,
          lu: "64%",
        },
        {
          name: "你好23432434",
          time: 5000,
          lu: "64%",
        },
        {
          name: "你好4434",
          time: 50005454554,
          lu: "64%",
        },
        {
          name: "你好44",
          time: 5000,
          lu: "64%",
        },
      ],
    };
  },
  methods: {
    echarts() {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          itemHeight: 10,
          itemWidth: 10,
          orient: "horizontal", //设置图例排列纵向显示
          align: "left", //设置图例中文字位置在icon标识符的右侧
          left: "75%",
          top: "20%",
          color: "red",
          itemGap: 10, //设置图例之间的间距
          padding: [0, 0, 8, 0], //设置图例与圆环图之间的间距
          formatter: (name) => {
            var data = this.dataList;
            var total = 0;
            var tarValue;
            for (var i = 0; i < data.length; i++) {
              total += data[i].value;
              if (data[i].name === name) {
                tarValue = data[i].value;
              }
            }
            var v = tarValue;
            var b = Math.round((tarValue / total) * 100);
            return (
              "{name| " + name + "} " + "{v| " + v + "}" + "{b| " + b + "%}"
            );
          },
          textStyle: {
            color: "#fff",
            rich: {
              name: {
                align: "left",
                color: "rgba(255, 255, 255, 1)",
              },
              b: {
                align: "left",
                color: "#fff",
              },
              v: {
                align: "left",
                color: "#37F0FC",
              },
            },
          },
        },
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "center",
            style: {
              text: `体验区 软件使用率占比 `,
              textAlign: "center",
              fill: "#fff", //文字的颜色
              fontSize: 16,
              lineHeight: 20,
            },
          },
        ],

        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "111" },
              { value: 735, name: "22" },
              { value: 580, name: "33" },
              { value: 484, name: "444" },
              { value: 300, name: "55" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.echarts();
  },
};
</script>

<style lang="scss" scoped>
.bk {
  padding: 17px 7px 0 7px;
}
.topContent {
  .top {
    background-image: url("../../../assets/images/title长图.png");
    background-size: 100%;
    background-repeat: no-repeat;
    height: 39px;
  }
  .photo {
    .imgdiv {
      position: relative;
      z-index: 999;
      display: flex;
      justify-content: space-around;
      margin-left: 10px;
      margin-top: 33px;
      img {
        width: 111px;
        height: 122px;
      }
    }
    .contentdi {
      img {
        width: 938px;
        height: 90px;
        position: absolute;
        top: 34%;
        z-index: 10;
      }
    }
  }
}
.footerContent {
  margin-top: 65px;
  .top2 {
    background-image: url("../../../assets/images/title长图.png");
    background-size: 100%;
    background-repeat: no-repeat;
    height: 39px;
  }
  .gundong {
    width: 500px;
    height: 197px;

    padding: 0 12px;
    .seamless-warp {
      width: 100%;
      height: 130px;
      overflow: hidden;
      position: relative;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }
    }
    ul {
      display: flex;

      li {
        list-style-type: none;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>