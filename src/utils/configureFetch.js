import isPlainObject from 'lodash/isPlainObject'

export default function configureFetch(optionsTransformer = options => options) {
  return options => {
    const {
      url,
      body,
      responseHandler = response => {
        const { ok } = response
        if (!ok) {
          throw response
        }
        return response.json()
      },
      ...other
    } = optionsTransformer(options)
    return fetch(url, {
      ...other,
      body: isPlainObject(body) ? JSON.stringify(body) : body
    }).then(responseHandler)
  }
}
