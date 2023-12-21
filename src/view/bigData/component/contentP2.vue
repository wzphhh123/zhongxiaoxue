<template>
  <div>
    <div class="bk">
      <div class="topContent">
        <div class="top">
          <span>区域管理</span>
        </div>
        <div class="photo">
          <div class="imgdiv">
            <img
              v-if="isShow1 == false"
              src="../../../assets/images/shigu.png"
              alt=""
              @click="isShow1 = !isShow1"
            />
            <img
              v-else
              @click="isShow1 = !isShow1"
              src="../../../assets/images/shigu2.png"
              alt=""
            />

            <img
              v-if="isShow2 == false"
              src="../../../assets/images/xiaofang.png"
              alt=""
              @click="isShow2 = !isShow2"
            />
            <img
              v-else
              @click="isShow2 = !isShow2"
              src="../../../assets/images/xiaofang2.png"
              alt=""
            />

            <img
              v-if="isShow3 == false"
              src="../../../assets/images/jiaotong.png"
              alt=""
              @click="isShow3 = !isShow3"
            />
            <img
              v-else
              @click="isShow3 = !isShow3"
              src="../../../assets/images/jiaotong2.png"
              alt=""
            />

            <img
              v-if="isShow4 == false"
              src="../../../assets/images/yiwai.png"
              alt=""
              @click="isShow4 = !isShow4"
            />
            <img
              v-else
              @click="isShow4 = !isShow4"
              src="../../../assets/images/yiwai2.png"
              alt=""
            />

            <img
              v-if="isShow5 == false"
              src="../../../assets/images/yingji.png"
              alt=""
              @click="isShow5 = !isShow5"
            />
            <img
              v-else
              @click="isShow5 = !isShow5"
              src="../../../assets/images/yingji2.png"
              alt=""
            />
            
            <img
              v-if="isShow6 == false"
              src="../../../assets/images/gonggong.png"
              alt=""
              @click="isShow6 = !isShow6"
            />
            <img
              v-else
              @click="isShow6 = !isShow6"
              src="../../../assets/images/gonggong2.png"
              alt=""
            />
          </div>
          <div class="contentdi">
            <img src="../../../assets/images/contentP2di.png" alt="" />
          </div>
        </div>
      </div>

      <div class="footerContent">
        <div class="top2">
          <span>交通安全体验区</span>
        </div>
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
                    width: 148px;
                  "
                >
                  软件名称
                </th>
                <th style="padding: 5px 7px; font-size: 15px; width: 100px">
                  使用时长
                </th>
                <th
                  style="
                    border-top-right-radius: 5px;
                    font-size: 15px;
                    border-bottom-right-radius: 5px;
                    padding: 7px 7px;
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
              <ul
                v-for="(item, index) in dataList"
                :key="index"
                :class="index % 2 != 0 ? 'bianse' : 'nobianse'"
              >
                <li style="width: 25%">{{ item.name }}</li>
                <li style="width: 50%">{{ item.time }}</li>
                <li style="width: 16%">{{ item.lu }}</li>
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
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      isShow6: false,
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
      echartList: [
        { value: 1048, name: "111" },
        { value: 735, name: "22" },
        { value: 580, name: "33" },
        { value: 484, name: "444" },
        { value: 300, name: "55" },
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
            var data = this.echartList;
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
        // A code block
        title: {
          show: true,
          text: `体验区`, //要显示的文本
          left: "center",
          top: "40%",
          textStyle: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14",
          },
        },

        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "54%",
            style: {
              text: "软件使用率占比",
              textAlign: "center",
              fill: "#fff", //文字的颜色
              fontSize: 12,
              // lineHeight: 20,
              // font: '14px Microsoft YaHei'
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
            data: this.echartList,
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
.bianse {
  background: rgba(8, 79, 140, 0.4);
  border-radius: 4px;
}
.nobianse {
  border-radius: 4px;
}
.topContent {
  .top {
    background-image: url("../../../assets/images/title长图.png");
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
  .photo {
    .imgdiv {
      position: relative;
      z-index: 999;
      display: flex;
      justify-content: space-around;
      // margin-left: 12px;
      margin-top: 33px;
      padding: 0 8px 0 11px;
      img {
        width: 111px;
        height: 122px;
      }
    }
    .contentdi {
      img {
        width: 99%;
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
    line-height: 39px;
    padding-left: 42px;
    letter-spacing: 1px;
    span {
      color: #fff;
      font-size: 16px;
    }
  }
  .gundong {
    width: 53%;
    height: 197px;

    padding: 0 12px;
    .seamless-warp {
      width: 95%;
      height: 130px;
      overflow: hidden;
      position: relative;
      overflow-y: auto;
      margin-left: 20px;
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
        padding: 6px 0;
      }
    }
  }
}
</style>