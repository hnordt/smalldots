import { Component, PropTypes } from 'react'
import Evee from 'evee'

const evee = new Evee()

export default class Storage extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    subscribe: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    driver: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      setItem: PropTypes.func.isRequired
    }).isRequired
  }

  static defaultProps = { initialValues: {} }

  state = {}

  componentDidMount() {
    const subscribedKeys = this.getSubscribedKeys()
    Promise.all(subscribedKeys.map(this.props.driver.getItem)).then(values => {
      if (this.willUnmount) {
        return
      }
      this.setState(subscribedKeys.reduce((result, key, index) => ({
        ...result,
        [key]: this.props.initialValues[key] || values[index] || null
      }), {}))
    })
    this.subscriptions = subscribedKeys.map(key => (
      evee.on(key, event => !this.willUnmount && this.setState({ [key]: event.data }))
    ))
  }

  componentWillUnmount() {
    this.willUnmount = true
    this.subscriptions.forEach(subscription => evee.drop(subscription))
  }

  getSubscribedKeys() {
    if (!this.props.subscribe) {
      return []
    }
    if (typeof this.props.subscribe === 'string') {
      return [this.props.subscribe]
    }
    return this.props.subscribe
  }

  setItem = (key, value) => {
    return this.props.driver.setItem(key, value).then(() => {
      evee.emit(key, value)
      return value
    })
  }

  render() {
    return this.props.children({ ...this.state, setItem: this.setItem })
  }
}
