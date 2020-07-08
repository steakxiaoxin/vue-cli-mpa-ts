const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const { program } = require('commander')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const IS_PRD = process.env.APP_ENV === 'prd'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

program.option('-p, --pages <items>', 'comma for pages', e => e.split(',')).parse(process.argv)
const inputPages = program.pages
const log = console.log
const PORT = 3006

log(chalk.magentaBright('-----------------------'))
log(chalk.green('NODE_ENV: '), chalk.yellow(process.env.NODE_ENV))
log(chalk.green('APP_ENV:  '), chalk.yellow(process.env.APP_ENV))
log(chalk.magentaBright('-----------------------'))

function getPages() {
  let entries = {}
  const pageConfig = require('./config/page.json')
  const pageList = path.resolve(__dirname, 'src/pages')
  const pageDir = fs.readdirSync(pageList)
  pageDir.forEach(pageName => {
    if (inputPages) {
      if (!inputPages.includes(pageName)) return
    }
    const pageData = pageConfig[pageName] || {}
    entries[pageName] = {
      entry: 'src/pages/' + pageName + '/index.ts',
      template: './public/index.html',
      filename: pageName + '.html',
      minify: false, // 是否压缩
      chunks: ['chunk-vendors', 'chunk-common', 'app', pageName], // 引入资源文件
      chunksSortMode: 'manual', // 控制 chunk 的排序。none | auto（默认）| dependency（依赖）| manual（手动）| {function}
      pageData: { ...pageData, pageName },
    }
  })
  return entries
}

const pages = getPages()

const vueConfig = {
  publicPath: IS_PRODUCTION ? '/dist/' : '/',
  pages: Object.assign({}, pages, {
    app: './src/main.ts', // 配置主入口文件（会生成 app.html，vue cli3并没有提供直接配置入口文件的选项）
  }),
  productionSourceMap: false,
  devServer: {
    port: PORT,
    before: app => {
      app.get('/', (req, res, next) => {
        for (let pageItem in pages) {
          res.write(`<a target="_self" href="/${pageItem}"><h1>/${pageItem}</a></h1></br>`)
        }
        res.end()
      })
    },
  },
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-eval-source-map'))
    config.plugins.delete('progress')
    config.plugin('webpackbar').use(require.resolve('webpackbar'))
    // config.when(process.env.NODE_ENV === 'development', config => config.plugin('hard-source-webpack-plugin').use(require.resolve('hard-source-webpack-plugin')))
    config.when(process.env.NODE_ENV === 'development', config => config.optimization.minimizer('terser').use(TerserPlugin))

    for (let pageItem in pages) {
      config.plugins.delete(`prefetch-${pageItem}`)
    }

    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        APP_ENV: JSON.stringify(process.env.APP_ENV),
      })
      return definitions
    })
  },
  configureWebpack: config => {
    let plugins = []
    if (IS_PRODUCTION && IS_PRD) {
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8,
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
  },
}

module.exports = vueConfig
