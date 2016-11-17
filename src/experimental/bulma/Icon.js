import React, { PropTypes } from 'react'
import { SIZES } from './constants'

const Icon = ({
  name,
  size,
  ...props
}) => (
  <div
    className={[
      'icon',
      size && `is-${size}`
    ].filter(v => v).join(' ')}
    {...props}
  >
    <i className={`fa fa-${name}`} />
  </div>
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(SIZES)
}

export default Icon
