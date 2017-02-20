import React, { PropTypes } from 'react'
import BrowserHistoryService, { locationPropTypes } from './BrowserHistoryService'

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
  location: locationPropTypes,
  onClick: PropTypes.func
}

export default Link
