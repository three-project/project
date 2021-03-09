//引入axios
import axios from "axios"


const ajax=axios.create({
    baseURL:'/api',
    timeout:20000
})
//请求拦截
ajax.interceptors.request.use(config=>{
    const Authorization="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNTc2Mjc5MDIzMDMiLCJpYXQiOjE2MTUxNjQ0ODYsImV4cCI6MTYxNTI1MDg4Nn0.XfoxRcC61hUsftnQmsuErA2uqvYXbJXp6XSIYQqpBgw"
     if(Authorization){
         config.headers.Authorization=Authorization
     }
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