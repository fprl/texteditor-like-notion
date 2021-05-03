import React from 'react'
import styled from 'styled-components'

const Heading3 = props => {
  return <H3 {...props.attributes}>{props.children}</H3>
}

export default Heading3

const H3 = styled.h3`
  font-size: var(--text-xl);
  font-weight: 600;
`
