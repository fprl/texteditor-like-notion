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

  if (leaf.code) {
    children = <StyledCode>{children}</StyledCode>
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }


  return <span {...attributes}>{children}</span>
}

export default Leaf

const StyledCode = styled.code`
  color: red;
  background-color: var(--color-hover);
`
