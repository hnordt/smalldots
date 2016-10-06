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
    history: [this.props.initialScene],
    currentIndex: 0,
  }

  setScene = scene => this.setState({ currentScene: scene, history: this.state.history.concat(scene) })

  back = () => this.go(-1);

  forward = () => this.go(1);

  go = (scenes) => {
    const { currentIndex, history } = this.state;
    if (history[currentIndex + scenes]) {
      this.setState({
        currentScene: history[currentIndex + scenes],
        currentIndex: currentIndex + scenes,
      });
    } else {
      console.warn('You can route to a scene that doesn\'t exists!')
    }
  }

  getHistory = () => this.state.history;

  resetHistory = () => this.setState({ history: [] });

  render() {
    const children = this.props.children({
      ...this.state,
      setScene: this.setScene,
      back: this.back,
      forward: this.forward,
      go: this.go,
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
