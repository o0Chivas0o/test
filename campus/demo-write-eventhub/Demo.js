import { typeOf } from '../utils'

export default class Demo {
  constructor(app, data) {
    THING.EventType.Alarm = 'alarm'
    THING.EventType.Monitor = 'monitor'
    this.config = data
    this.app = app
    this.init()
  }
  
  setState(eventType, cb, eventName = 'default') {
    this.config[eventType][eventName] = cb
  }
  
  useState(eventType, condition = '.Thing', eventName = 'default') {
    this.app.on(THING.EventType[eventType], condition, e => this.config[eventType][eventName]?.(e), eventName)
  }
  
  removeState(eventType, condition = '.Thing', eventName = 'default') {
    this.app.off(THING.EventType[eventType], condition, eventName)
  }
  
  init() {
    for (let key of Object.keys(this.config)) {
      this.useState(key)
    }
  }
  
  triggerEvent(eventType, condition, data) {
    this.app.trigger(eventType, condition, data)
  }
  
  update(data) {
    data.forEach(item => {
      for (let key of Object.keys(item)) {
        if (key === 'alarm') {
          if (item[key].state) {
            this.triggerEvent(key, `#${item.id}`, item[key])
          }
        } else if (key === 'monitor') {
          if (item[key].state) {this.triggerEvent(key, `#${item.id}`, item[key])}
        }
      }
    })
  }
}
