# **Light Engine**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一個在JavaScript上的輕量級2D遊戲引擎。

Light Engine是一個在JavaScript上的輕量級遊戲引擎，在使用Light Engine時您不用編寫Html，只需要編寫Javascript。Light Engine提供物件.視窗.滑鼠.鍵盤等功能。

## **安裝**
在使用Light Engine前，您需要先安裝Light Engine CLI
(Light Engine CLI目前只支援Linux, Unix, MacOS)
```
1.在終端機輸入 curl https://light-engine.icebrick01.repl.co/install | node

2.在安裝完成後，將目錄切換到要安裝Light Engine的文件夾 (cd <path>)

3.在終端機輸入 le install 來在所在目錄安裝Light Engine

4.安裝完成，您可以開始使用Light Engine了！
```

## **範例**
```js
const LE = require('./LightEngine/index')                        //導入Light Engine
LE.create.game({ type: 'sdl' })                              //創建一個遊戲
LE.draw.setColor('white')                                    //將繪製的顏色設為白色
LE.draw.square(0, 0, game.window.width, game.window.height)  //繪製一個正方形
LE.window.display()                                          //將畫面顯示到視窗
```

# **內容**

* [LE](#le)
  * [LE.create](#lecreate)
    * [LE.create.game()](#lecreategame)
  * [LE.delete](#ledelete)
    * [LE.delete.game()](#ledeletegame)
  * [LE.repeat()](#lerepeat)
  * [LE.wait()](#wait)
* [game](#game)
  * [game.setName()](#gamesetname)
  * [game.setWidth()](#gamesetwidth)
  * [game.changeWidth()](#gamechangewidth)
  * [game.setHeight()](#gamesetheight)
  * [game.changeHeight()](#gamechangeheight)
  * [game.setPreloadRange()](#gamesetpreloadRange)
  * [game.changePreloadRange()](#gamechangepreloadRange)
  * [game.getColor()](#gamegetcolor)
  * [game.displayOperations()](#gamedisplayoperations)
  * [game.event()](#gameevent)
  * [game.callEvent()](#gamecallEvent)
  * [game.create](#gamecreate)
    * [game.create.texture()](#gamecreatetexture)
    * [game.create.audio()](#gamecreateaudio)
    * [game.create.object()](#gamecreateobject)
  * [game.delete](#gamedelete)
    * [game.delete.texture()](#gamedeletetexture)
    * [game.delete.audio()](#gamedeleteaudio)
    * [game.delete.object()](#gamedeleteobject)
* [game.window](#gamewindow)
  * [game.window.setTitle()](#gamewindowsettitle)
  * [game.window.setPosition()](#gamewindowsetposition)
  * [game.window.changePosition()](#gamewindowchangeposition)
  * [game.window.setSize()](#gamewindowsetsize)
  * [game.window.changeSize()](#gamewindowchangesize)
  * [game.window.setResizable()](#gamewindowsetresizable)
  * [game.window.setFullscreen()](#gamewindowsetfullscreen)
  * [game.window.maximize()](#gamewindowmaximize)
  * [game.window.minimize()](#gamewindowminimize)
  * [game.window.setVisible()](#gamewindowsetvisible)
  * [game.window.setBorderless()](#gamewindowsetborderless)
  * [game.window.display()](#gamewindowdisplay)
  * [game.window.event()](#gamewindowevent)
* [game.mouse](#gamemouse)
  * [game.mouse.getPosition()](#gamemousegetposition)
  * [game.mouse.getX()](#gamemousegetx)
  * [game.mouse.getY()](#gamemousegety)
  * [game.mouse.event()](#gamemouseevent)
* [game.keyboard](#gamekeyboard)
  * [game.keyboard.keyDown()](#gamekeyboardkeydown)
  * [game.keyboard.keyUp()](#gamekeyboardkeyup)
* [object](#object)
  * [object.setPosition()](#objectsetposition)
  * [object.changePosition()](#objectchangeposition)
  * [object.setX()](#objectsetx)
  * [object.changeX()](#objectchangex)
  * [object.setY()](#objectsety)
  * [object.changeY()](#objectchangey)
  * [object.setTexture()](#objectsettexture)
  * [object.setLayer()](#objectsetlayer)
  * [object.changeLayer()](#objectchangelayer)
  * [object.setSize()](#objectsetsize)
  * [object.changeSize()](#objectchangesize)
  * [object.setWidth()](#objectsetwidth)
  * [object.changeWidth()](#objectchangewidth)
  * [object.setHeight()](#objectsetheight)
  * [object.changeHeight()](#objectchangeheight)
  * [object.setAngle()](#objectsetangle)
  * [object.changeAngle()](#objectchangeangle)
  * [object.setHitbox()](#objectsethitbox)
  * [object.changeHitbox()](#objectchangehitbox)
  * [object.facing()](#objectfacing)
  * [object.move()](#objectmove)
  * [object.travelTo()](#objecttravelto)
  * [object.touch()](#objecttouch)
* [value](#value) 
  * [value.repeat](#valuerepeat)
  * [value.create](#valuecreate)
  * [value.create.texture](#valuecreatetexture)
  * [value.create.audio](#valuecreateaudio)
  * [value.create.object](#valuecreateobject)
  * [value.create.effect](#valuecreateeffect)
  * [value.create.window](#valuecreatewindow)
  * [value.create.mouse](#valuecreatemouse)

# LE

LE是在Light Engine裡最上層的函數，你可以用它來創建遊戲或使用一另一些Light Engine的功能。

##  LE.create

你可以使用 LE.create 來創建遊戲。

### LE.create.game()
```js
LE.create.game(data) //創建遊戲
```
* `data <object>`｜創建遊戲的資料 ([查看所有的參數和必要參數](#valuegame))

✅ 返回 [遊戲的Class](game)。

##  LE.delete

你可以使用 LE.delete 來刪除遊戲。

### LE.delete.game()
```js
LE.delete.game(game) //刪除遊戲
```
* `game <id, class>`｜遊戲的ID或Class

❌ 不返回任何東西。

## LE.repeat()
`LE.repeat(data, func, func2)`｜重複

* `data <object>`｜重複的次數.延遲 ([查看所有的參數](#valuerepeat))
* `func <function>`｜在重複時呼叫
* `func2 <function>`｜在重複結束後呼叫

✅ 返回一個Class，你可以透過呼叫Class裡的stop函數來停止重複。

## LE.wait()
```js
await LE.wait(time) //等待
```
* `time <number>`｜等待的時間 (m)

❌ 不返回任何東西。

# game

game是一個class，他會在使用[LE.create.game()](#lecreategame)後返回，你可以透過Class裡面的參數來取得遊戲的參數，但不能直接更改，你只能透過Class裡的函數來設定.更改參數。

```js
const { LE } = require('light-engine-js')
let game = LE.create.game({ type: 'sdl' })
```

```js
//不同類型會有不同的參數

//sdl
{
  id, //遊戲的ID
  name, //遊戲的名稱
  type, //遊戲的類型
  preload_range //預加載範圍 (number)
}

//canvas
{
  id, //遊戲的ID
  name, //遊戲的名稱
  type, //遊戲的類型
  width, //遊戲的寬度 (number)
  height, //遊戲的高度 (number)
  preload_range //預加載範圍 (number)
}
```

## 遊戲Class 所有可用功能
|功能名稱 |註解     |sdl   |canvas|
|:----   |:----:  |:----:|:----:|
|window  |視窗    |✅     |❌    |
|mouse   |滑鼠    |✅     |❌    |
|keyboard|鍵盤    |✅     |❌    |
|create  |創建    |✅     |✅    |
|delete  |刪除    |✅     |✅    |
|get     |取得    |✅     |✅    |
|draw    |繪製    |✅     |✅    |
  
## 遊戲Class 所有可用函數
|函數名稱           |註解              |sdl   |canvas|參數                        |返回              |
|:----             |:----            |:----:|:----:|:----                      |:----            |
|setName           |設定遊戲的名稱     |❌    |✅     |`(name)`                   |game.name        |
|setWidth          |設定遊戲的寬度     |❌    |✅     |`(value <number>)`         |game.width       |
|changeWidth       |改變遊戲的寬度     |❌    |✅     |`(value <number>)`         |game.width       | 
|setHeight         |設定遊戲的高度     |❌    |✅     |`(value <number>)`         |game.height      |
|changeHeight      |改變遊戲的高度     |❌    |✅     |`(value <number>)`         |game.height      |
|setPreloadRange   |設定遊戲的預加載範圍|✅    |✅     |`(value <number>)`         |game.preloadRange|
|changePreloadRange|改變遊戲的預加載範圍|✅    |✅     |`(value <number>)`         |game.preloadRange|
|displayOperations |顯示優化          |✅    |✅     |                           |undefined        |
|event             |聆聽事件          |✅    |✅     |`(name, func  <function> )`|class            |
|callEvent         |呼叫事件          |✅    |✅     |`(name, value)`            |呼叫的事件數量      |  

## game.setName()
```js
game.setName(name) //更改遊戲名稱
```
* `name`｜遊戲的新名稱 (必要參數)

✅ 返回 game.name

## game.setWidth()
```js
game.setWidth(value) //設定遊戲的寬度
```
* `value <number>`｜遊戲的新寬度 (必要參數)

✅ 返回 game.width

## game.changeWidth()
```js
game.changeWidth(value) //更改遊戲的寬度
```
* `value <number>`｜改變的值 (必要參數)

✅ 返回 game.height

## game.setHeight()
```js
game.setHeight(value) //設定遊戲的高度
```
* `value <number>`｜遊戲的新高度 (必要參數)

✅ 返回 game.height

## game.changeHeight()
```js
game.changeHeight(value) //更改遊戲的高度
```
* `value <number>`｜改變的值 (必要參數)

✅ 返回 game.height

## game.setPreloadRange()
```js
game.setPreloadRange(value) //設定遊戲的預加載範圍
```
* `value <number>`｜遊戲的新預加載範圍 (必要參數)

✅ 返回 game.preloadRange

## game.changePreloadRange()
```js
game.changePreloadRange(value) //更改遊戲的預加載範圍
```
* `value <number>`｜改變的值 (必要參數)

## game.getColor()
```js
game.getColor(x, y) //取得畫面上的rgba
```
* `x <number>`｜要取得的X位置 (必要參數)
* `y <number>`｜要取得的Y位置 (必要參數)

✅ 返回 { r, g, b, a }

## game.displayOperations()
```js
game.displayOperations(value) //顯示優化
```
顯示優化是在Lighe Engine裡優化遊戲的一總，在您進行顯示優化時，他會將在螢幕內的物件加入顯示清單，這樣遊戲就只需要渲染螢幕內的物件。你可以透過調整[預加載範圍](#gamesetpreloadRange)來在顯示優化的時候加載螢幕外的物件。

❌ 不返回任何東西

## game.event()
```js
game.event(name, func) //聆聽事件

//範例
let event = game.event('test', (value) => {
  console.log(value)
  event.stop()
})  
```

* `name`｜事件的名稱 (必要參數)
* `func <function>`｜在收到事件時觸發的函示 (必要參數)

✅ 返回一個Class，你可以用Class裡的stop函數來停止聆聽事件

## game.callEvent()
```js
game.callEvent(name, value)

//範例
game.callEvent('test', 'hello')
```

* `name`｜要呼叫的事件名稱 (必要參數)
* `value`｜要附加的參數 (可查看[game.event()](#gameevent))

##  game.create

你可以使用 game.create 來創建材質, 音頻, 物件。

### game.create.texture()
```js
await game.create.texture(data) //創建材質
```
* `data <object>`｜創建材質的的資料 ([查看所有的參數和必要參數](#valuetexture)) (必要參數)

✅ 返回一個Object { id, width, height }

### game.create.audio()
```js
await game.create.audio(data) //創建音頻
```
* `data <object>`｜創建音頻的的資料 ([查看所有的參數和必要參數](#valueaudio)) (必要參數)

✅ 返回 [音頻的Class](audio)

### game.create.object()
```js
game.create.object(data) //創建物件
```
* `data <object>`｜創建物件的資料 ([查看所有的參數和必要參數](#valueobject)) (必要參數)

✅ 返回 [物件的Class](object)

## game.delete

你可以用 game.delete 來刪除材質.音頻.物件。

### game.delete.texture()
```js
game.delete.texture(texture) //刪除材質
```

* `texture`｜材質的ID或材質的Class (不傳入的話將會刪除全部材質)

❌ 不返回任何東西

### game.delete.audio()
```js
game.delete.audio(audio) //刪除音頻
```

* `audio`｜音頻的ID或音頻的Class (不傳入的話將會刪除全部音頻)

❌ 不返回任何東西

### game.delete.object()
```js
game.delete.object(object) //刪除物件
```

* `tobject`｜物件的ID或物件的Class (不傳入的話將會刪除全部物件)

❌ 不返回任何東西

# game.window
window是一個Class，如果您的遊戲類型為sdl，那你將可以透過game.window來找到此Class，你可以透過Class裡面的參數來取得視窗的參數，但不能直接更改，你只能透過Class裡的函數來設定.更改參數。

* [查看哪種遊戲類型擁有window功能](#game)

* [查看視窗創建時的參數](#valuecreatewindow)

```js
//視窗的參數
{
  title, //視窗的標題
  x, //視窗的X (number)
  y, //視窗的Y (number)
  width, //視窗的寬度 (number)
  height, //視窗的高度 (number)
  resizable, //視窗是否可重設大小 (boolean)
  fullscreen, //視窗是否為全螢幕 (boolean)
  maximized, //視窗是否最大化 (boolean)
  minimized, //視窗是否最小化 (boolean)
  visible, //視窗是否可見 (boolean)
  borderless //視窗是否消除邊界 (boolean)
}
```

## game.window.setTitle()
```js
game.window.setTitle(title) //設定視窗的標題
```

* `title <string>`｜視窗的新名稱 (必要參數)

✅ 返回 game.window.title

## game.window.setPosition()
```js
game.window.setPosition(x, y) //設定視窗的位置
```

* `x <number>`｜視窗的新X座標 (必要參數)
* `y <number>`｜視窗的新Y座標 (必要參數)

✅ 返回 { x: game.window.x, y: game.window.y }

## game.window.changePosition()
```js
game.window.changePosition(x, y) //改變視窗的位置
```

* `x <number>`｜改變視窗的X座標的值 (必要參數)
* `y <number>`｜改變視窗的Y座標的值 (必要參數)

✅ 返回 { x: game.window.x, y: game.window.y }

## game.window.setSize()
```js
game.window.setSize(width, height) //設定視窗的大小
```

* `width <number>`｜視窗的新寬度 (必要參數)
* `height <number>`｜視窗的新高度 (必要參數)

✅ 返回 { width: game.window.width, height: game.window.height }

## game.window.changeSize()
```js
game.window.changeSize(width, height) //改變視窗的大小
```

* `width <number>`｜改變視窗寬度的值 (必要參數)
* `height <number>`｜改變視窗高度的值 (必要參數)

✅ 返回 { width: game.window.width, height: game.window.height }

## game.window.setResizable()
```js
game.window.setResizable(boolean) //設定視窗是否可重設大小
```

* `boolean <boolean>`｜視窗是否可重設大小 (必要參數)

✅ 返回 game.window.resizable

## game.window.setFullscreen()
```js
game.window.setFullscreen(boolean) //設定視窗是否為全螢幕
```

* `boolean <boolean>`｜視窗是否為全螢幕 (必要參數)

✅ 返回 game.window.fullscreen

## game.window.maximize()
```js
game.window.maximize() //將視窗最大化
```

❌ 不返回任何東西

## game.window.minimize()
```js
game.window.minimize() //將視窗最小化
```

❌ 不返回任何東西

## game.window.setVisible()
```js
game.window.setVisible(boolean) //設定視窗是否可見
```

* `boolean <boolean>`｜視窗是否可見 (必要參數)

✅ 返回 game.window.visible

## game.window.setBorderless()
```js
game.window.setBorderless(boolean) //設定視窗是否消除邊界
```

* `boolean <boolean>`｜視窗是否消除邊界 (必要參數)

✅ 返回 game.window.setBorderless()

## game.window.display()
```js
game.window.display() //將遊戲的畫面顯示到視窗
```

❌ 不返回任何東西

## game.window.event()
```js
game.window.event(name, callback) //聆聽視窗的事件 (如視窗移動, 視窗大小改變等)
```

* `name <string>`｜事件名稱 (必要參數)
* `callback <function>`｜收到事件時觸發的函數 (必要參數)

### 所有視窗的事件
|事件名稱   |註解             |返回             |
|:----:    |:----:          |:----:          |
|show      |視窗顯示時觸發     |undefined       |
|hide      |視窗隱藏時觸發     |undefined       |
|move      |視窗移動時觸發     |{x, y}          |
|maximize  |視窗最大化時觸發   |undefined       |
|minimize  |視窗最小化時觸發   |undefined       |
|resize    |視窗大小改變時觸發  |{width, height}|
|mouseHover|滑鼠懸停在視窗時觸發|undefined       |
|mouseLeave|滑鼠離開視窗時觸發  |undefined      |

# game.mouse
mouse是一個Class，如果您的遊戲類型為sdl，那你將可以透過game.mouse來找到此Class，你可以透過Class裡面的參數來取得滑鼠的參數，但不能直接更改，你只能透過Class裡的函數來設定.更改參數。

```js
//滑鼠Class的參數
{ 
  nowPress //現在按下 (object)
}

//nowPress示範
//假設滑鼠按鍵1(左鍵)按下
console.log(game.mouse.nowPress[1]) //true
//假設滑鼠按鍵1(左鍵)沒有按下
console.log(game.mouse.nowPress[1]) //undefined

if (game.mouse.nowPress[1]) {
  console.log('yes')
} else {
  console.log('no')
}
```

## game.mouse.getPosition()
```js
game.mouse.getPosition(type) //取得滑鼠的位置
```

* `type <string>`｜你可以用兩種方式取得滑鼠的X位置，相對於視窗或整個螢幕。兩個類型分別為all, window (如果不輸入的話將會為window)

✅ 返回 { x: mouse.x, y: mouse.y }

## game.mouse.getX()
```js
game.mouse.getX(type) //取得滑鼠的X位置
```

* `type <string>`｜你可以用兩種方式取得滑鼠的X位置，相對於視窗或整個螢幕。兩個類型分別為all, window (如果不輸入的話將會為window)

✅ 返回 mouse.x

## game.mouse.getY()
```js
game.mouse.getY(type) //取得滑鼠的X位置
```

* `type <string>`｜你可以用兩種方式取得滑鼠的Y位置，相對於視窗或整個螢幕。兩個類型分別為all, window (如果不輸入的話將會為window)

✅ 返回 mouse.y

## game.mouse.event()
```js
game.mouse.event(name, callback) //聆聽滑鼠的事件
```

* `name <string>`｜事件的名稱 (必要參數)
* `callback <function>`｜收到事件時觸發的函數 (必要參數)

|事件名稱   |註解             |返回             |
|:----     |:----           |:----           |
|move      |滑鼠移動時觸發    |{x, y}           |
|buttonDown|滑鼠鍵按下時觸發   |{x, y, button}  |
|buttonUp  |滑鼠鍵放開時觸發   |{x, y, button}  |
|wheel     |滑鼠滾輪滾動時觸發 |{x, y}          |

✅ 返回一個Class，你可以用Class裡的stop函數來停止聆聽事件

# game.keyboard

keyboard是一個Class，如果您的遊戲類型為sdl，那你將可以透過game.keyboard來找到此Class，你可以透過Class裡面的參數來取得鍵盤的參數，但不能直接更改，你只能透過Class裡的函數來設定.更改參數。

```js
{
  nowPress //現在按下 (object)
}

//nowPress示範
//假設鍵盤按鍵a按下
console.log(game.mouse.nowPress['a']) //true
//假設鍵盤按鍵a沒有按下
console.log(game.mouse.nowPress['a']) //undefined

if (game.mouse.nowPress['a']) {
  console.log('yes')
} else {
  console.log('no')
}
```

## game.keyboard.keyDown()
```js
game.keyboard.keyDown(callback) //當按鍵按下
```

* `callback (function)`｜按鍵按下後觸發的函數

✅ 返回一個Class，你可以用Class裡的stop函數來停止聆聽事件

## game.keyboard.keyUp()
```js
game.keyboard.keyDown(callback) //當按鍵放開
```

* `callback (function)`｜按鍵放開後觸發的函數

✅ 返回一個Class，你可以用Class裡的stop函數來停止聆聽事件

# object

object是一個Class，會在[創建物件](#gamecreateobject)後返回，你可以透過Class裡面的參數來取得物件的參數，但不能直接更改，你只能透過Class裡的函數來設定.更改參數。

* [創建物件](gamecreateobject)

* [物件的效果](objecteffect)

```js
//物件的參數
{
  id, //物件的ID
  x, //物件的X (number)
  y, //物件的Y (number)
  texture, //物材質的ID
  layer, //物件的層 (number)
  width, //物件的寬度 (number)
  height, //物件的高度 (number)
  angle, //物件的角度 (number)
  effect, //物件的效果 (class)
  hitbox: {
    width, //物件碰撞箱寬度 (number)
    height //物件碰撞箱高度 (number)
  } 
}

//對物件進行操作的範例
let object = game.create.object({ texture: 'Texture' })
object.setPostition(100, 100)
```

## object.setPosition()
```js
object.setPosition(x, y) //設定物件的位置
```

* `x <number>`｜物件的新X座標 (必要參數)
* `y <number>`｜物件的新Y座標 (必要參數)

✅ 返回 { x, y }

## object.changePosition()
```js
object.changePosition(x, y) //調整物件的位置
```

* `x <number>`｜改變物件的X座標的值 (必要參數)
* `y <number>`｜改變物件的Y座標的值 (必要參數)

✅ 返回 { x: object.x, y: object.y }

## object.setX()
```js
object.setX(value) //設定物件的X
```

* `value <number>`｜物件的新X (必要參數)

✅ 返回 object.x

## object.changeX()
```js
object.changeX(value) //調整物件的X
```

* `value <number>`｜改變物件的X座標的值 (必要參數)

✅ 返回 object.x

## object.setY()
```js
object.setY(value) //設定物件的Y
```

* `value <number>`｜物件的新Y (必要參數)

✅ 返回 objec.y

## object.changeY()
```js
object.changeY(value) //調整物件的Y
```

* `value <number>`｜改變物件的Y座標的值 (必要參數)

✅ 返回 object.y

## object.setTexture()
```js
object.setTexture(texture) //設定物件的材質
```

* `texture`｜材質的Class或材質的ID (必要參數)

✅ 返回 object.texture (ID)

## object.setLayer()
```js
object.setLayer(value) //設定物件的層
```

* `value <number>`｜物件的新層 (必要參數)

✅ 返回 object.layer

## object.changeLayer()
```js
object.changeLayer(value) //調整物件的層
```

* `value <number>`｜改變物件的層的值 (必要參數)

✅ 返回 object.layer

## object.setSize()
```js
object.setSize(value) //設定物件的大小
```

* `value <number>`｜物件的新大小 (必要參數)

✅ 返回 { width: object.width, height: object.height }

## object.changeSize()
```js
object.changeSize(value) //調整物件的大小
```

* `value <number>`｜改變物件大小的值 (必要參數)

✅ 返回 { width: object.width, height: object.height }

## object.setWidth()
```js
object.setWidth(value) //設定物件的寬度
```

* `value <number>`｜物件的新寬度 (必要參數)

✅ 返回 object.width

## object.changeWidth()
```js
object.changeWidth(value) //調整物件的寬度
```

* `value <number>`｜改變物件的寬度的值 (必要參數)

✅ 返回 object.width

## object.setHeight()
```js
object.setHeight(value) //設定物件的高度
```

* `value <number>`｜物件的新高度 (必要參數)

✅ 返回 object.height

## object.changeHeight()
```js
object.changeHeight(value) //調整物件的高度
```

* `value <number>`｜改變物件的高度的值 (必要參數)

✅ 返回 object.height

## object.setAngle()
```js
object.setAngle(value) //設定物件的角度
```

* `value <number>`｜物件的新角度 (必要參數)

✅ 返回 object.angle

## object.changeAngle()
```js
object.changeAngle(value) //調整物件的角度
```

* `value <number>`｜改變物件的角度的值 (必要參數)

✅ 返回 object.angle

## object.setHitbox()
```js
object.setHitbox(width, height) //設定物件的碰撞箱
```

* `width <number>`｜物件碰撞箱的新寬度 (必要參數)
* `height <number>`｜物件碰撞箱的新高度 (必要參數)

✅ 返回 { width: object.hitbox.width, height: object.hitbox.height }

## object.changeHitbox()
```js
object.changeHitbox(width, height) //設定物件的碰撞箱
```

* `width <number>`｜改變物件碰中箱寬度的值 (必要參數)
* `height <number>`｜改變物件碰中箱高度的值 (必要參數)

✅ 返回 { width: object.hitbox.width, height: object.hitbox.height }

## object.facing()
```js
object.facing(data) //面朝
```

* `data <object>`｜面朝的資料，可以面朝一個座標，或面朝另一個物件 (必要參數)

```js
//面朝一個座標
object.facing({
  x: 100, //面朝的X座標
  y: 100, //面朝的Y座標
})

//面朝一個物件
object.facing({
  object: 'Object1' //物件的Class或物件的ID
})
```

✅ 返回 object.angle

## object.move()
```js
object.move(value) //往面朝的方向移動
```

* `value <number>`｜移動的距離 (必要參數)

✅ 返回 { x: object.x, y: object.y }

## object.travelTo()
```js
object.move(x, y, time) //滑行到座標
```

* `x <number>`｜目的地的X座標 (必要參數)
* `y <number>`｜目的地的Y座標 (必要參數)
* `time <number>`｜滑行的時間 (必要參數)

❌ 不返回任何東西

## object.touch()
```js
object.move(type, data) //偵測是否碰到東西 (碰撞箱)
```

* `type <string>`｜偵測的類型
* `data <number>`｜偵測的資料

|偵測類型  |註解       |sdl   |canvas|
|:----    |:----     |:----:|:----:|
|mouse    |是否碰到鼠標|✅    | ❌    |
|object   |是否碰到物件|✅    | ✅    |

```js
//偵測是否碰到滑鼠的範例
object.touch('mouse')

//偵測是否碰到物件的範例
object.touch('object', 'Object1')
```

✅ 返回 true 或 false

# 參數

## value.repeat
```js
//默認參數
{
  time: Infinity, //重複的次數｜必須為數字
  interval: 0.1 //每次重複之間的延遲｜必須為數字(ms)
}
```

## value.create

value.create指的是在創建所有.必要的參數

### value.create.game
創建遊戲的參數
```js
//默認參數
{
  id: RandomID, //遊戲的ID｜(不傳入的話將會自動生成)
  name: 'Game', //遊戲名稱(如果遊戲的類型為sdl，在開啟視窗的時候視窗的標題將會為此參數)
  type: undefined, //遊戲的類型｜必要參數, 必須為(sdl, canvas)
  width: 500, //遊戲的寬度｜必須為數字
  height: 500, //遊戲的高度｜必須為數字
  camera_x: 0, //鏡頭的X｜必須為數字
  camera_y: 0, //鏡頭的Y｜必須為數字
  preloadRange: 50 //預加載範圍｜必須為數字
}
```

### value.create.textures
 創建材質的參數
```js
//默認參數
{ 
  id: RandomID, //材質的ID｜(不傳入的話將會自動生成)
  file: undefined //材質的相對路徑｜必要參數
}
```

### value.create.audio
創建音頻的參數
[所有格式 (format)](https://github.com/kmamal/node-sdl#sample-formats)
```js
//默認參數
{
  id: RandomID, //音頻的ID｜(不傳入的話將會自動生成)
  path: undefined, //音頻的絕對路徑｜必要參數
  channels: 1, //頻道數｜必須為數字
  frequency: 44100, //頻率｜必須為數字
  format: 'f32', //格式
  start: 0, //開始的時間｜必須為數字(s)
  end: undefined, //結束的時間｜必須為數字(s)
  volume: 1, //音量｜必須為數字
  speed: 1 //速度｜必須為數字
}
```

### value.create.object
創建物件的參數
[效果的參數](#valueeffect)
```js
{
  id: RandomID, //音頻的ID｜(不傳入的話將會自動生成)
  x: 0, //物件的X｜必須為數字
  y: 0, //物件的Y｜必須為數字
  texture: undefined, //材質的ID或材質的Class｜必要參數
  layer: 1, //物件的層數 (高層的物件會蓋掉低層的物件)｜必須為數字
  width: 0, //物件的寬度 (會去在材質的寬度上做更改，設為0的話就會是原本材質的寬度)｜必須為數字
  height: 0, //物件的高度 (會去在材質的高度上做更改，設為0的話就會是原本材質的高度)｜必須為數字
  angle: 0, //物件角度｜必須為數字
  effect: value.effect, //效果的參數
  hitbox: {
    width: 0, //碰撞箱的寬度
    height: 0 //碰撞箱的高度
  }
}
```

### value.create.effect
創建效果的參數
```js
{
  brightness: 0, //亮度｜必須為數字 (-100~100)
  grayscale: 0, //灰度｜必須為數字 (0~100)
  transparent: 0, //透明度｜必須為數字 (0~100)
  invert: 0, //顏色反轉｜必須為數字 (0~100)
  removeBackground: 0, //去背等級｜必須為數字 (> -1)
  blur: 0, //模糊｜必須為數字 (> -1)
  red: 0, //紅｜必須為數字 (-255~255)
  green: 0, //綠｜必須為數字 (-255~255)
  blue: 0 //藍｜必須為數字 (-255~255)
}
```

### value.create.window
視窗創建時的參數 (會在遊戲創建時自動創建)
```js
{
  title: game.name, //視窗的標題
  x: 0, //視窗的X
  y: 0, //視窗的Y
  width: game.width //視窗的寬度
  height: game.height //視窗的高度
  resizable: false, //視窗是否可重設大小
  fullscreen: false, //視窗是否為全螢幕
  maximized: false, //視窗是否最大化
  minimized: false, //視窗是否最小化
  visible: true, //視窗是否可見
  borderless: false //視窗是否消除邊界
}
```