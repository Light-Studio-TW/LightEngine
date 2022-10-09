//導入sdl
const { checkPackage } = require('./PackageManager')
let sdl

class MOUSE {
  sdl = checkPackage('@kmamal/sdl')
  constructor (game) {
    this.game = game
    this.nowPress = {}
    this.updater = {
      buttonDown: games[game].window.on('mouseButtonDown', (data) => {
        if (games[this.game] === undefined) {
          this.game = null
          this.nowPress = null
          this.updater = null
          return
        }
        this.nowPress[data.button] = true
      }), buttonUp: games[game].window.on('mouseButtonUp', (data) => {
        if (games[this.game] === undefined) {
          this.game = null
          this.nowPress = null
          this.updater = null
          return
        }
        delete this.nowPress[data.button]
      })
    }
  }
  //取得滑鼠的位置
  getPosition (type) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    }
    if (type === 'all') {
      return { x: sdl.mouse.position.x, y: sdl.mouse.position.y }
    } else if (type === 'window' || type === undefined) {
      return { x: sdl.mouse.position.x-games[this.game].window.x, y: sdl.mouse.position.y-games[this.game].window.y }
    }
  }
  //取得滑鼠的X
  getX (type) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    }
    if (type === 'all') {
      return sdl.mouse.position.x
    } else if (type === 'window' || type === undefined) {
      return sdl.mouse.position.x-games[this.game].window.x
    }
  }
  //取得滑鼠的X
  getY (type) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    }
    if (type === 'all') {
      return sdl.mouse.position.y
    } else if (type === 'window' || type === undefined) {
      return sdl.mouse.position.y-games[this.game].window.y
    }
  }
  //事件
  event (name, callback) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (name === undefined || callback === undefined) {
      error('MV', 'name, callback')
    } else if (!['move', 'buttonDown', 'buttonUp', 'wheel'].includes(name)) {
      error('VMB', ['name', 'move, buttonDown, buttonUp, wheel'])
    } else if (typeof callback !== 'function') {
      error('VMBF', 'callback')
    } else {
      let game = this.game
      return new class {
        constructor () {
          this.callback = callback
          this.name = ['mouseMove', 'mouseButtonDown', 'mouseButtonUp', 'mouseWheel'][['move', 'buttonDown', 'buttonUp', 'wheel'].indexOf(name)]
          this.updater = games[game].window.on(this.name, (data) => {
            if (games[game] === undefined) {
              this.updater = null
              this.name = null
              this.callback = null
            } else {
              if (this.name === 'mouseMove') {
                callback({ x: data.x, y: data.y })
              } else if (this.name === 'mouseButtonDown' || this.name === 'mouseButtonUp') {
                callback({ x: data.x, y: data.y, button: data.button })
              } else if (this.name === 'mouseWheel') {
                callback({ x: data.dx, y: data.dy })
              }
            }
          })
        }
        //停止
        stop () {
          this.updater = null
          this.name = null
          this.callback = null
        }
      }
    }
  }
}

function getPosition (game) {
  return { x: sdl.mouse.position.x-games[game].window.x, y: sdl.mouse.position.y-games[game].window.y }
}

module.exports = { MOUSE, getPosition }

const { games } = require('../data')
const { error } = require('./Error')