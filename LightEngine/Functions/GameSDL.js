const path = require('path')

//導入canvas
const { loadPackage, checkPackage } = require('./PackageManager')
let loadImage = checkPackage('canvas')

//創建遊戲資料
function createSDLGameData (data) {
  loadPackage('canvas')
  loadPackage('@kmamal/sdl')
  loadPackage('ffmpeg-static')
  loadImage = checkPackage('canvas').loadImage
  return {
    id: data.id,
    name: data.name,
    type: data.type,
    camera_x: data.camera_x, 
    camera_y: data.camera_y, 
    window: createWindow({ title: data.name, width: data.width, height: data.height}),
    preloadRange: data.preloadRange,
    display: undefined,
    canvas: {},
    change: true,
    textures: {},
    texture_buffer: [],
    audios: {},
    objects: {},
    groups: {},
    draw: [],
    pens: {},
    event: {},
    input: {
      openStatus: false,
      text: '',
      textWidth: 0
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
        id: undefined,
        path: undefined,
        channels: 1,
        frequency: 44100,
        format: 'f32',
        start: 0,
        end: undefined,
        volume: 1,
        speed: 1
      }, data)
      if (typeof data.channels !== 'number' || typeof data.frequency !== 'number' || typeof data.start !== 'number' || (typeof data.end !== 'number' && data.end !== undefined) || typeof data.volume !== 'number' || typeof data.speed !== 'number') {
        error('OVMBN', ['data', 'channels, frequency, start, end, volume, speed'])
      }
      return new Promise(async (reslove, reject) => {
        games[this.id].audios[data.id] = {
          path: data.path,
          channels: data.channels,
          frequency: data.frequency,
          buffer: await loadAudio(
            path.join(data.path),
            { channels: data.channels, frequency: data.frequency },
            { start: data.start, end: data.end },
            { volume: data.volume, speed: data.speed }
          ),
          start: data.start,
          end: data.end,
          player: undefined,
          volume: data.volume,
          speed: data.speed,
        }
        callEvent(this.id, 'audioCreate', new AUDIO(this.id, data.id))
        reslove(new AUDIO(data.id, this.id))
      })
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
        effect: createEffectData(),
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
  //畫筆
  pen (id) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else {
      if (id === undefined) {
        id = generateID(Object.keys(games[this.id].pens))
      }
      games[this.id].pens[id] = {
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
        layer: 1,
        draw: []
      }
      return new PEN(this.id, id)
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
  //刪除畫筆
  pen (pen) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else {
      if (pen === undefined) {
        games[this.id].change = true
        games[this.id].pens = {}
        callEvent(this.id, 'objectDelete', 'all')
      } else {
        if (pen.id !== undefined) {
          pen = pen.id
        }  
        if (games[this.id].pens[pen] === undefined) {
          error('PNF', pen)
        } else {
          games[this.id].change = true
          callEvent(this.id, 'penDelete', pen)
          delete games[this.id].pens[pen]
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
  //取得畫筆
  pen (id) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (games[this.id].pens[id] === undefined) {
      error('PNF', id)
    } else {
      return new PEN(this.game, id)
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
    this.input = new INPUT(data.id)
    addClassData(data.id, 'game', data.id, () => {
      this.name = games[this.id].name
      this.type = games[this.id].type
      this.preloadRange = games[this.id].preloadRange
    })
    updateClassData(data.id, 'game', data.id)
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
      games[this.id].preloadRange = value
      updateClassData(this.id, 'game', this.id)
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
      games[this.id].preloadRange += value
      updateClassData(this.id, 'game', this.id)
      return games[this.id].preloadRange
    }
  }
  //取得顏色
  getColor(x, y) {
    if (games[this.id] === undefined) {
      error('GNF', this.id)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
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
      let buffer = games[this.id].canvas.toBuffer('raw')
      let row = x+(y*games[this.id].window.width)
      return { r: buffer[row], g: buffer[row+1], b: buffer[row+2], a: buffer[row+3] }
    }
  }
  //顯示運算
  displayOperations () {
    games[this.id].change = true
    games[this.id].display = (displayOperations(this.id, games[this.id].window.width, games[this.id].window.height).sort((prevent, current) => {
      return prevent.layer - current.layer
    }))
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
  let all_key = Object.keys(games[id].objects)
  let object
  let texture
  for (let run = 0; run < all_key.length; run++) {
    object = games[id].objects[all_key[run]]
    texture = games[id].textures[object.texture]
    if ((object.x-games[id].camera_x)+(texture.width+object.width) >= 0-games[id].preloadRange && object.x-games[id].camera_x <= width+games[id].preloadRange) {
      if (object.y+games[id].camera_y >= 0-games[id].preloadRange && (object.y-games[id].camera_y)-(texture.height+object.height) <= height+games[id].preloadRange) {
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
    return all_key
  }
}

module.exports = { GAME_SDL, createSDLGameData, displayOperations }

const { games, addClassData, updateClassData } = require('../data')
const { error } = require('./Error')
const { defaultValue } = require('./DefaultValue')
const { generateID } = require('./GenerateID')
const { createEffectData } = require('./Effect')
const { getCanvas } = require('./Canvas')
const { WINDOW, createWindow } = require('./Window')
const { MOUSE } = require('./Mouse')
const { KEYBOARD } = require('./Keyboard')
const { AUDIO, loadAudio } = require('./Audio')
const { OBJECT } = require('./Object')
const { OBJECT_GROUP } = require('./Group')
const { PEN } = require('./pen')
const { INPUT } = require('./Input') 