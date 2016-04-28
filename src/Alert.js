import React, { PropTypes } from 'react'

export default function Alert(props) {
  const { type, children, ...other } = props
  return <div {...other} className={`alert alert-${type}`}>{children}</div>
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
