import React from 'react'
import renderer from 'react-test-renderer'
import Toggler from './Toggler'

test('renders correctly', () => {
  const tree = renderer.create(
    <Toggler>
      {() => null}
    </Toggler>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
