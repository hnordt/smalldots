import React, { PropTypes } from 'react'

export default function Link({ onClick, children, ...other }) {
  return (
    <a
      {...other}
      onClick={event => {
        event.preventDefault()
        if (onClick) {
          onClick(event)
        }
      }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

Link.defaultProps = {
  href: '#'
}
