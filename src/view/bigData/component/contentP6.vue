<template>
  <div>
    <div class="bk">
      <div class="top">
        <span>健康综合指数</span>
      </div>
      <div class="content">
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
            "
          >
            <li style="width: 30%; margin-left: -9%; padding: 10px 0">编号</li>
            <li style="width: 30%; margin-left: 2%; padding: 10px 0">姓名</li>
            <li style="width: 40%; margin-left: 3%; padding: 10px 0">
              健康综合指数
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
            <li style="margin-left: -15px; width: 20%">{{ item.id }}11</li>
            <li style="width: 43%">{{ item.name }}</li>
            <li style="width: 34%">{{ item.count }}</li>
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
    };
  },
  methods: {
    async SoftwareFindAll() {
      var data = {
        type: 0,
      };
      const res = await this.$api.SoftwareFindAll(data);
      if (res.success) {
        this.dataList = res.data;
      }
    },
  },
  mounted() {
    this.SoftwareFindAll();
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
  .seamless-warp {
    width: 100%;
    height: 350px;
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
  .bianse {
    background: rgba(8, 79, 140, 0.4);
    border-radius: 4px;
  }
  .nobianse {
    border-radius: 4px;
  }
}
</style>