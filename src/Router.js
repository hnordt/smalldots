import { PureComponent, PropTypes } from 'react'
import createHistory from 'history/createBrowserHistory'
import qs from 'qs'
import find from 'lodash/find'
import Route from 'route-parser'

let history = null
if (typeof navigator !== 'undefined') {
  history = createHistory()
}

class Router extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ])
  }

  unlisten = history.listen(location => {
    if (this.willUnmount) {
      return
    }
    this.forceUpdate()
  })

  constructor(props) {
    super(props)
    this.getParams = this.getParams.bind(this)
    this.getSearch = this.getSearch.bind(this)
    this.getHash = this.getHash.bind(this)
    this.getState = this.getState.bind(this)
    this.matchRoute = this.matchRoute.bind(this)
    this.replace = this.replace.bind(this)
    this.go = this.go.bind(this)
    this.back = this.back.bind(this)
    this.forward = this.forward.bind(this)
  }

  componentWillUnmount() {
    this.willUnmount = true
    this.unlisten()
  }

  getParams() {
    const matchedRoute = this.matchRoute()
    if (!matchedRoute) {
      return null
    }
    return new Route(matchedRoute).match(history.location.pathname)
  }

  getSearch() {
    return qs.parse(history.location.search.substr(1))
  }

  getHash() {
    return (
      history.location.hash.match('=')
        ? qs.parse(history.location.hash)
        : history.location.hash.replace('#', '')
    )
  }

  getState() {
    return history.location.state || {}
  }

  matchRoute() {
    const routes = Object.keys(this.props.children)
    return find(routes, route => (
      new Route(route).match(history.location.pathname)
    ))
  }

  push(location) {
    history.push(location)
  }

  replace(location) {
    history.replace(location)
  }

  go(n) {
    history.go(n)
  }

  back() {
    history.goBack()
  }

  forward() {
    history.goForward()
  }

  render() {
    if (!this.props.children) {
      return null
    }
    const props = {
      pathname: history.location.pathname,
      params: this.getParams(),
      search: this.getSearch(),
      hash: this.getHash(),
      state: this.getState(),
      entries: history.entries,
      push: this.push,
      replace: this.replace,
      go: this.go,
      back: this.back,
      forward: this.forward
    }
    if (typeof this.props.children === 'object') {
      const matchedRoute = this.matchRoute()
      if (!matchedRoute) {
        return null
      }
      return this.props.children[matchedRoute](props) || null
    }
    return this.props.children(props) || null
  }
}

export default Router
