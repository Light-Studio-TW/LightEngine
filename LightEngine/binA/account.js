const fs = require('fs')
const readline = require('readline')

module.exports = { register }

const connect = require('./connect')
const menu = require('./menu')

async function register (command) {
  readline.cursorTo(process.stdout, 0, null)
  edit('[Light Engine]: 正在嘗試連線至Light Engine的伺服器')
  let data = await connect({ type: 'checkServer' })
  if (data !== false) {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    let nameSave, passwordSave, emailSave
    rl.question('帳號名(長度必須大於5且小於25字): ', async (name) => {
      if (name.length >= 5 && name.length <= 25) {
        let data = await connect({ type: 'checkAccountExist', name: name })
        if (data === 'true') {
          rl.question(`[Light Engine]: 已經有名為 ${name} 的帳號存在 [enter繼續]`, () => {
            rl.close()
            menu()
          })
          return
        } else {
          nameSave = name
          rl.question(`密碼(長度必須大於5且小於35字): `, async (password) => {
            if (password.length >= 5 && password.length <= 35) {
              passwordSave = password
              rl.question('電子郵件帳號: ', async (email) => {
                if (email.length > 0) {
                  data = await connect({ type: 'checkEmail', email: email })
                  if (data === 'true') {
                    emailSave = email
                    edit('[Light Engine]: 正在嘗試註冊')
                    data = await connect({ type: 'register', name: nameSave, password: passwordSave, email: emailSave })
                    if (data !== false) {
                      if (data === 'nameExist') {
                        rl.question(`[Light Engine]: 已經有名為 ${nameSave} 的帳號存在 [enter繼續]`, () => {
                          rl.close()
                          menu()
                        })
                        return
                      } else if (data === 'emailExist') {
                        rl.question(`[Light Engine]: 該郵件帳號已經被用來註冊另一個帳號了 (${emailSave}) [enter繼續]`, () => {
                          rl.close()
                          menu()
                        })
                        return
                      } else  {
                        fs.writeFileSync('./bin/account.json', JSON.stringify({
                          token: data
                        }))
                        rl.question(`[Light Engine]: 成功註冊 (且以登入) [enter繼續]`, () => {
                          rl.close()
                          menu()
                        })
                        return 
                      }
                    }
                  } else {
                    rl.question(`[Light Engine]: 該郵件帳號並不存在 (${email}) [enter繼續]`, () => {
                      rl.close()
                      menu()
                    })
                    return
                  }
                } else {
                  rl.question(`[Light Engine]: 請輸入一個存在的電子郵件帳號 [enter繼續]`, () => {
                    rl.close()
                    menu()
                  })
                  return
                }
              })
              return
            } else {
              rl.question(`[Light Engine]: 密碼長度必須大於5且小於35字 [enter繼續]`, () => {
                rl.close()
                menu()
              })
              return
            }
          })
          return
        }
      } else {
        rl.question(`[Light Engine]: 帳號名長度必須大於5且小於25字 [enter繼續]`, () => {
          rl.close()
          menu()
        })
        return
      }
    })
    return
  }
  menu()
}

async function login (command) {
  readline.cursorTo(process.stdout, 0, null)
  edit('[Light Engine]: 正在嘗試連線至Light Engine的伺服器')
  let data = connect({ type: 'checkServer' })
  if (data !== false) {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    let nameSave, passwordSave
    rl.question('帳號名稱: ', (name) => {
      data = connect({ type: '' })
    })
  }
}

//編輯
function edit (content) {
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0, null)
  process.stdout.write(content)
}