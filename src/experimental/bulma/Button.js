import React, { Children, PropTypes } from 'react'
import { TYPES, STATES, SIZES } from './constants'

const renderChildren = children => {
  if (Children.count(children) === 1) {
    return children
  }
  return Children.map(children, child => {
    // When we have more than one child, we need to wrap strings in a span
    // to prevent whitespace problems
    if (typeof child === 'string') {
      return <span>{child}</span>
    }
    return child
  })
}

const Button = ({
  type,
  size,
  outlined,
  inverted,
  state,
  children,
  ...props
}) => (
  <button
    type="button"
    className={[
      'button',
      type && `is-${type}`,
      outlined && 'is-outlined',
      inverted && 'is-inverted',
      state && `is-${state}`,
      size && `is-${size}`
    ].filter(v => v).join(' ')}
    disabled={state === 'disabled'}
    {...props}
  >
    {renderChildren(children)}
  </button>
)

Button.propTypes = {
  type: PropTypes.oneOf([...TYPES, 'link']),
  size: PropTypes.oneOf(SIZES),
  outlined: PropTypes.bool,
  inverted: PropTypes.bool,
  state: PropTypes.oneOf(STATES),
  children: PropTypes.node.isRequired
}

export default Button
