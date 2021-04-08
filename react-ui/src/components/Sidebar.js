import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Resizable } from 're-resizable'

const Sidebar = ({ children }) => {
  const [width, setWidth] = React.useState(192)

  return (
    <Container
      maxHeight={'100vh'}
      size={{ width }}
      onResizeStop={(e, direction, ref, d) => {
        setWidth(width + d.width)
      }}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <Nav>{children}</Nav>
    </Container>
  )
}

export default Sidebar

const Container = styled(Resizable)`
  /* position: fixed; */
  position: sticky;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;

  min-width: 12rem;
  max-width: 25rem;
  width: ${p => (p.width ? p.width : '30rem')};
  height: 100%;

  background-color: var(--color-gray-25);

  :first-child:hover {
    border-right: 2px solid var(--color-gray);
  }
`

const Nav = styled.nav`
  width: 100%;

  padding: var(--spacing-s);
  font-size: var(--text-2xl);

  & a {
    text-decoration: none;
    color: var(--color-text);
  }
`
const ResizerColumn = styled.div`
  position: relative;
  left: 3px;
  width: 6px;

  cursor: col-resize;

  :hover {
    background-color: var(--color-gray);
  }
`
