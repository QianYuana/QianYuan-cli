export default function (obj) {
  if (!obj) {
    obj = {};
  }
  return Object.keys(obj).reduce((total, next) => {
    return {
      ...total,
      [next]: JSON.stringify(obj[next])
    }
  }, {})
}
