export const RESOLVE_PROMISE = '@@smalldots/RESOLVE_PROMISE'
export const REJECT_PROMISE = '@@smalldots/REJECT_PROMISE'

export function promiseReducer(state = {}, action) {
  switch (action.type) {
    case RESOLVE_PROMISE:
      return {
        ...state,
        [action.meta.id]: { data: action.payload }
      }
    case REJECT_PROMISE:
      return {
        ...state,
        [action.meta.id]: { error: action.payload }
      }
    default:
      return state
  }
}

export function resolvePromise(id, data) {
  return {
    type: RESOLVE_PROMISE,
    payload: data,
    meta: { id }
  }
}

export function rejectPromise(id, error) {
  return {
    type: REJECT_PROMISE,
    payload: error,
    meta: { id }
  }
}

export function runPromise(id, promise) {
  return dispatch => promise
    .then(data => dispatch(resolvePromise(id, data)))
    .catch(error => dispatch(rejectPromise(id, error)))
}
