import isPlainObject from 'lodash/isPlainObject'

function transformOptions(options) {
  return options
}

function handleResponse(response) {
  return response.ok ? response.json() : Promise.reject(response)
}

export default function configureFetch({ transformOptions, handleResponse }) {
  return options => {
    const { url, body, ...other } = transformOptions(options)
    return fetch(url, {
      ...other,
      body: isPlainObject(body) ? JSON.stringify(body) : body
    }).then(handleResponse)
  }
}
