const { parentPort } = require('node:worker_threads')
const { getSettings } = require('./Settings')

const timerInterval = getSettings().TimerInterval
let timer = {
  repeat: {},
  wait: {}
}

//repeat的timer
setInterval(() => {
  let allKey = Object.keys(timer.repeat)
  let nowDate = Date.now()
  for (let run = 0; run < allKey.length; run++) {
    if (timer.repeat[allKey[run]] !== undefined) {
      if (nowDate > timer.repeat[allKey[run]].startDate+timer.repeat[allKey[run]].interval) {
        if (timer.repeat[allKey[run]].time === Infinity) {
          parentPort.postMessage({ type: 'repeatFunction', id: allKey[run], count: Infinity })
          timer.repeat[allKey[run]].startDate = nowDate
        } else {
          if (timer.repeat[allKey[run]].count > timer.repeat[allKey[run]].time) {
            parentPort.postMessage({ type: 'repeatEndFunction', id: allKey[run] })
            delete timer.repeat[allKey[run]]
            run--
          } else {
            parentPort.postMessage({ type: 'repeatFunction', id: allKey[run], count: timer.repeat[allKey[run]].count })
            timer.repeat[allKey[run]].startDate = nowDate
            timer.repeat[allKey[run]].count++
          }
        }
      }
    }
  }
}, timerInterval)

//wait的timer
setInterval(() => {
  let allKey = Object.keys(timer.wait)
  let nowDate = Date.now()
  for (let run = 0; run < allKey.length; run++) {
    if (timer.wait[allKey[run]] !== undefined) {
      if (nowDate > timer.wait[allKey[run]].startDate+timer.wait[allKey[run]].time) {
        parentPort.postMessage({ type: 'waitFunction', id: allKey[run] })
        delete timer.wait[allKey[run]]
        run--
      }
    }
  }
}, timerInterval)

parentPort.addListener('message', (message) => {
  if (message.type === 'addRepeat') {
    timer.repeat[message.id] = message.data
  } else if (message.type === 'deleteRepeat') {
    delete timer.repeat[message.id]
  } else if (message.type === 'addWait') {
    timer.wait[message.id] = message.data
  }
})