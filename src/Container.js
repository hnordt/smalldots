import React, { PropTypes } from 'react'

export default function Container({ children, ...other }) {
  return <div {...other} className="container">{children}</div>
}

Container.propTypes = {
  children: PropTypes.node.isRequired
}
