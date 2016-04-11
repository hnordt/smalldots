import React, { PropTypes } from 'react'

export default function PanelTitle(props) {
  const { children, ...other } = props
  return <h3 {...other} className="panel-title">{children}</h3>
}

PanelTitle.propTypes = {
  children: PropTypes.node
}
