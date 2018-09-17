const mapValues = (obj, callback) =>
  Object.entries(obj).reduce(
    (acc, [k, v]) => ({ ...acc, [k]: callback(v, k) }),
    {}
  )

export default mapValues
