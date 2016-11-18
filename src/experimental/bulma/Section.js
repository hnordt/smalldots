import React, { PropTypes } from 'react'
import { SIZES } from './constants'

const Section = ({
  size,
  children,
  ...props
}) => (
  <section
    className={[
      'section',
      size && `is-${size}`
    ].filter(v => v).join(' ')}
    {...props}
  >
    {children}
  </section>
)

Section.propTypes = {
  size: PropTypes.oneOf(SIZES.filter(size => size !== 'small')),
  children: PropTypes.node.isRequired
}

export default Section
