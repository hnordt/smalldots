import React, { PropTypes } from 'react'
import { TYPES } from './constants'

const Notification = ({
  type,
  onCloseClick,
  children,
  ...props
}) => (
  <div
    className={[
      'notification',
      type && `is-${type}`
    ].filter(v => v).join(' ')}
    {...props}
  >
    {onCloseClick && (
      <button
        className="delete"
        type="button"
        onClick={onCloseClick}
      />
    )}
    {children}
  </div>
)

Notification.propTypes = {
  type: PropTypes.oneOf(TYPES),
  onCloseClick: PropTypes.func,
  children: PropTypes.node
}

export default Notification
