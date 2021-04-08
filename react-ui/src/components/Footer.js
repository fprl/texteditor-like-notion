import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper>
      <br />
      <em>Notion clone, by Franco Romano Losada.</em>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;

  margin: var(--spacing-s);
  max-width: 100%;

  font-size: var(--text-base);

  & a {
    text-decoration: none;
    color: var(--color-text);
  }
`
