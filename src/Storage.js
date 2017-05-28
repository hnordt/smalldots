import { Component } from "react"
import PropTypes from "prop-types"
import isNil from "lodash/isNil"
import isEqual from "lodash/isEqual"
import Evee from "evee"

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
    }).isRequired,
    onChange: PropTypes.func
  }

  static defaultProps = { initialValues: {} }

  state = {}

  subscriptions = this.getSubscribedKeys().map(key =>
    evee.on(key, event => {
      if (this.willUnmount) {
        return
      }
      this.setState({ [key]: event.data }, () => {
        if (this.props.onChange) {
          this.props.onChange(key, this.state[key])
        }
      })
    })
  )

  componentDidMount() {
    Promise.all([
      this.getInitialValues(),
      this.getCurrentValues()
    ]).then(([initialValues, currentValues]) => {
      const nextValues = this.getSubscribedKeys().reduce(
        (result, key) => ({
          ...result,
          [key]: currentValues[key] || initialValues[key]
        }),
        {}
      )
      this.setItems(nextValues)
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
    if (typeof this.props.subscribe === "string") {
      return [this.props.subscribe]
    }
    return this.props.subscribe
  }

  getInitialValues() {
    const subscribedKeys = this.getSubscribedKeys()
    const initialValues = subscribedKeys.reduce(
      (result, key) => ({
        ...result,
        [key]: isNil(this.props.initialValues[key])
          ? null
          : this.props.initialValues[key]
      }),
      {}
    )
    return Promise.resolve(initialValues)
  }

  getCurrentValues() {
    const subscribedKeys = this.getSubscribedKeys()
    const promises = subscribedKeys.map(this.props.driver.getItem)
    return Promise.all(promises).then(values => {
      return subscribedKeys.reduce(
        (result, key, index) => ({
          ...result,
          [key]: isNil(values[index]) ? null : values[index]
        }),
        {}
      )
    })
  }

  setItem = (key, value) => {
    const currentValue = this.state[key]
    if (isEqual(currentValue, value)) {
      return Promise.resolve(value)
    }
    return this.props.driver.setItem(key, value).then(value => {
      evee.emit(key, value)
      return value
    })
  }

  setItems = items => {
    const promises = Object.keys(items).map(key =>
      this.setItem(key, items[key])
    )
    return Promise.all(promises).then(() => items)
  }

  render() {
    return (
      this.props.children({
        ...this.state,
        setItem: this.setItem,
        setItems: this.setItems
      }) || null
    )
  }
}
