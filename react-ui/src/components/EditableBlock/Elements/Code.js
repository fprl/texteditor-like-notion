import React from 'react'
import styled from 'styled-components'

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <Code>{props.children}</Code>
    </pre>
  )
}

export default CodeElement

const Code = styled.code`
  font-size: var(--text-sm);
  color: red;

  background-color: var(--color-hover);
`
