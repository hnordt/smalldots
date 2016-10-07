import React, { PropTypes } from 'react'
import EnhancedForm from './EnhancedForm'
import Link from '../Link'

export default function BootstrapForm({ submitLabel, resetLabel, ...props }) {
  return (
    <EnhancedForm {...props}>
      {({ tabs, fields, isDirty, reset }) => (
        <div>
          {tabs && (
            <ul className="nav nav-tabs" style={{ marginBottom: 20 }}>
              {tabs.map(tab => (
                <li key={tab.label} className={tab.active ? 'active' : ''}>
                  <Link onClick={tab.onClick}>
                    {isDirty() && tab.errors && (
                      <i className="fa fa-exclamation-triangle text-danger" />
                    )}
                    {' '}
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="row">
            {fields.map(field => {
              const error = isDirty(field.path) && field.error
              return (
                <div key={field.path} className={`col-xs-${field.size}`}>
                  <div className={`form-group ${error ? 'has-error' : ''}`}>
                    {field.label && <label className="control-label">{field.label}</label>}
                    {field.input}
                    {error && <span className="help-block">{error}</span>}
                  </div>
                </div>
              )
            })}
          </div>
          {(submitLabel || resetLabel) && (
            <div className="btn-toolbar">
              {submitLabel && (
                <div className="btn-group">
                  <button className="btn btn-primary" type="submit">
                    {submitLabel}
                  </button>
                </div>
              )}
              {resetLabel && (
                <div className="btn-group">
                  <button className="btn btn-default" type="button" onClick={reset}>
                    {resetLabel}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </EnhancedForm>
  )
}

BootstrapForm.propTypes = {
  submitLabel: PropTypes.node,
  resetLabel: PropTypes.node
}
