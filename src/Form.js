import React, { PropTypes } from 'react'

export default function Form(props) {
  const { onSubmit, children, ...other } = props
  return (
    <form {...other} noValidate onSubmit={event => {
      event.preventDefault()
      onSubmit && onSubmit(event)
    }}>
      {children}
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired
}
