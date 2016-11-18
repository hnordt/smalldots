import React, { PropTypes } from 'react'
import { TYPES, SIZES } from './constants'

const Hero = ({
  type,
  size,
  bold,
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
    {children.head && (
      <div className="hero-head">
        {children.head}
      </div>
    )}
    {children.body && (
      <div className="hero-body">
        {children.body}
      </div>
    )}
    {children.foot && (
      <div className="hero-foot">
        {children.foot}
      </div>
    )}
    {!children.head && !children.body && !children.foot && (
      <div className="hero-body">
        {children}
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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      head: PropTypes.node,
      body: PropTypes.node,
      foot: PropTypes.node
    })
  ]).isRequired
}

export default Hero
