import { Component, PropTypes } from 'react'
import axios from 'axios'

export default class Fetch extends Component {
  static propTypes = {
    method: PropTypes.oneOf(['get', 'post', 'put', 'delete']),
    url: PropTypes.string.isRequired,
    urlParams: PropTypes.object,
    body: PropTypes.object,
    lazy: PropTypes.bool,
    onData: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.func.isRequired
  }

  static defaultProps = { method: 'get' }

  state = { fetching: false, data: null, error: null }

  componentWillMount() {
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
        params: this.props.urlParams,
        data: body
      }).then(response => {
        if (!this.willUnmount) {
          this.setState({ fetching: false, data: response.data }, () => {
            if (this.props.onData) {
              this.props.onData(this.state.data)
            }
          })
        }
      }).catch(error => {
        if (!this.willUnmount) {
          this.setState({
            fetching: false,
            error: error.response ? error.response.data : error.message
          }, () => {
            if (this.props.onError) {
              this.props.onError(this.state.error)
            }
          })
        }
      })
    })
  }

  render() {
    return this.props.children({ ...this.state, fetch: this.fetch })
  }
}
