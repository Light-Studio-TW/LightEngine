const fs = require('fs')

function createEffectData () {
  return {
    brightness: 0,
    grayscale: 0,
    transparent: 0,
    invert: 0,
    removeBackground: 0,
    blur: 0,
    red: 0,
    green: 0,
    blue: 0
  }
}

class EFFECT {
  constructor (game, object) {
    this.game = game
    this.object = object
    addClassData(game, 'effect', object, () => {
      this.brightness = games[this.game].objects[this.object].effect.brightness
      this.grayscale = games[this.game].objects[this.object].effect.grayscale
      this.transparent = games[this.game].objects[this.object].effect.transparent
      this.invert = games[this.game].objects[this.object].effect.invert
      this.blur = games[this.game].objects[this.object].effect.blur
      this.red = games[this.game].objects[this.object].effect.red
      this.green = games[this.game].objects[this.object].effect.green
      this.blue = games[this.game].objects[this.object].effect.blue
    })
    updateClassData(this.game, 'effect', this.object)
  }
  //設定亮度
  setBrightness (value) {
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
      games[this.game].objects[this.object].textureChange = true
      if (value < -100) {
        value = -100
      } else if (value > 100) {
        value = 100
      }
      games[this.game].objects[this.object].effect.brightness = value
      updateClassData(this.game, 'effect', this.object)
      return value
    }
  }
  //調整亮度
  changeBrightness (value) {
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
      games[this.game].objects[this.object].textureChange = true
      games[this.game].objects[this.object].effect.brightness += value
      if (games[this.game].objects[this.object].effect.brightness < -100) {
        games[this.game].objects[this.object].effect.brightness = -100
      } else if (games[this.game].objects[this.object].effect.brightness > 100) {
        games[this.game].objects[this.object].effect.brightness = 100
      }
      updateClassData(this.game, 'effect', this.object)
      return games[this.game].objects[this.object].effect.brightness
    }
  }
  //設定灰度
  setGrayscale (value) {
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
      games[this.game].objects[this.object].textureChange = true
      if (value < 0) {
        value = 0
      } else if (value > 100) {
        value = 100
      }
      games[this.game].objects[this.object].effect.grayscale = value
      updateClassData(this.game, 'effect', this.object)
      return value
    }
  }
  //調整灰度
  changeGrayscale (value) {
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
      games[this.game].objects[this.object].textureChange = true
      games[this.game].objects[this.object].effect.grayscale += value
      if (games[this.game].objects[this.object].effect.grayscale < 0) {
        games[this.game].objects[this.object].effect.grayscale = 0
      } else if (games[this.game].objects[this.object].effect.grayscale > 100) {
        games[this.game].objects[this.object].effect.grayscale = 100
      }
      updateClassData(this.game, 'effect', this.object)
      return games[this.game].objects[this.object].effect.grayscale
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
      games[this.game].objects[this.object].textureChange = true
      if (value < 0) {
        value = 0
      } else if (value > 100) {
        value = 100
      }
      games[this.game].objects[this.object].effect.transparent = value
      updateClassData(this.game, 'effect', this.object)
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
      games[this.game].objects[this.object].textureChange = true
      games[this.game].objects[this.object].effect.transparent += value
      if (games[this.game].objects[this.object].effect.transparent < 0) {
        games[this.game].objects[this.object].effect.transparent = 0
      } else if (games[this.game].objects[this.object].effect.transparent > 100) {
        games[this.game].objects[this.object].effect.transparent = 100
      }
      updateClassData(this.game, 'effect', this.object)
      return games[this.game].objects[this.object].effect.transparent
    }
  }
  //設定色調返轉
  setInvert (value) {
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
      games[this.game].objects[this.object].textureChange = true
      if (value < 0) {
        value = 0
      } else if (value > 100) {
        value = 100
      }
      games[this.game].objects[this.object].effect.invert = value
      updateClassData(this.game, 'effect', this.object)
      return value
    }
  }
  //調整色調返轉
  changeInvert (value) {
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
      games[this.game].objects[this.object].textureChange = true
      games[this.game].objects[this.object].effect.invert += value
      if (games[this.game].objects[this.object].effect.invert < 0) {
        games[this.game].objects[this.object].effect.invert = 0
      } else if (games[this.game].objects[this.object].effect.invert > 100) {
        games[this.game].objects[this.object].effect.invert = 100
      }
      updateClassData(this.game, 'effect', this.object)
      return games[this.game].objects[this.object].effect.invert
    }
  }
  //設定去背等級
  setRemoveBackground (value) {
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
      games[this.game].objects[this.object].textureChange = true
      games[this.game].objects[this.object].effect.removeBackground = value
      if (games[this.game].objects[this.object].effect.removeBackground < 0) {
        games[this.game].objects[this.object].effect.removeBackground = 0
      }
      updateClassData(this.game, 'effect', this.object)
      return value
    }
  }
  //調整去背等級
  changeRemoveBackground (value) {
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
      games[this.game].objects[this.object].textureChange = true
      games[this.game].objects[this.object].effect.removeBackground += value
      if (games[this.game].objects[this.object].effect.removeBackground < 0) {
        games[this.game].objects[this.object].effect.removeBackground = 0
      }
      updateClassData(this.game, 'effect', this.object)
      return games[this.game].objects[this.object].effect.removeBackground
    }
  }
  //設定紅值
  setRed (value) {
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
      games[this.game].objects[this.object].textureChange = true
      games[this.game].objects[this.object].effect.red = value
      if (games[this.game].objects[this.object].effect.red < -255) {
        games[this.game].objects[this.object].effect.red = -255
      } else if (games[this.game].objects[this.object].effect.red > 255) {
        games[this.game].objects[this.object].effect.red = 255
      }
      updateClassData(this.game, 'effect', this.object)
      return value
    }
  }
  //調整紅值
  changeRed (value) {
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
      games[this.game].objects[this.object].textureChange = true
      games[this.game].objects[this.object].effect.red += value
      if (games[this.game].objects[this.object].effect.red < 0) {
        games[this.game].objects[this.object].effect.red = 0
      }
      updateClassData(this.game, 'effect', this.object)
      return games[this.game].objects[this.object].effect.red
    }
  }
  //設定綠值
  setGreen (value) {
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
      games[this.game].objects[this.object].textureChange = true
      if (value < -255) {
        value = -255
      } else if (value > 255) {
        value = 255
      }
      games[this.game].objects[this.object].effect.green = value
      updateClassData(this.game, 'effect', this.object)
      return value
    }
  }
  //調整綠值
  changeGreen (value) {
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
      games[this.game].objects[this.object].textureChange = true
      games[this.game].objects[this.object].effect.green += value
      if (games[this.game].objects[this.object].effect.green < 0) {
        games[this.game].objects[this.object].effect.green = 0
      }
      updateClassData(this.game, 'effect', this.object)
      return games[this.game].objects[this.object].effect.green
    }
  }
  //設定藍值
  setBlue (value) {
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
      games[this.game].objects[this.object].textureChange = true
      if (value < -255) {
        value = -255
      } else if (value > 255) {
        value = 255
      }
      games[this.game].objects[this.object].effect.blue = value
      updateClassData(this.game, 'effect', this.object)
      return value
    }
  }
  //調整藍值
  changeBlue (value) {
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
      games[this.game].objects[this.object].textureChange = true
      games[this.game].objects[this.object].effect.blue += value
      if (games[this.game].objects[this.object].effect.blue < 0) {
        games[this.game].objects[this.object].effect.blue = 0
      }
      updateClassData(this.game, 'effect', this.object)
      return games[this.game].objects[this.object].effect.blue
    }
  }
}

