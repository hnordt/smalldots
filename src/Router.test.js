import React from 'react'
import renderer from 'react-test-renderer'
import Router from './Router'

test('renders correctly when children is a string', () => {
  const tree = renderer.create(
    <Router>
      {() => null}
    </Router>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly when children is an object', () => {
  const tree = renderer.create(
    <Router>
      {{
        '/': () => null
      }}
    </Router>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
