// 画笔基类
import Color from "./color"

// todo 画笔功能暂未完成，目前无法使用

// 默认值的设定参考了以下文档：
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D
const defaultBrushProps = {
    // 线型
    lineWidth: 1,
    lineCap: "butt",
    lineJoin: "miter",
    miterLimit: "miterLimit",
    lineDashOffset: 0,

    // 文本样式
    font: "10px sans-serif",
    textAlign: "start",
    textBaseline: "alphabetic",
    direction: "inherit",

    // 填充和描边样式
    fillStyle: "#000",
    strokeStyle: "#000",

    lineWidth: 1, //线条粗细
}

class Brush {
    // todo, 通过传入的 context 构造一个画笔，
    // 但是最重要的是还原画笔到某个初始状态
    // 也可以使用栈来保存多个画笔

    // 注意，画笔通常不设置颜色，因为物体的颜色通常由一个 color 传入

    static new(...props) {
        return new this(...props)
    }

    constructor(brush) {
        brush = { ...brush, ...defaultBrushProps }
        this.brushStyle = brush
        this.offset = 1
    }

    // 内置笔刷
    static boldLine(context) {
        let props = {
            lineWidth: 5,
        }
        let brush = new this(props)
        context && brush.setContext(context)
        return brush
    }

    setContext(context) {
        Object.keys(this.brushStyle).forEach(k => {
            context[k] = this.brushStyle[k]
        })
    }

    setDefault() {
        this.brushStyle = defaultBrushProps
    }
}

export default Brush