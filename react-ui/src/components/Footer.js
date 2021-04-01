import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  color: blue;
`

const Footer = () => {

  return (
    <Wrapper>
      <br />
      <em>Notion clone, by Franco Romano Losada.</em>
    </Wrapper>
  )
}

export default Footer