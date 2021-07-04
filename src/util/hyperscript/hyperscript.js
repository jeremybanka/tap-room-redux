// https://github.com/mlmorg/react-hyperscript/blob/master/index.js

/** @jsxImportSource @emotion/react */
import React from "react"
import parseTag from "./parse-tag"

const { isArray } = Array
const isReactNode = unknown => React.isValidElement(unknown)
const isChild = unknown =>
  typeof unknown === `string`
  || typeof unknown === `number`
  || isArray(unknown)
  || isReactNode(unknown)
const isString = unknown => typeof unknown === `string`
const isProps = unknown =>
  typeof unknown === `object`
   && !isArray(unknown)
   && !isReactNode(unknown)

export default function h(...args) {
  if (isArray(args[0])) return h(React.Fragment, null, args[0])
  const props = isProps(args[1])
    ? { ...args[1] }
    : {}
  const ComponentOrTag = isString(args[0])
    ? parseTag(args[0], props)
    : args[0]
  const children
    = (
      isArray(args[1])
        ? args[1]
        : isArray(args[2])
          ? args[2]
          : isChild(args[1])
            ? args.slice(1)
            : args.slice(2)
    ).map(
      (arg, idx) =>
        isReactNode(arg)
          ? { ...arg, key: typeof arg === `object` ? idx : arg.key }
          : arg
    )

  // Supported nested dataset attributes
  if (props.dataset) {
    Object.keys(props.dataset).forEach(attrName => {
      const dashedAttr = attrName.replace(
        /([a-z])([A-Z])/,
        match => `${match[0]}-${match[1].toLowerCase()}`
      )
      props[`data-${dashedAttr}`] = props.dataset[attrName]
    })
    props.dataset = undefined
  }

  // Support nested attributes
  if (props.attributes) {
    Object.keys(props.attributes).forEach(attrName => {
      props[attrName] = props.attributes[attrName]
    })
    props.attributes = undefined
  }

  // console.log(`ComponentOrTag`,
  //   typeof ComponentOrTag === `string`
  //     ? ComponentOrTag : ComponentOrTag.name,
  // )
  // console.log(`| args`, args)
  // console.log(`| props`, props)
  // console.log(`| children`, children)
  // console.log(isReactNode(children))

  return <ComponentOrTag {...props}>{children}</ComponentOrTag>
}
