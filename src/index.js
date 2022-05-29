import Scene from './scene/escher.scene'
import Layer from './scene/escher.layer'

import Line from './objects/line'
import Triangle from './objects/triangle'
import Polygon from './objects/polygon'

import EscherBaseObject from './classes/base.object' // 废弃了，改用 ObjectPrototype
import ObjectPrototype from './classes/objectPrototype'
// import Brush from './classes/brush'
import Color from './classes/color'
import Vector from './classes/vector'

export {
  Scene,
  Layer,
  Line,
  Triangle,
  Polygon,
  EscherBaseObject,
  ObjectPrototype,
  // Brush,
  Color,
  Vector,
}
