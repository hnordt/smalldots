import { PureComponent, PropTypes } from 'react'
import isArray from 'lodash/isArray'
import get from 'lodash/get'

class Validator extends PureComponent {
  static propTypes = {
    validations: PropTypes.object,
    values: PropTypes.object,
    children: PropTypes.func.isRequired
  }

  getErrors = () => {
    if (!this.props.validations) {
      return null
    }
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
          const error = validation(get(this.props.values, path, ''), this.props.values, path)
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
    return this.props.children({ errors: this.getErrors() }) || null
  }
}

export default Validator
