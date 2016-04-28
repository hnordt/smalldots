import React, { PropTypes } from 'react'

export default function Link(props) {
  const { onClick, children, ...other } = props
  return (
    <a {...other} href="#" onClick={event => {
      event.preventDefault()
      onClick && onClick(event)
    }}>
      {children}
    </a>
  )
}

Link.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}
