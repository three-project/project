import ajax from './ajax'
// 登录接口
export const reqLogin = (email, password) => ajax.post(`/user/login`, { email, password })
// 注册接口
export const reqRegister = (email, password, verifyCode) => ajax.post(`/user/register`, { email, password, verifyCode })
// 获取验证码
export const reqVerify = (email) => ajax.post(`/public/get-verify-code`, email)
// 更新用户信息
export const reqUpdataUser = () => ajax.post(`/user/update-user-info`)
// 获取批量商品基本信息
export const reqgetGoodsInfoList = (goodsId) => ajax.get(`/goods/goods-info-list`, goodsId)
// 获取商品列表
export const reqgetGoodsList = (priceRange, currentPage, pagingSize, sortType) => ajax.get(`/goods/goods-list?priceRange=${priceRange}&currentPage=${currentPage}&pagingSize=${pagingSize}&sortType=${sortType}`)
// 获取更多商品详情
export const reqMoreGoodsList = (maxLength) => ajax.get(`/goods/get-more-goods-list`, maxLength)
// 获取账户余额
export const reqUserBalance = () => ajax.get(`/account/balance`)
// 加入购物车
export const addToCart = (userId,goodsId,goodsNum) => ajax.post(`/cart/cart`,{userId,goodsId,goodsNum})