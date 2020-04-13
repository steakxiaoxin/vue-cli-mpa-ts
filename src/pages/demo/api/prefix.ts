// 前缀 包括域名和相同的路径
interface PrefixEnv {
  [propName: string]: any
}
const prefixEnv: PrefixEnv = {
  dev: 'dev',
  stage: 'stage',
  pre: 'pre',
  prd: 'prd',
}
export const prefix = prefixEnv[process.env.NODE_ENV]
