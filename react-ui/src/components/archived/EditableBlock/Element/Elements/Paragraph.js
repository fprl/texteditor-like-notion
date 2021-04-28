import React from 'react'
import styled from 'styled-components'

const Paragraph = props => {
  return <P {...props.attributes}>{props.children}</P>
}

export default Paragraph

const P = styled.p`
`
