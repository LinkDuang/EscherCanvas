
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
        this.pause = false
        this.canvas = null
        this.context = null

        this.objects = [] // 所有物体(放置在图层中)

        let defaultLayer = EscherLayer.new({ name: "defaultLayer" })
        this.layers = { defaultLayer } // 所有图层
        this.activeLayerKey = "defaultLayer" // 当前操作的图层
    }

    registerCanvas(props) {
        this.canvas = props.canvas
        this.context = props.context
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
            if (this.pause == true) {
                return
            }
            context.clearRect(0, 0, canvas.width, canvas.height)
            this.update()
            this.draw()
            this.registerContinuousRendering()
        }, 1000 / this.fps)
    }


    setFps(fps) {
        this.fps = fps
    }

    // about layers
    registerLayer(layer) {
        let key = layer.name
        if (this.layers[key] === undefined) {
            this.layers[key] = layer
        }
        return this.layers[key]
        // todo 如果已经注册了，报错，提示不能再注册，除非手动覆盖？或者使用 setting
    }

    setLayer(name) {
        // 切换当前运行的图层
        this.activeLayerKey = name
        return this.layers[this.activeLayerKey]
    }

    getLayers() {
        return {
            layers: this.layers,
            key: this.activeLayerKey,
        }
    }

    getActiveLayer() {
        let { layers, activeLayerKey } = this
        return layers[activeLayerKey]
    }



    registerObject(obj) {
        let { layers, activeLayerKey } = this

        let id = obj.onlyId
        let registed = id && this.objects.find(i => i.onlyId === obj.onlyId)
        if (id && registed) {
            // console.log(registed, '检查搜索的结果')
            // 已经注册过了，并且是唯一的 id，不允许再注册了
            return registed
        } else {
            obj.inLayer = layers[activeLayerKey]
            this.objects.push(obj)
            return obj
        }
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

        let f1 = this.objects.filter(i => {
            return i.doDraw
        })
        let filted = f1.filter(i => {
            return i.inLayer.display === "show"
        })
        let sorted = filted.sort((a, b) => {
            return a.inLayer.z - b.inLayer.z
        })
        for (let i of sorted) {
            i.draw(this.context)
        }
        // console.log('当前场景绘制的length', sorted.length)

        // this.justOne = true
    }
}

export default EscherScene
