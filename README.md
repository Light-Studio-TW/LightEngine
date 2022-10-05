# **Light Engine**

[![Package](https://img.shields.io/npm/v/%2540kmamal%252Fsdl)](https://www.npmjs.com/package/light-engine-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### 一個在JavaScript上的輕量級2D遊戲引擎。

## **安裝**
你可以使用npm來安裝Light Engine
```
npm install light-engine-js
```

## **範例**
```js
const LE = require('light-engine-js')                        //導入Light Engine
LE.create.game({ type: 'sdl', width: 500, height: 500 })     //創建一個遊戲
LE.draw.setColor('white')                                    //將繪製的顏色設為白色
LE.draw.square(0, 0, game.window.width, game.window.height)  //繪製一個正方形
LE.window.display()                                          //將畫面顯示到視窗
```

# **功能**

* [LE](#le)
  * [LE.create](#lecreate)
    * [LE.create.game](#lecreategame)
  * [LE.delete](#ledelete)
    * [LE.delete.game](#ledeletegame)
  * [delete](#ledelete)
* [參數](#參數)

# LE

LE是在Light Engine裡最上層的函數，你可以用它來創建遊戲或使用一另一些Light Engine的功能。

## LE.create

## LE.create.game
`LE.create.game(data)` 創建遊戲

* `data <object>` 遊戲的資料 ([查看所有的參數和必要參數](#valuegame))

# 參數

## value.game

```js
//默認參數
{
  id: undefined, //必要參數
  name: 'Game', 
  type: undefined, //必須為 sdl, canvas
  width: 500, //必須為數字
  height: 500, //必須為數字
  camera_x: 0, //必須為數字
  camera_y: 0, //必須為數字
  preload_range: 50 //必須為數字
}
```
