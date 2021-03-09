//引入ajax
import ajax from "./ajax"

//获取购物车列表数据
export const reqShopCarList = (userId,pageSize,curPage) =>ajax.get(`/api-mall/cart/cart/?userId=${userId}&pageSize=${pageSize}&curPage=${curPage}`)

//删除购物车列表数据
export const DeleteList=(data={})=>ajax.delete(`/api-mall/cart/cart`,{data})
//添加购物车列表数据
export const AddShopList=(userId,goodsId,goodsNum)=>ajax.put(`/api-mall/cart/cart/?userId=${userId}&goodsId=${goodsId}&goodsNum=${goodsNum}`)
//到购物车数据
export const UpdateShopList=(userId,goodsId,goodsNum)=>ajax.post(`/api-mall/cart/cart`,{userId,goodsId,goodsNum})

//获取商品详情数据
export const getShopItem=(goodsIdList)=>ajax.get(`/api-mall/goods/goods-info-list/?goodsIdList=${goodsIdList}`)
//获取购物车长度的接口
export const getShopListLength=()=>ajax.get(`/api-mall/cart/cart-length`)