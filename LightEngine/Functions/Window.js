//導入sdl
const { checkPackage } = require('./PackageManager')
let sdl

//創建視窗
function createWindow (data) {
  sdl = checkPackage('@kmamal/sdl')
  return sdl.video.createWindow(data)
}

class WINDOW {
  constructor (id) {
    this.id = id
    addClassData(id, 'window' ,id, (data) => {
      this.title = games[data.game].window.title
      this.x = games[data.game].window.x
      this.y = games[data.game].window.y
      this.width = games[data.game].window.width
      this.height = games[data.game].window.height
      this.resizable = games[data.game].window.resizable
      this.fullscreen = games[data.game].window.fullscreen
      this.maximized = games[data.game].window.maximized
      this.minimized = games[data.game].window.minimized
      this.visible = games[data.game].window.visible
      this.borderless = games[data.game].window.borderless
    })
    updateClassData(this.id, 'window', this.id)
    games[id].window.on('resize', () => {
      games[id].change = true
      updateClassData(this.id, 'window', this.id)
    })
  }
  //設定標題
  setTitle (title) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (title === undefined) {
      error('MV', 'title')
    } else if (typeof title !== 'string') {
      error('VMBS', 'title')
    } else {
      games[this.id].window.setTitle(title)
      games[this.id].name = title
      updateClassData(this.id, 'window', this.id)
      return title
    }
  }
  //設定位置
  setPosition (x, y) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.id].window.setPosition(x, y)
      updateClassData(this.id, 'window', this.id)
      return { x: x, y: y }
    }
  }
  //調整位置
  changePosition (x, y) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.id].window.setPosition(games[this.id].window.x+x, games[this.id].window.y+y)
      updateClassData(this.id, 'window', this.id)
      return { x: games[this.id].window.x+x, y: games[this.id].window.y+y }
    }
  }
  //設定大小
  setSize (width, height) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (width === undefined || height === undefined) {
      error('MV', 'width, height')
    } else if (typeof width !== 'number' || typeof height !== 'number') {
      error('VMBN', 'width, height')
    } else {
      games[this.id].change = true
      games[this.id].window.setSize(width, height)
      updateClassData(this.id, 'window', this.id)
      return { width: width, height: height }
    }
  }
  //調整大小
  changeSize (width, height) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (width === undefined || height === undefined) {
      error('MV', 'width, height')
    } else if (typeof width !== 'number' || typeof height !== 'number') {
      error('VMBN', 'width, height')
    } else {
      games[this.id].change = true
      games[this.id].window.setSize(games[this.id].window.width+width, games[this.id].window.height+height)
      updateClassData(this.id, 'window', this.id)
      return { width: games[this.id].window.width+width, height: games[this.id].window.height+heigh }
    }
  }
  //是否可重設大小
  setResizable (boolean) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (boolean === undefined) {
      error('MV', 'boolean')
    } else if (typeof boolean !== 'boolean') {
      error('VMBB', 'boolean')
    } else {
      games[this.id].window.setResizable(boolean)
      updateClassData(this.id, 'window', this.id)
      return boolean
    }
  }
  //全螢幕
  setFullscreen (boolean) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (boolean === undefined) {
      error('MV', 'boolean')
    } else if (typeof boolean !== 'boolean') {
      error('VMBB', 'boolean')
    } else {
      games[this.id].change = true
      games[this.id].window.setFullscreen(boolean)
      updateClassData(this.id, 'window', this.id)
      return boolean
    }
  }
  //最大化
  maximize () {
    games[this.id].change = true
    games[this.id].window.maximize()
    updateClassData(this.id, 'window', this.id)
  }
  //最小化
  minimize () {
    games[this.id].change = true
    games[this.id].window.maximize()
    updateClassData(this.id, 'window', this.id)
  }
  //顯示
  setVisible (boolean) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (boolean === undefined) {
      error('MV', 'boolean')
    } else if (typeof boolean !== 'boolean') {
      error('VMBB', 'boolean')
    } else {
      games[this.id].window.show(boolean)
      updateClassData(this.id, 'window', this.id)
      return boolean
    }
  }
  //是否為無邊匡
  setBorderless (boolean) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (boolean === undefined) {
      error('MV', 'boolean')
    } else if (typeof boolean !== 'boolean') {
      error('VMBB', 'boolean')
    } else {
      games[this.id].window.setBorderless(boolean)
      updateClassData(this.id, 'window', this.id)
      return boolean
    }
  }
  //顯示
  async display () {
    if (games[this.id].change) {
      games[this.id].change = false
      if (games[this.id].display === undefined) {
        games[this.id].display = (displayOperations(this.id, games[this.id].window.width))
      }
      let displaySave = []
      let all_key = Object.keys(games[this.id].pens)
      for (let run = 0; run < all_key.length; run++) {
        displaySave = displaySave.concat(games[this.id].pens[all_key[run]].draw)
      }
      games[this.id].canvas = getCanvas(this.id, displaySave.sort((prevent, current) => {
        return prevent.layer - current.layer
      }), games[this.id].window.width, games[this.id].window.height)
    }
    games[this.id].window.render(games[this.id].window.width, games[this.id].window.height, games[this.id].window.width*4, 'bgra32', games[this.id].canvas.toBuffer('raw'))
  }
  event (name, callback) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (name === undefined || callback === undefined) {
      error('MV', 'name, callback')
    } else if (!['show', 'hide', 'move', 'maximize', 'minimize', 'resize', 'mouseHover', 'mouseLeave'].includes(name)) {
      error('VMB', 'name', 'show, hide, move, maximize, minimize, resize, mouseHover, mouseLeave')
    } else if (typeof callback !== 'function') {
      error('VMBF', 'callback')
    } else {
      let game = this.id
      return new class {
        constructor () {
          this.callback = callback
          this.name = ['show', 'hide', 'move', 'maximize', 'minimize', 'resize', 'hover', 'leave'][['show', 'hide', 'move', 'maximize', 'minimize', 'resize', 'mouseHover', 'mouseLeave'].indexOf(name)]
          this.updater = games[game].window.on(this.name, (data) => {
            if (this.name === 'show' || this.name === 'hide' || this.name === 'maximize' || this.name === 'minimize' || this.name === 'hover' || this.name === 'leave') {
              callback()
            } else if (this.name === 'move' || this.name === 'resize') {
              callback(data)
            }
          })
        }
        stop () {
          this.updater = null
          this.name = null
          this.callback = null
        }
      }
    }
  }
}

module.exports = { WINDOW, createWindow }

const { games, addClassData, updateClassData } = require('../data')
const { error } = require('./Error')
const { displayOperations } = require('./GameCanvas')
const { getCanvas } = require('./Canvas')