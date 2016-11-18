import { PropTypes, createElement } from 'react'
import range from 'lodash/range'

const Title = ({
  size,
  children,
  ...props
}) => (
  createElement(
    size ? `h${size}` : 'h1',
    {
      className: [
        'title',
        size && `is-${size}`,
      ].filter(v => v).join(' '),
      ...props
    },
    children
  )
)

Title.propTypes = {
  size: PropTypes.oneOf(range(1, 7)),
  children: PropTypes.node.isRequired
}

export default Title
