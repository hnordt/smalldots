import React from 'react'
import renderer from 'react-test-renderer'
import FetchService from './FetchService'

test('renders correctly', () => {
  const tree = renderer.create(
    <FetchService
      method="post"
      url="https://api.ipify.org?format=json"
      body={{
        foo: 'foo'
      }}
    >
      {() => null}
    </FetchService>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
