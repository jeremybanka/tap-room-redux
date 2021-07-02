// https://github.com/mlmorg/react-hyperscript/blob/master/index.js
/* eslint-disable no-restricted-syntax */

/** @jsxImportSource @emotion/react */
import React from "react"
import parseTag from "./parse-tag"

export default function h(...args) {
  let ComponentOrTag = args[0]
  let properties = args[1]
  const furtherArgs = args.slice(2).map((arg, idx) => (
    { ...arg, key: typeof arg === `object` ? idx : arg.key }
  ))
  let children = furtherArgs[1] ? furtherArgs : furtherArgs[0] || undefined

  // if only one argument which is an array, wrap items with React.Fragment
  if (args.length === 1 && Array.isArray(ComponentOrTag)) {
    return h(React.Fragment, null, ComponentOrTag)
  } else if (!children && isChildren(properties)) {
    // If a child array or text node
    // are passed as the second argument,
    // shift them
    children = properties
    properties = {}
  } else if (arguments.length === 2) {
    // If no children were passed, we don't want to pass "undefined"
    // and potentially overwrite the `children` prop
    children = []
  }

  properties = properties ? ({ ...properties }) : {}

  // Supported nested dataset attributes
  if (properties.dataset) {
    Object.keys(properties.dataset).forEach(attrName => {
      const dashedAttr = attrName.replace(/([a-z])([A-Z])/, match => `${match[0]}-${match[1].toLowerCase()}`)
      properties[`data-${dashedAttr}`] = properties.dataset[attrName]
    })

    properties.dataset = undefined
  }

  // Support nested attributes
  if (properties.attributes) {
    Object.keys(properties.attributes).forEach(attrName => {
      properties[attrName] = properties.attributes[attrName]
    })

    properties.attributes = undefined
  }

  // When a selector, parse the tag name and fill out the properties object
  if (typeof ComponentOrTag === `string`) {
    console.log(`about to parse tag on`, ComponentOrTag)
    ComponentOrTag = parseTag(ComponentOrTag, properties)
  }

  console.log(`ComponentOrTag`,
    typeof ComponentOrTag === `string`
      ? ComponentOrTag : ComponentOrTag.name,
  )

  console.log(`| args`, args)
  console.log(`| properties`, properties)
  console.log(`| children`, children)

  // Create the element
  // const args = [componentOrTag, properties].concat(children)
  if (typeof ComponentOrTag === `string`) {
    return (
      <ComponentOrTag {...properties}>
        {children}
      </ComponentOrTag>
    )
  }
  const reactNode = React.createElement(ComponentOrTag, properties, children)
  console.log(`| reactNode`, reactNode.type.name, reactNode)
  return reactNode
  // return typeof ComponentOrTag === `string`
  //   ? (
  //     <ComponentOrTag {...properties}>
  //       {children}
  //     </ComponentOrTag>
  //   )
  //   : React.createElement(...args)
}

function isChildren(x) {
  return typeof x === `string` || typeof x === `number` || Array.isArray(x)
}
