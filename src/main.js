import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
//三方库
import router from "./router";
import Router from "vue-router";

//重写router.push
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

//UI框架
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

// 星座图
import VueParticles from "vue-particles";
Vue.use(VueParticles);

// echarts图表
import *as echarts from 'echarts'
Vue.prototype.$echarts = echarts
 
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')