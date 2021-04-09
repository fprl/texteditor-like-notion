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
  position: sticky;
  top: 0;
  z-index: 10;

  width: 100%;
  height: 3rem;

  padding: var(--spacing-s);
  background-color: var(--color-background);
  font-size: var(--text-sm);
`

const ItemsWrapper = styled.div`
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
`

const ItemWrapper = styled.div``
