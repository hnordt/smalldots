import React, { Component, PropTypes } from 'react'
import range from 'lodash/range'

export default class Paginator extends Component {
  static propTypes = {
    initialPage: PropTypes.number,
    numberOfPages: PropTypes.number.isRequired,
    children: PropTypes.func.isRequired
  }

  static defaultProps = { initialPage: 1 }

  state = { page: this.props.initialPage }

  getPageRange = (offset = 3) => {
    if (typeof offset !== 'number') {
      throw new Error(`offset should be a number`)
    }
    if (offset <= 0) {
      throw new Error(`offset should be equal or greater than 1`)
    }
    const start = this.state.page - offset
    const end = this.state.page + offset
    return range(
      start > 0 ? start : 1,
      end < this.props.numberOfPages ? end + 1 : this.props.numberOfPages + 1
    )
  }

  setPage = page => this.setState({ page })

  incrementPage = () => {
    if (this.state.page >= this.props.numberOfPages) {
      return
    }
    this.setPage(this.state.page + 1)
  }

  decrementPage = () => {
    if (this.state.page <= 1) {
      return
    }
    this.setPage(this.state.page - 1)
  }

  render() {
    return this.props.children({
      ...this.state,
      getPageRange: this.getPageRange,
      setPage: this.setPage,
      incrementPage: this.incrementPage,
      decrementPage: this.decrementPage
    })
  }
}
