import React, { PropTypes } from 'react'

export default function Label(props) {
  const { children, ...other } = props
  return (
    <label {...other} className="control-label">
      {children}
    </label>
  )
}

Label.propTypes = {
  children: PropTypes.node.isRequired
}
