# Smalldots

Small, smart and elegant modules for React

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


### [BootstrapForm](src/experimental/BootstrapForm.js)

<img src="http://hnordt.d.pr/TPH1+" width="466" />

```jsx
const MyCustomDateInput = ({ date, onDateChange }) => (
  <div className="input-group">
    <span className="input-group-addon">
      <i className="fa fa-calendar-o" />
    </span>
    <input
      className="form-control"
      type="date"
      value={date}
      onChange={onDateChange}
    />
  </div>
)

const fields = [
  {
    tab: 'General',
    label: 'First Name',
    // You can use deeply nested paths (e.g. address.city, order.items[0].product.name)
    path: 'firstName',
    input: <input className="form-control" type="text" autoFocus />,
    size: 6
  },
  {
    tab: 'General',
    label: 'Last Name',
    path: 'lastName',
    input: <input className="form-control" type="text" />,
    size: 6
  },
  {
    tab: 'Other',
    label: 'Birthday',
    path: 'birthday',
    // You can use custom inputs too :)
    // (inputs that dont't accept value and onChange props)
    input: ({ value, setValue }) => (
      <MyCustomDateInput date={value} onDateChange={setValue} />
    ),
    size: 12
  }
]

const isRequired = value => !value && 'Required'
const minLength = minLength => {
  return value => value && value.length < minLength && `Min. length: ${minLength}`
}

const validations = {
  firstName: [isRequired, minLength(5)],
  birthday: [isRequired]
}

const UserForm = () => (
  <BootstrapForm
    fields={fields}
    validations={validations}
    submitLabel="Submit"
    resetLabel="Cancel"
    onSubmit={({ values }) => console.warn(values)}
  />
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

### [Navigator](src/Navigator.js)

<img src="http://hnordt.d.pr/193Ti+" width="287" />

```jsx
const App = () => (
  <Navigator initialScene="dashboard">
    {({ currentScene, setScene }) => ({
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

```jsx
const numberOfPages = 50

const App = () => (
  <Paginator initialPage={10} numberOfPages={numberOfPages}>
    {({ currentPage, setPage, incrementPage, decrementPage }) => (
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
