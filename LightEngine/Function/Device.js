class DEVICE {
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


var sdl
function loadPackages () {
  if (sdl === undefined)  {
    //導入node-sdl
    try {
      sdl = require('@kmamal/sdl')
    } catch (err) {
      error('MP', ['@kmamal/sdl', 'npm install @kmamal/sdl'])
    }
  }
}