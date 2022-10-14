class DRAW {
  constructor (game) {
    this.game = game
    addClassData(game, 'draw', game, () => {
      this.x = games[this.game].pen.x
      this.y = games[this.game].pen.y
      this.angle = games[this.game].pen.angle
      this.transform = games[this.game].pen.transform
      this.size = games[this.game].pen.size
      this.color = games[this.game].pen.color
      this.font = games[this.game].pen.font
      this.frame = games[this.game].pen.frame
      this.layer = games[this.game].pen.layer
    })
    updateClassData(game, 'draw', game)
  }
  //清除所有畫
  clear (type){
    let quality = 0
    if (type === undefined || type === 'all') {
      games[this.game].change = true
      quality = games[this.game].draw.length
      games[this.game].draw = []
    } else if (type === 'line') {
      games[this.game].change = true
      for (let run = 0; run < games[this.game].draw.length; run++) {
        if (games[this.game].draw[run].type === 'line') {
          quality++
          games[this.game].draw.splice(run, 1)
        }
      }
    } else if (type === 'square') {
      games[this.game].change = true
      for (let run = 0; run < games[this.game].draw.length; run++) {
        if (games[this.game].draw[run].type === 'square') {
          quality++
          games[this.game].draw.splice(run, 1)
        }
      }
    } else if (type === 'text') {
      games[this.game].change = true
      for (let run = 0; run < games[this.game].draw.length; run++) {
        if (games[this.game].draw[run].type === 'text') {
          quality++
          games[this.game].draw.splice(run, 1)
        }
      }
    } else if (type === 'image') {
      games[this.game].change = true
      for (let run = 0; run < games[this.game].draw.length; run++) {
        if (games[this.game].draw[run].type === 'image') {
          quality++
          games[this.game].draw.splice(run, 1)
        }
      }
    } else {
      throw new Error(`[Light Engine]: 找不到清除類型 ${type}`)
    }
    return quality
  }
  //設定顏色
  setColor (color) {
    if (color === undefined) {
      error('MV', 'color')
    } else {
      games[this.game].pen.color = color
      updateClassData(this.game, 'draw', this.game)
      return color
    }
  }
  //設定大小
  setSize (value) {
    if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].pen.size = value
      updateClassData(this.game, 'draw', this.game)
    }
  }
  //設定位置翻譯
  setTransform (x, y) {
    if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.game].pen.transform = {
        x: x,
        y: y
      }
      updateClassData(this.game, 'draw', this.game)
      return { x: x, y: y }
    }
  }
  //設定角度
  setAngle (value) {
    if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].pen.angle = value
      updateClassData(this.game, 'draw', this.game)
      return value
    }
  }
  //調整角度
  changeAngle (value) {
    if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].pen.angle+=value
      updateClassData(this.game, 'draw', this.game)
    }
  }
  //設定外誆
  setFrame (color, size) {
    if (color === undefined || size === undefined) {
      error('MV', 'color, size')
    } else {
      games[this.game].pen.frame = {
        color: color,
        size: size
      }
      updateClassData(this.game, 'draw', this.game)
      return { color: color, size: size }
    }
  }
  //將最新的Draw加上框框
  addFrame () {
    games[this.game].draw[games[this.game].draw.length-1].frame = games[this.game].pen.frame
  }
  //設定層
  setLayer (value) {
    if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].pen.layer = value
      updateClassData(this.game, 'draw', this.game)
    }
  }
  //設定字體
  setFont (font) {
    if (font === undefined) {
      error('MV', 'font')
    } else {
      games[this.game].pen.font = font
      updateClassData(this.game, 'draw', this.game)
      return font
    }
  }
  //移動到
  moveTo (x, y) {
    if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.game].pen.x = x
      games[this.game].pen.y = y
      updateClassData(this.game, 'draw', this.game)
    }
  }
  //移動到
  lineTo (x, y) {
    if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.game].change = true
      games[this.game].draw.push({
        type: 'line',
        x: games[this.game].pen.x,
        y: games[this.game].pen.y,
        x2: x,
        y2: y,
        color: games[this.game].pen.color,
        size: games[this.game].pen.size,
        layer: games[this.game].pen.layer
      })
      games[this.game].pen.x = x
      games[this.game].pen.y = y
      updateClassData(this.game, 'draw', this.game)
    }
  }
  //正方形
  square (x, y, x2, y2) {
    if (x === undefined || y === undefined || x2 === undefined || y2 === undefined) {
      error('MV', 'x, y, x2, y2')
    } else if (typeof x !== 'number' || typeof y !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number') {
      error('VMBN', 'x, y, x2, y2')
    } else {
      games[this.game].change = true
      games[this.game].draw.push({
        type: 'square',
        x: x,
        y: y,
        x2: x2,
        y2: y2,
        angle: games[this.game].pen.angle,
        transform: games[this.game].pen.transform,
        color: games[this.game].pen.color,
        frame: undefined,
        layer: games[this.game].pen.layer
      })
    }
  }
  //圓形
  circle (x, y) {
    if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.game].change = true
      games[this.game].draw.push({
        type: 'circle',
        x: x,
        y: y,
        color: games[this.game].pen.color,
        size: games[this.game].pen.size,
        frame: undefined,
        layer: games[this.game].pen.layer
      })
    }
  }
  //圖型
  image (texture, x, y, width, height) {
    if (texture.id !== undefined) {
      texture = texture.id
    }
    if (texture === undefined || x === undefined || y === undefined || width === undefined || height === undefined) {
      error('MV', 'x, y, width, height')
    } else if (typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number' || typeof height !== 'number') {
      error('VMBN', 'x, y, width, height')
    } else if (games[this.game].textures[texture] === undefined) {
      error('TNF', texture)
    } else {
      games[this.game].change = true
      games[this.game].draw.push({
        type: 'image',
        texture: texture,
        x: x,
        y: y,
        width: width,
        height: height,
        angle: games[this.game].pen.angle,
        transform: games[this.game].pen.transform,
        layer: games[this.game].pen.layer
      })
    }
  }
  //文字
  text (text, x, y, align) {
    if (text === undefined || x === undefined || y === undefined) {
      error('MV', 'text, x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else if ((align !== undefined) && (align !== 'left' && align !== 'right' && align !== 'center')) {
      error('VMB', 'left, right, center')
    } else {
      games[this.game].change = true
      if (align === undefined) {
        align = 'left'
      }
      games[this.game].draw.push({
        type: 'text',
        text: text,
        align: align,
        x: x,
        y: y,
        angle: games[this.game].pen.angle,
        transform: games[this.game].pen.transform,
        color: games[this.game].pen.color,
        size: games[this.game].pen.size,
        font: games[this.game].pen.font,
        frame: undefined,
        layer: games[this.game].pen.layer
      })
    }
  }
}

module.exports = { DRAW }

const { games, addClassData, updateClassData } = require('../data')
const { error } = require('./Error')