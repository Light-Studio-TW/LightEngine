module.exports = { getCanvas }

const { games, tryFinedTextureBuffer } = require('../data')
const { applyEffect } = require('./Effect')
const { getSettings } = require('./Settings')

//導入node-
const { checkPackage } = require('./PackageManager')
let createCanvas

function getCanvas (game, display, width, height) {
  if (createCanvas === undefined) {
    createCanvas = checkPackage('canvas').createCanvas
  }
  let canvas = createCanvas(width, height)
  let ctx = canvas.getContext('2d')
  for (let run = 0; run < display.length; run++) {
    ctx.resetTransform()
    if (display[run].type === 'object') {
      if (games[game].objects[display[run].id] === undefined) {
        display.splice(run, 1)
        run--
      } else {
        let object = games[game].objects[display[run].id]
        let texture = games[game].textures[object.texture]
        if (object.textureChange) {
          let findTextureBuffer = tryFinedTextureBuffer(game, {
            texture: {
              id: object.texture,
            },
            effect: object.effect, 
            size: { width: object.width, height: object.height }
          })
          if (findTextureBuffer !== undefined) {
            object.textureBuffer = findTextureBuffer
          } else {
            object.textureBuffer = applyEffect(texture, object.effect, object.width, object.height)
            games[game].texture_buffer.push({ name: {
              texture: {
                id: object.texture
              },
              effect: object.effect,
              size: { width: object.width, height: object.height },
              buffer: object.textureBuffer
            }.toString(), buffer: object.textureBuffer})
            if (games[game].texture_buffer.length > getSettings().SaveTextureBuffer) {
              games[game].texture_buffer.splice(0, 1)
            }
          }
          object.textureChange = false
        }
        if (object.angle !== 0) {
          ctx.translate(((texture.width+object.width)/2) + (object.x-((texture.width+object.width)/2))-games[game].camera_x, ((texture.height+object.height)/2) + (object.y-((texture.height+object.height)/2))-games[game].camera_y)
          ctx.rotate(object.angle * Math.PI / 180)
          ctx.drawImage(object.textureBuffer, -(object.width+texture.width)/2,  -(object.height+texture.height)/2, texture.width+object.width, texture.height+object.height)
        } else {
          ctx.drawImage(object.textureBuffer, (object.x-((texture.width+object.width)/2))-games[game].camera_x,  (object.y-((texture.height+object.height)/2))-games[game].camera_y, texture.width+object.width, texture.height+object.height)
        }
        if (getSettings().ShowHitbox) {
          ctx.resetTransform()
          ctx.strokeStyle = '#03fc24'
          ctx.lineWidth = 2
          ctx.strokeRect((object.x-((texture.width+object.width)+object.hitbox.width)/2)-games[game].camera_x, (object.y-((texture.height+object.height)+object.hitbox.height)/2)-games[game].camera_y, ((texture.width+object.width)+object.hitbox.width), ((texture.height+object.height)+object.hitbox.height))
        }
      }
    } else if (display[run].type === 'line') {
      ctx.lineWidth = display[run].size
      ctx.strokeStyle = display[run].color
      ctx.moveTo(display[run].x-games[game].camera_x, display[run].y-games[game].camera_y)
      ctx.lineTo(display[run].x2-games[game].camera_x, display[run].y2-games[game].camera_y)
      ctx.stroke()
    } else if (display[run].type === 'text') {
      if (display[run].angle !== 0) {
        ctx.transform(display[run].transform.x, display[run].transform.y)
        ctx.rotate(display[run].angle)
      }
      ctx.font = `${display[run].size}px ${display[run].font}`
      ctx.fillStyle = display[run].color
      ctx.textAlign = display[run].align
      ctx.fillText(display[run].text, display[run].x, display[run].y)
      if (display[run].frame !== undefined) {
        ctx.strokeStyle = display[run].frame.color
        ctx.lineWidth = display[run].frame.size
        ctx.strokeText(display[run].text, display[run].x, display[run].y)
      }
    } else if (display[run].type === 'square') {
      if (display[run].angle !== 0) {
        ctx.transform(display[run].transform.x, display[run].transform.y)
        ctx.rotate(display[run].angle)
      }
      ctx.fillStyle = display[run].color
      ctx.fillRect(display[run].x, display[run].y, display[run].x2, display[run].y2)
      if (display[run].frame !== undefined) {
        ctx.strokeStyle = display[run].frame.color
        ctx.lineWidth = display[run].frame.size
        ctx.strokeRect(display[run].x, display[run].y, display[run].x2, display[run].y2)
      }
    } else if (display[run].type === 'circle') {
      ctx.fillStyle = display[run].color
      ctx.arc(display[run].x, display[run].y, display[run].size, 0, 2 * Math.PI)
      ctx.fill()
      if (display[run].frame !== undefined) {
        ctx.strokeStyle = display[run].frame.color
        ctx.arc(display[run].x, display[run].y, display[run].size, 0, 2 * Math.PI)
        ctx.lineWidth = display[run].frame.size
        ctx.stroke()
      }
    } else if (display[run].type === 'image') {
      if (display[run].angle !== 0) {
        ctx.transform(display[run].transform.x, display[run].transform.y)
        ctx.rotate(display[run].angle)
      }
      ctx.drawImage(games[game].textures[display[run].texture].image, display[run].x, display[run].y, display[run].width, display[run].height)
    }
  }
  if (games[game].input.openStatus) {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, height-65, width, height)
    ctx.font = '40px serif'
    games[game].input.textWidth = ctx.measureText(games[game].input.text).width
    ctx.fillStyle = 'black'
    if (games[game].input.textWidth > games[game].window.width-20) {
      console.log('size', games[game].input.textWidth, games[game].window.width-20)
      ctx.fillText(games[game].input.text, 10-(games[game].input.textWidth-(games[game].window.width-20)), height-20)
    } else {
      ctx.textAlign = 'left'
      ctx.fillText(games[game].input.text, 10, height-20)
    }
  }
  return canvas
}