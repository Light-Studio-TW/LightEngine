//創建視窗
function createWindow (data) {
  loadPackages()
  return sdl.video.createWindow(data)
}

class WINDOW {
  constructor (id) {
    this.id = id
    this.synchronized_value = function () {
      this.title = games[this.id].window.title
      this.x = games[this.id].window.x
      this.y = games[this.id].window.y
      this.width = games[this.id].window.width
      this.height = games[this.id].window.height
      this.resizable = games[this.id].window.resizable
      this.fullscreen = games[this.id].window.fullscreen
      this.maximized = games[this.id].window.maximized
      this.minimized = games[this.id].window.minimized
      this.visible = games[this.id].window.visible
      this.borderless = games[this.id].window.borderless
    }
    this.updater = function () {
      setInterval(() => {
        this.width = games[this.id].window.width
        this.height = games[this.id].window.height
      }, 10)
    }
    this.updater()
    this.synchronized_value()
  }
  //設定標題
  setTitle (title) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (title === undefined) {
      error('MV', 'title')
    } else {
      games[this.id].window.setTitle(title)
      games[this.id].name = title
      this.synchronized_value()
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
      this.synchronized_value()
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
      this.synchronized_value()
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
      this.synchronized_value()
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
      this.synchronized_value()
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
      this.synchronized_value()
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
      this.synchronized_value()
      return boolean
    }
  }
  //最大化
  maximize () {
    games[this.id].change = true
    games[this.id].window.maximize()
    this.synchronized_value()
  }
  //最小化
  minimize () {
    games[this.id].change = true
    games[this.id].window.maximize()
    this.synchronized_value()
  }
  //顯示
  show (boolean) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (boolean === undefined) {
      error('MV', 'boolean')
    } else if (typeof boolean !== 'boolean') {
      error('VMBB', 'boolean')
    } else {
      games[this.id].window.show(boolean)
      this.synchronized_value()
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
      this.synchronized_value()
      return boolean
    }
  }
  //顯示
  display () {
    if (games[this.id].change) {
      games[this.id].change = false
      if (games[this.id].display === undefined) {
        games[this.id].display = (displayOperations(this.id, games[this.id].window.width))
      }
      games[this.id].canvas = getCanvas(this.id, games[this.id].display.concat(games[this.id].draw).sort((prevent, current) => {
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
      error('VMB', 'name', 'move, buttonDown, buttonUp, wheel')
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

const { games } = require('../data')
const { error } = require('./Error')
const { displayOperations } = require('./Game')
const { getCanvas } = require('./Canvas')

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