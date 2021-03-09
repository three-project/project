//引入Vue
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//引入car
import car from './modules/car'
//声明使用Vuex
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
       car
    }
})
