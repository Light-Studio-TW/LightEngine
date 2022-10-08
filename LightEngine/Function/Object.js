class OBJECT {
  constructor (id, game) {
    this.game = game
    this.id = id
    this.effect = new EFFECT(game, id)
    addClassData(game, 'object', id, (data) => {
      this.game = data.game
      this.id = data.id
      this.x = games[data.game].objects[data.id].x
      this.y = games[data.game].objects[data.id].y
      this.texture = games[data.game].objects[data.id].texture
      this.layer = games[data.game].objects[data.id].layer
      this.width = games[data.game].objects[data.id].width
      this.height = games[data.game].objects[data.id].height
      this.angle = games[data.game].objects[data.id].angle
      this.hitbox = games[data.game].objects[data.id].hitbox 
    })
    updateClassData(game, 'object', id)
  }
  //更新
  update () {
    this.x = games[this.game].objects[this.id].x
    this.y = games[this.game].objects[this.id].y
    this.texture = games[this.game].objects[this.id].texture
    this.layer = games[this.game].objects[this.id].layer
    this.width = games[this.game].objects[this.id].width
    this.height = games[this.game].objects[this.id].height
    this.angle = games[this.game].objects[this.id].angle
    this.hitbox = games[this.game].objects[this.id].hitbox 
  }
  //設定物件的位置
  setPosition (x, y) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].x = x
      games[this.game].objects[this.id].y = y
      updateClassData(this.game, 'object', this.id)
      return { x: x, y: y }
    }
  }
  //調整物件的位置
  changePosition (x, y) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].x += x
      games[this.game].objects[this.id].y += y
      updateClassData(this.game, 'object', this.id)
      return { x: games[this.game].objects[this.id].x, y: games[this.game].objects[this.id].y }
    }
  }
  //設定物件的X
  setX (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].x = value
      updateClassData(this.game, 'object', this.id)
      return value
    }
  }
  //設定物件的X
  changeX (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].x += value
      updateClassData(this.game, 'object', this.id)
      return games[this.game].objects[this.id].x
    }
  }
  //設定物件的Y
  setY (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].y = value
      updateClassData(this.game, 'object', this.id)
      return value
    }
  }
  //設定物件的Y
  changeY (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].y += value
      updateClassData(this.game, 'object', this.id)
      return games[this.game].objects[this.id].y
    }
  }
  //設定物件的材質
  setTexture (texture) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (texture === undefined) {
      error('MV', 'texture')
    } else {
      if (texture.id !== undefined) {
        texture = texture.id
      }
      if (games[this.game].textures[texture] === undefined) {
        error('TNF', texture)
      } else {
        games[this.game].change = true
        games[this.game].objects[this.id].textureChange = true
        games[this.game].objects[this.id].texture = texture
        updateClassData(this.game, 'object', this.id)
        return texture
      }
    }
  }
  //設定物件的層
  setLayer (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].layer = value
      updateClassData(this.game, 'object', this.id)
      return value
    }
  }
  //調整物件的層
  changeLayer (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].layer += value
      updateClassData(this.game, 'object', this.id)
      return value
    }
  }
  //設定物件的大小
  setSize (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      let texture = games[this.game].textures[games[this.game].objects[this.id].texture]
      games[this.game].change = true
      if (value > 0) {
        games[this.game].objects[this.id].width = (texture.width/1000)*value
        games[this.game].objects[this.id].height = (texture.height/1000)*value
      } else {
        games[this.game].objects[this.id].width = games[this.game].objects[this.id].width-(texture.width/1000)*(-value)
        games[this.game].objects[this.id].height = games[this.game].objects[this.id].height-(texture.height/1000)*(-value)
      }
      updateClassData(this.game, 'object', this.id)
      return { width: games[this.game].objects[this.id].width, height: games[this.game].objects[this.id].height }
    }
  }
  //設定物件的大小
  changeSize (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      let texture = games[this.game].textures[games[this.game].objects[this.id].texture]
      games[this.game].change = true
      if (value > 0) {
        games[this.game].objects[this.id].width += (texture.width/1000)*value
        games[this.game].objects[this.id].height += (texture.height/1000)*value
      } else {
        games[this.game].objects[this.id].width -= (texture.width/1000)*(-value)
        games[this.game].objects[this.id].height -= (texture.height/1000)*(-value)
      }
      updateClassData(this.game, 'object', this.id)
      games[this.game].objects[this.id].width = Math.round(games[this.game].objects[this.id].width)
      games[this.game].objects[this.id].height = Math.round(games[this.game].objects[this.id].height)
      return { width: games[this.game].objects[this.id].width, heigth: games[this.game].objects[this.id].height }
    }
  }
  //設定物件的寬度
  setWidth (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].width = value
      updateClassData(this.game, 'object', this.id)
      return value
    }
  }
  //更改物件的寬度
  changeWidth (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].width += value
      updateClassData(this.game, 'object', this.id)
      return games[this.game].objects[this.id].width
    }
  }
  //設定物件的寬度
  setHeight (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].height = value
      updateClassData(this.game, 'object', this.id)
      return value
    }
  }
  //更改物件的寬度
  changeHeight (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].height += value
      updateClassData(this.game, 'object', this.id)
      return games[this.game].objects[this.id].height
    }
  }
  //設定物件的角度
  setAngle (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].angle = value
      updateClassData(this.game, 'object', this.id)
      return value
    }
  }
  //更改物件的角度
  changeAngle (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].angle += value
      updateClassData(this.game, 'object', this.id)
      return games[this.game].objects[this.id].angle
    }
  }
  //設定物件的碰撞箱
  setHitbox (width, height) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (width === undefined || height === undefined) {
      error('MV', 'width, height')
    } else if (typeof width !== 'number' || typeof height !== 'number') {
      error('VMBN', 'width, height')
    } else {
      games[this.game].objects[this.id].hitbox.width = width 
      games[this.game].objects[this.id].hitbox.height = height
      updateClassData(this.game, 'object', this.id)
      return { 
        width: width,
        height: height
      }
    }
  }
  //調整物件的碰撞箱
  changeHitbox (width, height) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (width === undefined || height === undefined) {
      error('MV', 'width, height')
    } else if (typeof width !== 'number' || typeof height !== 'number') {
      error('VMBN', 'width, height')
    } else {
      games[this.game].objects[this.id].hitbox.width += width 
      games[this.game].objects[this.id].hitbox.height += height
      updateClassData(this.game, 'object', this.id)
      return { 
        width: games[this.game].objects[this.id].hitbox.width,
        height: games[this.game].objects[this.id].hitbox.height
      }
    }
  }
  //面朝
  facing (data) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (data === undefined) {
      error('MV', 'data')
    } else if (data.object === undefined && data.x === undefined && data.y === undefined) {
      throw new Error('Light Engine]: 物件data缺少參數(必須傳入至少一個以上的參數) {object, x, y}')
    } else if ((data.x !== undefined || data.y !== undefined) && data.object !== undefined) {
      throw new Error('Light Engine]: 物件data參數重複(x, y和object只能傳入一種)')
    } else {
      let angle = 0
      if (data.object === undefined) {
        angle = Math.atan2(data.y - this.y, data.x - this.x) / Math.PI * 180
      } else {
        let object = {}
        if (data.object.id === undefined) {
          object = games[this.game].objects[data.object]
        } else {
          object = data.object
        }
        if (games[this.game].objects[object.id] === undefined) {
          error('ONF', object.id)
        }
        angle = Math.atan2(object.y - this.y, object.x - this.x) / Math.PI * 180
      }
      games[this.game].objects[this.id].angle = angle
      updateClassData(this.game, 'object', this.id)
      return angle
    }
  }
  //移動
  move (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.id].x += value * Math.cos(games[this.game].objects[this.id].angle * Math.PI / 180)
      games[this.game].objects[this.id].y += value * Math.sin(games[this.game].objects[this.id].angle * Math.PI / 180)
      updateClassData(this.game, 'object', this.id)
      return { x: games[this.game].objects[this.id].x, y: games[this.game].objects[this.id].y }
    }
  }
  //前往
  travelTo (x, y, time) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (x === undefined || y === undefined || time === undefined) {
      error('MV', 'x, y, time')
    } else if (typeof x !== 'number' || typeof y !== 'number' || typeof time !== 'number') {
      error('VMBN', 'x, y, time')
    } else {
      let x_change = (x-games[this.game].objects[this.id].x)/time
      let y_change = (y-games[this.game].objects[this.id].y)/time
      let run = 0
      return new Promise((resolve, reject) => {
        let repeat_ = LE.repeat({ time: time, interval: 10 }, () => {
          if (games[this.game] === undefined || games[this.game].objects[this.id] === undefined) {
            repeat_.stop()
          } else {
            games[this.game].change = true
            games[this.game].objects[this.id].x += x_change*10
            games[this.game].objects[this.id].y += y_change*10
            updateClassData(this.game, 'object', this.id)
          }
        }, () => {
          resolve()
        })
      })
    }
  }
  //碰到
  touch (type, data) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.id] === undefined) {
      error('ONF', this.id)
    } else if (type === undefined) {
      error('MV', 'type')
    } else {
      if (games[this.game].type === 'sdl') {
        if (type !== 'object' && type !== 'objectGroup' && type !== 'mouse') {
          error('VMB', ['type', 'object, objectGroup, mouse'])
        } else {
          if (type === 'object') {
            if (data.id !== undefined) {
              data = data.id
            }
            if (data === undefined) {
              error('MV', 'object')
            } else if (games[this.game].objects[data] === undefined) {
              error('OBNF', ['data', data])
            } else {
              return ObjectTouchObject(this.game, this.id, data)
            }
          } else if (type === 'objectGroup') {
            if (data === undefined) {
              error('MV', 'objectGroup')
            } else {
              return ObjectGroupTouchObject(this.game, data.objects, this.id)
            }
          } else if (type === 'mouse') {
            let mouse = getPosition(this.game)
            return ObjectTouchPoint(this.game, this.id, mouse.x, mouse.y)
          }
        }
      } else if (games[this.game].type === 'canvas') {
        if (type === 'object') {
          if (data.id !== undefined) {
            data = data.id
          }
          if (data === undefined) {
            error('OMV', ['data', 'object'])
          } else if (games[this.game].objects[data] === undefined) {
            error('OBNF', ['data', data])
          } else {
            return ObjectTouchObject(this.game, this.id, data)
          }
        }
      }
    } 
  }
}

module.exports = { OBJECT }

const { games, addClassData, updateClassData } = require('../data')
const { error } = require('./Error')
const { getPosition } = require('./Mouse')
const { LE } = require('../index')
const { ObjectTouchObject, ObjectTouchPoint, ObjectGroupTouchObject } = require('./Hitbox')
const { EFFECT } = require('./Effect')
