class PEN {
  constructor (game, id) {
    this.game = game
    this.id = id
    this.draw = new DRAW(game, id)
    addClassData(game, 'pen', id, (data) => {
      this.x = games[data.game].pens[data.id].x,
      this.y = games[data.game].pens[data.id].y,
      this.size = games[data.game].pens[data.id].size,
      this.angle = games[data.game].pens[data.id].angle,
      this.transform = games[data.game].pens[data.id].transform,
      this.color = games[data.game].pens[data.id].color,
      this.font = games[data.game].pens[data.id].font
      this.frame = games[data.game].pens[data.id].frame
      this.layer = games[data.game].pens[data.id].layer
    })
    updateClassData(game, 'pen', id)
  }
  //清除所有畫
  clear (type) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    }
    let quantity = 0
    if (type === undefined || type === 'all') {
      quantity = games[this.game].pens[this.id].draw.length
    } else if (type === 'line') {
      for (let run = 0; run < games[this.game].pens[this.id].draw.length; run++) {
        if (games[this.game].pens[this.id].draw[run].type === 'line') {
          games[this.game].pens[this.id].draw.splice(run, 1)
          run--
          quantity++
        }
      }
    } else if (type === 'square') {
      for (let run = 0; run < games[this.game].pens[this.id].draw.length; run++) {
        if (games[this.game].pens[this.id].draw[run].type === 'square') {
          games[this.game].pens[this.id].draw.splice(run, 1)
          run--
          quantity++
        }
      }
    } else if (type === 'circle') {
      for (let run = 0; run < games[this.game].pens[this.id].draw.length; run++) {
        if (games[this.game].pens[this.id].draw[run].type === 'circle') {
          games[this.game].pens[this.id].draw.splice(run, 1)
          run--
          quantity++
        }
      }
    } else if (type === 'image') {
      for (let run = 0; run < games[this.game].pens[this.id].draw.length; run++) {
        if (games[this.game].pens[this.id].draw[run].type === 'image') {
          games[this.game].pens[this.id].draw.splice(run, 1)
          run--
          quantity++
        }
      }
    } else if (type === 'text') {
      for (let run = 0; run < games[this.game].pens[this.id].draw.length; run++) {
        if (games[this.game].pens[this.id].draw[run].type === 'text') {
          games[this.game].pens[this.id].draw.splice(run, 1)
          run--
          quantity++
        }
      }
    }
    games[this.game].change = true
    return quantity
  }
  //設定顏色
  setColor (color) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (color === undefined) {
      error('MV', 'color')
    } else {
      games[this.game].change = true
      games[this.game].pens[this.id].color = color
      updateClassData(this.game, 'pen', this.id)
      return color
    }
  }
  //設定大小
  setSize (value) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].pens[this.id].size = value
      updateClassData(this.game, 'pen', this.id)
    }
  }
  //設定位置翻譯
  setTransform (x, y) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.game].change = true
      games[this.game].pens[this.id].transform = {
        x: x,
        y: y
      }
      updateClassData(this.game, 'pen', this.id)
      return { x: x, y: y }
    }
  }
  //設定角度
  setAngle (value) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].pens[this.id].angle = value
      updateClassData(this.game, 'pen', this.id)
      return value
    }
  }
  //調整角度
  changeAngle (value) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].change = true
      games[this.game].pens[this.id].angle+=value
      updateClassData(this.game, 'pen', this.id)
    }
  }
  //設定外誆
  setFrame (color, size) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (color === undefined || size === undefined) {
      error('MV', 'color, size')
    } else {
      games[this.game].change = true
      games[this.game].pens[this.id].frame = {
        color: color,
        size: size
      }
      updateClassData(this.game, 'pen', this.id)
      return { color: color, size: size }
    }
  }
  //將最新的Draw加上框框
  addFrame () {
    games[this.game].change = true
    games[this.game].pens[this.id].draw[games[this.game].pens[this.id].draw.length-1].frame = games[this.game].pen.frame
  }
  //設定層
  setLayer (value) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (value === undefined) {
      error('MV', 'value')
    } else if (typeof value !== 'number') {
      error('VMBN', 'value')
    } else {
      games[this.game].pens[this.id].layer = value
      updateClassData(this.game, 'pen', this.id)
    }
  }
  //設定字體
  setFont (font) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (font === undefined) {
      error('MV', 'font')
    } else {
      games[this.game].pens[this.id].font = font
      updateClassData(this.game, 'pen', this.id)
      return font
    }
  }
  //移動到
  moveTo (x, y) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.game].pens[this.id].x = x
      games[this.game].pens[this.id].y = y
      updateClassData(this.game, 'pen', this.id)
    }
  }
  //移動到
  lineTo (x, y) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.game].change = true
      games[this.game].pens[this.id].draw.push({
        type: 'line',
        x: games[this.game].pens[this.id].x,
        y: games[this.game].pens[this.id].y,
        x2: x,
        y2: y,
        color: games[this.game].pens[this.id].color,
        size: games[this.game].pens[this.id].size,
        layer: games[this.game].pens[this.id].layer
      })
      games[this.game].pens[this.id].x = x
      games[this.game].pens[this.id].y = y
      updateClassData(this.game, 'pen', this.id)
    }
  }
}

