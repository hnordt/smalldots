import { Component } from "react"
import PropTypes from "prop-types"

class Toggler extends Component {
  static propTypes = { children: PropTypes.func.isRequired }

  state = { isToggled: false }

  toggle = () =>
    this.setState(prevState => ({ isToggled: !prevState.isToggled }))

  render() {
    return (
      this.props.children({
        isToggled: this.state.isToggled,
        toggle: this.toggle
      }) || null
    )
  }
}

export default Toggler
