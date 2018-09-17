import React from "react"

class Component extends React.Component {
  static defaultProps = {
    initialState: {},
    refs: {},
    shouldUpdate: () => true,
    onMount: () => {},
    onUpdate: () => {},
    onBeforeUnmount: () => {},
    children: null
  }

  state = this.props.initialState

  _refs = this.props.refs

  componentDidMount() {
    this.props.onMount({
      props: this.props,
      state: this.state,
      refs: this._refs,
      setState: this._setState,
      forceUpdate: this._forceUpdate
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.shouldUpdate({
      props: this.props,
      state: this.state,
      nextProps,
      nextState
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.onUpdate({
      props: this.props,
      state: this.state,
      refs: this._refs,
      prevProps,
      prevState,
      setState: this._setState,
      forceUpdate: this._forceUpdate
    })
  }

  componentWillUnmount() {
    this.props.onBeforeUnmount({
      state: this.state,
      props: this.props,
      refs: this._refs
    })
  }

  _setState = (...args) => this.setState(...args)

  _forceUpdate = (...args) => this.forceUpdate(...args)

  render() {
    const { children } = this.props
    return typeof children === "function"
      ? children({
          props: this.props,
          state: this.state,
          refs: this._refs,
          setState: this._setState,
          forceUpdate: this._forceUpdate
        })
      : children
  }
}

export default Component
