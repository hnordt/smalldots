import { cloneElement } from "react"

const render = (
  { components: [component, ...components], children },
  accumulator = []
) =>
  cloneElement(component, {
    children:
      typeof children === "function"
        ? (...args) =>
            components.length
              ? render({ components, children }, [...accumulator, ...args])
              : children(...accumulator, ...args)
        : components.length
          ? render({ components, children })
          : children
  })

const Compose = ({ components, children }) => render({ components, children })

Compose.defaultProps = { components: [] }

export default Compose
