
<template>
  <div>
    <div class="bk">
      <div class="top">
        <span>区域排行榜{{ showNowQuyuId }}</span>
      </div>
      <div class="content">
        <a-row>
          <a-col :span="8">
            <div class="kuang">
              <div class="kuangTitle">
                <span>软件区域名称</span>
              </div>
              <!--  @mouseenter="isStop" @mousemove="isStop" -->
              <div style="margin-top: 55px">
                <vue-seamless-scroll
                  class="seamless-warpLeft"
                  :data="showTitle"
                  :class-option="defaultOptionLeft"
                >
                  <div
                    class="leftTitle"
                    :class="isnoJZ ? 'isnoJZ' : ''"
                    v-for="(item, index) in newArr2"
                    :key="index"
                  >
                    <div
                      :class="
                        index == leftIndex + 1 ? 'leftBian' : 'leftNobian'
                      "
                      @click="testChange(item.name, index)"
                    >
                      <div class="shangXian"></div>
                      <span>{{ item.name }}</span>
                      <div class="xiaXian"></div>
                    </div>
                  </div>
                </vue-seamless-scroll>
              </div>
            </div>
          </a-col>
          <a-col :span="16">
            <div class="gundong">
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
                  <li style="width: 15%; padding: 10px 0; margin-left: -7%">
                    排名
                  </li>
                  <li style="width: 15%; margin-left: 4%; padding: 10px 0">
                    头像
                  </li>
                  <li style="width: 15%; margin-left: 3%; padding: 10px 0">
                    名字
                  </li>
                  <li style="width: 15%; margin-left: 3%; padding: 10px 0">
                    得分
                  </li>
                  <li style="width: 40%; margin-left: 3%; padding: 10px 0">
                    时间
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
                  <li style="width: 15%; margin-left: -6%">
                    <div
                      style="border-radius: 50%; background-color: #364e6f"
                      :class="
                        index == 0
                          ? 'isjin'
                          : index == 1
                          ? 'isyin'
                          : index == 2
                          ? 'istong'
                          : 'isno'
                      "
                    >
                      {{ index + 1 }}
                    </div>
                  </li>
                  <li style="width: 15%; margin-left: 1.5%; position: relative">
                    <!-- 用户头像 -->
                    <img
                      style="
                        width: 27px;
                        height: 27px;
                        border-radius: 50%;
                        z-index: 999;
                      "
                      :src="item.url"
                      alt=""
                    />
                    <!-- 边框 -->
                    <div class="poaImg1" v-if="index == 0"></div>
                    <div class="poaImg2" v-if="index == 1"></div>
                    <div class="poaImg3" v-if="index == 2"></div>
                  </li>
                  <li style="width: 15%; margin-left: 2.5%; padding-top: 9px">
                    {{ item.userName }}
                  </li>
                  <li style="width: 15%; margin-left: 1.5%; padding-top: 9px">
                    {{ item.score }}
                  </li>
                  <li style="width: 40%; padding-top: 9px">
                    {{ item.createTime }}
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  computed: {
    defaultOptionLeft() {
      return {
        step: 0.15, // 数值越大速度滚动越快
        limitMoveNum: this.showTitle.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 67, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 8000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: this.dataList.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 100, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  components: {
    vueSeamlessScroll,
  },
  props: ["showNowQuyuId"],
  data() {
    return {
      isShow1: true,
      isShow2: false,
      isShow3: false,
      showTitle: [],
      timer: null, // 定時器
      timer2: null,
      timer3: null,
      showNowQuyuIdP5: "",
      dataList: [],
      newId: "",
      leftIndex: 0,
      newArr2: [],
      isnoJZ: false, //点击是否居中
      chaIndex: 0,
    };
  },
  watch: {
    // showNowQuyuId(newVal, oldVal) {
    //   this.showTitle = [];
    //   this.newId = newVal;
    //   this.FindRankingSoftware(newVal);
    //   window.clearInterval(this.timer);
    // },
    showNowQuyuId: {
      handler(newVal, oldVal) {
        this.showTitle = [];
        this.dataList = [];
        this.newArr2 = [];
        this.leftIndex = 0;
        this.newId = newVal;
        this.FindRankingSoftware(newVal);
        window.clearInterval(this.timer);
        this.timer = null;
      },
      immediate: true,
    },
    leftIndex: {
      handler(newVal, oldVal) {
        window.clearInterval(this.timer3);
        this.timer3 = null;
      },
      immediate: true,
    },
  },
  methods: {
    // isEnter() {
    //   window.clearInterval(this.timer);
    // },
    // isLeave() {
    //   this.timer = setInterval(() => {
    //     if (this.leftIndex >= 1) {
    //       window.setTimeout(() => {
    //         this.leftIndex++;
    //         this.newArr2.forEach((item, index) => {
    //           var leftIndex = this.leftIndex + 1;
    //           if (this.leftIndex > 1 && leftIndex == index) {
    //             // this.rightData(item.name);
    //             this.FindRankingRight(item.name);
    //           }
    //         });
    //       }, 8000);
    //     } else {
    //       this.leftIndex++;
    //       if (this.newArr2[2].name) {
    //         var data = this.newArr2[2].name;
    //         this.FindRankingRight(data);
    //       }
    //     }
    //   }, 7710);
    // },
    // 获取区域软件名称
    async FindRankingSoftware(e) {
      var that = this;
      var data = {
        id: e,
      };
      const res = await this.$api.FindRankingSoftware(data);
      if (res.success) {
        if (res.data) {
          this.showTitle = res.data;
          var newArr = [];
          for (var i = 0; i < 20; i++) {
            newArr.push(this.showTitle);
          }
          // 整体循环的数组
          newArr.forEach((item) => {
            item.forEach((item2) => {
              this.newArr2.push(item2);
            });
          });
          // this.timer = setInterval(() => {
          //   console.log("启动");
          //   if (this.leftIndex >= 1) {
          //     this.timer3 = window.setTimeout(() => {
          //       this.leftIndex++;
          //       console.log("00", this.leftIndex);
          //       this.newArr2.forEach((item, index) => {
          //         var leftIndex = this.leftIndex + 1;
          //         if (this.leftIndex > 1 && leftIndex == index) {
          //           this.FindRankingRight(item.name);
          //         }
          //       });
          //     }, 8000);
          //   } else {
          //     this.leftIndex++;
          //     if (this.newArr2[2].name) {
          //       var data = this.newArr2[2].name;
          //       this.FindRankingRight(data);
          //     }
          //     console.log("11", this.leftIndex);
          //   }
          //   console.log();
          // }, 7710);

          this.timer = setInterval(() => {
            if (this.newArr2.length>0) {
              if (this.leftIndex >= 1) {
                console.log("1", this.newArr2);
                this.timer3 = window.setTimeout(() => {
                  this.leftIndex++;
                  this.newArr2.forEach((item, index) => {
                    if (this.leftIndex + 1 == index) {
                      console.log("name", item.name, index);
                      this.FindRankingRight(item.name);
                    }
                  });
                }, 8000);
              } else {
                console.log("2", this.newArr2);
                this.leftIndex++;
                var data = this.newArr2[2].name;
                this.FindRankingRight(data);
              }
            }
          }, 7710);
        }
        // if(res.data == null){
        //   console.log("等同于");
        // }else{
        //   console.log("no");
        // }
      }
    },
    // async findAllShow(e) {
    //   var data = {
    //     type: e,
    //   };
    //   const res = await this.$api.findAllShow(data);
    //   if (res.success) {
    //     res.data.map((item) => {
    //       item.value.map((item2) => {
    //         item2 = Number(item2);
    //       });
    //       this.showNowQuyuIdP5 = 1;
    //       item.symbol = this.symbol;
    //     });
    //     this.scatterData = res.data;
    //   }
    // },
    // 右侧排行榜、
    async FindRankingRight(e) {
      console.log("传过去e的值", e);
      var data = {
        name: e,
      };
      const res = await this.$api.FindRankingRight(data);
      if (res.success) {
        this.dataList = res.data;
      }
    },
    change(e) {
      if (e == 1) {
        if (this.isShow1 == false) {
          this.isShow1 = !this.isShow1;
          this.isShow2 = false;
          this.isShow3 = false;
        }
        this.findAllShow(1);
      } else if (e == 2) {
        if (this.isShow2 == false) {
          this.isShow2 = !this.isShow2;
          this.isShow1 = false;
          this.isShow3 = false;
        }
        this.findAllShow(2);
      } else {
        if (this.isShow3 == false) {
          this.isShow3 = !this.isShow3;
          this.isShow1 = false;
          this.isShow2 = false;
        }
        this.findAllShow(3);
      }
    },
    testChange(e, u) {
      // this.isnoJZ = true
      this.chaIndex = u - this.leftIndex;
      console.log("e", u, this.leftIndex, "差值:", this.chaIndex);
      window.clearInterval(this.timer);
      this.FindRankingRight(e);
      // this.findAllShow(e);
      // this.lunbo(e);
      // this.showNowQuyuIdP5 = e;
    },
    // lunbo(e) {
    //   console.log("e", e);
    //   var index = 2;
    //   if (e && e < 3) {
    //     index = e + 1;
    //   } else if (e && e == 3) {
    //     index = 1;
    //   }
    //   this.timer = window.setInterval(() => {
    //     console.log("index2", index);
    //     this.findAllShow(index);
    //     index++;
    //     this.showNowQuyuIdP5++;
    //     if (index > 3) {
    //       index = 1;
    //     }
    //   }, 10000);
    // },
    test(){
      var aaa= []
      if(aaa.length > 0){
        console.log("是");
      }else{
        console.log("不是");
      }
    }
  },
  // 销毁前
  beforeDestroy() {
    window.clearInterval(this.timer);
    window.clearInterval(this.timer2);
    this.timer = null;
    this.timer2 = null;
  },
  created() {
    // this.findAllShow(1);
    // this.lunbo();
    this.test()
  },
};
</script>
 
<style scoped lang="scss">
.bk {
  // padding: 5px 7px;
  margin-top: 67px;
}
.top {
  background-image: url("../../../assets/images/title长图.png");
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
  height: 35vh;
  background: rgba(0, 188, 255, 0.1);
  border: 1px solid #00bcff;
  // display: flex;

  .kuang {
    margin-top: 7%;
    margin-left: 10%;
    background-image: url("../../../assets/images/kuang.png");
    background-size: 90% 100%;
    height: 32vh;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    .kuangTitle {
      position: absolute;
      left: 11%;
      top: 2%;
      background-image: url("../../../assets/images/tu645.png");
      background-size: 100%;
      background-repeat: no-repeat;
      width: 190px;
      height: 50px;
      text-align: center;
      padding-top: 3px;
      span {
        color: #fff;
        font-size: 19px;
      }
    }
    .seamless-warpLeft {
      width: 100%;
      // height: 85%;
      height: 23vh;
      overflow: hidden;
      position: relative;
      overflow-y: auto;
      margin-top: -3%;
      // 是否显示滚动条
      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }
      .leftTitle {
        margin-left: 10%;
        margin-top: 9%;
        width: 200px;
        .leftBian {
          // margin-bottom: 15px;
          width: 200px;
          line-height: 37px;
          text-align: center;
          overflow: hidden;
          cursor: pointer;
          .shangXian {
            width: 200px;
            height: 2px;
            background-color: #00bcff;
            box-shadow: 0 2px 36px 4px #00bcff;
          }
          .xiaXian {
            width: 200px;
            height: 2px;
            background-color: #00bcff;
            box-shadow: 0 -2px 36px 4px #00bcff;
          }
          span {
            width: 160px;
            height: 16px;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #00ffff;
          }
        }
        .leftNobian {
          // border-top: 2px solid #00bcff;
          // border-bottom: 2px solid #00bcff;
          // margin-bottom: 15px;
          width: 200px;
          line-height: 37px;
          text-align: center;
          // box-shadow: 0 2px 18px 1px #00bcff inset;
          cursor: pointer;
          .shangXian {
            width: 200px;
            height: 2px;
            background-color: #00bcff;
            box-shadow: 0 6px 14px 0px #00bcff;
          }
          .xiaXian {
            width: 200px;
            height: 2px;
            background-color: #00bcff;
            box-shadow: 0 -6px 14px 0px #00bcff;
          }
          span {
            width: 160px;
            height: 16px;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #fff;
          }
        }
      }
    }
  }
}
.gundong {
  padding: 0 12px;
  margin-top: 36px;
  width: 95%;
  height: 280px;
  .seamless-warp {
    width: 100%;
    // height: 85%;
    height: 24vh;
    overflow: hidden;
    position: relative;
    overflow-y: auto;
    margin-top: -3%;
    // 是否显示滚动条
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
    ul {
      display: flex;
      margin-bottom: 5px;
      li {
        list-style-type: none;
        color: #fff;
        padding: 7px;
        text-align: center;
      }
    }
    .bianse {
      background: rgba(8, 79, 140, 0.4);
      border-radius: 4px;
    }
    .nobianse {
      border-radius: 4px;
    }
    .isjin {
      background-image: url("../../../assets/images/jin.png");
      background-size: 100%;
      background-repeat: no-repeat;
      margin-left: 19%;
      height: 24px;
      width: 24px;
    }
    .isyin {
      background-image: url("../../../assets/images/yin.png");
      background-size: 100%;
      background-repeat: no-repeat;
      margin-left: 19%;
      height: 24px;
      width: 24px;
    }
    .istong {
      background-image: url("../../../assets/images/tong.png");
      background-size: 100%;
      background-repeat: no-repeat;
      margin-left: 19%;
      height: 24px;
      width: 24px;
    }
    .isno {
      height: 23px;
      width: 23px;
      margin-left: 22%;
    }
    .poaImg1 {
      position: absolute;
      background-image: url("../../../assets/images/jink.png");
      background-size: 100%;
      background-repeat: no-repeat;
      border-radius: 50%;
      height: 38px;
      width: 38px;
      left: 22%;
      top: 4%;
      z-index: -1;
    }
    .poaImg2 {
      position: absolute;
      background-image: url("../../../assets/images/yinK.png");
      background-size: 103%;
      background-repeat: no-repeat;
      border-radius: 50%;
      height: 38px;
      width: 38px;
      left: 21%;
      top: -3.5%;
      z-index: -1;
    }
    .poaImg3 {
      position: absolute;
      background-image: url("../../../assets/images/tongK.png");
      background-size: 102%;
      background-repeat: no-repeat;
      border-radius: 50%;
      height: 38px;
      width: 38px;
      left: 21%;
      top: -1%;
      z-index: -1;
    }
  }
  // .list-style {
  //   width: 100%;
  //   height: 85%;
  //   overflow: hidden;
  //   position: relative;
  //   overflow-y: auto;
  //   margin-top: -3%;
  //   // 是否显示滚动条
  //   &::-webkit-scrollbar {
  //     width: 0px;
  //     height: 0px;
  //   }
  //   p {
  //     list-style-type: none;
  //     color: #fff;
  //     padding: 7px;
  //     text-align: center;
  //     // margin-top: -10px;
  //   }
  // }
}
.isnoJZ {
  // height: 200px;
  overflow: hidden;
  animation: scroll 10s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateY(0);
    background-color: red;
  }
  100% {
    transform: translateY(-100%);
    background-color: rgb(0, 255, 200);
  }
}
</style>