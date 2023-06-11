import Vue from 'vue' /* 引入 vue */
import VueRouter from 'vue-router' /* 引入 vue-router */

Vue.use(VueRouter) /* 使用 vue-router */

/* 导出路由，挂载到 vue 实例 */
/* 不同路由所代表的不同页面的信息 */
export default new VueRouter({
    routes: [{
            path: '/',
            /* 路由的路径 */
            redirect: '/index'
        },
        {
            path: '/index',
            /* 路由的组件 */
            /* require：异步模块获取，按需加载 */
            /* resolve：路由懒加载 */
            component: resolve => require(['@/views/index.vue'], resolve),
            redirect: '/search_food',
            /* 嵌套路由 */
            children: [{
                    path: '/search_food',
                    component: search_food => require(['@/views/search_food.vue'], search_food)
                },
                {
                    path: '/food_contrast',
                    component: contrast => require(['@/views/food_contrast.vue'], contrast)
                },
                {
                    path: '/food_power',
                    component: power => require(['@/views/food_power.vue'], power),

                },
                {
                    path: '/food_power/nutrition_details',
                    component: nudetails => require(['@/views/nutrition_details.vue'], nudetails)
                },
                {
                    path: '/search_food/result',
                    component: result => require(['@/views/search_food_result.vue'], result)
                },
                {
                    path: '/food_contrast/result',
                    component: contrast_result => require(['@/views/food_contrast_result.vue'], contrast_result)
                }
            ]
        },

    ]
})