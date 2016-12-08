import React, { PropTypes } from 'react'
import Router from './Router'
import qs from 'qs'

const Link = ({ location, onClick, ...props }) => (
  <Router>
    {({ push }) => (
      <a
        {...props}
        href="#"
        onClick={event => {
          event.preventDefault()
          if (typeof location === 'string') {
            push(location)
          }
          if (typeof location === 'object') {
            push({
              ...location,
              search: '?' + qs.stringify(location.search)
            })
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
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.object,
      state: PropTypes.object
    })
  ]),
  onClick: PropTypes.func
}

export default Link
