const fs = require('fs')
const utf8 = require('utf8')

module.exports = { createPlugin, publishPlugin }

const connect = require('./connect')
const edit = require('./edit')

const englishLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_/|[]{}<>'

//創建插件
async function createPlugin (command, path) {
  if (command[2] === undefined) {
    edit('[Light Engine]: 必須輸入 [name] (publish create [name])')
  } else if (require(`${__dirname}/account.json`).token === undefined) {
    edit('[Light Engine]: 你還沒有登入Light Engine，請先登入或註冊一個帳號')
  } else {
    for (let run = 0; run < command[2].length; run++) {
      if (!englishLetters.includes(command[2][run])) {
        edit('[Light Engine]: 插件名稱只能為 大小寫英文字母, 數字, -_/|[]{}<>')
        return
      }
    }
    edit('[Light Engine]: 正在取得帳號')
    try {
      fs.mkdirSync(`${path}/Plugins/${command[2]}`)
      fs.writeFileSync(`${path}/Plugins/${command[2]}/pluginInfo.json`, JSON.stringify({
        version: '1.0.0',
        description: '',
        main: 'index.js',
        tag: [],
        github: ''
      }, null, 2))
      fs.writeFileSync(`${path}/Plugins/${command[2]}/index.js`, `//這是Plugin的預設main檔案，你可以透過更改 pluginInfo.json 來更改main檔案
//Light Engine會從main檔案require東西

module.exports = { test }

function test (content) {
  console.log(content)
}

//詳細的Plugin開發文檔可以查看 - https://github.com/Light-Studio-TW/LightEngine`)
      edit(`[Light Engine]: 成功創建插件 ${command[2]} (路徑: ${path}/Plugins/${command[2]})`)
    } catch (error) {
      edit(`[Light Engine]: 您安裝的插件已經有名為 ${command[2]} 的插件`)
    }
  }
}

//上傳插件
async function publishPlugin (command, path) {
  if (command[2] === undefined) {
    edit('[Light Engine]: 必須輸入 [name] (publish publish [name])')
  } else if (require(`${__dirname}/account.json`).token === 'undefined') {
    edit('[Light Engine]: 你還沒有登入Light Engine，請先登入或註冊一個帳號')
  } else {
    let data = await connect({ type: 'checkPlugin', name: command[2] })
    let plugin
    if (data !== 'undefined') {
      plugin = JSON.parse(data)
    }
    if (fs.existsSync(`${path}/Plugins/${command[2]}`)) {
      let allFiles = getAllFiles(`${path}/Plugins/${command[2]}`, undefined, [])
      let filesSize = 0
      for (let run = 0; run < allFiles.length; run++) {
        if (!allFiles[run].includes('[FOLDER]')) {
          filesSize += fs.statSync(`${path}/Plugins/${command[2]}/${allFiles[run]}`).size
        }
      }
      allFiles.splice(allFiles.indexOf('pluginInfo.json'), 1)
      edit('[Light Engine]: 正在取得帳號')
      data = await connect({ type: 'getAccount', token: require(`${__dirname}/account.json`).token })
      if (data === 'accountNotFound') {
        edit(`[Light Engine]: 找不到帳號 ${require(`${__dirname}/account.json`).name} (有可能是因為此帳號被刪除，或此帳號已在另一個設備上登入，請再重新登入一次)\n`)
      } else {
        let account = JSON.parse(data)
        if (filesSize > account.storageSpace[1]) {
          edit(`[Light Engine]: 您的Light Engine儲存空間只有 ${account.storageSpace[1]} MB (您的儲存空間還剩 ${Math.round((account.storageSpace[1]-account.storageSpace[0])/1000000)} MB，此插件的大小為 ${Math.round((filesSize/1000000) * 100) / 100} MB)`)
        } else {
          let pluginInfo = require(`${path}/Plugins/${command[2]}/pluginInfo.json`)
          edit('[Light Engine]: 正在上傳插件資料')
          data = await connect({ type: 'uploadPluginInfo', name: command[2], version: pluginInfo.version, account: account.id, description: pluginInfo.description, main: pluginInfo.main, tag: pluginInfo.tag, github: pluginInfo.github})
          if (data === 'missingPermissions') {
            edit(`[Light Engine]: 你沒有權限對插件 ${command[2]} 更改 (此插件名稱可能已被其他插件使用)`)
          } else {
            for (let run = 0; run < allFiles.length; run++) {
              edit(`[Light Engine]: 正在上傳檔案 ${allFiles[run]} (${run+1} / ${allFiles.length})`)
              data = await connect({ type: 'uploadPluginFile', name: command[2], account: account.id, fileName: allFiles[run], file: utf8.encode(fs.readFileSync(`${path}/Plugins/${command[2]}/${allFiles[run]}`).toString().replaceAll('\n', '[NEWLINE]'))})
              if (data === 'accountNotFound') {
                edit(`[Light Engine]: 找不到帳號 ${require(`${__dirname}/account.json`).name} (請在重新登入一次)`)
                return
              } else if (data === 'storageSpaceFull') {
                edit(`[Light Engine]: 您的Light Engine儲存空間只有 ${account.storageSpace[1]} MB (您的儲存空間還剩 ${Math.round((account.storageSpace[1]-account.storageSpace[0])/1000000)} MB，此插件的大小為 ${Math.round((filesSize/1000000) * 100) / 100} MB)`)
                return
              } else if (data === 'missingPermissions') {
                edit(`[Light Engine]: 你沒有權限對插件 ${command[2]} 更改 (此插件名稱可能已被其他插件使用)`)
              }
            }     
            edit(`[Light Engine]: 成功上傳插件 ${command[2]} (v${pluginInfo.version})`)
          }
        }
      }
    } else {
      edit(`[Light Engine]: 以安裝的插件中沒有名為 ${command[2]} 的插件`)
    }
  }
}

//取得所有的檔案路徑
function getAllFiles (path, folder, files) {
  let filesInFolder = fs.readdirSync(path)
  for (let run = 0; run < filesInFolder.length; run++) {
    if (fs.lstatSync(`${path}/${filesInFolder[run]}`).isDirectory()) {
      files.push(`${filesInFolder[run]} [FOLDER]`)
      files = getAllFiles (`${path}/${filesInFolder[run]}`, filesInFolder[run], files)
    } else {
      if (folder === undefined) {
        files.push(`${filesInFolder[run]}`)
      } else {
       files.push(`${folder}/${filesInFolder[run]}`) 
      }
    }
  }
  return files
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