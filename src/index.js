import Scene from './scene/escher.scene'
import Layer from './scene/escher.layer'

import Line from './objects/line'
import Triangle from './objects/triangle'
import Polygon from './objects/polygon'

import ModelPrototype from './classes/model.prototype'
// import Brush from './classes/brush'
import Color from './classes/color'
import Vector from './classes/vector'

const ObjectPrototype = ModelPrototype // 临时性复制名称

export {
  Scene,
  Layer,
  Line,
  Triangle,
  Polygon,
  ModelPrototype,
  ObjectPrototype,
  // Brush,
  Color,
  Vector,
}
