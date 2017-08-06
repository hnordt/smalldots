import { PureComponent } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import shallowEqual from "fbjs/lib/shallowEqual"
import omit from "lodash/omit"

const isEvent = obj => obj && obj.preventDefault && obj.stopPropagation

const axiosInstance = axios.create()

export default class Fetch extends PureComponent {
  static propTypes = {
    method: PropTypes.oneOf(["get", "post", "put", "delete"]),
    url: PropTypes.string.isRequired,
    params: PropTypes.object,
    headers: PropTypes.object,
    body: PropTypes.object,
    withCredentials: PropTypes.bool,
    lazy: PropTypes.bool,
    transformError: PropTypes.func,
    onResponse: PropTypes.func,
    onData: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = {
    method: "get",
    transformError: error => error
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
    this.fetch(this.props.body)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lazy) {
      return
    }
    if (
      shallowEqual(omit(nextProps, "children"), omit(this.props, "children"))
    ) {
      return
    }
    this.fetch(nextProps.body)
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  fetch = (body = this.props.body) => {
    this.setState({ fetching: true, error: null })
    return axiosInstance
      .request({
        method: this.props.method,
        url: this.props.url,
        params: this.props.params,
        headers: this.props.headers,
        data: isEvent(body) ? null : body,
        withCredentials: this.props.withCredentials
      })
      .then(response => {
        if (this.willUnmount) {
          return
        }
        if (this.props.onResponse) {
          this.props.onResponse(null, response.data)
        }
        if (this.props.onData) {
          this.props.onData(response.data)
        }
        this.setState({
          fetching: false,
          response,
          data: response.data
        })
      })
      .catch(error => {
        if (this.willUnmount) {
          return
        }
        const transformedError = this.props.transformError(error, body)
        if (this.props.onResponse) {
          this.props.onResponse(transformedError, null)
        }
        if (this.props.onError) {
          this.props.onError(transformedError)
        }
        this.setState({
          fetching: false,
          response: transformedError,
          error: transformedError
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
