import React, { PropTypes } from 'react'

export default function TextArea(props) {
  return <textarea {...props} className="form-control" />
}

TextArea.propTypes = {
  name: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
}

TextArea.defaultProps = {
  rows: 3
}
