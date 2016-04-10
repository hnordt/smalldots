import React, { PropTypes } from 'react'

export default function PanelHeading(props) {
  const { title, children, ...other } = props
  return (
    <div {...other} className="panel-heading">
      {title ? <h3 className="panel-title">{title}</h3> : children}
    </div>
  )
}

PanelHeading.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}
