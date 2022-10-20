const fs = require('fs')
const readline = require('readline');

module.exports = update

const connect = require('../connect')

//更新Light Engine
async function update (path, func) {
  readline.cursorTo(process.stdout, 0, null)
  edit('[Light Engine]: 正在嘗試連線至Light Engine的伺服器')
  let data = await connect({ type: 'checkServer' })
  if (data !== false) {
    edit('[Light Engine]: 正在檢查版本')
    data = await connect({ type: 'getVersion' })
    if (data !== false) {
      if (require(`${path}/package.json`).version === data) {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        })
        rl.question('[Light Engine]: 你的 Light Engine 以為最新版本 [enter繼���]', () => {
          rl.close()
          func()
        })
        return
      } else {
        let newVersion = data
        edit(`[Light Engine]: 準備下載 Light Engine v${newVersion}`)
        let progress = 0
        data = await connect({ type: 'getAllFiles' })
        if (data !== false) {
          fs.writeFileSync(`${path}/bin/data.json`, data)
          const files = require(`${path}/bin/data.json`).allFiles
          const filesSize = require(`${path}/bin/data.json`).filesSize
          let allFilesSize = 0
          for (let run = 0; run < filesSize.length; run++) {
            allFilesSize+=filesSize[run]
          }
          for(let run = 0; run < files.length; run++) {
            if (files[run].includes('[FOLDER]')) {
              edit(`[Light Engine]: 正在創建文件夾 ${progressBar(progress, allFilesSize)} ${files[run].replaceAll(' [FOLDER]', '')} (${run+1} / ${files.length})`)
              if (!fs.existsSync(`${path}/${files[run].replaceAll(' [FOLDER]', '')}`)) {
                fs.mkdirSync(`${path}/${files[run].replaceAll(' [FOLDER]', '')}`)
              }
            } else {
              edit(`[Light Engine]: 正在下載檔案 ${progressBar(progress, allFilesSize)} ${files[run]} (${run+1} / ${files.length})`)
              data = await connect({ type: 'downloadFile', file: files[run] }, (byte) => {
                progress+=byte
                edit(`[Light Engine]: 正在下載檔案 ${progressBar(progress, allFilesSize)} ${files[run]} (${run+1} / ${files.length})`)
              })
              if (data === false) {
                func()
                return
              } else { 
                fs.writeFileSync(`${path}/${files[run]}`, data)
              }
            }
          }
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          })
          rl.question(`[Light Engine]: 成功下載 Light Engine v${newVersion} [enter繼續]`, () => {
            rl.close()
            func()
          })
          return
        }
      }
    }
  }
  func()
}

//編輯
function edit (content) {
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0, null)
  process.stdout.write(content)
}

//進度條
function progressBar (progress, max) {
  let string = '['
  for (let run = 0; run < (20/max)*progress && run < 20; run++) {
    string = string + ('\x1b[32m'+'|')
  }
  if (string.length > 180) {
    string = string.substring(0, 180)
  }
  while (string.length < 180) {
    string = string + ('\x1b[37m' + '|')
  }
  string = string + ('\x1b[37m'+`]`)
  return string
}