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
	{
		path: "/test1",
		name: "test1",
		component: () => import("@/view/test/test1.vue"),
	},
	{
		path: "/test2",
		name: "test2",
		component: () => import("@/view/test/test2.vue"),
	},
	{
		path: "/test3",
		name: "test3",
		component: () => import("@/view/test/test3.vue"),
	},
]
const router = new VueRouter({
	routes,
})

export default router