class all_effect {
  //亮度
  static brightness (buffer, value) {
    if (value < -100) {
      value = -100
    } else if (value > 100) {
      value = 100
    }
    value*=2.55
    let red, green, blue
    for (let run = 0; run < buffer.length; run += 4) {
      red = buffer[run]
      green = buffer[run + 1]
      blue = buffer[run + 2]
      buffer[run] = red+value
      buffer[run + 1] = green+value
      buffer[run + 2] = blue+value
    }
    return buffer
  }
  //灰度
  static grayscale (buffer, value) {
    value = 100-value
    if (value < 0) {
      value = 0
    } else if (value > 100) {
      value = 100
    }
    let red, green, blue, arg
    for (let run = 0; run < buffer.length; run += 4) {
      red = buffer[run]
      green = buffer[run + 1]
      blue = buffer[run + 2]
      arg = (red + green + blue) / 3
      buffer[run] = arg - ((arg-red)/100)*value
      buffer[run + 1] = arg - ((arg-green)/100)*value
      buffer[run + 2] = arg - ((arg-blue)/100)*value
    }
    return buffer
  }
  //透明
  static transparent (buffer, value) {
    value = value
    if (value < 0) {
      value = 0
    } else if (value > 100) {
      value = 100
    }
    for (let run = 0; run < buffer.length; run += 4) {
      buffer[run + 3] -= value*2.55
    }
    return buffer
  }
  //色調返轉
  static invert (buffer, value) {
    if (value < 0) {
      value = 0
    } else if (value > 100) {
      value = 100
    }
    let red, green, blue
    for (let run = 0; run < buffer.length; run += 4) {
      red = buffer[run]
      green = buffer[run + 1]
      blue = buffer[run + 2]
      buffer[run] = red + ((-(red*2)+255)/100)*value
      buffer[run + 1] = green + ((-(green*2)+255)/100)*value
      buffer[run + 2] = blue + ((-(blue*2)+255)/100)*value
    }
    return buffer
  }
  //去除背景
  static removeBackground (buffer, value) {
    if (value < 0) {
      value = 0
    } else if (value > 10) {
      value = 10
    }
    let rgbQuantity = {}
    for (let run = 0; run < buffer.length; run+=4) {
      if (rgbQuantity[`${buffer[run]}|${buffer[run+1]}|${buffer[run+2]}`] !== undefined) {
        rgbQuantity[`${buffer[run]}|${buffer[run+1]}|${buffer[run+2]}`]++
      } else {
        rgbQuantity[`${buffer[run]}|${buffer[run+1]}|${buffer[run+2]}`] = 1
      }
    }
    let rgbQuantityQueue = Object.keys(rgbQuantity).sort((prevent, current) => {
      return rgbQuantity[prevent] - rgbQuantity[current]
    })
    rgbQuantityQueue.reverse()
    let red, green, blue
    for (let run = 0; run < value && run < rgbQuantityQueue.length; run++) {
      red = +rgbQuantityQueue[run].split('|')[0]
      green = +rgbQuantityQueue[run].split('|')[1]
      blue = +rgbQuantityQueue[run].split('|')[2]
      for (let run2 = 0; run2 < buffer.length; run2++) {
        if (buffer[run2] > red-5 && buffer[run2] < red+5) {
          if (buffer[run2+1] > green-5 && buffer[run2+1] < green+5) {
            if (buffer[run2+2] > blue-5 && buffer[run2+2] < blue+5) {
              buffer[run2] = 0
              buffer[run2+1] = 0
              buffer[run2+2] = 0
              buffer[run2+3] = 0
            }
          }
        }
      }
    }
    return buffer
  }
  //模糊
  static blur (buffer, value, width) {
    let rgbaSave = []
    let buffer2 = new Uint8ClampedArray(buffer.length)
    for (let run = 0; run < 1; run++) {
      for (let run2 = 0; run2 < buffer.length; run2+=4) {
        rgbaSave.push(getAroundRGBA(buffer, run2, width, value))
      }
      for (let run2 = 0; run2 < buffer.length; run2+=4) {
        buffer[run2] = rgbaSave[run2/4].red
        buffer[run2 + 1] = rgbaSave[run2/4].green
        buffer[run2 + 2] = rgbaSave[run2/4].blue
      }
    }
    return buffer2
  }
  //紅
  static red (buffer, value) {
    if (value < -255) {
      value = -255
    } else if (value > 255) {
      value = 255
    }
    for (let run = 0; run < buffer.length; run+=4) {
      buffer[run] += value
    }
    return buffer
  }
  //綠
  static green (buffer, value) {
    if (value < -255) {
      value = -255
    } else if (value > 255) {
      value = 255
    }
    for (let run = 0; run < buffer.length; run+=4) {
      buffer[run+1] += value
    }
    return buffer
  }
  //藍
  static blue (buffer, value) {
    if (value < -255) {
      value = -255
    } else if (value > 255) {
      value = 255
    }
    for (let run = 0; run < buffer.length; run+=4) {
      buffer[run+2] += value
    }
    return buffer
  }
}

