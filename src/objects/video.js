import Classes from '../classes'
let { EscherBaseObject, Vector } = Classes

class Video extends EscherBaseObject {
    constructor(props) {
        super(props)
        this.ref_video = props.ref
        // let { videoWidth, videoHeight } = this.ref_video
        // 这一行可以获取 视频源本身的宽高
        this.scale = "16:9"

        // x, y 表示视频的左上角位置, z-1 通常表示作为底部可以被覆盖
        this.posistion = Vector.new(0, 10, -1)

        // 容器宽高，用以保证居中，并且永远不会超出这个范围
        this.containerSize = {
            width: 480,
            height: 270,
        }
        // size
        this.size = {
            width: 480,
            height: 270,
        }

        // this.test()
    }

    getCuts(){
        return {
            width: this.containerSize.width - this.size.width,
            height: this.containerSize.height - this.size.height,
        } 
    }

    _根据宽度计算高度(width) {
        let scale_w = Number(this.scale.split(':')[0])
        let scale_h = Number(this.scale.split(':')[1])
        let h = (width / scale_w) * scale_h
        return h
    }

    _根据高度计算宽度(height) {
        let scale_w = Number(this.scale.split(':')[0])
        let scale_h = Number(this.scale.split(':')[1])
        let w = (height / scale_h) * scale_w
        return w
    }

    setContainerSize(w, h) {
        this.containerSize.width = w
        this.containerSize.height = h
    }

    setSize(w, h) {
        let h2 = this._根据宽度计算高度(w)
        let w2 = w
        if(h2 < this.containerSize.height){
            let cut = 0.5 * (this.containerSize.height - h2) //两者差值的一半
            let v = Vector.new(0, cut, -1)
            this.setPosistion(v)
        } else {
            w2 = this._根据高度计算宽度(h)
            h2 = h
            let cut = 0.5 * (this.containerSize.width - w2) //两者差值的一半
            let v = Vector.new(cut, 0, -1)
            this.setPosistion(v)
        }
        this.size.width = w2
        this.size.height = h2
    }

    update() {

    }

    draw(context) {
        let { width, height } = this.size
        let { x, y } = this.posistion
        context.drawImage(this.ref_video, x, y, width, height)
    }
}

export default Video