import React, { PropTypes } from 'react'

const Footer = ({
  children,
  ...props
}) => (
  <footer className="footer" {...props}>
    {children}
  </footer>
)

Footer.propTypes = {
  children: PropTypes.node.isRequired
}

export default Footer
