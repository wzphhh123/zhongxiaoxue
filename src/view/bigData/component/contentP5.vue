
<template>
  <!-- 中国地图 -->
  <div>
    <div class="bk">
      <div class="top">
        <span>体验中心管理</span>
      </div>
      <div class="content">
        <div class="leftTitle">
          <div :class="isShow1 ? 'titleP1' : 'nobianse'" @click="change(1)">
            <div class="shangXian"></div>
            <span>全国所有体验中心统计</span>
            <div class="xiaXian"></div>
          </div>
          <div :class="isShow2 ? 'titleP1' : 'nobianse'" @click="change(2)">
            <div class="shangXian"></div>
            <span>体验中心分布情况展示</span>
            <div class="xiaXian"></div>
          </div>
          <div :class="isShow3 ? 'titleP1' : 'nobianse'" @click="change(3)">
            <div class="shangXian"></div>
            <span>各体验中心使用率排名</span>
            <div class="xiaXian"></div>
          </div>
        </div>
        <div class="container">
          <div class="xx-map" id="baseMap"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import China from "../../test/china";
import * as echarts from "echarts";
import "echarts-gl";
var patternSrc =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyODIwYzUxMy1hYjk5LTE1NDEtYTk1Ni1lOWE4MDdlZTY4M2UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjRENTQzNDlFQUY3MTFFQzhFMDNFNjI4MzExMjBCQkMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjRENTQzNDhFQUY3MTFFQzhFMDNFNjI4MzExMjBCQkMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NGVhZTRmY2ItYzE1Ny1jNjQ1LTgzOTgtOTM2YTk0M2QxNDMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI4MjBjNTEzLWFiOTktMTU0MS1hOTU2LWU5YTgwN2VlNjgzZSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PifD0UMAAAA4SURBVHjaLIvBDQAgDALB1O4/gfs0cSax1d6LcMAVm6T7JHCkwQINYWleKFJaS/1Olp8yvcAVYADRHwpwESUINQAAAABJRU5ErkJggg==";
var patternImg = new Image();
patternImg.src = patternSrc;
// 散点提示框
var scatterBg =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAbCAYAAADGfCe4AAAEpElEQVRYhaWYvaskRRDAf7W37+19KAb+A4IG74y8CwwMFJMLX2CgYHKZf4CI+DTRaEUwUsHMUOMFOTCWOw5EzG4xMhCEE0G89873dne2pKd7Zmpru2fmsGF3uquruuuru6pLbt678wtwTeFc4JEiFeiW+K2Av4E1EPqVQBVwgVOQDeimmQM5Bb2Q2K+0ppcV6FnCCetuBN0q/BvXlQTXZo3ztH+AbQXZarfHNv00zAsaeFEB1RpW/wJtGsa/qcJzwGvAI+CZAJeIpDUGzIDDRKBp0TC4FpmJG6apaVwzMtgIIHBZW0WwTf1JhGslaS7C9Woc1wJsoqLi3tIqrp1XaelaA2hSWKOQ7TQx/Nvy+CR0n4pykeSrBa/YbRdES9pWHS3mZwT1JFLdWca2HCyqNjRLLy127GmGtoNImpe2l+CTqSF7HfiyM7k1f/HXaLlaHp9Uhq6x2mly9a2BBSU9drhrA6vMvgG2cXys0k/dGudG5m36XkyuzB5OZYSak88Xploau1QDu2qEa5gPsKcN05U5b5U7e5bO4uSUrgavNZBuqgcTJ5kYBMuxFSAnjFeUZOBFJY5oY+k01590Pr/DoGfSE/v5klC+iaPPMZ9ba+z6FreVY+L2ygnnhSr1/w9Dlom+28rOifvijk/rkZMRHJUEzzFRGlt4bssc3J71EptSctGMJYsM9rlVaVMGXE4zlhnjEX3K3nPRHUvqrqJKLjN08eQE6GtjXFozv6ELLSd4sOQOX32WsK3kciXavjNdUkrJTcfwtiNHzl37BLDj0oVUujhKZ6e09/h0qYAnjbuOJPC31hiGfBOzzpPE3awAPXu0eNpjydJ57LPaUFjxaz9pUjA+LMlOr7OklNDyF0nuHJVcMZdEjI2NffBiE92ntWndWYZwKPuxeOr6Obf08Jz75vYuxcw93hxznbsKPH+0mP8AvAn8mtFwLnZ6wcfENd/vCwt2ndK5dVlplq864/lA4Xvgk6PF/GfgFvAx8E+Bkb58cygEiWN6KESMclfjollFh2Tga+CmwAvAT0eL+avXF59+k6oF3420pg/GpaRgKJT4W3xU2maA2btCbty7Y+lugX4O3BfkQ0UfLo9PXkyWfck9Urfu3effer6/GXg/Dn39up4PzX3lYPrA3K610sK5fBn4XdEfQW4fLeZL4C3gXeDPEc8jf1nYyybnrrk+Hi55S/W1Lo2zlrTVEYHrCp/FrEHeV3S5PD4Jr/p3gNvApcKrXQvWGnr9D83lrOkrA3vfYEnnrjkLyduCvqfIt4J+kUqJdUtCT43FDlN1rxlPUrnDWuGKO2sHaQ01NDN3ti+78UHCszQNH019p64wyuzwjyEhG26eBT4CbgBfhZtXkga1jq91/bXR3soUlZpy5eNmHMqdiq7TGcXUTFd92XrHSz9WZnYy9cQ+OifIX+lMvgLyRqrJVqkAPQtjQTapCBwILkldM2WN6gapNV8LlgRsNB7664Qb9lqDBmHXyWMukjICzkqjIjbaFbVX7lIL6+y5ci1klNz+N4Lu6e4u6N1OEeVo0KYo9aEuKbCcFkksfLdbp/5Eu6SmcdNcyEpegyrwHzdCxPS7nMn3AAAAAElFTkSuQmCC";
export default {
  name: "xx-map",
  data() {
    return {
      map: China, // 加载地图
      symbol:
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAwCAYAAACfbhNRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA2LTEzVDE3OjEzOjM2KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNi0xM1QxNzoxOTo1NSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wNi0xM1QxNzoxOTo1NSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MWRkOTZkNi1hZDMx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",
      option: {
        animation: true,
        geo: {
          show: true,
          map: "china", // 要与 `registerMap()` 的第一个参数对应, 'china' 会显示南海诸岛
          roam: false, // 鼠标缩放+平移
          aspectScale: 0.9,
          zoom: 1.2,
          selectedMode: "single", // 选中
          silent: true,
          center: [105.194115019531, 35.582111640625],
          regions: [
            {
              name: "南海诸岛",
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false,
                  },
                },
              },
            },
          ],
          itemStyle: {
            areaColor: "rgba(23,58,103,1)", // 地图阴影区颜色
            borderColor: "#115fea",
            borderWidth: 1,
          },
        },
        series: [
          {
            type: "map",
            map: "china",
            roam: false, // 鼠标缩放+平移
            aspectScale: 0.9,
            zoom: 1.2,
            center: [105.194115019531, 34.982111640625], // 设置地图中心
            data: this.scatterData,
            // geoIndex: 0, // 共享 geo 样式
            itemStyle: {
              areaColor: "rgba(23,58,103,0)", // 默认地图颜色
              // areaColor: '#173a67',
              borderColor: "#84e0f6", // 边框
              shadowColor: "rgba(132,224,246,1)", // 省份边框阴影
              shadowBlur: 6, // 省份边框聚焦
              borderWidth: 2,
            },
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            data: this.scatterData,
            symbolSize: 50,
            label: {
              show: true,
              formatter: "{b}",
              fontSize: 12,
              fontWeight: "bold",
              position: "top",
              backgroundColor: {
                image: scatterBg,
              },
              align: "center",
              padding: [8, 15],
              color: "#fff",
            },
          },
        ],
      },
      isShow1: true,
      isShow2: false,
      isShow3: false,
    };
  },
  methods: {
    // 销毁图表实例, 防止内存泄漏
    destroyChart() {
      let chart = echarts.init(document.getElementById("baseMap"));
      if (chart) {
        chart.clear(); // 释放图形资源
        chart.dispose(); // 销毁实例对象
      }
    },
    // 图表初始化
    initMap() {
      this.destroyChart();
      let myChart = echarts.init(document.getElementById("baseMap"));
      // 注册地图
      echarts.registerMap(this.option.geo.map, this.map);
      // 事件解绑
      myChart.off("click");
      // 取消鼠标移入高亮
      myChart.on("mouseover", function (params) {
        myChart.dispatchAction({
          type: "downplay",
        });
      });
      
      
      this.$set(this.option.series[1], "data", this.scatterData);
      this.$set(this.option.series[0], "data", this.scatterData);
      myChart.setOption(this.option, true);
    },
    async findAllShow() {
      const res = await this.$api.findAllShow();
      if (res.success) {
        res.data.map((item) => {
          item.value.map((item2) => {
            item2 = Number(item2);
          });
          item.symbol = this.symbol;
        });
        this.scatterData = res.data;
        this.initMap();
      }
    },
    change(e) {
      if (e == 1) {
        if (this.isShow1 == false) {
          this.isShow1 = !this.isShow1;
          this.isShow2 = false;
          this.isShow3 = false;
        }
      } else if (e == 2) {
        if (this.isShow2 == false) {
          this.isShow2 = !this.isShow2;
          this.isShow1 = false;
          this.isShow3 = false;
        }
      } else {
        if (this.isShow3 == false) {
          this.isShow3 = !this.isShow3;
          this.isShow1 = false;
          this.isShow2 = false;
        }
      }
    },
  },
  mounted() {
    this.findAllShow();
  },
};
</script>
 
<style scoped lang="scss">
.bk {
  padding: 5px 7px;
}
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
.content {
  width: 100%;
  height: 418px;
  background: rgba(0, 188, 255, 0.1);
  border: 1px solid #00bcff;
  display: flex;
  .leftTitle {
    margin-top: 80px;
    margin-left: 30px;
    .titleP1 {
      margin-bottom: 25px;
      width: 200px;
      height: 56px;
      line-height: 50px;
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
    .nobianse {
      // border-top: 2px solid #00bcff;
      // border-bottom: 2px solid #00bcff;
      margin-bottom: 25px;
      width: 200px;
      height: 56px;
      line-height: 50px;
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
  .container {
    position: relative;
    width: 100%;
    height: 340px;
    margin: 0 auto;
    // background: #032b50;
    margin-top: 50px;
    .xx-map {
      width: 100%;
      height: 100%;
    }
  }
}
</style>