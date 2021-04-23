import React from 'react'
import styled from 'styled-components'

const Heading1 = props => {
  return <H1 {...props.attributes}>{props.children}</H1>
}

export default Heading1

const H1 = styled.h1`
  font-size: var(--text-3xl);
  font-weight: 600;
`
