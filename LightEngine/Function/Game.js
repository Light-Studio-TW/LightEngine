const path = require('path')

//創建遊戲資料
function createGameData (data) {
  if (data.type === 'sdl') {
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      camera_x: data.camera_x, 
      camera_y: data.camera_y, 
      window: createWindow({ title: data.name, width: data.width, height: data.height}),
      preload_range: data.preload_range,
      display: undefined,
      canvas: {},
      change: true,
      textures: {},
      texture_buffer: [],
      audios: {},
      objects: {},
      groups: {},
      draw: [],
      pen: {
        x: 0,
        y: 0,
        size: 1,
        angle: 0,
        transform: {
          x: 0,
          y: 0
        },
        color: 0,
        font: {font: 'serif', px: 1},
        frame: {color: 'black', size: 1},
        layer: 1
      },
      event: {}
    }
  } else if (data.type === 'canvas') {
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      camera_x: data.camera_x, 
      camera_y: data.camera_y, 
      width: data.width,
      height: data.height,
      preload_range: data.preload_range,
      display: undefined,
      canvas: {},
      change: true,
      textures: {},
      texture_buffer: [],
      audios: {},
      objects: {},
      groups: {},
      draw: [],
      pen: {
        x: 0,
        y: 0,
        size: 1,
        angle: 0,
        transform: {
          x: 0,
          y: 0
        },
        color: 0,
        font: {font: 'serif', px: 1},
        frame: {color: 'black', size: 1},
        layer: 1
      },
      event: {}
    }
  }
}

class CREATE {
  constructor (game) {
    this.id = game
  }
  //創建材質
  async texture (data) {
    if (data.data !== undefined) {
      data = data.data
    } 
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (data === undefined) {
      error('MV', 'data')
    } else {
      if (data.data !== undefined) {
        data = data.data
      }
      if (data.id === undefined) {
        data.id = generateID(Object.keys(games[this.id].textures))
      } else if (games[this.id].textures[data.id] !== undefined) {
        error('DID', data.id)
      }
      if (data.file === undefined) {
        error('OMV', 'file')
      }
      data = defaultValue({
        id: undefined,
        file: undefined
      }, data)
      return new Promise((resolve, reject) => {
        loadImage(data.file).then((image) => {
          games[this.id].textures[data.id] = { 
            id: data.id,
            image: image, 
            width: image.width, 
            height: image.height,
          }
          callEvent(this.id, 'textureCreate', { id: data.id, width: image.width, height: image.height })
          resolve({ id: data.id, width: image.width, height: image.height })
        })
      })
    }
  }
  //創建音頻
  async audio (data) {
    if (data.data !== undefined) {
      data = data.data
    }
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (data === undefined) {
      error('MV', 'data')
    } else {
      if (data.path === undefined) {
        error('OMV', ['data', 'path'])
      }
      if (data.id === undefined) {
        data.id = generateID(Object.keys(games[this.id].objects))
      } else if (games[this.id].audios[data.id] !== undefined) {
        error('DID', data.id)
      }
      data = defaultValue({
        path: undefined,
        channels: 1,
        frequency: 44100,
        format: 'f32',
        start: 0,
        end: undefined,
        volume: 1,
        speed: 1
      }, data)
      games[this.id].audios[data.id] = {
        path: data.path,
        channels: data.channels,
        frequency: data.frequency,
        buffer: await loadAudio(
          path.join(data.path),
          { channels: data.channels, frequency: data.frequency },
          { start: data.start, end: data.end },
          { volume: data.volume, speed: data.speed },
        ),
        start: data.start,
        end: data.end,
        player: undefined,
        volume: data.volume,
        speed: data.speed,
      }
      callEvent(this.id, 'audioCreate', new AUDIO(this.id, data.id))
      return new AUDIO(data.id, this.id)
    }
  }
  //創建物件
  object (data) {
    if (data.data !== undefined) {
      data = data.data
    } 
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (data === undefined) {
      error('MV', 'data')
    } else {
      if (data.texture === undefined) {
        error('OMV', ['data', 'texture'])
      }
      if (data.id === undefined) {
        data.id = generateID(Object.keys(games[this.id].objects))
      } else if (games[this.id].objects[data.id] !== undefined) {
        error('DID', data.id)
      }
      if (data.texture.id !== undefined) {
        data.texture = data.texture.id
      } else if (games[this.id].textures[data.texture] === undefined) {
        error('TNF', data.texture)
      }
      data = defaultValue({
        id: undefined,
        x: 0,
        y: 0,
        texture: undefined, 
        textureBuffer: undefined,
        textureChange: true,
        layer: 1, 
        width: 0,
        height: 0,
        angle: 0, 
        effect: {
          brightness: 0,
          grayscale: 0,
          transparent: 0,
          invert: 0,
          removeBackground: 0,
          blur: 0,
          red: 0,
          green: 0,
          blue: 0
        },
        hitbox: {
          width: 0, 
          height: 0 
        }
      }, data)
      games[this.id].objects[data.id] = data
      callEvent(this.id, 'objectCreate', new OBJECT(data.id, this.id))
      return new OBJECT(data.id, this.id)
    }
  }
  //創建群組
  group (type, items) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (type === undefined) {
      error('MV', 'type')
    } else if (type !== 'object') {
      error('VMB', ['type', 'object'])
    } else {
      if (type === 'object') {
        let objects = []
        let id = ''
        if (items !== undefined) {
          if (!Array.isArray(items)) {
            error('VMBA', 'items')
          } else {
            for (let run = 0; run < items.length; run++) {
              if (items[run].id === undefined) {
                id = items[run]
              } else {
                id = items[run].id
              }
              if (games[this.id].objects[id] === undefined) {
                error('ONF', id)
              } else if (!objects.includes(id)) {
                objects.push(id)
              }
            }
          }
        }
        return new OBJECT_GROUP(this.id, objects)
      }
    }
  }
}

