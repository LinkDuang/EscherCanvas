# Escher Canvas
*v 2021.7.19*



## 安装
使用 npm
> `npm install escher-canvas`

使用 yarn
> `yarn add escher-canvas`


## 使用
Escher 内建了一些基类和函数，请基于这些资源来操作，这里有具体的资源文档，引入的方法通常是：

```javascript
import { Vector, Color, Line } from 'escher-canvas' // 向量、颜色、线
```

以 react 为例，为了绘制一个画面，首先在页面上添加一个 `<canvas/>` 元素
```javascript
render(){
    return (
        <canvas width={400} height={300}></canvas>
    )
}
```
在页面初始化之后，用 Eshcer 初始化一个**场景**，并且为这个**场景**，添加一些**物体**。具体方法如下：

```javascript
import { Scene } from 'escher-canvas'

componentDidMount(){
    // 1，拿到 canvas 元素和上下文
    let domCanvas = document.querySelector("canvas")
    let context = domCanvas.getContext('2d')

    // 2，创建一个场景，注册场景在这个 canvas 之下，并且注册自动 render
    this.scene = new Scene()
    this.scene.registerCanvas({
        canvas: domCanvas,
        context: context,
    })
    this.scene.registerContinuousRendering()
}
```

在此之后，使用 `this.scene.registerObject(obj)` 方法来添加一个个物体，具体使用如下：

```javascript
import { Vector, Color, Line } from 'escher-canvas' // 向量、颜色、线

addLine() {
    // 1，创建 Line 的实例
    let line = new Line()

    // 2，设置 Line 的位置，一条线由两个端点确定
    // 端点的位置由 Vector 向量类来表示(x, y, [z])
    let start = new Vector(50, 100)
    let end = new Vector(250, 100)
    line.setPosistion(start, end)

    // 3，将物体注册到场景里
    this.scene.registerObject(line)
}
```

一旦使用 `registerObject` 添加完物体之后，画布上就会显示你画的这条线，由于 `Line` 是内建的类型，因此你可以直接在 `Objects` 里面直接找到它并使用。

> todo 这里是完整的 原生 JavaScript 示例程序、React 示例程序、Vue 示例程序


## Scene

场景里面可以注册各种各样的对象，初始化的时候必须注册一个`canvas`对象来保证有画布可用，之后可以注册包括 `Layer`、`Object` 、`D3Object` 等物体来展示。


### Scene.new()
静态方法，创建一个 scene 对象并返回
```javascript
let scene = new Scene()
```

### Scene.registerCanvas({canvas, context})
传入一个 `canvas` 元素和 `context` 上下文，让 `scene` 知道该在哪里绘制
```javascript
let domCanvas = document.querySelector("canvas")
let context = domCanvas.getContext('2d')

scene.registerCanvas({
    canvas: domCanvas,
    context: context,    
})
```

### Scene.registerContinuousRendering()
调用该方法后，会不停刷新画布
```javascript
scene.registerContinuousRendering()
```


### Scene.setFps(fps)
调用该方法后，设置刷新的 fps，
```javascript
scene.setFps(30) // 30 帧每秒
```

### Scene.registerLayer(layer)
调用该方法后，会往 `scene` 里注册一个 `Layer` 对象，场景允许有多个图层，但禁止 `Layer` 出现重名。

> 返回一个 layer 对象
```javascript
import { Layer } from 'escher-canvas' 
let layer = new Layer({
    name: 'name_dududu',
})
scene.registerLayer(layer)
```

### Scene.setLayer(layername)
通常，`scene` 里会有一个默认的 `layer` 被激活，在添加`Object` 的时候只会往激活的 `layer` 里面添加。

可以用这个方法来切换当前激活的 layer

返回一个 layer 对象
```javascript
scene.setLayer("name_dududu")
```

### Scene.getActiveLayer()
返回当前正被激活的 layer 对象，方便查询
```javascript
scene.getActiveLayer()
```

### Scene.registerObject(obj)
往 `scene` 里注册一个 `Object` 对象，场景允许有多个 `Object`，`Object` 所属的图层是当前正被激活的图层。

```javascript
// 传入一个 Escher object 对象
// 返回一个 Escher object 对象
let line = new Line()
scene.registerObject(line)
```






## Layer
`Layer` 就是图层，一个物体会处在某一个图层里，有了图层之后，我们可以很方便地决定绘制的先后顺序，也可以很方便地隐藏某一个图层，甚至做出扭曲、平移等等操作。

`Scene` 在初始化的时候会自动新建一个 `Layer`，如果你没有注册  `Layer` 并使用的话，你添加的所有物体会处于这个默认的 `Layer` 中




