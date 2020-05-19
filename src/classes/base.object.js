// 单个物体基类
class EscherBaseObject {
    constructor() {
        this.useUpdate = {}
        this.inLayer = {}
    }

    static new(...props) {
        return new this(...props)
    }

    useRegistedToUpdate() {
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
        let useUpdate = callback.bind(this)
        this.useUpdate[name] = useUpdate
    }

    unRegisterUpdate() {
        this.useUpdate[name] = null
    }

    update() {

    }

    draw() {

    }


}

export default EscherBaseObject