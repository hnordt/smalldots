import { Component } from "react"
import PropTypes from "prop-types"

class Toggler extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  }

  state = { toggled: false }

  toggle = () => this.setState(prevState => ({ toggled: !prevState.toggled }))

  render() {
    return this.props.children({
      toggled: this.state.toggled,
      toggle: this.toggle
    })
  }
}

export default Toggler
