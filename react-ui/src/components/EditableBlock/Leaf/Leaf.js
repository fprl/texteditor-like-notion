import React from 'react'
import styled from 'styled-components'

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underlined) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }

  if (leaf.blockquote) {
    children = <blockquote>{children}</blockquote>
  }

  return <span {...attributes}>{children}</span>
}

export default Leaf
