import React, { PropTypes } from 'react'

const Container = ({
  fluid,
  children,
  ...props
}) => (
  <div
    className={[
      'container',
      fluid && 'is-fluid'
    ].filter(v => v).join(' ')}
    {...props}
  >
    {children}
  </div>
)

Container.propTypes = {
  fluid: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default Container
