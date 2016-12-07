import { PureComponent, PropTypes } from 'react'
import createHistory from 'history/createBrowserHistory'
import qs from 'qs'
import isPlainObject from 'lodash/isPlainObject'
import find from 'lodash/find'
import Route from 'route-parser'

let history = null
if (typeof document !== 'undefined') {
  history = createHistory()
}

class Router extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ]).isRequired
  }

  unlisten = history.listen(location => {
    if (this.willUnmount) {
      return
    }
    this.forceUpdate()
  })

  componentWillUnmount() {
    this.willUnmount = true
    this.unlisten()
  }

  push = (path, state) => history.push(path, state)

  replace = (path, state) => history.replace(path, state)

  go = n => history.go(n)

  back = () => history.goBack()

  forward = () => history.goForward()

  render() {
    const props = {
      pathname: history.location.pathname,
      search: qs.parse(history.location.search.substr(1)),
      hash: (
        history.location.hash.match('=')
          ? qs.parse(history.location.hash)
          : history.location.hash.replace('#', '')
      ),
      state: history.location.state || {},
      entries: history.entries,
      push: this.push,
      replace: this.replace,
      go: this.go,
      back: this.back,
      forward: this.forward
    }
    if (isPlainObject(this.props.children)) {
      const routes = Object.keys(this.props.children)
      const match = find(routes, route => (
        new Route(route).match(history.location.pathname)
      ))
      if (!match) {
        return null
      }
      return this.props.children[match]({
        ...props,
        params: new Route(match).match(history.location.pathname)
      })
    }
    return this.props.children(props) || null
  }
}

export default Router
