import { Component, PropTypes } from 'react'
import isArray from 'lodash/isArray'
import get from 'lodash/get'

export default class Validator extends Component {
  static propTypes = {
    validations: PropTypes.object.isRequired,
    values: PropTypes.object,
    children: PropTypes.func.isRequired
  }

  getErrors = () => {
    const errors = Object.keys(this.props.validations).reduce((result, path) => {
      const validations = this.props.validations[path]
      if (!isArray(validations)) {
        throw new Error(`validations[${path}] should be an array`)
      }
      return {
        ...result,
        [path]: validations.map((validation, index) => {
          if (typeof validation !== 'function') {
            throw new Error(`validations[${path}][${index}] should be a function`)
          }
          const error = validation(get(this.props.values, path, ''), this.props.values)
          if (error && typeof error !== 'string') {
            throw new Error(`validations[${path}][${index}] should return a string`)
          }
          return error
        }).find(error => error) || null
      }
    }, {})
    return Object.keys(errors).find(path => errors[path]) ? errors : null
  }

  render() {
    return this.props.children({ errors: this.getErrors() })
  }
}
