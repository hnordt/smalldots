import { PureComponent, PropTypes } from 'react'
import Emitter from 'component-emitter'

let emitter = null
if (typeof document !== 'undefined') {
  emitter = new Emitter()
}

class Storage extends PureComponent {
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
    [key]: this.props.driver.getItem(key)
  }), {})

  subscriptions = this.getSubscribedKeys().map(key => emitter.on(key, () => {
    if (this.willUnmount) {
      return
    }
    const value = this.props.driver.getItem(key)
    this.setState({ [key]: value })
    if (this.props.onChange) {
      this.props.onChange(key, value)
    }
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

  setItem = (key, value) => {
    this.props.driver.setItem(key, value)
    emitter.emit(key)
  }

  render() {
    return this.props.children({
      ...this.state,
      getItem: this.props.driver.getItem,
      setItem: this.setItem
    }) || null
  }
}

export default Storage
