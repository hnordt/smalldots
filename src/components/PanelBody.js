import React, { PropTypes } from 'react'

export default function PanelBody(props) {
  const { children, ...other } = props
  return (
    <div {...other} className="panel-body">
      {children}
    </div>
  )
}

PanelBody.propTypes = {
  children: PropTypes.node.isRequired
}
