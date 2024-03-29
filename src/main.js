import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
//三方库
import router from "./router";
import Router from "vue-router";
//公共样式
import "./assets/style/index.scss";

//重写router.push
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

//UI框架
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

//阿里字体图标混入Ant Design Vue中的icon
//这个iconfont.js就是从iconfont.cn网站上下载后的解压JS文件
import "./assets/iconfonts/iconfont.css"; //字体图标
import iconFront from "./assets/iconfonts/iconfont.js"; //字体图标js
import { Icon } from "ant-design-vue";
const alicon = Icon.createFromIconfontCN({
  scriptUrl: iconFront,
});
Vue.component("alicon", alicon);
 
import * as moment from 'moment';
Vue.prototype.moment = moment;

// 全局配置及工具函数
import * as utils from "./assets/js/utils";
Vue.prototype.$utils = utils;
import config from "./assets/js/config";
Vue.prototype.$config = config;
import api from "./common/api"; //引入请求函数
Vue.prototype.$api = api;

// 星座图
import VueParticles from "vue-particles";
Vue.use(VueParticles);

// echarts图表
import *as echarts from 'echarts'
import 'echarts-gl';
Vue.prototype.$echarts = echarts

import VueScroll from '@david-j/vue-j-scroll';
Vue.use(VueScroll);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')