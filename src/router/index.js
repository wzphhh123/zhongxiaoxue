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
	// 大数据
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
	// 首页
	{
		path: "/index",
		name: "index",
		component: () => import("@/view/home/index.vue"),
		redirect: "/people",
		children: [
			// 人员统计管理
			{
				path: "/people",
				name: "people",
				component: () => import("@/view/content/people.vue"),
			},
			// 区域管理
			{
				path: "/regionManage",
				name: "regionManage",
				component: () => import("@/view/content/regionManage.vue"),
			},
			// 健康体验管理
			{
				path: "/healthManage",
				name: "healthManage",
				component: () => import("@/view/content/healthManage.vue"),
			},
			// 电量管理
			{
				path: "/electManage",
				name: "electManage",
				component: () => import("@/view/content/electManage.vue"),
			},
			// 软件使用占比管理
			{
				path: "/softwareManage",
				name: "softwareManage",
				component: () => import("@/view/content/softwareManage.vue"),
			},
		]
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