import React, { PropTypes } from 'react'

export default function Form({ onSubmit, children, ...other }) {
  return (
    <form
      {...other}
      noValidate
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
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired
}
