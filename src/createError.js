let id = 0

const createError = message => {
  const error = new Error(message)
  error.id = id++
  return Promise.resolve(error)
}

export default createError
