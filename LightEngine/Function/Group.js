class OBJECT_GROUP {
  constructor (game, objects) {
    this.game = game,
    this.objects = objects
    this.updater = function () {
      return objects
    }
    this.effect = new OBJECT_GROUP_EFFECT(game, this.updater)
    this.checkObjects = function () {
      for (let run = 0; run < this.objects.length; run++) {
        if (games[this.game].objects[this.objects[run]] === undefined) {
          this.objects.splice(run, 1)
          run--
        }
      }
    }
  }
  //添加物件
  addObject (object) {
    if (object.id !== undefined) {
      object = object.id
    }
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (object === undefined) {
      error('MV', 'object')
    } else if (games[this.game].objects[object] === undefined) {
      error('ONF', object)
    } else {
      this.objects.push(object)
    }
  }
  //設定物件的位置
  setPosition (x, y) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      this.checkObjects()
      games[this.game].change = true
      setObjectsData(this.game, this.objects, {x: x, y: y})
      return { x: x, y: y }
    }
  }
  //調整物件的位置
  changePosition (x, y) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      this.checkObjects()
      games[this.game].change = true
      changeObjectsData(this.game, this.objects, {x: x, y: y})
      return { x: x, y: y }
    }
  }
  //設定物件的X
  setX (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      setObjectsData(this.game, this.objects, {x: value})
      return value
    }
  }
  //設定物件的X
  changeX (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      changeObjectsData(this.game, this.objects, {x: value})
      return value
    }
  }
  //設定物件的Y
  setY (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      setObjectsData(this.game, this.objects, {y: value})
      return value
    }
  }
  //設定物件的Y
  changeY (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      changeObjectsData(this.game, this.objects, {y: value})
      return value
    }
  }
  //設定物件的材質
  setTexture (texture) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (texture === undefined) {
      error('MV', 'texture')
    } else {
      this.checkObjects()
      if (texture.id !== undefined) {
        texture = texture.id
      }
      if (games[this.game].textures[texture] === undefined) {
        error('TNF', texture)
      } else {
        games[this.game].change = true
        setObjectsData(this.game, this.objects, {texture: texture})
        return texture
      }
    }
  }
  //設定物件的層
  setLayer (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      setObjectsData(this.game, this.objects, {layer: value})
      return value
    }
  }
  //調整物件的層
  changeLayer (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      changeObjectsData(this.game, this.objects, {layer: value})
      return value
    }
  }
  //設定物件的大小
  setSize (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      let texture = games[this.game].textures[games[this.game].objects[this.id].texture]
      games[this.game].change = true
      if (value > 0) {
        for (let run = 0; run < this.objects.length; run++) {
          games[this.game].objects[this.objects[run]].width = (texture.width/1000)*value
          games[this.game].objects[this.objects[run]].height = (texture.height/1000)*value
          updateClassData(this.game, 'object', this.objects[run])
        }
      } else {
        for (let run = 0; run < this.objects.length; run++) {
          games[this.game].objects[this.objects[run]].width = games[this.game].objects[this.objects[run]].width-(texture.width/1000)*(-value)
          games[this.game].objects[this.objects[run]].height = games[this.game].objects[this.objects[run]].height-(texture.height/1000)*(-value)
          updateClassData(this.game, 'object', this.objects[run])
        }
      }
      return value
    }
  }
  //設定物件的大小
  changeSize (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      let texture = games[this.game].textures[games[this.game].objects[this.id].texture]
      games[this.game].change = true
      games[this.game].objects[this.id].textureChange = true
      if (value > 0) {
        for (let run = 0; run < this.objects.length; run++) {
          games[this.game].objects[this.objects[run]].width += (texture.width/1000)*value
          games[this.game].objects[this.objects[run]].height += (texture.height/1000)*value
          updateClassData(this.game, 'object', this.objects[run])
        }
      } else {
        for (let run = 0; run < this.objects.length; run++) {
          games[this.game].objects[this.objects[run]].width -= (texture.width/1000)*value
          games[this.game].objects[this.objects[run]].height -= (texture.height/1000)*value
          updateClassData(this.game, 'object', this.objects[run])
        }
      }
      return value
    }
  }
  //設定物件的寬度
  setWidth (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      setObjectsData(this.game, this.objects, {width: value})
      return value
    }
  }
  //更改物件的寬度
  changeWidth (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      changeObjectsData(this.game, this.objects, {width: value})
      return value
    }
  }
  //設定物件的寬度
  setHeight (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      setObjectsData(this.game, this.objects, {height: value})
      return value
    }
  }
  //更改物件的寬度
  changeHeight (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      changeObjectsData(this.game, this.objects, {height: value})
      return games[this.game].objects[this.id].height
    }
  }
  //設定物件的角度
  setAngle (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      setObjectsData(this.game, this.objects, {angle: value})
      return value
    }
  }
  //更改物件的角度
  changeAngle (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      changeObjectsData(this.game, this.objects, {angle: value})
      return value
    }
  }
  //設定物件的碰撞箱
  setHitbox (width, height) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (width === undefined || height === undefined) {
      error('MV', 'width, height')
    } else if (typeof width !== 'number' || typeof height !== 'number') {
      error('VMBN', 'width, height')
    } else {
      this.checkObjects()
      setObjectsData(this.game, this.objects, {hitbox: { width: width, height: height }})
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
    } else if (width === undefined || height === undefined) {
      error('MV', 'width, height')
    } else if (typeof width !== 'number' || typeof height !== 'number') {
      error('VMBN', 'width, height')
    } else {
      this.checkObjects()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].hitbox.width += width 
        games[this.game].objects[this.objects[run]].hitbox.height += height
        updateClassData(this.game, 'object', this.objects[run])
      }
      return { 
        width: width,
        height: height
      }
    }
  }
  //面朝
  facing (data) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (data === undefined) {
      error('MV', 'data')
    } else if (data.object === undefined && data.x === undefined && data.y === undefined) {
      throw new Error('Light Engine]: 物件data缺少參數(必須傳入至少一個以上的參數) {object, x, y}')
    } else if ((data.x !== undefined || data.y !== undefined) && data.object !== undefined) {
      throw new Error('Light Engine]: 物件data參數重複(x, y和object只能傳入一種)')
    } else {
      this.checkObjects()
      if (data.object === undefined) {
        games[this.game].change = true
        for (let run = 0; run < this.objects.length; run++) {
          games[this.game].objects[this.objects[run]].angle = Math.atan2(data.y - games[this.game].objects[this.objects[run]].y, data.x - games[this.game].objects[this.objects[run]].x) / Math.PI * 180
          updateClassData(this.game, 'object', this.objects[run])
        }
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
        games[this.game].change = true
        for (let run = 0; run < this.objects.length; run++) {
          games[this.game].objects[this.objects[run]].angle = Math.atan2(object.y - games[this.game].objects[this.objects[run]].y, object.x - games[this.game].objects[this.objects[run]].x) / Math.PI * 180
          updateClassData(this.game, 'object', this.objects[run])
        }
      } 
      return data
    }
  }
  //移動
  move (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      this.checkObjects()
      games[this.game].change = true
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].x += value * Math.cos(games[this.game].objects[this.objects[run]].angle * Math.PI / 180)
        games[this.game].objects[this.objects[run]].y += value * Math.sin(games[this.game].objects[this.objects[run]].angle * Math.PI / 180)
        updateClassData(this.game, 'object', this.objects[run])
      }
      return value
    }
  }
  //前往
  travelTo (x, y, time) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (x === undefined || y === undefined || time === undefined) {
      error('MV', 'x, y, time')
    } else if (typeof x !== 'number' || typeof y !== 'number' || typeof time !== 'number') {
      error('VMBN', 'x, y, time')
    } else {
      this.checkObjects()
      let x_change = [], y_change = []
      for (let run = 0; run < this.objects.length; run++) {
        x_change.push((x-games[this.game].objects[this.objects[run]].x)/time)
        y_change.push((y-games[this.game].objects[this.objects[run]].y)/time)
      }
      let run = 0
      return new Promise((resolve, reject) => {
        let repeat_interval = setInterval(() => {
          if (run > time) {
           clearInterval(repeat_interval)
           resolve()
          } else {
            if (games[this.game] === undefined) {
              clearInterval(repeat_interval)
            } else {
              games[this.game].change = true
              for (let run = 0; run < this.objects.length; run++) {
                games[this.game].objects[this.objects[run]].x += x_change[run]*10
                games[this.game].objects[this.objects[run]].y += y_change[run]*10
                updateClassData(this.game, 'object', this.objects[run])
              }
            }
            run+=10
          }
        }, 10)
      })
    }
  }
  //碰到
  touch (type, data) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (type === undefined) {
      error('MV', 'type')
    } else {
      this.checkObjects()
      if (games[this.game].type === 'sdl') {
        if (type !== 'object' && type !== 'mouse') {
          error('VMB', ['type', 'object, mouse'])
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
              return ObjectGroupTouchObject(this.game, this.objects, data)
            }
          } else if (type === 'mouse') {
            let mouse = getPosition(this.game)
            return ObjectGroupTouchPoint(this.game, this.objects, mouse.x, mouse.y)
          } else {
            error('VMB', ['type', 'object, mouse'])
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
            return ObjectGroupTouchObject(this.game, this.objects, data)
          }
        } else {
          error('VMB', ['type', 'object'])
        }
      }
    } 
  }
}

