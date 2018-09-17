import React, { Component, createContext } from "react"

import identity from "./utils/identity"
import not from "./utils/not"
import isPlainObject from "./utils/isPlainObject"
import isFn from "./utils/isFn"
import mapValues from "./utils/mapValues"
import filterValues from "./utils/filterValues"
import compose from "./utils/compose"

const createStore = ({
  displayName = "Store",
  initialState = {},
  reducer = identity,
  selectors = {},
  actions = {}
}) => {
  const { Provider, Consumer } = createContext()

  return {
    Provider: class extends Component {
      static displayName = `${displayName}.Provider`

      getState = () =>
        filterValues(
          this.state,
          compose(
            not,
            isFn
          )
        )

      dispatch = action =>
        new Promise(resolve =>
          this.setState(
            state =>
              (isPlainObject(reducer)
                ? reducer[action.type] || identity
                : reducer)(state, action),
            resolve
          )
        )

      selectors = mapValues(selectors, selector => (...args) => {
        const result = selector(this.getState(), ...args)
        return isFn(result) ? result(this.selectors) : result
      })

      actions = mapValues(actions, action => (...args) =>
        this.dispatch(
          typeof action === "string"
            ? {
                type: action,
                ...(isPlainObject(args[0]) ? args[0] : null)
              }
            : action(...args)
        )
      )

      state = {
        ...initialState,
        ...this.selectors,
        ...this.actions
      }

      render() {
        return <Provider value={this.state}>{this.props.children}</Provider>
      }
    },

    Consumer: class extends Component {
      static displayName = `${displayName}.Consumer`

      render() {
        const { children, ...rest } = this.props
        return (
          <Consumer {...rest}>
            {props => {
              if (props === undefined)
                throw new Error(
                  `${displayName}.Consumer must be rendered within a ${displayName}.Provider`
                )
              return children(props)
            }}
          </Consumer>
        )
      }
    }
  }
}

export default createStore
