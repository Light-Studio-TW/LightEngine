//導入sdl
const { checkPackage } = require('./PackageManager')
let sdl

class KEYBOARD {
  sdl = checkPackage('@kmamal/sdl')
  constructor (game) {
    this.game = game
    this.nowPress = {}
    this.updater = {
      buttonDown: games[game].window.on('keyDown', (data) => {
        if (games[game] === undefined) {
          this.game = null
          this.nowPress = null
          this.updater = null
          return
        }
        this.nowPress[data.key] = true
      }),
      buttonUp: games[game].window.on('keyUp', (data) => {
        if (games[game] === undefined) {
          this.game = null
          this.nowPress = null
          this.updater = null
          return
        }
        delete this.nowPress[data.key]
      })
    }
  }
  //按鍵壓�����
  keyDown (callback) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (callback === undefined) {
      error('MV', 'callback')
    } else if (typeof callback !== 'function') {
      error('VMBF', 'callback')
    } else {
      let game = this.game
      return new class {
        constructor () {
          this.game = game
          this.callback = callback
          this.updater = games[game].window.on('keyDown', (data) => {
            if (games[game] === undefined || this.updater === null) {
              this.game = null
              this.callback = null
              this.updater = null
            } else {
              this.callback(data.key)
            }
          })
        }
        stop () {
          this.updater = null
          this.game = null
          this.callback = null
        }
      }
    }
  }
  //按鍵放開
  keyUp (callback) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (callback === undefined) {
      error('MV', 'callback')
    } else if (typeof callback !== 'function') {
      error('VMBF', 'callback')
    } else {
      let game = this.game
      return new class {
        constructor () {
          this.game = game
          this.callback = callback
          this.updater = games[game].window.on('keyUp', (data) => {
            if (games[game] === undefined || this.updater === null) {
              this.game = null
              this.callback = null
              this.updater = null
            } else {
              this.callback(data.key)
            }
          })
        }
        stop () {
          this.updater = null
          this.game = null
          this.callback = null
        }
      }
    }
  }
}

module.exports = { KEYBOARD }

const { games } = require('../data')
const { error } = require('./Error')