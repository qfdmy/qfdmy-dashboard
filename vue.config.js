'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

// 用以支持 gzip 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '千锋达摩院'

// 设置默认端口
// 如果希望本地预览时修改端口可以使用以下命令
// port = 9528 或 npm run dev 或 npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528

// 其它所有配置请参考 https://cli.vuejs.org/config/
module.exports = {
  // 部署应用包的 URL 地址，通常都是使用 './'
  // 注意：如果直接使用 '/' 访问时一片空白
  // 如果希望修改访问路径，比如设置为 `/bar/`
  // 此时项目的访问路径变为 `http://localhost/bar` 这种形式
  publicPath: './',
  // 生产环境构建文件的目录
  outputDir: 'dist',
  // 放置静态资源的目录，相对于 `outputDir` 目录
  assetsDir: 'static',
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // 以下设置为仅在开发环境下使用
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  devServer: {
    port: port,
    // 启动后自动打开浏览器
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  // 该配置会合并进 `webpack` 配置中
  // 比如下列的 `name` 属性会覆盖 `webpackConfig.name` 属性的值
  // 此时 `index.html` 中的 `<%= webpackConfig.name %>` 会被覆盖
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
}
