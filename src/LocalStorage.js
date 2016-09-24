import React from 'react'
import Storage from './Storage'

function getItem(key) {
  try {
    const value = localStorage.getItem(key)
    const parsedValue = JSON.parse(value)
    return Promise.resolve(parsedValue)
  } catch (error) {
    return Promise.reject(error)
  }
}

function setItem(key, value) {
  try {
    const stringifiedValue = JSON.stringify(value)
    localStorage.setItem(key, stringifiedValue)
    return Promise.resolve(value)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default function LocalStorage(props) {
  return <Storage {...props} driver={{ getItem, setItem }} />
}

LocalStorage.propTypes = {
  initialValues: Storage.propTypes.initialValues,
  subscribe: Storage.propTypes.subscribe
}
