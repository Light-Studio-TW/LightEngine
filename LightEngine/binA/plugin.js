const fs = require('fs')
const readline = require('readline');

module.exports = { createPlugin, installPlugin }

const connect = require('./connect')
const menu = require('./menu') 

//創建插件
function createPlugin (command, path) {
  if (command[2] === undefined) {
    console.log('[Light Engine]: 必須輸入 [name] (create plugin [name])')
  } else {
    if (fs.readdirSync(`${path}/Plugin`).includes(command[2])) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(`[Light Engine]: 文件夾 ${path}/Plugin 裡已經有名為 ${command[2]} 的插件 [enter繼續]`, () => {
        rl.close()
        menu()
      })
    } else {
      fs.mkdirSync(`${path}/Plugin/${command[2]}`)
      fs.writeFileSync(`${path}/Plugin/${command[2]}/pluginInfo.json`, JSON.stringify({
        version: '1.0.0',
        description: '',
        main: 'index.js',
        tag: [],
        github: ''
      }, null, 2))
      fs.writeFileSync(`${path}/Plugin/${command[2]}/index.js`, '//這是Plugin的預設main檔案，你可以透過更改 pluginInfo.json 來更改main檔案\n//詳細的Plugin開發文檔可以查看 - https://github.com/Light-Studio-TW/LightEngine')
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(`[Light Engine]: 成功創建在創建插件 ${command[2]} (路徑: ${path}/Plugin/${command[2]}) [enter繼續]`, () => {
        rl.close()
        menu()
      })
    }
  }
}

//安裝插件
async function installPlugin (command, path) {
  if (command[2] === undefined) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(`[Light Engine]: 必須輸入 [name] (plugin install [name])`, () => {
      rl.close()
      menu()
    })
    return
  } else {
    readline.cursorTo(process.stdout, 0, null)
    if (fs.existsSync(`${path}/Plugins/${command[2]}`)) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(`[Light Engine]: 你已經安裝名為 ${command[2]} 的插件了 (如果你想要更新插件，可使用 plugin update ${command[2]}) [enter繼續]`, () => {
        rl.close()
        menu()
      })
    } else {
      edit('[Light Engine]: 正在嘗試連線至Light Engine的伺服器')
      let data = await connect({ type: 'checkServer' })
      if (data !== false) {
        edit(`[Light Engine]: 正在檢查插件 ${command[2]}`)
        data = await connect({ type: 'checkPlugin', name: command[2] })
        if (data !== false) {
          if (data === 'undefined') {
            edit(`[Light Engine]: 沒有名為 ${command[2]} 的插件`)
          } else {
            fs.writeFileSync(`${path}/bin/data.json`, data)
            data = require('./data.json')
            const version = data.version
            edit(`[Light Engine]: 正在準備下載插件 ${command[2]} (v${version})` )
            const files = require(`${path}/bin/data.json`).allFiles
            const filesSize = require(`${path}/bin/data.json`).filesSize
            fs.mkdirSync(`${path}/Plugins/${command[2]}`)
            for(let run = 0; run < files.length; run++) {
              if (files[run].includes('[FOLDER]')) {
                edit(`[Light Engine]: 正在創建文件夾 ${files[run].replaceAll(' [FOLDER]', '')} (${run+1} / ${files.length})`)
                fs.mkdirSync(`${path}/Plugins/${command[2]}/${files[run].replaceAll(' [FOLDER]', '')}`)
              } else {
                edit(`[Light Engine]: 正在下載檔案 ${progressBar(0, filesSize[run])} ${files[run]} (${run+1} / ${files.length})`)
                progress = 0
                data = await connect({ type: 'downloadPluginFile', name: command[2], file: files[run] }, (byte) => {
                  progress+=byte
                  if (progress > filesSize[run]) {
                    progress = filesSize[run]
                  }
                  edit(`[Light Engine]: 正在下載檔案 ${progressBar(progress, filesSize[run])} ${files[run]} (${run+1} / ${files.length})`)
                })
                if (data === false) {
                  func()
                  return
                } else { 
                  fs.writeFileSync(`${path}/Plugins/${command[2]}/${files[run]}`, data)
                }
              }
            }
            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            });
            rl.question(`[Light Engine]: 成功下載插件 ${command[2]} (v${version}) [enter繼續]`, () => {
              rl.close()
              menu()
            })
          }
        }
      }
    }
  }
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