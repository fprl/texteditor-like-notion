import React from 'react'
import styled from 'styled-components'

const Code = props => {
  return (
    <pre {...props.attributes}>
      <StyledCode>{props.children}</StyledCode>
    </pre>
  )
}

export default Code

const StyledCode = styled.code`
  font-size: var(--text-sm);
  color: red;

  background-color: var(--color-hover);
`
