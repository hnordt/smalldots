import { PureComponent, PropTypes } from 'react'
import get from 'lodash/get'
import find from 'lodash/find'

class Validator extends PureComponent {
  static propTypes = {
    validations: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.func)).isRequired,
    values: PropTypes.object.isRequired,
    children: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.getErrors = this.getErrors.bind(this)
  }

  getErrors() {
    const paths = Object.keys(this.props.validations)
    const errors = paths.reduce((result, path) => {
      const value = get(this.props.values, path, '')
      const validations = (
        this.props.validations[path]
          .map(validation => validation(value, this.props.values))
      )
      const firstError = find(validations, error => error)
      if (!firstError) {
        return result
      }
      return {
        ...result,
        [path]: firstError
      }
    }, {})
    const hasErrors = Object.keys(errors).length > 0
    if (!hasErrors) {
      return null
    }
    return errors
  }

  render() {
    if (!this.props.children) {
      return null
    }
    const props = {
      errors: this.getErrors()
    }
    return this.props.children(props) || null
  }
}

export default Validator
