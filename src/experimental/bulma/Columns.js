import React, { PropTypes } from 'react'

const Columns = ({
  multiline,
  gapless,
  children,
  ...props
}) => (
  <div
    className={[
      'columns',
      multiline && 'is-multiline',
      gapless && 'is-gapless'
    ].filter(v => v).join(' ')}
    {...props}
  >
    {children}
  </div>
)

Columns.propTypes = {
  multiline: PropTypes.bool,
  gapless: PropTypes.bool,
  children: PropTypes.node
}

export default Columns
