# Escher Canvas
*v 2020.05.19*

# 初见篇

## 安装
使用 npm
> `npm install escher-canvas`

使用 yarn
> `yarn add escher-canvas`

## 使用
在项目中使用
> `import Eschar from 'escher-canvas'`

Escher 内建了一些基类和函数，请基于这些资源来操作，这里有具体的资源文档，引入的方法通常是：
```javascript
let { Vector, Color } = Escher.Classes // 向量和颜色类
let { Line } = Escher.Objects // 线
```


以 react 为例，为了绘制一个画面，请首先在页面上添加一个 `<canvas/>` 元素
```javascript
render(){
    return (
        <canvas width={400} height={300}></canvas>
    )
}
```
在页面初始化之后，用 Eshcer 初始化一个**场景**，并且为这个**场景**，添加一些**物体**。具体方法如下：

```javascript
componentDidMount(){
    // 1，拿到 canvas 元素和上下文
    let domCanvas = document.querySelector("canvas")
    let context = domCanvas.getContext('2d')

    // 2，创建一个场景，注册场景在这个 canvas 之下，并且注册自动 render
    this.scene = Escher.Scene.new()
    this.scene.registerCanvas({
        canvas: domCanvas,
        context: context,
    })
    this.scene.registerContinuousRendering()
}
```

在此之后，使用 `this.scene.registerObject(obj)` 方法来添加一个个物体，具体使用如下：

```javascript
addLine() {
    // 1，创建 Line 的实例
    let line = Line.new()

    // 2，设置 Line 的位置，一条线由两个端点确定
    // 端点的位置由 Vector 向量类来表示(x, y, [z])
    let start = Vector.new(50, 100)
    let end = Vector.new(250, 100)
    line.setPosistion(start, end)

    // 3，将物体注册到场景里
    this.scene.registerObject(line)
}
```

一旦使用 `registerObject` 添加完物体之后，画布上就会显示你画的这条线，由于 `Line` 是内建的类型，因此你可以直接在 `Objects` 里面直接找到它并使用。

> todo 这里是完整的 原生 JavaScript 示例程序、React 示例程序、Vue 示例程序
