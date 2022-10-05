class DEVICE {
  //取得所有的設備
  static getAll () {
    return sdl.audio.devices
  }
  //取得現在正在使用的設備
  static getNowUsing () {
    return sdl.audio.devices.find((x) => x.recording === false)
  }
}

module.exports = { DEVICE }

const { error } = require('./Error')

//導入node-sdl
try {
  var sdl = require('@kmamal/sdl')
} catch (err) {
  error('MP', ['@kmamal/sdl', 'npm install @kmamal/sdl'])
}