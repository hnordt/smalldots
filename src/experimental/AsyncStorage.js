import { Component, PropTypes } from 'react'
import Evee from 'evee'

const evee = new Evee()

export default class Storage extends Component {
  static propTypes = {
    subscribe: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    driver: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      setItem: PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)
    const subscribedKeys = this.getSubscribedKeys()
    this.state = subscribedKeys.reduce(async (result, key) => ({
      ...result,
      [key]: await this.props.driver.getItem(key) || null
    }), {})
    this.subscriptions = subscribedKeys.map(key => (
      evee.on(key, event => this.setState({ [key]: event.data }))
    ))
  }

  componentWillUnmount() {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => evee.drop(subscription))
    }
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

  setItem = async (key, value) => {
    await this.props.driver.setItem(key, value)
    evee.emit(key, value)
    return value
  }

  render() {
    return this.props.children({ ...this.state, setItem: this.setItem })
  }
}
