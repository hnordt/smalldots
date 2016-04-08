import React, { PropTypes } from 'react'

export default function PanelBody(props) {
  const { children, ...otherProps } = props
  return (
    <div {...otherProps} className="panel-body">
      {children}
    </div>
  )
}

PanelBody.propTypes = {
  children: PropTypes.node.isRequired
}
