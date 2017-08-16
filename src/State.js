import { Component } from "react"
import PropTypes from "prop-types"
import get from "lodash/get"
import set from "lodash/set"

class Storage {
  storage = {}

  getItem = (path, defaultValue) => get(this.storage, path, defaultValue)

  setItem = (path, value) => set(this.storage, path, value)
}

const storage = new Storage()

class Emitter {
  listeners = []

  emit = (...args) => this.listeners.forEach(listener => listener(...args))

  subscribe = listener => this.listeners.push(listener)

  unsubscribe = listener =>
    this.listeners.splice(this.listeners.indexOf(listener), 1)
}

const emitter = new Emitter()

class State extends Component {
  static propTypes = {
    subscribeTo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    onChange: PropTypes.func,
    render: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    render: () => {}
  }

  componentDidMount() {
    this.subscribe(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.unsubscribe()
    this.subscribe(nextProps)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  subscribe = ({ subscribeTo, onChange }) => {
    const subscribedKeys = subscribeTo ? [].concat(subscribeTo) : []
    this.subscriptions = subscribedKeys.map(key =>
      emitter.subscribe((path, value) =>
        this.forceUpdate(() => onChange(path, value))
      )
    )
  }

  unsubscribe = () => this.subscriptions.forEach(emitter.unsubscribe)

  getState = (path, defaultValue) => storage.getItem(path, defaultValue)

  setState = (path, value) => {
    storage.setItem(path, value)
    emitter.emit(path, value)
  }

  render() {
    return this.props.render({
      getState: this.getState,
      setState: this.setState
    })
  }
}

export default State
