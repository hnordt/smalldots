import React, { PropTypes } from 'react'
import BrowserHistoryService from './BrowserHistoryService'
import qs from 'qs'

const Link = ({ location, onClick, ...props }) => (
  <BrowserHistoryService>
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
  </BrowserHistoryService>
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
