import React from 'react'
import styled from 'styled-components'

const UnorderedList = props => {
  return (
    <ul {...props.attributes}>
      <StyledLi>{props.children}</StyledLi>
    </ul>
  )
}

export default UnorderedList

const StyledLi = styled.li`
  font-size: var(--text-sm);
`
