import React, { Component, PropTypes } from 'react'
import Evee from 'evee'

const evee = new Evee()

export default class Storage extends Component {
  static propTypes = {
    subscribeTo: PropTypes.arrayOf(PropTypes.string),
    getter: PropTypes.func,
    setter: PropTypes.func
  }

  static defaultProps = { subscribeTo: [] }

  constructor(props) {
    super(props)
    this.state = {}
    this.subscriptions = this.props.subscribeTo.map(key => (
      evee.on(key, event => this.setState({ [key]: event.data }))
    ))
  }

  async componentDidMount() {
    const values = this.props.subscribeTo.map(key => this.props.getter(key))
    const resolvedValues = await Promise.all(values)
    const nextState = this.props.subscribeTo.reduce((result, key, index) => ({
      ...result,
      [key]: resolvedValues[index] || null
    }), {})
    this.setState(nextState)
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => evee.drop(subscription))
  }

  setItem = async (key, value) => {
    await this.props.setter(key, value)
    evee.emit(key, value)
    return value
  }

  render() {
    return this.props.children({ ...this.state, setItem: this.setItem })
  }
}

export const LocalStorage = props => (
  <Storage
    {...props}
    getter={key => Promise.resolve(JSON.parse(localStorage.getItem(key)))}
    setter={(key, value) => {
      return Promise.resolve(localStorage.setItem(key, JSON.stringify(value)))
    }}
  />
)
