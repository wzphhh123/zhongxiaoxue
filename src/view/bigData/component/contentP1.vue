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
      <div class="gundong">
        <!-- <table
          style="
            width: 100%;
            color: #fff;
            border-collapse: collapse;
            text-align: center;
          "
          cellspacing="0"
          cellpadding="0"
        >
          <tr style="background-color: #084f8c">
            <th
              style="
                padding: 10px 13px;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
              "
            >
              进入时间
            </th>
            <th style="padding: 10px 13px">体验区域</th>
            <th style="padding: 10px 13px">体验人数</th>
            <th
              style="
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                padding: 10px 13px;
              "
            >
              参观时长
            </th>
          </tr>
        </table> -->
        <div class="aa">
          <ul
            style="
              color: #fff;
              width: 100%;
              display: flex;
              list-style-type: none;
              background-color: #084f8c;
              border-radius: 5px;
              text-align: center;
            "
          >
            <li style="width: 25%; margin-left: -9%; padding: 10px 0">
              进入时间
            </li>
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
            <li style="margin-left: -15px; width: 14%">{{ item.startTime }}</li>
            <li style="width: 41%">{{ item.name }}</li>
            <li style="width: 14%">{{ item.count }}</li>
            <li style="width: 20%; margin-left: 10%">
              {{ item.visitingTime }}
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
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
      dataList: [],
      sumCount: "",
      sumTime: "",
    };
  },
  methods: {
    async showfindAllUser() {
      const res = await this.$api.showfindAllUser();
      if (res.success) {
        this.dataList = res.data.map;
        this.sumCount = res.data.sumCount;
        // 先转化成Nuber类型在取整
        res.data.sumTime = Number(res.data.sumTime);
        res.data.sumTime = res.data.sumTime.toFixed(0);
        this.sumTime = res.data.sumTime;
      }
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
  height: 39px;
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
  height: 448px;
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
  .gundong {
    padding: 0 12px;
    margin-top: 36px;
    .seamless-warp {
      width: 100%;
      height: 200px;
      overflow: hidden;
      position: relative;
      overflow-y: auto;
      margin-top: -3%;
      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }
      ul {
        display: flex;
        li {
          list-style-type: none;
          color: #fff;
          padding: 7px;
          text-align: center;
          // margin-top: -10px;
        }
      }
    }
  }
}
</style>