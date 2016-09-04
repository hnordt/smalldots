import { Component, PropTypes } from 'react'
import get from 'lodash/get'

export default class Validator extends Component {
  static propTypes = {
    validations: PropTypes.object.isRequired,
    values: PropTypes.object
  }

  getErrors = () => {
    const errors = Object.keys(this.props.validations).reduce((result, path) => ({
      ...result,
      [path]: this.props.validations[path]
        .map(validation => validation(get(this.props.values, path, ''), this.props.values))
        .find(error => error)
    }), {})
    return Object.keys(errors).find(path => errors[path]) ? errors : null
  }

  render() {
    return this.props.children({ errors: this.getErrors() })
  }
}
