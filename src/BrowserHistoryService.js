import { PureComponent, PropTypes } from 'react'
import createHistory from 'history/createBrowserHistory'
import qs from 'qs'

let history = null
if (typeof navigator !== 'undefined') {
  history = createHistory()
}

class BrowserHistoryService extends PureComponent {
  static propTypes = {
    children: PropTypes.func
  }

  unlisten = history.listen(location => {
    if (this.willUnmount) {
      return
    }
    this.forceUpdate()
  })

  constructor(props) {
    super(props)
    this.getSearch = this.getSearch.bind(this)
    this.getHash = this.getHash.bind(this)
    this.getState = this.getState.bind(this)
    this.replace = this.replace.bind(this)
    this.go = this.go.bind(this)
    this.back = this.back.bind(this)
    this.forward = this.forward.bind(this)
  }

  componentWillUnmount() {
    this.willUnmount = true
    this.unlisten()
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
    const api = {
      pathname: history.location.pathname,
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
    return this.props.children(api) || null
  }
}

export default BrowserHistoryService
