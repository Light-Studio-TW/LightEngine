const fs = require('fs')

module.exports = { cli }

const help = require('./help')
const install = require('./install')
const update = require('./update')
const { register, login } = require('./account')
const { createPlugin, publishPlugin } = require('./plugin')

function cli () {
  let path = process.cwd()
  let command = process.argv
  command.splice(0, 2)
  if (command[0] === 'i' || command[0] === 'install') {
    install(path)
  } else if (command.length === 0 || command[0] === 'h' || command[0] === 'help') {
    help()
  } else if (command[0] === 'r' || command[0] === 'register') {
    register()
  } else if (command[0] === 'l' || command[0] === 'login') {
    login()
  } else {
    if (fs.existsSync(`${path}/LightEngine/index.js`)) {
      path = `${path}/LightEngine`
    } else if (!fs.existsSync(`${path}/index.js`)) {
      console.log('[Light Eegine]: 請將當前的目錄調整至Light Engine所在的資料夾')
      return
    }
     if (command[0] === 'u' || command[0] === 'update') {
      update(path)
    } else if (command[0] === 'p' || command[0] === 'plugin') {
      if (command[1] === 'c' || command[1] === 'create') {
        createPlugin(command, path)
      } else if (command[1] === 'p' || command[1] === 'publish') {
        publishPlugin(command, path)
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
cli()