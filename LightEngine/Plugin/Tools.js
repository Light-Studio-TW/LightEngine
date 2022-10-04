//重複
function repeat (data, func, func2) {
  if (data === undefined || func === undefined) {
    error('MV', 'data, func')
  } else if (typeof func !== 'function') {
    error('VMBF', 'func')
  } else if (func2 !== undefined && typeof func2 !== 'function') {
    error('VMBF', 'func2')
  }
  if (data.time === undefined) {
    data.time = Infinity
  }
  if (data.interval === undefined) {
    data.interval = 0.1
  }
  return new class {
    constructor () {
      this.startTime = 0
      this.time = data.time
      this.interval = data.interval
      this.count = 0
      this.func = func
      this.func2 = func2
      this.tick = function () {
        let startTime = Date.now()
        let interval = setInterval(() => {
          if (typeof this.func !== 'function') {
            clearInterval()
          }
          if (Date.now() >= startTime + this.interval) {
            this.count++
            if (typeof this.func === 'function') {
              this.func(this.count)
            }
            clearInterval(interval)
            if (this.count < this.time) {
              this.tick()
            } else {
              if (typeof func2 === 'function') {
                func2()
              }
            }
          }
        }, 5)
      }
      this.tick()
    }
    //停止重複
    stop () {
      this.startTime = null
      this.time = 0
      this.interval = null
      this.count = 0
      this.func = null
      this.func2 = null
    }
  }
}

//等待
function wait (time) {
  if (time === undefined) {
    throw new Error('[Light Engine]: 缺少必要參數 (time)')
  } else if (typeof time !== 'number') {
    throw new Error('[Light Engine]: 參數 (time) 必須為數字')
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(run)
      }, time)
    })
  }
}

module.exports = { repeat, wait }

const { error } = require('../Function/Error')