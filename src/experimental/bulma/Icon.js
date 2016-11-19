import React, { PropTypes } from 'react'
import { SIZES } from './constants'

const Icon = ({
  name,
  size,
  ...props
}) => (
  <span
    className={[
      'icon',
      size && `is-${size}`
    ].filter(v => v).join(' ')}
    {...props}
  >
    <i className={`fa fa-${name}`} />
  </span>
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(SIZES)
}

export default Icon
