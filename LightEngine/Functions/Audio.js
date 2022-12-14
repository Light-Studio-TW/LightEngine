let sdl

const { Worker } = require('node:worker_threads');
const audioWorker = new Worker('./LightEngine/Functions/AudioWorker.js')

let workerList = {}

audioWorker.addListener('message', (message) => {
  if (message.type === 'returnAudioBuffer') {
    workerList[message.id].func(message.buffer)
    delete workerList[message.id]
  } else if (message.type === 'playFinsh') {
    workerList[message.id].func(message)
    delete workerList[message.id]
  }
})

//呼叫worker
function callWorker (data, func) {
  let id = generateID(Object.keys(workerList))
  data.id = id
  audioWorker.postMessage(data)
  data.func = func
  workerList[id] = data
}

//加載音頻
async function loadAudio (path, { channels, frequency }, { start, end }, { volume, speed }) {
  if (sdl === undefined) {
    sdl = checkPackage('@kmamal/sdl')
  }
  return new Promise((resolve, reject) => {
    callWorker({ type: 'loadAudio', path, channels, frequency, start, end, volume, speed }, (message) => {
      resolve(message.buffer)
    })
  })
}

class AUDIO  {
  constructor (id, game) {
    this.game = game
    this.id = id
    addClassData(game, 'audio', id, (data) => {
      this.game = data.game
      this.id = data.id
    })
    updateClassData(game, 'audio', id)
  }
  //播放音頻
  async play (func) {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].audios[this.id] === undefined) {
      error('ANF', this.id)
    } else if (func !== undefined && typeof func !== 'function') {
      error('VMBF', 'func')
    } else {
      if (games[this.game].audios[this.id].player === undefined) {
        let playbackDevice
        if (getSettings().AudioDevice === 'auto') {
          playbackDevice = sdl.audio.devices.find((x) => x.recording === false)
        } else  {
          let allDevice = sdl.audio.devices
          let choose = getSettings().AudioDevice
          for (let run = 0; run < allDevice.length; run++) {
            if (allDevice.name === choose) {
              playbackDevice = (getSettings().AudioDevice)
            }
          }
          if (playbackDevice === undefined) {
            error('DNF', choose)
          }
        }
        return new Promise((resolve, reject) => {
          callWorker({ type: 'play', game: this.game, audioId: this.id, buffer: games[this.game].audios[this.id].buffer, playbackDevice: playbackDevice, channels: games[this.game].audios[this.id].channels, frequency: games[this.game].audios[this.id].frequency, format: games[this.game].audios[this.id].format }, () => {
            if (func !== undefined) {
              func()
            }
            resolve()
          })
        })
        //games[this.game].audios[this.id].player = audioInstance
			}
    }
  }
  //暫停音頻
  pause () {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].audios[this.id] === undefined) {
      error('ANF', this.id)
    } else {
      if (games[this.game].audios[this.id].player !== undefined) {
        games[this.game].audios[this.id].player.pause()
      }
    }
  }
  //取得狀態
  getStatus () {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].audios[this.id] === undefined) {
      error('ANF', this.id)
    } else {
      return {
        playing: games[this.game].audios[this.id].player.playing,
        schedule: (games[this.game].audios[this.id].player.queued)/(180224*games[this.game].audios[this.id].channels),
      }
    }
  }
  //重新播放音頻
  replay () {
    if (games[this.game] === undefined) {
      error('GNF', this.game)
    } else if (games[this.game].audios[this.id] === undefined) {
      error('ANF', this.id)
    } else {
      const playbackDevice = sdl.audio.devices.find((x) => x.recording === false)
			const audioInstance = sdl.audio.openDevice(playbackDevice, {
				channels: games[this.game].audios[this.id].channels,
				frequency: games[this.game].audios[this.id].frequency,
				format: games[this.game].audios[this.id].format
			})
      let date = Date.now()
			audioInstance.enqueue(games[this.game].audios[this.id].buffer)
      games[this.game].audios[this.id].player.close()
      games[this.game].audios[this.id].player = audioInstance
      games[this.game].audios[this.id].player.play()
    }
  }
}

module.exports = { AUDIO, loadAudio }

const { games, addClassData, updateClassData } = require('../data')
const { error } = require('./Error')
const { generateID } = require('./GenerateID');
const { checkPackage } = require('./PackageManager');
const { getSettings } = require('./Settings')