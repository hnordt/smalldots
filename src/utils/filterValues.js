const filterValues = (obj, predicate) =>
  Object.entries(obj).reduce(
    (acc, [k, v]) => (predicate(v, k) ? { ...acc, [k]: v } : acc),
    {}
  )

export default filterValues
