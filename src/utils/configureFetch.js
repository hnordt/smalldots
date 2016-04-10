import isPlainObject from 'lodash/isPlainObject'

export default function configureFetch({
  optionsTransformer = options => options,
  responseHandler = response => {
    return response.ok ? response.json() : Promise.reject(response)
  }
}) {
  return options => {
    const { url, body, ...other } = optionsTransformer(options)
    return fetch(url, {
      ...other,
      body: isPlainObject(body) ? JSON.stringify(body) : body
    }).then(responseHandler)
  }
}
