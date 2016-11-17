import React, { PropTypes } from 'react'

const Table = ({
  bordered,
  striped,
  narrow,
  children,
  ...props
}) => (
  <table
    className={[
      'table',
      bordered && 'is-bordered',
      striped && 'is-striped',
      narrow && 'is-narrow'
    ].filter(v => v).join(' ')}
    {...props}
  >
    {children}
  </table>
)

Table.propTypes = {
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  narrow: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default Table
