import axios from 'axios'
import store from '@/store'
const ajax = axios.create({
    baseURL: '/api/api-mall'
})

// 添加请求拦截器
ajax.interceptors.request.use(
    config => {
        // 从store中读取出来userTempId数据
        const userTempId = store.state.home.userTempId
        config.headers.userTempId = userTempId
        //获取token
        const token = store.state.home.token
        if (token) {
            // 有token传入 header
            config.headers.token = token
        }
        return config
    }
)

export default ajax