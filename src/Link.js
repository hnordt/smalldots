import React, { PropTypes } from 'react'
import BrowserHistoryService from './BrowserHistoryService'

const Link = ({ location, onClick, ...props }) => (
  <BrowserHistoryService>
    {({ push }) => (
      <a
        {...props}
        href="#"
        onClick={event => {
          event.preventDefault()
          if (location) {
            push(location)
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
      path: PropTypes.string.isRequired,
      search: PropTypes.object,
      state: PropTypes.object
    })
  ]),
  onClick: PropTypes.func
}

export default Link
