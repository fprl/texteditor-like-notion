import React from 'react'
import styled from 'styled-components'

const Blockquote = props => {
  return (
    <pre {...props.attributes}>
      <StyledBlockquote>{props.children}</StyledBlockquote>
    </pre>
  )
}

export default Blockquote

const StyledBlockquote = styled.blockquote`
  display: block;
  white-space: pre-wrap;
  font-size: var(--text-base);
  line-height: var(--text-xl);

  min-height: var(--text-xl);
  padding: 0 var(--spacing-s);

  border-left: 3px solid black;
`
