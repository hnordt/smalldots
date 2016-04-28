import React, { PropTypes } from 'react'
import PanelTitle from './PanelTitle'

export default function PanelHeading(props) {
  const { title, children, ...other } = props
  return (
    <div {...other} className="panel-heading">
      {title ? <PanelTitle>{title}</PanelTitle> : children}
    </div>
  )
}

PanelHeading.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}
