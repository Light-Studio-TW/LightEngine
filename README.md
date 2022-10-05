# **Light Engine**

[![Package](https://img.shields.io/npm/v/%2540kmamal%252Fsdl)](https://www.npmjs.com/package/light-engine-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### 一個在JavaScript上的輕量級2D遊戲引擎。

## **安裝**
你可以使用npm來安裝Light Engine。
```
npm install light-engine-js
```

## **範例**
```js
const LE = require('light-engine-js')                        //導入Light Engine
LE.create.game({ type: 'sdl' })     //創建一個遊戲
LE.draw.setColor('white')                                    //將繪製的顏色設為白色
LE.draw.square(0, 0, game.window.width, game.window.height)  //繪製一個正方形
LE.window.display()                                          //將畫面顯示到視窗
```

# **功能**

* [LE](#le)
  * [LE.create](#lecreate)
    * [LE.create.game()](#lecreategame)
  * [LE.delete](#ledelete)
    * [LE.delete.game()](#ledeletegame)
  * [LE.repeat()](#lerepeat)
  * [LE.wait()](#wait)
* [game](#game)
  * [game.create](#gamecreate)
    * [game.create.texture()](#gamecreatetexture)
    * [game.create.audio()](#gamecreateaudio)
    * [game.create.object()](#gamecreateobject)
* [參數](#參數)

# LE

LE是在Light Engine裡最上層的函數，你可以用它來創建遊戲或使用一另一些Light Engine的功能。

## LE.create

你可以使用 LE.create 來創建遊戲。

### LE.create.game()
```js
LE.create.game(data) //創建遊戲
```
* `data <object>`｜創建遊戲的資料 ([查看所有的參數和必要參數](#valuegame))

✅ 返回 [遊戲的Class](game)。

## LE.delete

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
* `time <number>`｜等待的時間 (s)

❌ 不返回任何東西。

# game

game是一個class，他會在使用[LE.create.game()](#lecreategame)後返回。

```js
const { LE } = require('light-engine-js')
let game = LE.create.game({ type: 'sdl' })
```

## game.create

你可以使用 LE.create 來創建材質, 音頻, 物件。

## game.create.texture()
```js
await game.create.texture(data) //創建材質
```
* `data <object>`｜創建材質的的資料 ([查看所有的參數和必要參數](#valuetexture))

✅ 返回一個Object { id, width, height }

## game.create.audio()
```js
await game.create.audio(data) //創建音頻
```
* `data <object>`｜創建音頻的的資料 ([查看所有的參數和必要參數](#valueaudio))

✅ 返回 [音頻的Class](audio)

# 參數

## value.repeat
```js
//默認參數
{
  time: Infinity, //重複的次數｜必須為數字
  interval: 0.1 //每次重複之間的延遲｜必須為數字(ms)
}
```

## value.game
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
  preload_range: 50 //預加載範圍｜必須為數字
}
```

## value.textures
```js
//默認參數
{ 
  id: RandomID, //材質的ID｜(不傳入的話將會自動生成)
  file: undefined //材質的相對路徑｜必要參數
}
```

## value.audio
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
