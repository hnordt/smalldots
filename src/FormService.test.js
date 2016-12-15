import React from 'react'
import renderer from 'react-test-renderer'
import FetchService from './FetchService'

test('renders correctly', () => {
  const tree = renderer.create(
    <FetchService
      initialValues={{
        foo: 'Foo'
      }}
      validations={{
        foo: [
          value => !value && 'Required'
        ]
      }}
    >
      {() => null}
    </FetchService>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
