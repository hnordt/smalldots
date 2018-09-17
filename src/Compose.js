import { cloneElement } from "react"

const render = (
  { components: [component, ...components], children },
  acc = []
) =>
  cloneElement(component, {
    children:
      typeof children === "function"
        ? (...args) =>
            components.length
              ? render({ components, children }, [...acc, ...args])
              : children(...acc, ...args)
        : components.length
          ? render({ components, children })
          : children
  })

const Compose = ({ components, children }) => render({ components, children })

export default Compose
