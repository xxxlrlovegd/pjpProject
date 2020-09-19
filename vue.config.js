const path = require('path')

const resolve = file => path.resolve(__dirname, file)

module.exports = {
    // publicPath: '/', // 根路径
    // outputDir: 'dist', // 构建输出目录
    productionSourceMap: false, // 打包时不生成.map文件
    lintOnSave: false, // 是否开启eslint保存检测,有效值（true||false||error)
    chainWebpack: (config) => {
        config.resolve.alias
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('lib', resolve('src/lib'))
            .set('views', resolve('src/views'))
            .set('@', resolve('src'))
    },
    configureWebpack: {
        devtool: 'source-map', // 保证源码正确加载
    },
    devServer: {
        proxy: {
            '/api': { // 自定义
                target: 'http://192.168.43.110:8081', // 这里可以跟随项目实际部署服务器来配置
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
}