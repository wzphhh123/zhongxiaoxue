<template>
  <div>
    <div class="bk">
      <div class="topContent">
        <div class="top">
          <span>区域管理</span>
        </div>
        <div class="photo">
          <div class="imgdiv">
            <div
              class="dingWei"
              v-for="(item, index) in quyuData"
              :key="index"
              @click="change(index)"
            >
              <div class="topTitle">
                <span
                  :class="
                    item.id == showNowQuyuId ? 'numberBian' : 'nonumberBian'
                  "
                  >{{ item.count }}</span
                >
                <div class="title">软件数量</div>
              </div>
              <img
                :src="item.clickUrl"
                alt=""
                v-if="item.id == showNowQuyuId"
              />
              <img :src="item.normalUrl" alt="" v-else />
              <div class="footerTitle">
                <span
                  :class="item.id == showNowQuyuId ? 'isTitle' : 'noTitle'"
                  >{{ item.name }}</span
                >
              </div>
            </div>
          </div>
          <div class="contentdi">
            <img src="../../../assets/images/contentP2di.png" alt="" />
          </div>
        </div>
      </div>

      <div class="footerContent">
        <div class="top2">
          <span>{{ this.top2Name }}</span>
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
                <li style="width: 50%">{{ item.softwareTime }}</li>
                <li style="width: 16%">{{ item.usageRate }}</li>
              </ul>
            </vue-seamless-scroll>
          </div>
          <div class="echart">
            <div
              id="main2"
              style="height: 200px; width: 550px; margin-left: -140px"
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
      showNowQuyuId: "",
      quyuIdList: [],
      quyuData: [], //区域管理
      top2Name: "",
      dataList: [], //展示
    };
  },
  methods: {
    echarts() {
      var myChart = echarts.init(document.getElementById("main2"));
      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          itemHeight: 10,
          itemWidth: 10,
          orient: "horizontal", //设置图例排列纵向显示
          align: "left", //设置图例中文字位置在icon标识符的右侧
          left: "68%",
          top: "20%",
          color: "red",
          itemGap: 10, //设置图例之间的间距
          padding: [0, 0, 8, 0], //设置图例与圆环图之间的间距
          formatter: (name) => {
            var data = this.dataList;
            var total = 0;
            var tarValue;
            for (var i = 0; i < data.length; i++) {
              data[i].softwareTime = Number(data[i].softwareTime);
              total += data[i].softwareTime;
              if (data[i].name === name) {
                tarValue = data[i].softwareTime;
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
                width: "20px",
              },
              v: {
                align: "left",
                color: "#fff",
              },
              b: {
                align: "left",
                color: "#37F0FC",
              },
            },
          },
        },
        // A code block
        title: {
          show: true,
          text: this.top2Name, //要显示的文本
          left: "center",
          top: "42%",
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
            top: "55%",
            style: {
              text: "软件使用率占比",
              textAlign: "center",
              fill: "#fff", //文字的颜色
              fontSize: 11,
              fontWeight: "bold",
              // lineHeight: 20,
              // font: '14px Microsoft YaHei'
            },
          },
        ],

        series: [
          {
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            // 滑动中间解释文字
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: 40,
            //     fontWeight: "bold",
            //   },
            // },
            labelLine: {
              show: false,
            },
            data: this.dataList,
          },
        ],
      };
      myChart.setOption(option);
    },
    // 区域管理
    async AreaFindAll() {
      const res = await this.$api.AreaFindAll({ id: 2 });
      if (res.success) {
        this.quyuData = res.data;
        this.showNowQuyuId = res.data[0].id;
        res.data.map((item, index) => {
          this.quyuIdList.push(item.id);
        });
        this.findAllSoftware(this.showNowQuyuId);
      }
    },
    // 区域管理展示
    async findAllSoftware(e) {
      const res = await this.$api.findAllSoftware({ id: e });
      if (res.success) {
        res.data.map.map((item) => {
          item.value = Number(item.softwareTime);
        });
        this.dataList = res.data.map;
        this.top2Name = res.data.name;
        this.echarts();
      }
    },
    lunbo(e) {
      let index = 1;
      setInterval(() => {
        this.showNowQuyuId = this.quyuIdList[index];
        index++;
        this.findAllSoftware(this.showNowQuyuId);
        if (index >= this.quyuIdList.length) {
          index = 0;
        }
      }, 1000);
    },
    change(e) {
      this.showNowQuyuId = this.quyuIdList[e];
      this.findAllSoftware(this.showNowQuyuId);
      // this.lunbo(e);
    },
  },
  mounted() {
    this.AreaFindAll();

    // this.lunbo();
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
      z-index: 99;
      display: flex;
      justify-content: space-around;
      // margin-left: 12px;
      margin-top: 33px;
      padding: 0 8px 0 11px;
      cursor: pointer;
      img {
        width: 111px;
        height: 122px;
      }

      .dingWei {
        position: relative;
        .topTitle {
          position: absolute;
          text-align: center;
          top: -10%;
          left: 19%;
          .numberBian {
            font-size: 22px;
            color: #ffda30;
            font-weight: 500;
          }
          .nonumberBian {
            font-size: 22px;
            color: #30fdff;
            font-weight: 500;
          }
          .title {
            color: #fff;
            font-size: 17px;
          }
        }
        .footerTitle {
          position: absolute;
          font-size: 15px;
          font-weight: 500;
          top: 104%;
          left: 3%;
          text-align: center;
          // letter-spacing:0.5px;
          .isTitle {
            color: #ffda30;
          }
          .noTitle {
            color: #30fdff;
          }
        }
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
      height: 65%;
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