function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var defaultProps = {
  display: "show" // show, hide

};

var EscherLayer = /*#__PURE__*/function () {
  function EscherLayer(layer) {
    _classCallCheck(this, EscherLayer);

    layer = _objectSpread2(_objectSpread2({}, defaultProps), layer);
    this.name = layer.name;
    this.id = "".concat(layer.name, "(").concat(String(Math.random()).slice(2, 10), ")");
    this.z = layer.z ? layer.z : 1;
    this.display = layer.display;
  }

  _createClass(EscherLayer, [{
    key: "setDisplay",
    value: function setDisplay(display) {
      this.display = display;
    } // todo 设置偏移度、不透明度、变形公式

  }]);

  return EscherLayer;
}();

var EscherScene = /*#__PURE__*/function () {
  // 场景，目的是往场景里添加一个个物体
  // 场景的属性包含了 大小、帧率
  // 场景的方法包含了
  function EscherScene() {

    _classCallCheck(this, EscherScene);

    // TODO 可以通过 config 方式来传
    this.justOne = false;
    this.test = 1;
    this.fps = 10;
    this.pause = false;
    this.canvas = null;
    this.context = null;
    this.objects = []; // 所有物体(放置在图层中)

    var defaultLayer = new EscherLayer({
      name: 'defaultLayer'
    });
    this.layers = {
      defaultLayer: defaultLayer
    }; // 所有图层

    this.activeLayerKey = 'defaultLayer'; // 当前操作的图层
  }

  _createClass(EscherScene, [{
    key: "autoRegisterCanvas",
    value: function autoRegisterCanvas() {
      var select = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'canvas';
      var canvasDoms = document.querySelectorAll(select);

      if (canvasDoms.length > 1) {
        throw Error('Make sure there is only one canvas element in the UI, or pass in the exact selector to specify one of them. 请确保界面中只有一个 canvas 元素，或传入准确的选择器来指定其中一个。');
      } else if (canvasDoms.length === 0) {
        throw Error('The canvas element was not found, check the incoming selector. 未找到 canvas 元素，请检查传入的选择器。');
      }

      var canvas = canvasDoms[0];
      this.canvas = canvas;
      var context = canvas.getContext('2d');
      this.context = context;
    }
  }, {
    key: "registerCanvas",
    value: function registerCanvas(props) {
      this.canvas = props.canvas;
      this.context = props.context;
    } // 注册系列方法

  }, {
    key: "registerContinuousRendering",
    value: function registerContinuousRendering() {
      var _this = this;

      var canvas = this.canvas,
          context = this.context; // 更新方案 1
      // context.clearRect(0, 0, canvas.width, canvas.height)
      // this.update()
      // this.draw()
      // requestAnimationFrame(() => this.registerContinuousRendering())
      // 更新方案 2

      setTimeout(function () {
        if (_this.pause == true) {
          return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        _this.update();

        _this.draw();

        _this.registerContinuousRendering();
      }, 1000 / this.fps);
    }
  }, {
    key: "setFps",
    value: function setFps(fps) {
      this.fps = fps;
    } // about layers

  }, {
    key: "registerLayer",
    value: function registerLayer(layer) {
      var key = layer.name;

      if (this.layers[key] === undefined) {
        this.layers[key] = layer;
      }

      return this.layers[key]; // todo 如果已经注册了，报错，提示不能再注册，除非手动覆盖？或者使用 setting
    }
  }, {
    key: "setLayer",
    value: function setLayer(name) {
      // 切换当前运行的图层
      this.activeLayerKey = name;
      return this.layers[this.activeLayerKey];
    }
  }, {
    key: "getLayers",
    value: function getLayers() {
      return {
        layers: this.layers,
        key: this.activeLayerKey
      };
    }
  }, {
    key: "getActiveLayer",
    value: function getActiveLayer() {
      var layers = this.layers,
          activeLayerKey = this.activeLayerKey;
      return layers[activeLayerKey];
    }
  }, {
    key: "registerObject",
    value: function registerObject(obj) {
      var layers = this.layers,
          activeLayerKey = this.activeLayerKey;
      var id = obj.onlyId;
      var registed = id && this.objects.find(function (i) {
        return i.onlyId === obj.onlyId;
      });

      if (id && registed) {
        // console.log(registed, '检查搜索的结果')
        // 已经注册过了，并且是唯一的 id，不允许再注册了
        return registed;
      } else {
        obj.inLayer = layers[activeLayerKey];
        this.objects.push(obj);
        return obj;
      }
    } // 绘制

  }, {
    key: "update",
    value: function update() {
      // 读取所有的 objects, 然后依次调用他们的 update 方法
      var _iterator = _createForOfIteratorHelper(this.objects),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var i = _step.value;

          // i.update(this.context)
          i.__updateForScene(this.context);

          i.__useRegistedToUpdate(this.context);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      // 读取所有的 objects, 然后依次调用他们的 draw 方法
      // 注意，可以通过 z 向量来取值排序，但是由于 position 本身数据结构不固定，所以这个地方稍微有点麻烦
      // 除非我们强制对不同结构的 position 强制做 z 值得归一化处理，否则我们应该想其他办法
      // 我们额外规定一个「图层」来控制图片的层次，如果不在乎顺序的，可以绘制在同一个图层里
      // 注意，update不必讲顺序，但是draw必须讲顺序
      // if (this.justOne === true) {
      //     return
      // }
      var f1 = this.objects.filter(function (i) {
        return i.doDraw;
      });
      var filted = f1.filter(function (i) {
        return i.inLayer.display === 'show';
      });
      var sorted = filted.sort(function (a, b) {
        return a.inLayer.z - b.inLayer.z;
      });

      var _iterator2 = _createForOfIteratorHelper(sorted),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var i = _step2.value;

          // i.draw(this.context)
          i.__drawForScene(this.context);
        } // this.justOne = true

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);

  return EscherScene;
}();

// 向量基类
var Vector = /*#__PURE__*/_createClass(function Vector(x, y, z) {
  _classCallCheck(this, Vector);

  this.x = x;
  this.y = y;
  this.z = z;
});

// 颜色基类
var Color = /*#__PURE__*/function () {
  function Color(r, g, b, a) {
    _classCallCheck(this, Color);

    this.r = r; // 0-255

    this.g = g; // 0-255

    this.b = b; // 0-255

    this.a = a ? a : 1; // 0-1
  } // 常见颜色


  _createClass(Color, [{
    key: "str",
    value: function str() {
      return "rgba(".concat(this.r, ",").concat(this.g, ",").concat(this.b, ",").concat(this.a, ")");
    }
  }], [{
    key: "white",
    value: function white() {
      return new this(255, 255, 255, 1);
    }
  }, {
    key: "black",
    value: function black() {
      return new this(0, 0, 0, 1);
    }
  }, {
    key: "pink",
    value: function pink() {
      return new this(255, 192, 203, 1);
    }
  }, {
    key: "red",
    value: function red() {
      return new this(255, 0, 0, 1);
    }
  }, {
    key: "green",
    value: function green() {
      return new this(0, 255, 0, 1);
    }
  }, {
    key: "blue",
    value: function blue() {
      return new this(0, 0, 255, 1);
    }
  }]);

  return Color;
}();

var ObjectPrototype = /*#__PURE__*/function () {
  function ObjectPrototype() {
    _classCallCheck(this, ObjectPrototype);

    this.child = null;
    this.useUpdate = {};
    this.inLayer = {};
    this.doDraw = true;
    this.onlyId = null;
  }

  _createClass(ObjectPrototype, [{
    key: "__useRegistedToUpdate",
    value: function __useRegistedToUpdate() {
      // 根据注册的 update 效果来更新自己
      var keys = Object.keys(this.useUpdate);

      if (keys.length > 0) {
        var _iterator = _createForOfIteratorHelper(keys),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var k = _step.value;

            if (this.useUpdate[k]) {
              this.useUpdate[k](this);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }, {
    key: "__updateForScene",
    value: function __updateForScene(context) {
      var self = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      if (self.child) {
        self.__updateForScene(context, self.child);
      }

      this.update && this.update(context);
    }
  }, {
    key: "__drawForScene",
    value: function __drawForScene(context) {
      var self = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      if (self.child) {
        self.__drawForScene(context, self.child);
      }

      self.draw && self.draw(context);
    }
  }, {
    key: "accept",
    value: function accept(obj) {
      this.child = obj;
    }
  }, {
    key: "registerUpdate",
    value: function registerUpdate(name, callback) {
      // 为物体注册一个 update 效果，接收一个名字和回调
      var useUpdate = callback.bind(this);
      this.useUpdate[name] = useUpdate;
    }
  }, {
    key: "unRegisterUpdate",
    value: function unRegisterUpdate(name) {
      // 注销一个 update 效果
      this.useUpdate[name] = null;
    }
  }]);

  return ObjectPrototype;
}();

var Line = /*#__PURE__*/function (_ObjectPrototype) {
  _inherits(Line, _ObjectPrototype);

  var _super = _createSuper(Line);

  function Line() {
    var _this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Line);

    _this = _super.call(this, props);
    _this.posistion = {
      start: new Vector(0, 0),
      end: new Vector(0, 0)
    };
    _this.color = new Color(255, 192, 203, 0.5);

    _this.registerProps(props);

    _this.marker = {};
    _this.offset = new Vector(0, 0);
    return _this;
  }

  _createClass(Line, [{
    key: "registerProps",
    value: function registerProps(props) {
      if (props.start) {
        this.posistion["start"] = props.start;
      }

      if (props.end) {
        this.posistion["end"] = props.end;
      }
    }
  }, {
    key: "setPosistion",
    value: function setPosistion(start, end) {
      this.posistion = {
        start: start,
        end: end
      };
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.color = color;
    }
  }, {
    key: "setMarker",
    value: function setMarker(point, text) {
      this.marker[point] = text;
    }
  }, {
    key: "setOffset",
    value: function setOffset(ofs) {
      this.offset = ofs;
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "draw",
    value: function draw(context) {
      var _this$posistion = this.posistion,
          start = _this$posistion.start,
          end = _this$posistion.end; // this.drawPoint(context, start)
      // this.drawPoint(context, end)

      this.drawLine(context, start, end);
      this.drawText(context);
    }
  }, {
    key: "drawLine",
    value: function drawLine(context, start, end) {
      var c = context;
      var _this$offset = this.offset,
          x = _this$offset.x,
          y = _this$offset.y;
      c.beginPath();
      c.moveTo(start.x + x, start.y + y);
      c.lineTo(end.x + x, end.y + y);
      c.lineWidth = 1;
      c.strokeStyle = this.color.str();
      c.stroke();
      c.closePath();
    }
  }, {
    key: "drawPoint",
    value: function drawPoint(context, point) {
      var arcConfig = [0, 2 * Math.PI, true];
      context.beginPath();
      context.arc.apply(context, [point.x, point.y, 5].concat(arcConfig));
      context.closePath();
      context.fillStyle = "rgba(221,66,36,0.7)";
      context.fill();
    }
  }, {
    key: "drawText",
    value: function drawText(context) {
      context.fillStyle = "black";
      context.font = "normal small-caps normal 14px sans-serif";
      context.textBaseline = 'middle';
      var _this$marker = this.marker,
          start = _this$marker.start,
          end = _this$marker.end;
      var o = this.offset;

      if (start) {
        var _this$posistion$start = this.posistion.start,
            x = _this$posistion$start.x,
            y = _this$posistion$start.y;
        var t = "[".concat(start, "]: ").concat(x + o.x, ", ").concat(y + o.y);
        context.fillText(t, x + o.x, y + o.y);
      }

      if (end) {
        var _this$posistion$end = this.posistion.end,
            _x = _this$posistion$end.x,
            _y = _this$posistion$end.y;

        var _t = "[".concat(end, "]: ").concat(_x, ", ").concat(_y);

        context.fillText(_t, _x, _y);
      }
    }
  }]);

  return Line;
}(ObjectPrototype);

var Triangle = /*#__PURE__*/function (_ObjectPrototype) {
  _inherits(Triangle, _ObjectPrototype);

  var _super = _createSuper(Triangle);

  function Triangle(props) {
    var _this;

    _classCallCheck(this, Triangle);

    _this = _super.call(this, props); // 三角形三个顶点(a, b, c)自然决定了其位置

    _this.vertexs = {
      a: new Vector(360, 160),
      b: new Vector(500, 200),
      c: new Vector(510, 400)
    };
    _this.containerSize = {}; // 容器 size

    _this.containerCuts = {}; // 视频之于容器垂直剧中后的偏差

    _this.devMode = true;
    return _this;
  }

  _createClass(Triangle, [{
    key: "setContainerSize",
    value: function setContainerSize(w, h) {
      this.containerSize.width = w;
      this.containerSize.height = h;
    }
  }, {
    key: "setContainerCuts",
    value: function setContainerCuts(cuts) {
      var width = cuts.width,
          height = cuts.height;
      this.containerCuts.width = width;
      this.containerCuts.height = height;
    }
  }, {
    key: "setVertexsWithRelatively",
    value: function setVertexsWithRelatively(relativeVertexs) {
      var a = relativeVertexs.a,
          b = relativeVertexs.b,
          c = relativeVertexs.c;
      var _this$containerSize = this.containerSize,
          width = _this$containerSize.width,
          height = _this$containerSize.height;
      var cw = this.containerCuts.width / 2;
      var ch = this.containerCuts.height / 2;
      var v = {
        a_start: a[0] * width + cw,
        b_start: b[0] * width + cw,
        c_start: c[0] * width + cw,
        a_end: a[1] * height + ch,
        b_end: b[1] * height + ch,
        c_end: c[1] * height + ch
      };
      this.vertexs = {
        a: new Vector(v.a_start, v.a_end),
        b: new Vector(v.b_start, v.b_end),
        c: new Vector(v.c_start, v.c_end)
      };
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "draw",
    value: function draw(context) {
      var _this$vertexs = this.vertexs,
          a = _this$vertexs.a,
          b = _this$vertexs.b,
          c = _this$vertexs.c;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.lineTo(c.x, c.y);
      context.lineTo(a.x, a.y);
      context.strokeStyle = 'white';
      context.lineCap = 'round';
      context.stroke();
      context.closePath();

      if (this.devMode === true) {
        this.drawVertexsText(context);
      }
    }
  }, {
    key: "drawVertexsText",
    value: function drawVertexsText(context) {
      context.fillStyle = 'white';
      context.font = 'normal small-caps normal 18px sans-serif';
      context.textBaseline = 'middle';
      var _this$vertexs2 = this.vertexs,
          a = _this$vertexs2.a,
          b = _this$vertexs2.b,
          c = _this$vertexs2.c;
      context.fillText("a(".concat(a.x, ", ").concat(a.y, ")"), a.x, a.y);
      context.fillText("b(".concat(b.x, ", ").concat(b.y, ")"), b.x, b.y);
      context.fillText("c(".concat(c.x, ", ").concat(c.y, ")"), c.x, c.y);
    }
  }]);

  return Triangle;
}(ObjectPrototype);

var Polygon = /*#__PURE__*/function (_ObjectPrototype) {
  _inherits(Polygon, _ObjectPrototype);

  var _super = _createSuper(Polygon);

  function Polygon(props) {
    var _this;

    _classCallCheck(this, Polygon);

    _this = _super.call(this, props);
    _this.vertexs = [new Vector(360, 160), new Vector(500, 200), new Vector(510, 400), new Vector(360, 160)];
    _this.devMode = true;
    return _this;
  }

  _createClass(Polygon, [{
    key: "update",
    value: function update() {}
  }, {
    key: "draw",
    value: function draw(context) {
      // todo 改成 列表循环，不要abc
      var _this$vertexs = this.vertexs,
          a = _this$vertexs.a,
          b = _this$vertexs.b,
          c = _this$vertexs.c;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.lineTo(c.x, c.y);
      context.lineTo(a.x, a.y);
      context.strokeStyle = 'white';
      context.lineCap = 'round';
      context.stroke();
      context.closePath(); // 位置(xy)，大小(wh)

      ctx.rect(10, 10, 100, 100);
      ctx.fill();

      if (this.devMode === true) {
        this.drawVertexsText(context);
      }
    }
  }, {
    key: "drawVertexsText",
    value: function drawVertexsText(context) {
      context.fillStyle = 'white';
      context.font = 'normal small-caps normal 18px sans-serif';
      context.textBaseline = 'middle';
      var _this$vertexs2 = this.vertexs,
          a = _this$vertexs2.a,
          b = _this$vertexs2.b,
          c = _this$vertexs2.c;
      context.fillText("a(".concat(a.x, ", ").concat(a.y, ")"), a.x, a.y);
      context.fillText("b(".concat(b.x, ", ").concat(b.y, ")"), b.x, b.y);
      context.fillText("c(".concat(c.x, ", ").concat(c.y, ")"), c.x, c.y);
    }
  }]);

  return Polygon;
}(ObjectPrototype);

export { Color, EscherLayer as Layer, Line, ObjectPrototype, Polygon, EscherScene as Scene, Triangle, Vector };
