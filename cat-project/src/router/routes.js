// 引入Home
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'
import Cart from '@/pages/Cart'
export default [
    {
        path: '/',
        component: Home
    },
    // 商品详情页面
    {
        path: '/detail/:goodsId?',
        component: Detail
    },
    {
        path: '/cart',
        component: Cart
    },
    // 重定向
    {
        path: '/',
        redirect: '/'
    }
]
