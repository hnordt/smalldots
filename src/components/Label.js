import React, { PropTypes } from 'react'

export default function Label(props) {
  const { children, ...otherProps } = props
  return (
    <label {...otherProps} className="control-label">
      {children}
    </label>
  )
}

Label.propTypes = {
  children: PropTypes.node.isRequired
}
