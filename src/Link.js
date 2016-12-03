import React, { PropTypes } from 'react'
import Router from './Router'

const Link = ({ to, state, onClick, ...props }) => (
  <Router>
    {({ push }) => (
      <a
        {...props}
        href={to || '#'}
        onClick={event => {
          event.preventDefault()
          if (to) {
            push(to, state)
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
  state: PropTypes.object,
  onClick: PropTypes.func
}

export default Link
