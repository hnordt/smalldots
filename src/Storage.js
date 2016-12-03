import { PureComponent, PropTypes } from 'react'
import Emitter from 'component-emitter'

let memoryStorage = null
if (typeof document !== 'undefined') {
  const cache = {}
  memoryStorage = {
    getItem: key => cache[key],
    setItem: (key, value) => cache[key] = value,
    removeItem: key => delete cache[key]
  }
}

let emitter = null
if (typeof document !== 'undefined') {
  emitter = new Emitter()
}

class Storage extends PureComponent {
  static propTypes = {
    driver: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      setItem: PropTypes.func.isRequired,
      removeItem: PropTypes.func.isRequired
    }),
    subscribeTo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    onChange: PropTypes.func
  }

  static defaultProps = {
    driver: memoryStorage
  }

  subscriptions = this.getSubscribedKeys().map(key => (
    emitter.on(key, () => {
      if (this.willUnmount) {
        return
      }
      this.forceUpdate()
      if (this.props.onChange) {
        this.props.onChange(key, this.props.driver)
      }
    })
  ))

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

  getValues() {
    return this.getSubscribedKeys().reduce((result, key) => ({
      ...result,
      [key]: this.props.driver.getItem(key)
    }), {})
  }

  setItem = (key, value) => {
    this.props.driver.setItem(key, value)
    emitter.emit(key)
  }

  removeItem = key => {
    this.props.driver.removeItem(key)
    emitter.emit(key)
  }

  render() {
    return this.props.children({
      ...this.getValues(),
      getItem: this.props.driver.getItem,
      setItem: this.setItem,
      removeItem: this.removeItem
    }) || null
  }
}

export default Storage
