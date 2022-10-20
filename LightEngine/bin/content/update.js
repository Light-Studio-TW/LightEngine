const fs = require('fs')

module.exports = update

const connect = require('./connect')
const edit = require('./edit')

//更新
async function update (path) {
  edit('[Light Engine]: 正在嘗試連線至 Light Engine的伺服器')
  let data = await connect({ type: 'checkServer' })
  edit('[Light Engine]: 正在檢查 Light Engine 的最新版本')
  data = await connect({ type: 'getVersion' })
  if (data === require(`${path}/package.json`).version) {
    edit(`[Light Engine]: 你的 Light Engine 以為最新版本 (v${data})`)
  } else {
    let newVersion = data
    edit(`[Light Engine]: 準備下載 Light Engine v${newVersion}`)
    data = await connect({ type: 'getAllFiles' })
    const files = JSON.parse(data).allFiles
    const filesSize = JSON.parse(data).filesSize
    let allFilesSize = 0
    for (let run = 0; run < filesSize.length; run++) {
      allFilesSize+=filesSize[run]
    }
    let progress = 0
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
    edit(`[Light Engine]: 成功下載 Light Engine v${newVersion}`)
  }
}

//進度條
function progressBar (progress, max) {
  let string = '['
  for (let run = 0; run < (15/max)*progress && run < 15; run++) {
    string = string + ('\x1b[32m'+'|')
  }
  if (string.length > 105) {
    string = string.substring(0, 105)
  }
  while (string.length < 105) {
    string = string + ('\x1b[37m' + '|')
  }
  string = string + ('\x1b[37m'+`]`)
  return string
}