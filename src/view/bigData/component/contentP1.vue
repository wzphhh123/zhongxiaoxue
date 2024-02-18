<template>
  <div>
    <div class="top">
      <span>人员进入统计</span>
    </div>
    <div class="content">
      <div style="display: flex">
        <div class="tu1"></div>
        <div class="tu1Show">
          <div style="color: #30fdff; font-size: 22px; text-align: center">
            {{ this.sumCount }}
          </div>
          <div style="color: #fff">总体检人数</div>
        </div>
        <div class="tu2"></div>
        <div class="tu1Show">
          <div style="color: #30fdff; font-size: 22px; text-align: center">
            {{ this.sumTime }}
          </div>
          <div style="color: #fff">总参观时长</div>
        </div>
      </div>
      <!-- <div class="gundong">
        <div>
          <ul
            style="
              color: #fff;
              width: 100%;
              display: flex;
              list-style-type: none;
              background-color: #084f8c;
              border-radius: 5px;
              text-align: center;
              font-size: 15px;
              font-weight: 550;
            "
          >
            <li style="width: 25%; margin-left: 2%; padding: 10px 0">
              体验区域
            </li>
            <li style="width: 25%; margin-left: 3%; padding: 10px 0">
              体验人数
            </li>
            <li style="width: 25%; margin-left: 3%; padding: 10px 0">
              参观时长
            </li>
          </ul>
        </div>
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
            
            <li style="width: 36%;margin-left: -15px;">{{ item.name }}</li>
            <li style="width: 20%">{{ item.count }}</li>
            <li style="width: 20%; margin-left: 10%">
              {{ item.visitingTime }}
            </li>
          </ul>
        </vue-seamless-scroll>
      </div> -->
      <div class="contentMain">
        <div
          id="main1"
          style="width: 400px; height: 300px; margin-left: -10%"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  // computed: {
  //   defaultOption() {
  //     return {
  //       step: 0.2, // 数值越大速度滚动越快
  //       limitMoveNum: this.dataList.length, // 开始无缝滚动的数据量 this.dataList.length
  //       hoverStop: true, // 是否开启鼠标悬停stop
  //       direction: 1, // 0向下 1向上 2向左 3向右
  //       openWatch: true, // 开启数据实时监控刷新dom
  //       singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
  //       singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
  //       waitTime: 100, // 单步运动停止的时间(默认值1000ms)
  //     };
  //   },
  // },
  // components: {
  //   vueSeamlessScroll,
  // },
  data() {
    return {
      dataList: [
      ],
      sumCount: "",
      sumTime: "",
    };
  },
  methods: {
    async showfindAllUser() {
      const res = await this.$api.showfindAllUser({ id: 2 });
      if (res.success) {
        this.dataList = res.data.map;
        this.dataList.forEach((item) => {
          item.value = item.count
        })
        console.log("11", this.dataList);
        this.sumCount = res.data.sumCount;
        // 先转化成Nuber类型在取整
        res.data.sumTime = Number(res.data.sumTime);
        res.data.sumTime = res.data.sumTime.toFixed(0);
        this.sumTime = res.data.sumTime;
        this.charts();
      }
    },
    charts() {
      var myChart = echarts.init(document.getElementById("main1"));
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
            center: ["50%", "45%"],
            roseType: "area",
            // 弧度
            // itemStyle: {
            //   borderRadius: 8,
            // },
            data: this.dataList,
            labelLine: {
              //设置延长线的长度
              normal: {
                length: 0, //设置延长线的长度
                length2: 20, //设置第二段延长线的长度
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
  },
  mounted() {
    this.showfindAllUser();
  },
};
</script>

<style lang="scss" scoped>
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
.bianse {
  background: rgba(8, 79, 140, 0.4);
  border-radius: 4px;
}
.nobianse {
  border-radius: 4px;
}
.content {
  width: 97%;
  // height: 448px;
  height: 41vh;
  background: rgba(0, 188, 255, 0.1);
  border: 1px solid #00bcff;
  margin-bottom: 36px;
  .tu1 {
    background-image: url("../../../assets/images/tu1.png");
    background-size: 100%;
    width: 60px;
    background-repeat: no-repeat;
    height: 60px;
    margin-left: 12%;
    margin-top: 45px;
  }
  .tu1Show {
    margin-left: 3%;
    margin-top: 10%;
  }
  .tu2 {
    background-image: url("../../../assets/images/总参观时长.png");
    background-size: 100%;
    width: 60px;
    background-repeat: no-repeat;
    height: 60px;
    margin-left: 12%;
    margin-top: 45px;
  }
  // .gundong {
  //   padding: 0 12px;
  //   margin-top: 36px;
  //   width: 100%;
  //   height: 280px;
  //   .seamless-warp {
  //     width: 100%;
  //     // height: 85%;
  //     height: 22vh;
  //     overflow: hidden;
  //     position: relative;
  //     overflow-y: auto;
  //     margin-top: -3%;
  //     // 是否显示滚动条
  //     &::-webkit-scrollbar {
  //       width: 0px;
  //       height: 0px;
  //     }
  //     ul {
  //       display: flex;
  //       margin-bottom: 5px;
  //       li {
  //         list-style-type: none;
  //         color: #fff;
  //         padding: 7px;
  //         text-align: center;
  //       }
  //     }
  //   }
  //   .list-style {
  //     width: 100%;
  //     height: 85%;
  //     overflow: hidden;
  //     position: relative;
  //     overflow-y: auto;
  //     margin-top: -3%;
  //     // 是否显示滚动条
  //     &::-webkit-scrollbar {
  //       width: 0px;
  //       height: 0px;
  //     }
  //     p {
  //       list-style-type: none;
  //       color: #fff;
  //       padding: 7px;
  //       text-align: center;
  //       // margin-top: -10px;
  //     }
  //   }
  // }
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