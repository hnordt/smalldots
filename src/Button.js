import React, { PropTypes } from 'react'

export default function Button(props) {
  const {
    type,
    block,
    disabled,
    onClick,
    children,
    ...other
  } = props
  return (
    <button
      {...other}
      className={`btn btn-${type} ${block ? 'btn-block' : ''}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger'
  ]),
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

Button.defaultProps = {
  type: 'default'
}
