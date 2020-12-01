const click = (e) => {
  if (e.object.app.selection.has(e.object)) {
    e.object.app.selection.deselect(e.object)
    console.log(`${e.object.name} 被移出选择集 `)
  } else {
    e.object.app.selection.select(e.object)
    console.log(`${e.object.name} 被加入选择集 `)
  }
}

const mouseenter = e => console.log(`${e.object.name} hover : true`)
const mouseleave = e => console.log(`${e.object.name} hover : false`)
const alarm = e => console.log(`${e.object.name} alarm : true`)
const monitor = e => console.log(`${e.object.name} monitor : true`)

export default {
  Click: {
    default: click
  },
  MouseEnter: {
    default: mouseenter
  },
  MouseLeave: {
    default: mouseleave
  },
  Alarm: {
    default: alarm
  },
  Monitor: {
    default: monitor
  }
}
