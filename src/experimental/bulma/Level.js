import React, { PropTypes } from 'react'

const Level = ({
  items,
  ...props
}) => {
  const leftAlignedItems = items.filter(item => {
    return item.align === 'left'
  })
  const centerAlignedItems = items.filter(item => {
    return !item.align || item.align === 'center'
  })
  const rightAlignedItems = items.filter(item => {
    return item.align === 'right'
  })
  return (
    <div className="level">
      {leftAlignedItems.length > 0 && (
        <div className="level-left">
          {leftAlignedItems.map(({ id, content }) => (
            <div key={id} className="level-item">
              {content}
            </div>
          ))}
        </div>
      )}
      {centerAlignedItems.map(({ id, content }) => (
        <div key={id} className="level-item">
          {content}
        </div>
      ))}
      {rightAlignedItems.length > 0 && (
        <div className="level-right">
          {rightAlignedItems.map(({ id, content }) => (
            <div key={id} className="level-item">
              {content}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

Level.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    content: PropTypes.node.isRequired,
    align: PropTypes.oneOfType(['left', 'center', 'right'])
  })).isRequired
}

export default Level
