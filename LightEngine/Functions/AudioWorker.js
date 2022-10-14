const { parentPort } = require('node:worker_threads')
const { spawn } = require('child_process')

let ffmpeg, sdl

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
        (message.end !== undefined) ? ['-to', 16] : [],
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
  }
})