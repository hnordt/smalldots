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

  state = {}

  componentDidMount() {
    const subscribedKeys = this.getSubscribedKeys()
    Promise.all(subscribedKeys.map(this.props.driver.getItem))
      .then(values => {
        this.setState(subscribedKeys.reduce((result, key, index) => ({
          ...result,
          [key]: values[index] || null
        }), {}))
        this.subscriptions = subscribedKeys.map(key => (
          evee.on(key, event => !this.willUnmount && this.setState({ [key]: event.data }))
        ))
      })
      .catch(error => {
        throw error
      })
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
    return new Promise((resolve, reject) => {
      this.props.driver.setItem(key, value)
        .then(() => {
          evee.emit(key, value)
          resolve(value)
        })
        .catch(reject)
    })
  }

  render() {
    return this.props.children({ ...this.state, setItem: this.setItem })
  }
}
