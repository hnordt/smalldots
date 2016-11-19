import React, { PropTypes } from 'react'

['card', ]

const Card = ({
  fullWidth,
  image,
  title,
  icon,
  options,
  onIconClick,
  children,
  ...props
}) => (
  <div
    className={[
      'card',
      fullWidth && 'is-fullwidth'
    ].filter(v => v).join(' ')}
    {...props}
  >
    {image && (
      <div className="card-image">
        {image}
      </div>
    )}
    {(title || icon) && (
      <header className="card-header">
        {title && (
          <p className="card-header-title">
            {title}
          </p>
        )}
        {icon && (
          <a className="card-header-icon" onClick={onIconClick}>
            <i className={`fa fa-${icon}`} />
          </a>
        )}
      </header>
    )}
    {children && (
      <div className="card-content">
        {children}
      </div>
    )}
    {options && (
      <footer className="card-footer">
        {options.map(option => (
          <a className="card-footer-item" onClick={option.onClick}>
            {option.label}
          </a>
        ))}
      </footer>
    )}
  </div>
)

Card.propTypes = {
  fullWidth: PropTypes.bool,
  image: PropTypes.node,
  title: PropTypes.node,
  icon: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  })),
  onIconClick: PropTypes.func,
  children: PropTypes.node
}

export default Card
