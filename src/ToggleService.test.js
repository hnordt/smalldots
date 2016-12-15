import React from 'react'
import renderer from 'react-test-renderer'
import ToggleService from './ToggleService'

test('renders correctly', () => {
  const tree = renderer.create(
    <ToggleService>
      {() => null}
    </ToggleService>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
