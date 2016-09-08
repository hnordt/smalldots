import { Component, PropTypes } from 'react'
import Evee from 'evee'

const evee = new Evee()

export default class Storage extends Component {
  static propTypes = {
    subscribeTo: PropTypes.oneOfType([
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
    let subscribeTo = this.props.subscribeTo
    if (!subscribeTo) {
      subscribeTo = []
    }
    if (typeof subscribeTo === 'string') {
      subscribeTo = [subscribeTo]
    }
    const items = subscribeTo.reduce((result, key) => ({
      ...result,
      [key]: this.props.driver.getItem(key) || null
    }), {})
    this.setState(items, () => {
      this.subscriptions = subscribeTo.map(key => (
        evee.on(key, event => this.setState({ [key]: event.data }))
      ))
    })
  }

  componentWillUnmount() {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => evee.drop(subscription))
    }
  }

  setItem = (key, value) => {
    this.props.driver.setItem(key, value)
    evee.emit(key, value)
    return value
  }

  render() {
    return this.props.children({ ...this.state, setItem: this.setItem })
  }
}
