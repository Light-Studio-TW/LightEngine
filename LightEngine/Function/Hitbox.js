//物件碰到物件
function ObjectTouchObject (game, id, id2) {
  return check_hitbox({
    type: 'square',
    x: games[game].objects[id].x,
    y: games[game].objects[id].y,
    width: (games[game].textures[games[game].objects[id].texture].width+games[game].objects[id].width)+games[game].objects[id].hitbox.width,
    height: (games[game].textures[games[game].objects[id].texture].height+games[game].objects[id].height)+games[game].objects[id].hitbox.height
  }, {
    type: 'square',
    x: games[game].objects[id2].x,
    y: games[game].objects[id2].y,
    width: (games[game].textures[games[game].objects[id2].texture].width+games[game].objects[id2].width)+games[game].objects[id2].hitbox.width,
    height: (games[game].textures[games[game].objects[id2].texture].height+games[game].objects[id2].height)+games[game].objects[id2].hitbox.height
  })
}

//物件碰到點
function ObjectTouchPoint (game, id, x, y) {
  return check_hitbox({
    type: 'square',
    x: games[game].objects[id].x,
    y: games[game].objects[id].y,
    width: (games[game].textures[games[game].objects[id].texture].width+games[game].objects[id].width)+games[game].objects[id].hitbox.width,
    height: (games[game].textures[games[game].objects[id].texture].height+games[game].objects[id].height)+games[game].objects[id].hitbox.height
  }, {
    type: 'point',
    x: x,
    y: y
  })
}

//群組碰到物件
function ObjectGroupTouchObject (game, objects, id) {
  for (let run = 0; run < objects.length; run++) {
    if (games[game].objects[objects[run]] !== undefined) {
      if (check_hitbox({
        type: 'square',
        x: games[game].objects[objects[run]].x,
        y: games[game].objects[objects[run]].y,
        width: (games[game].textures[games[game].objects[objects[run]].texture].width+games[game].objects[objects[run]].width)+games[game].objects[objects[run]].hitbox.width,
        height: (games[game].textures[games[game].objects[objects[run]].texture].height+games[game].objects[objects[run]].height)+games[game].objects[objects[run]].hitbox.height
      }, {
        type: 'square',
        x: games[game].objects[id].x,
        y: games[game].objects[id].y,
        width: (games[game].textures[games[game].objects[id].texture].width+games[game].objects[id].width)+games[game].objects[objects[run]].hitbox.width,
        height: (games[game].textures[games[game].objects[id].texture].height+games[game].objects[id].height)+games[game].objects[objects[run]].hitbox.height
      })) {
        return true
      }
    }
  }
  return false
}

//群組碰到點
function ObjectGroupTouchPoint (game, objects, x, y) {
  for (let run = 0; run < objects.length; run++) {
    if (check_hitbox({
      type: 'square',
      x: games[game].objects[objects[run]].x,
      y: games[game].objects[objects[run]].y,
      width: (games[game].textures[games[game].objects[objects[run]].texture].width+games[game].objects[objects[run]].width)+games[game].objects[objects[run]].hitbox.width,
      height: (games[game].textures[games[game].objects[objects[run]].texture].height+games[game].objects[objects[run]].height)+games[game].objects[objects[run]].hitbox.height
    }, {
      type: 'point',
      x: x,
      y: y
    })) {
      return true
    }
  }
  return false
}

//檢查碰撞箱
function check_hitbox (hitbox, hitbox2) {
  if (hitbox.type === 'square' && hitbox2.type === 'square') {
    return squareCollision(hitbox, hitbox2)
  } else if (hitbox.type === 'square' && hitbox2.type === 'point') {
    return squarePointCollision (hitbox, hitbox2)
  }
}

//方形碰撞
function squareCollision (square, square2) {
  const minX1 = square.x - square.width / 2,
    maxX1 = square.x + square.width / 2,
    minY1 = square.y - square.height / 2,
    maxY1 = square.y + square.height / 2;
  const minX2 = square2.x - square2.width / 2,
    maxX2 = square2.x + square2.width / 2,
    minY2 = square2.y - square2.height / 2,
    maxY2 = square2.y + square2.height / 2;

  if (maxX1 > minX2 && maxX2 > minX1 && maxY1 > minY2 && maxY2 > minY1) {
    return true
  } else {
    return false
  }
}

//方形和點碰撞
function squarePointCollision (square, point) {
  if (point.x > square.x-(square.width/2) && point.x < square.x+(square.width/2)) {
    if (point.y > square.y-(square.width/2) && point.y < square.y+(square.width/2)) {
      return true
    }
  }
  return false
}

module.exports = { check_hitbox, ObjectTouchObject, ObjectTouchPoint, ObjectGroupTouchObject, ObjectGroupTouchPoint }

const { games } = require('../data')