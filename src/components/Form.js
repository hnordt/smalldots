import React, { PropTypes } from 'react'

export default function Form(props) {
  const { onSubmit, children, ...other } = props
  return (
    <form {...other} noValidate onSubmit={event => {
      event.preventDefault()
      onSubmit()
    }}>
      {children}
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}
