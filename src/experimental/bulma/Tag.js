import React, { PropTypes } from 'react'
import { TYPES, SIZES } from './constants'

const Tag = ({
  type,
  size,
  onRemoveClick,
  children,
  ...props
}) => (
  <div
    className={[
      'tag',
      type && `is-${type}`,
      size && `is-${size}`
    ].filter(v => v).join(' ')}
    {...props}
  >
    {children}
    {onRemoveClick && (
      <button
        className="delete"
        type="button"
        onClick={onRemoveClick}
      />
    )}
  </div>
)

Tag.propTypes = {
  type: PropTypes.oneOf(TYPES),
  size: PropTypes.oneOf(SIZES),
  onRemoveClick: PropTypes.func,
  children: PropTypes.node
}

export default Tag
