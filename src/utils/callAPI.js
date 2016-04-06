import isPlainObject from 'lodash/isPlainObject'

/**
 * Fetches an URL and returns a JSON response.
 *
 * Accepts the same params as
 * [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request).
 * The only difference is that `body` is JSON stringified when it's a
 * plain object.
 *
 * We recommend that you add
 * [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) as a
 * `fetch` polyfill in your project.
 * The best way to import/require whatwg-fetch is in your `index.js` file.
 *
 * @returns {Promise} Resolves to JSON data on success or rejects the
 * [response](https://developer.mozilla.org/en-US/docs/Web/API/Response#Properties)
 * on failure.
 */
export default function callAPI(params) {
  const { url, body, ...other } = params
  return fetch(url, {
    ...other,
    body: isPlainObject(body) ? JSON.stringify(body) : body
  }).then(response => {
    const { ok } = response
    if (!ok) {
      throw response
    }
    return response.json()
  })
}
