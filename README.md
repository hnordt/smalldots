# Smalldots [![CircleCI](https://circleci.com/gh/smalldots/smalldots/tree/v0.33.0.svg?style=svg)](https://circleci.com/gh/smalldots/smalldots/tree/v0.33.0)

Smart modules for React

[![npm](https://nodei.co/npm/smalldots.png?compact=true)](https://nodei.co/npm/smalldots/)

## Documentation

- Recipes are available on the [Smalldots Wiki](https://github.com/smalldots/smalldots/wiki)
- Guides and API reference are not finished yet

Sample usage:

### [Fetch](src/Fetch.js)

<img src="http://hnordt.d.pr/1fxFZ+" width="255" />

_* Check [Customizing Fetch](https://github.com/smalldots/smalldots/wiki/Customizing-Fetch) for details on how to set the base URL and configure authorization._

```jsx
const IPAddressWidget = () => (
  <Fetch url="https://api.ipify.org?format=json" lazy={true}>
    {({ fetching, data, error, fetch }) => {
      if (fetching) {
        return <i className="fa fa-spinner fa-spin" />
      }
      if (data) {
        return <p className="text-success">Your IP Address is {data.ip}</p>
      }
      if (error) {
        return <p className="text-danger">Something bad happened</p>
      }
      return (
        <button className="btn btn-link" type="button" onClick={() => fetch()}>
          What is my IP Address?
        </button>
      )
    }}
  </Fetch>
)
```

### [Form](src/Form.js) and [Validator](src/Validator.js)

<img src="http://hnordt.d.pr/12cuY+" width="418" />

```jsx
const isRequired = value => !value && 'Required'
const minLength = minLength => {
  return value => value && value.length < minLength && `Min. length: ${minLength}`
}

const NewPost = () => (
  <Fetch method="post" url="http://jsonplaceholder.typicode.com/posts" lazy={true}>
    {({ fetching: submitting, data: post, error: failedToSubmit, fetch: submit }) => {
      if (post) {
        return <p className="text-success">New post added!</p>
      }
      return (
        <Form initialValues={{ title: 'Hello World!' }} onSubmit={values => submit(values)}>
          {({ values, setValue }) => (
            <Validator validations={{ title: [isRequired, minLength(5)] }} values={values}>
              {({ errors }) => (
                <div>
                  {failedToSubmit && <p className="text-danger">Something bad happened</p>}
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      value={values.title}
                      disabled={submitting}
                      onChange={event => setValue('title', event.target.value)}
                    />
                    {errors && errors.title && <span className="help-block">{errors.title}</span>}
                  </div>
                  <button className="btn btn-default" type="submit" disabled={errors || submitting}>
                    {submitting ? <i className="fa fa-spinner fa-spin" /> : 'Submit'}
                  </button>
                </div>
              )}
            </Validator>
          )}
        </Form>
      )
    }}
  </Fetch>
)
```
