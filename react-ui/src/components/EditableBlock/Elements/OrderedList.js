import React from 'react'
import styled from 'styled-components'

const OrderedList = props => {
  return (
    <ol {...props.attributes}>
      <StyledLi>{props.children}</StyledLi>
    </ol>
  )
}

export default OrderedList

const StyledLi = styled.li`
  font-size: var(--text-sm);
`
