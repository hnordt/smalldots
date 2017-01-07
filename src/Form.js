import React, { PropTypes } from 'react'

const Form = props => (
  <form
    {...props}
    onSubmit={event => {
      event.preventDefault()
      if (props.onSubmit) {
        props.onSubmit(event)
      }
    }}
  />
)

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default Form
