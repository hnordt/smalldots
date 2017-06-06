import { PureComponent, Children } from "react"
import PropTypes from "prop-types"

class Toggler extends PureComponent {
  static propTypes = { children: PropTypes.func.isRequired }

  state = { isToggled: false }

  toggle = () =>
    this.setState(prevState => ({ isToggled: !prevState.isToggled }))

  render() {
    const children = this.props.children({
      isToggled: this.state.isToggled,
      toggle: this.toggle
    })
    if (children === null) {
      return null
    }
    return Children.only(children)
  }
}

export default Toggler
