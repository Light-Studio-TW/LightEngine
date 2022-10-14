class INPUT {
  constructor (game) {
    this.id = game
    addClassData(game, 'input', game, (data) => {
      this.openStatus = games[data.game].input.openStatus
    })
    updateClassData(game, 'input', game)
  }
  //取得輸入
  get () {
    return new Promise((resolve, reject) => {
      games[this.id].input.openStatus = true
      updateClassData(this.id, 'input', this.id)
      let selete = 0
      let textArray = []
      let count = 0
      let repeat = LE.repeat({ interval: 15 }, () => {
        count++
        if (count > 40) {
          count = 0
        }
        let showText = []
        for (let run = 0; run < textArray.length; run++) {
          showText.push(textArray[run])
        }
        if (count >= 20) {
          games[this.id].input.text = textArray.join('').substring(0, selete) + '|' + textArray.join('').substring(selete, textArray.length)
        } else {
          games[this.id].input.text = textArray.join('')
        }
        games[this.id].change = true
      })
      let keyboard = games[this.id].window.on('keyDown', (data) => {
        if (data.key !== null && data.key.length < 2) {
          count = 20
          if (data.shift) {
            if (['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '[', ']', ';', "'", ',', '.', '/'].includes(data.key)) {
              textArray.splice(selete, 0, ['`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', ':', '"', '<', '>', '?'][['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '[', ']', ';', "'", ',', '.', '/'].indexOf(data.key.toUpperCase())])
            } else {
              textArray.splice(selete, 0, data.key.toUpperCase())
            }
          } else {
            textArray.splice(selete, 0, data.key)
          }
          selete++
        } else if (data.key === 'space') { 
          count = 20
          textArray.splice(selete, 0, ' ')
          selete++
        } else if (data.key === 'backspace') {
          count = 20
          textArray.splice(selete-1, 1, '')
          if (selete > 0) {
            selete--
          }
        } else if (data.key === 'right') {
          count = 20
          if (selete < textArray.length) {
            selete++
          }
        } else if (data.key === 'left') {
          count = 20
          if (selete > 0) {
            selete--
          }
        } else if (data.key === 'return') {
          games[this.id].input.openStatus = false
          repeat.stop()
          keyboard = null
          resolve(textArray.join(''))
        }
      })
    })
  }
} 

module.exports = { INPUT }

const LE = require('../index')
const { games, addClassData, updateClassData } = require('../data')
const { error } = require('./Error')