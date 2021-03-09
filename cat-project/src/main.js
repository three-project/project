import Vue from 'vue'
import App from './App.vue'
// 引入router
import router from './router'
import store from './store'
// 引入Element-ui
import './plugins/element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
import * as API from '@/api'
// 引入无限加载
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.prototype.$API = API
Vue.use(less)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')