class OBJECT_GROUP_EFFECT {
  constructor (game, updater) {
    this.game = game
    this.objects = updater()
    this.updater = function () {
      this.objects = updater()
    }
  }
  //設定亮度
  setBrightness (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      if (value < -100) {
        value = -100
      } else if (value > 100) {
        value = 100
      }
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.brightness = value
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //調整亮度
  changeBrightness (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.brightness += value
        if (games[this.game].objects[this.objects[run]].effect.brightness < -100) {
          games[this.game].objects[this.objects[run]].effect.brightness = -100
        } else if (games[this.game].objects[this.objects[run]].effect.brightness > 100) {
          games[this.game].objects[this.objects[run]].effect.brightness = 100
        }
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //設定灰度
  setGrayscale (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      if (value < 0) {
        value = 0
      } else if (value > 100) {
        value = 100
      }
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.grayscale = value
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //調整灰度
  changeGrayscale (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.grayscale += value
        if (games[this.game].objects[this.objects[run]].effect.grayscale < 0) {
          games[this.game].objects[this.objects[run]].effect.grayscale = 0
        } else if (games[this.game].objects[this.objects[run]].effect.grayscale > 100) {
          games[this.game].objects[this.objects[run]].effect.grayscale = 100
        }
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //設定透明度
  setTransparent (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.object] === undefined) {
      error('ONF', this.object)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      if (value < 0) {
        value = 0
      } else if (value > 100) {
        value = 100
      }
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.transparent = value
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //調整透明度
  changeTransparent (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].objects[this.object] === undefined) {
      error('ONF', this.object)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.transparent += value
        if (games[this.game].objects[this.objects[run]].effect.transparent < 0) {
          games[this.game].objects[this.objects[run]].effect.transparent = 0
        } else if (games[this.game].objects[this.objects[run]].effect.transparent > 100) {
          games[this.game].objects[this.objects[run]].effect.transparent = 100
        }
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //設定色調返轉
  setInvert (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].objects[this.object].textureChange = true
      if (value < 0) {
        value = 0
      } else if (value > 100) {
        value = 100
      }
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.invert = value
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //調整色調返轉
  changeInvert (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.invert += value
        if (games[this.game].objects[this.objects[run]].effect.invert < 0) {
          games[this.game].objects[this.objects[run]].effect.invert = 0
        } else if (games[this.game].objects[this.objects[run]].effect.invert > 100) {
          games[this.game].objects[this.objects[run]].effect.invert = 100
        }
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //設定去背等級
  setRemoveBackground (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      if (value < 0) {
        value = 0
      }
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.removeBackground = value
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //調整去背等級
  changeRemoveBackground (value) {
    if (games[this.game] === undefined) {
     error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.removeBackground += value
        if (games[this.game].objects[this.objects[run]].effect.removeBackground < 0) {
          games[this.game].objects[this.objects[run]].effect.removeBackground = 0
        }
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //設定紅值
  setRed (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      if (value < -255) {
        value = -255
      } else if (value > 255) {
        value = 255
      }
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.red = value
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //調整紅值
  changeRed (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.red += value
        if (games[this.game].objects[this.objects[run]].effect.red < -255) {
          games[this.game].objects[this.objects[run]].effect.red = -255
        } else if (games[this.game].objects[this.objects[run]].effect.red > 255) {
          games[this.game].objects[this.objects[run]].effect.red = 255
        }
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //設定綠值
  setGreen (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      if (value < -255) {
        value = -255
      } else if (value > 255) {
        value = 255
      }
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.green = value
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //調整綠值
  changeGreen (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.green += value
        if (games[this.game].objects[this.objects[run]].effect.green < -255) {
          games[this.game].objects[this.objects[run]].effect.green = -255
        } else if (games[this.game].objects[this.objects[run]].effect.green > 255) {
          games[this.game].objects[this.objects[run]].effect.green = 255
        }
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //設定藍值
  setBlue (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      if (value < -255) {
        value = -255
      } else if (value > 255) {
        value = 255
      }
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.blue = value
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
  //調整藍值
  changeBlue (value) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      this.updater()
      for (let run = 0; run < this.objects.length; run++) {
        games[this.game].objects[this.objects[run]].textureChange = true
        games[this.game].objects[this.objects[run]].effect.blue += value
        if (games[this.game].objects[this.objects[run]].effect.blue < -255) {
          games[this.game].objects[this.objects[run]].effect.blue = -255
        } else if (games[this.game].objects[this.objects[run]].effect.blue > 255) {
          games[this.game].objects[this.objects[run]].effect.blue = 255
        }
        updateClassData(this.game, 'effect', this.objects[run])
      }
      return value
    }
  }
}

//設定群組裡物件的資料
function setObjectsData (game, objects, data) {
  let all_key = Object.keys(data)
  for (let run = 0; run < objects.length; run++) {
    for (let run2 = 0; run2 < all_key.length; run2++) {
      games[game].objects[objects[run]][all_key[run2]] = data[all_key[run2]]
    }
    updateClassData(game, 'object', objects[run])
  }
}

//調整群組裡物件的資料
function changeObjectsData (game, objects, data) {
  let all_key = Object.keys(data)
  for (let run = 0; run < objects.length; run++) {
    for (let run2 = 0; run2 < all_key.length; run2++) {
      games[game].objects[objects[run]][all_key[run2]] += data[all_key[run2]]
    }
    updateClassData(game, 'object', objects[run])
  }
}

module.exports = { OBJECT_GROUP }

const { games, updateClassData } = require('../data')
const { error } = require('./Error')
const { getPosition } = require('./Mouse')
const { ObjectGroupTouchObject, ObjectGroupTouchPoint} = require('./Hitbox')