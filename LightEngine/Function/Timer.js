module.exports = { start_timer, add_repeat, add_wait }

const { generateID } = require('./GenerateID')

let repeat = {}
let wait = {}

//開始計時器
function start_timer () {
  setInterval(() => {
    let all_key = Object.keys(repeat)
    let now_time = Date.now()
    for (let run = 0; run < all_key.length; run++) {
      if (repeat[all_key[run]] !== undefined) {
        if (now_time > repeat[all_key[run]].start_time+repeat[all_key[run]].interval) {
          repeat[all_key[run]].func(repeat[all_key[run]].count)
          if (repeat[all_key[run]] !== undefined) {
            repeat[all_key[run]].count++
            if (repeat[all_key[run]].count < repeat[all_key[run]].time) {
              repeat[all_key[run]].start_time = now_time
            } else {
              if (typeof repeat[all_key[run]].func2 === 'function') {
                repeat[all_key[run]].func2()
              }
              delete repeat[all_key[run]]
            }
          }
        }
      }
    }
    all_key = Object.keys(wait)
    for (let run = 0; run < all_key.length; run++) {
      if (now_time > wait[all_key[run]].start_time+wait[all_key[run]].time) {
        wait[all_key[run]].func()
        delete wait[all_key[run]]
      }
    }
  }, 10)
}

//新增重複
function add_repeat (time, interval, func, func2) {
  let id = generateID(Object.keys(repeat))
  repeat[id] = { time: time, count: 0, interval: interval, func: func, func2: func2, start_time: Date.now() }
  return function () {
    delete repeat[id]
  }
}

//新增等待
function add_wait (time, func) {
  let id = generateID(Object.keys(wait))
  wait[id] = { time: time, func: func, start_time: Date.now() }
}