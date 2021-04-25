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
  font-size: var(--text-base);

  background-color: var(--color-hover);
`
