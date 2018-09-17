import React, { Component, createContext } from "react"

import identity from "./identity"
import not from "./not"
import isPlainObject from "./isPlainObject"
import isFn from "./isFn"
import mapValues from "./mapValues"
import filterValues from "./filterValues"
import compose from "./compose"

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
