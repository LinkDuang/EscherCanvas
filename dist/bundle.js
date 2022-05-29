(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Escher = {}));
})(this, (function (exports) { 'use strict';

    let defaultProps = {
        display: "show", // show, hide
    };

    class EscherLayer {
        constructor(layer) {
            layer = {...defaultProps, ...layer};
            this.name = layer.name;
            this.id = `${layer.name}(${String(Math.random()).slice(2, 10)})`;
            this.z = layer.z ? layer.z : 1;
            this.display = layer.display;
        }

        
        setDisplay(display) {
            this.display = display;
        }
        
        // todo 设置偏移度、不透明度、变形公式
    }

    // 场景
    class EscherScene {
        // 场景，目的是往场景里添加一个个物体
        // 场景的属性包含了 大小、帧率
        // 场景的方法包含了

        constructor(config = {}) {
            // TODO 可以通过 config 方式来传
            this.justOne = false;
            this.test = 1;
            this.fps = 10;
            this.pause = false;
            this.canvas = null;
            this.context = null;

            this.objects = []; // 所有物体(放置在图层中)

            let defaultLayer = new EscherLayer({ name: 'defaultLayer' });
            this.layers = { defaultLayer }; // 所有图层
            this.activeLayerKey = 'defaultLayer'; // 当前操作的图层
        }

        registerCanvas(props) {
            this.canvas = props.canvas;
            this.context = props.context;
        }

        // 注册系列方法
        registerContinuousRendering() {
            let { canvas, context } = this;

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
                context.clearRect(0, 0, canvas.width, canvas.height);
                this.update();
                this.draw();
                this.registerContinuousRendering();
            }, 1000 / this.fps);
        }

        setFps(fps) {
            this.fps = fps;
        }

        // about layers
        registerLayer(layer) {
            let key = layer.name;
            if (this.layers[key] === undefined) {
                this.layers[key] = layer;
            }
            return this.layers[key]
            // todo 如果已经注册了，报错，提示不能再注册，除非手动覆盖？或者使用 setting
        }

        setLayer(name) {
            // 切换当前运行的图层
            this.activeLayerKey = name;
            return this.layers[this.activeLayerKey]
        }

        getLayers() {
            return {
                layers: this.layers,
                key: this.activeLayerKey,
            }
        }

        getActiveLayer() {
            let { layers, activeLayerKey } = this;
            return layers[activeLayerKey]
        }

        registerObject(obj) {
            let { layers, activeLayerKey } = this;

            let id = obj.onlyId;
            let registed = id && this.objects.find((i) => i.onlyId === obj.onlyId);
            if (id && registed) {
                // console.log(registed, '检查搜索的结果')
                // 已经注册过了，并且是唯一的 id，不允许再注册了
                return registed
            } else {
                obj.inLayer = layers[activeLayerKey];
                this.objects.push(obj);
                return obj
            }
        }

        // 绘制
        update() {
            // 读取所有的 objects, 然后依次调用他们的 update 方法
            for (let i of this.objects) {
                // i.update(this.context)
                i.__updateForScene(this.context);
                i.__useRegistedToUpdate(this.context);
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

            let f1 = this.objects.filter((i) => {
                return i.doDraw
            });
            let filted = f1.filter((i) => {
                return i.inLayer.display === 'show'
            });
            let sorted = filted.sort((a, b) => {
                return a.inLayer.z - b.inLayer.z
            });
            for (let i of sorted) {
                // i.draw(this.context)
                i.__drawForScene(this.context);
            }

            // this.justOne = true
        }
    }

    // 向量基类
    class Vector {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    // 颜色基类
    class Color {
        constructor(r, g, b, a) {
            this.r = r; // 0-255
            this.g = g; // 0-255
            this.b = b; // 0-255
            this.a = a ? a : 1; // 0-1
        }

        // 常见颜色
        static white() {
            return new this(255, 255, 255, 1)
        }
        static black() {
            return new this(0, 0, 0, 1)
        }
        static pink() {
            return new this(255, 192, 203, 1)
        }
        static red() {
            return new this(255, 0, 0, 1)
        }
        static green() {
            return new this(0, 255, 0, 1)
        }
        static blue() {
            return new this(0, 0, 255, 1)
        }

        str() {
            return `rgba(${this.r},${this.g},${this.b},${this.a})`
        }
    }

    class ObjectPrototype {
        constructor() {
            this.child = null;
            this.useUpdate = {};
            this.inLayer = {};
            this.doDraw = true;
            this.onlyId = null;
        }

        __useRegistedToUpdate() {
            // 根据注册的 update 效果来更新自己
            let keys = Object.keys(this.useUpdate);
            if (keys.length > 0) {
                for (let k of keys) {
                    if (this.useUpdate[k]) {
                        this.useUpdate[k](this);
                    }
                }
            }
        }

        __updateForScene(context, self = this) {
            if (self.child) {
                self.__updateForScene(context, self.child);
            }
            this.update && this.update(context);
        }

        __drawForScene(context, self = this) {
            if (self.child) {
                self.__drawForScene(context, self.child);
            }

            self.draw && self.draw(context);
        }

        accept(obj) {
            this.child = obj;
        }

        registerUpdate(name, callback) {
            // 为物体注册一个 update 效果，接收一个名字和回调
            let useUpdate = callback.bind(this);
            this.useUpdate[name] = useUpdate;
        }

        unRegisterUpdate(name) {
            // 注销一个 update 效果
            this.useUpdate[name] = null;
        }
    }

    // 线


    class Line extends ObjectPrototype {
        constructor(props = {}) {
            super(props);
            this.posistion = {
                start: new Vector(0, 0),
                end: new Vector(0, 0),
            };

            this.color = new Color(255, 192, 203, 0.5);
            this.registerProps(props);
            this.marker = {};
            this.offset = new Vector(0, 0);
        }

        registerProps(props) {
            if (props.start) {
                this.posistion["start"] = props.start;
            }

            if (props.end) {
                this.posistion["end"] = props.end;
            }
        }

        setPosistion(start, end) {
            this.posistion = {
                start: start,
                end: end,
            };
        }

        setColor(color) {
            this.color = color;
        }

        setMarker(point, text) {
            this.marker[point] = text;
        }

        setOffset(ofs) {
            this.offset = ofs;
        }


        update() {

        }

        draw(context) {
            let { start, end } = this.posistion;
            // this.drawPoint(context, start)
            // this.drawPoint(context, end)
            this.drawLine(context, start, end);
            this.drawText(context);
        }

        drawLine(context, start, end) {
            let c = context;
            let { x, y } = this.offset;
            c.beginPath();
            c.moveTo(start.x + x, start.y + y);
            c.lineTo(end.x + x, end.y + y);
            c.lineWidth = 1;
            c.strokeStyle = this.color.str();
            c.stroke();
            c.closePath();
        }

        drawPoint(context, point) {
            let arcConfig = [0, 2 * Math.PI, true];
            context.beginPath();
            context.arc(point.x, point.y, 5, ...arcConfig);
            context.closePath();
            context.fillStyle = "rgba(221,66,36,0.7)";
            context.fill();
        }

        drawText(context) {
            context.fillStyle = "black";
            context.font = "normal small-caps normal 14px sans-serif";
            context.textBaseline = 'middle';

            let { start, end } = this.marker;
            let o = this.offset;
            if (start) {
                let { x, y } = this.posistion.start;
                let t = `[${start}]: ${x + o.x}, ${y + o.y}`;
                context.fillText(t, x + o.x, y + o.y);
            }
            if (end) {
                let { x, y } = this.posistion.end;
                let t = `[${end}]: ${x}, ${y}`;
                context.fillText(t, x, y);
            }
        }
    }

    // 单个物体基类
    class EscherBaseObject {
        constructor() {
            this.useUpdate = {};
            this.inLayer = {};
            this.doDraw = true;
            this.onlyId = null;
        }

        useRegistedToUpdate() {
            // 根据注册的 update 效果来更新自己
            let keys = Object.keys(this.useUpdate);
            if (keys.length > 0) {
                for (let k of keys) {
                    if (this.useUpdate[k]) {
                        this.useUpdate[k](this);
                    }
                }
            }
        }

        registerUpdate(name, callback) {
            // 为物体注册一个 update 效果，接收一个名字和回调
            let useUpdate = callback.bind(this);
            this.useUpdate[name] = useUpdate;
        }

        unRegisterUpdate(name) {
            // 注销一个 update 效果
            this.useUpdate[name] = null;
        }

        update() {

        }

        draw() {

        }


    }

    // 有两种三角形：

    class Triangle extends EscherBaseObject {
        constructor(props) {
            super(props);
            // 三角形三个顶点(a, b, c)自然决定了其位置
            this.vertexs = {
                a: new Vector(360, 160),
                b: new Vector(500, 200),
                c: new Vector(510, 400),
            };

            this.containerSize = {}; // 容器 size
            this.containerCuts = {}; // 视频之于容器垂直剧中后的偏差

            this.devMode = true;
        }


        setContainerSize(w, h) {
            this.containerSize.width = w;
            this.containerSize.height = h;
        }

        setContainerCuts(cuts) {
            let { width, height } = cuts;
            this.containerCuts.width = width;
            this.containerCuts.height = height;
        }


        setVertexsWithRelatively(relativeVertexs) {
            let { a, b, c } = relativeVertexs;
            let { width, height } = this.containerSize;
            let cw = this.containerCuts.width / 2;
            let ch = this.containerCuts.height / 2;
            let v = {
                a_start: a[0] * width + cw,
                b_start: b[0] * width + cw,
                c_start: c[0] * width + cw,

                a_end: a[1] * height + ch,
                b_end: b[1] * height + ch,
                c_end: c[1] * height + ch,
            };

            this.vertexs = {
                a: new Vector(v.a_start, v.a_end),
                b: new Vector(v.b_start, v.b_end),
                c: new Vector(v.c_start, v.c_end),
            };
        }


        update() {

        }

        draw(context) {
            let { a, b, c } = this.vertexs;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.lineTo(c.x, c.y);
            context.lineTo(a.x, a.y);

            context.strokeStyle = "white";
            context.lineCap = "round";
            context.stroke();
            context.closePath();

            if (this.devMode === true) {
                this.drawVertexsText(context);
            }
        }

        drawVertexsText(context) {
            context.fillStyle = "white";
            context.font = "normal small-caps normal 18px sans-serif";
            context.textBaseline = 'middle';

            let { a, b, c } = this.vertexs;
            context.fillText(`a(${a.x}, ${a.y})`, a.x, a.y);
            context.fillText(`b(${b.x}, ${b.y})`, b.x, b.y);
            context.fillText(`c(${c.x}, ${c.y})`, c.x, c.y);
        }
    }

    // 通过 n 个点来配置多边形，直接按多个点顺序绘制

    class Polygon extends EscherBaseObject {
        constructor(props) {
            super(props);

            this.vertexs = [
                new Vector(360, 160),
                new Vector(500, 200),
                new Vector(510, 400),
                new Vector(360, 160),
            ];
            this.devMode = true;
        }

        update() {}

        draw(context) {
            // todo 改成 列表循环，不要abc
            let { a, b, c, } = this.vertexs;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.lineTo(c.x, c.y);
            context.lineTo(a.x, a.y);

            context.strokeStyle = 'white';
            context.lineCap = 'round';
            context.stroke();
            context.closePath();

            // 位置(xy)，大小(wh)
            ctx.rect(10, 10, 100, 100);
            ctx.fill();
            
            
            if (this.devMode === true) {
                this.drawVertexsText(context);
            }
        }

        drawVertexsText(context) {
            context.fillStyle = 'white';
            context.font = 'normal small-caps normal 18px sans-serif';
            context.textBaseline = 'middle';

            let { a, b, c } = this.vertexs;
            context.fillText(`a(${a.x}, ${a.y})`, a.x, a.y);
            context.fillText(`b(${b.x}, ${b.y})`, b.x, b.y);
            context.fillText(`c(${c.x}, ${c.y})`, c.x, c.y);
        }
    }

    exports.Color = Color;
    exports.EscherBaseObject = EscherBaseObject;
    exports.Layer = EscherLayer;
    exports.Line = Line;
    exports.ObjectPrototype = ObjectPrototype;
    exports.Polygon = Polygon;
    exports.Scene = EscherScene;
    exports.Triangle = Triangle;
    exports.Vector = Vector;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
