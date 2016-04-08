import React, { PropTypes } from 'react'

export default function PanelTitle(props) {
  const { children, ...otherProps } = props
  return (
    <h3 {...otherProps} className="panel-title">
      {children}
    </h3>
  )
}

PanelTitle.propTypes = {
  children: PropTypes.node.isRequired
}
