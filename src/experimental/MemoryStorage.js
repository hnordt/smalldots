import React from 'react'
import Storage from './Storage'

const memoryStorage = {
  store: {},
  getItem(key) {
    return this.store[key]
  },
  setItem(key, value) {
    this.store[key] = value
    return value
  }
}

export default function MemoryStorage(props) {
  return <Storage {...props} driver={memoryStorage} />
}

MemoryStorage.propTypes = { subscribe: Storage.propTypes.subscribe }
