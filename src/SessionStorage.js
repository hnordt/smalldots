import React from 'react'
import Storage from './Storage'

export default function SessionStorage(props) {
  return <Storage {...props} driver={sessionStorage} />
}

SessionStorage.propTypes = {
  initialValues: Storage.propTypes.initialValues,
  subscribe: Storage.propTypes.subscribe
}
