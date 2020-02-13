const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  devServer: {
    //跨域
    disableHostCheck: true,
    open: true,
    host: 'localhost',
    https: false,
    proxy: {
      // 配置跨域处理 可以设置多个
      '/api': {
        target: 'http://0.0.0.0:8888/linux',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

}

