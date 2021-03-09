import Vue from 'vue'
import App from './App.vue'
import store from './store'
//引入element_UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//注册使用element_UI
Vue.use(ElementUI);
//引入懒加载的包
import VueLazyLoad from 'vue-lazyload'
//声明使用懒加载
Vue.use(VueLazyLoad)
Vue.config.productionTip = false
//引入字体图标
import '../public/css/font/iconfont.css'
//引入swiper
import './plugins/swiper'
//引入全局公共组件NavBanner,NavFooter
import NavBanner from './components/NavBanner/NavBanner'
import NavFooter from './components/NavFooter/NavFooter'
//注册全局公共组件
Vue.component('NavBanner',NavBanner)
Vue.component('NavFooter',NavFooter)
new Vue({
  render: h => h(App),
  store
}).$mount('#app')

