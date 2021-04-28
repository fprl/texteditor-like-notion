import React from 'react'
import styled from 'styled-components'

const NumberedList = props => {
  return <StyledOl {...props.attributes}>{props.children}</StyledOl>
}

export default NumberedList

const StyledOl = styled.ol`
  font-size: var(--text-sm);
  list-style: decimal;

  padding-left: var(--spacing-s);
`