function getAroundRGBA (buffer, row, width, size) {
  let x
  let y = Math.trunc(row/width)
  let red = 0, green = 0, blue = 0
  for (let run = 0; run < size; run++) {
    x = ((row%width)-((size/2)))
    for (let run2 = 0; run2 < size; run2++) {
      red+=buffer[Math.trunc(x+(y*width))]
      green+=buffer[Math.trunc(x+(y*width)) + 1]
      blue+=buffer[Math.trunc(x+(y*width)) + 2]
      x+=4
    }
    y+=4
  }
  return { red: red/(size*size), green: green/(size*size), blue: blue/(size*size) }
}

//套用效果
function applyEffect (texture, effect) {
  let canvas = createCanvas(texture.width, texture.height)
  let ctx = canvas.getContext('2d')
  ctx.drawImage(texture.image, 0, 0, texture.width, texture.height)
  let imageData = ctx.getImageData(0, 0, texture.width, texture.height)
  let all_key = Object.keys(effect)
  let buffer = imageData.data
  for (let run = 0; run < all_key.length; run++) {
    if (effect[all_key[run]] !== 0) {
      buffer = all_effect[all_key[run]](buffer, effect[all_key[run]], texture.width)
    }
  }
  imageData.data = buffer
  ctx.putImageData(imageData, 0, 0)
  return canvas
}

module.exports = { EFFECT, createEffectData, applyEffect }

const { games, addClassData, updateClassData } = require('../data')
const { error } = require('./Error')

//導入node-canvas
try {
  var { createCanvas } = require('canvas')
} catch (err) {
  error('MP', ['canvas', 'npm install canvas'])
}