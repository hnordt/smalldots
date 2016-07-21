import React, { PropTypes } from 'react'

export default function SubmitButton({ type, block, children, ...other }) {
  return (
    <button
      {...other}
      className={`btn btn-${type} ${block ? 'btn-block' : ''}`}
      type="submit"
    >
      {children}
    </button>
  )
}

SubmitButton.propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning']),
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

SubmitButton.defaultProps = {
  type: 'default'
}
