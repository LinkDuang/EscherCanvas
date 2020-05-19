// 颜色基类
class Color {
    constructor(r, g, b, a) {
        this.r = r // 0-255
        this.g = g // 0-255
        this.b = b // 0-255
        this.a = a ? a : 1 // 0-1
    }

    static new(...props) {
        return new this(...props)
    }

    // 常见颜色
    static white() {
        return new this(0, 0, 0, 1)
    }
    static pink() {
        return new this(255, 192, 203, 1)
    }
    static green() {
        return new this(0, 255, 0, 1)
    }

    str() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`
    }
}
export default Color