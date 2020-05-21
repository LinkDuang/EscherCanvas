// 线
import Classes from '../classes'
let { EscherBaseObject, Color } = Classes

class Line extends EscherBaseObject {
    constructor(props = {}) {
        super(props)

        this.posistion = {
            start: null,
            end: null,
        }

        this.color = Color.new(255, 192, 203, 0.5)
        this.registerProps(props)
        this.marker = {}
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

        c.beginPath()
        c.moveTo(start.x, start.y)
        c.lineTo(end.x, end.y)
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
        if (start) {
            let { x, y } = this.posistion.start
            context.fillText(start, x, y)

        }
        if (end) {
            let { x, y } = this.posistion.end
            context.fillText(end, x, y)

        }

    }
}

export default Line