/**
 * @description: 主入口文件
 */
import 'amfe-flexible'
import 'vant/lib/index.css'
import 'normalize.css'

import './styles/main.scss'
console.log('process.env: ', process.env)

if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  new VConsole()
}
