module.exports = {
    lintOnSave: false, // 关闭eslint语法检查
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'https://mall.cxmmao.com',//目标地址
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}