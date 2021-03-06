const path = require('path')
const fs = require('fs')

function getPages() {
  let entries = {}
  const pageConfig = require('./config/page.json')
  const pageList = path.resolve(__dirname, 'src/pages')
  const pageDir = fs.readdirSync(pageList)
  pageDir.forEach(pageName => {
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
// console.log('pages: ', pages)

const vueConfig = {
  pages: Object.assign({}, pages, {
    app: './src/main.ts', // 配置主入口文件（会生成 app.html，vue cli3并没有提供直接配置入口文件的选项）
  }),
  devServer: {
    before: app => {
      app.get('/', (req, res, next) => {
        for (let pageItem in pages) {
          res.write(`<a target="_self" href="/${pageItem}">/${pageItem}</a></br>`)
        }
        res.end()
      })
    },
  },
  chainWebpack: config => {
    for (let pageItem in pages) {
      config.plugins.delete(`prefetch-${pageItem}`)
    }

    if (process.env.NODE_ENV === 'production') {
      config.plugin('extract-css').tap(() => [
        {
          path: path.join(__dirname, './dist'),
          filename: 'css/[name].[contenthash:8].css',
        },
      ])
    }
  },
}

module.exports = vueConfig
