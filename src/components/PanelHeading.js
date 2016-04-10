import React, { PropTypes } from 'react'

export default function PanelHeading(props) {
  const { children, ...other } = props
  return (
    <div {...other} className="panel-heading">
      {children}
    </div>
  )
}

PanelHeading.propTypes = {
  children: PropTypes.node.isRequired
}
