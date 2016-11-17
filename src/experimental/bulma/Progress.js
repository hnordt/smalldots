import React, { PropTypes } from 'react'
import { TYPES, SIZES } from './constants'

const Progress = ({
  type,
  size,
  children,
  ...props
}) => (
  <progress
    className={[
      'progress',
      type && `is-${type}`,
      size && `is-${size}`
    ].filter(v => v).join(' ')}
    {...props}
  >
    {children}
  </progress>
)

Progress.propTypes = {
  type: PropTypes.oneOf(TYPES),
  size: PropTypes.oneOf(SIZES),
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  children: PropTypes.node
}

Progress.defaultProps = {
  value: 0,
  max: 100
}

export default Progress
