import { Component, PropTypes, isValidElement } from 'react'
import isPlainObject from 'lodash/isPlainObject'
import has from 'lodash/has'

export default class Navigator extends Component {
  static propTypes = {
    initialScene: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  }

  state = { scene: props.initialScene }

  setScene = scene => this.setState({ scene })

  render() {
    const children = this.props.children({ ...this.state, setScene: this.setScene })
    if (!isPlainObject(children)) {
      throw new Error('children should return a plain object')
    }
    if (!has(children, this.state.scene)) {
      throw new Error(`${this.state.scene} is not a valid scene`)
    }
    if (!isValidElement(children[this.state.scene])) {
      throw new Error(`${this.state.scene} should return a valid element`)
    }
    return children[this.state.scene]
  }
}
