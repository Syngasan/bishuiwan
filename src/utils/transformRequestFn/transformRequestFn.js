// 使data对象变为以&连接键值对的序列化数据
const transformRequestFn = function (obj) {
  const str = []
  for (const p in obj) {
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
  }
  return str.join('&')
}

export { transformRequestFn }
