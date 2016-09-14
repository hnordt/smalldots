import React from 'react'
import Storage from './Storage'

export default function LocalStorage(props) {
  return <Storage {...props} driver={localStorage} />
}

LocalStorage.propTypes = {
  initialValues: Storage.propTypes.initialValues,
  subscribe: Storage.propTypes.subscribe
}
