import { Component, Children } from "react"
import PropTypes from "prop-types"
import Emitter from "component-emitter"
import shallowEqual from "fbjs/lib/shallowEqual"

const emitter = new Emitter()

class SyncStorage extends Component {
  static propTypes = {
    driver: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      setItem: PropTypes.func.isRequired
    }).isRequired,
    subscribeTo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    onChange: PropTypes.func,
    children: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.subscribe(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const shouldResubscribe = !shallowEqual(this.props, nextProps)
    if (shouldResubscribe) {
      this.unsubscribe()
      this.subscribe(nextProps)
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  subscribe = props => {
    const subscribedKeys = props.subscribeTo ? [].concat(props.subscribeTo) : []
    this.subscriptions = subscribedKeys.map(key =>
      emitter.on(key, nextValue =>
        this.forceUpdate(() => props.onChange && props.onChange(key, nextValue))
      )
    )
  }

  unsubscribe = () =>
    this.subscriptions.forEach(subscription => emitter.off(subscription))

  getItem = (key, defaultValue = null) =>
    this.props.driver.getItem(key) || defaultValue

  setItem = (key, value) => {
    this.props.driver.setItem(key, value)
    emitter.emit(key, value)
  }

  render() {
    const children = this.props.children({
      getItem: this.getItem,
      setItem: this.setItem
    })
    if (children === null) {
      return null
    }
    return Children.only(children)
  }
}

export default SyncStorage
