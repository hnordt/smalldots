import React, { PropTypes } from 'react'

export default function Panel(props) {
  const { type, children, ...other } = props
  return <div {...other} className={`panel panel-${type}`}>{children}</div>
}

Panel.propTypes = {
  type: PropTypes.oneOf([
    'default',
    'success',
    'info',
    'warning',
    'danger'
  ]),
  children: PropTypes.node.isRequired
}

Panel.defaultProps = {
  type: 'default'
}
