const fs = require('fs')

module.exports = install

const connect = require('./connect')
const edit = require('./edit')

//安裝Light Engine
async function install (path) {
  if (fs.existsSync(`${path}/LightEngine`) && fs.existsSync(`${path}/LightEngine/index.js`)) {
    edit('[Light Engine]: 所在目錄已經擁有Light Engine (如果您想要更新Light Engine，可使用 le update)')
  } else {
    edit('[Light Engine]: 正在嘗試連線至 Light Engine的伺服器')
    let data = await connect({ type: 'checkServer' })
    edit('[Light Engine]: 正在檢查 Light Engine 的最新版本')
    data = await connect({ type: 'getVersion' })
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
    fs.mkdirSync(`${path}/LightEngine`)
    path = path + '/LightEngine'
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
  let string = ''
  for (let run = 0; run < (20/max)*progress && run < 20; run++) {
    string = string + ('\x1b[32m'+'|')
  }
  if (string.length > 120) {
    string = string.substring(0, 120)
  }
  while (string.length < 120) {
    string = string + ('\x1b[37m' + '|')
  }
  string = `\x1b[37m[${string}\x1b[37m]`
  return string
}