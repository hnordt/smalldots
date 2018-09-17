const compose = (...fns) =>
  fns.length === 0
    ? arg => arg
    : fns.length === 1
      ? fns[0]
      : fns.reduce((acc, fn) => (...args) => acc(fn(...args)))

export default compose
