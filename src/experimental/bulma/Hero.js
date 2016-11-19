import React, { PropTypes } from 'react'
import { TYPES, SIZES } from './constants'

const Hero = ({
  type,
  size,
  bold,
  head,
  foot,
  children,
  ...props
}) => (
  <section
    className={[
      'hero',
      type && `is-${type}`,
      size && `is-${size.toLowerCase()}`,
      bold && 'is-bold'
    ].filter(v => v).join(' ')}
    {...props}
  >
    {head && (
      <div className="hero-head">
        {head}
      </div>
    )}
    {children && (
      <div className="hero-body">
        {children}
      </div>
    )}
    {foot && (
      <div className="hero-foot">
        {foot}
      </div>
    )}
  </section>
)

Hero.propTypes = {
  type: PropTypes.oneOf([...TYPES, 'light', 'dark']),
  size: PropTypes.oneOf([
    ...SIZES.filter(size => size !== 'small'),
    'fullHeight'
  ]),
  bold: PropTypes.bool,
  head: PropTypes.node,
  foot: PropTypes.node,
  children: PropTypes.node
}

export default Hero
