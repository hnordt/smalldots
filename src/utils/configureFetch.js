import isPlainObject from 'lodash/isPlainObject'

export default function configureFetch({
  requestTransformer = request => request,
  responseHandler = response => {
    return response.ok ? response.json() : Promise.reject(response)
  }
}) {
  return request => {
    const { url, body, ...other } = requestTransformer(request)
    return fetch(url, {
      ...other,
      body: isPlainObject(body) ? JSON.stringify(body) : body
    }).then(responseHandler)
  }
}
