const isPlainObject = obj => {
  if (obj === null || typeof obj !== "object") return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null)
    proto = Object.getPrototypeOf(proto)

  return Object.getPrototypeOf(obj) === proto
}

export default isPlainObject
