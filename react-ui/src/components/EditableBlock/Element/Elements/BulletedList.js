import React from 'react'
import styled from 'styled-components'

const BulletedList = props => {
  return <StyledUl {...props.attributes}>{props.children}</StyledUl>
}

export default BulletedList

const StyledUl = styled.ul`
  font-size: var(--text-sm);
  list-style: disc;

  padding-left: calc(var(--spacing-s) * 1.2);
`
