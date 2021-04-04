import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;

  margin: var(--spacing-s);

  width: 1200px;
  max-width: 100%;

  font-size: var(--text-base);

  & a {
    text-decoration: none;
    color: var(--color-text);
  }
`

const Footer = () => {

  return (
    <Container>
      <Wrapper>
        <br />
        <em>Notion clone, by Franco Romano Losada.</em>
      </Wrapper>
    </Container>
  )
}

export default Footer