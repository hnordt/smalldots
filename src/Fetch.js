import { Component, PropTypes } from 'react'
import axios from 'axios'

export default class Fetch extends Component {
  static propTypes = {
    method: PropTypes.oneOf(['get', 'post', 'put', 'delete']),
    url: PropTypes.string.isRequired,
    params: PropTypes.object,
    headers: PropTypes.object,
    body: PropTypes.object,
    lazy: PropTypes.bool,
    onData: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.func.isRequired
  }

  static defaultProps = { method: 'get' }

  state = { fetching: false, response: null, data: null, error: null }

  componentDidMount() {
    if (!this.props.lazy) {
      this.fetch()
    }
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  fetch = (body = this.props.body) => {
    this.setState({ fetching: true }, () => {
      axios({
        method: this.props.method,
        url: this.props.url,
        params: this.props.params,
        headers: this.props.headers,
        data: body
      }).then(response => {
        if (this.willUnmount) {
          return
        }
        this.setState({ fetching: false, response, data: response.data }, () => {
          if (this.props.onData) {
            this.props.onData(this.state.data)
          }
        })
      }).catch(error => {
        if (this.willUnmount) {
          return
        }
        if (!error.response) {
          throw new Error(
            `${error.message} on ${this.props.method.toUpperCase()} ${this.props.url}`
          )
        }
        this.setState({
          fetching: false,
          response: error.response,
          error: error.response.data
        }, () => {
          if (this.props.onError) {
            this.props.onError(this.state.error)
          }
        })
      })
    })
  }

  render() {
    return this.props.children({ ...this.state, fetch: this.fetch })
  }
}
