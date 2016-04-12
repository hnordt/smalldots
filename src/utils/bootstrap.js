import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

export default function bootstrap(routes, reducers, middlewares) {
  return render(
    (
      <Provider store={createStore(
        combineReducers(reducers),
        applyMiddleware(...middlewares)
      )}>
        <Router history={browserHistory} routes={routes} />
      </Provider>
    ),
    document.getElementById('app')
  )
}
