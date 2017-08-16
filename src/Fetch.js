import { Component } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import shallowEqual from "fbjs/lib/shallowEqual"
import pick from "lodash/pick"

const isEvent = obj => obj && obj.preventDefault && obj.stopPropagation

const axiosInstance = axios.create()

class Fetch extends Component {
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
    isFetching: !this.props.lazy,
    response: null,
    data: null,
    error: null
  }

  componentDidMount() {
    if (this.props.lazy) {
      return
    }
    this.dispatch(this.props.body, this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lazy) {
      return
    }
    const compareProps = [
      "method",
      "url",
      "params",
      "headers",
      "body",
      "withCredentials "
    ]
    if (
      shallowEqual(
        pick(nextProps, compareProps),
        pick(this.props, compareProps)
      )
    ) {
      return
    }
    this.dispatch(nextProps.body, nextProps)
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  dispatch = (body = this.props.body, props = this.props) => {
    this.setState({ isFetching: true, error: null })
    return axiosInstance
      .request({
        method: props.method,
        url: props.url,
        params: props.params,
        headers: props.headers,
        data: isEvent(body) ? null : body,
        withCredentials: props.withCredentials
      })
      .then(response => {
        if (this.willUnmount) {
          return
        }
        if (props.onResponse) {
          props.onResponse(null, response.data)
        }
        if (props.onData) {
          props.onData(response.data)
        }
        this.setState({
          isFetching: false,
          response,
          data: response.data
        })
      })
      .catch(error => {
        if (this.willUnmount) {
          return
        }
        const transformedError = props.transformError(error, body)
        if (props.onResponse) {
          props.onResponse(transformedError, null)
        }
        if (props.onError) {
          props.onError(transformedError)
        }
        this.setState({
          isFetching: false,
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
        isFetching: this.state.isFetching,
        response: this.state.response,
        data: this.state.data,
        error: this.state.error,
        dispatch: this.dispatch
      }) || null
    )
  }
}

export default Fetch
