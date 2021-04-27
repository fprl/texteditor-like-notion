import React from 'react'
import styled from 'styled-components'

const Heading2 = props => {
  return <H2 {...props.attributes}>{props.children}</H2>
}

export default Heading2

const H2 = styled.h2`
  font-size: var(--text-2xl);
  font-weight: 600;
`
