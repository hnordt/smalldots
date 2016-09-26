import { Component, PropTypes, isValidElement } from 'react'
import isPlainObject from 'lodash/isPlainObject'
import has from 'lodash/has'

export default class Navigator extends Component {
  static propTypes = {
    initialScene: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  }

  state = {
    currentScene: this.props.initialScene,
    history: [],
  }

  setScene = scene => this.setState({ currentScene: scene, history: this.state.history.concat(scene) })

  goBack = () => {
    const { history } = this.state;
    if (history.length > 0) {
      history.pop();
      this.setState({
        currentScene: history[history.length - 1] || this.props.initialScene,
        history
      })
    } else {
      console.warn(`${this.state.currentScene} is the first scene in history`);
    }
  }

  resetHistory = () => this.setState({ history: [] });

  render() {
    const children = this.props.children({
      ...this.state,
      setScene: this.setScene,
      goBack: this.goBack,
      resetHistory: this.resetHistory,
    })
    if (!isPlainObject(children)) {
      throw new Error('children should return a plain object')
    }
    if (!has(children, this.state.currentScene)) {
      throw new Error(`${this.state.currentScene} is not a valid scene`)
    }
    if (!isValidElement(children[this.state.currentScene])) {
      throw new Error(`${this.state.currentScene} should return a valid element`)
    }
    return children[this.state.currentScene]
  }
}
