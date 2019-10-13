const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')

//封装一个路径函数
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css'
  }),
  // 配置路径别名
  addWebpackAlias({
    '@': resolve('src')
  })
)
