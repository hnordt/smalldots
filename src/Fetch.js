import { PureComponent, PropTypes } from 'react'
import axios from 'axios'

let http = null
if (typeof navigator !== 'undefined') {
  http = axios.create()
}

class Fetch extends PureComponent {
  static propTypes = {
    method: PropTypes.oneOf(['get', 'post', 'put', 'delete']),
    url: PropTypes.string.isRequired,
    urlParams: PropTypes.object,
    headers: PropTypes.object,
    body: PropTypes.object,
    lazy: PropTypes.bool,
    onResponse: PropTypes.func,
    onData: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = {
    method: 'get'
  }

  state = {
    fetching: !this.props.lazy,
    response: null,
    data: null,
    error: null
  }

  componentDidMount() {
    if (this.props.lazy) {
      return
    }
    this.fetch()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.shouldFetch(nextProps)) {
      return
    }
    this.fetch()
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  shouldFetch(props) {
    if (this.props.method !== props.method) {
      return true
    }
    if (this.props.url !== props.url) {
      return true
    }
    if (this.props.urlParams !== props.urlParams) {
      return true
    }
    if (this.props.headers !== props.headers) {
      return true
    }
    if (this.props.body !== props.body) {
      return true
    }
    return false
  }

  fetch = props => {
    const mergedProps = {
      ...this.props,
      ...props
    }
    if (!this.shouldFetch(mergedProps)) {
      return
    }
    this.setState({ fetching: true })
    http.request({
      method: mergedProps.method,
      url: mergedProps.url,
      params: mergedProps.urlParams,
      headers: mergedProps.headers,
      data: mergedProps.body
    }).then(response => {
      if (this.willUnmount) {
        return
      }
      this.setState({
        fetching: false,
        response,
        data: response.data,
        error: null
      })
      if (this.props.onResponse) {
        this.props.onResponse(null, response)
      }
      if (this.props.onData) {
        this.props.onData(response.data)
      }
    }).catch(error => {
      if (this.willUnmount) {
        return
      }
      this.setState({
        fetching: false,
        response: error,
        error
      })
      if (this.props.onResponse) {
        this.props.onResponse(error)
      }
      if (this.props.onError) {
        this.props.onError(error)
      }
    })
  }

  render() {
    if (!this.props.children) {
      return null
    }
    return this.props.children({
      fetching: this.state.fetching,
      response: this.state.response,
      data: this.state.data,
      error: this.state.error,
      fetch: this.fetch
    }) || null
  }
}

export default Fetch
