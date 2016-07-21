import React, { PropTypes } from 'react'

export default function Button({ type, block, children, ...other }) {
  return (
    <button
      {...other}
      className={`btn btn-${type} ${block ? 'btn-block' : ''}`}
      type="button"
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning']),
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

Button.defaultProps = {
  type: 'default'
}
