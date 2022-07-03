class ModelPrototype {
    constructor() {
        this.child = null
        this.useUpdate = {}
        this.inLayer = {}
        this.doDraw = true
        this.onlyId = null
    }

    __useRegistedToUpdate() {
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

    __updateForScene(context, self = this) {
        if (self.child) {
            self.__updateForScene(context, self.child)
        }
        this.update && this.update(context)
    }

    __drawForScene(context, self = this) {
        if (self.child) {
            self.__drawForScene(context, self.child)
        }

        self.draw && self.draw(context)
    }

    accept(obj) {
        this.child = obj
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
}

export default ModelPrototype
