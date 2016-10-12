import { Component, PropTypes, isValidElement } from 'react'
import createHistory from 'history/createBrowserHistory'
import Route from 'route-parser'
import queryString from 'query-string'
import isPlainObject from 'lodash/isPlainObject'

export default class Router extends Component {
  static propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    children: PropTypes.func.isRequired
  }

  state = { currentLocation: null }

  history = createHistory({
    basename: this.props.basename,
    forceRefresh: this.props.forceRefresh
  })

  unlisten = this.history.listen(location => {
    if (this.willUnmount) {
      return
    }
    this.setState({ currentLocation: location })
  })

  componentWillMount() {
    this.setState({ currentLocation: this.history.location })
  }

  componentWillUnmount() {
    this.willUnmount = true
    this.unlisten()
  }

  getHistory = () => this.history.entries

  push = (path, state) => this.history.push(path, state)

  replace = (path, state) => this.history.replace(path, state)

  go = n => this.history.go(n)

  back = () => this.history.goBack()

  forward = () => this.history.goForward()

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
    if (!isPlainObject(children)) {
      throw new Error('children should return a plain object')
    }
    const path = this.state.currentLocation.pathname
    const match = Object.keys(children).find(path => (
      new Route(path).match(path)
    ))
    if (!match) {
      return null
    }
    if (typeof children[match] !== 'function') {
      throw new Error(`${match} should be a function that returns an element`)
    }
    const element = children[match]({
      path,
      params: new Route(match).match(path),
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
