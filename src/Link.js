import React, { PropTypes } from 'react'
import Router from './Router'

const Link = ({ to, onClick, ...props }) => (
  <Router>
    {({ push }) => (
      <a
        {...props}
        href={to || '#'}
        onClick={event => {
          event.preventDefault()
          if (to) {
            push(to)
          }
          if (onClick) {
            onClick(event)
          }
        }}
      />
    )}
  </Router>
)

Link.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func
}

export default Link
