module.exports = { add_repeat, add_wait }

const { generateID } = require('./GenerateID')

let timer = {
  repeat: {},
  wait: {}
}

const { Worker } = require('node:worker_threads');
const timerWorker = new Worker('./LightEngine/Functions/TimerWorker.js')

timerWorker.addListener('message', (message) => {
  if (message.type === 'repeatFunction') {
    timer.repeat[message.id].func(message.count)
  } else if (message.type === 'repeatEndFunction') {
    timer.repeat[message.id].func2()
    delete timer.repeat[message.id]
  } else if (message.type === 'waitFunction') {
    timer.wait[message.id].func()
    delete timer.wait[message.id]
  }
})

function add_repeat (time, interval, func, func2) {
  let id = generateID(Object.keys(timer.repeat))
  timer.repeat[id] = { time: time, interval: interval, func: func, func2: func2 }
  timerWorker.postMessage({ type: 'addRepeat', id: id, data: { time: time, count: 0, interval: interval, startDate: Date.now() } })
  return function () {
    timerWorker.postMessage({ type: 'deleteRepeat', id: id })
    delete timer.repeat[id]
  }
}

//新增等待
function add_wait (time, func) {
  let id = generateID(Object.keys(timer.wait))
  timer.wait[id] = { time: time, func: func, start_time: Date.now() }
  timerWorker.postMessage({ type: 'addWait', id: id, data: { time: time, startDate: Date.now() } })
}