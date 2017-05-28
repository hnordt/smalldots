import React from "react"
import PropTypes from "prop-types"

export default function Link({ onClick, ...rest }) {
  return (
    <a
      {...rest}
      onClick={event => {
        event.preventDefault()
        if (onClick) {
          onClick(event)
        }
      }}
    />
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

Link.defaultProps = {
  href: "#"
}
