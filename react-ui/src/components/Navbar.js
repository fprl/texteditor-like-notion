import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Nav = styled.nav`
  /* display: flex;
  justify-content: center; */

  margin: var(--spacing-s);

  width: 1200px;
  max-width: 100%;

  font-size: var(--text-2xl);

  & a {
    text-decoration: none;
    color: var(--color-text);
  }
`

const Navbar = props => {
  return (
    <Container>
      <Nav className="navbar">{props.children}</Nav>
    </Container>
  )
}

export default Navbar
