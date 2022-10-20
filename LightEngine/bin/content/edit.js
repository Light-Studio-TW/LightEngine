const readline = require('readline');

module.exports = edit

//編輯
function edit (content) {
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0, null)
  process.stdout.write(content)
}