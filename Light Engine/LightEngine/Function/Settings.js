const fs = require('fs')

module.exports = { getSettings, changeSettings }

const { defaultValue } = require('./DefaultValue')

const defaultSettings = {
  'AudioDevice': 'audio',
  'ShowHitbox': false,
  'SaveTextureBuffer': 10
}

//檢查設定檔案
function checkSettingFile (settings) {
  let all_key = Object.keys(defaultSettings)
  let change = false
  for (let run = 0; run < all_key.length; run++) {
    if (settings[all_key[run]] === undefined) {
      settings[all_key[run]] = defaultSettings[all_key[run]]
      change = true
    }
  }
  if (change) {
    fs.writeFileSync('./LightEngine/settings.json', JSON.stringify(settings, null, 2), (error) => {console.log(error)})
  }
  return settings
}

//取得設定
function getSettings () {
  try {
    let settings = require('../settings.json')
    return checkSettingFile(settings)
  } catch (error) {
    return checkSettingFile({})
  }
}

//改變設定
function changeSettings (settings) {
  settings = defaultValue(defaultSettings, settings)
  fs.writeFileSync('./LightEngine/settings.json', JSON.stringify(settings, null, 2), (error) => {console.log(error)})
  return settings
}