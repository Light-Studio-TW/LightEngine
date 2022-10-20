module.exports = help

//CLI主頁
function help () {
  console.log(`
- Light Engine -
install  (i)｜在所在的目錄中挨裝Light Engine
update   (u)｜更新Light Engine
register (r)｜註冊一個Light Engine Account
login    (l)｜登入Light Engine Account
plugin   (p)｜插件
｜create [name]     (c)｜創建一個插件文件夾
｜publish [name]    (p)｜發布插件
｜install [name]    (i)｜安裝插件
｜uninstall [name] (un)｜解除安裝插件
｜update [name]     (u)｜更新插件
｜search [tag或name](s)｜搜尋插件
exit    (e)｜關閉CLI
  `)
}