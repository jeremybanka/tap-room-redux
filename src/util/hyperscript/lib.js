/** @jsxImportSource @emotion/react */
import React from "react"

const { isArray } = Array

const isString = unknown => typeof unknown === `string`

const isNumber = unknown => typeof unknown === `number`

const isObject = unknown => typeof unknown === `object` && !isArray(unknown)

const isElement = unknown => React.isValidElement(unknown)

const isProps = unknown => isObject(unknown) && !isElement(unknown)

const isChild = unknown =>
  isString(unknown)
  || isNumber(unknown)
  || isArray(unknown)
  || isElement(unknown)

const getChildren = args =>
  isArray(args[1])
    ? args[1]
    : isArray(args[2])
      ? args[2]
      : isChild(args[1])
        ? args.slice(1)
        : args.slice(2)

const autoKey = children => children.map(
  (child, idx) => isElement(child)
    ? { ...child, key: child.key || `${idx}` }
    : child
)

const hyperscript = (...args) => {
  if (isArray(args[0])) return hyperscript(React.Fragment, args[0])

  const Tag = args[0]

  const props = isProps(args[1]) ? args[1] : {}

  const children = autoKey(getChildren(args))

  return <Tag {...props}>{children}</Tag>
}

export default hyperscript // special thanks to: @mlmorg/react-hyperscript
