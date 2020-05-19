
import EscherLayer from './escher.layer'
// 场景
class EscherScene {
    // 场景，目的是往场景里添加一个个物体
    // 场景的属性包含了 大小、帧率
    // 场景的方法包含了
    static new(...props) {
        return new this(...props)
    }

    constructor(config = {}) {
        // TODO 可以通过 config 方式来传
        this.justOne = false

        this.fps = 10
        this.canvas = null
        this.context = null

        this.objects = [] // 所有物体(放置在图层中)

        let defaultLayer = EscherLayer.new({ name: "defaultLayer" })
        this.layers = { defaultLayer } // 所有图层
        this.activeLayerKey = "defaultLayer" // 当前操作的图层
    }

    // 注册系列方法
    registerContinuousRendering() {
        let { canvas, context } = this

        // 更新方案 1
        // context.clearRect(0, 0, canvas.width, canvas.height)
        // this.update()
        // this.draw()
        // requestAnimationFrame(() => this.registerContinuousRendering())

        // 更新方案 2
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height)
            this.update()
            this.draw()
            this.registerContinuousRendering()
        }, 1000 / this.fps)
    }

    registerCanvas(props) {
        this.canvas = props.canvas
        this.context = props.context
    }

    registerLayer(layer) {
        let key = layer.name
        this.layers[key] = layer
    }

    registerObject(obj) {
        let { layers, activeLayerKey } = this
        obj.inLayer = layers[activeLayerKey]
        this.objects.push(obj)
    }

    // 设置
    setLayer(name) {
        // 切换当前运行的图层
        this.activeLayerKey = name
    }

    setFps(fps) {
        this.fps = fps
    }

    // 查询方法
    getActiveLayer() {
        let { layers, activeLayerKey } = this
        // 这个应该在 某种特殊查询下才启用
        // return {
        //     key: activeLayerKey,
        //     layer: layers[activeLayerKey],
        // }
        return layers[activeLayerKey]
    }


    // 绘制
    update() {
        // 读取所有的 objects, 然后依次调用他们的 update 方法
        for (let i of this.objects) {
            i.update(this.context)
            i.useRegistedToUpdate(this.context)
        }
    }

    draw() {
        // 读取所有的 objects, 然后依次调用他们的 draw 方法
        // 注意，可以通过 z 向量来取值排序，但是由于 position 本身数据结构不固定，所以这个地方稍微有点麻烦
        // 除非我们强制对不同结构的 position 强制做 z 值得归一化处理，否则我们应该想其他办法

        // 我们额外规定一个「图层」来控制图片的层次，如果不在乎顺序的，可以绘制在同一个图层里
        // 注意，update不必讲顺序，但是draw必须讲顺序
        // if (this.justOne === true) {
        //     return
        // }
        let filted = this.objects.filter(i => {
            return i.inLayer.display === "show"
        })
        let sorted = filted.sort((a, b) => {
            return a.inLayer.z - b.inLayer.z
        })
        for (let i of sorted) {
            i.draw(this.context)
        }
        // this.justOne = true
    }
}

export default EscherScene
