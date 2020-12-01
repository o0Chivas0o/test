export default function createHeatmap(app, target, param = {}) {
  let obb = target.orientedBoundingBox
  let obbSize = obb.size
  let position = target.worldToSelf(obb.center)
  position[1] = 20
  const self = app.create({
    type: 'Heatmap',
    width: param.width || obbSize[0],
    height: param.height || obbSize[2],
    parent: target,
    localPosition: position,
    minValue: param.minValue || 20,
    maxValue: param.maxValue || 100,
    radius: param.radius || 3, // 单个点的热力影响半径
    alpha: !!param.alpha, // 未插值区域是否透明（默认为 true ）
    mosaic: !!param.mosaic, // 默认为false
    mosaicSize: 4 || param.mosaicSize
  })
  self.rotateX(90)
  const hashTable = {}
  return {
    self,
    hashTable,
    destroy() {
      self.destroy()
    },
    changePosition(num) {
      self.localPosition[1] = num
    },
    hide() {
      self.visible = false
    },
    show() {
      self.visible = true
    },
    setColor(data) {
      if (data) self.setGradient(data)
    },
    setRadius(num) {
      self.setRadius(num)
    },
    setBackground(boolean) {
      self.setAlpha(boolean)
    },
    setData() {
      let temp = []
      for (let value of Object.values(hashTable)) {
        temp.push(value)
      }
      self.setData(temp)
    },
    register(condition, key) {
      let _this = this
      app.query(condition).forEach(item => {
        Object.defineProperty(item, key, {
          get() {
            return this[`_${key}`]
          },
          set(val) {
            this[`_${key}`] = val
            const relativePos = self.worldToSelf(item.position)
            hashTable[item.id] = [relativePos[0], -relativePos[1], val]
            _this.setData()
          }
        })
      })
    },
    unregister(condition, key) {
      app.query(condition).forEach(item => {
        delete item[key]
        delete hashTable[item.id]
      })
    },
  }
}

