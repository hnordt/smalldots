import React from 'react'
import renderer from 'react-test-renderer'
import StorageService from '../StorageService'

test('renders correctly', () => {
  const tree = renderer.create(
    <StorageService subscribeTo="foo">
      {() => null}
    </StorageService>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
