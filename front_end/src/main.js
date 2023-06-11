import Vue from 'vue'
import App from './App.vue'
/* 引入路由配置文件 */
import router from './router'
/* 前后端数据交互 */
import axios from 'axios'
import vueAxios from 'vue-axios'
import ElementUI from 'element-ui'; //引入 Element-UI 组件
import 'element-ui/lib/theme-chalk/index.css'; //引入 Element-UI 样式

/* 项目的入口 */
Vue.use(vueAxios, axios)
Vue.use(ElementUI)

//创建一个 Vue 实例
new Vue({
  /* 相当于 router: router */
  router,
  /* 渲染 App.vue 文件 */
  render: h => h(App),
}).$mount('#app') /* 将内容挂载到 id 为 app 的标签下 */