const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (...dir) => path.resolve(__dirname, '../../', ...dir)
const src = resolve('src')
const entry = (function getEntry() {
  const collect = {}
  function forEntry(prefix) {
    const files = fs.readdirSync(prefix).filter((file) => !/(^\.|_)/.test(file))
    files.forEach((file) => {
      const f = path.resolve(prefix, file)
      const stats = fs.statSync(f)
      if (stats.isFile()) {
        const key = f.replace(`${src}/`, '').replace(/\.(ts|js)x?/, '')
        collect[key] = f
      } else {
        forEntry(f)
      }
    })
  }
  forEntry(src)
  return collect
})()
function getHtmlPlugins(publicPath = '/') {
  return Object.keys(entry).map((item) => {
    const filename = `${item === 'utils' ? 'index' : item}.html`
    const options = {
      filename,
      chunks: [item],
      title: item,
      path: publicPath,
    }
    const template = resolve('public', filename)
    if (fs.existsSync(template)) {
      options.template = template
    }
    return new HtmlWebpackPlugin(options)
  })
}
module.exports = {
  resolve,
  entry,
  getHtmlPlugins,
}