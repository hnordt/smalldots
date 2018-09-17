import React, { Component, createContext } from "react"

import identity from "./utils/identity"
import isPlainObject from "./utils/isPlainObject"
import isFn from "./utils/isFn"
import mapValues from "./utils/mapValues"
import filterValues from "./utils/filterValues"

const createStore = ({
  displayName = "Store",
  initialState = {},
  selectors = {},
  mutators = {},
  reducer = identity,
  actions = {}
}) => {
  const { Provider, Consumer } = createContext()

  return {
    Provider: class extends Component {
      static displayName = `${displayName}.Provider`

      getState = () => filterValues(this.state, v => !isFn(v))

      selectors = mapValues(selectors, selector => (...args) => {
        let result = selector(this.getState(), ...args)

        // Handles `(state, ...args) => result` and `(state, ...args) => selectors => result`
        result = isFn(result) ? result(this.selectors) : result

        return result
      })

      mutators = mapValues(mutators, mutator => (...args) =>
        new Promise(resolve =>
          this.setState(state => {
            let nextState = mutator(...args)

            // Handles `(...args) => state => nextState` and `(...args) => nextState`
            nextState = isFn(nextState) ? nextState(state) : nextState

            return nextState
          }, resolve)
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
        ...this.mutators,
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
