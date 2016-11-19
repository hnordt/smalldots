import React, { PropTypes } from 'react'

const Modal = ({
  active,
  onCloseClick,
  onBackgroundClick,
  title,
  foot,
  children,
  ...props
}) => (
  <div
    className={[
      'modal',
      active && 'is-active'
    ].filter(v => v).join(' ')}
    {...props}
  >
    <div
      className="modal-background"
      onClick={onBackgroundClick}
    />
    {(title || foot) && (
      <div className="modal-card">
        {title && (
          <header className="modal-card-head">
            <p className="modal-card-title">
              {title}
            </p>
            {onCloseClick && (
              <button
                className="delete"
                type="button"
                onClick={onCloseClick}
              />
            )}
          </header>
        )}
        {children && (
          <section className="modal-card-body">
            {children}
          </section>
        )}
        {foot && (
          <footer className="modal-card-foot">
            {foot}
          </footer>
        )}
      </div>
    )}
    {!title && !foot && children && (
      <div className="modal-content">
        {children}
      </div>
    )}
    {!title && !foot && onCloseClick && (
      <button
        className="modal-close"
        type="button"
        onClick={onCloseClick}
      />
    )}
  </div>
)

Modal.propTypes = {
  active: PropTypes.bool,
  onCloseClick: PropTypes.func,
  onBackgroundClick: PropTypes.func,
  title: PropTypes.node,
  foot: PropTypes.node,
  children: PropTypes.node
}

export default Modal
