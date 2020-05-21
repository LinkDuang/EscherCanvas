import Classes from '../classes'
let { EscherBaseObject, Vector } = Classes

class Polygon extends EscherBaseObject {
    constructor(props) {
        super(props)
        // 若干个顶点
        this.offset = { x: 500, y: 500 }
        this.vertexs = [
            Vector.new(100, 100),
            Vector.new(200, 100),
            Vector.new(200, 200),
            Vector.new(100, 200),
        ]

        this.containerSize = {} // 容器 size
        this.containerCuts = {} // 视频之于容器垂直剧中后的偏差

        this.devMode = true
    }


    setContainerSize(w, h) {
        this.containerSize.width = w
        this.containerSize.height = h
    }

    setContainerCuts(cuts) {
        let { width, height } = cuts
        this.containerCuts.width = width
        this.containerCuts.height = height
    }


    setVertexsWithRelatively(relativeVertexs) {
        // let { a, b, c } = relativeVertexs
        // let { width, height } = this.containerSize
        // let cw = this.containerCuts.width / 2
        // let ch = this.containerCuts.height / 2
        // let v = {
        //     a_start: a[0] * width + cw,
        //     b_start: b[0] * width + cw,
        //     c_start: c[0] * width + cw,

        //     a_end: a[1] * height + ch,
        //     b_end: b[1] * height + ch,
        //     c_end: c[1] * height + ch,
        // }

        // this.vertexs = {
        //     a: Vector.new(v.a_start, v.a_end),
        //     b: Vector.new(v.b_start, v.b_end),
        //     c: Vector.new(v.c_start, v.c_end),
        // }
    }


    update() {

    }

    draw(context) {
        // let { a, b, c } = this.vertexs
        context.beginPath()
        let a = this.vertexs[0]
        let { x, y } = this.offset
        context.moveTo(a.x + x, a.y + y)

        for (let i = 1; i < this.vertexs.length; i++) {
            let point = this.vertexs[i]
            context.lineTo(point.x + x, point.y + y)
        }

        context.strokeStyle = "white"
        context.lineCap = "round"
        context.closePath()
        context.stroke()
        // if (this.devMode === true) {
        //     this.drawVertexsText(context)
        // }
    }

    drawVertexsText(context) {
        context.fillStyle = "white"
        context.font = "normal small-caps normal 18px sans-serif"
        context.textBaseline = 'middle'

        let { a, b, c } = this.vertexs
        context.fillText(`a(${a.x}, ${a.y})`, a.x, a.y)
        context.fillText(`b(${b.x}, ${b.y})`, b.x, b.y)
        context.fillText(`c(${c.x}, ${c.y})`, c.x, c.y)
    }
}

export default Polygon




