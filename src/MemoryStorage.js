import React from 'react'
import Storage from './Storage'

const store = {}

function getItem(key) {
  return Promise.resolve(store[key])
}

function setItem(key, value) {
  store[key] = value
  return Promise.resolve(value)
}

export default function MemoryStorage(props) {
  return <Storage {...props} driver={{ getItem, setItem }} />
}

MemoryStorage.propTypes = {
  initialValues: Storage.propTypes.initialValues,
  subscribe: Storage.propTypes.subscribe
}
