//引入二次封装的ajax的函数
import ajax from './ajax'
//获取商品详情信息
export const goodsDetail = () =>ajax.get(`/api-mall/goods/goods-detail?goodsId=100001`)

//获取商品列表数据
export const shoplist = () =>ajax.get(`/api-mall/goods/goods-list?priceRange=ALL&currentPage=0&pagingSize=6&sortType=ASC`)

//获取更多商品详情
export const MoreProductDetails = (maxLength) =>ajax.get(`/api-mall/goods/get-more-goods-list?maxLength=${maxLength}`)

//获取短评列表数据
export const ShortCommentListData = (goodsId)=>ajax.get(`/api-mall/comment/brief-list?goodsId=${goodsId}`)

//写短评
export const WhiteShortCommentList = (WhiteShortComment) =>ajax.post(`/api-mall/comment/write-brief`,WhiteShortComment)

//获取评论
export const comment = (goodsId) =>ajax.get(`/api-mall/comment/comment-list/?goodsId=${goodsId}`)


//写评论
export const WhiteLongCommentList = (LongComment) =>ajax.post(`/api-mall/comment/write-comment`,LongComment)
