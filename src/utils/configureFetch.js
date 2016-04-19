import isPlainObject from 'lodash/isPlainObject'

export default function configureFetch({
  predicate = () => true,
  requestTransformer = request => request,
  responseHandler = response => {
    return response.ok ? response.json() : Promise.reject(response)
  }
}) {
  return request => {
    const { url, body, ...other } = requestTransformer(request)
    if (!predicate({ url, body, ...other })) {
      return Promise.reject()
    }
    return fetch(url, {
      ...other,
      body: isPlainObject(body) ? JSON.stringify(body) : body
    }).then(responseHandler)
  }
}
