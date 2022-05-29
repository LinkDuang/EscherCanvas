// 线
import Vector from '../classes/vector'
import Color from '../classes/color'
import ObjectPrototype from '../classes/objectPrototype'


class Line extends ObjectPrototype {
    constructor(props = {}) {
        super(props)
        this.posistion = {
            start: new Vector(0, 0),
            end: new Vector(0, 0),
        }

        this.color = new Color(255, 192, 203, 0.5)
        this.registerProps(props)
        this.marker = {}
        this.offset = new Vector(0, 0)
    }

    registerProps(props) {
        if (props.start) {
            this.posistion["start"] = props.start
        }

        if (props.end) {
            this.posistion["end"] = props.end
        }
    }

    setPosistion(start, end) {
        this.posistion = {
            start: start,
            end: end,
        }
    }

    setColor(color) {
        this.color = color
    }

    setMarker(point, text) {
        this.marker[point] = text
    }

    setOffset(ofs) {
        this.offset = ofs
    }


    update() {

    }

    draw(context) {
        let { start, end } = this.posistion
        // this.drawPoint(context, start)
        // this.drawPoint(context, end)
        this.drawLine(context, start, end)
        this.drawText(context)
    }

    drawLine(context, start, end) {
        let c = context
        let { x, y } = this.offset
        c.beginPath()
        c.moveTo(start.x + x, start.y + y)
        c.lineTo(end.x + x, end.y + y)
        c.lineWidth = 1
        c.strokeStyle = this.color.str()
        c.stroke()
        c.closePath()
    }

    drawPoint(context, point) {
        let arcConfig = [0, 2 * Math.PI, true]
        context.beginPath()
        context.arc(point.x, point.y, 5, ...arcConfig)
        context.closePath()
        context.fillStyle = "rgba(221,66,36,0.7)"
        context.fill()
    }

    drawText(context) {
        context.fillStyle = "black"
        context.font = "normal small-caps normal 14px sans-serif"
        context.textBaseline = 'middle'

        let { start, end } = this.marker
        let o = this.offset
        if (start) {
            let { x, y } = this.posistion.start
            let t = `[${start}]: ${x + o.x}, ${y + o.y}`
            context.fillText(t, x + o.x, y + o.y)
        }
        if (end) {
            let { x, y } = this.posistion.end
            let t = `[${end}]: ${x}, ${y}`
            context.fillText(t, x, y)
        }
    }
}

export default Line