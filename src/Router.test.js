import React from 'react'
import renderer from 'react-test-renderer'
import Router from './Router'

test('renders correctly', () => {
  const tree = renderer.create(
    <Router
      routes={{
        '/': () => null
      }}
      activePathname="/"
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
