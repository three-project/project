import {reqShopCarList} from '../../api'
const state ={
    shopList:[]
}
const mtations ={
    RECEIVE_SHOPLIST(state,shopList) {
        state.shopList = shopList
    }
}
const actions = {
    async getshopList({commit}) {
        const result = await reqShopCarList()
        if(result.code === 10000) {
          commit('RECEIVE_SHOPLIST',result.data)
        }
      }
}
const getters ={}
export default {
    state,
    mtations,
    actions,
    getters
}