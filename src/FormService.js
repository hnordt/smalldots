import React, { PureComponent, PropTypes } from 'react'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'

class FormService extends PureComponent {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    validations: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.func)),
    onSubmit: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = {
    initialValues: {}
  }

  state = {
    values: this.props.initialValues,
    touchedValues: [],
    dirtyValues: [],
    submitted: false
  }

  constructor(props) {
    super(props)
    this.isValid = this.isValid.bind(this)
    this.isTouched = this.isTouched.bind(this)
    this.isDirty = this.isDirty.bind(this)
    this.isSubmitted = this.isSubmitted.bind(this)
    this.getValue = this.getValue.bind(this)
    this.getErrors = this.getErrors.bind(this)
    this.getError = this.getError.bind(this)
    this.setValue = this.setValue.bind(this)
    this.touch = this.touch.bind(this)
    this.untouch = this.untouch.bind(this)
    this.setDirty = this.setDirty.bind(this)
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

  isValid(path) {
    if (path) {
      return !this.getError(path)
    }
    return !this.getErrors()
  }

  isTouched(path) {
    if (path) {
      return this.state.touchedValues.find(touchedValue => touchedValue === path)
    }
    return this.state.touchedValues.length > 0
  }

  isDirty(path) {
    if (path) {
      return this.state.dirtyValues.find(dirtyValue => dirtyValue === path)
    }
    return this.state.dirtyValues.length > 0
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
    const firstError = find(validations, error => error)
    return firstError || null
  }

  setValue(path, value) {
    if (!path) {
      throw new Error('setValue() requires a path')
    }
    this.setState(prevState => {
      // Lo-Dash's set() mutates the original value, so we need to make a copy
      // TODO: check if cloneDeep() could be replaced by { ...prevValues }
      const prevValues = cloneDeep(prevState.values)
      return {
        values: set(prevValues, path, value)
      }
    })
    this.touch(path)
    this.setDirty(path)
  }

  touch(path) {
    if (!path) {
      throw new Error('touch() requires a path')
    }
    if (this.isTouched(path)) {
      return
    }
    this.setState(prevState => ({
      touchedValues: [...prevState.touchedValues, path]
    }))
  }

  untouch(path) {
    if (!path) {
      throw new Error('untouch() requires a path')
    }
    if (this.isUntouched(path)) {
      return
    }
    this.setState(prevState => ({
      touchedValues: (
        prevState
          .touchedValues
          .filter(touchedValue => touchedValue !== path)
      )
    }))
  }

  setDirty(path) {
    if (!path) {
      throw new Error('setDirty() requires a path')
    }
    if (this.isDirty(path)) {
      return
    }
    this.setState(prevState => ({
      dirtyValues: [...prevState.dirtyValues, path]
    }))
  }

  setPristine(path) {
    if (!path) {
      throw new Error('setPristine() requires a path')
    }
    if (this.isPristine(path)) {
      return
    }
    this.setState(prevState => ({
      dirtyValues: prevState.dirtyValues.filter(dirtyValue => dirtyValue !== path)
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
      touchedValues: [],
      dirtyValues: [],
      submitted: false
    })
  }

  render() {
    if (!this.props.children) {
      return null
    }
    const api = {
      values: this.state.values,
      errors: this.getErrors(),
      isValid: this.isValid,
      isTouched: this.isTouched,
      isDirty: this.isDirty,
      isSubmitted: this.isSubmitted,
      getValue: this.getValue,
      getError: this.getError,
      setValue: this.setValue,
      touch: this.touch,
      untouch: this.untouch,
      setDirty: this.setDirty,
      setPristine: this.setPristine,
      submit: this.submit,
      reset: this.reset
    }
    return this.props.children(api) || null
  }
}

export default FormService
