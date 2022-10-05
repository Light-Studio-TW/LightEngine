let games = {}
let classData = {}

//嘗試尋找儲存的材質Buffer
function tryFinedTextureBuffer (game, data) {
  let key = data.toString()
  for (let run = 0; run < games[game].texture_buffer.length; run++) {
    if (games[game].texture_buffer[run].key === key) {
      return games[game].texture_buffer[run].buffer
    }
  }
}

//添加Class的data
function addClassData (game, type, id, func) {
  if (classData[game] === undefined) {
    classData[game] = {}
  }
  if (classData[game][type] === undefined) {
    classData[game][type] = {}
    classData[game][type][id] = [func]
  } else { 
    classData[game][type][id] = [func]
  }
}

//更新Object Class的data
function updateClassData (game, type, id) {
  for (let run = 0; run < classData[game][type][id].length; run++) {
    try {
      classData[game][type][id][run]({ game: game, id: id })
    } catch (error) {
      classData[game][type][id].splice(run, 1)
      run--
    }
  }
}

module.exports = { games, addClassData, updateClassData, tryFinedTextureBuffer }


