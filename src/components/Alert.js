import React, { PropTypes } from 'react'

export default function Alert(props) {
  const { type, children, ...otherProps } = props
  return (
    <div {...otherProps} className={`alert alert-${type}`}>
      {children}
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf([
    'success',
    'info',
    'warning',
    'danger'
  ]).isRequired,
  children: PropTypes.node.isRequired
}
