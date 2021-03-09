import { reqgetGoodsList, reqLogin, reqRegister, reqVerify } from '@/api'
// 引入usetTempId
import { getToken, getUserTempId, saveToken } from '@/utils'

const state = {
    goodsList: [],//存储商品列表的数组
    /* goodsIdList: [],//存储商品基本信息的数组 */
    userInfo: {}, // 用户信息对象
    token: getToken(), // token信息存储
    userTempId: getUserTempId(), // 用户临时凭证id
    balance: Number, // 存储账户余额

}
const mutations = {
    RECEIVE_GOODS_List(state, goodsList) {
        // console.log('goodsList', goodsList.data.goodsList)
        // let result = goodsList.data.goodsList  商品列表数组
        state.goodsList = goodsList
    },
    // 直接修改用户信息
    RECEIVE_USER_INFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 直接修改token信息
    RECEIVE_TOKEN(state, token) {
        state.token = token
    },
    // 直接修改账户余额
    RECEIVE_USER_BALANCE(state, balance) {
        state.balance = balance
    }
    /*
    RECEIVE_GOODS_ID_LIST(state, goodsIdList) {
        state.goodsIdList = goodsIdList
    } */
}
const actions = {
    // 调用商品列表的接口
    async getGoodsList({ commit }, { priceRange, currentPage = 0, pagingSize = 20, sortType }) {
        // console.log('111', priceRange)
        const result = await reqgetGoodsList(priceRange, currentPage, pagingSize, sortType)

        commit('RECEIVE_GOODS_List', result.data)

    },
    async login({ commit }, { email, password }) {
        const result = await reqLogin(email, password)
        const userInfo = result.data
        if (userInfo.code === 10000) {

            // 获取用户信息对象

            // 获取token
            const token = userInfo.data.token
            // console.log(userInfo)
            // console.log('token', token)

            commit('RECEIVE_USER_INFO', userInfo)
            // console.log(userInfo)
            // 存储token
            commit('RECEIVE_TOKEN', token)
            // 缓存token信息 --- 浏览器的缓存localStorage中
            saveToken(token)
        } else {

            throw new Error(result.message || '登录失败')
        }

    },
    // 注册
    async register({ commit }, { email, password, verifyCode }) {
        const result = await reqRegister(email, password, verifyCode)
        if (result.data.code !== 10000) {
            throw new Error(result.message || '注册失败')
        }
    },
    /* //调用商品基本信息的数组
    async reqgetGoodsInfoList({ commit }) {
        const  result = await reqgetGoodsInfoList()
        commit('RECEIVE_GOODS_ID_LIST', result.data)
    } */
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}