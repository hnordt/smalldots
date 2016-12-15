import { PureComponent, PropTypes } from 'react'
import BrowserHistoryService from './BrowserHistoryService'
import find from 'lodash/find'
import Route from 'route-parser'

class Router extends PureComponent {
  static propTypes = {
    routes: PropTypes.objectOf(PropTypes.func).isRequired,
    activePathname: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.getParams = this.getParams.bind(this)
    this.matchPath = this.matchPath.bind(this)
  }

  getParams() {
    const matchedRoute = this.matchPath()
    if (!matchedRoute) {
      return null
    }
    return new Route(matchedRoute).match(this.props.activePathname)
  }

  matchPath() {
    const paths = Object.keys(this.props.routes)
    return find(paths, path => (
      new Route(path).match(this.props.activePathname)
    ))
  }

  render() {
    const matchedPath = this.matchPath()
    if (!matchedPath) {
      return null
    }
    const route = this.props.routes[matchedPath]
    return route(this.getParams()) || null
  }
}

export default Router
