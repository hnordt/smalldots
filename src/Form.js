import React, { PropTypes } from 'react'

export default function Form({ onSubmit, children, ...other }) {
  return (
    <form
      {...other}
      onSubmit={event => {
        event.preventDefault()
        if (onSubmit) {
          onSubmit(event)
        }
      }}
    >
      {children}
    </form>
  )
}

Form.propTypes = {
  noValidate: PropTypes.bool,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired
}
