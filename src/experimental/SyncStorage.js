import { PureComponent, PropTypes } from 'react'
import Emitter from 'component-emitter'
import isNil from 'lodash/isNil'

const emitter = new Emitter()

class SyncStorage extends PureComponent {
  static propTypes = {
    driver: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      setItem: PropTypes.func.isRequired
    }),
    subscribeTo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    onChange: PropTypes.func
  }

  state = this.getCurrentValues()

  subscriptions = this.getSubscribedKeys().map(key => emitter.on(key, value => {
    if (this.willUnmount) {
      return
    }
    if (this.state[key] === value) {
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

  getCurrentValues() {
    if (!this.props.driver) {
      return {}
    }
    return this.getSubscribedKeys().reduce((result, key, index) => {
      const currentValue = this.props.driver.getItem(key)
      return {
        ...result,
        [key]: isNil(currentValue) ? null : currentValue
      }
    }, {})
  }

  setItem = (key, value) => {
    if (this.props.driver) {
      this.props.driver.setItem(key, value)
    }
    emitter.emit(key, value)
  }

  handleChange(key) {
    if (!this.props.onChange) {
      return
    }
    this.props.onChange(key, this.state[key])
  }

  render() {
    return this.props.children({ ...this.state, setItem: this.setItem }) || null
  }
}

export default SyncStorage
