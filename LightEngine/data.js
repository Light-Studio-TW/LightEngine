let games = {}
let classData = {}

//嘗試尋找儲存的材質Buffer
function tryFinedTextureBuffer (game, data) {
  let all_key = Object.keys(data)
  let all_key2
  let yes
  for (let run = 0; run < games[game].texture_buffer.length; run++) {
    yes = true
    for (let run2 = 0; run2 < all_key.length; run2++) {
      all_key2 = Object.keys(data[all_key[run2]])
      for (let run3 = 0; run3 < all_key2.length; run3++) {
        if (games[game].texture_buffer[run][all_key[run2]][all_key2[run3]] !== data[all_key[run2]][all_key2[run3]]) {
          yes = false
        }
      }
    }
    if (yes) {
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


