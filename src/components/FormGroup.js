import React, { PropTypes } from 'react'

export default function FormGroup(props) {
  const { error, children, ...otherProps } = props
  return (
    <div {...otherProps} className={`form-group ${error ? 'has-error' : ''}`}>
      {children}
      {error && <span className="help-block">{error}</span>}
    </div>
  )
}

FormGroup.propTypes = {
  error: PropTypes.node,
  children: PropTypes.node.isRequired
}
