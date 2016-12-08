import React from 'react'
import renderer from 'react-test-renderer'
import Storage from './Storage'

test('renders correctly', () => {
  const tree = renderer.create(
    <Storage subscribeTo="foo">
      {() => null}
    </Storage>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
