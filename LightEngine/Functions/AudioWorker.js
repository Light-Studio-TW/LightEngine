const { parentPort } = require('node:worker_threads')
const { spawn } = require('child_process')

let ffmpeg, sdl

let player = {}

parentPort.addListener('message', async (message) => {
  if (message.type === 'loadAudio') {
    if (ffmpeg === undefined) {
      ffmpeg = require('ffmpeg-static')
    }
    if (sdl === undefined) {
      sdl = require('@kmamal/sdl')
    }
    const proc = spawn(
      ffmpeg,
      [
        [ '-i', message.path ],
        ['-ss', message.start],
        (message.end !== undefined) ? ['-to', message.end] : [],
        message.channels && [ '-ac', message.channels ],
        message.frequency && [ '-ar', message.frequency ],
        (message.speed !== 0) ? ['-filter:a', `atempo=${message.speed}`] : [],
        (message.volume !== 1) ? ['-filter:a', `volume=${message.volume}`] : [],
        [ '-f', 'f32le' ],
        [ '-c:a', 'pcm_f32le' ],
        '-',
      ].flat(),
    )
  
    const chunks = []
    proc.stdout.on('data', (chunk) => {
      chunks.push(chunk)
    })
  
    return await new Promise((resolve, reject) => {
      proc.on('close', (code) => {
        code
          ? reject(new Error(`exit code ${code}`))
          : parentPort.postMessage({ type: 'returnAudioBuffer', id: message.id, buffer: Buffer.concat(chunks) })
      })
    })
  } else if (message.type === 'play') {
    if (player[message.game] === undefined || player[message.game][message.id] === undefined) {
      const audioInstance = sdl.audio.openDevice(message.playbackDevice, {
        channels: message.channels,
        frequency: message.frequency,
        format: message.format
      })
      audioInstance.enqueue(Buffer.from(message.buffer))
      if (player[message.game] === undefined) {
        player[message.game] = {}
      }
      player[message.game][message.audioId] = audioInstance
    }
    player[message.game][message.audioId].play()
    let interval = setInterval(() => {
      if (player[message.game][message.audioId].queued < 1) {
        clearInterval(interval)
        parentPort.postMessage({ type: 'playFinsh', id: message.id })
      }
    }, 5)
  }
})