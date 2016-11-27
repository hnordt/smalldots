import { PureComponent, PropTypes } from 'react'
import Emitter from 'component-emitter'

const emitter = new Emitter()

class SyncStorage extends PureComponent {
  static propTypes = {
    driver: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      setItem: PropTypes.func.isRequired
    }).isRequired,
    subscribeTo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    onChange: PropTypes.func
  }

  state = this.getSubscribedKeys().reduce((result, key) => ({
    ...result,
    // We can't use `this.getItem(key)` here due to a property initializer bug
    [key]: this.props.driver.getItem(key)
  }), {})

  subscriptions = this.getSubscribedKeys().map(key => emitter.on(key, value => {
    if (this.willUnmount) {
      return
    }
    this.setState({ [key]: value }, () => this.handleChange(key))
  }))

  componentWillUnmount() {
    this.willUnmount = true
    this.subscriptions.forEach(subscription => emitter.off(subscription))
  }

  getSubscribedKeys() {
    if (!this.props.subscribeTo) {
      return []
    }
    if (typeof this.props.subscribeTo === 'string') {
      return [this.props.subscribeTo]
    }
    return this.props.subscribeTo
  }

  getItem = key => this.props.driver.getItem(key)

  setItem = (key, value) => {
    this.props.driver.setItem(key, value)
    emitter.emit(key, value)
  }

  handleChange(key) {
    if (!this.props.onChange) {
      return
    }
    this.props.onChange(key, this.state[key])
  }

  render() {
    return this.props.children({
      ...this.state,
      getItem: this.getItem,
      setItem: this.setItem
    }) || null
  }
}

export default SyncStorage
