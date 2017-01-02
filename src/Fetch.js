import { Component, PropTypes } from 'react'
import axios from 'axios'
import isEqual from 'lodash/isEqual'

const http = axios.create()

export default class Fetch extends Component {
  static propTypes = {
    method: PropTypes.oneOf(['get', 'post', 'put', 'delete']),
    url: PropTypes.string.isRequired,
    params: PropTypes.object,
    headers: PropTypes.object,
    body: PropTypes.object,
    lazy: PropTypes.bool,
    onResponse: PropTypes.func,
    onData: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = { method: 'get' }

  state = {
    fetching: !this.props.lazy,
    response: null,
    data: null,
    error: null
  }

  componentDidMount() {
    if (!this.props.lazy) {
      this.fetch()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.lazy && !isEqual(this.props, nextProps)) {
      this.fetch()
    }
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  fetch = (body = this.props.body) => {
    this.setState({ fetching: true }, () => {
      http.request({
        method: this.props.method,
        url: this.props.url,
        params: this.props.params,
        headers: this.props.headers,
        data: body
      }).then(response => {
        if (this.willUnmount) {
          return
        }
        this.setState({
          fetching: false,
          response,
          data: response.data,
          error: null
        }, () => {
          if (this.props.onResponse) {
            this.props.onResponse(null, this.state.response)
          }
          if (this.props.onData) {
            this.props.onData(this.state.data)
          }
        })
      }).catch(error => {
        if (this.willUnmount) {
          return
        }
        this.setState({
          fetching: false,
          response: error,
          error
        }, () => {
          if (this.props.onResponse) {
            this.props.onResponse(this.state.response)
          }
          if (this.props.onError) {
            this.props.onError(this.state.error)
          }
        })
        throw error;
      })
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
