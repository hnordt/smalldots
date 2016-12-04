import { PureComponent, PropTypes } from 'react'
import get from 'lodash/get'

class Validator extends PureComponent {
  static propTypes = {
    values: PropTypes.object,
    rules: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.func)),
    children: PropTypes.func
  }

  hasErrors = () => this.getPaths().filter(this.getError).length > 0

  getPaths = () => Object.keys(this.props.rules)

  getValue = path => get(this.props.values, path, '')

  getError = path => {
    const rules = this.props.rules[path]
    const errors = rules.map(rule => this.applyRule(rule, path)).filter(error => error)
    if (!errors.length) {
      return null
    }
    return errors[0]
  }

  applyRule = (rule, path) => rule(this.getValue(path), this.props.values)

  render() {
    if (!this.props.children) {
      return null
    }
    return this.props.children({
      hasErrors: this.hasErrors,
      getError: this.getError
    }) || null
  }
}

export default Validator
