module.exports = { generateID }

const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz1234567890'

//取得隨機數
function getRandom (min,max) {
  return Math.floor(Math.random()*max)+min
}

//生成id
function generateID (all_key) {
  let string = `${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}`
  while (all_key.includes(string)) {
    string = `${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}${letters[getRandom(0, letters.length)]}`
  }
  return string
}