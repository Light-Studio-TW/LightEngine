const { checkPackage } = require('./PackageManager')
let sdl

class DEVICE {
  sdl = checkPackage('@kmamal/sdl')
  //取得所有的設備
  static getAll () {
    loadPackages()
    return sdl.audio.devices
  }
  //取得現在正在使用的設備
  static getNowUsing () {
    loadPackages()
    return sdl.audio.devices.find((x) => x.recording === false)
  }
}

module.exports = { DEVICE }

const { error } = require('./Error')