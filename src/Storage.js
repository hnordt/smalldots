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

  state = this.getSubscribedKeys().reduce((result, key) => ({
    ...result,
    [key]: this.props.driver.getItem(key) || this.props.initialValues[key] || null
  }), {})

  componentDidMount() {
    this.subscriptions = this.getSubscribedKeys().map(key => (
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
    this.props.driver.setItem(key, value)
    evee.emit(key, value)
    return value
  }

  setItems = items => {
    Object.keys(items).forEach(key => this.setItem(key, items[key]))
    return items
  }

  render() {
    return this.props.children({
      ...this.state,
      setItem: this.setItem,
      setItems: this.setItems
    })
  }
}
