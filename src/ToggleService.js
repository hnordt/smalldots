import { PureComponent, PropTypes } from 'react'

class ToggleService extends PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired
  }

  state = {
    toggled: false
  }

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      toggled: !prevState.toggled
    }))
  }

  render() {
    const api = {
      toggled: this.state.toggled,
      toggle: this.toggle
    }
    return this.props.children(api) || null
  }
}

export default ToggleService
