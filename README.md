# Smalldots

Small, smart and elegant modules for React

[![npm](https://nodei.co/npm/smalldots.png?compact=true)](https://nodei.co/npm/smalldots/)

## Documentation

* Recipes are available on the [Smalldots Wiki](https://github.com/smalldots/smalldots/wiki)
* Guides and API reference are not finished yet

Sample usage:

### [Fetch](src/Fetch.js)

_\* Check [Customizing Fetch](https://github.com/smalldots/smalldots/wiki/Customizing-Fetch) for details on how to set the base URL and configure authorization._

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
