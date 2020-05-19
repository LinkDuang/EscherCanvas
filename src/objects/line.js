// 线
import Classes from '../classes'
let { EscherBaseObject, Color } = Classes

class Line extends EscherBaseObject {
    constructor(props) {
        super(props)

        this.posistion = {
            start: null,
            end: null,
        }
        this.color = Color.pink()
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

    update() {

    }

    draw(context) {
        let { start, end } = this.posistion
        // this.drawPoint(context, start)
        // this.drawPoint(context, end)
        this.drawLine(context, start, end)
    }

    drawLine(context, start, end) {
        let c = context

        c.beginPath()
        c.moveTo(start.x, start.y)
        c.lineTo(end.x, end.y)
        c.lineWidth = 2
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
}

export default Line