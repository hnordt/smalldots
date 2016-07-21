import React, { PropTypes } from 'react'

export default function Field({ label, error, children, ...other }) {
  return (
    <div {...other} className={`form-group ${error ? 'has-error' : ''}`}>
      {label && <label className="control-label">{label}</label>}
      {children}
      {error && <span className="help-block">{error}</span>}
    </div>
  )
}

Field.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired
}
