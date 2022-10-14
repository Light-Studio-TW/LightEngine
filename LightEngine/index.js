const {
  Worker, isMainThread, parentPort, workerData
} = require('node:worker_threads');
new Worker('./LightEngine/Functions/Timer.js')

class CREATE {
  //創建遊戲
  static game (data) {
    if (data === undefined) {
      error('MV', 'data')
    } else {
      if (data.data !== undefined) {
        data = data.data
      }
      if (data.id === undefined) {
        data.id = generateID(Object.keys(games))
      }
      if (data.type === undefined) {
        error('OMV', ['data', 'type'])
      } else if (games[data.id] !== undefined) {
        error('DID', data.id)
      } else {
        data = defaultValue({
          id: undefined, 
          name: 'Game', 
          type: undefined,
          width: 500,
          height: 500,
          camera_x: 0, 
          camera_y: 0, 
          preloadRange: 50 
        }, data)
        if (typeof data.width !== 'number' || typeof data.height !== 'number' || typeof data.camera_x !== 'number' || typeof data.camera_y !== 'number' || typeof data.preloadRange !== 'number' ) {
          error('OVMBN', ['data', 'width, height, camera_x, camera_y, preloadRange'])
        } else if (data.type !== 'sdl' && data.type !== 'canvas') {
          error('OVMB', ['data', 'type', 'sdl, canvas'])
        } else {
          games[data.id] = createGameData(data)
          if (data.type === 'sdl') {
            return new GAME_SDL(games[data.id])
          } else if (data.type === 'canvas') {
            return new GAME_CANVAS(games[data.id])
          }
        }
      }
    }
  }
}

class DELETE {
  static game (game) {
    if (game === undefined) {
      error('MV', 'game')
    } else {
      if (game.id !== undefined) {
        game = game.id
      }
      if (games[game] === undefined) {
        error('GNF', game)
      } else {
        if (games[game].type === 'sdl') {
          games[game].window.destroy()
        }
        delete games[game]
      }
    }
  } 
}

const { DEVICE } = require('./Functions/Device')

let LE = new class {
  constructor () {
    this.create = CREATE
    this.delete = DELETE
    this.device = DEVICE
  }
  //取得設定
  getSettings () {
    return getSettings()
  }
  //取得設定
  changeSettings (settings) {
    if (settings === undefined) {
      error('MV', 'settings')
    } else if (typeof settings !== 'object') {
      error('VMBO', 'settings')
    } else {
      return changeSettings(settings)
    }
  }
  //重複
  repeat (data, func, func2) {
    if (data === undefined || func === undefined) {
      error('MV', 'data, func')
    } else if (typeof func !== 'function') {
      error('VMBF', 'func')
    } else if (func2 !== undefined && typeof func2 !== 'function') {
      error('VMBF', 'func2')
    }
    data = defaultValue({
      time: Infinity,
      interval: 0.1
    }, data)
    return new class {
      constructor () {
        this.repeat = add_repeat(data.time, data.interval, func, func2)
      }
      //停止重複
      stop () {
        this.repeat()
      }
    }
  }
  //等待
  async wait (time, func) {
    if (time === undefined) {
      error('MV', 'time')
    } else if (typeof time !== 'number') {
      error('VMBN', 'time')
    } else if (typeof func !== 'function' && func !== undefined) {
      error('VMBF', 'func')
    } else {
      return new Promise((resolve, reject) => {
        add_wait(time, () => {
          if (func !== undefined) {
            func()
          }
          resolve()
        })
      })
    }
  }
}

module.exports = LE

const { games } = require('./data')
const { error } = require('./Functions/Error')
const { defaultValue } = require('./Functions/DefaultValue')
const { generateID } = require('./Functions/GenerateID')
const { add_repeat, add_wait } = require('./Functions/Timer')
const { getSettings, changeSettings } = require('./Functions/Settings')
const { GAME_SDL, GAME_CANVAS, createGameData } = require('./Functions/Game')