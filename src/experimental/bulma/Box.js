import React, { PropTypes } from 'react'

const Box = ({
  children,
  ...props
}) => (
  <div className="box" {...props}>
    {children}
  </div>
)

Box.propTypes = {
  children: PropTypes.node.isRequired
}

export default Box
