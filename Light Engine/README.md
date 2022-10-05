# Light Engine
一個在JavaScript上的輕量級2D遊戲引擎。

## 範例
```js
const { LE } = require('./LightEngine/LE')
LE.create.game({ type: 'sdl', width: 500, height: 500 })
LE.draw.setColor('white')
LE.draw.square(0, 0, game.window.width, game.window.height)
LE.window.display()
```