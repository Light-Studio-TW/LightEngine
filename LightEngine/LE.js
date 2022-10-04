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
          preload_range: 50 
        }, data)
        if (typeof data.width !== 'number' || typeof data.height !== 'number' || typeof data.camera_x !== 'number' || typeof data.camera_y !== 'number' || typeof data.preload_range !== 'number' ) {
          error('OVMBN', ['data', 'width, height, camera_x, camera_y, preload_range'])
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

const { DEVICE } = require('./Function/Device')

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
}

module.exports = { LE }

const { games } = require('./data')
const { error } = require('./Function/Error')
const { defaultValue } = require('./Function/DefaultValue')
const { generateID } = require('./Function/GenerateID')
const { getSettings, changeSettings } = require('./Function/Settings')
const { GAME_SDL, GAME_CANVAS, createGameData } = require('./Function/Game')