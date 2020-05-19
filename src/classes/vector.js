// 向量基类
class Vector {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    static new(...props) {
        return new this(...props)
    }
}

export default Vector