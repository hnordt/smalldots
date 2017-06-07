import { PureComponent } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import isEqual from "lodash/isEqual"

const http = axios.create()

export default class Fetch extends PureComponent {
  static propTypes = {
    method: PropTypes.oneOf(["get", "post", "put", "delete"]),
    url: PropTypes.string.isRequired,
    params: PropTypes.object,
    headers: PropTypes.object,
    body: PropTypes.object,
    withCredentials: PropTypes.bool,
    lazy: PropTypes.bool,
    onResponse: PropTypes.func,
    onData: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = { method: "get" }

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
    this.fetch(this.props.body)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lazy) {
      return
    }
    if (isEqual(nextProps, this.props)) {
      return
    }
    this.fetch(nextProps.body)
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  fetch = (body = this.props.body) => {
    this.setState({ fetching: true }, () => {
      http
        .request({
          method: this.props.method,
          url: this.props.url,
          params: this.props.params,
          headers: this.props.headers,
          data: body,
          withCredentials: this.props.withCredentials
        })
        .then(response => {
          if (this.willUnmount) {
            return
          }
          this.setState(
            {
              fetching: false,
              response,
              data: response.data,
              error: null
            },
            () => {
              if (this.props.onResponse) {
                this.props.onResponse(null, this.state.response)
              }
              if (this.props.onData) {
                this.props.onData(this.state.data)
              }
            }
          )
        })
        .catch(error => {
          if (this.willUnmount) {
            return
          }
          this.setState(
            {
              fetching: false,
              response: error,
              error
            },
            () => {
              if (this.props.onResponse) {
                this.props.onResponse(this.state.response)
              }
              if (this.props.onError) {
                this.props.onError(this.state.error)
              }
            }
          )
        })
    })
  }

  render() {
    if (!this.props.children) {
      return null
    }
    return (
      this.props.children({
        fetching: this.state.fetching,
        response: this.state.response,
        data: this.state.data,
        error: this.state.error,
        fetch: this.fetch
      }) || null
    )
  }
}
