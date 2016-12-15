import React from 'react'
import renderer from 'react-test-renderer'
import BrowserHistoryService from './BrowserHistoryService'

test('renders correctly', () => {
  const tree = renderer.create(
    <BrowserHistoryService>
      {() => null}
    </BrowserHistoryService>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