class DELETE {
  constructor (game) {
    this.id = game
  }
  //刪除材質
  texture (texture) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else {
      if (texture === undefined) {
        games[this.id].textures = {}
        callEvent(this.id, 'textureDelete', 'all')
      } else {
        if (texture.id !== undefined) {
          texture = texture.id
        }  
        if (games[this.id].textures[texture] === undefined) {
          error('TNF', texture)
        } else {
          callEvent(this.id, 'textureDelete', texture)
          delete games[this.id].textures[texture]
        }
      }
    }
  }
  //刪除音頻
  audio (audio) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else {
      if (audio === undefined) {
        games[this.id].audios = {}
        callEvent(this.id, 'audioDelete', 'all')
      } else {
        if (audio.id !== undefined) {
          audio = audio.id
        }  
        if (games[this.id].audios[audio] === undefined) {
          error('TNF', audio)
        } else {
          games[this.id].audios[audio].player.close()
          callEvent(this.id, 'audioDelete', audio)
          delete games[this.id].audios[audio]
        }
      }
    }
  }
  //刪除物件
  object (object) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else {
      if (object === undefined) {
        games[this.id].change = true
        games[this.id].objects = {}
        callEvent(this.id, 'objectDelete', 'all')
      } else {
        if (object.id !== undefined) {
          object = object.id
        }  
        if (games[this.id].objects[object] === undefined) {
          error('ONF', object)
        } else {
          games[this.id].change = true
          callEvent(this.id, 'objectDelete', object)
          delete games[this.id].objects[object]
        }
      }
    }
  }
}

class GET {
  constructor (game) {
    this.id = game
  }
  //取得材質
  texture (id) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (games[this.id].textures[id] === undefined) {
      error('TNF', id)
    } else {
      return { id: id, width: games[this.id].textures[id].width, height: games[this.id].textures[id].height }
    }
  }
  //取得音頻
  audio (id) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (games[this.id].audios[id] === undefined) {
      error('ANF', id)
    } else {
      return new AUDIO(id, this.id)
    }
  }
  //取得物件
  object (id) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (games[this.id].objects[id] === undefined) {
      error('ONF', id)
    } else {
      return new OBJECT(id, this.id)
    }
  }
}

class GAME_SDL {
  constructor (data) {
    this.id = data.id
    this.window = new WINDOW(data.id, data.window)
    this.mouse = new MOUSE(data.id)
    this.keyboard = new KEYBOARD(data.id)
    this.create = new CREATE(data.id)
    this.delete = new DELETE(data.id)
    this.get = new GET(data.id)
    this.draw = new DRAW(data.id)
    this.synchronized_value = function () {
      this.name = games[this.id].name
      this.type = games[this.id].type
      this.preload_range = games[this.id].preload_range
    }
    this.synchronized_value()
  }
  //設定預加載範圍
  setPreloadRange (value) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.id].preload_range = value
      this.synchronized_value()
      return value
    }
  }
  //條整預加載範圍
  changePreloadRange (value) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.id].preload_range += value
      this.synchronized_value()
      return games[this.id].preload_range
    }
  }
  //顯示運算
  displayOperations () {
    games[this.id].change = true
    games[this.id].display = (displayOperations(this.id, games[this.id].window.width, games[this.id].window.height).concat(games[this.id].draw)).sort((prevent, current) => {
      return prevent.layer - current.layer
    })
  }
  //聆聽事件
  event (name, callback) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (name === undefined || callback === undefined) {
      error('MV', 'name, callback')
    } else if (typeof callback !== 'function') {
      error('VMBF', 'callback')
    } else {
      if (games[this.id].event[name] === undefined) {
        games[this.id].event[name] = {}
      }
      let all_key = Object.keys(games[this.id].event[name])
      let eventID = generateID(all_key)
      games[this.id].event[name][eventID] = callback
      let game = this.id
      return new class {
        constructor () {
          this.game = game
          this.eventName = name
          this.eventID = eventID
        }
        stop () {
          delete games[this.game].event[this.eventName][this.eventID]
          this.eventName = null
          this.eventID = null
        }
      }
    }
  }
  //呼叫事件
  callEvent(name, value) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (name === undefined) {
      error('MV', 'name')
    } else if (['textureCreate', 'audioCreate', 'objectCreate', 'textureDelete', 'audioDelete', 'objectDelete'].includes(name)) {
      throw new Error(`[Light Engine]: 無法呼叫事件 ${name} (此事件只能由系統發出)`)
    } else {
      callEvent(this.id, name, value)
    }
  }
}

