import React, { Component, PropTypes } from 'react'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'

export default class Form extends Component {
  static propTypes = { initialValues: PropTypes.object, onSubmit: PropTypes.func }

  static defaultProps = { initialValues: {} }

  state = { values: this.props.initialValues }

  isPristine = () => isEqual(this.state.values, this.props.initialValues)

  isDirty = () => !this.isPristine()

  getValue = path => get(this.state.values, path, '')

  setValue = (path, value) => {
    this.setState({ values: set(cloneDeep(this.state.values), path, value) })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.values)
    }
  }

  reset = () => this.setState({ values: this.props.initialValues })

  render() {
    // eslint-disable-next-line
    const { initialValues, ...rest } = this.props
    return (
      <form onSubmit={this.handleSubmit} {...rest}>
        {this.props.children({
          ...this.state,
          isPristine: this.isPristine,
          isDirty: this.isDirty,
          getValue: this.getValue,
          setValue: this.setValue,
          reset: this.reset
        })}
      </form>
    )
  }
}
