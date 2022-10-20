const fs = require('fs')

module.exports = { register, login }

const connect = require('./connect')
const edit = require('./edit')
const input = require('./input')

const englishLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_/|[]{}<>'

//註冊
async function register () {
  edit('[Light Engine]: 正在嘗試連線至 Light Engine的伺服器')
  let data = await connect({ type: 'checkServer' })
  let nameSave, passwordSave, emailSave
  edit('帳號名(長度必須大於1且小於25字): ')
  input(async (name) => {
    for (let run = 0; run < name.length; run++) {
      if (!englishLetters.includes(name[run])) {
        console.log('[Light Engine]: 帳號名稱只能為 大小寫英文字母, 數字, -_/|[]{}<>')
        return
      }
    }
    if (name.length < 1 || name.length > 25) { 
      edit('[Light Engine]: 帳號名長度必須大於1且小於25字')
    } else {
      data = await connect({ type: 'checkAccountExist', name: name })
      if (data === 'true') {
        edit(`[Light Engine]: 已經有名為 ${name} 的帳號存在`)
      } else {
        nameSave = name
        edit('密碼(長度必須大於5且小於35字): ')
        input((password) => {
          if (password.length < 5 || password.length > 35) {
            edit('[Light Engine]: 密碼長度必須大於5且小於35字')
          } else {
            passwordSave = password
            edit('電子郵件帳號(email): ')
            input(async (email) => {
              emailSave = email
              edit('[Light Engine]: 正在嘗試註冊')
              data = await connect({ type: 'register', name: nameSave, password: passwordSave, email: emailSave })
              if (data === 'nameExist') {
                edit(`[Light Engine]: 已經有名為 ${name} 的帳號存在`)
              } else if (data === 'emailExist') {
                edit(`[Light Engine]: 該郵件帳號已經被用來註冊另一個帳號了 (${emailSave})`)
              } else {
                fs.writeFileSync(`${__dirname}/account.json`, JSON.stringify({
                  name: nameSave,
                  token: data
                }))
                edit(`[Light Engine]: 成功註冊 (且以登入)\n`)
              }
            })
          }
        })
      }
    }
  })
}

//登入
async function login () {
  edit('[Light Engine]: 正在嘗試連線至 Light Engine的伺服器')
  let data = await connect({ type: 'checkServer' })
  let nameSave, passwordSave
  edit('帳號名: ')
  input(async (name) => {
    data = await connect({ type: 'checkAccountExist', name: name })
    if (data === 'undefined') {
      edit(`[Light Engine]: 找不到名為 ${name} 的帳號`)
    } else {
      nameSave = name
      edit('密碼: ')
      input(async (password) => {
        data = await connect({ type: 'login', name: name, password: password })
        if (data === 'undefined') {
          edit(`[Light Engine]: 找不到名為 ${name} 的帳號`)
        } else if (data === 'passwordWrong') {
          edit('[Light Engine]: 密碼錯誤')
        } else {
          fs.writeFileSync(`${__dirname}/account.json`, JSON.stringify({
            name: nameSave,
            token: data
          }))
          edit('[Light Engine]: 成功登入')
        }
      })
    }
  })
}