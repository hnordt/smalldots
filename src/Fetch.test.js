import React from 'react'
import renderer from 'react-test-renderer'
import Fetch from './Fetch'

test('renders correctly', () => {
  const tree = renderer.create(
    <Fetch
      method="post"
      url="https://jsonplaceholder.typicode.com/posts"
      body={{
        foo: 'foo'
      }}
    >
      {() => null}
    </Fetch>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
