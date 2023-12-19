import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("@/view/login/index.vue"),
        meta: {
            keepAlive: true,
            activeMenu: 'Login',
            hidden: false,
            name: '注册登录'
        }
    },
    {
        path: "/bigData",
        name: "bigData",
        component: () => import("@/view/bigData/index.vue"),
        meta: {
            keepAlive: true,
            activeMenu: 'bigData',
            hidden: false,
            name: '大数据'
        }
    },
]
const router = new VueRouter({
    routes,
})

export default router