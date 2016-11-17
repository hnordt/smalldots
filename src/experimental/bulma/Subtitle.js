import React, { PropTypes, createElement } from 'react'
import range from 'lodash/range'

const Subtitle = ({
  size,
  children,
  ...props
}) => (
  createElement(
    size ? `h${size}` : 'h1',
    {
      className: [
        'subtitle',
        size && `is-${size}`,
      ].filter(v => v).join(' '),
      ...props
    },
    children
  )
)

Subtitle.propTypes = {
  size: PropTypes.oneOf(range(1, 7)),
  children: PropTypes.node.isRequired
}

export default Subtitle
