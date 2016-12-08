import React from 'react'
import renderer from 'react-test-renderer'
import Form from './Form'

test('renders correctly', () => {
  const tree = renderer.create(
    <Form
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
    </Form>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
