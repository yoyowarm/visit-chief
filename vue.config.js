const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/',
    assetsDir: 'static',
    // lintOnSave: process.env.NODE_ENV === 'development',
    lintOnSave: false,
    productionSourceMap: false,
    // devServer: {
    //     port: port,
    //     open: true,
    //     overlay: {
    //         warnings: false,
    //         errors: true
    //     },
    //     disableHostCheck: true
    // },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        module: {
            rules: [{
                test: /\.json$/,
                loader: 'url-loader',
                // options: {
                //     limit: 10000,
                //     name: '/static/json/[name].[hash:7].[ext]'
                //         // name: utils.assetsPath('json/[name].[hash:7].[ext]')
                // }
            }]
        }
    },
    chainWebpack(config) {
        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()
        config.module
            .rule('json')
            .test(/\.json$/)
            .include.add(resolve('src/assets')) //处理svg目录
            .end()
            // .use('url-loader')
            // .loader('url-loader')
            // .options({
            //     limit: 10000,
            //     name: `static/json/[name].[hash:7].[ext]`
            // })
            // .end()
    }
}