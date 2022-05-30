// 有两种三角形：

// 一种是拿三个顶点
// 做一个个点画成线、一条条线画成面，最终视觉上看起来是个三角形
// 这样的三角形适合用来做差值、渐变、抗锯齿，
// 可以直接当做 3d 图像的基本图元使用
// 甚至可以用来做法向量贴图和光照计算，只要额外设定 uv

// 第二种是一个多边形，只不过只有三个顶点的多边形而已
// 先只在 2d 领域使用这种三角形
import Vector from '../classes/vector'
import ObjectPrototype from '../classes/objectPrototype'

class Triangle extends ObjectPrototype {
  constructor(props) {
    super(props)
    // 三角形三个顶点(a, b, c)自然决定了其位置
    this.vertexs = {
      a: new Vector(360, 160),
      b: new Vector(500, 200),
      c: new Vector(510, 400),
    }

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
    let { a, b, c } = relativeVertexs
    let { width, height } = this.containerSize
    let cw = this.containerCuts.width / 2
    let ch = this.containerCuts.height / 2
    let v = {
      a_start: a[0] * width + cw,
      b_start: b[0] * width + cw,
      c_start: c[0] * width + cw,

      a_end: a[1] * height + ch,
      b_end: b[1] * height + ch,
      c_end: c[1] * height + ch,
    }

    this.vertexs = {
      a: new Vector(v.a_start, v.a_end),
      b: new Vector(v.b_start, v.b_end),
      c: new Vector(v.c_start, v.c_end),
    }
  }

  update() {}

  draw(context) {
    let { a, b, c } = this.vertexs
    context.beginPath()
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.lineTo(c.x, c.y)
    context.lineTo(a.x, a.y)

    context.strokeStyle = 'white'
    context.lineCap = 'round'
    context.stroke()
    context.closePath()

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

export default Triangle
