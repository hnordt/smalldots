import React, { PureComponent, PropTypes } from 'react'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import omit from 'lodash/omit'

class Form extends PureComponent {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    validations: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.func)),
    onSubmit: PropTypes.func,
    children: PropTypes.func.isRequired
  }

  static defaultProps = {
    initialValues: {}
  }

  state = {
    values: this.props.initialValues,
    dirtyValues: [],
    submitted: false
  }

  constructor(props) {
    super(props)
    this.isPristine = this.isPristine.bind(this)
    this.isDirty = this.isDirty.bind(this)
    this.isSubmitted = this.isSubmitted.bind(this)
    this.getValue = this.getValue.bind(this)
    this.getErrors = this.getErrors.bind(this)
    this.getError = this.getError.bind(this)
    this.setValue = this.setValue.bind(this)
    this.setPristine = this.setPristine.bind(this)
    this.submit = this.submit.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValues === this.props.initialValues) {
      return
    }
    this.setState(prevState => ({
      values: {
        ...nextProps.initialValues,
        ...prevState.values
      }
    }))
  }

  isPristine(path) {
    if (path) {
      return !this.state.dirtyValues.find(dirtyValue => dirtyValue === path)
    }
    return !this.state.dirtyValues.length
  }

  isDirty(path) {
    return !this.isPristine(path)
  }

  isSubmitted() {
    return this.state.submitted
  }

  getValue(path) {
    if (!path) {
      throw new Error('getValue() requires a path')
    }
    return get(this.state.values, path, '')
  }

  getErrors() {
    if (!this.props.validations) {
      return null
    }
    const paths = Object.keys(this.props.validations)
    const errors = paths.reduce((result, path) => {
      const error = this.getError(path)
      if (!error) {
        return result
      }
      return {
        ...result,
        [path]: error
      }
    }, {})
    const hasErrors = Object.keys(errors).length > 0
    if (!hasErrors) {
      return null
    }
    return errors
  }

  getError(path) {
    if (!path) {
      throw new Error('getError() requires a path')
    }
    if (!this.props.validations) {
      return null
    }
    const validations = (
      this.props.validations[path]
        .map(validation => validation(this.getValue(path), this.state.values))
    )
    const firstError = find(validations, error => !!error)
    return firstError || null
  }

  setValue(path, value) {
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

  setPristine(path) {
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

  setDirty(path) {
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

  submit(event) {
    if (event) {
      event.preventDefault()
    }
    if (this.getErrors()) {
      return
    }
    this.setState({ submitted: true })
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.values)
    }
  }

  reset() {
    this.setState({
      values: this.props.initialValues,
      dirtyValues: [],
      submitted: false
    })
  }

  render() {
    const api = {
      values: this.state.values,
      isPristine: this.isPristine,
      isDirty: this.isDirty,
      isSubmitted: this.isSubmitted,
      getValue: this.getValue,
      getErrors: this.getErrors,
      getError: this.getError,
      setValue: this.setValue,
      setPristine: this.setPristine,
      setDirty: this.setDirty,
      reset: this.reset
    }
    return (
      <form
        {...omit(this.props, [
          'initialValues',
          'validations'
        ])}
        onSubmit={this.submit}
      >
        {this.props.children(api)}
      </form>
    )
  }
}

export default Form
