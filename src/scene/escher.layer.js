let defaultProps = {
    display: "show", // show, hide
}

class EscherLayer {
    static new(...props) {
        return new this(...props)
    }

    constructor(layer) {
        layer = {...defaultProps, ...layer}
        this.name = layer.name
        this.id = String(Math.random()).slice(2, 10) + layer.name
        this.z = layer.z ? layer.z : 1
        this.display = layer.display
    }

    // todo 设置偏移度、不透明度、变形公式

    setDisplay(display) {
        this.display = display
    }

}

export default EscherLayer