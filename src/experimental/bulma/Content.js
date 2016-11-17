import React, { PropTypes } from 'react'
import { SIZES } from './constants'

const Content = ({
  size,
  children,
  ...props
}) => (
  <div
    className={[
      'content',
      size && `is-${size}`
    ].filter(v => v).join(' ')}
    {...props}
  >
    {children}
  </div>
)

Content.propTypes = {
  size: PropTypes.oneOf(SIZES.slice(1)),
  children: PropTypes.node
}

export default Content
