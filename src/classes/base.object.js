// 单个物体基类
class EscherBaseObject {
    constructor() {
        this.useUpdate = {}
        this.inLayer = {}
        this.doDraw = true
        this.onlyId = null
    }

    useRegistedToUpdate() {
        // 根据注册的 update 效果来更新自己
        let keys = Object.keys(this.useUpdate)
        if (keys.length > 0) {
            for (let k of keys) {
                if (this.useUpdate[k]) {
                    this.useUpdate[k](this)
                }
            }
        }
    }

    registerUpdate(name, callback) {
        // 为物体注册一个 update 效果，接收一个名字和回调
        let useUpdate = callback.bind(this)
        this.useUpdate[name] = useUpdate
    }

    unRegisterUpdate(name) {
        // 注销一个 update 效果
        this.useUpdate[name] = null
    }

    update() {

    }

    draw() {

    }


}

export default EscherBaseObject