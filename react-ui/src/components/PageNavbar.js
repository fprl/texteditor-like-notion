import React, { useState } from 'react'
import styled from 'styled-components'

const PageNavbar = ({ title }) => {
  return (
    <Navbar>
      <ItemsWrapper>{title}</ItemsWrapper>
    </Navbar>
  )
}

export default PageNavbar

const Navbar = styled.nav`
  /* position: relative; */
  position: sticky;
  top: 0;

  height: 3rem;
  width: 100%;
  padding: var(--spacing-s);
  max-width: 100vh;
`

const ItemsWrapper = styled.div`
  /* position: absolute; */

  height: 100%;
  top: 0;
  left: 0;
  right: 0;
`

const ItemWrapper = styled.div``
