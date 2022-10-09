module.exports = { loadPackage, checkPackage }

const { error } = require('./Error')

let packages = {}

//導入包
function loadPackage (name) {
  try {
    packages[name] = require(name)
  } catch (err) {
    error('MP', [name, `npm install ${name}`])
  }
}

//檢查包
function checkPackage (name) {
  return packages[name]
}