class GAME_CANVAS {
  constructor (data) {
    this.id = data.id
    this.create = new CREATE(data.id)
    this.delete = new DELETE(data.id)
    this.get = new GET(data.id)
    this.draw = new DRAW(data.id)
    this.synchronized_value = function () {
      this.name = games[this.id].name
      this.type = games[this.id].type
      this.width = games[this.id].width
      this.height = games[this.id].height
      this.preload_range = games[this.id].preload_range
    }
    this.synchronized_value()
  }
  //設定遊戲的名稱
  setName (name) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (name === undefined) {
      error('MV', 'name')
    } else {
      games[this.id].name = name
      this.synchronized_value()
      return name
    }
  }
  //設定遊戲的寬度
  setWidth (value) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.id].width = value
      this.synchronized_value()
      return value
    }
  }
  //調整遊戲的寬度
  changeWidth (value) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.id].width =+ value
      this.synchronized_value()
      return games[this.id].width
    }
  }
  //設定遊戲的高度
  setHeight (value) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.id].height = value
      this.synchronized_value()
      return value
    }
  }
  //調整遊戲的高度
  changeHeight (value) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.id].height =+ value
      this.synchronized_value()
      return games[this.id].height
    }
  }
  //設定遊戲的預加載範圍
  setPreloadRange (value) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.id].preload_range = value
      this.synchronized_value()
      return value
    }
  }
  //條整遊戲的預加載範圍
  changePreloadRange (value) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.id].preload_range += value
      this.synchronized_value()
      return games[this.id].preload_range
    }
  }
  //顯示運算
  displayOperations () {
    games[this.id].change = true
    games[this.id].display = (displayOperations(this.id, games[this.id].width, games[this.id].height).concat(games[this.id].draw)).sort((prevent, current) => {
      return prevent.layer - current.layer
    })
  }
  //聆聽事件
  event (name, callback) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (name === undefined || callback === undefined) {
      error('MV', 'name, callback')
    } else if (typeof callback !== 'function') {
      error('VMBF', 'callback')
    } else {
      if (games[this.id].event[name] === undefined) {
        games[this.id].event[name] = {}
      }
      let all_key = Object.keys(games[this.id].event[name])
      let eventID = generateID(all_key)
      games[this.id].event[name][eventID] = callback
      let game = this.id
      return new class {
        constructor () {
          this.game = game
          this.eventName = name
          this.eventID = eventID
        }
        stop () {
          delete games[this.game].event[this.eventName][this.eventID]
          this.eventName = null
          this.eventID = null
        }
      }
    }
  }
  //呼叫事件
  callEvent(name, value) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (name === undefined) {
      error('MV', 'name')
    } else if (['textureCreate', 'audioCreate', 'objectCreate', 'textureDelete', 'audioDelete', 'objectDelete'].includes(name)) {
      throw new Error(`[Light Engine]: 無法呼叫事件 ${name} (此事件只能由系統發出)`)
    } else {
      callEvent(this.id, name, value)
    }
  }
}

//顯示運算
function displayOperations (id, width, height) {
  let display_save = []
  let all_object = Object.keys(games[id].objects)
  let object = {}
  let texture = {}
  for (let run = 0; run < all_object.length; run++) {
    object = games[id].objects[all_object[run]]
    texture = games[id].textures[object.texture]
    if ((object.x-games[id].camera_x)+(texture.width+object.width) > 0-games[id].preload_range && object.x-games[id].camera_x < width+games[id].preload_range) {
      if (object.y+games[id].camera_y > 0-games[id].preload_range && (object.y-games[id].camera_y)-(texture.height+object.height) < height+games[id].preload_range) {
        display_save.push({type: 'object', id: object.id, layer: object.layer})
      }
    }
  }
  return display_save
}

//呼叫事件
async function callEvent (game, name, value) {
  if (games[game].event[name] !== undefined) {
    let all_key = Object.keys(games[game].event[name])
    for (let run = 0; run < all_key.length; run++) {
      games[game].event[name][all_key[run]](value)
    }
  }
}

module.exports = { GAME_SDL, GAME_CANVAS, createGameData, displayOperations }

const { games } = require('../data')
const { error } = require('./Error')
const { defaultValue } = require('./DefaultValue')
const { generateID } = require('./GenerateID')
const { WINDOW, createWindow } = require('./Window')
const { MOUSE } = require('./Mouse')
const { KEYBOARD } = require('./Keyboard')
const { AUDIO, loadAudio } = require('./Audio')
const { OBJECT } = require('./Object')
const { OBJECT_GROUP } = require('./Group')
const { DRAW } = require('./Draw')

//導入node-canvas
try {
  var { loadImage } = require('canvas')
} catch (err) {
  error('MP', ['canvas', 'npm install canvas'])
}