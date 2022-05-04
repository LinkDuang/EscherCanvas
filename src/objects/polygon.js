// 通过 n 个点来配置多边形，直接按多个点顺序绘制
import Vector from '../classes/vector'
import EscherBaseObject from '../classes/base.object'

class Polygon extends EscherBaseObject {
    constructor(props) {
        super(props)

        this.vertexs = [
            new Vector(360, 160),
            new Vector(500, 200),
            new Vector(510, 400),
            new Vector(360, 160),
        ]
        this.devMode = true
    }

    update() {}

    draw(context) {
        // todo 改成 列表循环，不要abc
        let { a, b, c, } = this.vertexs
        context.beginPath()
        context.moveTo(a.x, a.y)
        context.lineTo(b.x, b.y)
        context.lineTo(c.x, c.y)
        context.lineTo(a.x, a.y)

        context.strokeStyle = 'white'
        context.lineCap = 'round'
        context.stroke()
        context.closePath()

        // 位置(xy)，大小(wh)
        ctx.rect(10, 10, 100, 100);
        ctx.fill();
        
        
        if (this.devMode === true) {
            this.drawVertexsText(context)
        }
    }

    drawVertexsText(context) {
        context.fillStyle = 'white'
        context.font = 'normal small-caps normal 18px sans-serif'
        context.textBaseline = 'middle'

        let { a, b, c } = this.vertexs
        context.fillText(`a(${a.x}, ${a.y})`, a.x, a.y)
        context.fillText(`b(${b.x}, ${b.y})`, b.x, b.y)
        context.fillText(`c(${c.x}, ${c.y})`, c.x, c.y)
    }
}

export default Polygon
