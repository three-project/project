//引入Vue
import Vue from "vue"
//引入vueRouter
import VueRouter from "vue-router"
import routes from "./routes"

Vue.use(VueRouter)

const router=new VueRouter({
    mode:"history",
    routes
})

export default router