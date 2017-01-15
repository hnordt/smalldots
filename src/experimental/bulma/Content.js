import React, { PropTypes } from 'react'
import { SIZES } from './constants'

const Content = ({
  size,
  textAlign,
  children,
  ...props
}) => (
  <div
    className={[
      'content',
      size && `is-${size}`
      textAlign && `has-text-${textAlign}`
    ].filter(v => v).join(' ')}
    {...props}
  >
    {children}
  </div>
)

Content.propTypes = {
  size: PropTypes.oneOf(SIZES.filter(size => size !== 'small')),
  textAlign: PropTypes.oneOf(['centered','left','right']),
  children: PropTypes.node.isRequired
}

export default Content
