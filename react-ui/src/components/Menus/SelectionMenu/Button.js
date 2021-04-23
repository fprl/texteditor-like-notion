import React from 'react'
import { useSlate } from 'slate-react'
import styled from 'styled-components'

import { BlockHelpers } from '../../EditableBlock/utilities/blockHelpers'

const Button = ({ format, children }) => {
  const editor = useSlate()

  const handleOnMouseDown = event => {
    event.preventDefault()
    BlockHelpers.toggleFormat(editor, format)
  }

  return (
    <StyledButton reversed onMouseDown={handleOnMouseDown}>
      {children}
    </StyledButton>
  )
}

export default Button

const StyledButton = styled.button`
  display: flex;
  align-items: center;

  height: calc(var(--spacing-s) * 2);
  padding: 0 var(--spacing-s);

  border: 1px solid var(--color-hover-85);

  font-size: var(--text-sm);
  color: var(--color-text);
  background-color: white;

  :hover {
    background-color: var(--color-hover-85);
  }
`
