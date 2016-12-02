import { Component, PropTypes, isValidElement } from 'react'
import createHistory from 'history/createBrowserHistory'
import Route from 'route-parser'
import queryString from 'query-string'
import isPlainObject from 'lodash/isPlainObject'

const history = createHistory()

export default class Router extends Component {
  static propTypes = { children: PropTypes.func.isRequired }

  state = { currentLocation: history.location }

  unlisten = history.listen(location => (
    !this.willUnmount && this.setState({ currentLocation: location })
  ))

  componentWillUnmount() {
    this.willUnmount = true
    this.unlisten()
  }

  getHistory = () => history.entries

  push = (path, state) => history.push(path, state)

  replace = (path, state) => history.replace(path, state)

  go = n => history.go(n)

  back = () => history.goBack()

  forward = () => history.goForward()

  render() {
    const children = this.props.children({
      currentLocation: this.state.currentLocation,
      getHistory: this.getHistory,
      push: this.push,
      replace: this.replace,
      go: this.go,
      back: this.back,
      forward: this.forward
    })
    if (isValidElement(children)) {
      return children
    }
    if (!isPlainObject(children)) {
      throw new Error('children should return a plain object')
    }
    const currentPath = this.state.currentLocation.pathname
    const match = Object.keys(children).find(path => (
      new Route(path).match(currentPath)
    ))
    if (!match) {
      return null
    }
    if (typeof children[match] !== 'function') {
      throw new Error(`${match} should be a function that returns an element`)
    }
    const element = children[match]({
      path: currentPath,
      params: new Route(match).match(currentPath),
      search: queryString.parse(this.state.currentLocation.search),
      hash: (
        this.state.currentLocation.hash.match('=')
          ? queryString.parse(this.state.currentLocation.hash)
          : this.state.currentLocation.hash.replace('#', '')
      ),
      state: this.state.currentLocation.state || {}
    })
    if (!isValidElement(element)) {
      throw new Error(`${match} should return a valid element`)
    }
    return element
  }
}
