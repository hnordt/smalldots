import React, { PropTypes } from 'react'

export default function Panel({
  type,
  renderTitle,
  renderBody,
  renderFooter,
  children,
  ...other
}) {
  return (
    <div {...other} className={`panel panel-${type}`}>
      {renderTitle && (
        <div className="panel-heading">
          <h3 className="panel-title">{renderTitle()}</h3>
        </div>
      )}
      {children || (renderBody && (
        <div className="panel-body">
          {renderBody()}
        </div>
      ))}
      {renderFooter && (
        <div className="panel-footer">
          {renderFooter()}
        </div>
      )}
    </div>
  )
}

Panel.propTypes = {
  type: PropTypes.oneOf(['default', 'success', 'info', 'warning', 'danger']),
  renderTitle: PropTypes.func,
  renderBody: PropTypes.func,
  renderFooter: PropTypes.func,
  children: PropTypes.node
}

Panel.defaultProps = {
  type: 'default'
}
