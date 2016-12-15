import React from 'react'
import renderer from 'react-test-renderer'
import FetchService from '../FetchService'

test('renders correctly', () => {
  const tree = renderer.create(
    <FetchService
      method="post"
      url="https://jsonplaceholder.typicode.com/posts"
      body={{
        id: 1
      }}
    >
      {() => null}
    </FetchService>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
