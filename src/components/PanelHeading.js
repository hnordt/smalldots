import React, { PropTypes } from 'react'

export default function PanelHeading(props) {
  const { children, ...otherProps } = props
  return (
    <div {...otherProps} className="panel-heading">
      {children}
    </div>
  )
}

PanelHeading.propTypes = {
  children: PropTypes.node.isRequired
}
