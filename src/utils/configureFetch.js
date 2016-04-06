import isPlainObject from 'lodash/isPlainObject'
import merge from 'lodash/merge'

export default function configureFetch(defaultOptions) {
  return options => {
    const {
      url,
      path,
      body,
      responseHandler = response => {
        const { ok } = response
        if (!ok) {
          throw response
        }
        return response.json()
      },
      ...other
    } = merge(defaultOptions, options)
    return fetch(url + path, {
      ...other,
      body: isPlainObject(body) ? JSON.stringify(body) : body
    }).then(responseHandler)
  }
}
