const fs = require('fs')
const path = require('path')

const entry = (function getEntry() {
  const collect = {}
  const prefix = path.resolve(__dirname,'../','src') //src文件夹
  function getFile(prefix) {
    const files = fs.readdirSync(prefix).filter((file) => !/(^\.|_)/.test(file))
    files.forEach((file) => {
      const f = path.resolve(prefix, file)
      const stats = fs.statSync(f)
      if (stats.isFile()) {
        const key = f.replace(`${prefix}`, '').replace(/\.(ts|js)x?/, '')
        collect[key] = f
      } else {
        getFile(f)
      }
    })
  }
  getFile(prefix)
  return collect
})()

module.exports = {
  entry
}