import React from 'react'
import styled from 'styled-components'

const Divider = props => {
  return (
    <StyledWrapper {...props.attributes}>
      <StyledDivider>{props.children}</StyledDivider>
    </StyledWrapper>
  )
}

export default Divider

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;

  height: 13px;
`

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid var(--color-gray);
`
