import React, { PropTypes } from 'react'
import range from 'lodash/range'

const Column = ({
  narrow,
  size,
  offset,
  children,
  ...props
}) => (
  <div
    className={[
      'column',
      narrow && 'is-narrow',
      size && `is-${size}`,
      offset && `is-offset-${offset}`
    ].filter(v => v).join(' ')}
    {...props}
  >
    {children}
  </div>
)

const columnRange = range(1, 13)

Column.propTypes = {
  narrow: PropTypes.bool,
  size: PropTypes.oneOf(columnRange),
  offset: PropTypes.oneOf(columnRange),
  children: PropTypes.node
}

export default Column
