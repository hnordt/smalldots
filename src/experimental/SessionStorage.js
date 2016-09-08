import React from 'react'
import Storage from './Storage'

export default function SessionStorage(props) {
  return <Storage {...props} driver={sessionStorage} />
}

SessionStorage.propTypes = { subscribeTo: Storage.propTypes.subscribeTo }
