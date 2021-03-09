import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from "./router"

//引入element组件
import ElementUi from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
//引入elementui
import "@/plugins/element-ui"

//引入所有的api接口
import * as API from "@/api"
//Vue亏昂加使用组件
Vue.use(ElementUi)

//引入头部模块
import NavBanner from "./components/NavBanner/NavBanner"
Vue.config.productionTip = false

//引入底部模板
import NavFooter from "./components/NavFooter/NavFooter"

//引入iconfont图标
import "@/assets/font/iconfont.css"

//把API接口数据暴露在每个组件的实例对象上
Vue.prototype.$API=API

import store from './store'
Vue.component("NavBanner",NavBanner)
Vue.component("NavFooter",NavFooter)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
