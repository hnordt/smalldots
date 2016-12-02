import React, { PureComponent, PropTypes } from 'react'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'

class Form extends PureComponent {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    children: PropTypes.func.isRequired
  }

  static defaultProps = { initialValues: {} }

  state = {
    values: this.props.initialValues,
    dirtyValues: [],
    submitted: false
  }

  componentWillReceiveProps(nextProps) {
    if (isEqual(this.props, nextProps)) {
      return
    }
    this.setState(prevState => ({
      values: {
        ...nextProps.initialValues,
        ...prevState.values
      }
    }))
  }

  isPristine = path => {
    if (path) {
      return !this.state.dirtyValues.find(dirtyValue => dirtyValue === path)
    }
    return !this.state.dirtyValues.length
  }

  isDirty = path => !this.isPristine(path)

  isSubmitted = () => this.state.submitted

  getValue = path => {
    if (!path) {
      throw new Error('getValue() requires a path')
    }
    return get(this.state.values, path, '')
  }

  setValue = (path, value) => {
    if (!path) {
      throw new Error('setValue() requires a path')
    }
    if (value === undefined) {
      throw new Error('setValue() requires a non-undefined value')
    }
    this.setState(prevState => {
      const prevValues = prevState.values
      // Lo-Dash's set() mutates the original value, so we need to make a copy
      const prevValuesCopy = cloneDeep(prevValues)
      const nextValues = set(prevValuesCopy, path, value)
      return { values: nextValues }
    })
    this.setDirty(path)
  }

  setPristine = path => {
    if (!path) {
      throw new Error('setPristine() requires a path')
    }
    this.setState(prevState => ({
      dirtyValues: (
        this.isPristine(path)
          ? prevState.dirtyValues
          : prevState.dirtyValues.filter(dirtyValue => dirtyValue !== path)
      )
    }))
  }

  setDirty = path => {
    if (!path) {
      throw new Error('setDirty() requires a path')
    }
    this.setState(prevState => ({
      dirtyValues: (
        this.isDirty(path)
          ? prevState.dirtyValues
          : [...prevState.dirtyValues, path]
      )
    }))
  }

  submit = event => {
    if (event) {
      event.preventDefault()
    }
    this.setState({ submitted: true })
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.values)
    }
  }

  reset = () => this.setState({
    values: this.props.initialValues,
    dirtyValues: [],
    submitted: false
  })

  render() {
    // eslint-disable-next-line
    const { initialValues, onSubmit, children, ...props } = this.props
    return (
      <form {...props} onSubmit={this.submit}>
        {children({
          values: this.state.values,
          isPristine: this.isPristine,
          isDirty: this.isDirty,
          isSubmitted: this.isSubmitted,
          getValue: this.getValue,
          setValue: this.setValue,
          setPristine: this.setPristine,
          setDirty: this.setDirty,
          reset: this.reset
        })}
      </form>
    )
  }
}

export default Form
