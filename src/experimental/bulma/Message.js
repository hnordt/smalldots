import React, { PropTypes } from 'react'
import { TYPES } from './constants'

const Message = ({
  type,
  header,
  children,
  ...props
}) => (
  <div
    className={[
      'message',
      type && `is-${type}`
    ].filter(v => v).join(' ')}
    {...props}
  >
    {header && (
      <div className="message-header">
        {header}
      </div>
    )}
    {children && (
      <div className="message-body">
        {children}
      </div>
    )}
  </div>
)

Message.propTypes = {
  type: PropTypes.oneOf(TYPES),
  header: PropTypes.node,
  children: PropTypes.node
}

export default Message
