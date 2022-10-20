module.exports = input

//輸入
function input (func) {
  process.stdin.resume()
  process.stdin.once("data", data => {
    process.stdin.pause()
    func((data.toString()).replaceAll('\n', ''))
  })
}