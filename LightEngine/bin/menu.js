#! /usr/bin/env node
const readline = require('readline')

module.exports = menu

const { createPlugin, installPlugin } = require('./plugin')

let path = process.argv[1].split('/')
path.splice(path.length-2, 2)
path = path.join('/')

//CLI主頁
function menu () {
  console.log(`
- Light Engine -
  
update  (u)｜更新Light Engine
register(r)｜註冊一個Light Engine Account
login   (l)｜登入Light Engine Account
plugin  (p)｜插件
｜create [name]     (c)｜創建一個插件文件夾
｜publish [name]    (p)｜發布插件
｜install [name]    (i)｜安裝插件
｜uninstall [name] (un)｜解除安裝插件
｜update [name]     (u)｜更新插件
｜search [tag或name](s)｜搜尋插件
exit    (e)｜關閉CLI
`)
  input()
}

//輸入
async function input () {
  readline.cursorTo(process.stdout, 0, null)
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('指令: ', (command) => {
    command = command.split(' ')
    if (command[0] === 'update' || command[0] === 'u') {
      rl.close()
      console.log('')
      const update = require('./update')
      update(path, () => {
        menu()
      })
    } else if (command[0] === 'plugin' || command[0] === 'p') {
      rl.close()
      console.log('')
      if (command[1] === 'create' || command[1] === 'c') {
        createPlugin(command, path)
      } else if (command[1] === 'install' || command[1] === 'i') {
        installPlugin(command, path)
      }
    } else if (command[0] === 'exit' || command[0] === 'e') {
      rl.close()
      console.log('')
    } else {
      rl.close()
      menu()
    }
  });
}

menu()