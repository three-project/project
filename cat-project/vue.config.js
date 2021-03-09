// vue.config.js
//解决脚手架4的跨域问题
module.exports = {
  lintOnSave:false, //关闭eslint语法检查
  //devServer:开发服务器
  devServer: {
    //proxy:代理
    proxy: {
      "/api": {
        target: "https://mall.cxmmao.com", //需要访问的目标地址
        changeOrigin: true, //是否跨域
        //如果你所访问的地址里面没有/api,则需要去掉'/api'
        pathRewrite:{
            '^/api':'',//rewrite path
        }
      },
    },
  },
};
