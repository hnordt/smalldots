import React from 'react'
import renderer from 'react-test-renderer'
import Link from './Link'

test('renders correctly', () => {
  const tree = renderer.create(
    <Link to="/foo">
      Foo
    </Link>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
