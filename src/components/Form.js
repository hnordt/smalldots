import React, { PropTypes } from 'react'

export default function Form(props) {
  const { onSubmit, children, ...otherProps } = props
  return (
    <form {...otherProps} noValidate onSubmit={event => {
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
