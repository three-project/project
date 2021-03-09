import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
// 引入state,mutations,getters,actions
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)
export default new Vuex.Store({
    modules,
    actions,
    state,
    mutations,
    getters
})