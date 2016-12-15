import React from 'react'
import renderer from 'react-test-renderer'
import FormService from '../FormService'

test('renders correctly', () => {
  const tree = renderer.create(
    <FormService
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
    </FormService>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
