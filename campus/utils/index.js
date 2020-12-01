export function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

export function getFakeData(url) {
  return fetch(url).then(res => res.json())
}