class DRAW {
  constructor (game, id) {
    this.game = game
    this.id = id
  }
  //繪製正方形
  square (x, y, x2, y2) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (x === undefined || y === undefined || x2 === undefined || y2 === undefined) {
      error('MV', 'x, y, x2, y2')
    } else if (typeof x !== 'number' || typeof y !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number') {
      error('VMBN', 'x, y, x2, y2')
    } else {
      games[this.game].change = true
      games[this.game].pens[this.id].draw.push({
        type: 'square',
        x: x,
        y: y,
        x2: x2,
        y2: y2,
        angle: games[this.game].pens[this.id].angle,
        transform: games[this.game].pens[this.id].transform,
        color: games[this.game].pens[this.id].color,
        frame: undefined,
        layer: games[this.game].pens[this.id].layer
      })
    }
  }
  //繪製圓形
  circle (x, y) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (x === undefined || y === undefined) {
      error('MV', 'x, y')
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      error('VMBN', 'x, y')
    } else {
      games[this.game].change = true
      games[this.game].pens[this.id].draw.push({
        type: 'circle',
        x: x,
        y: y,
        color: games[this.game].pens[this.id].color,
        size: games[this.game].pens[this.id].size,
        frame: undefined,
        layer: games[this.game].pens[this.id].layer
      })
    }
  }
  //繪製圖型
  image (texture, x, y, width, height) {
    if (texture.id !== undefined) {
      texture = texture.id
    }
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (texture === undefined || x === undefined || y === undefined || width === undefined || height === undefined) {
      error('MV', 'x, y, width, height')
    } else if (typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number' || typeof height !== 'number') {
      error('VMBN', 'x, y, width, height')
    } else if (games[this.game].textures[texture] === undefined) {
      error('TNF', texture)
    } else {
      games[this.game].change = true
      games[this.game].pens[this.id].draw.push({
        type: 'image',
        texture: texture,
        x: x,
        y: y,
        width: width,
        height: height,
        angle: games[this.game].pens[this.id].angle,
        transform: games[this.game].pens[this.id].transform,
        layer: games[this.game].pens[this.id].layer
      })
    }
  }
  //繪製文字
  text (text, x, y, align) {
    if (games[this.game].pens[this.id] === undefined) {
      error('PNF', this.id)
    } else if (text === undefined || x === undefined || y === undefined) {
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
      games[this.game].pens[this.id].draw.push({
        type: 'text',
        text: text,
        align: align,
        x: x,
        y: y,
        angle: games[this.game].pens[this.id].angle,
        transform: games[this.game].pens[this.id].transform,
        color: games[this.game].pens[this.id].color,
        size: games[this.game].pens[this.id].size,
        font: games[this.game].pens[this.id].font,
        frame: undefined,
        layer: games[this.game].pens[this.id].layer
      })
    }
  }
}

module.exports = { PEN }

const { games, addClassData, updateClassData } = require('../data')
const { error } = require('./Error')