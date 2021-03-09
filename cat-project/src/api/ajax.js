//引入axios
import axios from 'axios'
//设置请求超时时间和根路径
const ajax = axios.create({
    baseURL:"/api", //设置根路径(发送所有请求的前缀路径,跨域的标识)
    timeout: 20000,//设置请求超时时间
})
//请求拦截器的封装
ajax.interceptors.request.use((config)=>{
    let Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI1MjkyMTUxNzMiLCJpYXQiOjE2MTUxODY1MDMsImV4cCI6MTYxNTI3MjkwM30.hrxG23QfryjWPBEBS7tEG-bmbmHOyCsTxDrUpbGtta8"
    config.headers.Authorization = Authorization
    return config
})

//响应拦截器的封装
ajax.interceptors.response.use((response)=>{
    //返回数据
    return response.data
},error=>{
    return Promise.reject(error)
})
export default ajax