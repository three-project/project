import {goodsDetail,shoplist,MoreProductDetails,ShortCommentListData,WhiteShortCommentList,comment,WhiteLongCommentList} from '../../api'
const state = {
    //存储商品详情数据
    shopCartList:{},
    shopList:[],
    moreshopList:{},
    ShortCommentListData:{},
    WhiteShortCommentList:{},
    Comments:{},
    WhiteLongCommentLists:{},
}
const mutations = {
    //存储直接修改商品数据的方法
    RECRIVE_SHOPCART_LIST(state,shopCartList) {
       state.shopCartList = shopCartList
    },
    RECEIVE_SHOPLIST(state,shopList) {
        state.shopList = shopList
    },
    RECEIVE_MORESHOPLIST(state,moreshopList) {
      state.moreshopList = moreshopList
    },
    RECEIVE_SHORTCOMMENTLISTDATA(state,ShortCommentListData) {
      state.ShortCommentListData = ShortCommentListData
    },
    RECRIVE_WHITESHORTCOMMENTLIST(state,WhiteShortCommentList) {
      state.WhiteShortCommentList = WhiteShortCommentList
    },
    RECEIVE_COMMENT(state,Comments) {
      state.Comments = Comments
    },
    RECRIVE_WHITELONGCOMMENTLIST(state,WhiteLongCommentLists) {
      state.WhiteLongCommentLists = WhiteLongCommentLists
    },
}
const actions = {
    //存储间接修改商品数据的方法
    async getshopCartList({commit}) {
      const result = await goodsDetail()
      if(result.code === 10000) {
        commit('RECRIVE_SHOPCART_LIST',result.data)
      }
    },
    async getshopList({commit}) {
        const result = await shoplist()
        if(result.code === 10000) {
          commit('RECEIVE_SHOPLIST',result.data)
        }
      },
      async getmoreshopList({commit},maxLength) {
        const result = await MoreProductDetails(maxLength)
        if(result.code === 10000) {
          commit('RECEIVE_MORESHOPLIST',result.data)
        }
      },
      async getShortCommentListData({commit},goodsId) {
        const result = await ShortCommentListData(goodsId) 
        if(result.code === 10000) {
          commit('RECEIVE_SHORTCOMMENTLISTDATA',result.data)
        }
      },
      async getWhiteShortCommentList({commit},WhiteShortComment) {
        const result = await WhiteShortCommentList(WhiteShortComment) 
        if(result.code === 10000) {
          commit('RECRIVE_WHITESHORTCOMMENTLIST',result.data)
        }
      },
      async getComments({commit},goodsId) {
        const result = await comment(goodsId) 
        if(result.code === 10000) {
          commit('RECEIVE_COMMENT',result.data)
        }
      },
      async getWhiteLongCommentList({commit},LongComment) {
        const result = await WhiteLongCommentList(LongComment) 
        if(result.code === 10000) {
          commit('RECRIVE_WHITELONGCOMMENTLIST',result.data)
        }
      }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}