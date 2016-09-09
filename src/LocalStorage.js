import React from 'react'
import Storage from './Storage'

export default function LocalStorage(props) {
  return <Storage {...props} driver={localStorage} />
}

LocalStorage.propTypes = { subscribe: Storage.propTypes.subscribe }
