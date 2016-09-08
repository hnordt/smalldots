# Smalldots

Small, smart and elegant modules for React

[![npm](https://nodei.co/npm/smalldots.png?compact=true)](https://nodei.co/npm/smalldots/)

## Documentation

Recipes are available on the [Wiki](https://github.com/smalldots/smalldots/wiki).

Guides and API reference are not finished yet.

Sample usage:

### [Fetch](src/Fetch.js)

<img src="http://hnordt.d.pr/1fxFZ+" width="255" />

```js
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

```js
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

### [Navigator](src/Navigator.js)

<img src="http://hnordt.d.pr/193Ti+" width="287" />

```js
const App = () => (
  <Navigator initialScene="dashboard">
    {({ scene, setScene }) => ({
      dashboard: (
        <div className="panel panel-default">
          <div className="panel-heading">Dashboard</div>
          <div className="panel-body">
            <p>Welcome to Dashboard!</p>
            <button className="btn btn-link" type="button" onClick={() => setScene('reporting')}>
              Go to reporting
            </button>
          </div>
        </div>
      ),
      reporting: (
        <div className="panel panel-default">
          <div className="panel-heading">Reporting</div>
          <div className="panel-body">
            <p>Welcome to Reporting!</p>
            <button className="btn btn-link" type="button" onClick={() => setScene('dashboard')}>
              Go to dashboard
            </button>
          </div>
        </div>
      )
    })}
  </Navigator>
)
```

### [Paginator](src/Paginator.js)

<img src="http://hnordt.d.pr/7g4R+" width="536" />

```js
const numberOfPages = 50

const App = () => (
  <Paginator initialPage={10} numberOfPages={numberOfPages}>
    {({ page: currentPage, getPageRange, setPage, incrementPage, decrementPage }) => (
      <ul className="pagination">
        <li className={currentPage === 1 ? 'disabled' : ''}>
          <Link onClick={() => decrementPage()}>
            &laquo;
          </Link>
        </li>
        {/* range() comes with lodash (import range from 'lodash/range') */}
        {/* the "+ 1" part is necessary because range's second param isn't inclusive */}
        {range(currentPage - 3, currentPage + 3 + 1).map(page => {
          if (page < 1 || page > numberOfPages) {
            return null
          }
          return (
            <li key={page} className={page === currentPage ? 'active' : ''}>
              <Link onClick={() => setPage(page)}>
                {page}
              </Link>
            </li>
          )
        })}
        <li className={currentPage === numberOfPages ? 'disabled' : ''}>
          <Link onClick={() => incrementPage()}>
            &raquo;
          </Link>
        </li>
      </ul>
    )}
  </Paginator>
)
```
